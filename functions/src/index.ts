import * as functions from 'firebase-functions';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as admin from 'firebase-admin';
import { getApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as path from 'path';
// @ts-ignore
import * as googleTrends from 'google-trends-api';
import * as cheerio from 'cheerio';

admin.initializeApp();

// Load the service account directly
// Warning: In a real production app, use Secret Manager or ADC instead of putting the JSON in the build.
const keyFilename = path.join(__dirname, '../serviceAccount.json');
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename
});

const PROPERTY_ID = '401979686';

export const getAnalyticsData = onCall(async (request) => {
  // 1. Verify user is authenticated
  if (!request.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be logged in to access analytics.'
    );
  }

  try {
    // 2. Fetch basic metrics (Last 30 Days)
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'newUsers' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' }
      ]
    });

    const metrics = response.rows?.[0]?.metricValues || [];

    // 3. Fetch Top Pages
    const [pagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'pagePath' }
      ],
      metrics: [
        { name: 'screenPageViews' }
      ],
      limit: 5,
      orderBys: [
        {
          desc: true,
          metric: { metricName: 'screenPageViews' }
        }
      ]
    });

    const topPages = (pagesResponse.rows || []).map(row => ({
      path: row.dimensionValues?.[0]?.value || '/',
      views: row.metricValues?.[0]?.value || '0'
    }));

    // 4. Fetch Top Cities
    const [citiesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'city' }
      ],
      metrics: [
        { name: 'activeUsers' }
      ],
      limit: 5,
      orderBys: [
        {
          desc: true,
          metric: { metricName: 'activeUsers' }
        }
      ]
    });

    const topCities = (citiesResponse.rows || []).map(row => ({
      city: row.dimensionValues?.[0]?.value || 'Unknown',
      users: row.metricValues?.[0]?.value || '0'
    }));

    // 5. Fetch Languages
    const [languagesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'language' }
      ],
      metrics: [
        { name: 'activeUsers' }
      ],
      limit: 2,
      orderBys: [
        {
          desc: true,
          metric: { metricName: 'activeUsers' }
        }
      ]
    });

    const languages = (languagesResponse.rows || []).map(row => ({
      language: row.dimensionValues?.[0]?.value || 'Unknown',
      users: row.metricValues?.[0]?.value || '0'
    }));
    // 6. Fetch Time Series (Active Users over last 30 days)
    const [timeSeriesResponse] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        { name: 'date' }
      ],
      metrics: [
        { name: 'activeUsers' }
      ],
      orderBys: [
        {
          asc: true,
          dimension: { dimensionName: 'date' }
        }
      ]
    });

    const timeSeries = (timeSeriesResponse.rows || []).map(row => ({
      date: row.dimensionValues?.[0]?.value || '',
      users: row.metricValues?.[0]?.value || '0'
    }));

    return {
      totals: {
        activeUsers: metrics[0]?.value || '0',
        newUsers: metrics[1]?.value || '0',
        bounceRate: metrics[2]?.value ? parseFloat(metrics[2].value).toFixed(2) + '%' : '0%',
        avgSessionDuration: metrics[3]?.value ? parseFloat(metrics[3].value).toFixed(1) + 's' : '0s'
      },
      topPages,
      topCities,
      languages,
      timeSeries
    };

  } catch (error) {
    console.error("Error fetching GA4 data:", error);
    throw new HttpsError('internal', 'Failed to fetch analytics data.');
  }
});

/**
 * discoverKeywords fetches real autocomplete suggestions and trends.
 */
