/**
 * On-page audit skill (Monday).
 *
 * Crawls every URL in the sitemap, parses HTML with cheerio, and writes one
 * onpage-audits doc per URL. Bilingual checks: Spanish pages get an ES title
 * length sanity check, English pages get EN-specific keyword checks.
 * 0 quota units — direct fetches only.
 */

import * as cheerio from 'cheerio';
import { getFirestore } from 'firebase-admin/firestore';
import { loadSitemap, urlToPathKey } from './sitemap.js';
import type { SkillContext, SkillResult } from './types.js';

const FETCH_TIMEOUT_MS = 15000;
const MAX_URLS_PER_RUN = 80;

export async function runOnPageAudit(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const entries = await loadSitemap();
  if (entries.length === 0) {
    return { status: 'error', findings: 0, queriesUsed: ctx.queriesUsed(), error: 'Sitemap empty or unreachable' };
  }

  // Resume cursor support
  const startIndex = ctx.cursor?.offset ?? 0;
  const slice = entries.slice(startIndex, startIndex + MAX_URLS_PER_RUN);
  const metLimit = startIndex + slice.length < entries.length;

  let issuesFound = 0;

  for (const entry of slice) {
    try {
      const started = Date.now();
      const res = await fetch(entry.url, {
        headers: { 'User-Agent': 'GuiaNegocios-SEO-Agent/1.0 (+https://guianegocios.net)' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      const responseTimeMs = Date.now() - started;
      const html = await res.text();
      const $ = cheerio.load(html);

      const title = $('title').first().text().trim() || null;
      const metaDesc = $('meta[name="description"]').attr('content')?.trim() || null;
      const h1Count = $('h1').length;
      const canonical = $('link[rel="canonical"]').attr('href') || null;
      const hreflangTags = $('link[rel="alternate"][hreflang]').map((_, el) => ({
        hreflang: $(el).attr('hreflang') || '',
        href: $(el).attr('href') || '',
      })).get();
      const imagesMissingAlt = $('img:not([alt])').length;
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

      const issues: { code: string; severity: 'info' | 'low' | 'medium' | 'high'; message: string; fix?: string }[] = [];
      const push = (code: string, severity: 'info' | 'low' | 'medium' | 'high', message: string, fix?: string) => {
        issues.push({ code, severity, message, ...(fix ? { fix } : {}) });
        issuesFound++;
      };

      if (!title) push('missing-title', 'high', 'Página sin <title>');
      else if (title.length < 25 || title.length > 70) push('title-length', 'medium', `Título fuera de rango (${title.length} chars)`, `Ajustar título a 50-60 caracteres.`);
      if (!metaDesc) push('missing-meta-description', 'high', 'Página sin meta description');
      else if (metaDesc.length < 140) push('meta-description-short', 'low', `Meta description corta (${metaDesc.length} chars)`);
      if (h1Count === 0) push('missing-h1', 'medium', 'Página sin <h1>');
      else if (h1Count > 1) push('multiple-h1', 'low', `${h1Count} <h1> en la página`);
      if (!canonical) push('missing-canonical', 'medium', 'Página sin canonical tag');
      else if (!canonical.includes('guianegocios.net')) push('wrong-canonical-domain', 'high', `Canonical apunta a otro dominio: ${canonical}`);
      if (hreflangTags.length === 0) push('missing-hreflang', 'medium', 'Sin hreflang tags en una página bilingüe');
      if (imagesMissingAlt > 0) push('images-missing-alt', 'low', `${imagesMissingAlt} imágenes sin alt`);
      if (wordCount < 300) push('thin-content', 'medium', `Contenido delgado (${wordCount} palabras)`, 'Ampliar contenido a 400+ palabras.');
      if (entry.lang === 'es' && bodyText && /\b(the|and|for|with)\b/i.test(bodyText) && bodyText.length > 100) {
        // gentle bilingual sanity probe — too many EN words on ES pages
        push('lang-mix', 'info', 'Posible mezcla EN en página ES (verificar)');
      }

      const pathKey = urlToPathKey(entry.url);
      await db.collection('onpage-audits').doc(pathKey.slice(0, 400)).set({
        url: entry.url,
        pathKey,
        lang: entry.lang,
        score: Math.max(0, 100 - issues.reduce((acc, i) => acc + (({ high: 15, medium: 8, low: 3, info: 0 } as Record<string, number>)[i.severity] ?? 0), 0)),
        fetchedAt: new Date().toISOString(),
        status: res.status,
        responseTimeMs,
        title,
        metaDescription: metaDesc,
        h1Count,
        canonical,
        hreflangTags,
        imagesMissingAlt,
        wordCount,
        issues,
        updatedAt: new Date(),
        createdAt: new Date(),
      }, { merge: true });
    } catch (err: any) {
      console.warn(`[onpage] failed for ${entry.url}:`, err?.message || err);
      issuesFound++;
    }
  }

  return {
    status: metLimit ? 'partial' : 'ok',
    findings: issuesFound,
    queriesUsed: ctx.queriesUsed(),
    summary: { scanned: slice.length, total: entries.length, cursor: metLimit ? startIndex + slice.length : undefined },
    ...(metLimit ? { cursor: { offset: startIndex + slice.length, nextItem: entries[startIndex + slice.length]?.url || '' } } : {}),
  };
}
