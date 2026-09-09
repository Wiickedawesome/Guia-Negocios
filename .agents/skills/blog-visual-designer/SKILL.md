---
name: blog-visual-designer
description: Comprehensive visual and graphic design skill for generating responsive HTML, CSS, and SVG infographics, charts, diagrams, metric cards, and color-rich typography to eliminate text walls and create magazine-quality blog content.
---

# Blog Visual & Graphic Designer Skill

This skill empowers AI agents to craft state-of-the-art, colorful, and engaging visual graphics, charts, and micro-layouts directly inside Markdown blog posts for **GUIA DE NEGOCIOS**.

## 1. Core Visual Philosophy & Mandatory Rules

### Philosophy: "Never Read Like a Dense Book"
- **Pacing & Breathing Room:** No paragraph should ever exceed 2 to 3 sentences.
- **Rhythm:** Alternate between bold lead-in lists, color-accented quote callouts, metric cards, comparison matrices, and visual charts.
- **Strict Zero-Emoji Policy:** Never use informal unicode emojis. Always use clean inline SVG vector icons, sleek numeral badges, or modern geometric accents.

### 🚨 Mandatory Rules (Non-Negotiable)

**Rule 1 — NO INDENTS / NO LINNING (PERMANENTLY BANNED)**
The following layout must NEVER be used for any visual:
- A narrow vertical left-border (`border-l-4` or similar)
- Numbered green circles placed to the left of indented card rows
- Card-based rows that are indented under a header with a left gutter line

**This style is rejected on sight.** If you find yourself reaching for "narrow left border + numbered circles + indented cards", STOP and pick a different visual type from the catalog in Section 3.

**Rule 2 — No Repeating Visual Types Back-to-Back**
Every blog post in a sequence MUST use a **completely different** infographic/visual style than the previous post. If blog post N used a comparison card list, blog post N+1 cannot use the same type. **Before generating a visual, check what the previous blog post used and pick something different.**

**Rule 3 — Full Visual Variety Required**
You must utilize the complete catalog of visual types listed in Section 3. Never default to the same template twice in a row. Rotate through the available types based on what best fits the content.

**Rule 4 — Use Stock Images (Pexels & Unsplash)**
Blog posts must include relevant stock photos from **Pexels** and **Unsplash** integrated alongside or within the HTML infographics. Posts should not be HTML-only infographics — use real photographs to break up text and add visual warmth. Reference the Pexels and Unsplash keys stored in Admin → Settings (Firestore `settings/admin`).

**Rule 5 — Agent Must Know All Visual Types**
This skill document IS the authoritative catalog. Before generating any blog visual, scan the Visual Type Catalog in Section 3 to pick the right archetype for the content — never default to the first one you remember.

**Rule 6 — Cite Official Sources (Minimum 3)**
Every blog post MUST include a references section at the bottom with at least 3 verified source links. Sources are NOT limited — they can come from any domain including government (.gov), educational (.edu), major news outlets, industry associations, or authoritative organizations. Each source must be real, current, and relevant to the post topic. Format as a styled reference block using Archetype 30 (Resource Link Grid) from the catalog. Use this template:
```html
<div class="my-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
<h4 class="text-base font-bold text-[#1A2E35] mb-3">Fuentes Oficiales y Referencias / Official Sources & References</h4>
<ul class="text-xs text-slate-700 space-y-2">
<li><a href="https://www.irs.gov/..." target="_blank" class="text-[#2563EB] hover:underline">IRS — [Relevant Page Title]</a></li>
<li><a href="https://www.sba.gov/..." target="_blank" class="text-[#2563EB] hover:underline">SBA — [Relevant Guide]</a></li>
<li><a href="https://www.tn.gov/..." target="_blank" class="text-[#2563EB] hover:underline">Tennessee [Department Name]</a></li>
</ul>
</div>
```

**Rule 7 — Dynamic Visual Sizing (Word-Count Driven)**
Instead of hard numbers, use this formula to determine how many visuals to include based on blog length:

```
total_visuals = ceil(word_count / 200) + 1
```

**Breakdown:**
- `word_count / 200` = base visuals needed (rounded up)
- `+1` = always include citations block (Rule 6)

**Examples:**
| Word Count | Calculation | Total Visuals |
|------------|-------------|---------------|
| 500 | 3 + 1 | **4 visuals** |
| 800 | 4 + 1 | **5 visuals** |
| 1200 | 6 + 1 | **7 visuals** |
| 2000 | 10 + 1 | **11 visuals** |

