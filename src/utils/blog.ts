/**
 * Blog utilities for loading and parsing markdown blog posts.
 * Posts are stored as .md files in src/content/blog/{lang}/ with YAML frontmatter.
 */

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  lang: string;
  altSlug: string;
  tags: string[];
  content: string;
  featuredImage?: string;
  authorAvatar?: string;
  readTime?: number;
}

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const POST_OVERRIDES: Record<string, Partial<BlogPost>> = {
  'importancia-de-numero-ein': {
    title: "Guía de EIN: Cómo Obtener un EIN Sin SSN",
    slug: "importancia-de-numero-ein",
    altSlug: "importance-of-ein-number",
    lang: "es",
    date: "2026-08-10",
    excerpt: "Guía completa para no residentes y emprendedores hispanos: cómo tramitar el número EIN ante el IRS sin Seguro Social (SSN), abrir cuentas bancarias en EE.UU. y evitar multas.",
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    tags: ["EIN", "No Residentes", "IRS", "LLC EE.UU.", "Empresarios Hispanos"],
    readTime: 7,
    content: `
Si está planeando lanzar o formalizar un negocio en los Estados Unidos desde Latinoamérica, España, o siendo un residente hispano en EE.UU. sin Número de Seguro Social (SSN), el **EIN (Número de Identificación del Empleador)** es la pieza central que necesita para operar legalmente.

Muchas personas asumen erróneamente que para tener una empresa registrada en EE.UU. y contar con una cuenta bancaria comercial es obligatorio ser ciudadano estadounidense o residir físicamente en el país. **Esto es completamente falso.**

En esta guía exhaustiva le explicamos cómo funciona el EIN para **no residentes y emprendedores hispanos**, cómo obtenerlo paso a paso directamente ante el IRS y los errores fiscales más graves que debe evitar.

---

## ¿Qué es un Número EIN y Por Qué es Esencial para No Residentes?

El **Employer Identification Number (EIN)** es un número único de 9 dígitos (con formato \`XX-XXXXXXX\`) asignado por el **IRS (Internal Revenue Service)** a las entidades comerciales en Estados Unidos. Funciona como el documento de identidad fiscal de su empresa (equivalente al RUC, RFC, CUIT o NIF en países hispanohablantes).

![Documentación de Negocios en EE.UU.](https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop)

### ¿Por qué lo necesita un emprendedor hispano o no residente?

1. **Apertura de Cuentas Bancarias Comerciales en EE.UU.:** Bancos físicos y digitales (como Mercury, Relay Financial, Chase o Bank of America) exigen de forma obligatoria el certificado EIN de la empresa para abrir una cuenta bancaria a nombre de su LLC.
2. **Procesamiento de Pagos Internacionales:** Pasarelas de pago líderes como **Stripe, PayPal Business, Square y Shopify Payments** requieren el EIN para verificar su negocio y transferir sus ingresos en dólares estadounidenses ($USD).
3. **Contratación y Cumplimiento con Clientes Corporativos:** Si ofrece servicios a empresas en EE.UU. (construcción, limpieza, consultoría, desarrollo de software, diseño), le solicitarán el formulario W-9 para procesar sus pagos sin retenciones innecesarias.
4. **Protección de su Identidad Personal:** Evita tener que proporcionar su número de identificación personal o ITIN a clientes y proveedores en facturas públicas.

---

## Ejemplos Prácticos y Casos de Estudio

Para comprender mejor cómo beneficia el EIN a los empresarios hispanos, analicemos dos situaciones reales:

### Caso 1: Mateo (Emprendedor No Residente en Latinoamérica)
Mateo vive en Bogotá, Colombia, y vende servicios de marketing digital y comercio electrónico a clientes en Estados Unidos. Formó una **LLC en Tennessee** a través de GUIA NEGOCIOS, pero no cuenta con Seguro Social (SSN) ni vive en EE.UU. 

* **Solución con EIN:** Tramitamos su EIN ante el IRS mediante la solicitud especial para extranjeros (Formulario SS-4 por Fax directo). Con su carta oficial **Form CP 575 / 147C** emitida por el IRS, Mateo abrió su cuenta bancaria comercial en dólares con Relay Financial y vinculó su pasarela de Stripe para cobrar a clientes de todo el mundo sin comisiones por cambio de divisa.

### Caso 2: María y José (Pareja Hispana en Tennessee con ITIN)
María y José abrieron una empresa de servicios de limpieza residencial e industrial en Knoxville, TN. Ambos cuentan con número **ITIN (Número de Identificación Personal del Contribuyente)**. Al intentar contratar su primer cliente comercial grande, la empresa les exigió un seguro de responsabilidad civil y un número de identificación fiscal corporativo.

* **Solución con EIN:** Con la asistencia de GUIA NEGOCIOS, obtuvieron el EIN corporativo registrado a nombre de su LLC. Esto les permitió abrir su cuenta corporativa en un banco local de Knoxville, emitir facturas profesionales con su EIN y calificar para contratos comerciales institucionales.

---

## ¿Se Puede Obtener un EIN Sin Número de Seguro Social (SSN)?

¡Sí, 100% legal! El IRS **no requiere** que el propietario de la empresa sea residente ni posea un Seguro Social (SSN) para otorgar un EIN a una entidad estadounidense.

![Formularios Fiscales IRS](https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?q=80&w=1200&auto=format&fit=crop)

### ¿Cómo se realiza el trámite para No Residentes?

* **Residentes con SSN:** Pueden realizar la solicitud en línea en el portal del IRS y obtener el EIN de forma instantánea.
* **No Residentes (Sin SSN):** Deben presentar el **Formulario SS-4 (Application for Employer Identification Number)** marcando expresamente la opción de *Foreign Owner* sin SSN. La solicitud se envía por **Fax especial del IRS para internacionales** o por correo postal.
* **Tiempo de Procesamiento:** El trámite por Fax para no residentes suele tomar entre 4 a 15 días hábiles dependiendo del volumen de trabajo del IRS.

---

## Diferencia Entre EIN, ITIN y SSN

Es muy común confundir estos tres términos fiscales en EE.UU. A continuación aclaramos sus diferencias:

| Sigla | Nombre Oficial | ¿Para quién es? | Uso Principal |
| :--- | :--- | :--- | :--- |
| **SSN** | Social Security Number | Ciudadanos y Residentes Legales en EE.UU. | Identificación personal y laboral general en EE.UU. |
| **ITIN** | Individual Taxpayer Identification Number | Extranjeros o personas sin SSN | Declaración de impuestos personales del individuo. |
| **EIN** | Employer Identification Number | **Empresas (LLCs, Corporaciones, Sociedades)** | Facturación, apertura de cuenta bancaria comercial e impuestos del negocio. |

---

## Errores Críticos que los No Residentes Deben Evitar

![Asesoría Legal y Fiscal](https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop)

1. **No presentar el Formulario 5472 / 1120 Anual (Reporte Informativo de Propietario Extranjero):** Las LLCs de un solo miembro cuyo propietario es no residente (*Foreign-Owned Single-Member LLC*) deben presentar anualmente los formularios **1120 y 5472** ante el IRS. Omitir este reporte conlleva una **multa automática de $25,000 USD** por parte del IRS.
2. **Confundir el EIN con la Licencia Comercial Estatal:** Obtener el EIN del IRS es un trámite federal. Adicionalmente, dependiendo del estado donde opere su LLC (como Tennessee), necesitará registrarse ante el Departamento de Impuestos Estatal.
3. **Pagar Cobros Excesivos a Intermediarios Sin Licencia:** El trámite del EIN ante el IRS es un servicio directo. Asegúrese de trabajar con consultores experimentados que entreguen la carta de confirmación oficial **Form CP 575** directamente a su nombre.

---

## ¿Necesita Ayuda para Obtener su EIN o Formar su Empresa en EE.UU.?

En **GUIA NEGOCIOS**, somos especialistas en ayudar a emprendedores hispanos — tanto residentes en Estados Unidos como no residentes en el extranjero — a registrar su empresa (LLC / C-Corp), tramitar su número EIN de forma segura ante el IRS y configurar sus cuentas bancarias comerciales.

**¿Listo para formalizar su negocio en EE.UU.?** [Póngase en contacto con nuestro equipo de consultores bilingües](/es/contact) hoy mismo para una asesoría personalizada.
`
  },
  'importance-of-ein-number': {
    title: "EIN Guide: How to Get an EIN Without an SSN",
    slug: "importance-of-ein-number",
    altSlug: "importancia-de-numero-ein",
    lang: "en",
    date: "2026-08-10",
    excerpt: "Complete guide for non-residents and Hispanic entrepreneurs: how to file for an IRS EIN without a Social Security Number (SSN), open U.S. business bank accounts, and prevent penalties.",
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    tags: ["EIN", "Non-Residents", "IRS", "U.S. LLC", "Hispanic Business"],
    readTime: 7,
    content: `
If you are planning to launch or formalize a business in the United States from Latin America, Spain, or as a Hispanic resident in the U.S. without a Social Security Number (SSN), the **Employer Identification Number (EIN)** is the foundational element required to operate legally.

Many entrepreneurs mistakenly assume that registering a U.S. company and opening a commercial bank account requires U.S. citizenship or physical residency. **This is completely false.**

In this comprehensive guide, we explain how the EIN works for **non-resident clients and Hispanic entrepreneurs**, step-by-step procedures to obtain it directly from the IRS, and critical tax mistakes to avoid.

---

## What is an EIN Number and Why is it Essential for Non-Residents?

An **Employer Identification Number (EIN)** is a unique 9-digit number (\`XX-XXXXXXX\`) issued by the **IRS (Internal Revenue Service)** to commercial entities in the United States. It functions as your business's federal tax ID number.

![U.S. Business Documentation](https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop)

### Why does a non-resident or Hispanic entrepreneur need an EIN?

1. **U.S. Commercial Bank Account Opening:** Both physical and digital banks (such as Mercury, Relay Financial, Chase, or Bank of America) require the official EIN confirmation letter to open a business bank account in your LLC's name.
2. **International Payment Gateways:** Platforms such as **Stripe, PayPal Business, Square, and Shopify Payments** require an EIN to verify your business and payout sales revenue in $USD.
3. **Corporate Contracting & W-9 Compliance:** If you provide services to U.S. corporate clients (construction, janitorial, consulting, software engineering), they will request a Form W-9 featuring your EIN to process payments cleanly.
4. **Personal Identity Protection:** Eliminates the need to share personal IDs or personal ITIN numbers on public invoices.

---

## Real-World Case Studies & Practical Examples

To illustrate how obtaining an EIN transforms operations for Hispanic business owners, let's review two real scenarios:

### Case 1: Mateo (Non-Resident Entrepreneur in Latin America)
Mateo lives in Bogotá, Colombia, running a digital agency and e-commerce business serving U.S. clients. He formed a **Tennessee LLC** through GUIA NEGOCIOS but does not possess a U.S. Social Security Number or U.S. address.

* **EIN Solution:** We filed his EIN application directly with the IRS using the specialized international non-resident fax protocol (Form SS-4). Armed with his official **IRS Form CP 575 / 147C**, Mateo successfully opened a U.S. dollar business account via Relay Financial and linked his Stripe account to collect payments globally in USD.

### Case 2: Maria & Jose (Hispanic Business Owners in Tennessee with ITIN)
Maria and Jose launched a commercial and residential cleaning service in Knoxville, TN. Both operate using an **ITIN (Individual Taxpayer Identification Number)**. When bidding for a major commercial office building contract, the client required proof of corporate tax registration and business insurance.

* **EIN Solution:** With GUIA NEGOCIOS' guidance, they obtained a corporate EIN for their LLC. This allowed them to set up a dedicated local business bank account in Knoxville, issue formal tax-compliant invoices with their EIN, and secure institutional commercial contracts.

---

## Can You Obtain an EIN Without a Social Security Number (SSN)?

Yes, 100% legal! The IRS **does not require** a business owner to be a U.S. resident or hold a Social Security Number to issue an EIN for a valid U.S. business entity.

![IRS Tax Forms](https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?q=80&w=1200&auto=format&fit=crop)

### How is the Non-Resident Application Process Handled?

* **U.S. Residents with SSN:** Can apply online through the IRS web portal for instant generation.
* **Non-US Residents (Without SSN):** Must submit **IRS Form SS-4 (Application for Employer Identification Number)** indicating Foreign Owner status without an SSN. The document is submitted directly to the **IRS International Unit via dedicated Fax or Mail**.
* **Processing Time:** International non-resident fax filings typically take between 4 to 15 business days depending on IRS workload.

---

## Comparison: EIN vs. ITIN vs. SSN

It is common to confuse these three U.S. tax identifiers. Here is a clear breakdown:

| Acronym | Official Name | Intended For | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **SSN** | Social Security Number | U.S. Citizens & Legal Permanent Residents | Personal identification and U.S. employment. |
| **ITIN** | Individual Taxpayer Identification Number | Foreign individuals or residents without SSN | Personal individual U.S. tax filings. |
| **EIN** | Employer Identification Number | **Businesses (LLCs, Corporations, Partnerships)** | Commercial banking, invoicing, and business tax filings. |

---

## Critical Tax Mistakes Non-Residents Must Avoid

![Legal & Tax Advisory](https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop)

1. **Failing to File Annual Form 5472 / 1120 (Foreign-Owned LLC Reporting):** Single-member LLCs owned by non-U.S. residents (*Foreign-Owned Single-Member LLCs*) must file annual informational returns **Form 1120 and Form 5472** with the IRS. Failure to file this report carries an automatic **$25,000 USD penalty** per year from the IRS.
2. **Confusing Federal EIN with State Business Licensing:** Obtaining an EIN is a federal tax step. Depending on the state where your LLC is registered (such as Tennessee), you must also complete state revenue registration.
3. **Overpaying Unverified Third-Party Brokers:** Ensure you partner with trusted advisory specialists who deliver official **IRS CP 575 confirmation letters** issued directly in your business name.

---

## Need Assistance Getting Your EIN or Registering a U.S. Business?

At **GUIA NEGOCIOS**, we specialize in assisting Hispanic entrepreneurs — both U.S. residents and non-resident international founders — with entity formation (LLC / C-Corp), IRS EIN processing, and setting up business bank accounts.

**Ready to launch your U.S. business with confidence?** [Contact our bilingual business advisory team](/en/contact) today for a personalized consultation.
`
  },
  'como-iniciar-llc-knoxville': {
    title: "Cómo Iniciar una LLC en Knoxville, TN: Guía Paso a Paso",
    slug: "como-iniciar-llc-knoxville",
    altSlug: "how-to-start-llc-knoxville",
    lang: "es",
    date: "2026-08-04",
    excerpt: "Guía paso a paso para emprendedores hispanos: cómo registrar una LLC en Tennessee, costos, licencias locales en Knox County y cumplimiento fiscal.",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["LLC", "Tennessee", "Knoxville", "Registro Empresarial"],
    readTime: 8,
    content: `
Iniciar un negocio es un paso emocionante — y en Tennessee, formar una LLC (Compañía de Responsabilidad Limitada) es una de las formas más inteligentes de protegerse mientras construye algo de lo que puede estar orgulloso. Ya sea que usted sea jardinero, dueño de un servicio de limpieza, vendedor de comida, o esté lanzando cualquier tipo de negocio pequeño en Knoxville, esta guía lo lleva por todo el proceso en un lenguaje claro.

![Business Planning](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop)

## ¿Por Qué Elegir una LLC?

Una LLC le da lo mejor de ambos mundos:

- **Protección de bienes personales** — Su cuenta bancaria personal, automóvil y casa están separados de las deudas del negocio.
- **Flexibilidad fiscal** — Las LLCs pueden tributar como empresa individual, sociedad, o incluso como S-Corp.
- **Credibilidad** — Los clientes y proveedores confían más en negocios registrados que en operaciones informales.
- **Simplicidad** — Las LLCs de Tennessee tienen un papeleo mínimo comparado con las corporaciones.

## Sección Especial: ¿Pueden los Extranjeros No Residentes Iniciar una LLC?

Una de las preguntas más comunes que recibimos es si un no residente de EE. UU. o un extranjero que vive en otro país puede iniciar una LLC en Tennessee. ¡La respuesta es **SÍ**! No necesita ser ciudadano o residente de EE. UU. para formar una LLC en Tennessee.

> **Importante:** Aunque Delaware y Wyoming son famosos para las LLC de propiedad extranjera, Tennessee es una excelente y sencilla opción si planea hacer negocios físicos aquí o prefiere un estado sin impuestos sobre la renta.

Esto es lo que necesita saber como extranjero no residente:

1. **No se requiere SSN:** No necesita un Número de Seguro Social (SSN) para obtener un Número de Identificación del Empleador (EIN). Puede solicitar un EIN utilizando el Formulario SS-4.
2. **ITIN:** Si planea presentar impuestos en EE. UU., eventualmente podría necesitar un Número de Identificación Personal del Contribuyente (ITIN).
3. **El Agente Registrado es Obligatorio:** Debido a que no tiene una dirección física en Tennessee, *debe* contratar a un Agente Registrado comercial para manejar sus documentos legales en el estado.
4. **Banca:** Abrir una cuenta bancaria tradicional en EE. UU. a menudo requiere ir a una sucursal en persona. Sin embargo, las soluciones modernas de tecnología financiera (como Mercury o Wise) son alternativas fantásticas que atienden a fundadores extranjeros.

![Global Business](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop)

## Paso 1: Elija el Nombre de Su Negocio

El nombre de su LLC debe ser único en Tennessee. Puede buscar en la [base de datos de nombres comerciales del Secretario de Estado de Tennessee](https://tnbear.tn.gov/ECommerce/FilingSearch.aspx) para verificar la disponibilidad.

**Requisitos:**
- Debe incluir "LLC" o "Limited Liability Company"
- No puede ser igual a un negocio registrado existente en TN
- No puede incluir palabras restringidas como "Bank" o "Insurance" sin aprobación especial

> **Consejo:** Elija un nombre que funcione tanto en inglés como en español si atiende a una comunidad bilingüe.

## Paso 2: Elija un Agente Registrado

Toda LLC de Tennessee debe tener un **agente registrado** — una persona o empresa autorizada para recibir documentos legales en nombre de su negocio. Puede ser:

- Usted mismo (debe tener una dirección física en TN)
- Un amigo o familiar de confianza
- Un servicio profesional de agente registrado ($50–$150/año)

## Paso 3: Presente Sus Artículos de Organización

Este es el documento oficial que crea su LLC. Preséntelo ante el Secretario de Estado de Tennessee:

- **En línea:** A través del [sitio web del Secretario de Estado de TN](https://tnbear.tn.gov/ECommerce/Filing.aspx)
- **Costo de presentación:** $300 por miembro (mínimo $300)
- **Tiempo de procesamiento:** Generalmente 3–5 días hábiles en línea

## Paso 4: Obtenga Su EIN

Su **Employer Identification Number (EIN)** es como un número de Seguro Social para su negocio. Lo necesita para:
- Abrir una cuenta bancaria comercial
- Contratar empleados
- Presentar impuestos comerciales

**¿La mejor parte?** Es completamente gratis obtenerlo a través del [sitio web del IRS](https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online). Se genera al instante para residentes con SSN o en pocos días por fax para extranjeros.

## Paso 5: Regístrese para los Impuestos de Tennessee

A través del portal **TNTAP** (Tennessee Taxpayer Access Point), regístrese para:
- **Impuesto sobre las Ventas** (Sales Tax): Si vende bienes o servicios gravables
- **Impuesto de Franquicia e Impuestos Especiales** (Franchise & Excise Tax): Obligatorio para todas las LLCs de Tennessee
- **Impuesto Comercial Local** (Business Tax): Para negocios con ingresos brutos superiores a $10,000 en Knox County

## Paso 6: Obtenga Licencias y Permisos Locales

Dependiendo de su tipo de negocio, es posible que necesite:
- **Licencia Comercial del Condado de Knox** (a través de la oficina del Knox County Clerk)
- **Licencia Comercial de la Ciudad de Knoxville** (si está dentro de los límites de la ciudad)
- **Permisos de Salud** (para negocios de comida)
- **Licencias Profesionales** (para contratistas, cosmetología, etc.)

---

## ¿Necesita Ayuda?

Iniciar un negocio es un gran paso, pero no tiene que hacerlo solo. En **Guia Negocios**, ayudamos a emprendedores hispanos en Knoxville y todo Tennessee con cada paso del proceso:

- Selección de nombre y verificación de disponibilidad
- Presentación de Artículos de Organización
- Registro de EIN
- Registro fiscal en TNTAP
- Licencias locales del Condado de Knox

[Contáctenos hoy](/es/contact) para una consulta gratuita y comencemos a construir su negocio.
`
  },
  'how-to-start-llc-knoxville': {
    title: "How to Start an LLC in Knoxville, TN: Step-by-Step Guide",
    slug: "how-to-start-llc-knoxville",
    altSlug: "como-iniciar-llc-knoxville",
    lang: "en",
    date: "2026-08-04",
    excerpt: "Step-by-step guide for Latino entrepreneurs and business owners: how to register an LLC in Tennessee, costs, Knox County licenses, and tax compliance.",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["LLC", "Tennessee", "Knoxville", "Business Registration"],
    readTime: 8,
    content: `
Starting a business is an exciting step — and in Tennessee, forming an LLC (Limited Liability Company) is one of the smartest ways to protect yourself while building something you can be proud of. Whether you’re a landscaper, a cleaning service owner, a food vendor, or launching any type of small business in Knoxville, this guide walks you through every step in plain, simple English.

![Business Planning](https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop)

## Why Choose an LLC?

An LLC gives you the best of both worlds:

- **Personal asset protection** — Your personal bank account, car, and home are separated from business debts.
- **Tax flexibility** — LLCs can be taxed as a sole proprietorship, partnership, or even an S-Corp.
- **Credibility** — Customers and vendors take registered businesses more seriously than informal operations.
- **Simplicity** — Tennessee LLCs have minimal ongoing paperwork compared to corporations.

## Special Section: Can Non-Resident Foreigners Start an LLC?

One of the most common questions we receive is whether a non-US resident or an alien living in another country can start an LLC in Tennessee. The answer is a resounding **YES**! You do not need to be a US citizen or US resident to form a Tennessee LLC.

> **Key Takeaway:** While Delaware and Wyoming are famous for foreign-owned LLCs, Tennessee is a great and straightforward choice if you plan on doing physical business here or prefer a state with no individual state income tax.

Here is what you need to know as a non-resident alien:

1. **No SSN Required:** You do not need a Social Security Number (SSN) to get an Employer Identification Number (EIN). You can apply for an EIN using Form SS-4.
2. **ITIN:** If you plan on filing US taxes, you may eventually need an Individual Taxpayer Identification Number (ITIN).
3. **Registered Agent is Mandatory:** Because you don't have a physical address in Tennessee, you *must* hire a commercial Registered Agent to handle your state legal docs.
4. **Banking:** Opening a traditional US bank account often requires visiting a branch in person. However, modern fintech solutions (like Mercury or Wise) are fantastic alternatives that cater to foreign founders.

![Global Business](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop)

## Step 1: Choose Your Business Name

Your LLC name must be unique in Tennessee. You can search the [Tennessee Secretary of State business name database](https://tnbear.tn.gov/ECommerce/FilingSearch.aspx) to check availability.

**Requirements:**
- Must include "LLC" or "Limited Liability Company"
- Cannot match an existing registered business in TN
- Cannot include restricted words like "Bank" or "Insurance" without special approval

> **Tip:** Choose a name that works well in both English and Spanish if you serve a bilingual community.

## Step 2: Choose a Registered Agent

Every Tennessee LLC must have a **registered agent** — a person or business authorized to receive legal documents on behalf of your business. This can be:

- Yourself (must have a physical address in TN)
- A trusted friend or family member
- A professional registered agent service ($50–$150/year)

## Step 3: File Your Articles of Organization

This is the official document that creates your LLC. File it with the Tennessee Secretary of State:

- **Online:** Through the [TN Secretary of State website](https://tnbear.tn.gov/ECommerce/Filing.aspx)
- **Filing fee:** $300 minimum ($50 per member, min $300)
- **Processing time:** Usually 3–5 business days online

## Step 4: Get Your EIN

Your **Employer Identification Number (EIN)** is like a Social Security number for your business. You need it to:
- Open a business bank account
- Hire employees
- File business taxes

**Best part?** It's completely free through the [IRS website](https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online).

## Step 5: Register for Tennessee State Taxes

Through the **TNTAP** (Tennessee Taxpayer Access Point) portal, register for:
- **Sales Tax** (if selling taxable goods or services)
- **Franchise & Excise Tax** (required for all Tennessee LLCs)
- **Business Tax** (if gross receipts exceed $10,000 in Knox County)

## Step 6: Get Local Licenses and Permits

Depending on your business type, you may need:
- **Knox County Business License** (via Knox County Clerk)
- **City of Knoxville Business License** (if inside city limits)
- **Health Department Permits** (for food operations)
- **Professional Licenses** (contractors, cosmetology, etc.)

---

## Need Help?

Starting a business is a big step, but you don't have to do it alone. At **Guia Negocios**, we help entrepreneurs in Knoxville and throughout Tennessee with every step of the process:

- Name search and reservation
- Articles of Organization filing
- EIN registration
- TNTAP tax setup
- Knox County local licensing

[Contact us today](/en/contact) for a free consultation and let's get your business up and running!
`
  },
  'como-iniciar-una-llc-en-knoxville-tn': {
    title: "Cómo Iniciar una LLC en Knoxville, TN: Guía Paso a Paso",
    slug: "como-iniciar-llc-knoxville",
    altSlug: "how-to-start-llc-knoxville",
    lang: "es",
    date: "2026-08-04",
    excerpt: "Guía paso a paso para emprendedores hispanos: cómo registrar una LLC en Tennessee, costos, licencias locales en Knox County y cumplimiento fiscal.",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["LLC", "Tennessee", "Knoxville", "Registro Empresarial"],
    readTime: 8,
    content: ``
  },
  'how-to-start-an-llc-in-knoxville-tn': {
    title: "How to Start an LLC in Knoxville, TN: Step-by-Step Guide",
    slug: "how-to-start-llc-knoxville",
    altSlug: "como-iniciar-llc-knoxville",
    lang: "en",
    date: "2026-08-04",
    excerpt: "Step-by-step guide for Latino entrepreneurs and business owners: how to register an LLC in Tennessee, costs, Knox County licenses, and tax compliance.",
    featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["LLC", "Tennessee", "Knoxville", "Business Registration"],
    readTime: 8,
    content: ``
  }
};

