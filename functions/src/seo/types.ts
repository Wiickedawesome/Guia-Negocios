/**
 * SEO Agent shared types — adapted from the CreedaVA seo-agent for Guia Negocios.
 *
 * Daily skill rotation (America/Belize) runs 7 days a week:
 *   Mon → onpage-audit, Tue → keyword-gaps, Wed → citation-audit,
 *   Thu → serp-analysis, Fri → backlink-prospects, Sat → brand-mentions,
 *   Sun → synthesizer (rollup + weekly report).
 */

export type AgentSkill =
  | 'onpage-audit'
  | 'rank-history'
  | 'keyword-gaps'
  | 'citation-audit'
  | 'serp-analysis'
  | 'backlink-prospects'
  | 'brand-mentions'
  | 'synthesizer';

export interface SeoAgentConfigDoc {
  enabled: boolean;
  killSwitch: boolean;
  autonomy: {
    content: 'draft' | 'execute' | 'off';
    outreach: 'draft' | 'execute' | 'off';
    metaFixes: 'draft' | 'execute' | 'off';
    internalLinks: 'draft' | 'execute' | 'off';
  };
  /** Hard cap on network/AI units per skill run. */
  maxQueriesPerSkill: number;
  summaryRecipients: string[];
  lastRunAt?: string;
}

export const DEFAULT_AGENT_CONFIG: SeoAgentConfigDoc = {
  enabled: true,
  killSwitch: false,
  autonomy: {
    content: 'draft',      // never auto-publish; drafts land in blogs (Draft status)
    outreach: 'draft',     // outreach emails are drafts only
    metaFixes: 'execute',  // safe title/meta write-through to page-seo snapshot
    internalLinks: 'draft',
  },
  maxQueriesPerSkill: 80,
  summaryRecipients: ['info@guianegocios.net'],
};

export interface SkillResult {
  status: 'ok' | 'partial' | 'skipped' | 'error';
  findings: number;
  queriesUsed: number;
  summary?: Record<string, unknown>;
  cursor?: { offset: number; nextItem?: string } | null;
  error?: string;
}

export interface SkillContext {
  runId: string;
  skill: AgentSkill;
  queryCap: number;
  config: SeoAgentConfigDoc;
  cursor?: { offset: number; nextItem?: string } | null;
  consumeQuery(): boolean;
  queriesUsed(): number;
  hasQuota(): boolean;
}
