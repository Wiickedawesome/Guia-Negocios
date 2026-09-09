import { readFileSync, writeFileSync } from 'fs';
const posts = JSON.parse(readFileSync('scripts/blog-posts-data.json','utf8'));

posts[2].contentEs = `# Contabilidad para restaurantes: Guia completa para duenos hispanos

**El 60% de los restaurantes cierra en los primeros tres anos, y la mayoria no fracasa por mala comida, sino por mala contabilidad.** Si usted es dueno de un restaurante en Estados Unidos, entender los numeros no es opcional: es la diferencia entre sobrevivir y cerrar.

---

## Por que fallan las finanzas en restaurantes

Los restaurantes tienen dinamicas financieras unicas que los hacen especialmente vulnerables:

- **Margenes de ganancia extremadamente bajos** (3-5% neto en promedio)
- **Flujo de efectivo diario** dificil de rastrear
- **Inventario perecedero** que se pierde si no se maneja bien
- **Costos laborales complejos** con propinas, horas extras, y regulaciones
- **Multiples metodos de pago** (efectivo, tarjetas, apps de delivery)

Un restaurante puede estar lleno cada noche y aun perder dinero si los numeros no estan controlados.

## Los 5 numeros que debe conocer cada semana

### 1. Costo de Alimentos Vendidos (COGS)
**Formula:** (Inventario inicial + Compras - Inventario final) / Ventas totales. **Objetivo:** 28-32% de ventas totales. Si pasa del 35%, tiene fugas de inventario, porciones incorrectas, o robo.

### 2. Costo de Mano de Obra
**Formula:** (Salarios + Impuestos + Beneficios) / Ventas totales. **Objetivo:** 25-30% de ventas. Incluye todo: cocineros, meseros, dishwashers, seguros de empleados, FICA.

### 3. Margen Bruto
**Formula:** Ventas - COGS - Mano de obra. Debe ser al menos 40-45% para cubrir renta, servicios, y otros gastos fijos.

### 4. Punto de Equilibrio (Break-Even)
**Formula:** Costos fijos / (1 - (COGS% + Labor%)). Es cuanto necesita vender cada mes solo para no perder dinero.

### 5. Prime Cost (Costo Primo)
**Formula:** COGS + Mano de obra total. **Objetivo:** No mas del 60% de ventas totales. Este es el numero mas importante.

## Control de inventario: El metodo que funciona

### Sistema FIFO (First In, First Out)
Todo lo que llega primero se usa primero. Organice su almacen para que los productos mas antiguos esten al frente.

### Conteo diario de proteinas
Carne, pescado, pollo: estos son sus items mas caros. Cuentelos cada dia al cerrar. Si faltan 2 libras de carne y no hay registro de venta, tiene un problema.

### Recetas estandarizadas (Standard Recipe Cards)
Cada plato debe tener una receta exacta con cantidades medidas: 4 oz de pollo, 2 cucharadas de aceite, 1/2 taza de arroz. Esto le da costo exacto por plato para fijar precios correctos, consistencia para el cliente, y control contra desperdicio o robo.

### Reporte de desperdicio
Cada vez que tira algo, registralo: que producto, cuanta cantidad, por que. Al final de la semana, sume el costo total. Si es mas del 2-3% de COGS, tiene un problema operativo.

## Manejo de propinas y empleados

### Registro correcto de propinas
Las propinas son ingreso para el empleado, pero usted tiene obligaciones: reportar todas las propinas al IRS (Form 8027 para restaurantes grandes), retener impuestos sobre propinas reportadas, e incluir propinas en calculo de salario minimo si aplica.

### Clasificacion de empleados
- **Tipped (con propina):** Meseros, bartenders, hosts que reciben propinas directamente
- **Non-tipped (sin propina):** Cocineros, dishwashers, managers

Cada grupo tiene reglas diferentes de salario minimo y horas extras.

### Horas extras (Overtime)
Cualquier hora sobre 40 por semana = 1.5x el salario regular. Muchos restaurantes cometen el error de pagar todo a salario fijo sin calcular overtime, y el IRS les cobra retroactivo con intereses.

## Reportes mensuales que necesita

### 1. Estado de Resultados (P&L)
Ventas - COGS - Mano de obra - Renta - Otros gastos = Ganancia o Perdida

### 2. Flujo de Efectivo
Cuanto dinero entro vs salio. Los restaurantes necesitan flujo diario positivo.

### 3. Balance General
Activos (efectivo, inventario, equipo) vs Pasivos (deudas, cuentas por pagar)

### 4. Reporte de COGS por categoria
Proteinas, Vegetales, Bebidas, Lacteos, Secos/Enlatados. Esto le dice donde se va su dinero.

### 5. Reporte de ventas por hora y dia
Para programar personal correctamente y evitar pagar empleados que no necesita.

## Impuestos especificos para restaurantes

### Sales Tax (Impuesto sobre ventas)
Usted recauda sales tax del cliente y lo paga al estado. No es su dinero: es dinero del estado que usted tiene temporalmente. Si lo gasta, tendra que pagarlo de su bolsillo.

### Payroll Tax (Impuestos de nomina)
- **Social Security y Medicare (FICA):** 7.65% que usted paga como empleador
- **FUTA (Federal Unemployment):** 0.6% sobre primeros $7,000 de cada empleado
- **State Unemployment:** Variable por estado

### Depreciacion de equipos
Refrigeradores, estufas, mesas se deprecian en 5-7 anos. Esto reduce su ingreso taxable legalmente.

## Errores que cuestan miles de dolares

1. **No separar finanzas personales del negocio** — Si paga su renta personal con la cuenta del restaurante, no tiene forma de saber si su negocio es rentable.
2. **Fijar precios sin calcular costo real** — Si un plato le cuesta $4.50 en ingredientes y lo vende a $12, puede estar perdiendo dinero si considera mano de obra y gastos.
3. **No registrar ventas en efectivo** — El IRS puede auditar y estimar sus ventas basandose en compras de inventario. Si no registro todo, le cobraran impuestos sobre dinero que nunca gano.
4. **Pagar empleados por debajo de la mesa** — Si un empleado se lastima y no esta en nomina, usted es 100% responsable. Las multas son devastadoras.
5. **No hacer conciliacion bancaria diaria** — Si no verifica que lo que entro en tarjeta coincide con sus ventas reportadas, no sabra si hay fraude o errores.

## Como le ayuda Guia Negocios?

En **Guia Negocios** trabajamos especificamente con restaurantes y negocios de comida:

- **Setup de sistema contable** disenado para restaurantes (COGS, inventario, propinas)
- **Bookkeeping mensual** con reportes que usted entiende (no jerga contable)
- **Calculo de costo por plato** para que fije precios correctos
- **Manejo de nomina** incluyendo propinas, horas extras, y declaraciones
- **Preparacion de impuestos** con deducciones maximas para restaurantes
- **Consultoria financiera** para identificar donde pierde dinero y como corregirlo

No espere a que los numeros lo sorprendan. Un restaurante con contabilidad clara puede ser rentable incluso con margenes bajos.

## Fuentes oficiales consultadas

- [IRS - Restaurant Industry Tax Tips](https://www.irs.gov/businesses/small-businesses-self-employed/restaurants)
- [IRS - Employer Tax Guide (P15)](https://www.irs.gov/pub/irs-pdf/p15.pdf)
- [TN Department of Revenue](https://www.tn.gov/revenue.html)
- [SBA - Restaurant Business Planning](https://www.sba.gov/business-guide/launch-your-business/restaurant-business)
- [DOL - Tipped Employees](https://www.dol.gov/agencies/whd/fact-sheets/15-flsa-tipped-employees)

---

*Su restaurante merece numeros claros. [Contactenos](/es/contact) para una revision gratuita de su sistema contable.*`;

