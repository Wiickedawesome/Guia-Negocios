/**
 * Guia Negocios Official Website Design Elements for Landing Pages
 * Matches guianegocios.net brand tokens:
 * - brand-primary: #1B4E2B (Dark Forest Green)
 * - brand-dark: #1A2E35 (Deep Navy Slate)
 * - brand-accent: #F0C850 (Warm Gold for Sales / Promos)
 * - brand-light: #F2F7F4 (Mint Slate)
 */

export const LANDING_PAGE_TEMPLATES = {
  hero: `
<div class="builder-block bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 text-center my-6 shadow-sm font-sans relative">
  <div class="max-w-3xl mx-auto space-y-6">
    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide">
      <span class="w-2 h-2 rounded-full bg-brand-primary"></span>
      <span contenteditable="true">OFERTA EXCLUSIVA PARA NEGOCIOS</span>
    </span>
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-tight tracking-tight" contenteditable="true">
      Obtén tu Página Web Profesional con un <span class="text-brand-primary">15% de Descuento</span>
    </h1>
    <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" contenteditable="true">
      Diseño web moderno, rápido y adaptado para celulares para que vendas más y proyectes una imagen confiable ante tus clientes.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-primary hover:bg-emerald-900 text-white font-semibold py-3.5 px-8 rounded-full transition-all text-base shadow-md" contenteditable="true">
        Reclamar Mi Descuento del 15%
      </a>
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-slate-300 text-brand-dark font-semibold py-3.5 px-6 rounded-full hover:bg-slate-50 transition-all text-base gap-2">
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
    <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide">
      Nuestros Beneficios
    </span>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight" contenteditable="true">
      Todo lo que incluye tu nueva presencia digital
    </h2>
    <p class="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Construido con tecnología de última generación para posicionar tu negocio en Google.
    </p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-brand-primary shadow-xs">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      </div>
      <div>
        <h3 class="text-lg font-heading text-brand-dark font-bold mb-2" contenteditable="true">Diseño 100% Móvil</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Tu página se verá espectacular en teléfonos, tabletas y computadoras con carga ultra rápida.</p>
      </div>
    </div>
    <div class="bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-brand-primary shadow-xs">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>
      <div>
        <h3 class="text-lg font-heading text-brand-dark font-bold mb-2" contenteditable="true">Optimizado para Google</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Configuramos SEO local para que aparezcas cuando busquen tus servicios en tu ciudad.</p>
      </div>
    </div>
    <div class="bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-brand-primary shadow-xs">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </div>
      <div>
        <h3 class="text-lg font-heading text-brand-dark font-bold mb-2" contenteditable="true">Soporte 100% en Español</h3>
        <p class="text-slate-600 text-sm leading-relaxed" contenteditable="true">Sin barreras de idioma. Te atendemos y asesoramos con la cercanía y confianza que mereces.</p>
      </div>
    </div>
  </div>
</div>
  `,

  faq: `
<!-- Standard Website FAQ (FaqAccordion.astro layout matching guianegocios.net/es/services) -->
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
      <details class="group border-b border-slate-200 pb-5 transition-all duration-200" open>
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-bold text-xl min-w-[32px]">
              01
            </span>
            <h3 class="text-base sm:text-lg font-heading text-brand-dark font-semibold leading-snug" contenteditable="true">
              ¿Qué incluye la oferta con 15% de descuento?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-12 sm:pl-14 pt-3 pr-4 text-slate-600 text-sm leading-relaxed" contenteditable="true">
          <p>Incluye diseño completo de su sitio web responsivo, optimización SEO en Google, conexión de dominio, integración con WhatsApp Business y 15% de descuento directo en la cotización.</p>
        </div>
      </details>

      <details class="group border-b border-slate-200 pb-5 transition-all duration-200">
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-bold text-xl min-w-[32px]">
              02
            </span>
            <h3 class="text-base sm:text-lg font-heading text-brand-dark font-semibold leading-snug" contenteditable="true">
              ¿Cuánto tiempo toma tener mi página web lista?
            </h3>
          </div>
          <span class="text-brand-dark transition-transform duration-200 group-open:rotate-45 text-2xl font-light shrink-0">
            +
          </span>
        </summary>
        <div class="pl-12 sm:pl-14 pt-3 pr-4 text-slate-600 text-sm leading-relaxed" contenteditable="true">
          <p>Un sitio web estándar está listo y publicado entre 2 y 3 semanas desde la recepción de los textos y fotos.</p>
        </div>
      </details>

      <details class="group border-b border-slate-200 pb-5 transition-all duration-200">
        <summary class="flex items-center justify-between cursor-pointer list-none select-none py-2 gap-4">
          <div class="flex items-center gap-4 sm:gap-6">
            <span class="text-brand-primary font-heading font-bold text-xl min-w-[32px]">
              03
            </span>
            <h3 class="text-base sm:text-lg font-heading text-brand-dark font-semibold leading-snug" contenteditable="true">
              ¿Ofrecen soporte y atención 100% en español?
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
<!-- High-Contrast 15% OFF Promo Claim Form with Official Gold Button -->
<div id="formulario" class="builder-block bg-slate-50 border border-slate-200 p-8 sm:p-12 rounded-3xl my-6 shadow-md font-sans">
  <div class="max-w-xl mx-auto space-y-6">
    <div class="text-center space-y-2">
      <span class="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
        Oferta por Tiempo Limitado
      </span>
      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-brand-dark" contenteditable="true">
        ¡Asegura tu Descuento del 15% Hoy!
      </h2>
      <p class="text-sm text-slate-600" contenteditable="true">
        Completa el formulario a continuación para congelar tu precio especial. Un asesor de Guía de Negocios te contactará en menos de 24 horas.
      </p>
    </div>

    <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Descuento activado! Le enviaremos su confirmación por WhatsApp.');">
      <div>
        <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Nombre Completo</label>
        <input type="text" required placeholder="Ej. Juan Pérez" class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary shadow-xs" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">WhatsApp / Teléfono</label>
        <input type="tel" required placeholder="Ej. (865) 123-4567" class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary shadow-xs" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Tipo de Negocio o Servicio</label>
        <input type="text" placeholder="Ej. Construcción, Limpieza, Restaurante" class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary shadow-xs" />
      </div>
      <button type="submit" class="w-full py-4 bg-brand-accent hover:bg-yellow-400 text-brand-dark font-bold rounded-full text-base transition-all shadow-md mt-2" contenteditable="true">
        Reclamar Mi Cupón del 15% OFF
      </button>
    </form>
  </div>
</div>
  `,

  form_lead: `
<!-- Standard Lead Capture Form with Dark Green Button -->
<div id="formulario" class="builder-block bg-slate-50 border border-slate-200 p-8 sm:p-12 rounded-3xl my-6 shadow-sm font-sans">
  <div class="max-w-xl mx-auto space-y-6">
    <div class="text-center space-y-2">
      <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
        Contacto Directo
      </span>
      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-brand-dark" contenteditable="true">
        Solicite su Asesoría Gratuita
      </h2>
      <p class="text-sm text-slate-600" contenteditable="true">Complete sus datos y un consultor bilingüe se comunicará hoy mismo.</p>
    </div>

    <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Gracias! Nos comunicaremos con usted a la brevedad.');">
      <div>
        <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Nombre y Apellido</label>
        <input type="text" required placeholder="Ej. Carlos Mendoza" class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary shadow-xs" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Teléfono / WhatsApp</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary shadow-xs" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Correo Electrónico</label>
          <input type="email" required placeholder="carlos@correo.com" class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary shadow-xs" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">¿En qué podemos ayudarle?</label>
        <textarea rows="3" placeholder="Describa brevemente su proyecto o consulta..." class="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-primary resize-none shadow-xs"></textarea>
      </div>
      <button type="submit" class="w-full py-4 bg-brand-primary hover:bg-emerald-900 text-white font-semibold rounded-full text-base transition-all shadow-md" contenteditable="true">
        Enviar Solicitud
      </button>
    </form>
  </div>
</div>
  `,

  form_call: `
<!-- Call Booking Form with Dark Green Button -->
<div id="formulario" class="builder-block bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm my-6 font-sans">
  <div class="max-w-xl mx-auto space-y-6">
    <div class="text-center space-y-2">
      <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
        Agenda Directa
      </span>
      <h2 class="text-2xl sm:text-3xl font-heading font-bold text-brand-dark" contenteditable="true">
        Agende su Consulta Telefónica
      </h2>
      <p class="text-sm text-slate-600" contenteditable="true">Sesión de 15 minutos con un consultor empresarial bilingüe sin costo.</p>
    </div>

    <form class="space-y-4" onsubmit="event.preventDefault(); alert('¡Cita solicitada! Le confirmaremos la hora exacta por mensaje.');">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Nombre</label>
          <input type="text" required placeholder="Su nombre" class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-brand-primary shadow-xs" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Teléfono</label>
          <input type="tel" required placeholder="(865) 000-0000" class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-brand-primary shadow-xs" />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-800 mb-1" contenteditable="true">Horario Preferido</label>
        <select class="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-brand-primary font-medium shadow-xs">
          <option>Mañana (9:00 AM - 12:00 PM)</option>
          <option>Tarde (1:00 PM - 5:00 PM)</option>
        </select>
      </div>
      <button type="submit" class="w-full py-4 bg-brand-primary hover:bg-emerald-900 text-white font-semibold rounded-full text-base transition-all shadow-md" contenteditable="true">
        Confirmar Solicitud de Llamada
      </button>
    </form>
  </div>
</div>
  `,

  cta: `
<!-- Official Dark Navy CTA with Gold / White Buttons -->
<div class="builder-block bg-brand-dark text-white p-8 sm:p-14 rounded-3xl text-center shadow-xl my-6 font-sans relative">
  <div class="max-w-2xl mx-auto space-y-5">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight" contenteditable="true">
      ¿Listo para hacer crecer su negocio?
    </h2>
    <p class="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" contenteditable="true">
      Hable hoy con uno de nuestros consultores bilingües y reciba orientación clara, confiable y personalizada.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a href="tel:8652027112" class="w-full sm:w-auto inline-flex items-center justify-center bg-brand-accent hover:bg-yellow-400 text-brand-dark font-bold py-3.5 px-8 rounded-full transition-colors text-base shadow-md" contenteditable="true">
        Llamar al (865) 202-7112
      </a>
      <a href="#formulario" class="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-8 rounded-full border border-white/20 transition-colors text-base" contenteditable="true">
        Completar Formulario
      </a>
    </div>
  </div>
</div>
  `
};
