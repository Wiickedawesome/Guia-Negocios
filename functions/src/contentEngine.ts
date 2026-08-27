import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getApp } from "firebase-admin/app";
import * as path from "path";
import * as fs from "fs";


const keyFilename = path.join(__dirname, "../serviceAccount.json");

export const scheduledContentEngine = onSchedule({
  schedule: "every wednesday 04:00",
  timeoutSeconds: 540,
  memory: "1GiB"
}, async (event) => {
  console.log("Starting Autonomous Content Engine...");
  try {
    const db = getFirestore();
    
    // Fetch GSC Property URL from admin settings
    let gscUrl = 'sc-domain:guianegocios.net';
    try {
      const settingsDoc = await db.collection('settings').doc('admin').get();
      if (settingsDoc.exists && settingsDoc.data()?.gscUrl) {
        gscUrl = settingsDoc.data()?.gscUrl;
      }
    } catch (e) {
      console.warn("Could not fetch gscUrl from settings, defaulting to sc-domain:guianegocios.net");
    }

    const { google } = await import("googleapis");
    const authClient = new google.auth.GoogleAuth({
      ...(fs.existsSync(keyFilename) ? { keyFile: keyFilename } : {}),
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
    const searchconsole = google.searchconsole({ version: "v1", auth: authClient });

    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // 1. Find Page 2 Keywords (Positions 11-20)
    const requestBody: any = { 
      startDate, 
      endDate, 
      dimensions: ["query"], 
      rowLimit: 200, 
      dataState: "all" 
    };
    
    const response = await searchconsole.searchanalytics.query({
      siteUrl: gscUrl,
      requestBody,
    } as any);

    const rows = response.data?.rows || [];
    
    // Filter for page 2 opportunities with decent impressions
    const page2Keywords = rows.filter(row => {
      const pos = row.position || 0;
      const impr = row.impressions || 0;
      return pos >= 11 && pos <= 25 && impr >= 10;
    });

    if (page2Keywords.length === 0) {
      console.log("No Page 2 keywords found for content generation.");
      return;
    }

    // Sort by impressions descending to find the best opportunity
    page2Keywords.sort((a, b) => (b.impressions || 0) - (a.impressions || 0));
    const targetKeywordRow = page2Keywords[0];
    if (!targetKeywordRow) return;
    const targetKeyword = targetKeywordRow.keys?.[0] || "";

    console.log(`Selected target keyword: "${targetKeyword}" (Pos: ${targetKeywordRow.position}, Impr: ${targetKeywordRow.impressions})`);

    // 2. Prevent duplicate articles for the same keyword
    const existingBlogs = await db.collection("blogs").where("targetKeyword", "==", targetKeyword).get();
    if (!existingBlogs.empty) {
      console.log(`Blog for keyword "${targetKeyword}" already exists. Skipping.`);
      return;
    }

    // --- Phase 3: Programmatic Internal Linking ---
    // Generate an embedding for the target keyword to find related posts
    let relatedLinksText = "";
    try {
      const { generateEmbeddingWithAi } = await import("./ai.js");
      const queryVector = await generateEmbeddingWithAi(targetKeyword);
      const nearestSnap = await db.collection("blogs").findNearest("embedding", FieldValue.vector(queryVector), { limit: 3, distanceMeasure: "COSINE" }).get();
      const relatedLinks = nearestSnap.docs.map(doc => {
        const data = doc.data();
        const langCode = data.language || "es";
        return `- [${data.title}](/${langCode}/blog/${data.slug})`;
      });
      if (relatedLinks.length > 0) {
        relatedLinksText = `\n\nInternal Linking Requirements:\nPlease organically inject markdown hyperlinks to the following related articles within the body of your text (do not just list them at the end, weave them into relevant paragraphs):\n${relatedLinks.join("\n")}`;
      }
    } catch (e) {
      console.warn("Vector search failed or skipped for internal links:", e);
    }

    const prompt = `
      You are an expert bilingual SEO content writer for GUIA DE NEGOCIOS, a business consultancy in Knoxville, TN helping Latino entrepreneurs.
      
      We have identified a keyword opportunity: "${targetKeyword}".
      We need to write a comprehensive, highly authoritative blog post targeting this keyword.
      
      Requirements:
      1. Language: Write the article in Spanish (as it's the primary language for our Latino audience), but ensure it's easily translatable.
      2. Format: Return a complete Markdown article. Include an H1 title, H2 sections, bullet points, and an FAQ section at the end.
      3. Content: Must be over 1000 words if possible. Extremely practical advice for US-based businesses.
      4. Image Search Term: Provide a 1-2 word English search term that perfectly represents this article (e.g., "office", "taxes", "construction") so we can fetch a free Unsplash image.${relatedLinksText}
      
      Format your response EXACTLY as this JSON object:
      {
        "title": "string (The H1 Title)",
        "slug": "string (url-friendly-slug-in-spanish)",
        "metaDescription": "string (150-160 characters SEO description)",
        "unsplashSearchTerm": "string (1-2 words in English for cover image)",
        "markdownContent": "string (The full article body in Markdown, excluding the H1 title)"
      }
    `;

    const { generateContentWithAi } = await import("./ai.js");
    const aiText = await generateContentWithAi(prompt, {
      responseMimeType: "application/json"
    });
    let draftedPost;
    try {
      draftedPost = JSON.parse(aiText);
    } catch (e) {
      console.error("AI JSON parse failed", e);
      return;
    }

    // 4. Resolve Unsplash Image
    // Using a reliable generic high-quality business image as fallback, 
    // or relying on a dynamic service. Since source.unsplash is deprecated, we will use a curated list or a loremflickr fallback.
    const coverImage = `https://loremflickr.com/1200/630/${encodeURIComponent(draftedPost.unsplashSearchTerm)},business/all`;

    // 5. Save to Firestore as Draft
    await db.collection("blogs").add({
      title: draftedPost.title,
      slug: draftedPost.slug,
      metaDescription: draftedPost.metaDescription,
      content: draftedPost.markdownContent,
      coverImage: coverImage,
      targetKeyword: targetKeyword,
      status: "Draft",
      author: "AI Autopilot",
      language: "es",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    console.log(`Successfully drafted blog post for "${targetKeyword}". Saved to Firestore.`);

  } catch (error: any) {
    console.error("scheduledContentEngine error:", error);
  }
});
