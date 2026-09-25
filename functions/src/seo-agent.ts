/**
 * SEO Agent orchestrator — adapted from CreedaVA for Guia Negocios.
 *
 * Owns:
 *   - daily skill rotation (7 days a week)
 *   - per-run agent-runs document (start/finish, status, queriesUsed, cursor)
 *   - kill switch + concurrency lock (skip if same skill already running <1h)
 *   - manual trigger from /admin/seo-audit "Run now"
 *
 * No Custom Search quota is consumed here — the orchestrator only dispatches.
 */

import { getFirestore } from 'firebase-admin/firestore';
import { getAgentConfig, touchLastRun } from './seo/config.js';
import { runOnPageAudit } from './seo/onpage.js';
import { runRankHistory } from './seo/rank-history.js';
import { runKeywordGaps } from './seo/keyword-gaps.js';
import { runCitationAudit } from './seo/citation.js';
import { runBacklinkProspects, runBrandMentions } from './seo/backlinks.js';
import { runSynthesizer } from './seo/synthesizer.js';
import { runSerpAnalysis } from './seo/serp-analysis.js';
import type { AgentSkill, SkillContext, SkillResult, SeoAgentConfigDoc } from './seo/types.js';

const SKILL_LOCK_WINDOW_MS = 60 * 60 * 1000; // 1 hour
// A run whose process is killed (function timeout or OOM) never writes its own
// terminal status, so the agent-runs doc stays "in-progress" forever and the
// admin UI shows a phantom run. Longer than any function timeout (540s).
const STALE_RUN_MS = 2 * 60 * 60 * 1000;

export type RunSource = 'scheduled' | 'manual';

export interface RunOptions {
  skill: AgentSkill;
  source: RunSource;
  /** Admin uid for manual runs; omitted for scheduled runs. */
  userId?: string | undefined;
  /** Ignore an existing in-progress lock (admin override). */
  force?: boolean;
}

export interface RunOutcome {
  runId: string;
  status: 'ok' | 'partial' | 'skipped' | 'error' | 'locked' | 'killswitch';
  result?: SkillResult;
  error?: string;
}

