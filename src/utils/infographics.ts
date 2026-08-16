/**
 * Infographic Design System & Vector Vector Guidelines for GUIA DE NEGOCIOS
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
  "1. Step-by-Step Flow / Snake Map: Numbered step badges, arrows, connector lines, milestone markers.",
  "2. Problem vs. Solution Matrix: Red problem box (with warning icon) -> Arrow -> Green solution box (with checkmark).",
  "3. Data & Metrics Highlight Card: #1A2E35 dark background with large bold stats in #F0C850 (e.g. 178%, $653B) + source badge.",
  "4. Split Decision Card (Wrong Way vs. Right Way): Red warning side (mixed finances/DIY pitfalls) vs. Green Guia Negocios recommended method.",
  "5. Timeline & Roadmap: 30/60/90 day business launch timeline with milestone dots and duration tags.",
  "6. Compliance & Audit Checklist: Visual checkmark list with 'Mandatory' vs. 'Optional' badges and penalty warnings.",
  "7. Cost & Fee Breakdown: Itemized card showing State Filing Fee ($300), County License ($15), EIN ($0), and annual report costs.",
  "8. Decision Tree / Flowchart: Visual conditional branches ('Do you have employees? -> YES: EIN required -> NO: Sole Prop or LLC').",
  "9. Multi-Entity Comparison Table: Side-by-side comparison of LLC vs S-Corp vs Sole Proprietorship with SVG check/cross indicators.",
  "10. Hierarchy / Pyramid of Business Priorities: Foundation (LLC/EIN) -> Operations (Bank/Books) -> Growth (Marketing/Scaling).",
  "11. Key Takeaway & Pro-Tip Callout: Elevated glassmorphic or mint card with quote marks, highlighted emphasis, and advisor badge.",
  "12. Social Media Ready Flyer / Infographic Banner: 1:1 or 4:5 visual summary ready for Instagram/Facebook flyers."
];

/**
 * Returns complete AI instructions for generating rich, open-ended infographics
 */
export function getInfographicSystemPrompt(): string {
  return `
OPEN INFOGRAPHIC & VISUAL DESIGN ENGINE:
You have complete creative freedom to design ANY responsive HTML, CSS, and SVG visual component, infographic, chart, timeline, checklist, fee table, matrix, or flyer tailored to the content.

DESIGN SYSTEM & BRAND RULES:
- Primary Color: #1B4E2B (Forest Green)
- Accent Color: #F0C850 (Golden Amber)
- Slate Dark: #1A2E35 (Navy Charcoal)
- Mint Light: #F2F7F4 (Soft mint card background)
- Danger / Warning: #D92D3C (Red for mistakes, penalties, bad practices)
- Container Guidelines: All infographics MUST be self-contained HTML wrapped in a responsive container:
  <div class="my-8 p-5 md:p-6 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-3xl mx-auto font-sans">
- Vector Icons: Use clean inline SVG icons (heroicons / lucide style) for visual polish.
- Responsiveness: Always use flex-col md:flex-row, grid-cols-1 md:grid-cols-2 or md:grid-cols-3, and fluid spacing.
- Text & Typography: Clean, legible typography, strong contrast, no clipped text, bilingual support.

INSPIRATION FORMATS (Create whichever format best illustrates the subject):
${VISUAL_INSPIRATION_PATTERNS.join('\n')}
`;
}
