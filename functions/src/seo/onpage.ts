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
import { loadSitemap, urlToDocId, urlToPathKey } from './sitemap.js';
import type { SkillContext, SkillResult } from './types.js';

const FETCH_TIMEOUT_MS = 15000;
const MAX_URLS_PER_RUN = 80;
// Stop well inside the 540s function timeout. A run killed mid-loop never
// records a result, which left the run stuck "in-progress" forever and
// re-crawled from scratch every week. Stopping early keeps the cursor.
const TIME_BUDGET_MS = 7 * 60 * 1000;

export async function runOnPageAudit(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const entries = await loadSitemap();
  if (entries.length === 0) {
    return { status: 'error', findings: 0, queriesUsed: ctx.queriesUsed(), error: 'Sitemap empty or unreachable' };
  }

  // Resume cursor support
  const startIndex = ctx.cursor?.offset ?? 0;
  const slice = entries.slice(startIndex, startIndex + MAX_URLS_PER_RUN);

  // hreflang alternates are only expected when the other-language twin exists
  // in the sitemap (same path, lang prefix swapped). The two Spanish landing
  // pages have no /en/ twin, so flagging them for missing hreflang was a false
  // positive.
  const entryUrls = new Set(entries.map((e) => e.url));
  const hasLanguageTwin = (pageUrl: string): boolean => {
    const path = pageUrl.replace('https://guianegocios.net', '');
    // Homepages are the one pair that is not a straight prefix swap: the
    // Spanish home is '/', the English home is '/en/'.
    if (path === '/') return entryUrls.has('https://guianegocios.net/en/');
    if (path === '/en/') return entryUrls.has('https://guianegocios.net/');
    const twinPath = path.startsWith('/es/')
      ? path.replace(/^\/es\//, '/en/')
      : path.replace(/^\/en\//, '/es/');
    return entryUrls.has(`https://guianegocios.net${twinPath}`);
  };

  let issuesFound = 0; // real on-page issues — never inflate this with errors
  let fetchErrors = 0;
  let writeErrors = 0;
  let firstWriteError: string | undefined;
  let scanned = 0;
  let nextIndex = startIndex;
  const deadline = Date.now() + TIME_BUDGET_MS;

  for (let i = 0; i < slice.length; i++) {
    if (Date.now() > deadline) {
      console.warn('[onpage] time budget reached — stopping early with a resume cursor');
      break;
    }
    const entry = slice[i]!;
    let phase: 'fetch' | 'write' = 'fetch';
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
      if (hreflangTags.length === 0 && hasLanguageTwin(entry.url)) push('missing-hreflang', 'medium', 'Sin hreflang tags en una página bilingüe');
      if (imagesMissingAlt > 0) push('images-missing-alt', 'low', `${imagesMissingAlt} imágenes sin alt`);
      if (wordCount < 300) push('thin-content', 'medium', `Contenido delgado (${wordCount} palabras)`, 'Ampliar contenido a 400+ palabras.');
      if (entry.lang === 'es' && bodyText && /\b(the|and|for|with)\b/i.test(bodyText) && bodyText.length > 100) {
        // gentle bilingual sanity probe — too many EN words on ES pages
        push('lang-mix', 'info', 'Posible mezcla EN en página ES (verificar)');
      }

      const pathKey = urlToPathKey(entry.url);
      phase = 'write';
      await db.collection('onpage-audits').doc(urlToDocId(entry.url)).set({
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
      scanned++;
      nextIndex = startIndex + i + 1;
    } catch (err: any) {
      const message = err?.message || String(err);
      // A failed write means the audit did not land: that is a failure, not a
      // finding, and it must never be counted as one.
      if (phase === 'write') {
        writeErrors++;
        firstWriteError ??= message;
        console.error(`[onpage] WRITE FAILED for ${entry.url}:`, message);
      } else {
        fetchErrors++;
        console.warn(`[onpage] fetch failed for ${entry.url}:`, message);
      }
    }
  }

  const remaining = nextIndex < entries.length;
  const nothingWritten = scanned === 0 && writeErrors > 0;

  return {
    status: nothingWritten ? 'error' : remaining || writeErrors > 0 || fetchErrors > 0 ? 'partial' : 'ok',
    findings: issuesFound,
    queriesUsed: ctx.queriesUsed(),
    summary: { scanned, total: entries.length, issues: issuesFound, fetchErrors, writeErrors },
    ...(writeErrors > 0 ? { error: `${writeErrors} audit write(s) failed, first: ${firstWriteError}` } : {}),
    ...(remaining ? { cursor: { offset: nextIndex, nextItem: entries[nextIndex]?.url || '' } } : {}),
  };
}
