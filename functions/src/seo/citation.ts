/**
 * Citation / AI-readiness skill (Wednesday).
 *
 * Scores pages for AI Answer Engine (AEO/GEO) readiness: FAQPage/Article
 * schema presence, question headings, bullet/citation structure.
 * Uses Gemini (Vertex) for a summary evaluation per page. 0 search quota.
 */

import * as cheerio from 'cheerio';
import { getFirestore } from 'firebase-admin/firestore';
import { loadSitemap, urlToPathKey } from './sitemap.js';
import { gemini } from './config.js';
import type { SkillContext, SkillResult } from './types.js';

const FETCH_TIMEOUT_MS = 12000;
const MAX_PAGES_PER_RUN = 30;

export async function runCitationAudit(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const entries = await loadSitemap().then((all) => all.filter((e) => e.url.includes('/blog/') || e.url.includes('/services/')));
  if (entries.length === 0) {
    return { status: 'error', findings: 0, queriesUsed: ctx.queriesUsed(), error: 'No blog/services URLs in sitemap' };
  }

  const startIndex = ctx.cursor?.offset ?? 0;
  const slice = entries.slice(startIndex, startIndex + MAX_PAGES_PER_RUN);
  const metLimit = startIndex + slice.length < entries.length;

  let audited = 0;
  for (const entry of slice) {
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

      await db.collection('citation-audits').doc(urlToPathKey(entry.url).slice(0, 400)).set({
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
    } catch (err: any) {
      console.warn(`[citation] failed for ${entry.url}:`, err?.message || err);
    }
  }

  return {
    status: metLimit ? 'partial' : 'ok',
    findings: audited,
    queriesUsed: ctx.queriesUsed(),
    summary: { audited, cursor: metLimit ? startIndex + slice.length : undefined },
    ...(metLimit ? { cursor: { offset: startIndex + slice.length, nextItem: entries[startIndex + slice.length]?.url || '' } } : {}),
  };
}
