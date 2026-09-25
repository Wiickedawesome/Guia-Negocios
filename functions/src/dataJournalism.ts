import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getApp } from "firebase-admin/app";
import { HttpsError } from "firebase-functions/v2/https";
// @ts-ignore
import fetch from "node-fetch";
import { fetchCoverImage } from "./contentEngine.js";
import { getSetting } from "./seo/config.js";


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
      updateFrequency: ds.update_frequency,
      // Real, verifiable fields. The article may ONLY cite what appears here.
      datasetUrl: `https://data.sba.gov/dataset/${ds.name}`,
      resourceCount: ds.num_resources,
      lastUpdated: ds.metadata_modified,
      license: ds.license_title,
    }));

    const { generateContentWithAi } = await import("./ai.js");

    const prompt = `
      You are an expert data journalist for GUIA DE NEGOCIOS, a business consultancy in Knoxville, TN helping Latino entrepreneurs.
      
      I have pulled the latest dataset metadata from the Small Business Administration (SBA) Open Data API:
      ${JSON.stringify(dataContext, null, 2)}
      
      Your task: write a factual article announcing these SBA datasets and what an entrepreneur can research with them.
      The dataset URL, resource count, last-updated date, licence and organisation above are REAL and may be cited.

      ABSOLUTE RULE — NO FABRICATION:
      - Invent NOTHING. No loan approval rates, no dollar totals, no percentages, no borrower counts, no "recent studies".
      - We hold dataset METADATA only, not the loan records, so no statistic can be derived from it.
      - A number may appear ONLY if it appears verbatim in the data above. Otherwise write no number at all and explain what the dataset CONTAINS and how to query it.

      Requirements:
      1. Languages: write both Spanish and English (this site is bilingual).
      2. Format: a complete Markdown article with an H1, H2 sections, bullet points and an FAQ section.
      3. Tone: journalistic and practical — what the data covers and how a business owner uses it.
      4. Link each dataset URL above as markdown so readers can verify it themselves.
      5. Provide a 1-2 word English image search term.

      Format your response EXACTLY as this JSON object:
      {
        "titleEs": "string (The H1 title in Spanish)",
        "titleEn": "string (The H1 title in English)",
        "slugEs": "string (url-friendly-slug-in-spanish)",
        "slugEn": "string (url-friendly-slug-in-english)",
        "metaDescriptionEs": "string (150-160 characters SEO description, Spanish)",
        "metaDescriptionEn": "string (150-160 characters SEO description, English)",
        "imageSearchTerm": "string (1-2 words in English for the cover image)",
        "contentEs": "string (The full Spanish article body in Markdown, excluding the H1 title)",
        "contentEn": "string (The full English article body in Markdown, excluding the H1 title)"
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

    // 3. Resolve a REAL stock cover image (Pexels first, then Unsplash).
    // loremflickr previously served a random, unrelated placeholder image.
    const pexelsKey = await getSetting(db, "pexelsKey");
    const unsplashKey = await getSetting(db, "unsplashKey");
    let cover = await fetchCoverImage(draftedPost.imageSearchTerm || "business data", pexelsKey, unsplashKey);
    if (!cover) {
      cover = {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        alt: draftedPost.imageSearchTerm || "SBA business loans",
        credit: "Unsplash",
      };
    }

    // 4. Save to Firestore as a Draft for human review (never auto-publish).
    // Field names MUST match the content-engine contract the editor reads
    // (titleEs/titleEn/slugEs/slugEn/contentEs/contentEn/featuredImage).
    // The previous title/content/coverImage keys produced unreadable drafts.
    const publishDate = new Date().toISOString().split("T")[0];
    await db.collection("blogs").add({
      titleEs: draftedPost.titleEs || "Datos de la SBA para emprendedores",
      titleEn: draftedPost.titleEn || "SBA Data for Entrepreneurs",
      slugEs: draftedPost.slugEs || "datos-sba-emprendedores",
      slugEn: draftedPost.slugEn || "sba-data-entrepreneurs",
      contentEs: draftedPost.contentEs || "",
      contentEn: draftedPost.contentEn || "",
      metaDesc: draftedPost.metaDescriptionEs || "",
      featuredImage: cover.url,
      imageCredit: cover.credit,
      targetKeyword: "sba loan data for latino entrepreneurs",
      sourceDatasets: datasets.map((ds: any) => `https://data.sba.gov/dataset/${ds.name}`),
      author: "Guia Negocios Team",
      authorAvatar: "/images/team-avatar.webp",
      readTime: 6,
      language: "es",
      status: "Draft",
      publishDate,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      views: 0,
    });

    console.log(`Successfully drafted SBA Data Report: "${draftedPost.titleEs}". Saved as Draft for review.`);

  } catch (error: any) {
    console.error("scheduledDataJournalism error:", error);
  }
});
