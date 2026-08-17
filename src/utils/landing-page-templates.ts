/**
 * Guia Negocios Customized Website Design Elements for Landing Pages
 * Matches src/pages/es/index.astro, services.astro, and faq.astro exactly.
 */

export const LANDING_PAGE_TEMPLATES = {
  hero: `
<div class="builder-block bg-slate-50/80 border border-slate-200 rounded-3xl p-10 sm:p-14 text-center my-6 shadow-sm font-sans relative">
  <div class="max-w-3xl mx-auto space-y-6">
    <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 border border-slate-300/60 text-slate-700 text-xs font-semibold tracking-wide">
      <span class="w-2 h-2 rounded-full bg-brand-primary"></span>
      <span contenteditable="true">Servicios Empresariales Bilingües</span>
    </span>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight tracking-tight" contenteditable="true">
      Lleve su Negocio al Siguiente Nivel con Asesoría Profesional
    </h1>
    <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" contenteditable="true">
      Acompañamos a emprendedores y empresas a formalizar su estructura, cumplir con las normativas y acelerar su crecimiento en Estados Unidos.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="#contacto" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-primary text-white font-medium py-3.5 px-8 rounded-full hover:bg-opacity-90 transition-all text-sm shadow-sm" contenteditable="true">
        Solicitar Consulta Gratuita
      </a>
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-slate-200 text-slate-700 font-medium py-3.5 px-6 rounded-full hover:bg-slate-50 transition-all text-sm gap-2">
        <svg class="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <span contenteditable="true">(865) 202-7112</span>
      </a>
    </div>
  </div>
</div>
  `,

  features: `
<div class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium tracking-wide">
      Nuestros Servicios
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      ¿Por qué elegir a Guia de Negocios?
    </h2>
    <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Soluciones integrales diseñadas específicamente para respaldar y hacer crecer a las empresas hispanas.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-dark shadow-xs">
        <svg class="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      </div>
      <div>
        <h3 class="text-lg font-heading text-slate-900 font-semibold mb-2" contenteditable="true">Blindaje y Registro Legal</h3>
        <p class="text-slate-500 text-xs sm:text-sm leading-relaxed" contenteditable="true">Registro formal de LLC, obtención de EIN oficial ante el IRS y estructuración para proteger su patrimonio personal.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-dark shadow-xs">
        <svg class="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
      </div>
      <div>
        <h3 class="text-lg font-heading text-slate-900 font-semibold mb-2" contenteditable="true">Planes y Estrategia</h3>
        <p class="text-slate-500 text-xs sm:text-sm leading-relaxed" contenteditable="true">Planes de negocio profesionales diseñados para calificar ante bancos, inversionistas y préstamos de la SBA.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-dark shadow-xs">
        <svg class="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
      </div>
      <div>
        <h3 class="text-lg font-heading text-slate-900 font-semibold mb-2" contenteditable="true">Atención 100% Bilingüe</h3>
        <p class="text-slate-500 text-xs sm:text-sm leading-relaxed" contenteditable="true">Consultores bilingües que le explican cada trámite, contrato y requisito legal de manera clara en su idioma.</p>
      </div>
    </div>
  </div>
</div>
  `,

  process: `
<div class="builder-block bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 border border-slate-300/60 text-slate-700 text-xs font-semibold tracking-wide">
      Nuestro Proceso
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      Cómo trabajamos juntos
    </h2>
    <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Un enfoque transparente y guiado para hacer realidad la visión de su negocio paso a paso.
    </p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-brand-primary/50 transition-colors">
      <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center ring-4 ring-slate-50">01</div>
      <div>
        <h3 class="text-base font-heading font-semibold text-slate-900 mb-1" contenteditable="true">Consulta</h3>
        <p class="text-slate-500 text-xs leading-relaxed" contenteditable="true">Conocemos sus metas, evaluamos su situación y definimos un plan claro.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-brand-primary/50 transition-colors">
      <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center ring-4 ring-slate-50">02</div>
      <div>
        <h3 class="text-base font-heading font-semibold text-slate-900 mb-1" contenteditable="true">Planificación</h3>
        <p class="text-slate-500 text-xs leading-relaxed" contenteditable="true">Definimos su estructura empresarial, requisitos de licencias y estrategia fiscal.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-brand-primary/50 transition-colors">
      <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center ring-4 ring-slate-50">03</div>
      <div>
        <h3 class="text-base font-heading font-semibold text-slate-900 mb-1" contenteditable="true">Configuración</h3>
        <p class="text-slate-500 text-xs leading-relaxed" contenteditable="true">Radicamos su LLC en el estado y tramitamos el EIN oficial ante el IRS.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-brand-primary/50 transition-colors">
      <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center ring-4 ring-slate-50">04</div>
      <div>
        <h3 class="text-base font-heading font-semibold text-slate-900 mb-1" contenteditable="true">Operación</h3>
        <p class="text-slate-500 text-xs leading-relaxed" contenteditable="true">Le entregamos su carpeta corporativa para abrir su cuenta bancaria y comenzar a facturar.</p>
      </div>
    </div>
  </div>
</div>
  `,

  pricing: `
<div class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium tracking-wide">
      Paquetes de Servicios
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      Precios claros y sin sorpresas
    </h2>
    <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Seleccione el paquete que mejor se adapte a la etapa actual de su negocio.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <div class="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between space-y-6">
      <div>
        <h3 class="text-xl font-heading font-semibold text-slate-900 mb-2" contenteditable="true">Paquete Esencial</h3>
        <p class="text-xs text-slate-500 mb-4" contenteditable="true">Ideal para contratistas independientes y nuevos emprendimientos.</p>
        <div class="text-3xl font-bold font-heading text-slate-900 mb-6" contenteditable="true">$499 <span class="text-xs font-normal text-slate-500">+ tarifas estatales</span></div>
        <ul class="space-y-3 text-xs sm:text-sm text-slate-600">
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Registro de LLC en el Estado</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Obtención de Número EIN Oficial del IRS</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Plantilla de Operating Agreement</span></li>
        </ul>
      </div>
      <a href="#contacto" class="w-full py-3 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-full text-center text-xs transition-colors block" contenteditable="true">Seleccionar Esencial</a>
    </div>

    <div class="bg-white border-2 border-brand-primary rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-md relative">
      <div class="absolute -top-3 right-8 px-3 py-1 bg-brand-primary text-white text-[11px] font-semibold rounded-full uppercase tracking-wider">Recomendado</div>
      <div>
        <h3 class="text-xl font-heading font-semibold text-slate-900 mb-2" contenteditable="true">Paquete Completo de Lanzamiento</h3>
        <p class="text-xs text-slate-500 mb-4" contenteditable="true">Solución integral con acompañamiento y blindaje corporativo.</p>
        <div class="text-3xl font-bold font-heading text-slate-900 mb-6" contenteditable="true">$899 <span class="text-xs font-normal text-slate-500">+ tarifas estatales</span></div>
        <ul class="space-y-3 text-xs sm:text-sm text-slate-600">
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Todo lo incluido en el Paquete Esencial</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Registro de Licencias Comerciales Locales</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Reporte Inicial FinCEN BOI Obligatorio</span></li>
          <li class="flex items-center gap-2"><svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span contenteditable="true">Sesión de Asesoría 1 a 1 de 60 Minutos</span></li>
        </ul>
      </div>
      <a href="#contacto" class="w-full py-3.5 px-6 bg-brand-primary hover:bg-opacity-90 text-white font-medium rounded-full text-center text-xs transition-colors block shadow-sm" contenteditable="true">Comenzar Ahora</a>
    </div>
  </div>
</div>
  `,

  testimonials: `
<div class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium tracking-wide">
      Testimonios de Clientes
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      Lo que nuestros clientes dicen
    </h2>
    <p class="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Historias reales de empresarios que han lanzado y formalizado sus negocios con nuestra guía.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
    <div class="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xs">
      <div class="space-y-3">
        <div class="flex items-center gap-1 text-amber-400">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        </div>
        <p class="text-slate-600 text-xs sm:text-sm leading-relaxed italic" contenteditable="true">
          "Guía Negocios nos ayudó con cada detalle de la apertura de nuestro negocio de construcción. Su atención bilingüe y asesoría hicieron todo el proceso claro y sin estrés."
        </p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-200/60">
        <div class="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-800 font-bold text-xs">SM</div>
        <div>
          <h4 class="text-xs sm:text-sm font-heading font-semibold text-slate-900" contenteditable="true">Sylvia M.</h4>
          <p class="text-[11px] text-slate-500" contenteditable="true">Rocs Construction — Knoxville TN</p>
        </div>
      </div>
    </div>

    <div class="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-xs">
      <div class="space-y-3">
        <div class="flex items-center gap-1 text-amber-400">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        </div>
        <p class="text-slate-600 text-xs sm:text-sm leading-relaxed italic" contenteditable="true">
          "Excelente profesionalismo. Nos ayudaron con el registro y la apertura de cuenta comercial en menos de una semana. Totalmente recomendados."
        </p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-200/60">
        <div class="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-800 font-bold text-xs">CR</div>
        <div>
          <h4 class="text-xs sm:text-sm font-heading font-semibold text-slate-900" contenteditable="true">Carlos R.</h4>
          <p class="text-[11px] text-slate-500" contenteditable="true">CleanPro Services — Maryville TN</p>
        </div>
      </div>
    </div>
  </div>
</div>
  `,

  faq: `
<div class="builder-block bg-slate-50/60 p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-10 space-y-3">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 border border-slate-300/60 text-slate-700 text-xs font-semibold tracking-wide">
      Preguntas Frecuentes
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      Resolvemos sus dudas
    </h2>
  </div>
  <div class="max-w-3xl mx-auto space-y-4">
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
      <h3 class="font-heading font-semibold text-slate-900 text-base sm:text-lg mb-2" contenteditable="true">
        ¿Puedo registrar una empresa si no tengo Número de Seguro Social (SSN)?
      </h3>
      <p class="text-slate-600 text-xs sm:text-sm leading-relaxed" contenteditable="true">
        Sí. Puede registrar una LLC y tramitar un número EIN oficial ante el IRS con su pasaporte extranjero o ITIN, sin importar su estatus migratorio.
      </p>
    </div>
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
      <h3 class="font-heading font-semibold text-slate-900 text-base sm:text-lg mb-2" contenteditable="true">
        ¿Cuánto tiempo tarda el registro y la obtención del EIN?
      </h3>
      <p class="text-slate-600 text-xs sm:text-sm leading-relaxed" contenteditable="true">
        El registro estatal toma entre 24 y 48 horas hábiles. Con SSN/ITIN el EIN es inmediato; para solicitantes con pasaporte extranjero toma entre 4 y 7 días hábiles vía fax oficial.
      </p>
    </div>
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
      <h3 class="font-heading font-semibold text-slate-900 text-base sm:text-lg mb-2" contenteditable="true">
        ¿La atención es totalmente en español?
      </h3>
      <p class="text-slate-600 text-xs sm:text-sm leading-relaxed" contenteditable="true">
        Sí. Todo nuestro equipo es 100% bilingüe y le explicamos cada documento, cláusula y trámite de forma clara y directa en español.
      </p>
    </div>
  </div>
</div>
  `,

  cta: `
<div id="contacto" class="builder-block bg-brand-dark text-white p-8 sm:p-14 rounded-3xl text-center shadow-lg my-6 font-sans relative">
  <div class="max-w-3xl mx-auto space-y-6">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-white leading-tight" contenteditable="true">
      ¿Listo para dar el siguiente paso con su negocio?
    </h2>
    <p class="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Hable hoy con uno de nuestros consultores bilingües y reciba orientación personalizada para su proyecto.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-dark font-semibold py-3.5 px-8 rounded-full hover:bg-slate-100 transition-colors text-sm shadow-sm" contenteditable="true">
        Llamar al (865) 202-7112
      </a>
      <a href="mailto:info@guianegocios.net" class="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-8 rounded-full border border-white/20 transition-colors text-sm" contenteditable="true">
        Enviar Mensaje
      </a>
    </div>
  </div>
</div>
  `
};
