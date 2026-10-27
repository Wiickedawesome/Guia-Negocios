import * as functions from 'firebase-functions';
import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as admin from 'firebase-admin';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { generateContentWithAi } from './ai.js';
import { gscQuery } from './seo/search.js';

admin.initializeApp();

// ── Admin authorization ──────────────────────────────────────────────
// Cloud Functions are publicly invocable by default, so every admin-only
// callable has to check the caller explicitly. This mirrors the isAdmin()
// rule in firestore.rules and the email guard in AdminLayout.astro, so an
// account that can already use the admin dashboard can also call these.
// The regex is anchored at the end on purpose: '...@guianegocios.net.evil.com'
// must not match.
const ADMIN_EMAIL_PATTERN = /@guianegocios[.]net$/i;

interface CallableRequest {
  auth?: { uid?: string; token?: { email?: unknown } };
}

function isAdminCaller(request: CallableRequest): boolean {
  const email = request.auth?.token?.email;
  return typeof email === 'string' && ADMIN_EMAIL_PATTERN.test(email);
}

function assertAdmin(request: CallableRequest): void {
  if (!isAdminCaller(request)) {
    throw new HttpsError('permission-denied', 'Admin access required.');
  }
}

// ── Public form intake limits ────────────────────────────────────────
// submitContactForm is the one deliberately-public callable. App Check keeps
// scripted abuse out, and these caps stop a single request from writing an
// unbounded document into Firestore (firestore.rules only checks that the
// required keys are present, not how large they are).
const FIELD_LIMITS = {
  name: 200,
  email: 320,
  phone: 40,
  subject: 200,
  message: 5000,
} as const;

function cleanString(value: unknown, field: keyof typeof FIELD_LIMITS): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, FIELD_LIMITS[field]);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Load the service account if present, otherwise use ADC
const keyFilename = path.join(__dirname, '../serviceAccount.json');
const analyticsDataClient = fs.existsSync(keyFilename)
  ? new BetaAnalyticsDataClient({ keyFilename })
  : new BetaAnalyticsDataClient();

const PROPERTY_ID = '546623303';

export const getAnalyticsData = onCall({ cors: true, invoker: 'public', enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  const rangeStr = request.data?.range || '30';
  let startDate = '30daysAgo';
  if (rangeStr === '90') startDate = '90daysAgo';
  else if (rangeStr === '365') startDate = '365daysAgo';

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: startDate, endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'newUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' }
      ]
    });

    const metrics = response.rows?.[0]?.metricValues || [];

    const [pagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: startDate, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      limit: 10,
      orderBys: [{ desc: true, metric: { metricName: 'screenPageViews' } }]
    });

    const topPages = (pagesResponse.rows || []).map((row: any) => ({
      path: row.dimensionValues?.[0]?.value || '/',
      views: row.metricValues?.[0]?.value || '0'
    }));

    const [citiesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: startDate, endDate: 'today' }],
      dimensions: [{ name: 'city' }],
      metrics: [{ name: 'activeUsers' }],
      limit: 8,
      orderBys: [{ desc: true, metric: { metricName: 'activeUsers' } }]
    });

    const topCities = (citiesResponse.rows || []).map((row: any) => ({
      city: row.dimensionValues?.[0]?.value || 'Unknown',
      users: row.metricValues?.[0]?.value || '0'
    }));

    const [languagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: startDate, endDate: 'today' }],
      dimensions: [{ name: 'language' }],
      metrics: [{ name: 'activeUsers' }],
      limit: 6,
      orderBys: [{ desc: true, metric: { metricName: 'activeUsers' } }]
    });

    const languages = (languagesResponse.rows || []).map((row: any) => ({
      language: row.dimensionValues?.[0]?.value || 'Unknown',
      users: row.metricValues?.[0]?.value || '0'
    }));

    const [timeSeriesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: startDate, endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ desc: false, dimension: { dimensionName: 'date' } }]
    });

    const timeSeries = (timeSeriesResponse.rows || []).map((row: any) => ({
      date: row.dimensionValues?.[0]?.value || '',
      users: row.metricValues?.[0]?.value || '0'
    }));

    const [trafficSourcesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate: startDate, endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ desc: true, metric: { metricName: 'activeUsers' } }]
    });

    const trafficSources = (trafficSourcesResponse.rows || []).map((row: any) => ({
      channel: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0', 10)
    }));

    // Bounce Rate in GA4 is 0.0 to 1.0 (e.g. 0.64 = 64.0%)
    const rawBounce = parseFloat(metrics[2]?.value || '0');
    const bouncePct = rawBounce <= 1.0 ? (rawBounce * 100).toFixed(1) : rawBounce.toFixed(1);

    // Format session duration nicely
    const rawSessionSec = parseFloat(metrics[3]?.value || '0');
    let sessionFormatted = `${rawSessionSec.toFixed(0)}s`;
    if (rawSessionSec >= 60) {
      const mins = Math.floor(rawSessionSec / 60);
      const secs = Math.floor(rawSessionSec % 60);
      sessionFormatted = `${mins}m ${secs}s`;
    }

    return {
      totals: {
        activeUsers: metrics[0]?.value || '0',
        newUsers: metrics[1]?.value || '0',
        bounceRate: `${bouncePct}%`,
        avgSessionDuration: sessionFormatted
      },
      topPages,
      topCities,
      languages,
      timeSeries,
      trafficSources
    };

  } catch (error: any) {
    // Report the failure instead of inventing numbers. A made-up baseline is
    // indistinguishable from real traffic in the dashboard and would be acted
    // on as if it were measured.
    console.error("GA4 data query failed:", error?.message || error);
    return {
      ok: false,
      reason: 'ga4_query_failed',
      message: error?.message || 'Google Analytics did not return data.',
      totals: null,
      topPages: [],
      topCities: [],
      languages: [],
      timeSeries: [],
      trafficSources: []
    };
  }
});

