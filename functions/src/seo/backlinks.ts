/**
 * Backlink prospecting skills (Friday / Saturday).
 *
 * runBacklinkProspects (Fri): local TN/Hungarian-hispanic business directory
 *   resource pages worth linking to — chamber, community, blog roundups.
 * runBrandMentions (Sat): unlinked brand mentions of "Guia Negocios" on the web.
 *
 * Both write to /backlink-prospects with draft status. Search quota 30-40/day.
 */

import { getFirestore } from 'firebase-admin/firestore';
import { searchWithQuota, type SearchHit } from './search.js';
import type { SkillContext, SkillResult } from './types.js';

const SEED_QUERIES = [
  'knoxville tn recursos para emprendedores hispanos',
  'hispanic chamber of commerce tennessee directory',
  'east tennessee small business resources directory',
  'negocios latinos tennessee directorio',
  'small business grants knoxville hispanic',
  'blog "how to start a business" knoxville tennessee',
];

const BRAND_QUERIES = [
  'guia negocios knoxville',
  '"guia negocios" tennessee',
  'guianegocios.net',
  'Guia de Negocios LLC',
];

interface Prospect {
  url: string;
  probe: string;
  kind: 'resources' | 'brand';
  title: string;
}

function toProspect(hit: SearchHit, kind: 'resources' | 'brand'): Prospect | null {
  if (!hit.link || hit.link.includes('guianegocios.net')) return null;
  return { url: hit.link, probe: kind, kind, title: hit.title || '' };
}

export async function runBacklinkProspects(ctx: SkillContext): Promise<SkillResult> {
  return runProspectSweep(ctx, SEED_QUERIES, 'resources');
}

export async function runBrandMentions(ctx: SkillContext): Promise<SkillResult> {
  return runProspectSweep(ctx, BRAND_QUERIES, 'brand');
}

async function runProspectSweep(
  ctx: SkillContext,
  queries: string[],
  kind: 'resources' | 'brand'
): Promise<SkillResult> {
  const db = getFirestore();
  const prospects = new Map<string, Prospect>();

  for (const query of queries) {
    if (!ctx.hasQuota()) break;
    const hits = await searchWithQuota(ctx, query, 10);
    if (!hits || hits.length === 0) continue;
    for (const hit of hits) {
      const p = toProspect(hit, kind);
      if (!p) continue;
      const id = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '').slice(0, 300);
      if (!prospects.has(id)) prospects.set(id, p);
    }
  }

  let written = 0;
  for (const [id, p] of prospects) {
    try {
      await db.collection('backlink-prospects').doc(id).set(
        {
          url: p.url,
          title: p.title,
          kind: p.kind,
          probe: p.probe,
          status: 'new',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        { merge: true }
      );
      written++;
    } catch (err) {
      console.warn('[prospect-sweep] write failed', id, err);
    }
  }

  return {
    status: 'ok',
    findings: written,
    queriesUsed: ctx.queriesUsed(),
    summary: { kind, prospectsFound: prospects.size, written },
  };
}
