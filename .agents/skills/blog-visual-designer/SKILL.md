---
name: blog-visual-designer
description: Comprehensive visual and graphic design skill for generating responsive HTML, CSS, and SVG infographics, charts, diagrams, metric cards, and color-rich typography to eliminate text walls and create magazine-quality blog content.
---

# Blog Visual & Graphic Designer Skill

This skill empowers AI agents to craft state-of-the-art, colorful, and engaging visual graphics, charts, and micro-layouts directly inside Markdown blog posts for **GUIA DE NEGOCIOS**.

## 1. Core Visual Philosophy: "Never Read Like a Dense Book"
- **Pacing & Breathing Room:** No paragraph should ever exceed 2 to 3 sentences.
- **Rhythm:** Alternate between bold lead-in lists, color-accented quote callouts, metric cards, comparison matrices, and visual charts.
- **Strict Zero-Emoji Policy:** Never use informal unicode emojis. Always use clean inline SVG vector icons, sleek numeral badges, or modern geometric accents.
- **Color Palette & Visual Warmth:**
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
