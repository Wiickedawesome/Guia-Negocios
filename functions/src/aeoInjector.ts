import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { HttpsError } from "firebase-functions/v2/https";

export const scheduledAeoInjector = onSchedule({
  schedule: "0 3 1 * *",
  timeoutSeconds: 300,
  memory: "1GiB"
}, async (event) => {
  console.log("Starting Answer Engine Optimization (AEO) Injector...");
  try {
    const db = getFirestore();
    
    // 1. Fetch our top target keywords
    const keywordsSnap = await db.collection("keywords")
      .where("priority", "==", "High")
      .limit(5)
      .get();
      
    if (keywordsSnap.empty) {
      console.log("No high priority keywords found for AEO injection.");
      return;
    }

    const keywords = keywordsSnap.docs.map(doc => doc.data().keyword);

    const { generateContentWithAi } = await import("./ai.js");

    for (const keyword of keywords) {
      // 3. Prompt Vertex AI to simulate "People Also Ask" scraping and generate FAQ Schema
      const prompt = `
        You are an Answer Engine Optimization (AEO) expert for GUIA DE NEGOCIOS.
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
      `;

      let aeoData;
      try {
        const aiText = await generateContentWithAi(prompt, {
          responseMimeType: "application/json"
        });
        aeoData = JSON.parse(aiText);
      } catch (e) {
        console.error("AI JSON parse failed for AEO", e);
        continue;
      }

      // 4. Write the Schema to Firestore
      await db.collection("seoSchemas").doc(keyword.toLowerCase().replace(/\\s+/g, '-')).set({
        keyword: keyword,
        schemaStr: aeoData.schemaStr,
        createdAt: FieldValue.serverTimestamp(),
        status: "Active",
        type: "FAQPage"
      }, { merge: true });

      console.log(`Successfully generated and injected AEO Schema for "${keyword}"`);
    }

  } catch (error: any) {
    console.error("scheduledAeoInjector error:", error);
  }
});
