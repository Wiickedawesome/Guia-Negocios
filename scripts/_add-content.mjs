import { readFileSync, writeFileSync } from 'fs';
const posts = JSON.parse(readFileSync('scripts/blog-posts-data.json','utf8'));

// Post 2: ITIN & Tax Credits
posts[1].contentEs = `# ITIN y creditos de impuestos: Lo que todo emprendedor hispano debe saber

**Un ITIN no es solo un numero para pagar impuestos — es la llave que abre creditos fiscales que pueden devolverle miles de dolares cada ano.** Si usted tiene un negocio o esta pensando en abrir uno, entender como funciona el ITIN y los creditos asociados puede significar la diferencia entre perder dinero y aprovechar beneficios que el gobierno ofrece legalmente.

---

## Que es exactamente un ITIN?

El **Individual Taxpayer Identification Number (ITIN)** es un numero de procesamiento fiscal emitido por el IRS para personas que necesitan cumplir con obligaciones tributarias pero no califican para un SSN.

Puntos clave:

- Empieza con el numero **9**
- Tiene el mismo formato que un SSN (XXX-XX-XXXX)
- **No da derecho a trabajar** ni a recibir beneficios de Seguro Social
- **Si permite** presentar declaraciones de impuestos y reclamar creditos fiscales

## Creditos de impuestos disponibles con un ITIN

### Earned Income Tax Credit (EITC)

El EITC es uno de los creditos mas generosos para trabajadores de ingresos bajos y moderados. Para el ano fiscal 2025:

- **Sin hijos:** hasta **$632**
- **1 hijo:** hasta **$4,213**
- **2 hijos:** hasta **$6,960**
- **3 o mas hijos:** hasta **$7,830**

Para reclamarlo necesita un ITIN valido, ingresos de trabajo reportados, y cumplir con los requisitos de ingreso. Puede reclamar el EITC aunque no tenga SSN, siempre que presente su declaracion con ITIN.

### Child Tax Credit (CTC)

Si tiene hijos que viven con usted y son menores de 17 anos:

- Hasta **$2,000 por hijo calificado**
- Hasta **$1,700 reembolsable** (Additional Child Tax Credit)
- Necesita ITIN para usted y SSN o ITIN para cada hijo

### American Opportunity Tax Credit (AOTC)

Si usted o sus dependientes estan estudiando:

- Hasta **$2,500 por estudiante** por los primeros 4 anos de educacion superior
- 40% es reembolsable (hasta $1,000 aunque no deba impuestos)
- Puede reclamarlo con ITIN

### Child and Dependent Care Credit

Si paga por cuidado de hijos o dependientes mientras trabaja:

- Entre **20% y 35%** de gastos calificados
- Maximo $3,000 por un dependiente, $6,000 por dos o mas
- Necesita ITIN valido

## Como aprovechar estos creditos

1. **Obtenga su ITIN primero** — Formulario W-7 ante el IRS (o use un CAA autorizado)
2. **Reporte todos sus ingresos** — aunque sea en efectivo o como trabajador independiente
3. **Lleve registros de gastos deducibles** — materiales, equipo, transporte de negocio
4. **Presente declaracion cada ano** — aunque no deba impuestos, puede recibir reembolso
5. **Consulte con un profesional bilingue** — un preparador de impuestos puede identificar creditos que usted no conoce

## Errores comunes que le cuestan dinero

- **No presentar declaracion** porque "no gano suficiente" — puede perder creditos reembolsables
- **Mezclar gastos personales y de negocio** — pierda deducciones legitimas
- **No reclamar el EITC** pensando que no califica — los limites de ingreso son mas altos de lo que cree
- **Usar un preparador que no conoce creditos para ITIN** — no todos los preparadores saben reclamar EITC con ITIN

## Como le ayuda Guia Negocios?

En **Guia Negocios** entendemos la realidad del emprendedor hispano:

- **Preparacion de impuestos bilingue** para individuos y negocios con ITIN
- **Identificacion de creditos** que otros preparadores pasan por alto
- **Asistencia con solicitud de ITIN** tramite W-7
- **Bookkeeping mensual** para que sus registros esten listos para deduccion maxima
- **Planificacion fiscal** para minimizar lo que debe y maximizar lo que recibe

No deje dinero sobre la mesa. Muchos emprendedores hispanos pierden entre $2,000 y $8,000 al ano en creditos que no reclaman simplemente porque no saben que existen.

## Fuentes oficiales consultadas

- [IRS - ITIN Information](https://www.irs.gov/individuals/international-taxpayers/individual-taxpayer-identification-number)
- [IRS - Earned Income Tax Credit](https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc)
- [IRS - Child Tax Credit](https://www.irs.gov/credits-deductions/individuals/child-tax-credit)
- [IRS - American Opportunity Tax Credit](https://www.irs.gov/credits-deductions/individuals/aotc)
- [VITA/TCE - Free Tax Prep for qualifying taxpayers](https://www.irs.gov/individuals/free-tax-return-preparation-for-you-from-the-irs)

---

*No pierda mas dinero en creditos que no reclama. [Contactenos](/es/contact) para una revision gratuita de su situacion fiscal.*`;

