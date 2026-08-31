import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const PEXELS_API = "https://api.pexels.com/v1/search";
const UNSPLASH_API = "https://api.unsplash.com/search/photos";

interface CoverImage {
  url: string;
  alt: string;
  credit: string;
}

async function fetchCoverImage(
  searchTerm: string,
  pexelsKey: string | undefined,
  unsplashKey: string | undefined,
): Promise<CoverImage | null> {
  // Try Pexels first (configured key), then Unsplash. No loremflickr junk.
  if (pexelsKey) {
    try {
      const res = await fetch(
        `${PEXELS_API}?query=${encodeURIComponent(searchTerm)}&per_page=5&orientation=landscape`,
        { headers: { Authorization: pexelsKey }, signal: AbortSignal.timeout(8000) },
      );
      if (res.ok) {
        const data: any = await res.json();
        const photo = data.photos?.[0];
        if (photo) {
          return {
            url: photo.src?.landscape || photo.src?.large,
            alt: photo.alt || searchTerm,
            credit: `Photo by ${photo.photographer} on Pexels`,
          };
        }
      }
    } catch (e) {
      console.warn("Pexels fetch failed:", e);
    }
  }

  if (unsplashKey) {
    try {
      const res = await fetch(
        `${UNSPLASH_API}?query=${encodeURIComponent(searchTerm)}&per_page=5&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` }, signal: AbortSignal.timeout(8000) },
      );
      if (res.ok) {
        const data: any = await res.json();
        const photo = data.results?.[0];
        if (photo) {
          return {
            url: photo.urls?.regular,
            alt: photo.alt_description || searchTerm,
            credit: `Photo by ${photo.user?.name} on Unsplash`,
          };
        }
      }
    } catch (e) {
      console.warn("Unsplash fetch failed:", e);
    }
  }

  return null;
}

async function getSetting(db: FirebaseFirestore.Firestore, key: string): Promise<string | undefined> {
  try {
    const snap = await getFirestore().collection("settings").doc("admin").get();
    const val = snap.exists ? snap.data()?.[key] : undefined;
    return typeof val === "string" && val.trim() ? val.trim() : undefined;
  } catch {
    return undefined;
  }
}

