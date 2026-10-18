/**
 * Web search wrapper with quota tracking for the SEO agent.
 *
 * Backed by Brave Search when a key is saved in Admin → Settings (braveKey),
 * otherwise falls back to Google Autocomplete suggestions (free, no quota).
 * Every network call must go through searchWithQuota so the orchestrator can
 * enforce per-skill caps and resume cursors.
 */

import { getFirestore } from 'firebase-admin/firestore';
import { getSetting, getGscSiteUrl } from './config.js';
import type { SkillContext } from './types.js';

export interface SearchHit {
  title: string;
  link: string;
  snippet: string;
  displayLink?: string;
}

const AUTOCOMPLETE_TIMEOUT_MS = 3000;

/** Brave Search API key (saved in settings/admin.braveKey), if any. */
async function getBraveKey(): Promise<string | undefined> {
  return getSetting(getFirestore(), 'braveKey');
}

/** Free Google Autocomplete suggestions (no key, no quota charge needed). */
async function autocompleteSuggestions(query: string): Promise<string[]> {
  try {
    const url = `http://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&hl=es`;
    const res = await fetch(url, { signal: AbortSignal.timeout(AUTOCOMPLETE_TIMEOUT_MS) });
    if (!res.ok) return [];
    const data: any = await res.json();
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

/**
 * Run a web search query, charging 1 quota unit. Returns null when the cap is
 * exhausted (caller should write a resume cursor and bail).
 */
export async function searchWithQuota(
  ctx: SkillContext,
  query: string,
  numResults = 10
): Promise<SearchHit[] | null> {
  if (!ctx.consumeQuery()) return null;

  const apiKey = await getBraveKey();
  if (apiKey) {
    try {
      const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${numResults}`;
      const res = await fetch(url, {
        headers: { Accept: 'application/json', 'X-Subscription-Token': apiKey },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const json: any = await res.json();
        const hits: SearchHit[] = (json.web?.results || []).map((r: any) => ({
          title: r.title || '',
          link: r.url || '',
          snippet: r.description || '',
          displayLink: r.meta_url?.hostname || undefined,
        }));
        return hits;
      }
      console.warn('[seo-agent] Brave Search HTTP', res.status);
      return [];
    } catch (err) {
      console.warn('[seo-agent] Brave Search failed:', err);
      return [];
    }
  }

  // Fallback: keyword expansion via Google Autocomplete (free).
  const suggestions = await autocompleteSuggestions(query);
  return suggestions.slice(0, numResults).map((title) => ({ title, link: '', snippet: 'autocomplete-suggestion' }));
}

/**
 * Fetch a Search Console searchanalytics page (0 quota units — GSC API is free).
 * Shared helper for rank-history and keyword-gaps skills.
 */
export async function gscQuery(
  db: FirebaseFirestore.Firestore,
  body: {
    startDate: string;
    endDate: string;
    dimensions: string[];
    rowLimit?: number;
    startRow?: number;
    dataState?: string;
  }
): Promise<{ rows: any[]; siteUrl: string }> {
  const siteUrl = await getGscSiteUrl(db);
  const { google } = await import('googleapis');
  const authClient = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });
  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: body,
  });
  return { rows: response.data?.rows ?? [], siteUrl };
}
