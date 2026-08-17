/**
 * High-Converting Landing Page Design System & Section Templates for GUIA DE NEGOCIOS
 * 
 * Brand tokens:
 * - Brand Dark: #1A2E35 (Slate Charcoal Navy)
 * - Brand Primary: #1B4E2B (Deep Forest Green)
 * - Brand Accent: #F0C850 (Golden Amber)
 * - Brand Light: #F2F7F4 (Mint Cream)
 * - Danger: #D92D3C (Crimson Red)
 */

export const LP_BRAND_COLORS = {
  primary: '#1B4E2B',
  accent: '#F0C850',
  dark: '#1A2E35',
  light: '#F2F7F4',
  danger: '#D92D3C'
};

export const LANDING_PAGE_TEMPLATES = {
  hero: `
<section class="builder-block relative bg-[#1A2E35] text-white py-16 px-6 sm:px-10 rounded-2xl shadow-xl overflow-hidden my-4 border border-slate-700 font-sans">
  <div class="absolute inset-0 bg-gradient-to-br from-[#1A2E35] via-[#1B4E2B]/50 to-[#1A2E35] pointer-events-none"></div>
  <div class="relative max-w-4xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] text-xs font-bold uppercase tracking-wider mb-6 border border-[#F0C850]/40 shadow-xs">
      <span class="w-2 h-2 rounded-full bg-[#F0C850]"></span>
      <span contenteditable="true">Oferta Exclusiva · Asesoría 100% en Español</span>
    </div>
    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight font-heading" contenteditable="true">
      Lleve su Negocio al Siguiente Nivel con <span class="relative text-[#F0C850] whitespace-nowrap">Estructura Legal<svg class="absolute -bottom-2 left-0 w-full h-3 text-[#F0C850]" viewBox="0 0 200 14" preserveAspectRatio="none" fill="none"><path d="M3 10 Q 100 0 197 8" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg></span>
    </h1>
    <p class="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed" contenteditable="true">
      Registre su LLC, obtenga su número EIN ante el IRS y blindaje sus finanzas personales sin complicaciones legales ni intermediarios costosos.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
      <a href="#contacto" class="w-full sm:w-auto px-8 py-4 bg-[#F0C850] hover:bg-amber-400 text-slate-900 font-extrabold rounded-xl shadow-lg transition-all text-center text-base" contenteditable="true">
        Reclamar Consulta Gratuita
      </a>
      <a href="tel:8652027112" class="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-center text-base flex items-center justify-center gap-2">
        <svg class="w-5 h-5 text-[#F0C850]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span contenteditable="true">Llamar: (865) 202-7112</span>
      </a>
    </div>
  </div>
</section>
  `,

  stats: `
<section class="builder-block bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-[#F2F7F4] border border-[#1B4E2B]/10 rounded-xl p-4 flex flex-col justify-between">
      <div class="text-2xl sm:text-3xl font-extrabold text-[#1B4E2B] font-heading" contenteditable="true">178%</div>
      <div class="text-xs text-slate-700 font-semibold mt-1" contenteditable="true">Crecimiento de Negocios Latinos <span class="block text-[10px] text-slate-500 font-bold uppercase mt-0.5">MSU Research</span></div>
    </div>
    <div class="bg-[#F2F7F4] border border-[#1B4E2B]/10 rounded-xl p-4 flex flex-col justify-between">
      <div class="text-2xl sm:text-3xl font-extrabold text-[#1B4E2B] font-heading" contenteditable="true">$653B</div>
      <div class="text-xs text-slate-700 font-semibold mt-1" contenteditable="true">Ingresos Anuales Generados <span class="block text-[10px] text-slate-500 font-bold uppercase mt-0.5">Brookings 2025</span></div>
    </div>
    <div class="bg-[#F2F7F4] border border-[#1B4E2B]/10 rounded-xl p-4 flex flex-col justify-between">
      <div class="text-2xl sm:text-3xl font-extrabold text-[#1B4E2B] font-heading" contenteditable="true">3.5M</div>
      <div class="text-xs text-slate-700 font-semibold mt-1" contenteditable="true">Empleos Respaldados en EE.UU. <span class="block text-[10px] text-slate-500 font-bold uppercase mt-0.5">Stanford SLEI</span></div>
    </div>
    <div class="bg-[#F2F7F4] border border-[#1B4E2B]/10 rounded-xl p-4 flex flex-col justify-between">
      <div class="text-2xl sm:text-3xl font-extrabold text-[#1B4E2B] font-heading" contenteditable="true">1 in 4</div>
      <div class="text-xs text-slate-700 font-semibold mt-1" contenteditable="true">Nuevos Negocios es Latino <span class="block text-[10px] text-slate-500 font-bold uppercase mt-0.5">Census Bureau</span></div>
    </div>
  </div>
</section>
  `,

  barriers: `
<section class="builder-block bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-8">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-[#F2F7F4] px-3 py-1 rounded-full">Diagnóstico Estratégico</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-2 font-heading" contenteditable="true">Cada Barrera Tiene una Solución en Guia Negocios</h2>
    <p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed" contenteditable="true">Eliminamos los obstáculos fiscales y burocráticos para que su empresa crezca sobre bases sólidas.</p>
  </div>
  <div class="max-w-4xl mx-auto space-y-3">
    <div class="grid grid-cols-1 md:grid-cols-[1fr,32px,1fr] gap-3 items-center">
      <div class="bg-[#fef2f2] border border-[#fecaca] p-4 rounded-xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#fee2e2] text-[#D92D3C] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <div class="font-bold text-xs sm:text-sm text-slate-900" contenteditable="true">Alta tasa de fracaso por falta de planificación</div>
      </div>
      <div class="hidden md:flex justify-center text-[#1B4E2B]">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </div>
      <div class="bg-[#F2F7F4] border border-[#1B4E2B]/20 p-4 rounded-xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#1B4E2B] text-white flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="font-bold text-xs sm:text-sm text-[#1A2E35]" contenteditable="true">Te lanzamos con plan de negocio y blindaje legal</div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-[1fr,32px,1fr] gap-3 items-center">
      <div class="bg-[#fef2f2] border border-[#fecaca] p-4 rounded-xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#fee2e2] text-[#D92D3C] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <div class="font-bold text-xs sm:text-sm text-slate-900" contenteditable="true">Sin crédito comercial ni acceso a préstamos SBA</div>
      </div>
      <div class="hidden md:flex justify-center text-[#1B4E2B]">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </div>
      <div class="bg-[#F2F7F4] border border-[#1B4E2B]/20 p-4 rounded-xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#1B4E2B] text-white flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="font-bold text-xs sm:text-sm text-[#1A2E35]" contenteditable="true">Te preparamos para calificar ante la banca comercial</div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-[1fr,32px,1fr] gap-3 items-center">
      <div class="bg-[#fef2f2] border border-[#fecaca] p-4 rounded-xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#fee2e2] text-[#D92D3C] flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <div class="font-bold text-xs sm:text-sm text-slate-900" contenteditable="true">Bancos e instituciones que no hablan español</div>
      </div>
      <div class="hidden md:flex justify-center text-[#1B4E2B]">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </div>
      <div class="bg-[#F2F7F4] border border-[#1B4E2B]/20 p-4 rounded-xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#1B4E2B] text-white flex items-center justify-center shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <div class="font-bold text-xs sm:text-sm text-[#1A2E35]" contenteditable="true">Equipo de consultores 100% bilingüe a tu lado</div>
      </div>
    </div>
  </div>
</section>
  `,

  split: `
<section class="builder-block bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-8">
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] font-heading" contenteditable="true">
      Deja de Pagar tu Negocio con <span class="relative text-[#1B4E2B] whitespace-nowrap">tu Dinero Personal<svg class="absolute -bottom-2 left-0 w-full h-3 text-[#F0C850]" viewBox="0 0 200 14" preserveAspectRatio="none" fill="none"><path d="M3 10 Q 100 0 197 8" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg></span>
    </h2>
    <p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-3 leading-relaxed" contenteditable="true">
      Mezclarlos es la forma #1 en que los nuevos negocios se estancan a la hora de impuestos y pierden su protección legal.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[1fr,40px,1fr] gap-4 items-center max-w-4xl mx-auto">
    <div class="bg-[#fef2f2] border-2 border-[#fecaca] p-6 rounded-2xl flex flex-col justify-between h-full">
      <div>
        <div class="inline-block px-3 py-1 bg-[#D92D3C] text-white text-xs font-extrabold rounded-full uppercase tracking-wider mb-4">Mezclado (Riesgo)</div>
        <h3 class="text-base font-bold text-[#9A1724] mb-4" contenteditable="true">Una sola cuenta, todo enredado</h3>
        <ul class="space-y-2.5 text-xs text-slate-700">
          <li class="flex items-start gap-2"><svg class="w-4 h-4 text-[#D92D3C] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg><span contenteditable="true">Tu escudo de LLC puede anularse en la corte</span></li>
          <li class="flex items-start gap-2"><svg class="w-4 h-4 text-[#D92D3C] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg><span contenteditable="true">Acreedores pueden ir tras tu casa y tus ahorros</span></li>
          <li class="flex items-start gap-2"><svg class="w-4 h-4 text-[#D92D3C] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg><span contenteditable="true">Alerta de auditoría del IRS — deducciones rechazadas</span></li>
        </ul>
      </div>
    </div>
    <div class="hidden md:flex justify-center text-[#F0C850]">
      <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
    </div>
    <div class="bg-[#F2F7F4] border-2 border-[#1B4E2B]/30 p-6 rounded-2xl flex flex-col justify-between h-full">
      <div>
        <div class="inline-block px-3 py-1 bg-[#1B4E2B] text-white text-xs font-extrabold rounded-full uppercase tracking-wider mb-4">Separado (Protegido)</div>
        <h3 class="text-base font-bold text-[#1A2E35] mb-4" contenteditable="true">Dinero del negocio aparte de lo personal</h3>
        <ul class="space-y-2.5 text-xs text-slate-700">
          <li class="flex items-start gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Tu protección de LLC se mantiene intacta en corte</span></li>
          <li class="flex items-start gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Tu casa y patrimonio quedan totalmente blindados</span></li>
          <li class="flex items-start gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Registros contables limpios que el IRS no cuestiona</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>
  `,

  snakeMap: `
<section class="builder-block bg-[#F2F7F4] p-8 sm:p-12 rounded-2xl border border-[#1B4E2B]/20 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">Ruta Paso a Paso</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-2 font-heading" contenteditable="true">Cómo Empezar su Negocio con Éxito</h2>
    <p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto" contenteditable="true">Siga el mapa de los seis pasos estratégicos para registrar, licenciar y operar.</p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-extrabold flex items-center justify-center mb-2.5 shadow-xs">1</div>
      <span class="text-[10px] font-bold text-[#1B4E2B] uppercase tracking-wider block mb-1">Paso 1 de 6</span>
      <h3 class="text-sm font-bold text-[#1A2E35] mb-1.5" contenteditable="true">Defina su idea y plan</h3>
      <p class="text-xs text-slate-600 leading-relaxed" contenteditable="true">Analice su mercado y defina un modelo de negocio claro para generar ingresos.</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-extrabold flex items-center justify-center mb-2.5 shadow-xs">2</div>
      <span class="text-[10px] font-bold text-[#1B4E2B] uppercase tracking-wider block mb-1">Paso 2 de 6</span>
      <h3 class="text-sm font-bold text-[#1A2E35] mb-1.5" contenteditable="true">Elija su estructura legal</h3>
      <p class="text-xs text-slate-600 leading-relaxed" contenteditable="true">Seleccione LLC o Corporación para proteger sus activos personales y pagar menos impuestos.</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-extrabold flex items-center justify-center mb-2.5 shadow-xs">3</div>
      <span class="text-[10px] font-bold text-[#1B4E2B] uppercase tracking-wider block mb-1">Paso 3 de 6</span>
      <h3 class="text-sm font-bold text-[#1A2E35] mb-1.5" contenteditable="true">Registre ante el Estado</h3>
      <p class="text-xs text-slate-600 leading-relaxed" contenteditable="true">Radique sus Artículos de Organización en la Secretaría de Estado (TN, FL, TX, WY, DE).</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-extrabold flex items-center justify-center mb-2.5 shadow-xs">4</div>
      <span class="text-[10px] font-bold text-[#1B4E2B] uppercase tracking-wider block mb-1">Paso 4 de 6</span>
      <h3 class="text-sm font-bold text-[#1A2E35] mb-1.5" contenteditable="true">Obtenga su EIN del IRS</h3>
      <p class="text-xs text-slate-600 leading-relaxed" contenteditable="true">Tramite su número fiscal de 9 dígitos para abrir cuentas bancarias y contratar.</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-extrabold flex items-center justify-center mb-2.5 shadow-xs">5</div>
      <span class="text-[10px] font-bold text-[#1B4E2B] uppercase tracking-wider block mb-1">Paso 5 de 6</span>
      <h3 class="text-sm font-bold text-[#1A2E35] mb-1.5" contenteditable="true">Licencias y Permisos</h3>
      <p class="text-xs text-slate-600 leading-relaxed" contenteditable="true">Obtenga licencias locales del condado y permisos sanitarios o de contratista.</p>
    </div>
    <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-7 h-7 rounded-full bg-[#1B4E2B] text-white text-xs font-extrabold flex items-center justify-center mb-2.5 shadow-xs">6</div>
      <span class="text-[10px] font-bold text-[#1B4E2B] uppercase tracking-wider block mb-1">Paso 6 de 6</span>
      <h3 class="text-sm font-bold text-[#1A2E35] mb-1.5" contenteditable="true">Abra su cuenta y opere</h3>
      <p class="text-xs text-slate-600 leading-relaxed" contenteditable="true">Abra su cuenta bancaria comercial, configure cobros y comience a facturar.</p>
    </div>
  </div>
</section>
  `,

  pricing: `
<section class="builder-block bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-[#F2F7F4] px-3 py-1 rounded-full">Planes Transparentes</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-2 font-heading" contenteditable="true">Elija el Paquete Ideal para su Negocio</h2>
    <p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto" contenteditable="true">Precios claros sin tarifas ocultas. Asesoría completa en español.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <div class="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <h3 class="text-xl font-bold text-[#1A2E35] mb-2" contenteditable="true">Paquete Básico de Lanzamiento</h3>
        <p class="text-xs text-slate-500 mb-4" contenteditable="true">Ideal para emprendedores y trabajadores independientes.</p>
        <div class="text-3xl font-extrabold text-[#1A2E35] mb-6" contenteditable="true">$499 <span class="text-xs font-normal text-slate-500">+ tasas estatales</span></div>
        <ul class="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Registro de LLC en el Estado</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Obtención de Número EIN Oficial del IRS</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Modelo de Operating Agreement</span></li>
        </ul>
      </div>
      <a href="#contacto" class="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center transition-colors block text-sm" contenteditable="true">Elegir Paquete Básico</a>
    </div>
    <div class="p-6 sm:p-8 rounded-2xl bg-[#1A2E35] text-white border-2 border-[#F0C850] shadow-xl relative flex flex-col justify-between">
      <div class="absolute -top-3 right-6 px-3 py-1 bg-[#F0C850] text-slate-900 font-extrabold text-xs rounded-full uppercase tracking-wider shadow-sm">Más Popular</div>
      <div>
        <h3 class="text-xl font-bold text-white mb-2" contenteditable="true">Paquete Completo & Blindaje Total</h3>
        <p class="text-xs text-slate-300 mb-4" contenteditable="true">Para empresas en crecimiento que buscan protección total.</p>
        <div class="text-3xl font-extrabold text-[#F0C850] mb-6" contenteditable="true">$899 <span class="text-xs font-normal text-slate-400">+ tasas estatales</span></div>
        <ul class="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Todo lo del Paquete Básico</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Registro de Licencias Comerciales Locales</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Reporte Inicial FinCEN BOI Obligatorio</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Asesoría 1 a 1 de 60 Minutos con Consultor Senior</span></li>
        </ul>
      </div>
      <a href="#contacto" class="w-full py-3 px-4 bg-[#F0C850] hover:bg-amber-400 text-slate-900 font-extrabold rounded-xl text-center transition-all shadow-md block text-sm" contenteditable="true">Comenzar Paquete Completo</a>
    </div>
  </div>
</section>
  `,

  testimonials: `
<section class="builder-block bg-[#F2F7F4] p-8 sm:p-12 rounded-2xl border border-[#1B4E2B]/20 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">Casos de Éxito</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-2 font-heading" contenteditable="true">Emprendedores que Confiaron en Nosotros</h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div class="flex text-[#F0C850] mb-3">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
      </div>
      <p class="text-xs sm:text-sm text-slate-700 italic mb-4 leading-relaxed" contenteditable="true">"Guia Negocios me ayudó a registrar mi empresa de remodelación y obtener el EIN en tiempo récord. Su asesoría en español me dio total seguridad."</p>
      <div class="flex items-center gap-3">
        <img src="/images/team-avatar.webp" class="w-10 h-10 rounded-full border border-slate-200 object-cover" alt="Client Avatar"/>
        <div>
          <h4 class="font-bold text-sm text-[#1A2E35]" contenteditable="true">Carlos Mendoza</h4>
          <span class="text-xs text-slate-500" contenteditable="true">Propietario, Apex Remodeling LLC</span>
        </div>
      </div>
    </div>
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <div class="flex text-[#F0C850] mb-3">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
      </div>
      <p class="text-xs sm:text-sm text-slate-700 italic mb-4 leading-relaxed" contenteditable="true">"Como extranjero no residente, pensé que era imposible abrir una LLC en EE.UU. sin viajar. Guia Negocios hizo todo el proceso 100% online y transparente."</p>
      <div class="flex items-center gap-3">
        <img src="/images/team-avatar.webp" class="w-10 h-10 rounded-full border border-slate-200 object-cover" alt="Client Avatar"/>
        <div>
          <h4 class="font-bold text-sm text-[#1A2E35]" contenteditable="true">Valeria Gómez</h4>
          <span class="text-xs text-slate-500" contenteditable="true">Fundadora, Global Trade LLC</span>
        </div>
      </div>
    </div>
  </div>
</section>
  `,

  faq: `
<section class="builder-block bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-[#F2F7F4] px-3 py-1 rounded-full">Preguntas Frecuentes</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-2 font-heading" contenteditable="true">Resolvemos Todas sus Dudas</h2>
  </div>
  <div class="max-w-3xl mx-auto space-y-3.5">
    <div class="p-5 rounded-xl bg-[#F2F7F4] border border-[#1B4E2B]/10">
      <h3 class="text-base font-bold text-[#1A2E35] mb-2" contenteditable="true">¿Puedo registrar una empresa si no tengo Número de Seguro Social (SSN)?</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Sí. Puede registrar una LLC y obtener un número EIN oficial ante el IRS utilizando su pasaporte extranjero o número ITIN, sin importar su estatus migratorio.</p>
    </div>
    <div class="p-5 rounded-xl bg-[#F2F7F4] border border-[#1B4E2B]/10">
      <h3 class="text-base font-bold text-[#1A2E35] mb-2" contenteditable="true">¿Cuánto tiempo tarda todo el trámite de registro y EIN?</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">El registro de la LLC en el estado toma usualmente entre 24 y 48 horas hábiles. La tramitación del EIN puede ser inmediata con SSN/ITIN o de 4 a 7 días hábiles para extranjeros sin SSN.</p>
    </div>
    <div class="p-5 rounded-xl bg-[#F2F7F4] border border-[#1B4E2B]/10">
      <h3 class="text-base font-bold text-[#1A2E35] mb-2" contenteditable="true">¿La atención y todos los documentos son 100% en español?</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Absolutamente. Todo nuestro equipo de consultores es bilingüe y le explicamos cada cláusula, impuesto y requisito legal de manera clara en su idioma.</p>
    </div>
  </div>
</section>
  `,

  cta: `
<section id="contacto" class="builder-block bg-[#1A2E35] text-white p-8 sm:p-12 rounded-2xl shadow-xl my-4 border border-slate-700 font-sans relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-r from-[#1B4E2B]/60 via-[#1A2E35] to-[#1A2E35] pointer-events-none"></div>
  <div class="relative max-w-4xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] text-xs font-bold uppercase tracking-wider mb-4 border border-[#F0C850]/30">
      <span class="w-2 h-2 rounded-full bg-[#F0C850]"></span>
      <span contenteditable="true">Primer Paso Hacia su Éxito</span>
    </div>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-3 font-heading" contenteditable="true">¿Listo para Formalizar y Hacer Crecer su Empresa?</h2>
    <p class="text-xs sm:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed" contenteditable="true">Hable hoy mismo con un asesor bilingüe y reciba una evaluación estratégica de su proyecto sin costo.</p>
    
    <div class="bg-white p-6 sm:p-8 rounded-2xl text-slate-900 shadow-2xl max-w-xl mx-auto text-left mb-8">
      <h3 class="text-base font-bold text-[#1A2E35] mb-4 text-center" contenteditable="true">Solicite su Consulta Gratuita</h3>
      <form class="space-y-3.5" onsubmit="event.preventDefault(); alert('¡Gracias por su mensaje! Un consultor bilingüe de Guia Negocios se comunicará con usted en menos de 24 horas.');">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
          <input type="text" placeholder="Ej. Juan Pérez" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
            <input type="tel" placeholder="(865) 000-0000" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
            <input type="email" placeholder="correo@ejemplo.com" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Tipo de Negocio / Servicio</label>
          <input type="text" placeholder="Ej. Construcción, Food Truck, Consultoría, etc." class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
        </div>
        <button type="submit" class="w-full py-3.5 bg-[#1B4E2B] hover:bg-emerald-900 text-white font-extrabold rounded-xl shadow-md transition-all text-xs uppercase tracking-wider mt-2">
          Enviar y Recibir Asesoría
        </button>
      </form>
    </div>

    <!-- Contact Row Band -->
    <div class="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-xs text-slate-300">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <div><span class="block text-[10px] text-slate-400 uppercase font-bold">Teléfono</span><a href="tel:8652027112" class="font-bold text-white hover:text-[#F0C850]">(865) 202-7112</a></div>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <div><span class="block text-[10px] text-slate-400 uppercase font-bold">Correo</span><a href="mailto:info@guianegocios.net" class="font-bold text-white hover:text-[#F0C850]">info@guianegocios.net</a></div>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
        <div><span class="block text-[10px] text-slate-400 uppercase font-bold">Sitio Web</span><span class="font-bold text-white">guianegocios.net</span></div>
      </div>
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <div><span class="block text-[10px] text-slate-400 uppercase font-bold">Ubicación</span><span class="font-bold text-white">Knoxville, TN · Lun-Vie 9-5</span></div>
      </div>
    </div>
  </div>
</section>
  `
};