// Advanced Single-Page SEO Audit Function
export const runSeoAudit = onCall({ cors: true, invoker: 'public', enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  const { targetUrl } = request.data || {};
  
  if (!targetUrl) {
    throw new HttpsError('invalid-argument', 'targetUrl is required');
  }

  try {
    const response = await fetch(targetUrl, {
      headers: { "User-Agent": "GuiaNegocios-SEO-Agent/1.0" },
      signal: AbortSignal.timeout(10000)
    });
    const html = await response.text();
    const status = response.status;
    
    const $ = cheerio.load(html);
    
    const title = ($("head title").first().text() || "").trim();
    const metaDescription = $("head meta[name='description']").attr("content")?.trim();
    const h1s = $("h1");
    const h2s = $("h2");
    
    const imgs = $("img");
    let imagesMissingAlt = 0;
    imgs.each((_, el) => {
      const alt = $(el).attr("alt");
      if (alt === undefined || alt.trim() === "") imagesMissingAlt++;
    });

    const bodyText = $("body").text().replace(/\s+/g, " ").trim();
    const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
    
    const issues: any[] = [];
    const passed: string[] = [];
    let score = 100;

    if (status >= 400) {
      issues.push({ severity: 'high', message: `HTTP Status ${status} (Page not found or broken)` });
      score -= 40;
    }
    
    if (!title) {
      issues.push({ severity: 'high', message: "Missing <title> tag" });
      score -= 20;
    } else {
      if (title.length < 30) {
        issues.push({ severity: 'medium', message: `Title is too short (${title.length} chars). Aim for 30-60.` });
        score -= 5;
      } else if (title.length > 70) {
        issues.push({ severity: 'low', message: `Title is too long (${title.length} chars). Aim for 30-60.` });
        score -= 2;
      } else {
        passed.push("Title length is optimal.");
      }
    }

    if (!metaDescription) {
      issues.push({ severity: 'high', message: "Missing meta description", autoFixable: true });
      score -= 15;
    } else {
      if (metaDescription.length < 50) {
        issues.push({ severity: 'medium', message: `Meta description is too short (${metaDescription.length} chars)`, autoFixable: true });
        score -= 5;
      } else if (metaDescription.length > 160) {
        issues.push({ severity: 'low', message: `Meta description is too long (${metaDescription.length} chars)` });
        score -= 2;
      } else {
        passed.push("Meta description length is optimal.");
      }
    }

    if (h1s.length === 0) {
      issues.push({ severity: 'high', message: "Missing <h1> tag. Every page needs exactly one H1." });
      score -= 10;
    } else if (h1s.length > 1) {
      issues.push({ severity: 'low', message: `Multiple <h1> tags found (${h1s.length}). Try to use only one.` });
      score -= 3;
    } else {
      passed.push("Exactly one H1 tag found.");
    }
    
    if (h2s.length === 0) {
      issues.push({ severity: 'medium', message: "No <h2> tags found. Use H2s to structure content." });
      score -= 5;
    }

    if (imagesMissingAlt > 0) {
      issues.push({ severity: 'medium', message: `${imagesMissingAlt} out of ${imgs.length} images are missing alt text.` });
      score -= Math.min(10, imagesMissingAlt * 2);
    } else if (imgs.length > 0) {
      passed.push("All images have alt text.");
    }

    if (wordCount < 300) {
      issues.push({ severity: 'medium', message: `Thin content: Only ${wordCount} words detected.` });
      score -= 10;
    } else {
      passed.push("Sufficient word count.");
    }

    let aeoReadiness = "Page has standard structure. Ensure direct FAQ answers and structured schema are maintained for AI search engines.";
    let contentFeedback = `Scanned ${wordCount} words. Content is informative and clear.`;

    const finalScore = Math.max(0, Math.min(100, score));

    // `aiGrade` used to sit here as a fixed 85. Nothing measured it and no
    // page read it, so it was a fabricated metric with no consumer.
    return {
      score: finalScore,
      technicalScore: finalScore,
      issues,
      passed,
      aeoReadiness,
      contentFeedback,
      stats: {
        wordCount,
        imageCount: imgs.length,
        title,
        metaDescription
      }
    };
    
  } catch (error: any) {
    console.error("runSeoAudit error:", error);
    throw new HttpsError('internal', error.message || 'Failed to run SEO audit');
  }
});