export async function runSeoAgent(opts: RunOptions): Promise<RunOutcome> {
  const config = await getAgentConfig();
  const db = getFirestore();

  if (config.killSwitch || !config.enabled) {
    return { runId: 'skip', status: 'killswitch' };
  }

  // Close out any run that died without recording a result before we consider
  // the lock, so a phantom "in-progress" can neither wedge the lock nor be
  // reported as live work in the admin UI.
  await reapStaleRuns(db, opts.skill);

  // Concurrency lock — skip if same skill is already in-progress recently.
  if (!opts.force) {
    const recent = await db.collection('agent-runs')
      .where('skill', '==', opts.skill)
      .where('status', '==', 'in-progress')
      .limit(1)
      .get()
      .catch(() => null);
    if (recent && !recent.empty) {
      const doc0 = recent.docs[0];
      const data = (doc0?.data() ?? {}) as { startedAt?: { toMillis?: () => number } | string };
      const startedAtMs =
        typeof data.startedAt === 'object' && data.startedAt && typeof data.startedAt.toMillis === 'function'
          ? data.startedAt.toMillis()
          : new Date(String(data.startedAt ?? '')).getTime();
      if (Date.now() - startedAtMs < SKILL_LOCK_WINDOW_MS) {
        return { runId: doc0?.id ?? 'unknown', status: 'locked' };
      }
    }
  }

  const previousCursor = await fetchLatestCursor(db, opts.skill);
  const runRef = db.collection('agent-runs').doc();
  const runId = runRef.id;
  await runRef.set({
    skill: opts.skill,
    source: opts.source,
    triggeredBy: opts.userId ?? null,
    status: 'in-progress',
    queriesUsed: 0,
    cursor: previousCursor ?? null,
    startedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const ctx = buildContext(runId, opts.skill, config, previousCursor ?? null);

  let result: SkillResult;
  try {
    result = await dispatch(opts.skill, ctx);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await runRef.set(
      { status: 'error', error: message, queriesUsed: ctx.queriesUsed(), finishedAt: new Date(), updatedAt: new Date() },
      { merge: true }
    );
    return { runId, status: 'error', error: message };
  }

  await runRef.set(
    {
      status: result.status === 'error' ? 'error' : result.status === 'partial' ? 'partial' : 'completed',
      queriesUsed: result.queriesUsed,
      cursor: result.cursor ?? null,
      summary: result.summary ?? null,
      findings: result.findings,
      error: result.error ?? null,
      finishedAt: new Date(),
      updatedAt: new Date(),
    },
    { merge: true }
  );

  await touchLastRun();
  return { runId, status: result.status, result };
}

/**
 * Mark runs that were killed before recording a result as errors.
 *
 * A function that hits its timeout, or is OOM-killed, never reaches its final
 * status write, so its agent-runs doc stays "in-progress" indefinitely. Those
 * phantoms are why the dashboard could claim a skill was running days later.
 */
async function reapStaleRuns(db: FirebaseFirestore.Firestore, skill: AgentSkill): Promise<void> {
  try {
    const snap = await db.collection('agent-runs')
      .where('skill', '==', skill)
      .where('status', '==', 'in-progress')
      .limit(20)
      .get();
    for (const doc0 of snap.docs) {
      const data = doc0.data() as { startedAt?: { toMillis?: () => number } | string };
      const startedAtMs =
        typeof data.startedAt === 'object' && data.startedAt && typeof data.startedAt.toMillis === 'function'
          ? data.startedAt.toMillis()
          : new Date(String(data.startedAt ?? '')).getTime();
      if (!Number.isFinite(startedAtMs) || Date.now() - startedAtMs < STALE_RUN_MS) continue;
      await doc0.ref.set(
        {
          status: 'error',
          error: 'abandoned — the function was killed before it could record a result (timeout or out of memory)',
          finishedAt: new Date(),
          updatedAt: new Date(),
        },
        { merge: true }
      );
      console.warn(`[seo-agent] reaped stale run ${doc0.id} for ${skill}`);
    }
  } catch (err) {
    console.warn('[seo-agent] reapStaleRuns failed (non-fatal):', err);
  }
}

async function fetchLatestCursor(
  db: FirebaseFirestore.Firestore,
  skill: AgentSkill
): Promise<{ offset: number; nextItem?: string } | null> {
  try {
    const snap = await db.collection('agent-runs')
      .where('skill', '==', skill)
      .where('status', '==', 'partial')
      .orderBy('startedAt', 'desc')
      .limit(1)
      .get();
    if (snap.empty) return null;
    const doc0 = snap.docs[0];
    if (!doc0) return null;
    const c = doc0.data().cursor;
    if (c && typeof c === 'object' && typeof (c as { offset?: number }).offset === 'number') {
      return c as { offset: number; nextItem?: string };
    }
    return null;
  } catch {
    return null;
  }
}

function buildContext(
  runId: string,
  skill: AgentSkill,
  config: SeoAgentConfigDoc,
  cursor: { offset: number; nextItem?: string } | null
): SkillContext {
  const cap = config.maxQueriesPerSkill;
  let used = 0;
  return {
    runId,
    skill,
    queryCap: cap,
    config,
    cursor,
    hasQuota: () => used < cap,
    queriesUsed: () => used,
    consumeQuery: () => {
      if (used >= cap) return false;
      used++;
      return true;
    },
  };
}

async function dispatch(skill: AgentSkill, ctx: SkillContext): Promise<SkillResult> {
  switch (skill) {
    case 'onpage-audit': return runOnPageAudit(ctx);
    case 'rank-history': return runRankHistory(ctx);
    case 'keyword-gaps': return runKeywordGaps(ctx);
    case 'citation-audit': return runCitationAudit(ctx);
    case 'serp-analysis': return runSerpAnalysis(ctx);
    case 'backlink-prospects': return runBacklinkProspects(ctx);
    case 'brand-mentions': return runBrandMentions(ctx);
    case 'synthesizer': return runSynthesizer(ctx);
    default: {
      const exhaustive: never = skill;
      throw new Error(`Unknown SEO skill: ${exhaustive as string}`);
    }
  }
}