**Visual mix split:**
- Infographics: 50–60% (primary data/process visuals)
- Stock photos: 30–40% (cover + inline)
- Callouts/citations: remaining (advisor tips, references)

**Range constraints:**
- Minimum: 3 visuals (even for short posts)
- Maximum: 12 visuals (prevent overload)

### Color Palette & Visual Warmth
- **Brand Forest Green:** `#1B4E2B` (Authority, trust, positive action)
- **Golden Amber:** `#F0C850` (Highlights, star metrics, awards)
- **Charcoal Slate Navy:** `#1A2E35` (Strong headers, dark contrast cards)
- **Soft Mint Cream:** `#F2F7F4` (Light background cards, solutions)
- **Electric Blue / Indigo:** `#2563EB` (Tech, banking, international wire)
- **Royal Violet:** `#7C3AED` (Strategic insights, innovation)
- **Coral Crimson:** `#D92D3C` (Risks, IRS fines, mistakes to avoid)
- **Emerald Green:** `#059669` (Success metrics, approved status)

---

## 2. Formatting & Markdown Rules (Strict)
1. **0-Indent Rule:** NEVER indent HTML lines with 4 spaces or tabs! Markdown parsers treat 4-space indentation as code blocks (`<pre><code>`). Output all HTML tags starting flush to the left margin (column 0).
2. **Self-Contained Tailwind Components:** Wrap every graphic in responsive Tailwind classes with proper padding, border-radius (`rounded-2xl`), soft shadows (`shadow-sm` / `shadow-md`), and fluid grids (`grid-cols-1 md:grid-cols-2` or `md:grid-cols-3`).

---

## 3. Open Visual Component Library

### Archetype 1: Multi-Color Growth & Comparison Bar Chart
```html
<div class="my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm font-sans">
<div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
<div class="flex items-center gap-2">
<span class="w-3 h-3 rounded-full bg-[#1B4E2B]"></span>
<h4 class="text-base font-bold text-[#1A2E35]">Comparativa de Rentabilidad y Retención de Clientes</h4>
</div>
<span class="text-xs font-semibold px-2.5 py-1 bg-[#F2F7F4] text-[#1B4E2B] rounded-full">Reporte SBA & Census</span>
</div>
<div class="space-y-3.5">
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-slate-600"><span>Sin Registro Formal ni Plan Financiero</span><span>28% Éxito a 3 Años</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-rose-400 rounded-full" style="width: 28%;"></div></div>
</div>
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-[#2563EB]"><span>Con LLC & Estructura Básica</span><span>62% Éxito a 3 Años</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-[#2563EB] rounded-full" style="width: 62%;"></div></div>
</div>
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-[#1B4E2B]"><span>Con Asesoría Integral Guia Negocios & Plan de Negocios</span><span>89% Éxito (+217%)</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-[#1B4E2B] rounded-full" style="width: 89%;"></div></div>
</div>
</div>
</div>
```

### Archetype 2: High-Contrast Dark Navy Metric Stat Grid
```html
<div class="my-8 p-6 sm:p-8 bg-[#1A2E35] text-white rounded-2xl shadow-md border border-slate-700 font-sans">
<div class="flex items-center justify-between mb-6">
<h4 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-[#F0C850]"></span>
Impacto Económico Nacional y Métricas Clave
</h4>
<span class="text-xs px-3 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] font-bold border border-[#F0C850]/30 uppercase tracking-wider">Stanford SLEI 2025</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-[#F0C850] mb-1">178%</div>
<div class="text-xs text-slate-300 font-medium">Crecimiento en Registro de Nuevos Negocios</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-emerald-400 mb-1">$653B</div>
<div class="text-xs text-slate-300 font-medium">Contribución a la Economía de EE.UU.</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-blue-400 mb-1">5M+</div>
<div class="text-xs text-slate-300 font-medium">Empresas Fundadas por Hispanos</div>
</div>
</div>
</div>
```

