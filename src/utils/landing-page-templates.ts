/**
 * Guia Negocios Website Design Elements for Landing Pages
 * Matches src/components/FaqAccordion.astro, services.astro, and index.astro exactly.
 */

export const LANDING_PAGE_TEMPLATES = {
  hero: `
<div class="builder-block bg-slate-50/80 border border-slate-200 rounded-3xl p-8 sm:p-14 text-center my-6 shadow-xs font-sans relative">
  <div class="max-w-3xl mx-auto space-y-5">
    <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 border border-slate-300/60 text-slate-700 text-xs font-semibold tracking-wide">
      <span class="w-2 h-2 rounded-full bg-brand-primary"></span>
      <span contenteditable="true">Servicios Empresariales Bilingües</span>
    </span>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight tracking-tight" contenteditable="true">
      Lleve su Negocio al Siguiente Nivel con Asesoría Profesional
    </h1>
    <p class="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed" contenteditable="true">
      Acompañamos a emprendedores y empresas a formalizar su estructura, cumplir con las normativas y acelerar su crecimiento en Estados Unidos.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-primary text-white font-medium py-3.5 px-8 rounded-full hover:bg-opacity-90 transition-all text-sm shadow-sm" contenteditable="true">
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
<div class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-8 space-y-2">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium tracking-wide">
      Nuestros Beneficios
    </span>
    <h2 class="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      ¿Por qué elegir a Guia de Negocios?
    </h2>
    <p class="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Soluciones integrales diseñadas específicamente para respaldar y hacer crecer a las empresas hispanas.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-3">
      <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-dark shadow-xs">
        <svg class="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      </div>
      <div>
        <h3 class="text-base font-heading text-slate-900 font-semibold mb-1.5" contenteditable="true">Blindaje y Registro Formal</h3>
        <p class="text-slate-500 text-xs sm:text-sm leading-relaxed" contenteditable="true">Registro formal de LLC, obtención de EIN oficial ante el IRS y protección integral de patrimonio.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-3">
      <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-dark shadow-xs">
        <svg class="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
      </div>
      <div>
        <h3 class="text-base font-heading text-slate-900 font-semibold mb-1.5" contenteditable="true">Estrategia y Crecimiento</h3>
        <p class="text-slate-500 text-xs sm:text-sm leading-relaxed" contenteditable="true">Estructura comercial y contable clara para calificar ante bancos y préstamos empresariales.</p>
      </div>
    </div>
    <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-3">
      <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-dark shadow-xs">
        <svg class="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
      </div>
      <div>
        <h3 class="text-base font-heading text-slate-900 font-semibold mb-1.5" contenteditable="true">Atención 100% Bilingüe</h3>
        <p class="text-slate-500 text-xs sm:text-sm leading-relaxed" contenteditable="true">Asesoría cercana en español que le explica cada trámite y contrato con total transparencia.</p>
      </div>
    </div>
  </div>
</div>
  `,

  faq: `
<!-- Standard Website FAQ (FaqAccordion.astro layout) -->
<div class="builder-block bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xs my-6 font-sans">
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
    
    <!-- Left Column: Heading & Contact Link -->
    <div class="lg:col-span-5 space-y-4">
      <h2 class="text-3xl sm:text-4xl font-heading font-semibold text-brand-dark leading-tight" contenteditable="true">
        Preguntas Frecuentes
      </h2>
      <div>
        <a href="/es/contact" class="inline-flex items-center text-brand-primary font-medium hover:underline text-sm sm:text-base gap-2" contenteditable="true">
          Contáctenos para más información <span>→</span>
        </a>
      </div>
    </div>

    <!-- Right Column: Accordion Items -->
    <div class="lg:col-span-7 space-y-4">
      <details class="group border-b border-slate-200 pb-5 transition-all duration-200" open>
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-semibold text-lg sm:text-xl min-w-[28px]">
              01
            </span>
            <h3 class="text-sm sm:text-base font-heading text-brand-dark font-medium leading-snug" contenteditable="true">
              ¿Qué incluye la asistencia para la configuración de LLC y EIN?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-11 sm:pl-13 pt-3 pr-4 text-slate-600 text-xs sm:text-sm leading-relaxed" contenteditable="true">
          <p>Incluye registro formal ante la Secretaría de Estado, obtención de EIN del IRS, acuerdo operativo estándar y guía completa para abrir su cuenta bancaria comercial.</p>
        </div>
      </details>

      <details class="group border-b border-slate-200 pb-5 transition-all duration-200">
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-semibold text-lg sm:text-xl min-w-[28px]">
              02
            </span>
            <h3 class="text-sm sm:text-base font-heading text-brand-dark font-medium leading-snug" contenteditable="true">
              ¿Cuánto tiempo toma el proceso de configuración del negocio?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-11 sm:pl-13 pt-3 pr-4 text-slate-600 text-xs sm:text-sm leading-relaxed" contenteditable="true">
          <p>El registro estatal toma entre 24 y 48 horas hábiles. Para solicitantes con SSN o ITIN el EIN se procesa de inmediato; con pasaporte extranjero toma entre 4 y 7 días hábiles vía fax oficial.</p>
        </div>
      </details>

      <details class="group border-b border-slate-200 pb-5 transition-all duration-200">
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-semibold text-lg sm:text-xl min-w-[28px]">
              03
            </span>
            <h3 class="text-sm sm:text-base font-heading text-brand-dark font-medium leading-snug" contenteditable="true">
              ¿Ofrecen soporte bilingüe completo en español e inglés?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-11 sm:pl-13 pt-3 pr-4 text-slate-600 text-xs sm:text-sm leading-relaxed" contenteditable="true">
          <p>Sí. Toda nuestra asesoría, documentación, llamadas y acompañamiento se ofrecen de forma nativa en español y en inglés.</p>
        </div>
      </details>

      <div class="pt-2">
        <a href="/es/faq" class="inline-flex items-center text-brand-primary font-medium hover:underline text-xs sm:text-sm gap-2" contenteditable="true">
          Ver todas las preguntas y respuestas <span>→</span>
        </a>
      </div>
    </div>
  </div>
</div>
  `,

  form_lead: `
<!-- Form 1: General Lead Capture Form -->
<div id="formulario" class="builder-block bg-slate-50 border border-slate-200 p-8 sm:p-12 rounded-3xl my-6 shadow-xs font-sans">
  <div class="max-w-xl mx-auto space-y-6">
    <div class="text-center space-y-2">
      <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-semibold">
        Contacto Directo
      </span>
      <h2 class="text-2xl sm:text-3xl font-heading font-semibold text-slate-900" contenteditable="true">
        Solicite su Asesoría Gratuita
      </h2>
      <p class="text-xs sm:text-sm text-slate-500" contenteditable="true">Complete sus datos y un consultor bilingüe se comunicará hoy mismo.</p>
    </div>

    <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Gracias! Nos comunicaremos con usted a la brevedad.');">
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">Nombre y Apellido</label>
        <input type="text" required placeholder="Ej. Carlos Mendoza" class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">Teléfono / WhatsApp</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary" />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">Correo Electrónico</label>
          <input type="email" required placeholder="carlos@correo.com" class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">¿En qué podemos ayudarle?</label>
        <textarea rows="3" placeholder="Describa brevemente su proyecto o consulta..." class="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary resize-none"></textarea>
      </div>
      <button type="submit" class="w-full py-3.5 bg-brand-primary hover:bg-opacity-95 text-white font-medium rounded-full text-xs sm:text-sm transition-all shadow-sm" contenteditable="true">
        Enviar Solicitud
      </button>
    </form>
  </div>
</div>
  `,

  form_promo: `
<!-- Form 2: Special Discount / Promo Claim Form -->
<div id="formulario" class="builder-block bg-gradient-to-br from-brand-dark to-slate-900 text-white p-8 sm:p-12 rounded-3xl my-6 shadow-md font-sans">
  <div class="max-w-xl mx-auto space-y-6">
    <div class="text-center space-y-2">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
        Oferta por Tiempo Limitado
      </span>
      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white" contenteditable="true">
        Reclame su 15% de Descuento
      </h2>
      <p class="text-xs sm:text-sm text-slate-300" contenteditable="true">Válido exclusivamente para nuevos proyectos este mes.</p>
    </div>

    <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Descuento activado! Le enviaremos su cupón por WhatsApp y correo.');">
      <div>
        <label class="block text-xs font-medium text-slate-200 mb-1" contenteditable="true">Nombre Completo</label>
        <input type="text" required placeholder="Su nombre" class="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-200 mb-1" contenteditable="true">WhatsApp / Teléfono</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-200 mb-1" contenteditable="true">Tipo de Negocio</label>
          <input type="text" placeholder="Ej. Construcción, Limpieza, Restaurante" class="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400" />
        </div>
      </div>
      <button type="submit" class="w-full py-3.5 bg-brand-accent hover:bg-yellow-300 text-brand-dark font-bold rounded-full text-xs sm:text-sm transition-all shadow-md" contenteditable="true">
        Reclamar Mi 15% de Descuento Ahora
      </button>
    </form>
  </div>
</div>
  `,

  form_call: `
<!-- Form 3: Book a Strategic Call Form -->
<div id="formulario" class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs my-6 font-sans">
  <div class="max-w-xl mx-auto space-y-6">
    <div class="text-center space-y-2">
      <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
        Agenda Directa
      </span>
      <h2 class="text-2xl sm:text-3xl font-heading font-semibold text-slate-900" contenteditable="true">
        Agende su Consulta Telefónica
      </h2>
      <p class="text-xs sm:text-sm text-slate-500" contenteditable="true">Sesión de 15 minutos con un consultor empresarial bilingüe sin compromiso.</p>
    </div>

    <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Cita solicitada! Le confirmaremos la hora exacta por mensaje.');">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">Nombre</label>
          <input type="text" required placeholder="Su nombre" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary" />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">Teléfono</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary" />
        </div>
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1" contenteditable="true">Horario Preferido</label>
        <select class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-primary">
          <option>Mañana (9:00 AM - 12:00 PM)</option>
          <option>Tarde (1:00 PM - 5:00 PM)</option>
        </select>
      </div>
      <button type="submit" class="w-full py-3.5 bg-brand-primary hover:bg-opacity-95 text-white font-medium rounded-full text-xs sm:text-sm transition-all shadow-sm" contenteditable="true">
        Confirmar Solicitud de Llamada
      </button>
    </form>
  </div>
</div>
  `,

  testimonials: `
<div class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs my-6 font-sans">
  <div class="max-w-3xl mx-auto text-center mb-8 space-y-2">
    <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium tracking-wide">
      Testimonios de Clientes
    </span>
    <h2 class="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 leading-tight" contenteditable="true">
      Lo que dicen nuestros clientes
    </h2>
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
          "Guía Negocios nos ayudó con cada detalle de la apertura de nuestro negocio. Su atención bilingüe hizo todo el proceso claro y sin estrés."
        </p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-200/60">
        <div class="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-800 font-bold text-xs">SM</div>
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
          "Excelente servicio y claridad en cada paso. Nos ayudaron a configurar todo en menos de una semana. Totalmente recomendados."
        </p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-200/60">
        <div class="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-800 font-bold text-xs">CR</div>
        <div>
          <h4 class="text-xs sm:text-sm font-heading font-semibold text-slate-900" contenteditable="true">Carlos R.</h4>
          <p class="text-[11px] text-slate-500" contenteditable="true">CleanPro Services — Maryville TN</p>
        </div>
      </div>
    </div>
  </div>
</div>
  `,

  cta: `
<div class="builder-block bg-brand-dark text-white p-8 sm:p-12 rounded-3xl text-center shadow-lg my-6 font-sans relative">
  <div class="max-w-2xl mx-auto space-y-4">
    <h2 class="text-2xl sm:text-3xl font-heading font-semibold text-white leading-tight" contenteditable="true">
      ¿Listo para dar el siguiente paso?
    </h2>
    <p class="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Hable hoy con uno de nuestros consultores bilingües y reciba orientación clara y personalizada.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-white text-brand-dark font-semibold py-3 px-6 rounded-full hover:bg-slate-100 transition-colors text-xs sm:text-sm shadow-sm" contenteditable="true">
        Llamar al (865) 202-7112
      </a>
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full border border-white/20 transition-colors text-xs sm:text-sm" contenteditable="true">
        Completar Formulario
      </a>
    </div>
  </div>
</div>
  `
};
