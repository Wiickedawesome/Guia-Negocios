/**
 * Sitemap loader for the SEO agent.
 * Parses https://guianegocios.net/sitemap-0.xml and exposes URL/path helpers.
 */

import * as cheerio from 'cheerio';

export interface SitemapEntry {
  url: string;
  pathKey: string;
  lang: 'es' | 'en';
}

const SITE_URL = 'https://guianegocios.net';

export async function loadSitemap(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch(`${SITE_URL}/sitemap-0.xml`, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const xml = await res.text();
    const $xml = cheerio.load(xml, { xmlMode: true });
    const entries: SitemapEntry[] = [];
    $xml('url loc').each((_, el) => {
      const url = $xml(el).text().trim();
      if (!url || url.includes('/admin')) return;
      const isEn = url.includes('/en/');
      entries.push({ url, pathKey: url.replace(SITE_URL, ''), lang: isEn ? 'en' : 'es' });
    });
    return entries;
  } catch (err) {
    console.warn('[seo-agent] loadSitemap failed:', err);
    return [];
  }
}

export function urlToPathKey(url: string): string {
  return url.replace(SITE_URL, '');
}

/**
 * Firestore document ids may not contain "/" — `.doc('/es/about/')` throws
 * "documentPath must point to a document ... does not contain an even number
 * of components". Every write in the on-page and citation skills used the raw
 * path as the id, so both failed on all 36 pages, every run, since the agent
 * was created, while the errors were swallowed into console.warn.
 *
 * This returns a single-segment id: '/es/about/' -> 'es__about', '/' -> 'home'.
 * The human-readable path is still stored in the `pathKey` field.
 */
export function urlToDocId(url: string, maxLength = 400): string {
  const path = urlToPathKey(url).replace(/^\/+|\/+$/g, '');
  return (path || 'home').replace(/\//g, '__').slice(0, maxLength);
}
