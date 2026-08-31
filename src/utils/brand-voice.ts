/**
 * Central brand voice & content policy for GUIA DE NEGOCIOS.
 * Every AI content prompt (admin draft generator, editor copilot, scheduled
 * content engine) must include getBrandVoicePrompt() so all generated content
 * is consistent regardless of which surface produced it.
 */

export const BRAND_FACTS = {
  name: 'GUIA DE NEGOCIOS',
  legalName: 'Guia de Negocios LLC',
  website: 'https://guianegocios.net',
  phone: '(865) 202-7112',
  email: 'info@guianegocios.net',
  hq: 'Knoxville, Tennessee',
  audience: 'Hispanic entrepreneurs and small business owners in the U.S. and Latin America',
  services: [
    'Tennessee LLC registration & business licensing',
    'EIN setup for residents and non-residents (ITIN/passport path)',
    'Bilingual bookkeeping & accounting systems',
    'Complete Business Launch Bundle (LLC + web + branding + operations)',
    'CreedaVA bilingual virtual assistant & operations support',
  ],
} as const;

export function getBrandVoicePrompt(): string {
  return `
BRAND VOICE & EDITORIAL IDENTITY — GUIA DE NEGOCIOS (MANDATORY):
1. Identity: ${BRAND_FACTS.name} (${BRAND_FACTS.hq}), bilingual (Spanish/English) business consultancy for ${BRAND_FACTS.audience}.
2. Voice: Warm but authoritative — like a trusted bilingual advisor, not a faceless corporation and not a casual blogger. Confident, practical, encouraging. Address the reader as "usted" in Spanish.
3. Cultural calibration: Write naturally for bilingual Hispanic entrepreneurs. Never translate idioms literally; write natively in each language. Numbers use US format ($1,500; 5%).
4. Trust signals: Cite official sources (IRS.gov, sba.gov, sos.tn.gov, tn.gov/revenue, uscis.gov, dnb.com). Use real dollar amounts, form numbers, and filing timelines. Zero invented statistics.
5. Bilingual parity: ES and EN versions must be equivalent in depth and examples, not machine-flavored translations. Localize examples per audience (e.g. Miami vs Knoxville case profiles).
6. Zero emoji policy: no emojis anywhere, including headings and cards.
7. Brand positioning: Nationwide reach, Knoxville roots. Closing CTAs mention headquarters + nationwide remote service. NEVER claim to be a law firm or CPA firm; say "we guide you / connect you with licensed professionals" for legal/tax filing advice.
8. Ustedeo + usted-form CTAs: "Póngase en contacto", "Programe su consulta gratuita" — never "tú" forms.
9. Reading level: professional but accessible; short paragraphs (2-3 sentences max); bold key terms on first use.
`.trim();
}