### Archetype 3: Numbered Step-by-Step Snake Map / Timeline
```html
<div class="my-8 p-6 bg-[#F2F7F4] border border-[#1B4E2B]/20 rounded-2xl shadow-sm font-sans">
<div class="flex items-center justify-between mb-5">
<h4 class="text-base font-bold text-[#1A2E35]">Ruta Crítica: Fases de Implementación Paso a Paso</h4>
<span class="text-xs font-semibold px-2.5 py-0.5 bg-[#1B4E2B] text-white rounded-full">Guía Oficial</span>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
<div class="bg-white p-4 rounded-xl border border-slate-200 relative shadow-xs">
<div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-bold flex items-center justify-center mb-2.5 shadow-xs">1</div>
<strong class="block text-sm text-[#1A2E35] mb-1">Fase 1: Plan & Modelo</strong>
<p class="text-xs text-slate-600 leading-relaxed">Definición de clientes, estructura de costos y viabilidad comercial.</p>
</div>
<div class="bg-white p-4 rounded-xl border border-slate-200 relative shadow-xs">
<div class="w-7 h-7 rounded-full bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center mb-2.5 shadow-xs">2</div>
<strong class="block text-sm text-[#1A2E35] mb-1">Fase 2: Estructura & EIN</strong>
<p class="text-xs text-slate-600 leading-relaxed">Registro de LLC en el estado y trámite de EIN ante el IRS.</p>
</div>
<div class="bg-white p-4 rounded-xl border border-slate-200 relative shadow-xs">
<div class="w-7 h-7 rounded-full bg-[#7C3AED] text-white text-xs font-bold flex items-center justify-center mb-2.5 shadow-xs">3</div>
<strong class="block text-sm text-[#1A2E35] mb-1">Fase 3: Banca & Operación</strong>
<p class="text-xs text-slate-600 leading-relaxed">Apertura de cuenta comercial, licencias y sistema de cobro.</p>
</div>
</div>
</div>
```

### Archetype 4: Dual-Tone Decision Matrix (Do's vs Don'ts with Clean SVG Icons)
```html
<div class="my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm font-sans">
<h4 class="text-base font-bold text-[#1A2E35] mb-4">Decisión Estratégica: Lo que Funciona vs Errores Comunes</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="bg-[#fef2f2] p-4.5 rounded-xl border border-[#fecaca]">
<div class="flex items-center gap-2 text-[#D92D3C] font-bold text-sm mb-2.5">
<svg class="w-4 h-4 text-[#D92D3C] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
Errores Costosos a Evitar
</div>
<ul class="text-xs text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">
<li>Mezclar gastos personales en la misma tarjeta bancaria.</li>
<li>Trabajar sin contratos de servicio ni facturas electrónicas.</li>
<li>Omitir el reporte informativo anual del estado o del IRS.</li>
</ul>
</div>
<div class="bg-[#F2F7F4] p-4.5 rounded-xl border border-[#1B4E2B]/20">
<div class="flex items-center gap-2 text-[#1B4E2B] font-bold text-sm mb-2.5">
<svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
Método Recomendado Guia Negocios
</div>
<ul class="text-xs text-slate-700 space-y-2 list-disc pl-4 leading-relaxed">
<li>Separación bancaria estricta para blindar patrimonio personal.</li>
<li>Automatización de presupuestos con firma digital.</li>
<li>Asesoría contable y preparación fiscal periódica.</li>
</ul>
</div>
</div>
</div>
```

### Archetype 5: Pro-Advisor Callout with Inline Vector SVG
```html
<div class="my-8 p-5 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#1B4E2B] rounded-r-2xl shadow-xs font-sans">
<div class="flex items-start gap-3.5">
<div class="w-8 h-8 rounded-full bg-[#1B4E2B] text-white flex items-center justify-center shrink-0 mt-0.5">
<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
</div>
<div>
<h5 class="text-sm font-bold text-[#1A2E35] mb-1">Consejo Clave de Nuestro Equipo Consultor</h5>
<p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
Un plan de negocios sólido no solo le permite obtener financiamiento bancario o préstamos SBA; es el mapa exacto que evita que el 70% de las nuevas empresas quiebren por falta de liquidez en sus primeros 24 meses.
</p>
</div>
</div>
</div>
```

### Full Visual Type Catalog (30 Archetypes)

Every blog post must pick its primary visual type from this list. **No two consecutive blog posts may use the same archetype.**

#### Data & Charts
| # | Visual Type | Best For |
|---|------------|----------|
| 1 | **Bar Chart** (horizontal, multi-color) | Comparing quantities, growth rates, market share |
| 2 | **Column Chart** (vertical bars) | Time-series comparisons, monthly data |
| 3 | **Stacked Bar Chart** | Parts-of-a-whole across categories |
| 4 | **Line Chart** (SVG polyline) | Trends over time, growth curves |
| 5 | **Area Chart** | Cumulative trends, volume over time |
| 6 | **Pie / Donut Chart** (SVG circle + stroke-dasharray) | Percentage breakdowns, market segments |
| 7 | **Statistical Callout / Metric Cards** | Hero numbers, key KPIs, impact stats |

