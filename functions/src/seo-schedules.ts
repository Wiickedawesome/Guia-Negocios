/**
 * SEO Agent — schedule + callable wiring for Guia Negocios.
 *
 * Full daily rotation, 7 days a week (America/Belize timezone):
 *   Mon 03:00 → onpage-audit   (sitemap crawl, 0 search units)
 *   Tue 03:00 → keyword-gaps
 *   Wed 03:00 → citation-audit (AEO/GEO readiness + Vertex AI scoring)
 *   Thu 03:00 → serp-analysis  (competitor content gap probes)
 *   Fri 03:00 → backlink-prospects (local TN resources)
 *   Sat 03:00 → brand-mentions (unlinked brand mentions sweep)
 *   Sun 03:00 → rank-history (7d GSC snapshot) 00:00 UTC, 04:00 synthesizer
 *
 * Manual trigger: `seoAgentRun` onCall (restricted to info@guianegocios.net).
 */

import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { runSeoAgent } from './seo-agent.js';
import type { AgentSkill } from './seo/types.js';

const REGION = 'us-central1';
const TZ = 'America/Belize';
const ALLOWED_ADMIN_EMAILS = ['info@guianegocios.net'];

const VALID_SKILLS: AgentSkill[] = [
  'onpage-audit',
  'rank-history',
  'keyword-gaps',
  'citation-audit',
  'serp-analysis',
  'backlink-prospects',
  'brand-mentions',
  'synthesizer',
];

function allowSkillRun(email: string | undefined): boolean {
  if (!email) return false;
  return ALLOWED_ADMIN_EMAILS.some((allowed) => email.toLowerCase() === allowed);
}

// ─── Daily schedules (7 days a week) ─────────────────

export const seoAgentMon = onSchedule(
  { schedule: '0 3 * * 1', timeZone: TZ, region: REGION, memory: '1GiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'onpage-audit', source: 'scheduled' }); }
);

export const seoAgentTue = onSchedule(
  { schedule: '0 3 * * 2', timeZone: TZ, region: REGION, memory: '512MiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'keyword-gaps', source: 'scheduled' }); }
);

export const seoAgentWed = onSchedule(
  { schedule: '0 3 * * 3', timeZone: TZ, region: REGION, memory: '512MiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'citation-audit', source: 'scheduled' }); }
);

export const seoAgentThu = onSchedule(
  { schedule: '0 3 * * 4', timeZone: TZ, region: REGION, memory: '1GiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'serp-analysis', source: 'scheduled' }); }
);

export const seoAgentFri = onSchedule(
  { schedule: '0 3 * * 5', timeZone: TZ, region: REGION, memory: '512MiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'backlink-prospects', source: 'scheduled' }); }
);

export const seoAgentSat = onSchedule(
  { schedule: '0 3 * * 6', timeZone: TZ, region: REGION, memory: '512MiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'brand-mentions', source: 'scheduled' }); }
);

export const seoAgentSunRanks = onSchedule(
  { schedule: '0 3 * * 0', timeZone: TZ, region: REGION, memory: '512MiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'rank-history', source: 'scheduled' }); }
);

export const seoAgentSun = onSchedule(
  { schedule: '0 4 * * 0', timeZone: TZ, region: REGION, memory: '1GiB', timeoutSeconds: 540 },
  async () => { await runSeoAgent({ skill: 'synthesizer', source: 'scheduled' }); }
);

// ─── Manual "Run now" callable ──────────────────────

export const seoAgentRun = onCall(
  { region: REGION, cors: true, memory: '1GiB', timeoutSeconds: 540 },
  async (req) => {
    const email = req.auth?.token?.email;
    if (!allowSkillRun(email)) {
      throw new HttpsError('permission-denied', `Admin access required (${ALLOWED_ADMIN_EMAILS.join(', ')}).`);
    }
    const skill = req.data?.skill as string | undefined;
    const force = Boolean(req.data?.force);
    if (!skill || !VALID_SKILLS.includes(skill as AgentSkill)) {
      throw new HttpsError('invalid-argument', `skill must be one of: ${VALID_SKILLS.join(', ')}`);
    }
    const userId: string | null = req.auth?.uid ?? null;
    return runSeoAgent({
      skill: skill as AgentSkill,
      source: 'manual',
      userId: userId ?? undefined,
      force,
    });
  }
);
