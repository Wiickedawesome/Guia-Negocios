/**
 * High-Converting Landing Page Design System & Section Templates for GUIA DE NEGOCIOS
 * 
 * Uses exact brand tokens:
 * - Brand Dark: #1A2E35 (Slate Charcoal)
 * - Brand Primary: #1B4E2B (Deep Forest Green)
 * - Brand Accent: #F0C850 (Golden Amber)
 * - Brand Light: #F2F7F4 (Mint Cream)
 * - Danger / Warning: #D92D3C (Crimson Red)
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
<section class="builder-block relative bg-[#1A2E35] text-white py-16 px-6 sm:px-10 rounded-2xl shadow-xl overflow-hidden my-4 border border-slate-700">
  <div class="absolute inset-0 bg-gradient-to-br from-[#1A2E35] via-[#1B4E2B]/40 to-[#1A2E35] pointer-events-none"></div>
  <div class="relative max-w-4xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] text-xs font-bold uppercase tracking-wider mb-6 border border-[#F0C850]/30 shadow-xs">
      <span class="w-2 h-2 rounded-full bg-[#F0C850] animate-pulse"></span>
      <span contenteditable="true">Asesoría Empresarial 100% en Español</span>
    </div>
    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight font-heading" contenteditable="true">
      Lleve su Negocio al Siguiente Nivel con <span class="text-[#F0C850]">Estructura Legal y Financiera</span>
    </h1>
    <p class="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed" contenteditable="true">
      Registre su empresa en EE.UU., obtenga su número EIN ante el IRS y blindaje sus activos personales sin complicaciones legales ni barreras de idioma.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
      <a href="#contacto" class="w-full sm:w-auto px-8 py-4 bg-[#F0C850] hover:bg-amber-400 text-slate-900 font-extrabold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-center text-base" contenteditable="true">
        Agendar Consulta Gratuita
      </a>
      <a href="tel:8652027112" class="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-center text-base flex items-center justify-center gap-2">
        <svg class="w-5 h-5 text-[#F0C850]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span contenteditable="true">Llamar: (865) 202-7112</span>
      </a>
    </div>
    <div class="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div><div class="text-2xl font-bold text-[#F0C850]">5M+</div><div class="text-xs text-slate-400">Empresas Hispanas</div></div>
      <div><div class="text-2xl font-bold text-white">100%</div><div class="text-xs text-slate-400">En Español</div></div>
      <div><div class="text-2xl font-bold text-emerald-400">48h</div><div class="text-xs text-slate-400">Trámite Rápido</div></div>
      <div><div class="text-2xl font-bold text-white">Sin SSN</div><div class="text-xs text-slate-400">Aplica con Pasaporte</div></div>
    </div>
  </div>
</section>
  `,

  features: `
<section class="builder-block bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-[#F2F7F4] px-3 py-1 rounded-full">Beneficios Exclusivos</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-4 font-heading" contenteditable="true">¿Por Qué los Empresarios Hispanos Eligen Guia Negocios?</h2>
    <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed" contenteditable="true">Le acompañamos paso a paso para que su empresa opere con total respaldo legal, tranquilidad fiscal y acceso a crédito bancario.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <div class="p-6 rounded-xl bg-[#F2F7F4] border border-[#1B4E2B]/10 hover:border-[#1B4E2B]/30 transition-all shadow-xs">
      <div class="w-12 h-12 rounded-xl bg-[#1B4E2B] text-white flex items-center justify-center mb-4 shadow-xs">
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      </div>
      <h3 class="text-lg font-bold text-[#1A2E35] mb-2" contenteditable="true">Blindaje de Patrimonio</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Separamos sus activos personales de los comerciales para proteger su casa, vehículos y ahorros familiares ante demandas.</p>
    </div>
    <div class="p-6 rounded-xl bg-[#F2F7F4] border border-[#1B4E2B]/10 hover:border-[#1B4E2B]/30 transition-all shadow-xs">
      <div class="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center mb-4 shadow-xs">
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
      </div>
      <h3 class="text-lg font-bold text-[#1A2E35] mb-2" contenteditable="true">EIN & Cuentas Bancarias</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Tramitamos su EIN oficial ante el IRS (incluso sin SSN) y le guiamos para abrir su cuenta bancaria comercial en EE.UU.</p>
    </div>
    <div class="p-6 rounded-xl bg-[#F2F7F4] border border-[#1B4E2B]/10 hover:border-[#1B4E2B]/30 transition-all shadow-xs">
      <div class="w-12 h-12 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center mb-4 shadow-xs">
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
      </div>
      <h3 class="text-lg font-bold text-[#1A2E35] mb-2" contenteditable="true">Optimización de Impuestos</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Aproveche deducciones legales de pequeños negocios para retener más ganancias y evitar sanciones costosas del IRS.</p>
    </div>
  </div>
</section>
  `,

  process: `
<section class="builder-block bg-[#F2F7F4] p-8 sm:p-12 rounded-2xl border border-[#1B4E2B]/20 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">Proceso Simplificado</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-4 font-heading" contenteditable="true">3 Pasos Fáciles para Lanzar su Empresa</h2>
    <p class="text-sm sm:text-base text-slate-600 max-w-xl mx-auto" contenteditable="true">Nosotros nos encargamos de los trámites y el papeleo para que usted se enfoque en vender.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-8 h-8 rounded-full bg-[#1B4E2B] text-white text-sm font-extrabold flex items-center justify-center mb-3">1</div>
      <h3 class="text-base font-bold text-[#1A2E35] mb-2" contenteditable="true">Consulta & Estrategia</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Evaluamos su modelo de negocio, elegimos el estado óptimo (TN, FL, TX, WY, DE) y definimos su estructura legal.</p>
    </div>
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-8 h-8 rounded-full bg-[#2563EB] text-white text-sm font-extrabold flex items-center justify-center mb-3">2</div>
      <h3 class="text-base font-bold text-[#1A2E35] mb-2" contenteditable="true">Registro Oficial & EIN</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Radicamos sus Artículos de Organización y obtenemos su Número de Identificación de Empleador (EIN) ante el IRS.</p>
    </div>
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative">
      <div class="w-8 h-8 rounded-full bg-[#7C3AED] text-white text-sm font-extrabold flex items-center justify-center mb-3">3</div>
      <h3 class="text-base font-bold text-[#1A2E35] mb-2" contenteditable="true">Banca & Operación Lista</h3>
      <p class="text-xs sm:text-sm text-slate-600 leading-relaxed" contenteditable="true">Le entregamos su carpeta corporativa completa para abrir cuentas bancarias y comenzar a firmar contratos comerciales.</p>
    </div>
  </div>
</section>
  `,

  pricing: `
<section class="builder-block bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm my-4 font-sans">
  <div class="max-w-4xl mx-auto text-center mb-10">
    <span class="text-xs font-bold text-[#1B4E2B] uppercase tracking-wider bg-[#F2F7F4] px-3 py-1 rounded-full">Planes Transparentes</span>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-4 font-heading" contenteditable="true">Elija el Paquete Ideal para su Negocio</h2>
    <p class="text-sm sm:text-base text-slate-600 max-w-xl mx-auto" contenteditable="true">Precios claros sin tarifas ocultas. Asesoría completa en español.</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <!-- Basic Tier -->
    <div class="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <h3 class="text-xl font-bold text-[#1A2E35] mb-2" contenteditable="true">Paquete Básico de Lanzamiento</h3>
        <p class="text-xs text-slate-500 mb-4" contenteditable="true">Ideal para emprendedores y trabajadores independientes.</p>
        <div class="text-3xl font-extrabold text-[#1A2E35] mb-6" contenteditable="true">$499 <span class="text-xs font-normal text-slate-500">+ tasas estatales</span></div>
        <ul class="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Registro de LLC en el Estado</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Obtención de Número EIN Oficial del IRS</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Modelo de Operating Agreement (Acuerdo Operativo)</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Guía de Apertura de Cuenta Bancaria</span></li>
        </ul>
      </div>
      <a href="#contacto" class="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center transition-colors block text-sm" contenteditable="true">Elegir Paquete Básico</a>
    </div>
    <!-- Complete Tier (Highlighted) -->
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
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Asesoría de 60 Minutos 1 a 1 con Consultor Senior</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-[#F0C850] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Configuración de Facturación y Bookkeeping</span></li>
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
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-4 font-heading" contenteditable="true">Emprendedores que Confiaron en Nosotros</h2>
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
      <p class="text-xs sm:text-sm text-slate-700 italic mb-4 leading-relaxed" contenteditable="true">"Guia Negocios me ayudó a registrar mi empresa de remodelación y obtener el EIN en tiempo récord. Su asesoría en español me dio total seguridad para firmar contratos grandes."</p>
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
      <p class="text-xs sm:text-sm text-slate-700 italic mb-4 leading-relaxed" contenteditable="true">"Como extranjera no residente, pensé que era imposible abrir una LLC en EE.UU. sin viajar. Guia Negocios hizo todo el proceso 100% online y transparente."</p>
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
    <h2 class="text-2xl sm:text-4xl font-extrabold text-[#1A2E35] mt-3 mb-4 font-heading" contenteditable="true">Resolvemos Todas sus Dudas</h2>
  </div>
  <div class="max-w-3xl mx-auto space-y-4">
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
  <div class="absolute inset-0 bg-gradient-to-r from-[#1B4E2B]/60 to-[#1A2E35] pointer-events-none"></div>
  <div class="relative max-w-3xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] text-xs font-bold uppercase tracking-wider mb-4 border border-[#F0C850]/30">
      <span class="w-2 h-2 rounded-full bg-[#F0C850]"></span>
      <span contenteditable="true">Primer Paso Hacia su Éxito</span>
    </div>
    <h2 class="text-2xl sm:text-4xl font-extrabold text-white mb-4 font-heading" contenteditable="true">¿Listo para Formalizar y Hacer Crecer su Empresa?</h2>
    <p class="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed" contenteditable="true">Hable hoy mismo con un asesor bilingüe y reciba una evaluación estratégica de su proyecto sin costo.</p>
    
    <div class="bg-white p-6 sm:p-8 rounded-2xl text-slate-900 shadow-2xl max-w-xl mx-auto text-left">
      <h3 class="text-lg font-bold text-[#1A2E35] mb-4 text-center" contenteditable="true">Solicite su Consulta Gratuita</h3>
      <form class="space-y-3.5" onsubmit="event.preventDefault(); alert('¡Gracias por su mensaje! Un consultor bilingüe de Guia Negocios se comunicará con usted en menos de 24 horas.');">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
          <input type="text" placeholder="Ej. Juan Pérez" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
            <input type="tel" placeholder="(865) 000-0000" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
            <input type="email" placeholder="correo@ejemplo.com" required class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">Tipo de Negocio / Servicio</label>
          <input type="text" placeholder="Ej. Construcción, Food Truck, Consultoría, etc." class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1B4E2B] focus:bg-white transition-all" />
        </div>
        <button type="submit" class="w-full py-3.5 bg-[#1B4E2B] hover:bg-emerald-900 text-white font-extrabold rounded-xl shadow-md transition-all text-sm uppercase tracking-wider mt-2">
          Enviar y Recibir Asesoría
        </button>
      </form>
    </div>
  </div>
</section>
  `
};