#### Process & Flow
| # | Visual Type | Best For |
|---|------------|----------|
| 8 | **Timeline / Roadmap** (horizontal or zigzag) | Chronological steps, history, milestones |
| 9 | **Process Steps** (numbered phases in grid) | Sequential workflows, how-to guides |
| 10 | **Journey Map** | Customer experience, end-to-end lifecycle |
| 11 | **Funnel / Inbound Diagram** | Sales funnels, conversion stages, lead pipeline |
| 12 | **Flowchart / Decision Tree** | If-then logic, branching choices, compliance flows |

#### Structure & Comparison
| # | Visual Type | Best For |
|---|------------|----------|
| 13 | **Comparison Matrix / Table** | Side-by-side pros-vs-cons, feature comparisons |
| 14 | **Hierarchical / Org Chart** | Company structures, tax entity hierarchies, org levels |
| 15 | **Decision Matrix** (Do's vs Don'ts) | Good vs bad practices, right vs wrong choices |
| 16 | **Feature Grid** (icon cards) | Listing services, benefits, capabilities |

#### Spatial & Architectural
| # | Visual Type | Best For |
|---|------------|----------|
| 17 | **Geographical / Map Diagram** | Service areas, state-by-state data, location references |
| 18 | **Cloud / Architecture Diagram** | Tech stack, system integrations, data flow |
| 19 | **Ecosystem Diagram** | How entities relate to each other (IRS-STATE-BANK relationships) |

#### Text & Callouts
| # | Visual Type | Best For |
|---|------------|----------|
| 20 | **Pro-Advisor Callout** (gradient bg + icon) | Expert tips, key warnings, consultant advice |
| 21 | **Quote Block** (large styled blockquote) | Testimonials, regulatory quotes, key statements |
| 22 | **Checklist** (SVG checkboxes) | Action items, compliance requirements, to-do lists |
| 23 | **Warning / Risk Callout** (coral-themed) | Penalties, mistakes, things to avoid |
| 24 | **Success / Approval Callout** (emerald-themed) | Benefits achieved, approved status, wins |

#### Mixed & Compound
| # | Visual Type | Best For |
|---|------------|----------|
| 25 | **Icon + Stat Row** (image left, numbers right) | Key findings backed by photos |
| 26 | **Tabbed Card** (simulated tabs via radio/checkbox) | Multi-view content in one space |
| 27 | **Accordion Section** (details/summary) | FAQ, expandable sections |
| 28 | **Photo + Text Split** (image + side-by-side text) | Case studies, before/after, storytelling |
| 29 | **Badge & Award Showcase** | Certifications, accreditations, recognitions |
| 30 | **Resource Link Grid** | Official source links, reference cards |

### Stock Image Integration Rules

When generating or editing blog posts:

1. **Every post MUST have a unique cover image** from Pexels or Unsplash (never reuse across posts).
2. **Inline photos**: Use at least 1–2 relevant stock photos per post to break up HTML-only content.
3. **Placement**: Photos can be used inside Archetype 25 (Icon + Stat Row), Archetype 28 (Photo + Text Split), or as standalone full-width images between sections.
4. **Sourcing**: Use the Pexels and Unsplash API keys stored in Admin → Settings (Firestore `settings/admin`). Query keywords related to the post topic (e.g., "restaurant kitchen", "small business meeting", "bank documents").
5. **Alt text**: Every image must have descriptive bilingual alt text.

### Visual Selection Checklist

Before finalizing a blog post's visuals, verify:

- [ ] **Primary visual type** is different from the previous blog post (Rule 2)
- [ ] **No indent/linning style** anywhere (Rule 1)
- [ ] Total visuals match the **word-count formula**: `ceil(word_count / 200) + 1` (Rule 7)
- [ ] At least **2 different visual archetypes** used within the post
- [ ] At least **1 stock photo** from Pexels or Unsplash (Rule 4)
- [ ] Cover image is unique (not used by any other post)
- [ ] All HTML flush to column 0 (no 4-space indents)
- [ ] Colors use brand palette values from Section 1
- [ ] Zero emojis — only inline SVG icons and numeral badges
- [ ] At least **3 verified source citations** at the bottom from any authoritative domain (Rule 6)

---