// ── Search Console query report (read-only mirror of the GSC UI) ──
// The keywords page shows exactly what Search Console reports — query,
// clicks, impressions, CTR and position over the selected window. No
// curation, no AI and no stored copies: every load reads GSC directly so the
// numbers cannot drift from the source.
export const getSearchConsoleQueries = onCall({ cors: true, invoker: 'public', timeoutSeconds: 120, enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  try {
    const db = getFirestore();
    const requested = String(request.data?.range ?? '90');
    const days = requested === '28' ? 28 : requested === '365' ? 365 : 90;

    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const { rows } = await gscQuery(db, {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 500,
      dataState: 'all',
    });

    const queries = rows
      .map((row: any) => ({
        query: row.keys?.[0] || '',
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: typeof row.ctr === 'number' ? row.ctr : null,
        position: typeof row.position === 'number' ? Math.round(row.position * 10) / 10 : null,
      }))
      .filter((q: { query: string }) => q.query);

    return { ok: true, range: { startDate, endDate, days }, queries };
  } catch (error: any) {
    // Same contract as getAnalyticsData: report the failure instead of
    // returning anything that could be mistaken for data.
    console.error('getSearchConsoleQueries error:', error);
    return {
      ok: false,
      message: error?.message || 'Google Search Console did not return data.',
      queries: [],
    };
  }
});

// ── Autonomous Site-Wide SEO Audit ──
export const runSiteWideAudit = onCall({ cors: true, invoker: 'public', timeoutSeconds: 540, memory: '1GiB', enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  return await internalSiteWideAudit();
});

/**
 * Slug validator for wildcard rewrites (/es|/en/blog/**, /es|/en/lp/**).
 * Firebase static hosting rewrites ANY path under those prefixes to the client
 * view shell, so garbage URLs like /es/blog/does-not-exist served HTTP 200
 * soft-404s with thin duplicate content. This function checks Firestore and:
 *   - known slug  -> serves the static shell (200) which client JS hydrates
 *   - unknown slug -> returns a real 404 so Google doesn't crawl thin pages
 * Runs in region us-central1 (default for v2) with a 10s timeout.
 */
export const validateSlugRewrite = onRequest({ timeoutSeconds: 10, memory: '256MiB' }, async (req, res) => {
  // Only handle GET/HEAD document requests; let Firebase serve everything else.
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const path = req.path || '/';
  // Match /{lang}/{blog|lp}/<slug> — anything else passes through to hosting.
  const match = path.match(/^\/(en|es)\/(blog|lp)\/([^/]+)\/?$/);

  if (!match) {
    // Any path that reaches this function is already known NOT to be a static
    // file (hosting matches static content before rewrites), so nothing exists
    // behind it. This used to 302 to its own URL, which looped forever for
    // multi-segment paths such as /es/blog/a/b/. A real 404 is correct.
    res.status(404).type('text/plain').send('Not Found');
    return;
  }

  const [, lang, section, slug] = match;
  const slugValue: string = slug || '';

  try {
    const db = getFirestore();
    // Blogs validate against slugEs/slugEn/slug in Firestore; landing pages
    // (lp) have no Firestore registry, so the shell is always served there.
    if (section === 'blog') {
      const esMatch = await getDocsAsAdmin(db, 'blogs', 'slugEs', slugValue);
      const found = esMatch
        || await getDocsAsAdmin(db, 'blogs', 'slugEn', slugValue)
        || await getDocsAsAdmin(db, 'blogs', 'slug', slugValue);
      if (found) {
        // Known slug: serve the language-appropriate shell so client JS
        // hydrates the post in the URL's language.
        const shell = lang === 'en' ? `/en/blog/view/index.html` : `/es/blog/view/index.html`;
        const shellRes = await fetch(`https://guianegocios.net${shell}`);
        res.status(200).set('Content-Type', 'text/html; charset=utf-8').send(await shellRes.text());
        return;
      }
      res.status(404).send('Not Found');
      return;
    }
    // Landing pages are stored as `landingPages/{lang}_{slug}` (see
    // src/pages/{es,en}/lp/view.astro). Real slugs are static files and never
    // reach this function, so an unknown slug here is a genuine 404 rather
    // than the thin 200 shell that used to be served for any path.
    const lpDoc = await db.collection('landingPages').doc(`${lang}_${slugValue}`).get();
    // Same rule as the static builders: a Draft landing page is not published,
    // so it must not be served as a 200 shell for a wildcard URL.
    const lp = lpDoc.exists ? lpDoc.data() : null;
    const lpIsLive = !!lp && (lp.status === 'Active' || lp.status === 'Published');
    if (!lpIsLive) {
      res.status(404).type('text/plain').send('Not Found');
      return;
    }
    // Serve the shell for the requested language (the old code always served
    // the Spanish shell, even for /en/ URLs).
    const lpShell = lang === 'en' ? '/en/lp/view/index.html' : '/es/lp/view/index.html';
    const shellRes = await fetch(`https://guianegocios.net${lpShell}`);
    res.status(200).set('Content-Type', 'text/html; charset=utf-8').send(await shellRes.text());
  } catch (err: any) {
    console.error('validateSlugRewrite error:', err?.message || err);
    // Fail open on infrastructure errors (e.g. Firestore unavailable) so real
    // visitors still get a page. This replaces a 302 to the request's own URL,
    // which never resolved.
    const isEn = path.startsWith('/en/');
    const fallbackShell = path.includes('/blog/')
      ? (isEn ? '/en/blog/view/index.html' : '/es/blog/view/index.html')
      : (isEn ? '/en/lp/view/index.html' : '/es/lp/view/index.html');
    try {
      const shellRes = await fetch(`https://guianegocios.net${fallbackShell}`);
      res.status(200).set('Content-Type', 'text/html; charset=utf-8').send(await shellRes.text());
    } catch (shellErr: any) {
      res.status(503).type('text/plain').send('Temporarily unavailable');
    }
  }
});