export const scheduledContentEngine = onSchedule({
  schedule: "every wednesday 04:00",
  timeoutSeconds: 540,
  memory: "1GiB"
}, async (event) => {
  console.log("Starting Content Engine (draft-only, human review required)...");
  try {
    const db = getFirestore();

    let gscUrl = "sc-domain:guianegocios.net";
    try {
      const settingsDoc = await db.collection("settings").doc("admin").get();
      if (settingsDoc.exists && settingsDoc.data()?.gscUrl) {
        gscUrl = settingsDoc.data()?.gscUrl;
      }
    } catch (e) {
      console.warn("Could not fetch gscUrl from settings, defaulting to sc-domain:guianegocios.net");
    }
    const pexelsKey = await getSetting(db, "pexelsKey");
    const unsplashKey = await getSetting(db, "unsplashKey");

    const { google } = await import("googleapis");
    const authClient = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
    const searchconsole = google.searchconsole({ version: "v1", auth: authClient });

    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // 1. Find Page 2 keyword opportunities (positions 11-25 with real impressions)
    const response = await searchconsole.searchanalytics.query({
      siteUrl: gscUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 200,
        dataState: "all",
      },
    } as any);

    const rows = response.data?.rows || [];
    const page2Keywords = rows.filter((row: any) => {
      const pos = row.position || 0;
      const impr = row.impressions || 0;
      return pos >= 11 && pos <= 25 && impr >= 10;
    });

    if (page2Keywords.length === 0) {
      console.log("No Page 2 keywords found for content generation.");
      return;
    }

    // Sort by impressions descending to find the best opportunity
    page2Keywords.sort((a: any, b: any) => (b.impressions || 0) - (a.impressions || 0));
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
    let relatedLinksText = "";
    try {
      const { generateEmbeddingWithAi } = await import("./ai.js");
      const queryVector = await generateEmbeddingWithAi(targetKeyword);
      const nearestSnap = await db.collection("blogs").findNearest("embedding", FieldValue.vector(queryVector), { limit: 3, distanceMeasure: "COSINE" }).get();
      const relatedLinks = nearestSnap.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
        const data = doc.data();
        const langCode = data.language || "es";
        return `- [${data.title}](/${langCode}/blog/${data.slugEs || data.slug})`;
      });
      if (relatedLinks.length > 0) {
        relatedLinksText = `\n\nInternal Linking Requirements:\nOrganically weave markdown hyperlinks to these related articles into relevant paragraphs (never list them at the end):\n${relatedLinks.join("\n")}`;
      }
    } catch (e) {
      console.warn("Vector search skipped for internal links:", e);
    }

    // 4. Generate bilingual publication-grade draft (human review required)
    const { generateContentWithAi } = await import("./ai.js");

    const systemRules = `
You are the lead bilingual SEO/AEO/GEO strategist and executive editor for GUIA DE NEGOCIOS, a bilingual (Spanish/English) business consultancy headquartered in Knoxville, Tennessee, serving Hispanic entrepreneurs nationwide and internationally.

VOICE & BRAND:
- Warm but authoritative bilingual advisor. Address readers as "usted" in Spanish. No emojis anywhere.
- Bilingual parity: ES and EN versions must be equal in depth — native writing, not translation flavor.
- Trust signals: real dollar amounts, IRS/SBA form numbers, filing timelines, official citations. Zero invented statistics.
- Nationwide scope with Knoxville roots; closing CTA mentions both.
- Never claim to be a law firm or CPA; say "we guide you and connect you with licensed professionals" for legal/tax filing topics.

ARTICLE SPECIFICATION:
- 2,000-3,500 words per language version. Short paragraphs (2-3 sentences max).
- AEO: immediately under each H2, a 1-2 sentence direct-answer definition (optimized for Google AI Overviews / Perplexity / ChatGPT).
- Structure: hook intro (2-3 short paragraphs, bold keywords, then '---'), numbered key-point breakdowns with bold leads, markdown comparison table, "## Ejemplos Prácticos y Casos de Estudio" (2 cases with Solución Aplicada / Resultado Clave), "## Errores Críticos que Debe Evitar" (with real penalties), closing CTA to /es/contact and /en/contact, and "## Fuentes Oficiales y Recursos Consultados" (ES) / "## Official Sources & Authoritative References" (EN) with 4-6 verified links (IRS.gov, sos.tn.gov, sba.gov, tn.gov/revenue, dnb.com).
- Embed exactly 2 image placeholders in the body using these EXACT tokens (replaced with real stock photos afterwards):
  ![IMG_SLOT_1](IMG_SLOT_1)
  ![IMG_SLOT_2](IMG_SLOT_2)
- Embed 2-3 custom HTML/CSS infographic components (metric grids, bar charts, checklists, timelines). All HTML flush to column 0. Vary light theme (white card, slate border) and dark theme (#1A2E35 card, #F0C850 gold accents). Vary placement naturally per article — never adjacent to an image, and leave at least one prose-only H2 section between two visual sections.
- Provide a 2-4 word English photo search term for the cover image related to the topic.${relatedLinksText}

OUTPUT FORMAT (STRICT - use these exact delimited blocks, no JSON):
===TITLE_ES===
[Título]
===TITLE_EN===
[Title]
===SLUG_ES===
[slug-en-espanol]
===SLUG_EN===
[english-slug]
===META_DESC===
[150-160 char SEO description]
===KEYWORDS===
[kw1, kw2, kw3, kw4]
===IMAGE_SEARCH===
[2-4 word english photo search term]
===CONTENT_ES===
[Full Spanish markdown article]
===CONTENT_EN===
[Full English markdown article]`;

    const prompt = `${systemRules}

Topic (real Search Console opportunity, position ${Math.round(targetKeywordRow.position ?? 0)}, ${targetKeywordRow.impressions ?? 0} monthly impressions): "${targetKeyword}"

Generate the complete draft now.`;

    const aiText = await generateContentWithAi(prompt);
    const parsed = parseDelimited(aiText);
    if (!parsed.contentEs || !parsed.contentEn) {
      console.error("Content engine: AI response missing content blocks. Raw length:", aiText.length);
      return;
    }

    // 5. Resolve a real stock cover image (Pexels first, then Unsplash)
    const imageSearch = parsed.imageSearch || targetKeyword;
    let cover = await fetchCoverImage(imageSearch, pexelsKey, unsplashKey);
    if (!cover) {
      cover = {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        alt: imageSearch,
        credit: "Unsplash",
      };
    }

    // Replace image slots with real photos (distinct queries per slot)
    const bodyImages = await Promise.all([
      fetchCoverImage(`${imageSearch} office`, pexelsKey, unsplashKey),
      fetchCoverImage(`${imageSearch} documents`, pexelsKey, unsplashKey),
    ]);
    let contentEs = parsed.contentEs;
    let contentEn = parsed.contentEn;
    bodyImages.forEach((img, i) => {
      if (!img) return;
      const md = `![${img.alt}](${img.url})`;
      contentEs = contentEs.replace(`![IMG_SLOT_${i + 1}](IMG_SLOT_${i + 1})`, md);
      contentEn = contentEn.replace(`![IMG_SLOT_${i + 1}](IMG_SLOT_${i + 1})`, md);
    });

    // 6. Save as DRAFT for human review (never auto-publish)
    const publishDate = new Date().toISOString().split("T")[0];
    await db.collection("blogs").add({
      titleEs: parsed.titleEs || targetKeyword,
      titleEn: parsed.titleEn || targetKeyword,
      slugEs: parsed.slugEs || slugify(targetKeyword),
      slugEn: parsed.slugEn || slugify(targetKeyword),
      contentEs,
      contentEn,
      metaDesc: parsed.metaDesc || "",
      keywords: parsed.keywords || [targetKeyword],
      featuredImage: cover.url,
      imageCredit: cover.credit,
      targetKeyword,
      gscPositionAtDraft: Math.round(targetKeywordRow.position || 0),
      gscImpressionsAtDraft: targetKeywordRow.impressions || 0,
      author: "Guia Negocios Team",
      authorAvatar: "/images/team-avatar.webp",
      readTime: 9,
      language: "es",
      status: "Draft",
      publishDate,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      views: 0,
    });

    console.log(`Draft saved for "${targetKeyword}" — awaiting human review in /admin/blog.`);
  } catch (error: any) {
    console.error("scheduledContentEngine error:", error);
  }
});

function parseDelimited(raw: string): Record<string, any> {
  const out: Record<string, any> = {};
  const keys = ["TITLE_ES", "TITLE_EN", "SLUG_ES", "SLUG_EN", "META_DESC", "KEYWORDS", "IMAGE_SEARCH", "CONTENT_ES", "CONTENT_EN"];
  for (const key of keys) {
    const re = new RegExp(`===${key}===\\s*([\\s\\S]*?)(?====\\w+===|$)`, "i");
    const m = raw.match(re);
    if (m && m[1]) {
      const field = key === "KEYWORDS" ? "keywords" : key.charAt(0).toLowerCase() + key.slice(1).toLowerCase();
      out[field] = m[1].trim();
    }
  }
  if (out.keywords && typeof out.keywords === "string") {
    out.keywords = (out.keywords as string).split(",").map((k: string) => k.trim()).filter(Boolean);
  }
  return out;
}

function slugify(text: string): string {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
