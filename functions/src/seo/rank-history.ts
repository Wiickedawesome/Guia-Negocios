/**
 * Rank history skill — 7-day Search Console snapshot, upserted per (day,keyword,page).
 * Bilingual: captures both ES and EN query data (sc-domain property covers all).
 * 0 quota units — GSC API is free.
 */

import { getFirestore } from 'firebase-admin/firestore';
import { gscQuery } from './search.js';
import type { SkillContext, SkillResult } from './types.js';

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

/** Today's date key (YYYY-MM-DD), safe under noUncheckedIndexedAccess. */
function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoKey(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
}

export async function runRankHistory(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const endDate = todayKey();
  const startDate = daysAgoKey(7);

  try {
    const { rows } = await gscQuery(db, {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 250,
    });

    const dayKey: string = endDate;
    let batch = db.batch();
    let written = 0;
    let batchCount = 0;

    const persist = async (row: any) => {
      // The GSC API carries dimensions positionally in `keys`, not as named
      // fields. Reading row.keyword / row.page here skipped every row, so the
      // skill reported "completed" while writing 0 documents since creation.
      const keyword = row.keys?.[0];
      const page = row.keys?.[1];
      if (!keyword || !page) return;
      const id = `${dayKey}__${slug(keyword)}__${slug(page)}`.slice(0, 380);
      batch.set(
        db.collection('rank-history').doc(id),
        {
          keyword,
          page,
          position: row.position ?? 0,
          clicks: row.clicks ?? 0,
          impressions: row.impressions ?? 0,
          ctr: row.ctr ?? 0,
          dayKey,
          capturedAt: new Date().toISOString(),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        { merge: true }
      );
      written++;
      batchCount++;
      if (batchCount >= 450) {
        batchCount = 0;
        // Firestore batch limit is 500 — commit then start a new one.
        try {
          await batch.commit();
        } catch (e: unknown) {
          // A failed commit means rows were lost: surface it as a run error
          // (the outer catch records status 'error') instead of a silent warn.
          console.warn('[rank-history] batch commit failed:', e);
          throw e;
        }
        batch = db.batch();
      }
    };

    for (const row of rows) {
      await persist(row);
    }
    if (batchCount > 0) {
      // No catch: a failed final commit must abort with status 'error', not
      // report 'ok' over lost rows.
      await batch.commit();
    }

    return {
      status: 'ok',
      findings: written,
      queriesUsed: ctx.queriesUsed(),
      summary: { rows: rows.length, written, dayKey, range: [startDate, endDate] },
    };
  } catch (err) {
    return {
      status: 'error',
      findings: 0,
      queriesUsed: ctx.queriesUsed(),
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
