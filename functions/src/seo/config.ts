/**
 * SEO Agent config — singleton at integrations/seo-agent.
 * Admin UI can flip kill switch / autonomy / recipients; next skill run picks up changes.
 */

import { getFirestore } from 'firebase-admin/firestore';
import { DEFAULT_AGENT_CONFIG, type SeoAgentConfigDoc } from './types.js';

const DOC_PATH = 'integrations/seo-agent';

export async function getAgentConfig(): Promise<SeoAgentConfigDoc> {
  try {
    const snap = await getFirestore().doc(DOC_PATH).get();
    if (!snap.exists) {
      await getFirestore().doc(DOC_PATH).set(
        { provider: 'seo-agent', enabled: DEFAULT_AGENT_CONFIG.enabled, config: DEFAULT_AGENT_CONFIG, createdAt: new Date() },
        { merge: true }
      );
      return { ...DEFAULT_AGENT_CONFIG };
    }
    const data = snap.data() ?? {};
    const cfg = (data.config ?? data) as Partial<SeoAgentConfigDoc>;
    return {
      ...DEFAULT_AGENT_CONFIG,
      ...cfg,
      autonomy: { ...DEFAULT_AGENT_CONFIG.autonomy, ...(cfg.autonomy ?? {}) },
      summaryRecipients: cfg.summaryRecipients?.length ? cfg.summaryRecipients : DEFAULT_AGENT_CONFIG.summaryRecipients,
      enabled: cfg.enabled ?? DEFAULT_AGENT_CONFIG.enabled,
      killSwitch: cfg.killSwitch ?? DEFAULT_AGENT_CONFIG.killSwitch,
      maxQueriesPerSkill: cfg.maxQueriesPerSkill ?? DEFAULT_AGENT_CONFIG.maxQueriesPerSkill,
    };
  } catch (err) {
    console.warn('[seo-agent] getAgentConfig failed; falling back to defaults:', err);
    return { ...DEFAULT_AGENT_CONFIG };
  }
}

export async function touchLastRun(): Promise<void> {
  try {
    await getFirestore().doc(DOC_PATH).set(
      { config: { lastRunAt: new Date().toISOString() } },
      { merge: true }
    );
  } catch {
    /* no-op */
  }
}

/** Read the last recorded run timestamp (stored nested under config.lastRunAt). */
export async function readLastRun(): Promise<string | undefined> {
  try {
    const snap = await getFirestore().doc(DOC_PATH).get();
    const data = snap.data() as { config?: { lastRunAt?: string } } | undefined;
    return data?.config?.lastRunAt;
  } catch {
    return undefined;
  }
}

/**
 * Server-side Gemini (Vertex) text generation for synthesizer/citation skills.
 * Delegates to the shared ai.ts helper so model routing/fallback stays in one place.
 */
export async function gemini(prompt: string, opts: { system?: string; json?: boolean } = {}): Promise<string> {
  const { generateContentWithAi } = await import('../ai.js');
  return generateContentWithAi(prompt, {
    ...(opts.system ? { systemInstruction: opts.system } : {}),
    ...(opts.json ? { responseMimeType: 'application/json' } : {}),
  });
}

/**
 * Read a saved API key from settings/admin (the admin-only settings page stores
 * pexelsKey, unsplashKey, braveKey, gscUrl there).
 */
export async function getSetting(db: FirebaseFirestore.Firestore, key: string): Promise<string | undefined> {
  try {
    const snap = await db.collection('settings').doc('admin').get();
    const value = snap.exists ? snap.data()?.[key] : undefined;
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Search Console property. The SA is a Full user on the Domain property only —
 * the URL-prefix property is separate in GSC and denies access.
 */
export async function getGscSiteUrl(db: FirebaseFirestore.Firestore): Promise<string> {
  const stored = await getSetting(db, 'gscUrl');
  return stored || 'sc-domain:guianegocios.net';
}
