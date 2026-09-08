/**
 * Keyword gaps skill (Tuesday).
 *
 * Pass 1 — striking distance: GSC queries ranked 11-30 with >=10 impressions in
 * the last 28d that aren't already tracked in /keywords.
 * Pass 2 — discovery: searchWithQuota (Brave if configured, else Autocomplete)
 * expansion of top seed queries to surface new opportunities.
 * Writes to /keyword-gaps (bilingual: ES and EN keywords share the same pass).
 */

import { getFirestore } from 'firebase-admin/firestore';
import { gscQuery, searchWithQuota } from './search.js';
import type { SkillContext, SkillResult } from './types.js';

const STRIKING_MIN_POSITION = 11;
const STRIKING_MAX_POSITION = 30;
const STRIKING_MIN_IMPRESSIONS = 10;

const SEED_QUERIES = [
  'crear llc en tennessee',
  'abrir negocio en tennessee',
  'llc formation knoxville',
  'itin number knoxville',
  'asesoria de negocios knoxville',
  'business credit hispanic knoxville',
];

export async function runKeywordGaps(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const findings: { id: string; data: Record<string, unknown> }[] = [];

  // Existing tracked keyword set (from admin keywords page collection)
  const existing = new Set<string>();
  try {
    const snap = await db.collection('keywords').get();
    snap.forEach((d: { data(): any }) => {
      const kw = d.data()?.keyword || d.data()?.keys?.[0];
      if (typeof kw === 'string') existing.add(kw.toLowerCase());
    });
  } catch { /* keywords collection may not exist yet */ }

  // ── Pass 1: striking distance from GSC (28 days) ──
  try {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 28 * 86_400_000).toISOString().split('T')[0];
    const { rows } = await gscQuery(db, { startDate, endDate, dimensions: ['query'], rowLimit: 200, dataState: 'all' } as any);
    for (const r of rows) {
      const keyword = r.keys?.[0] || '';
      const position = r.position || 0;
      const impressions = r.impressions || 0;
      if (!keyword || existing.has(keyword.toLowerCase())) continue;
      if (position < STRIKING_MIN_POSITION || position > STRIKING_MAX_POSITION) continue;
      if (impressions < STRIKING_MIN_IMPRESSIONS) continue;
      findings.push({
        id: `striking__${keyword.toLowerCase().replace(/\s+/g, '_')}`.slice(0, 200),
        data: {
          type: 'striking-distance',
          keyword,
          position,
          impressions,
          clicks: r.clicks ?? 0,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
      existing.add(keyword.toLowerCase());
    }
  } catch (err) {
    console.warn('[keyword-gaps] GSC striking-distance pass failed:', err);
  }

  // ── Pass 2: discovery via searchWithQuota (Brave or Autocomplete fallback) ──
  let found = 0;
  for (const seed of SEED_QUERIES) {
    if (!ctx.hasQuota()) break;
    const hits = await searchWithQuota(ctx, seed, 8);
    if (!hits) break; // quota exhausted
    for (const h of hits) {
      const kw = h.title;
      if (!kw || existing.has(kw.toLowerCase())) continue;
      findings.push({
        id: `discovery__${kw.toLowerCase().replace(/\s+/g, '_')}`.slice(0, 200),
        data: {
          type: 'discovery',
          keyword: kw,
          source: ctx.skill,
          seed,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
      existing.add(kw.toLowerCase());
      found++;
    }
  }

  // Write all findings
  let written = 0;
  for (const f of findings) {
    try {
      await db.collection('keyword-gaps').doc(f.id).set(
        {
          ...f.data,
          findingId: f.id,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      written++;
    } catch (err) {
      console.warn('[keyword-gaps] write failed:', err);
    }
  }

  return {
    status: 'ok',
    findings: written,
    queriesUsed: ctx.queriesUsed(),
    summary: { striking: findings.filter((f) => f.data.type === 'striking-distance').length, discovery: found, written },
  };
}
