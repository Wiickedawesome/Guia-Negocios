/**
 * Citation / AI-readiness skill (Wednesday).
 *
 * Scores pages for AI Answer Engine (AEO/GEO) readiness: FAQPage/Article
 * schema presence, question headings, bullet/citation structure.
 * Uses Gemini (Vertex) for a summary evaluation per page. 0 search quota.
 */

import * as cheerio from 'cheerio';
import { getFirestore } from 'firebase-admin/firestore';
import { loadSitemap, urlToDocId } from './sitemap.js';
import { gemini } from './config.js';
import type { SkillContext, SkillResult } from './types.js';

const FETCH_TIMEOUT_MS = 12000;
const MAX_PAGES_PER_RUN = 30;
// See onpage.ts — stop inside the function timeout so the run records a cursor
// instead of being killed while still "in-progress".
const TIME_BUDGET_MS = 7 * 60 * 1000;

export async function runCitationAudit(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const entries = await loadSitemap().then((all) => all.filter((e) => e.url.includes('/blog/') || e.url.includes('/services/')));
  if (entries.length === 0) {
    return { status: 'error', findings: 0, queriesUsed: ctx.queriesUsed(), error: 'No blog/services URLs in sitemap' };
  }

  const startIndex = ctx.cursor?.offset ?? 0;
  const slice = entries.slice(startIndex, startIndex + MAX_PAGES_PER_RUN);

  let audited = 0;
  let fetchErrors = 0;
  let writeErrors = 0;
  let firstWriteError: string | undefined;
  let nextIndex = startIndex;
  const deadline = Date.now() + TIME_BUDGET_MS;

  for (let i = 0; i < slice.length; i++) {
    if (Date.now() > deadline) {
      console.warn('[citation] time budget reached — stopping early with a resume cursor');
      break;
    }
    const entry = slice[i]!;
    let phase: 'fetch' | 'write' = 'fetch';
    try {
      const res = await fetch(entry.url, {
        headers: { 'User-Agent': 'GuiaNegocios-SEO-Agent/1.0 (+https://guianegocios.net)' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      const html = await res.text();
      const $ = cheerio.load(html);

      const jsonLdTypes: string[] = [];
      $('script[type="application/ld+json"]').each((_, el) => {
        try {
          const parsed = JSON.parse($(el).html() || '{}');
          if (parsed['@type']) jsonLdTypes.push(String(parsed['@type']));
          if (parsed['@graph']) {
            for (const node of parsed['@graph']) {
              if (node?.['@type']) jsonLdTypes.push(String(node['@type']));
            }
          }
        } catch { /* skip malformed */ }
      });

      const questionHeadings = $('h2, h3').filter((_, el) => $(el).text().trim().endsWith('?')).length;
      const bulletLists = $('ul, ol').length;
      const hasFaqSchema = jsonLdTypes.some((t) => t.includes('FAQPage'));
      const hasArticleSchema = jsonLdTypes.some((t) => t.includes('Article') || t.includes('BlogPosting'));
      const hasBreadcrumb = jsonLdTypes.some((t) => t.includes('Breadcrumb'));

      let aiScore = 0;
      if (hasFaqSchema) aiScore += 25;
      if (hasArticleSchema) aiScore += 25;
      if (hasBreadcrumb) aiScore += 15;
      if (questionHeadings >= 2) aiScore += 15;
      if (bulletLists >= 2) aiScore += 10;
      if (jsonLdTypes.length >= 3) aiScore += 10;
      aiScore = Math.min(100, aiScore);

      // Optional AI evaluation (only if we have quota headroom after this loop)
      let aiSummary: string | null = null;
      if (ctx.hasQuota() && audited < 5) {
        ctx.consumeQuery();
        try {
          const prompt = `Evalúa esta página para AI Answer Engine Optimization (AEO/GEO) y responde en una sola frase concreta ( español o inglés según el idioma de la página).\nURL: ${entry.url}\nTítulo H2/H3: ${$('h2,h3').map((_, el) => $(el).text().trim()).get().slice(0, 8).join(' | ')}\nSchema types: ${jsonLdTypes.join(', ')}\nPuntaje AEO calculado: ${aiScore}/100. Indica el mayor gap y cómo resolverlo.`;
          aiSummary = (await gemini(prompt, { system: 'Eres un especialista SEO bilingüe.' })).slice(0, 400);
        } catch (err) {
          console.warn('[citation] AI summary skipped:', err);
        }
      }

      phase = 'write';
      await db.collection('citation-audits').doc(urlToDocId(entry.url)).set({
        url: entry.url,
        lang: entry.lang,
        aiScore,
        hasFaqSchema,
        hasArticleSchema,
        hasBreadcrumb,
        questionHeadings,
        bulletLists,
        jsonLdTypes,
        aiSummary,
        auditedAt: new Date().toISOString(),
        updatedAt: new Date(),
        createdAt: new Date(),
      }, { merge: true });
      audited++;
      nextIndex = startIndex + i + 1;
    } catch (err: any) {
      const message = err?.message || String(err);
      if (phase === 'write') {
        writeErrors++;
        firstWriteError ??= message;
        console.error(`[citation] WRITE FAILED for ${entry.url}:`, message);
      } else {
        fetchErrors++;
        console.warn(`[citation] fetch failed for ${entry.url}:`, message);
      }
    }
  }

  const remaining = nextIndex < entries.length;
  const nothingWritten = audited === 0 && writeErrors > 0;

  return {
    status: nothingWritten ? 'error' : remaining || writeErrors > 0 || fetchErrors > 0 ? 'partial' : 'ok',
    findings: audited,
    queriesUsed: ctx.queriesUsed(),
    summary: { audited, total: entries.length, fetchErrors, writeErrors },
    ...(writeErrors > 0 ? { error: `${writeErrors} audit write(s) failed, first: ${firstWriteError}` } : {}),
    ...(remaining ? { cursor: { offset: nextIndex, nextItem: entries[nextIndex]?.url || '' } } : {}),
  };
}