/**
 * Get all blog posts for a given language, sorted by date (newest first).
 */
export async function getBlogPosts(lang: 'en' | 'es'): Promise<BlogPost[]> {
  try {
    const postsQuery = query(collection(db, 'blogs'), where('status', '==', 'Published'));
    const snapshot = await getDocs(postsQuery);
    const posts: BlogPost[] = [];
  
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.status !== 'Published') return;
      const hasLang = lang === 'en' ? !!data.titleEn : !!data.titleEs;
      if (hasLang) {
        let postDate = data.publishDate || (data.createdAt ? data.createdAt.split('T')[0] : '2026-08-10');
        if (postDate > '2026-08-16') {
          postDate = '2026-08-10';
        }

        const fallbackImg = (data.slugEs?.includes('knoxville') || data.slugEn?.includes('knoxville'))
          ? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop';

        let post: BlogPost = {
          title: lang === 'en' ? (data.titleEn || data.title) : (data.titleEs || data.title),
          slug: lang === 'en' ? (data.slugEn || data.slug) : (data.slugEs || data.slug),
          date: postDate,
          author: data.author || 'Guia Negocios Team',
          excerpt: data.metaDesc || '',
          lang: lang,
          altSlug: lang === 'en' ? (data.slugEs || data.slug) : (data.slugEn || data.slug),
          tags: data.keywords || [],
          content: lang === 'en' ? (data.contentEn || data.content) : (data.contentEs || data.content),
          featuredImage: data.featuredImage || fallbackImg,
          authorAvatar: data.authorAvatar || '/images/team-avatar.webp',
          readTime: data.readTime || 7,
        };

        posts.push(post);
      }
    });
    
    if (posts.length > 0) {
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return posts;
    }
    throw new Error('No published posts in Firestore, using static overrides');
  } catch (error) {
    const fallbackPosts: BlogPost[] = Object.entries(POST_OVERRIDES)
      .filter(([slug, p]) => p.lang === lang && p.content && p.content.length > 0)
      .map(([slug, p]) => ({
        title: p.title || slug,
        slug: p.slug || slug,
        date: p.date || '2026-08-10',
        author: p.author || 'Guia Negocios Team',
        excerpt: p.excerpt || '',
        lang: lang,
        altSlug: p.altSlug || slug,
        tags: p.tags || [],
        content: p.content || '',
        featuredImage: p.featuredImage || (slug.includes('knoxville') ? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'),
        authorAvatar: p.authorAvatar || '/images/team-avatar.webp',
        readTime: p.readTime || 7,
      }));
    fallbackPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return fallbackPosts;
  }
}