posts[1].contentEn = `# ITIN and Tax Credits: What Every Hispanic Entrepreneur Should Know

**An ITIN is not just a number for paying taxes — it is the key that unlocks tax credits that can return thousands of dollars to you each year.** If you have a business or are thinking about starting one, understanding how the ITIN works and the associated credits can mean the difference between losing money and taking advantage of benefits the government legally offers.

---

## What Exactly Is an ITIN?

The **Individual Taxpayer Identification Number (ITIN)** is a tax processing number issued by the IRS for people who need to comply with tax obligations but do not qualify for an SSN.

Key points:

- Starts with the number **9**
- Has the same format as an SSN (XXX-XX-XXXX)
- **Does not give the right to work** or receive Social Security benefits
- **Does allow** filing tax returns and claiming tax credits

## Tax Credits Available With an ITIN

### Earned Income Tax Credit (EITC)

The EITC is one of the most generous credits for low and moderate-income workers. For tax year 2025:

- **No children:** up to **$632**
- **1 child:** up to **$4,213**
- **2 children:** up to **$6,960**
- **3 or more children:** up to **$7,830**

To claim it you need a valid ITIN, reported earned income, and must meet income requirements. You can claim the EITC even without an SSN, as long as you file your return with an ITIN.

### Child Tax Credit (CTC)

If you have children living with you under age 17:

- Up to **$2,000 per qualifying child**
- Up to **$1,700 refundable** (Additional Child Tax Credit)
- You need an ITIN for yourself and SSN or ITIN for each child

### American Opportunity Tax Credit (AOTC)

If you or your dependents are in school:

- Up to **$2,500 per student** for the first 4 years of higher education
- 40% is refundable (up to $1,000 even if you owe no tax)
- Can claim with ITIN

### Child and Dependent Care Credit

If you pay for child or dependent care while working:

- Between **20% and 35%** of qualified expenses
- Maximum $3,000 for one dependent, $6,000 for two or more
- You need a valid ITIN

## How to Maximize These Credits

1. **Get your ITIN first** — Form W-7 with the IRS (or use an authorized CAA)
2. **Report all your income** — even cash or self-employment income
3. **Keep records of deductible expenses** — materials, equipment, business transportation
4. **File a return every year** — even if you owe no tax, you may receive a refund
5. **Consult a bilingual professional** — a tax preparer can identify credits you dont know about

## Common Mistakes That Cost You Money

- **Not filing a return** because "I dont earn enough" — you may lose refundable credits
- **Mixing personal and business expenses** — lose legitimate deductions
- **Not claiming the EITC** thinking you dont qualify — income limits are higher than you think
- **Using a preparer who doesnt know ITIN credits** — not all preparers know how to claim EITC with ITIN

## How Can Guia Negocios Help?

At **Guia Negocios** we understand the reality of the Hispanic entrepreneur:

- **Bilingual tax preparation** for individuals and businesses with ITIN
- **Credit identification** that other preparers miss
- **ITIN application assistance** through W-7
- **Monthly bookkeeping** so your records are ready for maximum deductions
- **Tax planning** to minimize what you owe and maximize what you receive

Dont leave money on the table. Many Hispanic entrepreneurs lose between $2,000 and $8,000 per year in credits they dont claim simply because they dont know they exist.

## Official Sources Consulted

- [IRS - ITIN Information](https://www.irs.gov/individuals/international-taxpayers/individual-taxpayer-identification-number)
- [IRS - Earned Income Tax Credit](https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc)
- [IRS - Child Tax Credit](https://www.irs.gov/credits-deductions/individuals/child-tax-credit)
- [IRS - American Opportunity Tax Credit](https://www.irs.gov/credits-deductions/individuals/aotc)
- [VITA/TCE - Free Tax Prep](https://www.irs.gov/individuals/free-tax-return-preparation-for-you-from-the-irs)

---

*Dont lose more money on credits you arent claiming. [Contact us](/en/contact) for a free review of your tax situation.*`;

writeFileSync('scripts/blog-posts-data.json', JSON.stringify(posts, null, 2));
console.log('Post 2 (ITIN) content added');
