---
name: conversion-copywriter-lp
description: High-converting landing page, sales copywriting, and visual layout frameworks tailored specifically for Hispanic business owners and bilingual entrepreneurial services.
---

# Conversion Copywriting & Landing Page Design Skill

This skill provides direct-response copywriting frameworks, psychological triggers, and exact HTML/CSS visual design components for **GUIA DE NEGOCIOS** landing pages (`/admin/landing-pages/builder.astro` and `/admin/landing-pages.astro`).

---

## 1. Core Psychological Drivers of Hispanic Entrepreneurs

To achieve 20%+ conversion rates, landing page copy must address the specific anxieties, aspirations, and cultural context of Hispanic business owners:
1. **Fear of Legal & IRS Penalties:** Overcoming the dread of receiving IRS audit letters or losing personal assets due to improper filings.
2. **Language Barrier & Jargon Overwhelm:** Replacing confusing English legal jargon (*Statutory Agent, Operating Agreement, Franchise Tax*) with crystal-clear explanations in Spanish.
3. **Legitimacy, Pride & Bankability:** Tapping into the pride of building a formal family business, qualifying for SBA loans, and securing high-value commercial contracts.
4. **Human Touch & Trust:** Emphasizing direct bilingual phone/WhatsApp support `(865) 202-7112` and in-person/remote consultation over impersonal corporate automation.

---

## 2. Multi-Goal Landing Page Archetypes

1. **Lead Generation / Consultation Request:** Hero + Stats Bar + Pain vs. Solution Rows + 3-Step Process + Lead Form.
2. **Special Discount / Limited-Time Offer:** Urgency Pill Badge + Bold Benefit Hero + Comparison Matrix + 2-Tier Pricing + Discount Countdown CTA.
3. **Service / Package Sales (Launch Bundle):** Hero + 6-Step Snake Map Roadmap + Deliverables Matrix + Pricing + Testimonials + FAQ.
4. **Foreign Non-Resident Alien U.S. Formation:** Remote Setup Hero + Form 5472 Protection Warning + Banking Process + State Selection (WY, DE, FL, TX, TN) + Consultation Form.
5. **Quote / Price Estimate:** Problem Agitation + Clear Scope Matrix + Step-by-Step Flow + Quote Request Form.

---

## 3. Executive Visual Layout Components

### Component 1: High-Contrast Dark Gradient Hero with Gold SVG Underline
```html
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
      Registre su LLC, obtenga su número EIN y blindaje sus finanzas personales sin intermediarios confusos ni costos ocultos.
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
```

### Component 2: 4-Stat Metric Bar with Source Badges
```html
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
```

### Component 3: Problem vs. Solution Row Matrix (Obstacles vs. Guia Negocios Solutions)
```html
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
```

### Component 4: Split Decision / Mixed vs. Separated Finances Card
```html
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
```

### Component 5: 6-Step Snake Map Roadmap
```html
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
```