async function getDocsAsAdmin(
  db: any,
  collectionName: string,
  field: string,
  value: string
): Promise<any> {
  const snap = await db.collection(collectionName).where(field, '==', value).get();
  return snap.empty ? null : snap;
}


async function internalSiteWideAudit() {
  try {
    const sitemapUrl = 'https://guianegocios.net/sitemap-0.xml';
    let urls: string[] = [];
    // Recorded on the audit so a caller can tell a real crawl from the
    // hardcoded route fallback below.
    let sitemapFetched = false;

    // 1. Discover URLs from sitemap
    try {
      const sitemapRes = await fetch(sitemapUrl, { signal: AbortSignal.timeout(5000) });
      if (sitemapRes.ok) {
        const sitemapXml = await sitemapRes.text();
        const $xml = cheerio.load(sitemapXml, { xmlMode: true });
        $xml('url loc').each((_, el) => {
          urls.push($xml(el).text().trim());
        });
        sitemapFetched = urls.length > 0;
      }
    } catch (e) {
      console.warn("Failed to fetch sitemap, using manual core routes:", e);
    }

    if (urls.length === 0) {
      urls = [
        'https://guianegocios.net/es/',
        'https://guianegocios.net/en/',
        'https://guianegocios.net/es/services/',
        'https://guianegocios.net/es/services/paquete-lanzamiento-completo/',
        'https://guianegocios.net/es/services/apoyo-creedava/',
        'https://guianegocios.net/es/services/operaciones-crecimiento/',
        'https://guianegocios.net/en/services/',
        'https://guianegocios.net/en/services/complete-launch-bundle/',
        'https://guianegocios.net/en/services/creedava-support/',
        'https://guianegocios.net/en/services/operations-growth/',
        'https://guianegocios.net/es/blog/',
        'https://guianegocios.net/es/blog/como-iniciar-llc-knoxville/',
        'https://guianegocios.net/es/blog/importancia-de-numero-ein/',
        'https://guianegocios.net/en/blog/',
        'https://guianegocios.net/en/blog/how-to-start-llc-knoxville/',
        'https://guianegocios.net/en/blog/importance-of-ein-number/',
        'https://guianegocios.net/es/about/',
        'https://guianegocios.net/es/contact/',
        'https://guianegocios.net/es/faq/',
        'https://guianegocios.net/en/about/',
        'https://guianegocios.net/en/contact/',
        'https://guianegocios.net/en/faq/'
      ];
    }

    const totalUrlsDiscovered = urls.length;
    // Ceiling only, to bound the crawl. The sitemap is the real scope.
    urls = urls.slice(0, 50);

    // A page only needs hreflang alternates when its other-language twin
    // actually exists. The two Spanish landing pages have no /en/ twin (both
    // return 404), so penalizing them for missing hreflang was a false
    // positive that cost 4 points on every audit.
    const urlSet = new Set(urls);
    const hasLanguageTwin = (pageUrl: string): boolean => {
      const path = pageUrl.replace('https://guianegocios.net', '');
      // Homepages are the one pair that is not a straight prefix swap: the
      // Spanish home is '/', the English home is '/en/'.
      if (path === '/') return urlSet.has('https://guianegocios.net/en/');
      if (path === '/en/') return urlSet.has('https://guianegocios.net/');
      const twinPath = path.startsWith('/es/')
        ? path.replace(/^\/es\//, '/en/')
        : path.replace(/^\/en\//, '/es/');
      return urlSet.has(`https://guianegocios.net${twinPath}`);
    };

    // 2. Crawl and analyze each URL
    const pageReports: any[] = [];
    const allIssues: string[] = [];
    let totalWordCount = 0;
    let missingAltCount = 0;
    let missingMetaCount = 0;
    let missingTitleCount = 0;
    let badTitleLengthCount = 0;
    let missingH1Count = 0;
    let missingCanonicalCount = 0;
    let missingHreflangCount = 0;
    let thinContentCount = 0;

    for (const url of urls) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) continue;
        const html = await res.text();
        const $ = cheerio.load(html);

        const title = $('title').text().trim();
        const metaDescription = $('meta[name="description"]').attr('content') || '';
        const h1Count = $('h1').length;
        const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
        const wordCount = bodyText.split(' ').length;
        totalWordCount += wordCount;

        const imgs = $('img');
        let imgsWithoutAlt = 0;
        imgs.each((_, img) => {
          if (!$(img).attr('alt')) imgsWithoutAlt++;
        });
        missingAltCount += imgsWithoutAlt;

        const canonical = $('link[rel="canonical"]').attr('href');
        const hreflangCount = $('link[rel="alternate"][hreflang]').length;
        const schemaCount = $('script[type="application/ld+json"]').length;

        const issues = [];
        if (!title) { issues.push(`Missing Title`); missingTitleCount++; }
        else if (title.length < 10 || title.length > 70) { issues.push(`Title length (${title.length}) is sub-optimal`); badTitleLengthCount++; }
        
        if (!metaDescription) {
          issues.push(`Missing Meta Description`);
          missingMetaCount++;
        }
        
        if (h1Count === 0) { issues.push(`Missing H1 tag`); missingH1Count++; }
        if (imgsWithoutAlt > 0) issues.push(`${imgsWithoutAlt} images missing alt text`);
        if (wordCount < 200) { issues.push(`Thin content (${wordCount} words)`); thinContentCount++; }
        if (!canonical) { issues.push(`Missing canonical link tag`); missingCanonicalCount++; }
        // Missing hreflang is only a defect when the other-language twin exists;
        // a page with no translation has nothing to reference.
        if (hreflangCount === 0 && hasLanguageTwin(url)) { issues.push(`Missing alternate hreflang tags`); missingHreflangCount++; }

        pageReports.push({ url, title, canonical, hreflangCount, schemaCount, issues });
        issues.forEach(i => allIssues.push(`[${url}] ${i}`));

      } catch (e) {
        console.warn(`Failed to crawl ${url}`, e);
      }
    }

    // 3. Deterministic score. Every penalty maps to a check that actually
    // failed on a crawled page, so the number is reproducible from the crawl
    // below. It used to start at a hardcoded 98 and clamp at 70, which meant
    // the site could never score below 70 no matter how broken it was.
    const scoredPages = pageReports.length;
    if (scoredPages === 0) {
      throw new Error('Crawl fetched no pages; refusing to score an empty audit.');
    }

    const checks: Array<{ label: string; count: number; perItem: number; max: number }> = [
      { label: 'pages with no title', count: missingTitleCount, perItem: 5, max: 20 },
      { label: 'titles outside 10-70 chars', count: badTitleLengthCount, perItem: 2, max: 10 },
      { label: 'pages with no meta description', count: missingMetaCount, perItem: 3, max: 15 },
      { label: 'pages with no H1', count: missingH1Count, perItem: 5, max: 20 },
      { label: 'images with no alt text', count: missingAltCount, perItem: 1, max: 12 },
      { label: 'pages under 200 words', count: thinContentCount, perItem: 3, max: 12 },
      { label: 'pages with no canonical tag', count: missingCanonicalCount, perItem: 4, max: 16 },
      { label: 'bilingual pages with no hreflang alternates', count: missingHreflangCount, perItem: 2, max: 8 },
    ];

    const deductions = checks
      .filter(c => c.count > 0)
      .map(c => ({ label: c.label, count: c.count, points: Math.min(c.max, c.count * c.perItem) }))
      .sort((a, b) => b.points - a.points);

    const totalDeduction = deductions.reduce((sum, d) => sum + d.points, 0);
    const calculatedScore = Math.max(0, 100 - totalDeduction);

    const actionableItems = allIssues.length > 0 ? [
      {
        priority: "High",
        task: "Resolve detected crawler issues",
        impact: allIssues[0] || "Improve on-page technical optimization."
      }
    ] : [
      {
        priority: "Low",
        task: "Publish weekly bilingual blog content targeting Knoxville business search terms",
        impact: "Drives organic top-of-funnel search traffic from local entrepreneurs looking for business setup and operations guidance."
      },
      {
        priority: "Low",
        task: "Build local directory citations on Knoxville Chamber and East Tennessee business registries",
        impact: "Strengthens off-page local authority and Google Maps ranking signals."
      },
      {
        priority: "Low",
        task: "Monitor Google Search Console indexing and performance for new bilingual URL routes",
        impact: "Ensures Google indexes both English and Spanish alternate URLs seamlessly."
      }
    ];

    // Derived from the crawl, not asserted. The previous text claimed "clean
    // URL routing, proper meta titles, and structured semantic HTML" even when
    // the crawl had found missing titles and missing descriptions.
    let summary = deductions.length === 0
      ? `Crawled ${scoredPages} pages (${totalWordCount.toLocaleString()} words). All ${checks.length} scored checks passed.`
      : `Crawled ${scoredPages} pages (${totalWordCount.toLocaleString()} words). ${allIssues.length} issue(s) across ${deductions.length} of ${checks.length} checks, costing ${totalDeduction} points. Largest contributors: ${deductions.slice(0, 3).map(d => `${d.label} (${d.count}, -${d.points})`).join('; ')}.`;

    // 4. Try Vertex AI enhancement
    try {
      const prompt = `
        You are an expert SEO auditor for GUIA DE NEGOCIOS (a bilingual business consultancy in Knoxville, TN).
        A crawler measured ${scoredPages} pages (${totalWordCount} total words) and produced this score: ${calculatedScore}/100.

        Deductions (measured, do not change or re-derive them):
        ${deductions.length === 0 ? 'None - every check passed.' : deductions.map(d => `- ${d.label}: ${d.count} occurrence(s), -${d.points} points`).join('\n')}

        Full issue list:
        ${allIssues.slice(0, 30).join('\n') || 'None detected'}

        Provide a professional summary and 3 prioritized action items that follow directly from the measured findings above.
        Do not invent metrics, benchmarks, competitor comparisons, or statistics that are not in this message.
        Format response EXACTLY as JSON:
        {
          "summary": "1-2 paragraph executive summary",
          "actionableItems": [
            { "priority": "High"|"Medium"|"Low", "task": "string", "impact": "string" }
          ]
        }
      `;
      const aiResponse = await generateContentWithAi(prompt, {
        responseMimeType: 'application/json'
      });
      const parsed = JSON.parse(aiResponse);
      if (parsed.summary) summary = parsed.summary;
      if (parsed.actionableItems && parsed.actionableItems.length > 0) {
        actionableItems.splice(0, actionableItems.length, ...parsed.actionableItems);
      }
    } catch (aiErr) {
      console.warn("Vertex AI enhancement note, using calculated audit report:", aiErr);
    }

    // 5. Save to Firestore seoAudits collection
    const auditDoc = {
      scannedAt: FieldValue.serverTimestamp(),
      pagesScanned: scoredPages,
      // Total URLs the sitemap advertised, so a partial crawl is visible as
      // partial instead of being presented as a full site scan.
      urlsDiscovered: totalUrlsDiscovered,
      sitemapFetched,
      globalScore: calculatedScore,
      deductions,
      issuesFound: allIssues.length,
      summary,
      actionableItems,
      rawPageReports: pageReports
    };

    const docRef = await getFirestore().collection('seoAudits').add(auditDoc);

    return { id: docRef.id, ...auditDoc, scannedAt: new Date().toISOString() };

  } catch (error: any) {
    console.error("runSiteWideAudit error:", error);
    throw new HttpsError('internal', error.message || 'Failed to run site-wide SEO audit');
  }
}

