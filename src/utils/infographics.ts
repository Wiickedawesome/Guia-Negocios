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
 * Returns complete AI instructions for generating rich, multi-component infographics
 */
export function getInfographicSystemPrompt(): string {
  return `
INFOGRAPHIC & DATA VISUALIZATION ENGINE (MANDATORY MULTI-VISUAL RULE):
Every generated article MUST embed AT LEAST 2 to 3 DISTINCT custom HTML/CSS/SVG infographics, charts, bar graphs, or visual cards to break up continuous text and make the post visually compelling.

CRITICAL HTML FORMATTING RULES (STRICT):
1. NEVER indent HTML lines with 4 spaces or tabs! Markdown parsers treat 4-space indentation as a code block. Output all HTML tags starting flush to the left margin.
2. Self-Contained Containers: Always wrap HTML components in a responsive Tailwind container.
3. Colors: Primary (#1B4E2B), Accent Gold (#F0C850), Dark Slate (#1A2E35), Mint (#F2F7F4), Danger Red (#D92D3C).

VISUAL COMPONENT ARCHETYPES TO EMBED (Choose 2-3 that best fit the topic):

1. RESPONSIVE BAR CHART / GROWTH GRAPH:
<div class="my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
<div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
<h4 class="text-base font-bold text-[#1A2E35]">Comparativa de Crecimiento y Éxito Comercial</h4>
<span class="text-xs font-semibold px-2.5 py-1 bg-[#F2F7F4] text-[#1B4E2B] rounded-full">Datos SBA / Census</span>
</div>
<div class="space-y-3.5">
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-slate-700"><span>Sin Planificación Formal (Improvisado)</span><span>30% Tasa de Supervivencia</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-slate-400 rounded-full" style="width: 30%;"></div></div>
</div>
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-[#1A2E35]"><span>Con Estructura Legal & Plan Estratégico</span><span>85% Tasa de Supervivencia</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-[#1B4E2B] rounded-full" style="width: 85%;"></div></div>
</div>
</div>
</div>

2. METRIC STATS HIGHLIGHT CARD:
<div class="my-8 p-6 bg-[#1A2E35] text-white rounded-2xl shadow-md border border-slate-700">
<div class="flex items-center justify-between mb-5">
<h4 class="text-base font-bold text-white">Impacto Económico y Métricas Clave</h4>
<span class="text-xs px-2.5 py-0.5 rounded-full bg-[#F0C850]/20 text-[#F0C850] font-semibold border border-[#F0C850]/30">Estudio Stanford / SBA</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-2xl sm:text-3xl font-extrabold text-[#F0C850] mb-1">178%</div>
<div class="text-xs text-slate-300">Crecimiento de Nuevos Negocios Hispanos</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-2xl sm:text-3xl font-extrabold text-[#F0C850] mb-1">$653B</div>
<div class="text-xs text-slate-300">Aporte Anual a la Economía de EE.UU.</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-2xl sm:text-3xl font-extrabold text-[#F0C850] mb-1">5M+</div>
<div class="text-xs text-slate-300">Empresas Activas en los Estados Unidos</div>
</div>
</div>
</div>

3. STEP-BY-STEP FLOW MAP / TIMELINE:
<div class="my-8 p-6 bg-[#F2F7F4] border border-[#1B4E2B]/20 rounded-2xl shadow-sm">
<h4 class="text-base font-bold text-[#1A2E35] mb-4">Hoja de Ruta: Fases de Ejecución</h4>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
<div class="bg-white p-4 rounded-xl border border-slate-200">
<span class="w-6 h-6 rounded-full bg-[#1B4E2B] text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
<strong class="block text-sm text-[#1A2E35] mb-1">Fase 1: Planificación</strong>
<p class="text-xs text-slate-600">Estudio de mercado, modelo financiero y propuesta de valor única.</p>
</div>
<div class="bg-white p-4 rounded-xl border border-slate-200">
<span class="w-6 h-6 rounded-full bg-[#1B4E2B] text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
<strong class="block text-sm text-[#1A2E35] mb-1">Fase 2: Formalización</strong>
<p class="text-xs text-slate-600">Registro de LLC, trámite de EIN y apertura de cuenta bancaria comercial.</p>
</div>
<div class="bg-white p-4 rounded-xl border border-slate-200">
<span class="w-6 h-6 rounded-full bg-[#1B4E2B] text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
<strong class="block text-sm text-[#1A2E35] mb-1">Fase 3: Operación</strong>
<p class="text-xs text-slate-600">Lanzamiento de marketing, facturación formal y atracción de clientes.</p>
</div>
</div>
</div>

4. VISUAL CHECKLIST & REQUIREMENTS CARD:
<div class="my-8 p-6 bg-[#F2F7F4] border border-[#1B4E2B]/20 rounded-2xl shadow-sm">
<div class="flex items-center gap-3 mb-4">
<div class="w-8 h-8 rounded-full bg-[#1B4E2B] text-white flex items-center justify-center font-bold text-sm">✓</div>
<h4 class="text-lg font-bold text-[#1A2E35]">Lista de Verificación y Requisitos Obligatorios</h4>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 1: Estructura Legal</strong><span class="text-slate-600 text-xs">Registro oficial de Artículos de Organización.</span></div>
</div>
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 2: Identificación Fiscal</strong><span class="text-slate-600 text-xs">Tramitación del número EIN ante el IRS.</span></div>
</div>
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 3: Cuentas Comerciales</strong><span class="text-slate-600 text-xs">Apertura de cuenta bancaria para blindar activos.</span></div>
</div>
<div class="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
<span class="text-[#1B4E2B] font-bold text-base leading-none mt-0.5">✓</span>
<div><strong class="text-[#1A2E35] block">Paso 4: Licencias y Permisos</strong><span class="text-slate-600 text-xs">Cumplimiento comercial y tributario local.</span></div>
</div>
</div>
</div>

5. SPLIT DECISION (LO QUE FUNCIONA VS ERRORES COMUNES):
<div class="my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
<h4 class="text-base font-bold text-[#1A2E35] mb-4">Decisión Estratégica: Errores Comunes vs Método Recomendado</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="bg-[#fef2f2] p-4 rounded-xl border border-[#fecaca]">
<div class="flex items-center gap-2 text-[#D92D3C] font-bold text-sm mb-2"><span>✕</span> Errores Frecuentes</div>
<ul class="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
<li>Mezclar finanzas personales y comerciales en la misma cuenta.</li>
<li>Operar sin contratos formales ni cotizaciones por escrito.</li>
<li>Ignorar declaraciones y reportes informativos obligatorios.</li>
</ul>
</div>
<div class="bg-[#F2F7F4] p-4 rounded-xl border border-[#1B4E2B]/20">
<div class="flex items-center gap-2 text-[#1B4E2B] font-bold text-sm mb-2"><span>✓</span> Método Recomendado Guia Negocios</div>
<ul class="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
<li>Separación bancaria total para proteger su patrimonio personal.</li>
<li>Automatización de presupuestos y contratos de servicio.</li>
<li>Asesoría continua en bookkeeping y optimización tributaria.</li>
</ul>
</div>
</div>
</div>
`;
}
