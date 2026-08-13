import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
// @ts-ignore
import fetch from "node-fetch";

export const scheduledLinkOutreach = onSchedule({
  schedule: "0 6 15 * *", // 15th of every month at 6:00 AM
  timeoutSeconds: 540,
  memory: "1GiB"
}, async (event) => {
  console.log("Starting Competitor Backlink Poaching Engine...");
  try {
    const db = getFirestore();
    
    // In a real scenario, this would query your competitors from settings
    const competitors = ["competitor1.com", "competitor2.com"];
    const firehoseApiKey = "fhm_H6OtKuL3ybUvrkUJ1btiU8MxFwIdlvD8bsX1QI94";

    const settingsDoc = await db.collection("settings").doc("admin").get();
    const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : "";
    if (!geminiKey) {
      console.error("Gemini API key is not configured in settings.");
      return;
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json" }
    });

    for (const competitor of competitors) {
      // 1. Firehose API for Backlink Discovery
      // Simulated Firehose endpoint call
      let backlinks: any[] = [];
      try {
        const firehoseUrl = `https://api.firehose.com/v1/backlinks?target=${competitor}`;
        const response = await fetch(firehoseUrl, {
          headers: { "Authorization": `Bearer ${firehoseApiKey}` }
        });
        if (response.ok) {
          const data = await response.json();
          backlinks = data.backlinks || [];
        } else {
          // Mock data fallback if Firehose endpoint doesn't exist
          backlinks = [
            { url: "https://example-blog.com/best-business-tips", domain: "example-blog.com", context: "Mentioning top consultants" }
          ];
        }
      } catch (e) {
        console.warn("Firehose API request failed, using mock data.", e);
        backlinks = [
          { url: "https://example-blog.com/best-business-tips", domain: "example-blog.com", context: "Mentioning top consultants" }
        ];
      }

      for (const backlink of backlinks) {
        // 2. Generate personalized outreach email via Gemini
        const prompt = `
          You are the Outreach Manager for GUIA DE NEGOCIOS.
          We found that the website ${backlink.domain} (specifically at ${backlink.url}) is linking to our competitor (${competitor}).
          Context of their link: "${backlink.context}".
          
          Draft a highly personalized, compelling email (in English) to the webmaster of ${backlink.domain}.
          The email should compliment their article and suggest adding GUIA DE NEGOCIOS as an additional, high-quality resource for Latino entrepreneurs.
          
          Format EXACTLY as JSON:
          {
            "subject": "string (Email subject line)",
            "body": "string (The email body, use \\n for line breaks)"
          }
        `;

        const result = await model.generateContent(prompt);
        let emailDraft;
        try {
          emailDraft = JSON.parse(result.response.text());
        } catch (e) {
          console.error("Failed to parse outreach email JSON");
          continue;
        }

        // 3. Store email in "Ready to Send" admin outbox
        await db.collection("linkOutreach").add({
          targetDomain: backlink.domain,
          targetUrl: backlink.url,
          competitor: competitor,
          subject: emailDraft.subject,
          body: emailDraft.body,
          status: "Ready to Send",
          createdAt: FieldValue.serverTimestamp()
        });

        console.log(`Saved outreach draft for ${backlink.domain} to outbox.`);
      }
    }
  } catch (error: any) {
    console.error("scheduledLinkOutreach error:", error);
  }
});
