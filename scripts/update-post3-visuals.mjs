import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({ projectId: 'guianegocios-prod' });
const db = getFirestore(app);

const postDocId = '7gzGP4WBui54uMCLOLEO';

const contentEs = `# Contabilidad para restaurantes: Guía completa para dueños hispanos

**El 60% de los restaurantes cierra en los primeros tres años. La mayoría no fracasa por mala comida, sino por mala contabilidad.** Si usted es dueño de un restaurante en Estados Unidos, entender los números no es opcional — es sobrevivir.

<div class="my-8 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm font-sans">
<div class="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
<div class="flex items-center gap-2">
<span class="w-3 h-3 rounded-full bg-[#D92D3C]"></span>
<h4 class="text-base font-bold text-[#1A2E35]">Distribución de Costos en un Restaurante</h4>
</div>
<span class="text-xs font-semibold px-2.5 py-1 bg-[#F2F7F4] text-[#1B4E2B] rounded-full">Industria 2025</span>
</div>
<div class="space-y-3.5">
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-slate-600"><span>Costo de Alimentos</span><span>28-35%</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-rose-400 rounded-full" style="width: 32%;"></div></div>
</div>
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-[#2563EB]"><span>Mano de Obra</span><span>30-35%</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-[#2563EB] rounded-full" style="width: 33%;"></div></div>
</div>
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-slate-600"><span>Renta y Servicios</span><span>10-15%</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-amber-400 rounded-full" style="width: 12%;"></div></div>
</div>
<div>
<div class="flex justify-between text-xs font-semibold mb-1 text-[#059669]"><span>Margen Neto</span><span>5-10%</span></div>
<div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-[#059669] rounded-full" style="width: 8%;"></div></div>
</div>
</div>
</div>

## Los 3 números que debe conocer cada semana

No necesita un título en contabilidad. Solo necesita dominar tres métricas:

### 1. Prime Cost (Costo Primo)
Es la suma de **costo de alimentos + mano de obra**. Debe estar por debajo del **65%** de sus ventas totales. Si pasa el 70%, está perdiendo dinero silenciosamente.

### 2. Food Cost Percentage (Porcentaje de Costo de Alimentos)
Cada plato que sirve debe costarle entre **28-35%** de su precio de venta. Si un taco se vende a $15, los ingredientes no deben costar más de $5.25.

![Dueño de restaurante revisando números](https://images.pexels.com/photos/7241313/pexels-photo-7241313.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

### 3. Break-Even Point (Punto de Equilibrio)
Es el monto mínimo de ventas que necesita para cubrir todos sus gastos. Si su renta es $4,000, mano de obra $6,000, y otros gastos $3,000, necesita vender **al menos $13,000 al mes** solo para quedar en cero.

---

<div class="my-8 p-6 sm:p-8 bg-[#1A2E35] text-white rounded-2xl shadow-md border border-slate-700 font-sans">
<div class="flex items-center justify-between mb-6">
<h4 class="text-base sm:text-lg font-bold text-white flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-[#F0C850]"></span>
Metas de Rentabilidad
</h4>
<span class="text-xs px-3 py-1 rounded-full bg-[#F0C850]/20 text-[#F0C850] font-bold border border-[#F0C850]/30 uppercase tracking-wider">Benchmark 2025</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-emerald-400 mb-1">8-12%</div>
<div class="text-xs text-slate-300 font-medium">Servicio Completo</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-[#F0C850] mb-1">10-15%</div>
<div class="text-xs text-slate-300 font-medium">Fast Casual</div>
</div>
<div class="bg-white/5 p-4 rounded-xl border border-white/10">
<div class="text-3xl font-extrabold text-blue-400 mb-1">12-20%</div>
<div class="text-xs text-slate-300 font-medium">Cafetería</div>
</div>
</div>
</div>

---

## Herramientas de contabilidad para restaurantes

No tiene que hacerlo todo en papel. Estas son las herramientas más usadas por restaurantes hispanos:

- **QuickBooks Online** ($30-$180/mes) — Contabilidad completa, reportes automáticos
- **Square POS** ($0-$79/mes) — Punto de venta con inventario integrado
- **Toast POS** ($69-$165/mes) — Todo-en-uno diseñado para restaurantes
- **MarketMan** ($107-$267/mes) — Control de inventario y costos de alimentos

> **Consejo:** Invierta en un buen POS desde el día uno. Un restaurante sin sistema de punto de venta está volando a ciegas.

---

## Impuestos y deducciones para restaurantes

Como dueño de restaurante, tiene deducciones específicas que otros negocios no tienen:

- **Deducción de alimentos donados** — puede deducir hasta 2× el costo de alimentos donados
- **Crédito FICA para propinas** — el IRS le devuelve su parte de FICA sobre propinas reportadas
- **Deducción de desperdicio (spoilage)** — puede deducir alimentos echados a perder
- **Depreciación de equipo de cocina** — hornos, refrigeradores se deprecian en 7 años

<div class="my-8 p-5 bg-[#fef2f2] rounded-2xl shadow-xs font-sans">
<div class="flex items-start gap-3.5">
<div class="w-8 h-8 rounded-full bg-[#D92D3C] text-white flex items-center justify-center shrink-0 mt-0.5">
<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
</div>
<div>
<h5 class="text-sm font-bold text-[#D92D3C] mb-1">Error Crítico: No Separar Propinas</h5>
<p class="text-xs text-slate-700 leading-relaxed">El IRS exige que reporte y retenga impuestos sobre propinas. Si sus meseros reciben propinas en efectivo y no las reporta, <strong>usted es responsable</strong> ante el IRS. Multa: hasta $50,000 por año.</p>
</div>
</div>
</div>

---

## Cómo Guía Negocios le ayuda

<div class="my-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-[#1B4E2B]/20 rounded-2xl shadow-sm font-sans">
<h4 class="text-base font-bold text-[#1A2E35] mb-4">Servicios para Restaurantes</h4>
<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
<div class="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
<div class="text-xs font-semibold text-[#1A2E35]">Contabilidad Mensual</div>
<div class="text-xs text-slate-500 mt-1">P&L, balance, flujo</div>
</div>
<div class="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
<div class="text-xs font-semibold text-[#1A2E35]">Nómina y Propinas</div>
<div class="text-xs text-slate-500 mt-1">Cumplimiento IRS</div>
</div>
<div class="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
<div class="text-xs font-semibold text-[#1A2E35]">Análisis de Costos</div>
<div class="text-xs text-slate-500 mt-1">Por plato</div>
</div>
<div class="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
<div class="text-xs font-semibold text-[#1A2E35]">Declaración Anual</div>
<div class="text-xs text-slate-500 mt-1">Federal + estatal</div>
</div>
<div class="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
<div class="text-xs font-semibold text-[#1A2E35]">Inventario</div>
<div class="text-xs text-slate-500 mt-1">Control desperdicio</div>
</div>
<div class="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
<div class="text-xs font-semibold text-[#1A2E35]">Consultoría</div>
<div class="text-xs text-slate-500 mt-1">Estrategia precios</div>
</div>
</div>
</div>

---

<div class="my-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
<h4 class="text-base font-bold text-[#1A2E35] mb-3">Fuentes Oficiales y Referencias</h4>
<ul class="text-xs text-slate-700 space-y-2">
<li><a href="https://www.irs.gov/businesses/small-businesses-self-employed/restaurants" target="_blank" class="text-[#2563EB] hover:underline">IRS — Restaurants</a></li>
<li><a href="https://www.restaurant.org/business-operations/finance-and-accounting" target="_blank" class="text-[#2563EB] hover:underline">National Restaurant Association — Finance & Accounting</a></li>
<li><a href="https://www.sba.gov/business-guide/manage-your-business/accounting-bookkeeping" target="_blank" class="text-[#2563EB] hover:underline">SBA — Accounting & Bookkeeping</a></li>
</ul>
</div>

*¿Necesita ayuda con la contabilidad de su restaurante? [Contáctenos](/es/contact) para una consulta gratuita.*`;

async function updatePost() {
  try {
    console.log('Updating Post 3: Contabilidad para restaurantes...');
    const docRef = db.collection('blogs').doc(postDocId);
    await docRef.update({
      contentEs: contentEs,
      updatedAt: new Date().toISOString(),
      status: 'draft'
    });
    console.log('✓ Post 3 updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating Post 3:', error.message);
    process.exit(1);
  }
}

updatePost();
