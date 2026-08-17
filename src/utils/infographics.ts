/**
 * Infographic Design System & Vector Guidelines for GUIA DE NEGOCIOS
 * 
 * OPEN VISUAL DESIGN POLICY:
 * The AI has complete creative freedom to design ANY responsive HTML/CSS/SVG visual component,
 * diagram, chart, timeline, checklist, fee table, matrix, or flyer tailored to the content.
 */

export const BRAND_DESIGN_TOKENS = {
  primary: '#1B4E2B',     // Deep Forest Green (Main brand, authority, growth)
  accent: '#F0C850',      // Golden Yellow / Amber (Highlights, metrics, stats)
  dark: '#1A2E35',        // Slate Navy / Charcoal (Headings, dark cards, strong contrast)
  light: '#F2F7F4',       // Mint Soft White (Light cards, solution boxes)
  danger: '#D92D3C',      // Crimson Red (Risks, mistakes, wrong way, penalties)
  dangerBg: '#fef2f2',    // Light red card background
  dangerBorder: '#fecaca',// Red border
  textDark: '#1E2A2F',    // Deep charcoal body text
  textSlate: '#475569',   // Slate secondary text
  borderLight: '#e2e8f0'  // Clean border line
};

/**
 * Open Visual Archetypes (for Inspiration & Creative Freedom)
 */
export const VISUAL_INSPIRATION_PATTERNS = [
  "1. Visual Checklist & Compliance Audit Card: Grid of status items with green checkmark SVGs, 'Obligatorio' vs 'Opcional' badges, and penalty alerts.",
  "2. Step-by-Step Flow / Snake Map: Numbered step badges (1, 2, 3), arrows, connector lines, milestone markers.",
  "3. Problem vs. Solution Matrix: Red problem box (with warning icon) -> Arrow -> Green solution box (with checkmark).",
  "4. Data & Metrics Highlight Card: #1A2E35 dark background with large bold stats in #F0C850 (e.g. 178%, $653B) + source badge.",
  "5. Split Decision Card (Wrong Way vs. Right Way): Red warning side (mixed finances/DIY pitfalls) vs. Green Guia Negocios recommended method.",
  "6. Timeline & Roadmap: 30/60/90 day business launch timeline with milestone dots and duration tags.",
  "7. Cost & Fee Breakdown: Itemized card showing State Filing Fee ($300), County License ($15), EIN ($0), and annual report costs.",
  "8. Decision Tree / Flowchart: Visual conditional branches ('Do you have employees? -> YES: EIN required -> NO: Sole Prop or LLC').",
  "9. Multi-Entity Comparison Table: Side-by-side comparison of LLC vs S-Corp vs Sole Proprietorship with SVG check/cross indicators.",
  "10. Hierarchy / Pyramid of Business Priorities: Foundation (LLC/EIN) -> Operations (Bank/Books) -> Growth (Marketing/Scaling).",
  "11. Key Takeaway & Pro-Tip Callout: Elevated mint card with quote marks, highlighted emphasis, and advisor badge.",
  "12. Social Media Ready Flyer / Infographic Banner: 1:1 or 4:5 visual summary ready for Instagram/Facebook flyers."
];

/**
 * Returns complete AI instructions for generating rich, open-ended infographics
 */
export function getInfographicSystemPrompt(): string {
  return `
OPEN INFOGRAPHIC & VISUAL DESIGN ENGINE:
You have complete creative freedom to design ANY responsive HTML, CSS, and SVG visual component, infographic, chart, timeline, checklist, fee table, matrix, or flyer tailored to the content.

CRITICAL HTML FORMATTING RULES (STRICT):
1. NEVER indent HTML lines with 4 spaces or tabs! Markdown parsers treat 4-space indentation as a code block. Output all HTML tags starting flush to the left margin.
2. Self-Contained Container: Always wrap HTML components in a responsive Tailwind container:
<div class="my-8 p-5 md:p-6 bg-[#F2F7F4] border border-[#1B4E2B]/20 rounded-2xl shadow-sm max-w-3xl mx-auto font-sans">
3. Break Up Text: NEVER produce long walls of continuous text. Every major section must be broken up by a Visual Checklist, Bullet Points with bold leads, Comparison Table, or Callout Card.
4. Colors to Use:
- Primary Brand: #1B4E2B (Forest Green)
- Golden Accent: #F0C850 (Highlights, metrics)
- Slate Charcoal: #1A2E35 (Headings, dark cards)
- Mint Card Background: #F2F7F4
- Warning / Penalty Red: #D92D3C

EXAMPLE VISUAL CHECKLIST COMPONENT (Flush left, no 4-space indent):
<div class="my-8 p-6 bg-[#F2F7F4] border border-[#1B4E2B]/20 rounded-2xl shadow-sm">
<div class="flex items-center gap-3 mb-4">
<div class="w-8 h-8 rounded-full bg-[#1B4E2B] text-white flex items-center justify-center font-bold text-sm">✓</div>
<h4 class="text-lg font-bold text-[#1A2E35]">Lista de Verificación y Requisitos Obligatorios</h4>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 1: Estructura Legal</strong><span class="text-slate-600 text-xs">Registro oficial de Artículos de Organización en TN SOS.</span></div>
</div>
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 2: Identificación Fiscal</strong><span class="text-slate-600 text-xs">Tramitación del número EIN ante el IRS sin SSN.</span></div>
</div>
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 3: Cuentas Comerciales</strong><span class="text-slate-600 text-xs">Apertura de cuenta bancaria corporativa para blindar activos.</span></div>
</div>
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 4: Licencias Locales</strong><span class="text-slate-600 text-xs">Registro de impuestos comerciales en el Condado de Knox.</span></div>
</div>
</div>
</div>
`;
}