export const scheduledSeoAudit = onSchedule({
  schedule: "every sunday 02:00",
  timeoutSeconds: 540,
  memory: '1GiB'
}, async (event) => {
  await internalSiteWideAudit();
});

// ── Backlink Verifier ──
export const verifyBacklinks = onCall({ cors: true, invoker: 'public', enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  return await internalVerifyBacklinks();
});

async function internalVerifyBacklinks() {
  try {
    const db = getFirestore();
    let backlinksSnap = await db.collection('backlinks').get();

    let verifiedCount = 0;

    for (const doc of backlinksSnap.docs) {
      const data = doc.data();
      const targetUrl = data.url;
      if (!targetUrl) continue;

      let status = data.status || 'Active';
      let isNofollow = data.isNofollow || false;
      let title = data.pageTitle || '';

      try {
        const res = await fetch(targetUrl, { signal: AbortSignal.timeout(6000) });
        if (!res.ok) {
          // The page is unreachable, so we cannot claim the link is there.
          status = 'Unreachable';
        } else {
          const html = await res.text();
          const $ = cheerio.load(html);
          title = $('title').text().trim() || title;

          const links = $('a[href*="guianegocios.net"]');
          if (links.length > 0) {
            status = 'Active';
            links.each((_, el) => {
              const rel = $(el).attr('rel');
              if (rel && rel.toLowerCase().includes('nofollow')) {
                isNofollow = true;
              }
            });
          } else {
            // Reachable page, but no link to us. Reporting that is the point of
            // the check - the old code left the previous status in place, so a
            // lost link kept showing as 'Active' forever.
            status = 'No link found';
            isNofollow = false;
          }
        }
      } catch (e) {
        status = 'Unreachable';
        console.warn(`Backlink ping notice for ${targetUrl}`);
      }

      await doc.ref.update({
        status,
        isNofollow,
        pageTitle: title,
        lastVerifiedAt: FieldValue.serverTimestamp()
      });
      verifiedCount++;
    }

    return { verified: verifiedCount };

  } catch (error: any) {
    console.error("verifyBacklinks error:", error);
    throw new HttpsError('internal', error.message || 'Failed to verify backlinks');
  }
}

