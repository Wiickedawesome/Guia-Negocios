/**
 * Guia Negocios Official Website Design Elements for Landing Pages
 * Rich, High-Converting, Colorful & Brand Aligned Design System:
 * - brand-primary: #1B4E2B (Dark Forest Green)
 * - brand-dark: #1A2E35 (Deep Navy Slate)
 * - brand-accent: #F0C850 (Warm Gold for Sales / Promos)
 * - brand-light: #F2F7F4 (Mint Slate)
 */

export const LANDING_PAGE_TEMPLATES = {
  hero: `
<!-- Hero Style A: Rich Dark Navy & Emerald Ambient Glow Hero -->
<div class="builder-block bg-brand-dark text-white rounded-3xl p-8 sm:p-14 lg:p-16 my-6 shadow-2xl relative overflow-hidden font-sans">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/25 via-brand-primary/20 to-transparent pointer-events-none"></div>
  <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>
  
  <div class="relative z-10 max-w-3xl mx-auto text-center space-y-6">
    <div>
      <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
        <span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        <span contenteditable="true">OFERTA ESPECIAL PARA NEGOCIOS</span>
      </span>
    </div>

    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight text-white" contenteditable="true">
      Tome el Control de su Empresa con un <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400">15% de Descuento</span>
    </h1>

    <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed" contenteditable="true">
      Soluciones empresariales y fiscales 100% bilingües diseñadas para maximizar sus ventas y asegurar el cumplimiento de su negocio en Tennessee.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-accent hover:bg-yellow-400 text-brand-dark font-bold py-4 px-8 rounded-full transition-all text-base shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5" contenteditable="true">
        Reclamar Mi Descuento del 15%
      </a>
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-full border border-white/20 transition-all text-base gap-2 backdrop-blur-sm">
        <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span contenteditable="true">(865) 202-7112</span>
      </a>
    </div>

    <div class="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 text-center">
      <div>
        <div class="text-emerald-400 font-bold text-base sm:text-xl font-heading" contenteditable="true">100%</div>
        <div class="text-slate-400 text-xs sm:text-sm" contenteditable="true">Atención Bilingüe</div>
      </div>
      <div class="border-x border-white/10">
        <div class="text-amber-400 font-bold text-base sm:text-xl font-heading" contenteditable="true">24 Horas</div>
        <div class="text-slate-400 text-xs sm:text-sm" contenteditable="true">Respuesta Rápida</div>
      </div>
      <div>
        <div class="text-emerald-400 font-bold text-base sm:text-xl font-heading" contenteditable="true">Knoxville, TN</div>
        <div class="text-slate-400 text-xs sm:text-sm" contenteditable="true">Presencia Local</div>
      </div>
    </div>
  </div>
</div>
  `,

  hero_light: `
<!-- Hero Style B: Modern Crisp Brand Light Hero (Matches Main Website) -->
<div class="builder-block bg-gradient-to-b from-[#F2F7F4] via-white to-slate-50 text-slate-900 rounded-3xl p-8 sm:p-14 lg:p-16 my-6 shadow-sm border border-slate-200 relative overflow-hidden font-sans">
  <div class="max-w-3xl mx-auto text-center space-y-6">
    <div>
      <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-brand-primary text-xs sm:text-sm font-bold tracking-wider uppercase">
        <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
        <span contenteditable="true">ASESORÍA EMPRESARIAL EN TENNESSEE</span>
      </span>
    </div>

    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-brand-dark leading-tight tracking-tight" contenteditable="true">
      Haga Crecer su Empresa con <span class="text-brand-primary">Estructura Legal y Fiscal Sólida</span>
    </h1>

    <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" contenteditable="true">
      Desde la apertura de su LLC hasta licencias comerciales y contabilidad en Knoxville. Orientación 100% bilingüe y personalizada.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-primary hover:bg-emerald-900 text-white font-bold py-4 px-8 rounded-full transition-all text-base shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5" contenteditable="true">
        Solicitar Consulta Gratuita
      </a>
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-slate-100 text-brand-dark font-semibold py-4 px-6 rounded-full border border-slate-300 transition-all text-base gap-2 shadow-xs">
        <svg class="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span contenteditable="true">(865) 202-7112</span>
      </a>
    </div>

    <div class="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-center">
      <div>
        <div class="text-brand-primary font-bold text-base sm:text-xl font-heading" contenteditable="true">100%</div>
        <div class="text-slate-500 text-xs sm:text-sm" contenteditable="true">Atención Bilingüe</div>
      </div>
      <div class="border-x border-slate-200/80">
        <div class="text-amber-500 font-bold text-base sm:text-xl font-heading" contenteditable="true">24 Horas</div>
        <div class="text-slate-500 text-xs sm:text-sm" contenteditable="true">Respuesta Rápida</div>
      </div>
      <div>
        <div class="text-brand-primary font-bold text-base sm:text-xl font-heading" contenteditable="true">Knoxville, TN</div>
        <div class="text-slate-500 text-xs sm:text-sm" contenteditable="true">Presencia Local</div>
      </div>
    </div>
  </div>
</div>
  `,

  hero_split: `
<!-- Hero Style C: 2-Column Split Hero (Left: Value Proposition + Right: Action Card) -->
<div class="builder-block bg-brand-dark text-white rounded-3xl p-8 sm:p-12 lg:p-14 my-6 shadow-2xl relative overflow-hidden font-sans">
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none"></div>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
    <div class="lg:col-span-7 space-y-6">
      <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold tracking-wider uppercase">
        <span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        <span contenteditable="true">CONSULTORÍA ESPECIALIZADA</span>
      </span>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight" contenteditable="true">
        Soluciones Estratégicas para <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400">Emprendedores Hispanos</span>
      </h1>
      <p class="text-slate-300 text-base leading-relaxed" contenteditable="true">
        Blindaje legal, licencias comerciales y control tributario con asesores que entienden sus necesidades reales en Tennessee.
      </p>
      <div class="space-y-2.5 pt-2">
        <div class="flex items-center gap-3 text-sm text-slate-200 font-medium">
          <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span contenteditable="true">Registro rápido de LLC y número EIN sin intermediarios costosos</span>
        </div>
        <div class="flex items-center gap-3 text-sm text-slate-200 font-medium">
          <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span contenteditable="true">Asesoría contable y fiscal para evitar auditorías y multas del IRS</span>
        </div>
        <div class="flex items-center gap-3 text-sm text-slate-200 font-medium">
          <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span contenteditable="true">Atención personalizada en español por llamada directa o WhatsApp</span>
        </div>
      </div>
    </div>
    <div class="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-4">
      <h3 class="text-xl font-heading font-bold text-brand-dark text-center" contenteditable="true">Solicite su Asesoría Hoy</h3>
      <p class="text-xs text-slate-500 text-center" contenteditable="true">Un consultor bilingüe se comunicará en menos de 24h</p>
      <a href="#formulario" class="w-full inline-flex items-center justify-center bg-brand-primary hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm shadow-md" contenteditable="true">
        Comenzar Ahora →
      </a>
      <a href="tel:8652027112" class="w-full inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all text-sm gap-2">
        <svg class="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span contenteditable="true">Llamar: (865) 202-7112</span>
      </a>
    </div>
  </div>
</div>
  `,

  features: `
<!-- Colorful Value & Benefit Cards -->
<div class="builder-block bg-slate-50/80 p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-12 space-y-3">
    <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
      Ventajas Exclusivas
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight" contenteditable="true">
      Todo lo que su Negocio Necesita para Triunfar
    </h2>
    <p class="text-base text-slate-600 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Estrategia, diseño y asesoría profesional sin complicaciones técnicas.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Card 1: Emerald Gradient -->
    <div class="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      </div>
      <div>
        <h3 class="text-xl font-heading text-brand-dark font-bold mb-2" contenteditable="true">Protección y Cumplimiento</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Evite sanciones costosas del IRS y el estado. Estructuramos sus trámites con total apego a la ley.</p>
      </div>
    </div>
    <!-- Card 2: Gold Gradient -->
    <div class="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      </div>
      <div>
        <h3 class="text-xl font-heading text-brand-dark font-bold mb-2" contenteditable="true">Proceso Ágil y Rápido</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Sin trámites engorrosos ni pérdidas de tiempo. Nos encargamos de la gestión de punta a punta.</p>
      </div>
    </div>
    <!-- Card 3: Navy Gradient -->
    <div class="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-dark to-slate-800 flex items-center justify-center text-white shadow-md shadow-slate-900/20">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      </div>
      <div>
        <h3 class="text-xl font-heading text-brand-dark font-bold mb-2" contenteditable="true">Atención 100% en Español</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Entendemos sus metas comerciales y le explicamos cada paso en su propio idioma con total claridad.</p>
      </div>
    </div>
  </div>
</div>
  `,

  process_flow: `
<!-- Step-by-Step Visual Roadmap (4 Milestones) -->
<div class="builder-block bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-12 space-y-3">
    <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
      Paso a Paso
    </span>
    <h2 class="text-2xl sm:text-4xl font-heading font-bold text-brand-dark leading-tight" contenteditable="true">
      ¿Cómo Funciona el Proceso?
    </h2>
    <p class="text-base text-slate-600 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Un camino claro, transparente y sin complicaciones desde el primer contacto.
    </p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-slate-50/80 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all shadow-2xs">
      <div>
        <span class="text-brand-primary font-heading font-bold text-3xl mb-3 block" contenteditable="true">01</span>
        <h3 class="text-slate-900 font-heading font-bold text-lg mb-2" contenteditable="true">Diagnóstico Gratuito</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Revisamos su situación actual y metas comerciales en una consulta de 15 minutos sin costo.</p>
      </div>
    </div>
    <div class="bg-slate-50/80 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all shadow-2xs">
      <div>
        <span class="text-brand-primary font-heading font-bold text-3xl mb-3 block" contenteditable="true">02</span>
        <h3 class="text-slate-900 font-heading font-bold text-lg mb-2" contenteditable="true">Plan y Estrategia</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Diseñamos la estructura a medida y preparamos toda la documentación requerida.</p>
      </div>
    </div>
    <div class="bg-slate-50/80 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all shadow-2xs">
      <div>
        <span class="text-brand-primary font-heading font-bold text-3xl mb-3 block" contenteditable="true">03</span>
        <h3 class="text-slate-900 font-heading font-bold text-lg mb-2" contenteditable="true">Ejecución y Gestión</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Tramitamos y configuramos todo directamente con las autoridades pertinentes.</p>
      </div>
    </div>
    <div class="bg-slate-50/80 p-7 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all shadow-2xs">
      <div>
        <span class="text-brand-primary font-heading font-bold text-3xl mb-3 block" contenteditable="true">04</span>
        <h3 class="text-slate-900 font-heading font-bold text-lg mb-2" contenteditable="true">Entrega y Soporte</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Reciba sus documentos listos para operar y cuente con asesoría post-entrega continua.</p>
      </div>
    </div>
  </div>
</div>
  `,

  comparison_matrix: `
<!-- High-Impact Comparison Matrix Table -->
<div class="builder-block bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
      Comparativa Transparente
    </span>
    <h2 class="text-2xl sm:text-4xl font-heading font-bold text-brand-dark leading-tight" contenteditable="true">
      ¿Por qué elegir Guía de Negocios?
    </h2>
    <p class="text-base text-slate-600 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Vea la diferencia entre trabajar con especialistas bilingües dedicados vs. otras alternativas.
    </p>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse text-sm">
      <thead>
        <tr class="border-b border-slate-200">
          <th class="py-4 px-4 font-heading font-bold text-slate-900 text-base">Aspecto Clave</th>
          <th class="py-4 px-4 font-heading font-bold text-brand-primary bg-emerald-50/80 rounded-t-2xl text-base text-center">Guía de Negocios</th>
          <th class="py-4 px-4 font-heading font-semibold text-slate-500 text-center">Abogados Tradicionales</th>
          <th class="py-4 px-4 font-heading font-semibold text-slate-500 text-center">Plataformas en Inglés</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr>
          <td class="py-3.5 px-4 font-semibold text-slate-800" contenteditable="true">Atención 100% en Español</td>
          <td class="py-3.5 px-4 text-center bg-emerald-50/40 text-emerald-700 font-bold" contenteditable="true">✓ Directa y personalizada</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Rara vez bilingüe</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Solo en inglés</td>
        </tr>
        <tr>
          <td class="py-3.5 px-4 font-semibold text-slate-800" contenteditable="true">Alcance Claro desde el Inicio</td>
          <td class="py-3.5 px-4 text-center bg-emerald-50/40 text-emerald-700 font-bold" contenteditable="true">✓ Paquetes cerrados por escrito</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Alcance que cambia con frecuencia</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Expectativas poco claras</td>
        </tr>
        <tr>
          <td class="py-3.5 px-4 font-semibold text-slate-800" contenteditable="true">Enfoque 360° (Fiscal + Comercial)</td>
          <td class="py-3.5 px-4 text-center bg-emerald-50/40 text-emerald-700 font-bold" contenteditable="true">✓ Asesoría integral</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Solo aspecto legal</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Sin asesoría humana</td>
        </tr>
        <tr>
          <td class="py-3.5 px-4 font-semibold text-slate-800" contenteditable="true">Acompañamiento Post-Entrega</td>
          <td class="py-3.5 px-4 text-center bg-emerald-50/40 text-emerald-700 font-bold rounded-b-2xl" contenteditable="true">✓ Soporte continuo</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Costo adicional</td>
          <td class="py-3.5 px-4 text-center text-slate-500" contenteditable="true">Inexistente</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,

  metrics_stats: `
<!-- WARNING (audit F-A26): the tiles below are PLACEHOLDERS. Never publish unsourced numbers
     or "verified rating" claims — replace with real, sourced values or delete the block. -->
<!-- 4-Stat Metric & Social Proof Bar -->
<div class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    <div class="bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
      <div class="text-3xl sm:text-4xl font-heading font-extrabold text-brand-primary mb-1" contenteditable="true">+500</div>
      <div class="text-xs sm:text-sm font-semibold text-slate-700" contenteditable="true">Empresarios Asesorados</div>
      <div class="text-[11px] text-slate-500 mt-1" contenteditable="true">Knoxville y Tennessee</div>
    </div>
    <div class="bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
      <div class="text-3xl sm:text-4xl font-heading font-extrabold text-amber-500 mb-1" contenteditable="true">100%</div>
      <div class="text-xs sm:text-sm font-semibold text-slate-700" contenteditable="true">En su Idioma</div>
      <div class="text-[11px] text-slate-500 mt-1" contenteditable="true">Español e Inglés</div>
    </div>
    <div class="bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
      <div class="text-3xl sm:text-4xl font-heading font-extrabold text-brand-primary mb-1" contenteditable="true">24h</div>
      <div class="text-xs sm:text-sm font-semibold text-slate-700" contenteditable="true">Tiempo de Respuesta</div>
      <div class="text-[11px] text-slate-500 mt-1" contenteditable="true">Atención Ágil</div>
    </div>
    <div class="bg-slate-50/80 p-6 rounded-2xl border border-slate-100">
      <div class="text-3xl sm:text-4xl font-heading font-extrabold text-amber-500 mb-1" contenteditable="true">4.9/5</div>
      <div class="text-xs sm:text-sm font-semibold text-slate-700" contenteditable="true">Satisfacción de Clientes</div>
      <div class="text-[11px] text-slate-500 mt-1" contenteditable="true">Calificación Verificada</div>
    </div>
  </div>
</div>
  `,

  problem_solution: `
<!-- Problem vs. Solution Row Matrix -->
<div class="builder-block bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-900 text-xs font-bold uppercase tracking-wider">
      Solución a Sus Desafíos
    </span>
    <h2 class="text-2xl sm:text-4xl font-heading font-bold text-brand-dark leading-tight" contenteditable="true">
      Cada Obstáculo Tiene una Solución en Guía de Negocios
    </h2>
    <p class="text-base text-slate-600 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Eliminamos las barreras legales, de idioma y fiscales para que su empresa crezca sobre bases sólidas.
    </p>
  </div>
  <div class="max-w-3xl mx-auto space-y-4">
    <div class="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">✕</div>
        <span class="text-sm sm:text-base font-semibold text-slate-800" contenteditable="true">Miedo a multas del IRS por desconocimiento fiscal</span>
      </div>
      <div class="flex items-center gap-3 text-emerald-700 font-bold text-sm sm:text-base sm:text-right">
        <span class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
        <span contenteditable="true">Estructura formal y asesoría preventiva</span>
      </div>
    </div>
    <div class="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">✕</div>
        <span class="text-sm sm:text-base font-semibold text-slate-800" contenteditable="true">Plataformas en inglés con términos legales confusos</span>
      </div>
      <div class="flex items-center gap-3 text-emerald-700 font-bold text-sm sm:text-base sm:text-right">
        <span class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
        <span contenteditable="true">Atención 100% en español por WhatsApp o llamada</span>
      </div>
    </div>
    <div class="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">✕</div>
        <span class="text-sm sm:text-base font-semibold text-slate-800" contenteditable="true">Falta de tiempo y desorden en los papeles</span>
      </div>
      <div class="flex items-center gap-3 text-emerald-700 font-bold text-sm sm:text-base sm:text-right">
        <span class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
        <span contenteditable="true">Gestión llave en mano rápida y organizada</span>
      </div>
    </div>
  </div>
</div>
  `,

  faq: `
<!-- Standard Website FAQ (FaqAccordion.astro 2-Column Structure) -->
<div class="builder-block bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
    
    <!-- Left Column: Heading & Contact Link -->
    <div class="lg:col-span-5 space-y-4">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-tight" contenteditable="true">
        Preguntas Frecuentes
      </h2>
      <div>
        <a href="/es/contact" class="inline-flex items-center text-brand-primary font-semibold hover:underline text-base gap-2" contenteditable="true">
          Contáctenos para más información <span>→</span>
        </a>
      </div>
    </div>

    <!-- Right Column: Accordion Items -->
    <div class="lg:col-span-7 space-y-4">
      <!-- Item 01 -->
      <details class="group border-b border-slate-200 pb-5 transition-all duration-200" open>
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-bold text-xl min-w-[32px]">01</span>
            <h3 class="text-base sm:text-lg font-heading text-brand-dark font-semibold leading-snug" contenteditable="true">
              ¿Cómo puedo reclamar mi descuento?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-12 sm:pl-14 pt-3 pr-4 text-slate-600 text-sm leading-relaxed" contenteditable="true">
          <p>Solo complete el formulario en esta página o contáctenos directamente por WhatsApp. El descuento del 15% se aplicará automáticamente en su cotización.</p>
        </div>
      </details>

      <!-- Item 02 -->
      <details class="group border-b border-slate-200 pb-5 transition-all duration-200">
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-bold text-xl min-w-[32px]">02</span>
            <h3 class="text-base sm:text-lg font-heading text-brand-dark font-semibold leading-snug" contenteditable="true">
              ¿Cuánto tiempo toma iniciar el proceso?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-12 sm:pl-14 pt-3 pr-4 text-slate-600 text-sm leading-relaxed" contenteditable="true">
          <p>Nos comunicaremos con usted en menos de 24 horas para agendar su consulta inicial y definir los detalles de su proyecto.</p>
        </div>
      </details>

      <!-- Item 03 -->
      <details class="group border-b border-slate-200 pb-5 transition-all duration-200">
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-bold text-xl min-w-[32px]">03</span>
            <h3 class="text-base sm:text-lg font-heading text-brand-dark font-semibold leading-snug" contenteditable="true">
              ¿Ofrecen soporte continuo en español?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-12 sm:pl-14 pt-3 pr-4 text-slate-600 text-sm leading-relaxed" contenteditable="true">
          <p>Sí. Todo nuestro equipo es bilingüe y le asistimos en español en cada consulta, cambio y soporte post-lanzamiento.</p>
        </div>
      </details>

      <div class="pt-3">
        <a href="/es/faq" class="inline-flex items-center text-brand-primary font-semibold hover:underline text-sm gap-2" contenteditable="true">
          Ver todas las preguntas y respuestas <span>→</span>
        </a>
      </div>
    </div>
  </div>
</div>
  `,

  form_promo: `
<!-- High-Impact Promo Claim Form with High-Converting Layout -->
<div id="formulario" class="builder-block bg-gradient-to-b from-slate-50 to-white border-2 border-emerald-100 rounded-3xl p-8 sm:p-14 my-6 shadow-xl shadow-slate-200/50 font-sans">
  <div class="max-w-xl mx-auto space-y-8">
    <div class="text-center space-y-3">
      <span class="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-xs">
        Oferta por Tiempo Limitado
      </span>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-dark" contenteditable="true">
        ¡Asegure su Descuento del 15% Hoy!
      </h2>
      <p class="text-sm sm:text-base text-slate-600 max-w-md mx-auto" contenteditable="true">
        Complete el formulario a continuación y un asesor se comunicará en menos de 24 horas.
      </p>
    </div>

    <!-- Submission is handled by src/scripts/lp-lead-form.ts, which the landing-page
         renderers attach. Do not add an alert() here: it fired before the handler
         ran and told the visitor their details were received even when the write
         failed. -->
    <form class="space-y-4" onsubmit="event.preventDefault();">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Nombre Completo</label>
          <input type="text" required placeholder="Ej. Carlos Mendoza" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">WhatsApp / Teléfono</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Correo Electrónico</label>
        <input type="email" required placeholder="carlos@correo.com" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Tipo de Negocio / Industria</label>
        <input type="text" placeholder="Ej. Construcción, Restaurante, Limpieza, LLC" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
      </div>
      <button type="submit" class="w-full py-4 bg-brand-accent hover:bg-yellow-400 text-brand-dark font-bold rounded-full text-base transition-all shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer mt-2" contenteditable="true">
        Reclamar Mi Cupón del 15% OFF
      </button>
    </form>

    <div class="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500">
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> 100% Confidencial</span>
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Sin Compromiso</span>
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Respuesta en 24h</span>
    </div>
  </div>
</div>
  `,

  form_lead: `
<!-- High-Impact Lead Capture Form -->
<div id="formulario" class="builder-block bg-gradient-to-b from-slate-50 to-white border-2 border-emerald-100 rounded-3xl p-8 sm:p-14 my-6 shadow-xl shadow-slate-200/50 font-sans">
  <div class="max-w-xl mx-auto space-y-8">
    <div class="text-center space-y-3">
      <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-xs">
        Consulta Estratégica
      </span>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-dark" contenteditable="true">
        Solicite su Asesoría Gratuita
      </h2>
      <p class="text-sm sm:text-base text-slate-600 max-w-md mx-auto" contenteditable="true">
        Complete sus datos y un consultor bilingüe se comunicará hoy mismo sin costo.
      </p>
    </div>

    <!-- Submission is handled by src/scripts/lp-lead-form.ts. See the note on
         form_promo above for why the alert() was removed. -->
    <form class="space-y-4" onsubmit="event.preventDefault();">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Nombre Completo</label>
          <input type="text" required placeholder="Ej. Carlos Mendoza" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Teléfono / WhatsApp</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Correo Electrónico</label>
        <input type="email" required placeholder="carlos@correo.com" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">¿En qué podemos ayudarle?</label>
        <textarea rows="3" placeholder="Describa brevemente su proyecto o consulta..." class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none shadow-2xs transition-all"></textarea>
      </div>
      <button type="submit" class="w-full py-4 bg-brand-primary hover:bg-emerald-900 text-white font-bold rounded-full text-base transition-all shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer mt-2" contenteditable="true">
        Enviar Solicitud
      </button>
    </form>

    <div class="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500">
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> 100% Confidencial</span>
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Asesoría Personalizada</span>
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Respuesta en 24h</span>
    </div>
  </div>
</div>
  `,

  form_call: `
<!-- High-Impact Call Booking Form -->
<div id="formulario" class="builder-block bg-gradient-to-b from-slate-50 to-white border-2 border-emerald-100 rounded-3xl p-8 sm:p-14 my-6 shadow-xl shadow-slate-200/50 font-sans">
  <div class="max-w-xl mx-auto space-y-8">
    <div class="text-center space-y-3">
      <span class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-xs">
        Agenda Directa
      </span>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-dark" contenteditable="true">
        Agende su Consulta Telefónica
      </h2>
      <p class="text-sm sm:text-base text-slate-600 max-w-md mx-auto" contenteditable="true">
        Sesión de 15 minutos con un consultor empresarial bilingüe sin costo ni compromiso.
      </p>
    </div>

    <!-- Submission is handled by src/scripts/lp-lead-form.ts. See the note on
         form_promo above for why the alert() was removed. -->
    <form class="space-y-4" onsubmit="event.preventDefault();">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Nombre Completo</label>
          <input type="text" required placeholder="Su nombre" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Teléfono / WhatsApp</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-2xs transition-all" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" contenteditable="true">Horario Preferido</label>
        <select class="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 font-medium shadow-2xs transition-all">
          <option>Mañana (9:00 AM - 12:00 PM)</option>
          <option>Tarde (1:00 PM - 5:00 PM)</option>
        </select>
      </div>
      <button type="submit" class="w-full py-4 bg-brand-primary hover:bg-emerald-900 text-white font-bold rounded-full text-base transition-all shadow-lg shadow-emerald-900/20 transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer mt-2" contenteditable="true">
        Confirmar Mi Cita Telefónica
      </button>
    </form>

    <div class="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500">
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> 100% Gratuita</span>
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg> Sin Compromiso</span>
      <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> Llamada Puntual</span>
    </div>
  </div>
</div>
  `,

  cta: `
<!-- Official Dark Navy CTA with Gold & Emerald Accents -->
<div class="builder-block bg-brand-dark text-white p-8 sm:p-14 lg:p-16 rounded-3xl text-center shadow-2xl my-6 font-sans relative overflow-hidden">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none"></div>
  <div class="relative z-10 max-w-2xl mx-auto space-y-6">
    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
      ¿Listo Para Empezar?
    </span>
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white leading-tight" contenteditable="true">
      Haga Crecer su Empresa con el Respaldo Adecuado
    </h2>
    <p class="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Hable hoy con uno de nuestros consultores bilingües y reciba orientación clara, confiable y personalizada en su propio idioma.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-accent hover:bg-yellow-400 text-brand-dark font-bold py-4 px-8 rounded-full transition-all text-base shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5" contenteditable="true">
        Llamar al (865) 202-7112
      </a>
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-full border border-white/20 transition-all text-base backdrop-blur-sm" contenteditable="true">
        Completar Formulario
      </a>
    </div>
  </div>
</div>
  `
};