posts[2].contentEn = `# Restaurant Accounting: Complete Guide for Hispanic Owners

**60% of restaurants close within the first three years, and most don't fail because of bad food, but because of bad accounting.** If you own a restaurant in the United States, understanding the numbers is not optional: it's the difference between surviving and closing.

---

## Why Restaurant Finances Fail

Restaurants have unique financial dynamics that make them especially vulnerable:

- **Extremely low profit margins** (3-5% net on average)
- **Daily cash flow** hard to track
- **Perishable inventory** that is lost if not managed properly
- **Complex labor costs** with tips, overtime, and regulations
- **Multiple payment methods** (cash, cards, delivery apps)

A restaurant can be packed every night and still lose money if the numbers are not controlled.

## The 5 Numbers Every Owner Must Know Weekly

### 1. Cost of Goods Sold (COGS)
**Formula:** (Beginning Inventory + Purchases - Ending Inventory) / Total Sales. **Target:** 28-32% of total sales. If it exceeds 35%, you have inventory leakage, incorrect portions, or theft.

### 2. Labor Cost
**Formula:** (Wages + Taxes + Benefits) / Total Sales. **Target:** 25-30% of sales. Includes everything: cooks, servers, dishwashers, employee insurance, FICA.

### 3. Gross Margin
**Formula:** Sales - COGS - Labor. Must be at least 40-45% to cover rent, utilities, and other fixed expenses.

### 4. Break-Even Point
**Formula:** Fixed Costs / (1 - (COGS% + Labor%)). This is how much you need to sell each month just to not lose money.

### 5. Prime Cost
**Formula:** COGS + Total Labor. **Target:** No more than 60% of total sales. This is the single most important number.

## Inventory Control: The Method That Works

### FIFO System (First In, First Out)
Everything that arrives first is used first. Organize your storage so older products are in front.

### Daily Protein Count
Meat, fish, chicken: these are your most expensive items. Count them every day at closing. If 2 pounds of meat are missing and there is no sales record, you have a problem.

### Standardized Recipes (Recipe Cards)
Every dish must have an exact recipe with measured quantities: 4 oz of chicken, 2 tablespoons of oil, 1/2 cup of rice. This gives you exact cost per dish for correct pricing, consistency for the customer, and control against waste or theft.

### Waste Report
Every time you throw something away, record it: what product, what quantity, why (expired, dropped, burned). At the end of the week, add up the total cost. If it is more than 2-3% of COGS, you have an operational problem.

## Tips and Employee Management

### Correct Tip Reporting
Tips are income for the employee, but you have obligations: report all tips to the IRS (Form 8027 for large restaurants), withhold taxes on reported tips, and include tips in minimum wage calculation if applicable.

### Employee Classification
- **Tipped:** Servers, bartenders, hosts who receive tips directly
- **Non-tipped:** Cooks, dishwashers, managers

Each group has different minimum wage and overtime rules.

### Overtime
Any hours over 40 per week = 1.5x regular salary. Many restaurants make the mistake of paying everything as a fixed salary without calculating overtime, and the IRS charges them retroactively with interest.

## Monthly Reports You Need

### 1. Profit & Loss (P&L)
Sales - COGS - Labor - Rent - Other expenses = Profit or Loss

### 2. Cash Flow Statement
How much money came in vs went out. Restaurants need daily positive cash flow.

### 3. Balance Sheet
Assets (cash, inventory, equipment) vs Liabilities (debts, accounts payable)

### 4. COGS Report by Category
Proteins, Vegetables, Beverages, Dairy, Dry/Canned. This tells you where your money is going.

### 5. Sales Report by Hour and Day
To schedule staff correctly and avoid paying for employees you do not need.

## Restaurant-Specific Taxes

### Sales Tax
You collect sales tax from the customer and pay it to the state. It is not your money: it is state money that you hold temporarily. If you spend it, you will have to pay it out of your pocket.

### Payroll Tax
- **Social Security & Medicare (FICA):** 7.65% that you pay as employer
- **FUTA (Federal Unemployment):** 0.6% on first $7,000 of each employee
- **State Unemployment:** Varies by state

### Equipment Depreciation
Refrigerators, stoves, tables depreciate over 5-7 years. This legally reduces your taxable income.

## Mistakes That Cost Thousands of Dollars

1. **Not separating personal and business finances** — If you pay your personal rent with the restaurant account, you have no way of knowing if your business is profitable.
2. **Pricing without calculating real cost** — If a dish costs you $4.50 in ingredients and you sell it for $12, you might be losing money when you consider labor and expenses.
3. **Not recording cash sales** — The IRS can audit and estimate your sales based on inventory purchases. If you did not record everything, they will charge you taxes on money you never earned.
4. **Paying employees under the table** — If an employee gets hurt and is not on payroll, you are 100% responsible. The fines are devastating.
5. **Not doing daily bank reconciliation** — If you do not verify that card payments match your reported sales, you will not know if there is fraud or errors.

## How Can Guia Negocios Help?

At **Guia Negocios** we work specifically with restaurants and food businesses:

- **Accounting system setup** designed for restaurants (COGS, inventory, tips)
- **Monthly bookkeeping** with reports you understand (no accounting jargon)
- **Per-dish cost calculation** so you price correctly
- **Payroll management** including tips, overtime, and filings
- **Tax preparation** with maximum deductions for restaurants
- **Financial consulting** to identify where you are losing money and how to fix it

Do not wait for the numbers to surprise you. A restaurant with clear accounting can be profitable even with low margins.

## Official Sources Consulted

- [IRS - Restaurant Industry Tax Tips](https://www.irs.gov/businesses/small-businesses-self-employed/restaurants)
- [IRS - Employer Tax Guide (P15)](https://www.irs.gov/pub/irs-pdf/p15.pdf)
- [TN Department of Revenue](https://www.tn.gov/revenue.html)
- [SBA - Restaurant Business Planning](https://www.sba.gov/business-guide/launch-your-business/restaurant-business)
- [DOL - Tipped Employees](https://www.dol.gov/agencies/whd/fact-sheets/15-flsa-tipped-employees)

---

*Your restaurant deserves clear numbers. [Contact us](/en/contact) for a free review of your accounting system.*`;

writeFileSync('scripts/blog-posts-data.json', JSON.stringify(posts, null, 2));
console.log('Post 3 (Restaurant Accounting) ES+EN added');