export const scheduledVerifyBacklinks = onSchedule("every 48 hours", async (event) => {
  await internalVerifyBacklinks();
});

// ── Link Building Outreach ──
export const generateLinkOutreach = onCall({ cors: true, invoker: 'public', enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  try {
    // Curated outreach targets. URLs re-verified live 2026-10-18 (all HTTP 200).
    // The Tennessee Hispanic Chamber entry is gone for good: both tnhcc.org
    // and tnhcc.com fail DNS, so there is no page to reach.
    const curatedOpportunities = [
      {
        targetName: "Centro Hispano de East TN",
        targetUrl: "https://www.centrohispanotn.org/",
        strategy: "Community Resource Guide & Workshop Partnership (Knoxville)",
        emailDraft: "Subject: Partnership & Business Resource Listing for Hispanic Entrepreneurs\n\nEstimado equipo de Centro Hispano,\n\nAdmiramos mucho el continuo apoyo que brindan a la comunidad hispana en East Tennessee. En GUIA DE NEGOCIOS, asistimos a emprendedores locales con la formación de LLCs, licencias comerciales y contabilidad bilingüe.\n\nNos encantaría colaborar en un taller comunitario sobre creación de empresas o ser incluidos como recurso informativo en su guía de emprendimiento.\n\nQuedamos a su disposición para coordinar una breve llamada.\n\nSaludos cordiales,\nEquipo GUIA NEGOCIOS"
      },
      {
        targetName: "Knoxville Chamber of Commerce",
        targetUrl: "https://www.knoxvillechamber.com/directory/",
        strategy: "Minority Business & Bilingual Consultancy Listing (Knox County)",
        emailDraft: "Subject: Minority Business Directory Listing & Partnership - Guia Negocios\n\nDear Knoxville Chamber Team,\n\nWe are a Knoxville-based business consultancy specializing in helping Hispanic and multicultural founders launch and grow registered businesses in Tennessee.\n\nWe would love to ensure our services are accurately indexed in the Chamber's directory and explore ways to collaborate on immigrant entrepreneurship resources.\n\nBest regards,\nGUIA NEGOCIOS Team"
      },
      {
        targetName: "Nashville Area Hispanic Chamber of Commerce (NAHCC)",
        targetUrl: "https://www.nashvillehispanicchamber.com/",
        strategy: "Regional Hispanic Network & Launch Resource (Middle TN & Southeast)",
        emailDraft: "Subject: Collaboration on Bilingual Business Launch Systems — NAHCC & Guia Negocios\n\nEstimado equipo de NAHCC,\n\nReconocemos la gran labor que realizan impulsando negocios en la región central de Tennessee. Desde GUIA DE NEGOCIOS ayudamos a emprendedores hispanos a estructurar empresas rentables con cumplimiento tributario, sistemas digitales y asistentes virtuales bilingües.\n\nNos encantaría conectar para intercambiar recursos educativos y participar en sus redes de asesoría.\n\nUn cordial saludo,\nGUIA NEGOCIOS"
      },
      {
        targetName: "Tennessee SBDC at Pellissippi State",
        targetUrl: "https://tsbdc.org/center/knoxville/",
        strategy: "Bilingual Resource Referral Partner (Statewide Network)",
        emailDraft: "Subject: Bilingual Business Advisory Resource Collaboration\n\nDear TSBDC Advisers,\n\nAs a consultancy serving Spanish-speaking entrepreneurs across Knox, surrounding counties, and statewide Tennessee, we frequently assist clients in establishing proper business entities and compliance.\n\nWe would welcome the opportunity to connect and collaborate as a bilingual referral resource for local and regional founders.\n\nWarm regards,\nGUIA NEGOCIOS Team"
      },
      {
        targetName: "Chattanooga Area Chamber - Diverse Business Hub",
        targetUrl: "https://chattanoogachamber.com/diversity/",
        strategy: "Southeast Regional Latino Hub Inclusion (Southeast TN / North GA)",
        emailDraft: "Subject: Bilingual Entrepreneurship Resource Listing — Guia Negocios\n\nDear Chattanooga Chamber Inclusion Team,\n\nWe provide turnkey bilingual business setup, bookkeeping, and operational consulting for diverse entrepreneurs across East and Southeast Tennessee.\n\nWe would love to connect and share our guides as a trusted Spanish/English resource for founders in the region.\n\nWarm regards,\nGUIA NEGOCIOS Team"
      }
    ];

    // Persist opportunities to Firestore linkOutreach collection.
    // Note: no Domain Authority value is stored. The previous `daEstimate`
    // numbers (42/54/58/48/62/56) were invented, not measured by any tool.
    const db = getFirestore();
    let saveErrors = 0;
    for (const opp of curatedOpportunities) {
      try {
        const queryExisting = await db.collection('linkOutreach').where('targetUrl', '==', opp.targetUrl).limit(1).get();
        if (queryExisting.empty) {
          await db.collection('linkOutreach').add({
            ...opp,
            // A draft, not a sent/ready email: nothing here has verified that
            // the target accepts submissions.
            status: 'Draft',
            createdAt: FieldValue.serverTimestamp()
          });
        }
      } catch (e) {
        saveErrors++;
        console.warn("Could not save to linkOutreach collection:", e);
      }
    }

    // Report how many drafts were persisted instead of implying all succeeded.
    return { opportunities: curatedOpportunities, saved: curatedOpportunities.length - saveErrors, saveErrors };

  } catch (error: any) {
    console.error("generateLinkOutreach error:", error);
    throw new HttpsError('internal', error.message || 'Failed to generate link outreach');
  }
});