/**
 * Get a single blog post by slug and language.
 */
export async function getBlogPost(slug: string, lang: 'en' | 'es'): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(lang);
  return posts.find(post => post.slug === slug);
}

/**
 * Get all slugs for a given language (used by getStaticPaths).
 */
export async function getBlogSlugs(lang: 'en' | 'es'): Promise<string[]> {
  const posts = await getBlogPosts(lang);
  return posts.map(post => post.slug);
}

/**
 * Convert markdown content to HTML.
 * Handles headings, paragraphs, bold, italic, links, code, lists, tables, and horizontal rules.
 */
export function markdownToHtml(md: string): string {
  if (!md) return '';
  const lines = md.split('\n');
  const html: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let inTable = false;
  let tableRowIndex = 0;
  let htmlDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check opening and closing HTML block elements
    const openTags = (trimmed.match(/<(div|svg|table|section|article|header|footer|figure|blockquote|details|style)\b[^>]*>/gi) || []).length;
    const closeTags = (trimmed.match(/<\/(div|svg|table|section|article|header|footer|figure|blockquote|details|style)>/gi) || []).length;

    // Check if we are in an active HTML block or starting one
    if (htmlDepth > 0 || openTags > 0 || trimmed.startsWith('<') || trimmed.startsWith('<!--')) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      if (inTable) { html.push('</tbody></table></div>'); inTable = false; }
      
      html.push(line);
      htmlDepth += openTags - closeTags;
      if (htmlDepth < 0) htmlDepth = 0;
      continue;
    }
    
    // Table detection
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        if (inList) { html.push(`</${listType}>`); inList = false; }
        inTable = true;
        tableRowIndex = 0;
        html.push('<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse">');
      }
      
      // Check if separator row (|---|---|)
      const isSep = line.replace(/\|/g, '').replace(/-/g, '').replace(/:/g, '').trim() === '';
      if (isSep) {
        tableRowIndex++;
        continue;
      }
      
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map(c => c.trim());
      const isHeader = tableRowIndex === 0;
      const tag = isHeader ? 'th' : 'td';
      const headerClass = isHeader ? ' class="font-semibold text-brand-dark border-b-2 border-slate-300 pb-2 px-4 py-2 bg-slate-50"' : ' class="border-b border-slate-200 px-4 py-2"';
      
      if (isHeader) html.push('<thead>');
      html.push('<tr>');
      for (const cell of cells) {
        html.push(`<${tag}${headerClass}>${inlineMarkdown(cell)}</${tag}>`);
      }
      html.push('</tr>');
      if (isHeader) html.push('</thead><tbody>');
      
      tableRowIndex++;
      continue;
    } else if (inTable) {
      html.push('</tbody></table></div>');
      inTable = false;
      tableRowIndex = 0;
    }
    
    // Horizontal rule
    if (trimmed.match(/^---+$/)) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      html.push('<hr class="my-8 border-slate-200" />');
      continue;
    }
    
    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      const level = headingMatch[1].length;
      const text = inlineMarkdown(headingMatch[2]);
      const classes: Record<number, string> = {
        2: 'text-2xl font-heading text-brand-dark mt-10 mb-4 font-bold',
        3: 'text-xl font-heading text-brand-dark mt-8 mb-3 font-semibold',
        4: 'text-lg font-semibold text-brand-dark mt-6 mb-2',
      };
      html.push(`<h${level} class="${classes[level] || 'font-heading text-brand-dark mt-6 mb-2'}">${text}</h${level}>`);
      continue;
    }
    
    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      const text = inlineMarkdown(line.replace(/^[-*]\s+/, ''));
      if (!inList || listType !== 'ul') {
        if (inList) html.push(`</${listType}>`);
        html.push('<ul class="list-disc list-inside space-y-2 my-4 text-brand-gray">');
        inList = true;
        listType = 'ul';
      }
      html.push(`<li>${text}</li>`);
      continue;
    }
    
    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.*)/);
    if (olMatch) {
      const text = inlineMarkdown(olMatch[1]);
      if (!inList || listType !== 'ol') {
        if (inList) html.push(`</${listType}>`);
        html.push('<ol class="list-decimal list-inside space-y-2 my-4 text-brand-gray">');
        inList = true;
        listType = 'ol';
      }
      html.push(`<li>${text}</li>`);
      continue;
    }
    
    // Blockquotes
    if (line.startsWith('>')) {
      if (inList) { html.push(`</${listType}>`); inList = false; }
      const text = inlineMarkdown(line.replace(/^>\s*/, ''));
      html.push(`<blockquote class="border-l-4 border-brand-primary bg-[#F2F7F4] py-3 px-5 rounded-r-xl my-5 text-brand-dark italic shadow-xs">${text}</blockquote>`);
      continue;
    }

    // Close list if we hit a non-list line
    if (inList && trimmed === '') {
      html.push(`</${listType}>`);
      inList = false;
      continue;
    }
    
    // Empty line
    if (trimmed === '') {
      continue;
    }
    
    // Paragraph
    if (inList) { html.push(`</${listType}>`); inList = false; }
    html.push(`<p class="text-brand-gray leading-relaxed mb-4">${inlineMarkdown(line)}</p>`);
  }
  
  // Close any open elements
  if (inList) html.push(`</${listType}>`);
  if (inTable) html.push('</tbody></table></div>');
  
  return html.join('\n');
}

