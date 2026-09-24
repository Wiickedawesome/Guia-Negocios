/**
 * One-off backfill: run the AEO injector logic now instead of waiting for the
 * monthly schedule (which failed in past months due to the broken Gemini path).
 * Uses the deployed generateAiContent function (Vertex AI, GCP billing).
 *
 * ── REQUIRES AN ADMIN ID TOKEN ──────────────────────────────────────────────
 * generateAiContent now enforces an @guianegocios.net caller (see assertAdmin
 * in functions/src/index.ts), so an anonymous run fails with HTTP 403
 * permission-denied. Pass a Firebase ID token for an admin account:
 *
 *   FIREBASE_ID_TOKEN="$(firebase auth:print-access-token)"  *     node scripts/backfill-aeo-schemas.mjs
 *
 * (Or grab the token from the browser session of a signed-in admin.)
 *
 * ── READ BEFORE RUNNING ─────────────────────────────────────────────────────
 * This script has ALREADY RUN: its output is the hyphenated documents in the
 * seoSchemas collection. Do not re-run it blindly, because:
 *
 *   1. It writes seoSchemas/{keyword-slug} with { merge: true }, so it will
 *      OVERWRITE the hyphenated document for each keyword and will NOT remove
 *      the older duplicate documents whose ids contain spaces.
 *   2. seoSchemas currently holds two documents per keyword (one id with
 *      spaces, one hyphenated), each a separately generated schema. The
 *      homepage injects every active schema, so those duplicates are rendered
 *      as repeated FAQPage blocks. Running this again does not fix that.
 *
 * Clean up the duplicates first, or the page keeps emitting repeated markup.
 *
 * Usage: FIREBASE_ID_TOKEN=... node scripts/backfill-aeo-schemas.mjs
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

// generateAiContent requires an @guianegocios.net caller, so every request has
// to carry a valid ID token. Fail loudly up front rather than letting the
// function return an opaque 403 for each keyword in the loop.
const ID_TOKEN = process.env.FIREBASE_ID_TOKEN?.trim();

if (!ID_TOKEN) {
  console.error(
    'Missing FIREBASE_ID_TOKEN.\n' +
      'generateAiContent now requires an admin Firebase ID token, so this script\n' +
      'cannot run anonymously. Example:\n' +
      '  FIREBASE_ID_TOKEN="$(firebase auth:print-access-token)" node scripts/backfill-aeo-schemas.mjs'
  );
  process.exit(1);
}

async function generateJson(prompt) {
  const res = await fetch(GENERATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ID_TOKEN}`,
    },
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