export const generateOnDemandReport = onCall({ cors: true, invoker: 'public', timeoutSeconds: 120, enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  return await internalGenerateReport(request.auth?.uid || 'admin');
});

async function internalGenerateReport(generatedBy: string = 'system') {
  try {
    const db = getFirestore();
    
    const auditsSnap = await db.collection('seoAudits').orderBy('scannedAt', 'desc').limit(1).get();
    // null when no audit exists yet. The previous default of 90 put a made-up
    // score on the report.
    let seoScore: number | null = null;
    if (!auditsSnap.empty && auditsSnap.docs[0]) {
      const gs = auditsSnap.docs[0].data().globalScore;
      if (typeof gs === 'number') seoScore = gs;
    }

    const backlinksSnap = await db.collection('backlinks').get();
    let totalLinks = 0, activeLinks = 0;
    backlinksSnap.forEach((doc: any) => {
      totalLinks++;
      if (doc.data().status === 'Active') activeLinks++;
    });

    const keywordsSnap = await db.collection('keywords').get();
    const totalKeywords = keywordsSnap.size;

    const contactsSnap = await db.collection('contacts').get();
    const totalInquiries = contactsSnap.size;

    const reportData = {
      title: `Executive Performance Report — ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      generatedAt: FieldValue.serverTimestamp(),
      generatedBy,
      metrics: {
        seoHealth: seoScore === null ? '—' : `${seoScore}%`,
        activeBacklinks: activeLinks,
        trackedKeywords: totalKeywords,
        inquiriesReceived: totalInquiries
      },
      summary: seoScore === null
        ? `No site-wide SEO audit has been recorded yet. Tracking ${totalKeywords} keywords with ${activeLinks} active backlinks and ${totalInquiries} inquiries received.`
        : `Latest SEO audit score is ${seoScore}%, tracking ${totalKeywords} keywords with ${activeLinks} active backlinks and ${totalInquiries} inquiries received.`
    };

    const docRef = await db.collection('reports').add(reportData);

    return { id: docRef.id, ...reportData, generatedAt: new Date().toISOString() };
  } catch (error: any) {
    console.error("generateOnDemandReport error:", error);
    throw new HttpsError('internal', 'Failed to generate report.');
  }
}

// ── Contact Form Handler ──
// Intentionally public: this is the website's own intake endpoint. Nothing in
// src/ calls it today (the contact page writes to Firestore directly), so
// App Check enforcement cannot break a live UI path.
export const submitContactForm = onCall(
  { cors: true, invoker: 'public', enforceAppCheck: true },
  async (request) => {
    const name = cleanString(request.data?.name, 'name');
    const email = cleanString(request.data?.email, 'email');
    const phone = cleanString(request.data?.phone, 'phone');
    const subject = cleanString(request.data?.subject, 'subject');
    const message = cleanString(request.data?.message, 'message');

    if (!name || !email || !message) {
      throw new HttpsError('invalid-argument', 'Missing required fields.');
    }
    if (!EMAIL_PATTERN.test(email)) {
      throw new HttpsError('invalid-argument', 'Invalid email address.');
    }

    try {
      const db = getFirestore();

      await db.collection('contacts').add({
        name,
        email,
        phone,
        subject,
        message,
        createdAt: FieldValue.serverTimestamp()
      });

      await db.collection('notifications').add({
        title: 'Nuevo Mensaje de Contacto',
        message: `${name} (${email}) — ${subject || 'Consulta'}`,
        type: 'contact',
        read: false,
        link: '/admin/dashboard',
        createdAt: FieldValue.serverTimestamp()
      });

      // Values are escaped before interpolation: this string is rendered as
      // HTML by the email extension, and every field here is user input.
      await db.collection('mail').add({
        to: 'info@guianegocios.net',
        message: {
          subject: `New Lead from Guia Negocios: ${name} - ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${subject}\n\nMessage:\n${message}`,
          html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Service:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong><br/>${escapeHtml(message)}</p>`
        },
        createdAt: FieldValue.serverTimestamp()
      });

      return { success: true, message: 'Message sent successfully.' };
    } catch (error: any) {
      // Let deliberate validation errors reach the caller instead of masking
      // every failure as 'internal'.
      if (error instanceof HttpsError) throw error;
      console.error("submitContactForm error:", error);
      throw new HttpsError('internal', 'Failed to submit contact form.');
    }
  }
);

// ── AI Content Generator (Server-Side Vertex AI / Fallback) ──
export const generateAiContent = onCall({ cors: true, invoker: 'public', timeoutSeconds: 120, enforceAppCheck: true }, async (request) => {
  assertAdmin(request);
  const { prompt, temperature, model: requestedModel } = request.data || {};
  if (!prompt) {
    throw new HttpsError('invalid-argument', 'Prompt is required.');
  }

  try {
    const text = await generateContentWithAi(prompt, {
      model: requestedModel,
      temperature
    });
    return { text };
  } catch (err: any) {
    console.error("generateAiContent error:", err);
    throw new HttpsError('internal', err?.message || 'Failed to generate AI content with Vertex AI.');
  }
});

export * from './contentEngine';
export * from './dataJournalism';
// `./aeoInjector` was removed: scheduledAeoInjector generated FAQPage markup from
// model-simulated "People Also Ask" questions, which described content no page
// actually showed (0 of 56 pages matched any of its keywords).
export * from './internalLinking';
export * from './linkOutreach';
export * from './seo-agent';
export * from './seo-schedules';
