import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({ projectId: 'guianegocios-prod' });
const db = getFirestore(app);

// Post 2: ITIN y créditos de impuestos (1,025 words -> 7 visuals)
const postDocId = 'tZVbKmMANzlmymSLuKir';

const contentEs = `# ITIN y créditos de impuestos: Lo que todo emprendedor hispano debe saber

**Un ITIN no es solo un número para pagar impuestos. Es la llave que abre créditos fiscales que pueden devolverle miles de dólares cada año.** Si usted tiene un negocio o está pensando en abrir uno, entender cómo funciona el ITIN y qué créditos puede reclamar es esencial.

---

<div class="my-8 p-6 sm:p-8 bg-[#1A2E35] text-white rounded-2xl shadow-md border border-slate-700 font-sans">
<div class="flex items-center justify-between mb-6">
<h4 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-[#F0C850]"></span>
El ITIN en Cifras
</h4>
<span class="text-xs px-3 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] font-bold border border-[#F0C850]/30 uppercase tracking-wider">IRS 2025</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-[#F0C850] mb-1">5M+</div>
<div class="text-xs text-slate-300 font-medium">ITINs Activos en EE.UU.</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-emerald-400 mb-1">$7,830</div>
<div class="text-xs text-slate-300 font-medium">Crédito EITC Máximo (3 hijos)</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-blue-400 mb-1">$2,000</div>
<div class="text-xs text-slate-300 font-medium">CTC por Hijo Menor de 17</div>
</div>
</div>
</div>

---

## Qué es exactamente un ITIN

Un ITIN (Individual Taxpayer Identification Number) es un número de procesamiento fiscal de 9 dígitos emitido por el IRS. Empieza con el número 9 y tiene un formato específico: **9XX-7X-XXXX**.

El ITIN sirve para:

- **Presentar declaraciones de impuestos** aunque no tenga SSN
- **Abrir cuentas bancarias** de negocio
- **Reclamar créditos fiscales** como el EITC y CTC
- **Cumplir con obligaciones fiscales** legales

> **Importante:** El ITIN no autoriza a trabajar en EE.UU. ni proporciona estatus migratorio. Es exclusivamente para fines tributarios.

---

<div class="my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm font-sans">
<h4 class="text-base font-bold text-[#1A2E35] mb-4">Créditos Fiscales que Puede Reclamar con ITIN</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="bg-[#F2F7F4] p-4 rounded-xl border border-[#1B4E2B]/20">
<div class="flex items-center gap-2 text-[#1B4E2B] font-bold text-sm mb-3">
<svg class="w-4 h-4 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Earned Income Tax Credit (EITC)
</div>
<ul class="text-xs text-slate-700 space-y-1.5 leading-relaxed">
<li>Hasta <strong>$7,830</strong> para familias con 3+ hijos</li>
<li>Requisito: ingresos menores a $63,398 (2025)</li>
<li>Necesita SSN válido para trabajo</li>
</ul>
</div>
<div class="bg-white p-4 rounded-xl border border-slate-200">
<div class="flex items-center gap-2 text-[#2563EB] font-bold text-sm mb-3">
<svg class="w-4 h-4 text-[#2563EB] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
Child Tax Credit (CTC)
</div>
<ul class="text-xs text-slate-700 space-y-1.5 leading-relaxed">
<li>Hasta <strong>$2,000</strong> por hijo menor de 17</li>
<li><strong>$1,700</strong> reembolsable (ACTC)</li>
<li>Requiere ITIN válido para dependientes</li>
</ul>
</div>
</div>
</div>

---

## Cómo obtener su ITIN

El proceso es directo. Necesita completar el **formulario W-7** del IRS y enviarlo con su declaración de impuestos o a través de un **Certified Acceptance Agent (CAA)**.

### Documentos necesarios:
- Pasaporte vigente (documento principal)
- O combinación de: visa + tarjeta de identidad + certificado de nacimiento

### Costo:
- IRS: **gratuito** si envía por correo
- CAA: **$150-$300** (pero procesa más rápido)

![Familia hispana revisando documentos fiscales](https://images.pexels.com/photos/7693566/pexels-photo-7693566.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

---

<div class="my-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl shadow-sm font-sans">
<h4 class="text-base font-bold text-[#1A2E35] mb-4">Ruta para Obtener su ITIN</h4>
<div class="space-y-3">
<div class="flex items-start gap-3">
<div class="w-7 h-7 rounded-full bg-[#F0C850] text-[#1A2E35] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
<div class="flex-1">
<strong class="text-sm text-[#1A2E35]">Completar Formulario W-7</strong>
<p class="text-xs text-slate-600 mt-1">Disponible en IRS.gov. Llene todos los campos correctamente.</p>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-7 h-7 rounded-full bg-[#F0C850] text-[#1A2E35] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
<div class="flex-1">
<strong class="text-sm text-[#1A2E35]">Preparar Documentos de Identidad</strong>
<p class="text-xs text-slate-600 mt-1">Pasaporte vigente o combinación de documentos secundarios.</p>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-7 h-7 rounded-full bg-[#F0C850] text-[#1A2E35] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
<div class="flex-1">
<strong class="text-sm text-[#1A2E35]">Enviar con Declaración de Impuestos</strong>
<p class="text-xs text-slate-600 mt-1">Adjunte W-7 + documentos a su tax return anual.</p>
</div>
</div>
<div class="flex items-start gap-3">
<div class="w-7 h-7 rounded-full bg-[#F0C850] text-[#1A2E35] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</div>
<div class="flex-1">
<strong class="text-sm text-[#1A2E35]">Recibir ITIN en 7-11 Semanas</strong>
<p class="text-xs text-slate-600 mt-1">El IRS le envía carta con su número. CAA reduce a 2-3 semanas.</p>
</div>
</div>
</div>
</div>

---

## Créditos para negocios con ITIN

Si tiene un negocio, puede reclamar créditos adicionales:

<div class="my-8 p-5 bg-[#F2F7F4] border border-[#1B4E2B]/20 rounded-2xl font-sans">
<h5 class="text-sm font-bold text-[#1A2E35] mb-3">Checklist de Créditos Empresariales</h5>
<div class="space-y-2">
<div class="flex items-center gap-2">
<svg class="w-5 h-5 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
<span class="text-xs text-slate-700"><strong>Small Business Health Care Tax Credit</strong> — hasta 50% de primas de salud</span>
</div>
<div class="flex items-center gap-2">
<svg class="w-5 h-5 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
<span class="text-xs text-slate-700"><strong>Work Opportunity Tax Credit</strong> — hasta $9,600 por empleado de grupos objetivo</span>
</div>
<div class="flex items-center gap-2">
<svg class="w-5 h-5 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
<span class="text-xs text-slate-700"><strong>Research & Development Credit</strong> — hasta 20% de gastos calificables</span>
</div>
<div class="flex items-center gap-2">
<svg class="w-5 h-5 text-[#1B4E2B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
<span class="text-xs text-slate-700"><strong>General Business Credit</strong> — acumulación de créditos menores</span>
</div>
</div>
</div>

---

<div class="my-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-[#1B4E2B]/20 rounded-2xl shadow-sm font-sans">
<h5 class="text-sm font-bold text-[#1A2E35] mb-2">Consejo de Nuestro Equipo</h5>
<p class="text-xs text-slate-700 leading-relaxed">
Muchos emprendedores hispanos con ITIN dejan miles de dólares sobre la mesa cada año porque no conocen los créditos disponibles. Un contador especializado puede identificar oportunidades que reducen significativamente su carga fiscal.
</p>
</div>

---

<div class="my-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
<h4 class="text-base font-bold text-[#1A2E35] mb-3">Fuentes Oficiales y Referencias</h4>
<ul class="text-xs text-slate-700 space-y-2">
<li><a href="https://www.irs.gov/individuals/international-taxpayers/individual-taxpayer-identification-number" target="_blank" class="text-[#2563EB] hover:underline">IRS — ITIN Application (Form W-7)</a></li>
<li><a href="https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc" target="_blank" class="text-[#2563EB] hover:underline">IRS — Earned Income Tax Credit (EITC)</a></li>
<li><a href="https://www.irs.gov/credits-deductions/individuals/child-tax-credit" target="_blank" class="text-[#2563EB] hover:underline">IRS — Child Tax Credit</a></li>
<li><a href="https://www.irs.gov/businesses/small-businesses-self-employed/general-business-credits" target="_blank" class="text-[#2563EB] hover:underline">IRS — General Business Credits</a></li>
</ul>
</div>

---

*¿Necesita ayuda con su ITIN o declaración de impuestos? [Contáctenos](/es/contact) para una consulta gratuita con nuestro equipo bilingüe.*`;

async function updatePost() {
  try {
    console.log('Updating Post 2: ITIN y créditos de impuestos...');
    const docRef = db.collection('blogs').doc(postDocId);
    await docRef.update({
      contentEs: contentEs,
      updatedAt: new Date().toISOString(),
      status: 'draft'
    });
    console.log('✓ Post 2 updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating Post 2:', error.message);
    process.exit(1);
  }
}

updatePost();
