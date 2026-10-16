/**
 * Sunday synthesizer skill — weekly rollup.
 *
 * Reads the past 7 days of findings from all collections, dedupes/prioritizes,
 * and writes:
 *   - upserted /seo-tasks (the agent's to-do list)
 *   - /content-briefs for striking-distance keywords
 *   - a /reports weekly executive summary doc
 *
 * Uses Gemini (Vertex) for a short weekly narrative. 0 search quota.
 */

import { getFirestore } from 'firebase-admin/firestore';
import { getAgentConfig, gemini } from './config.js';
import type { SkillContext, SkillResult } from './types.js';

const SEVEN_DAYS_MS = 7 * 86_400_000;

export async function runSynthesizer(ctx: SkillContext): Promise<SkillResult> {
  const db = getFirestore();
  const config = await getAgentConfig();
  const since = new Date(Date.now() - SEVEN_DAYS_MS);

  const [audits, gaps, citations, prospects, ranks] = await Promise.all([
    db.collection('onpage-audits').where('updatedAt', '>=', since).get().catch(() => null),
    db.collection('keyword-gaps').where('updatedAt', '>=', since).get().catch(() => null),
    db.collection('citation-audits').where('updatedAt', '>=', since).get().catch(() => null),
    db.collection('backlink-prospects').where('updatedAt', '>=', since).get().catch(() => null),
    db.collection('rank-history').where('updatedAt', '>=', since).get().catch(() => null),
  ]);

  const count = (snap: FirebaseFirestore.QuerySnapshot | null) => snap ? snap.size : 0;
  let tasksWritten = 0;
  let briefsWritten = 0;
  let writeErrors = 0;

  // ── SEO Tasks: top on-page issues per page ──
  if (audits) {
    for (const doc of audits.docs) {
      const data = doc.data() as { issues?: { code: string; severity: string; message: string; fix?: string }[]; url?: string };
      if (!data.issues?.length) continue;
      for (const issue of data.issues.filter((i) => i.severity === 'high' || i.severity === 'medium')) {
        try {
          await db.collection('seo-tasks').doc(`${doc.id}__${issue.code}`.slice(0, 400)).set(
            {
              url: data.url ?? null,
              type: issue.code,
              severity: issue.severity,
              message: issue.message,
              fix: issue.fix ?? null,
              status: 'open',
              updatedAt: new Date(),
              createdAt: new Date(),
            },
            { merge: true }
          );
          tasksWritten++;
        } catch (err) {
          writeErrors++;
          console.warn('[synthesizer] seo-tasks write failed:', issue.code, err);
        }
      }
    }
  }

  // ── Content briefs for striking-distance keywords ──
  if (gaps) {
    for (const doc of gaps.docs) {
      const data = doc.data() as { type?: string; keyword?: string; position?: number; impressions?: number };
      if (data.type !== 'striking-distance' || !data.keyword) continue;
      try {
        await db.collection('content-briefs').doc(`brief__${doc.id}`.slice(0, 400)).set(
          {
            keyword: data.keyword,
            currentPosition: data.position ?? null,
            impressions: data.impressions ?? 0,
            status: 'draft',
            suggestedTitleEs: `${data.keyword} — guía bilingüe de Guia Negocios`,
            suggestedTitleEn: `${data.keyword} — a bilingual guide by Guia Negocios`,
            updatedAt: new Date(),
            createdAt: new Date(),
          },
          { merge: true }
        );
        briefsWritten++;
      } catch (err) {
        writeErrors++;
        console.warn('[synthesizer] content-briefs write failed:', doc.id, err);
      }
    }
  }

  // ── Weekly executive report (Gemini narrative) ──
  const status = {
    onpageAudits: count(audits),
    keywordGaps: count(gaps),
    citationAudits: count(citations),
    backlinkProspects: count(prospects),
    rankRows: count(ranks),
    tasksWritten,
    briefsWritten,
  };

  let aiSummary: string | null = null;
  try {
    const prompt = `Genera un resumen ejecutivo de SEO en español (máximo 8 frases) de la última semana de trabajo del agente SEO de Guia Negocios, un negocio de consultoría bilingüe en Knoxville, TN. Basado solo en estos datos:\n${JSON.stringify(status, null, 2)}\nDestaca: (1) principales hallazgos, (2) qué hacer esta semana, (3) estado comparado con la meta de mejorar visibilidad en Google para su negocio.`;
    aiSummary = (await gemini(prompt, { system: 'Eres el consultor SEO principal de Guia Negocios.' })).slice(0, 1200);
  } catch (err) {
    console.warn('[synthesizer] AI summary skipped:', err);
  }

  const weekKey = new Date().toISOString().split('T')[0];
  await db.collection('reports').doc(`seo-weekly__${weekKey}`).set(
    {
      type: 'seo-weekly',
      generatedBy: 'seo-agent-synthesizer',
      weekOf: weekKey,
      status,
      aiSummary,
      autonomy: config.autonomy,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { merge: true }
  );

  return {
    // Never report plain success when writes were lost.
    status: writeErrors > 0 ? 'partial' : 'ok',
    ...(writeErrors > 0 ? { error: `${writeErrors} synthesizer writes failed` } : {}),
    findings: tasksWritten + briefsWritten + 1,
    queriesUsed: ctx.queriesUsed(),
    summary: { ...status, weekOf: weekKey },
  };
}

// RunOptions lives in seo-agent.ts to avoid circular import.
export type { SkillContext, SkillResult } from './types.js';
