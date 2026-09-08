/**
 * SERP analysis skill (Thursday).
 *
 * Probes top tracked/striking keywords, finds the #1-3 competing pages, crawls
 * them, and compares word count / heading structure / schema types against the
 * equivalent Guia Negocios page. Writes /competitor-content-gaps which the
 * Sunday synthesizer turns into briefs. Search quota 40-60.
 */

import * as cheerio from 'cheerio';
import { getFirestore } from 'firebase-admin/firestore';
import { searchWithQuota } from './search.js';
import type { SkillContext, SkillResult } from './types.js';

const OUR_DOMAIN = 'guianegocios.net';
const MAX_KEYWORDS_PER_RUN = 20;
const FETCH_TIMEOUT_MS = 12000;

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

interface PageMetrics {
  url: string;
  wordCount: number;
  headingCount: number;
  imageCount: number;
  schemaTypes: string[];
}

async function fetchMetrics(url: string): Promise<PageMetrics | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'GuiaNegocios-SEO-Agent/1.0' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const schemaTypes: string[] = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const parsed = JSON.parse($(el).html() || '{}');
        if (parsed['@type']) schemaTypes.push(String(parsed['@type']));
      } catch { /* skip */ }
    });
    return {
      url,
      wordCount: $('body').text().replace(/\s+/g, ' ').trim().split(/\s+/).length,
      headingCount: $('h2,h3').length,
      imageCount: $('img').length,
      schemaTypes,
    };
  } catch (err) {
    console.warn('[serp-analysis] fetch failed', url, err);
    return null;
  }
}

export async function runSerpAnalysis(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();

  // Read top keywords from rank-history (last 7 days) + striking keywords.
  const since = new Date(Date.now() - 7 * 86_400_000);
  const kwSnap = await db.collection('rank-history')
    .where('dayKey', '>=', since.toISOString().split('T')[0])
    .limit(400)
    .get()
    .catch(() => null);

  if (!kwSnap || kwSnap.empty) {
    return { status: 'skipped', findings: 0, queriesUsed: ctx.queriesUsed(), summary: { reason: 'no rank-history rows yet' } };
  }

  // Group by keyword → pick impressions-weighted top keywords, skip brands.
  const impByKeyword = new Map<string, number>();
  kwSnap.forEach((d: any) => {
    const kw = d.data()?.keyword;
    const imp = d.data()?.impressions || 0;
    if (!kw || kw.toLowerCase().includes('guianegocios')) return;
    impByKeyword.set(kw, (impByKeyword.get(kw) || 0) + imp);
  });
  const keywords = [...impByKeyword.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_KEYWORDS_PER_RUN)
    .map(([k]) => k);

  let gapsWritten = 0;

  for (const keyword of keywords) {
    if (!ctx.hasQuota()) break;
    const hits = await searchWithQuota(ctx, keyword, 10);
    if (!hits) break; // quota exhausted
    if (hits.length === 0) continue; // empty/failed query — try next keyword

    const competitors = hits.filter((h) => h.link && !h.link.includes(OUR_DOMAIN)).slice(0, 3);
    if (competitors.length === 0) continue;

    // Find our equivalent page (same language title match, or homepage fallback)
    const ours = hits.find((h) => h.link?.includes(OUR_DOMAIN));
    const ourMetrics = ours ? await fetchMetrics(ours.link) : null;

    for (const comp of competitors.slice(0, 2)) {
      if (!ctx.hasQuota()) break;
      const compMetrics = await fetchMetrics(comp.link);
      if (!compMetrics || !ourMetrics) continue;

      const wordGap = compMetrics.wordCount - ourMetrics.wordCount;
      const headingGap = compMetrics.headingCount - ourMetrics.headingCount;
      const schemaGap = compMetrics.schemaTypes.filter((t) => !ourMetrics.schemaTypes.includes(t));

      // Stable upsert ID: keyword + competitor domain path — prevents unbounded growth.
      const gapId = `${slug(keyword)}__${slug(comp.link.replace(/^https?:\/\//, '').replace(/\/$/, ''))}`.slice(0, 380);
      await db.collection('competitor-content-gaps').doc(gapId).set({
        keyword,
        competitorUrl: comp.link,
        competitorTitle: comp.title || '',
        ourUrl: ours?.link || null,
        wordGap,
        headingGap,
        schemaGap,
        competitorMetrics: compMetrics,
        ourMetrics,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      gapsWritten++;
    }
  }

  return {
    status: 'ok',
    findings: gapsWritten,
    queriesUsed: ctx.queriesUsed(),
    summary: { keywordsProbed: keywords.length, gapsWritten },
  };
}
