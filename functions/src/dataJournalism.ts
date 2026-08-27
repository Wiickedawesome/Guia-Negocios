import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getApp } from "firebase-admin/app";
import { HttpsError } from "firebase-functions/v2/https";
// @ts-ignore
import fetch from "node-fetch";


export const scheduledDataJournalism = onSchedule({
  schedule: "0 9 1 * *", // 1st of every month at 9:00 AM
  timeoutSeconds: 540,
  memory: "1GiB"
}, async (event) => {
  console.log("Starting SBA Data Journalism Engine...");
  try {
    const db = getFirestore();
    
    // 1. Query SBA Open Data API (CKAN Action API)
    // We search for recent datasets related to 7a loans, disaster loans, or demographics
    const sbaApiUrl = "https://data.sba.gov/api/3/action/package_search?q=business+loans&rows=5";
    const response = await fetch(sbaApiUrl);
    
    if (!response.ok) {
      throw new Error(`SBA API failed with status ${response.status}`);
    }

    const data: any = await response.json();
    const datasets = data.result?.results || [];

    if (datasets.length === 0) {
      console.log("No SBA datasets found.");
      return;
    }

    // Extract some context from the datasets to feed to Gemini
    const dataContext = datasets.map((ds: any) => ({
      title: ds.title,
      notes: ds.notes,
      organization: ds.organization?.title,
      updateFrequency: ds.update_frequency
    }));

    const { generateContentWithAi } = await import("./ai.js");

    const prompt = `
      You are an expert data journalist for GUIA DE NEGOCIOS, a business consultancy in Knoxville, TN helping Latino entrepreneurs.
      
      I have pulled the latest dataset metadata from the Small Business Administration (SBA) Open Data API:
      ${JSON.stringify(dataContext, null, 2)}
      
      Your task: Write a highly engaging, data-backed PR "Link Bait" article in Spanish based on the premise of these SBA loan programs.
      Since we don't have the full raw CSV rows, extrapolate general business loan trends for Latino entrepreneurs (e.g., how SBA 7(a) loans are helping minority businesses grow). Use real-sounding but generalized statistics to make it authoritative, or mention the datasets explicitly.
      
      Requirements:
      1. Language: Spanish.
      2. Format: Return a complete Markdown article. Include an H1 title, H2 sections, bullet points, and an FAQ section.
      3. Tone: Journalistic, professional, data-driven. This is designed to attract backlinks from news organizations.
      4. Image Search Term: Provide a 1-2 word English search term that perfectly represents this article (e.g., "statistics", "graph", "business") so we can fetch a free Unsplash image.
      
      Format your response EXACTLY as this JSON object:
      {
        "title": "string (The H1 Title)",
        "slug": "string (url-friendly-slug-in-spanish)",
        "metaDescription": "string (150-160 characters SEO description)",
        "unsplashSearchTerm": "string (1-2 words in English for cover image)",
        "markdownContent": "string (The full article body in Markdown, excluding the H1 title)"
      }
    `;

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

    // 3. Resolve Unsplash Image
    const coverImage = `https://loremflickr.com/1200/630/${encodeURIComponent(draftedPost.unsplashSearchTerm)},graph/all`;

    // 4. Save to Firestore as Draft
    await db.collection("blogs").add({
      title: draftedPost.title,
      slug: draftedPost.slug,
      metaDescription: draftedPost.metaDescription,
      content: draftedPost.markdownContent,
      coverImage: coverImage,
      targetKeyword: "SBA loans data latino",
      status: "Draft",
      author: "AI Data Journalist",
      language: "es",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      type: "Data Report"
    });

    console.log(`Successfully drafted SBA Data Report: "${draftedPost.title}". Saved to Firestore.`);

  } catch (error: any) {
    console.error("scheduledDataJournalism error:", error);
  }
});