export const discoverKeywords = onCall(async (request) => {
  try {
    const { topic, lang = 'en' } = request.data;
    if (!topic) throw new HttpsError('invalid-argument', 'Missing topic');

    // 1. Fetch Google Autocomplete
    const autocompleteUrl = `http://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(topic)}&hl=${lang}`;
    const res = await fetch(autocompleteUrl);
    const data: any = await res.json();
    const suggestions = data[1] || []; // Chrome format: [query, [suggestions...]]

    // 2. We only want top 5 to avoid Trends API limits
    const topKeywords = [topic, ...suggestions].slice(0, 5);
    
    // 3. Fetch Trends Data
    const trendsData = await googleTrends.interestOverTime({
      keyword: topKeywords,
      geo: 'US', // Focus on US
      startTime: new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)) // Last 90 days
    });

    const parsedTrends = JSON.parse(trendsData);
    const timelineData = parsedTrends?.default?.timelineData || [];
    
    // Calculate simple trend direction based on last 2 data points
    const trends = topKeywords.map((kw, index) => {
      if (timelineData.length < 2) return { keyword: kw, trend: '-' };
      
      const lastPoint = timelineData[timelineData.length - 1].value[index];
      const prevPoint = timelineData[timelineData.length - 2].value[index];
      
      let trend = '-';
      if (lastPoint > prevPoint) trend = `↑ ${lastPoint - prevPoint}`;
      if (lastPoint < prevPoint) trend = `↓ ${prevPoint - lastPoint}`;
      
      return { keyword: kw, trend, relativeVolume: lastPoint };
    });

    return { trends };
  } catch (error: any) {
    console.error('Discover Keywords Error:', error);
    throw new HttpsError('internal', 'Failed to discover keywords');
  }
});

