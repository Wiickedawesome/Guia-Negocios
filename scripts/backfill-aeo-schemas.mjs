/**
 * One-off backfill: run the AEO injector logic now instead of waiting for the
 * monthly schedule (which failed in past months due to the broken Gemini path).
 * Uses the deployed generateAiContent function (Vertex AI, GCP billing).
 *
 * Usage: node scripts/backfill-aeo-schemas.mjs
 */
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  projectId: 'guianegocios-prod',
  credential: applicationDefault(),
});

const db = getFirestore();

const GENERATE_URL =
  'https://us-central1-guianegocios-prod.cloudfunctions.net/generateAiContent';

async function generateJson(prompt) {
  const res = await fetch(GENERATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: {
        prompt,
        responseMimeType: 'application/json',
      },
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error?.message || `HTTP ${res.status}`);
  }
  return JSON.parse(body.result.text);
}

function buildPrompt(keyword) {
  return `
You are an Answer Engine Optimization (AEO) expert for GUIA DE NEGOCIOS,
a bilingual (Spanish/English) business consultancy in Knoxville, TN.
Our target keyword is: "${keyword}".

Task:
1. Identify the top 3-4 "People Also Ask" questions exactly as they appear in Google Search for this keyword (in Spanish).
2. Generate highly authoritative, concise answers (under 50 words each) optimized for AI Overviews and Featured Snippets.
3. Format the result as valid JSON-LD for an FAQPage schema.

Format your response EXACTLY as this JSON object:
{
  "keyword": "${keyword}",
  "schemaStr": "string (The stringified JSON-LD FAQPage script tag without HTML tags, just the raw JSON object starting with { \\"@context\\": \\"https://schema.org\\", \\"@type\\": \\"FAQPage\\" ... })"
}
`.trim();
}

function validateSchema(aeoData) {
  const parsed = typeof aeoData.schemaStr === 'string'
    ? JSON.parse(aeoData.schemaStr)
    : aeoData.schemaStr;

  if (parsed['@type'] !== 'FAQPage' || !Array.isArray(parsed.mainEntity)) {
    throw new Error('Invalid FAQPage schema shape');
  }
  return JSON.stringify(parsed);
}

const keywordsSnap = await db
  .collection('keywords')
  .where('priority', '==', 'High')
  .limit(5)
  .get();

if (keywordsSnap.empty) {
  console.log('No high priority keywords found.');
  process.exit(0);
}

console.log(`Backfilling AEO schemas for ${keywordsSnap.size} keywords...\n`);

for (const doc of keywordsSnap.docs) {
  const keyword = doc.data().keyword;
  const slug = keyword.toLowerCase().replace(/\s+/g, '-');
  try {
    const aeoData = await generateJson(buildPrompt(keyword));
    const schemaStr = validateSchema(aeoData);

    await db.collection('seoSchemas').doc(slug).set(
      {
        keyword,
        schemaStr,
        createdAt: new Date(),
        status: 'Active',
        type: 'FAQPage',
      },
      { merge: true },
    );
    console.log(`OK  ${keyword}`);
  } catch (err) {
    console.error(`ERR ${keyword}: ${err.message}`);
  }
}