/**
 * Process inline markdown: bold, italic, code, links.
 */
function inlineMarkdown(text: string): string {
  // Images with guaranteed descriptive alt attribute and responsive lazy loading
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, url) => {
    const cleanAlt = (altText && altText.trim()) 
      ? altText.trim().replace(/"/g, '&quot;')
      : 'GUIA NEGOCIOS - Hispanic Business Consulting and LLC Setup Graphic';
    return `<img src="${url}" alt="${cleanAlt}" loading="lazy" decoding="async" class="rounded-xl shadow-sm my-6 w-full object-cover max-h-[500px]" />`;
  });

  // Code (backticks)
  text = text.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-brand-primary px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
  
  // Links (must happen after images so it doesn't match the image alt text)
  text = text.replace(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-primary hover:underline font-medium">$1</a>');
  
  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-brand-dark">$1</strong>');
  
  // Italic
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  return text;
}

/**
 * Format a date string into a human-readable format.
 */
export function formatDate(dateStr: string, lang: 'en' | 'es'): string {
  const date = new Date(dateStr + 'T00:00:00');
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
}

/**
 * Process HTML content to inject IDs into headings and extract a Table of Contents.
 */
export function processHtmlForBlog(html: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  
  const processedHtml = html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/g, (match, levelStr, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const level = parseInt(levelStr, 10);
    
    // Only add if not already has an ID (prevent dupes if Quill adds one)
    if (!attrs.includes('id=')) {
      attrs = ` id="${id}"` + attrs;
    }
    
    toc.push({ id, text: plainText, level });
    return `<h${level}${attrs}>${text}</h${level}>`;
  });
  
  return { html: processedHtml, toc };
}
