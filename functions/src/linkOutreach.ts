import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

export const scheduledLinkOutreach = onSchedule({
  schedule: "0 6 15 * *", // 15th of every month at 6:00 AM
  timeoutSeconds: 540,
  memory: "1GiB"
}, async (event) => {
  console.log("Starting competitor backlink outreach run...");
  try {
    const db = getFirestore();

    // Everything is read from settings/admin. There is no default competitor
    // list and no bundled API key. The previous version shipped
    // ["competitor1.com", "competitor2.com"] plus a hardcoded bearer token, and
    // whenever the lookup failed it substituted a fabricated example-blog.com
    // backlink and drafted outreach emails addressed to that fake domain.
    const settingsSnap = await db.collection("settings").doc("admin").get();
    const outreachCfg = settingsSnap.exists ? settingsSnap.data()?.linkOutreach : null;

    const competitors: string[] = Array.isArray(outreachCfg?.competitors)
      ? outreachCfg.competitors.filter((c: unknown): c is string => typeof c === "string" && c.trim().length > 0)
      : [];
    const endpoint: string = typeof outreachCfg?.endpoint === "string" ? outreachCfg.endpoint : "";
    const apiKey: string = typeof outreachCfg?.apiKey === "string" ? outreachCfg.apiKey : "";

    if (competitors.length === 0 || !endpoint || !apiKey) {
      console.log(
        "link-outreach: not configured - nothing written. Set settings/admin.linkOutreach = " +
        "{ competitors: ["+"<domain>"+"], endpoint: "+"<provider URL>"+", apiKey: "+"<key>"+" } to enable."
      );
      return;
    }

    const { generateContentWithAi } = await import("./ai.js");

    for (const competitor of competitors) {
      // 1. Backlink discovery through the configured provider.
      let backlinks: any[] = [];
      try {
        const providerUrl = `${endpoint}${endpoint.includes("?") ? "&" : "?"}target=${encodeURIComponent(competitor)}`;
        const response = await fetch(providerUrl, {
          headers: { Authorization: `Bearer ${apiKey}` }
        });
        if (!response.ok) {
          console.warn(`link-outreach: provider returned ${response.status} for ${competitor}; skipping.`);
          continue;
        }
        const data = await response.json();
        backlinks = Array.isArray(data?.backlinks) ? data.backlinks : [];
      } catch (e) {
        console.warn(`link-outreach: provider request failed for ${competitor}; skipping.`, e);
        continue;
      }

      // Only keep entries that carry the fields the prompt actually uses, so a
      // malformed provider reply cannot produce an email to a placeholder.
      backlinks = backlinks.filter((b: any) =>
        typeof b?.url === "string" && b.url.startsWith("http") &&
        typeof b?.domain === "string" && b.domain.trim().length > 0
      );

      if (backlinks.length === 0) {
        console.log(`link-outreach: no usable backlinks returned for ${competitor}.`);
        continue;
      }

      for (const backlink of backlinks) {
        // 2. Generate personalized outreach email via Vertex AI
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

        let emailDraft;
        try {
          const aiText = await generateContentWithAi(prompt, {
            responseMimeType: "application/json"
          });
          emailDraft = JSON.parse(aiText);
        } catch (e) {
          console.error("Failed to parse outreach email JSON");
          continue;
        }

        // 3. Store the draft in the admin outbox. Status is "Draft", not
        // "Ready to Send": nothing here has validated that the target accepts
        // unsolicited email or that the link still exists at send time.
        await db.collection("linkOutreach").add({
          targetDomain: backlink.domain,
          targetUrl: backlink.url,
          competitor: competitor,
          discoveredVia: "backlink-provider",
          subject: emailDraft.subject,
          body: emailDraft.body,
          status: "Draft",
          createdAt: FieldValue.serverTimestamp()
        });

        console.log(`Saved outreach draft for ${backlink.domain} to outbox.`);
      }
    }
  } catch (error: any) {
    console.error("scheduledLinkOutreach error:", error);
  }
});