// Advanced SEO Audit Function
export const runSeoAudit = onCall(async (request) => {
  const { targetUrl } = request.data;
  
  if (!targetUrl) {
    throw new HttpsError('invalid-argument', 'targetUrl is required');
  }

  try {
    // 1. Fetch the live HTML
    const response = await fetch(targetUrl, {
      headers: { "User-Agent": "GuiaNegocios-SEO-Agent/1.0" }
    });
    const html = await response.text();
    const status = response.status;
    
    // 2. Parse with Cheerio
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
    
    // Build deterministic issues
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
      } else if (title.length > 60) {
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
      if (metaDescription.length < 70) {
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
    
    // 3. Fetch target keywords from Firestore for AI Grading
    const keywordsSnap = await getFirestore().collection('keywords')
      .where('priority', '==', 'High')
      .limit(10)
      .get();
      
    const targetKeywords = keywordsSnap.docs.map((d: any) => d.data().keyword);

    // 4. Send to Gemini for AEO & Intent Grading
    // We send a truncated version of the body text to avoid huge payloads
    const truncatedText = bodyText.substring(0, 10000); 

    const settingsDoc = await getFirestore().collection('settings').doc('admin').get();
    const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : '';
    if (!geminiKey) throw new HttpsError('failed-precondition', 'Gemini API key is not configured.');

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
      You are an expert SEO and AEO (Answer Engine Optimization) auditor.
      I have a webpage whose primary text content is provided below.
      The business targets Latino entrepreneurs in the USA.
      Our highest priority keywords are: ${targetKeywords.join(', ') || 'None provided'}.
      
      Review the content and provide an AEO readiness assessment. How well does it answer direct questions? Does it match the target keywords?
      
      Format your response exactly as this JSON object:
      {
        "aiGrade": number (0 to 100 representing content quality & intent match),
        "aeoReadiness": "string (A paragraph explaining how well it is optimized for ChatGPT/Gemini and what to improve)",
        "contentFeedback": "string (A paragraph of general content feedback)"
      }
      
      Content:
      "${truncatedText}"
    `;

    const result = await model.generateContent(prompt);
    let aiAnalysis = { aiGrade: 80, aeoReadiness: "Could not analyze.", contentFeedback: "" };
    try {
      aiAnalysis = JSON.parse(result.response.text());
    } catch(e) {
      console.error("AI JSON parse failed", e);
    }

    // Blend AI grade into final score (70% tech / 30% AI)
    const finalScore = Math.max(0, Math.round((score * 0.7) + (aiAnalysis.aiGrade * 0.3)));

    return {
      score: finalScore,
      technicalScore: Math.max(0, score),
      aiGrade: aiAnalysis.aiGrade,
      issues,
      passed,
      aeoReadiness: aiAnalysis.aeoReadiness,
      contentFeedback: aiAnalysis.contentFeedback,
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

// ── Search Console Scanner ──
// Queries Google Search Console for real keyword performance data.
// Supports two modes:
//   1. Auto-scan: fetches top queries by clicks/impressions (no phrase needed)
//   2. Phrase filter: filters queries containing a user-provided phrase
export const scanSearchConsole = onCall(async (request) => {
  const { phrase } = request.data;
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be logged in.');
  }

  try {
    const db = getFirestore();
    const settingsDoc = await db.collection('settings').doc('admin').get();
    const gscUrl = settingsDoc.exists ? settingsDoc.data()?.gscUrl : '';
    const siteUrl = gscUrl || 'sc-domain:guianegocios.net';

    const { google } = await import('googleapis');

    // Authenticate with the service account
    const authClient = new google.auth.GoogleAuth({
      keyFile: keyFilename,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    // Build the request — last 90 days
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const requestBody: any = {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 50,
      dataState: 'all',
    };

    // If a phrase is provided, filter queries containing it
    if (phrase && phrase.trim()) {
      requestBody.dimensionFilterGroups = [{
        filters: [{
          dimension: 'query',
          operator: 'contains',
          expression: phrase.trim(),
        }],
      }];
    }

    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody,
    });

    const rows = response.data.rows || [];

    // Map to a clean format
    const keywords = rows.map((row: any) => ({
      keyword: row.keys?.[0] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr ? (row.ctr * 100).toFixed(1) + '%' : '0%',
      position: row.position ? Math.round(row.position * 10) / 10 : 99,
    }));

    return {
      keywords,
      dateRange: { startDate, endDate },
      totalRows: keywords.length,
    };

  } catch (error: any) {
    console.error('scanSearchConsole error:', error);

    // Provide a helpful error for common issues
    if (error.code === 403 || error.message?.includes('403')) {
      throw new HttpsError(
        'permission-denied',
        'Service account does not have access to Search Console. Add the service account email as a user in Google Search Console → Settings → Users and permissions.'
      );
    }

    throw new HttpsError('internal', error.message || 'Failed to scan Search Console');
  }
});

// ── Autonomous Site-Wide SEO Audit ──
// Fetches the sitemap, crawls up to 20 pages, runs Cheerio technical analysis,
// aggregates the data, and uses Gemini to generate a global score and actionable items.
export const runSiteWideAudit = onCall({ timeoutSeconds: 540, memory: '1GiB' }, async (request) => {
  return await internalSiteWideAudit();
});

async function internalSiteWideAudit() {
  try {
    const sitemapUrl = 'https://guianegocios.net/sitemap-0.xml'; // Typical Astro sitemap URL
    let urls: string[] = [];

    // 1. Discover URLs
    try {
      const sitemapRes = await fetch(sitemapUrl);
      if (sitemapRes.ok) {
        const sitemapXml = await sitemapRes.text();
        const $xml = cheerio.load(sitemapXml, { xmlMode: true });
        $xml('url loc').each((_, el) => {
          urls.push($xml(el).text());
        });
      }
    } catch (e) {
      console.warn("Failed to fetch sitemap, falling back to manual URLs", e);
    }

    // Fallback if sitemap fails or is empty
    if (urls.length === 0) {
      urls = [
        'https://guianegocios.net',
        'https://guianegocios.net/services',
        'https://guianegocios.net/about',
        'https://guianegocios.net/contact'
      ];
    }

    // Limit to 20 to avoid function timeouts
    urls = urls.slice(0, 20);

    // 2. Crawl and analyze each URL
    const pageReports: any[] = [];
    const allIssues: string[] = [];
    let totalWordCount = 0;

    for (const url of urls) {
      try {
        const res = await fetch(url);
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

        const issues = [];
        if (!title) issues.push(`Missing Title`);
        else if (title.length < 10 || title.length > 70) issues.push(`Title length (${title.length}) is sub-optimal`);
        
        if (!metaDescription) issues.push(`Missing Meta Description`);
        else if (metaDescription.length < 50 || metaDescription.length > 160) issues.push(`Meta desc length (${metaDescription.length}) is sub-optimal`);
        
        if (h1Count === 0) issues.push(`Missing H1 tag`);
        else if (h1Count > 1) issues.push(`Multiple H1 tags (${h1Count})`);
        
        if (imgsWithoutAlt > 0) issues.push(`${imgsWithoutAlt} images missing alt text`);
        if (wordCount < 300) issues.push(`Thin content (${wordCount} words)`);

        pageReports.push({ url, title, issues });
        issues.forEach(i => allIssues.push(`[${url}] ${i}`));

      } catch (e) {
        console.warn(`Failed to crawl ${url}`, e);
      }
    }

    // 3. Aggregate data and send to Gemini
    const settingsDoc = await getFirestore().collection('settings').doc('admin').get();
    const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : '';
    if (!geminiKey) throw new HttpsError('failed-precondition', 'Gemini API key is not configured.');

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: { responseMimeType: 'application/json' }
    });

    // Sample the issues if there are too many (to save tokens)
    const issueSample = allIssues.slice(0, 50).join('\n');

    const prompt = `
      You are an expert SEO auditor for GUIA DE NEGOCIOS (a bilingual business consultancy).
      I have just crawled ${pageReports.length} pages on the site.
      
      Total words scanned: ${totalWordCount}
      
      Here are the specific technical issues found across the pages:
      ${issueSample || 'No major technical issues found.'}
      
      Based on this data, provide a site-wide SEO audit report.
      Format your response EXACTLY as this JSON object:
      {
        "globalScore": number (0-100),
        "summary": "string (1-2 paragraphs summarizing the overall SEO health of the site)",
        "actionableItems": [
          {
            "priority": "High" | "Medium" | "Low",
            "task": "string (e.g., 'Add meta descriptions to 5 blog posts')",
            "impact": "string (Why this matters)"
          }
        ],
        "suggestedFixes": [
          {
            "url": "string (The URL of the page with the issue)",
            "type": "string (e.g., 'meta_description', 'title', 'h1')",
            "newValue": "string (The AI-generated optimal value to fix the issue)"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    let aiReport;
    try {
      aiReport = JSON.parse(result.response.text());
    } catch (e) {
      console.error("AI JSON parse failed", e);
      throw new HttpsError('internal', 'AI failed to generate a valid report format.');
    }

    // 4. Save to Firestore
    const auditDoc = {
      scannedAt: FieldValue.serverTimestamp(),
      pagesScanned: pageReports.length,
      globalScore: aiReport.globalScore,
      summary: aiReport.summary,
      actionableItems: aiReport.actionableItems,
      rawPageReports: pageReports
    };

    const docRef = await getFirestore().collection('seoAudits').add(auditDoc);

    // Save Auto-Remediation fixes to Firestore
    if (aiReport.suggestedFixes && aiReport.suggestedFixes.length > 0) {
      const batch = getFirestore().batch();
      for (const fix of aiReport.suggestedFixes) {
        const fixRef = getFirestore().collection('seoFixes').doc();
        batch.set(fixRef, {
          ...fix,
          status: 'Pending',
          auditId: docRef.id,
          createdAt: FieldValue.serverTimestamp()
        });
      }
      await batch.commit();
      console.log(`Saved ${aiReport.suggestedFixes.length} auto-remediation fixes to Firestore.`);
    }

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
// Iterates through tracked backlinks in Firestore and verifies if the link still exists.
export const verifyBacklinks = onCall(async (request) => {
  return await internalVerifyBacklinks();
});

async function internalVerifyBacklinks() {
  try {
    const db = getFirestore();
    const backlinksSnap = await db.collection('backlinks').get();
    
    if (backlinksSnap.empty) return { verified: 0 };

    const updates: Promise<any>[] = [];
    let verifiedCount = 0;

    for (const doc of backlinksSnap.docs) {
      const data = doc.data();
      const targetUrl = data.url;
      if (!targetUrl) continue;

      let status = 'Lost';
      let isNofollow = false;
      let title = '';

      try {
        const res = await fetch(targetUrl, { timeout: 10000 });
        if (res.ok) {
          const html = await res.text();
          const $ = cheerio.load(html);
          title = $('title').text().trim();
          
          // Look for any link containing our domain
          const links = $('a[href*="guianegocios.net"]');
          if (links.length > 0) {
            status = 'Active';
            // Check if any of the links are nofollow
            links.each((_, el) => {
              const rel = $(el).attr('rel');
              if (rel && rel.toLowerCase().includes('nofollow')) {
                isNofollow = true;
              }
            });
          }
        }
      } catch (e) {
        console.warn(`Failed to verify backlink ${targetUrl}`, e);
        // If it times out or errors, mark as Pending/Error rather than definitively lost
        status = 'Error';
      }

      updates.push(
        doc.ref.update({
          status,
          isNofollow,
          pageTitle: title || data.pageTitle || '',
          lastVerifiedAt: FieldValue.serverTimestamp()
        })
      );
      verifiedCount++;
    }

    await Promise.all(updates);
    return { verified: verifiedCount };

  } catch (error: any) {
    console.error("verifyBacklinks error:", error);
    throw new HttpsError('internal', error.message || 'Failed to verify backlinks');
  }
}

export const scheduledVerifyBacklinks = onSchedule("every 48 hours", async (event) => {
  await internalVerifyBacklinks();
});

// ── AI Link Building Outreach ──
// Generates personalized link building opportunities and email drafts using Gemini.
export const generateLinkOutreach = onCall(async (request) => {
  try {
    // @ts-ignore
    const { getVertexAI, getGenerativeModel } = await import('firebase-admin/vertexai');
    const vertexAI = getVertexAI(getApp());
    const model = getGenerativeModel(vertexAI, { 
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
      You are an expert SEO link builder for GUIA DE NEGOCIOS.
      Business Profile: Bilingual business consultancy in Knoxville, TN. We help Latino entrepreneurs form LLCs, handle taxes, and navigate business licensing.
      
      Your goal is to suggest 5 highly relevant local or niche link-building opportunities (e.g., local TN business directories, Hispanic chambers of commerce, partner law firms, local news).
      
      For each opportunity, draft a short, highly personalized outreach email asking for a backlink, a guest post, or a partnership.
      
      Format your response EXACTLY as this JSON array:
      [
        {
          "targetName": "string (Name of the organization)",
          "targetUrl": "string (Their website)",
          "daEstimate": number (Your estimate of their Domain Authority 1-100),
          "strategy": "string (Guest post, directory listing, partnership)",
          "emailDraft": "string (The outreach email body)"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    
    try {
      const opportunities = JSON.parse(result.response.text());
      return { opportunities };
    } catch (e) {
      console.error("AI JSON parse failed", e);
      throw new HttpsError('internal', 'AI failed to generate opportunities format.');
    }

  } catch (error: any) {
    console.error("generateLinkOutreach error:", error);
    throw new HttpsError('internal', error.message || 'Failed to generate link outreach');
  }
});

export const generateOnDemandReport = onCall({ timeoutSeconds: 120 }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Must be logged in');
  }
  return await internalGenerateReport(request.auth.uid);
});

async function internalGenerateReport(generatedBy: string = 'system') {
  try {
    const db = getFirestore();
    
    // 1. Fetch latest SEO Audit
    const auditsSnap = await db.collection('seoAudits').orderBy('createdAt', 'desc').limit(1).get();
    let seoData = "No SEO audits found.";
    if (!auditsSnap.empty && auditsSnap.docs[0]) {
      const audit = auditsSnap.docs[0].data();
      seoData = `Overall Score: ${audit.overallScore}\nIssues: ${JSON.stringify(audit.issues)}\nSuggestions: ${JSON.stringify(audit.suggestions)}`;
    }

    // 2. Fetch Backlinks stats
    const backlinksSnap = await db.collection('backlinks').get();
    let totalLinks = 0, activeLinks = 0, lostLinks = 0;
    backlinksSnap.forEach((doc: any) => {
      totalLinks++;
      const s = doc.data().status;
      if (s === 'Active') activeLinks++;
      else if (s === 'Lost') lostLinks++;
    });

    // 3. Fetch Keywords stats
    const keywordsSnap = await db.collection('keywords').get();
    let keywordsData: string[] = [];
    keywordsSnap.forEach((doc: any) => {
      const d = doc.data();
      keywordsData.push(`${d.term}: Rank ${d.position} (Vol: ${d.volume})`);
    });

    // 4. Generate AI Summary
    const settingsDoc = await db.collection('settings').doc('admin').get();
    const geminiKey = settingsDoc.exists ? settingsDoc.data()?.geminiKey : '';

    if (!geminiKey) {
      throw new HttpsError('failed-precondition', 'Gemini API key is not configured in settings.');
    }

    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: "You are an expert SEO Analyst. Write a professional, comprehensive Markdown report summarizing the client's current SEO performance."
    });

    const prompt = `
      Write an Executive SEO Report based on the following data:
      
      === SEO AUDIT ===
      ${seoData}
      
      === BACKLINKS ===
      Total Tracked: ${totalLinks}
      Active: ${activeLinks}
      Lost: ${lostLinks}
      
      === KEYWORDS ===
      ${keywordsData.join('\n')}
      
      Structure the report with these Markdown headings:
      # Executive Summary
      ## Technical SEO Health
      ## Backlink Profile
      ## Keyword Performance
      ## Actionable Recommendations
    `;

    const result = await model.generateContent(prompt);
    const markdownContent = result.response.text();

    // 5. Save to Firestore
    const reportRef = await db.collection('reports').add({
      type: generatedBy === 'system' ? 'Scheduled' : 'On-Demand',
      status: 'Generated',
      createdAt: FieldValue.serverTimestamp(),
      content: markdownContent,
      generatedBy
    });

    return { success: true, reportId: reportRef.id };

  } catch (error: any) {
    console.error("generateReport error:", error);
    throw new HttpsError('internal', error.message || 'Failed to generate report');
  }
}

export const scheduledExecutiveReport = onSchedule({
  schedule: "every monday 06:00",
  timeoutSeconds: 120
}, async (event) => {
  await internalGenerateReport('system');
});

export const scheduledKeywordScan = onSchedule("every monday 03:00", async (event) => {
  try {
    const db = getFirestore();
    const { google } = await import('googleapis');
    const authClient = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../serviceAccount.json'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Get currently tracked keywords to avoid duplicates
    const existingSnap = await db.collection('keywords').get();
    const existingKeywords = new Set(existingSnap.docs.map(d => d.data().keyword?.toLowerCase()));

    const requestBody: any = { startDate, endDate, dimensions: ['query'], rowLimit: 50, dataState: 'all' };
    const response = await searchconsole.searchanalytics.query({
      siteUrl: 'sc-domain:guianegocios.net',
      requestBody,
    } as any);

    const rows = response.data?.rows || [];
    let saved = 0;

    for (const row of rows) {
      const kw = row.keys?.[0];
      if (kw && !existingKeywords.has(kw.toLowerCase()) && saved < 5) { // Only save top 5 new keywords autonomously
        await db.collection('keywords').add({
          keyword: kw,
          language: 'en',
          volume: row.impressions || 0,
          position: row.position ? Math.round(row.position * 10) / 10 : 99,
          trend: 'Autonomously Discovered',
          priority: 'Medium',
          reason: 'Automatically discovered via scheduled Search Console scan',
          createdAt: FieldValue.serverTimestamp()
        });
        saved++;
      }
    }
    console.log(`Scheduled keyword scan saved ${saved} new keywords.`);
  } catch (error: any) {
    console.error("scheduledKeywordScan error:", error);
  }
});

// ── Contact Form Handler ──
// Receives form submissions from the website and saves them to Firestore.
// If the Firebase Trigger Email extension is installed, writing to the 'mail' collection will automatically send the email.
export const submitContactForm = onCall(async (request) => {
  try {
    const { name, email, phone, subject, message } = request.data;

    if (!name || !email || !message) {
      throw new HttpsError('invalid-argument', 'Missing required fields.');
    }

    const db = getFirestore();
    
    // Save to contacts collection for internal record
    await db.collection('contacts').add({
      name,
      email,
      phone: phone || '',
      subject: subject || '',
      message,
      createdAt: FieldValue.serverTimestamp()
    });

    // Write to the mail collection to trigger the email extension (if installed)
    // or just to have a record of emails that need to be sent.
    await db.collection('mail').add({
      to: 'info@guianegocios.net',
      message: {
        subject: `New Lead from Guia Negocios: ${name} - ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${subject}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Service:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message}</p>`
      },
      createdAt: FieldValue.serverTimestamp()
    });

    return { success: true, message: 'Message sent successfully.' };
  } catch (error: any) {
    console.error("submitContactForm error:", error);
    throw new HttpsError('internal', 'Failed to submit contact form.');
  }
});

export * from './contentEngine';
export * from './dataJournalism';
export * from './aeoInjector';
export * from './internalLinking';
export * from './linkOutreach';
