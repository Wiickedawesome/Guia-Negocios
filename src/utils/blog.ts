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
    title: "Guía de EIN para No Residentes y Emprendedores Hispanos: Cómo Obtenerlo Sin SSN",
    excerpt: "Guía completa para no residentes y emprendedores hispanos: cómo tramitar el número EIN ante el IRS sin Seguro Social (SSN), abrir cuentas bancarias en EE.UU. y evitar multas.",
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
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
    title: "EIN Guide for Non-US Residents & Hispanic Entrepreneurs: How to Get One Without an SSN",
    excerpt: "Complete guide for non-residents and Hispanic entrepreneurs: how to file for an IRS EIN without a Social Security Number (SSN), open U.S. business bank accounts, and prevent penalties.",
    featuredImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
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
  }
};

/**
 * Get all blog posts for a given language, sorted by date (newest first).
 */
export async function getBlogPosts(lang: 'en' | 'es'): Promise<BlogPost[]> {
  const postsQuery = query(collection(db, 'blogs'), where('status', '==', 'Published'));
  const snapshot = await getDocs(postsQuery);
  const posts: BlogPost[] = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    const hasLang = lang === 'en' ? !!data.titleEn : !!data.titleEs;
    if (hasLang) {
      let post: BlogPost = {
        title: lang === 'en' ? data.titleEn : data.titleEs,
        slug: lang === 'en' ? data.slugEn : data.slugEs,
        date: data.publishDate || (data.createdAt ? data.createdAt.split('T')[0] : new Date().toISOString().split('T')[0]),
        author: data.author || 'Guia Negocios Team',
        excerpt: data.metaDesc || '',
        lang: lang,
        altSlug: lang === 'en' ? data.slugEs : data.slugEn,
        tags: data.keywords || [],
        content: lang === 'en' ? data.contentEn : data.contentEs,
        featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
        authorAvatar: data.authorAvatar || '/images/team-avatar.webp',
        readTime: data.readTime || 5,
      };

      if (POST_OVERRIDES[post.slug]) {
        post = { ...post, ...POST_OVERRIDES[post.slug] };
      }

      posts.push(post);
    }
  });
  
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
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
  const lines = md.split('\n');
  const html: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let inTable = false;
  let tableRowIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Table detection
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        // Close any open list
        if (inList) { html.push(`</${listType}>`); inList = false; }
        inTable = true;
        tableRowIndex = 0;
        html.push('<div class="overflow-x-auto my-6"><table class="w-full text-left border-collapse">');
      }
      
      // Check if this is a separator row (|---|---|)
      const trimmed = line.replace(/\|/g, '').replace(/-/g, '').replace(/:/g, '').trim();
      if (trimmed === '') {
        tableRowIndex++;
        continue; // Skip separator rows
      }
      
      const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
      const isHeader = tableRowIndex === 0;
      const tag = isHeader ? 'th' : 'td';
      const headerClass = isHeader ? ' class="font-semibold text-brand-dark border-b-2 border-slate-300 pb-2 px-4 py-2"' : ' class="border-b border-slate-200 px-4 py-2"';
      
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
    if (line.match(/^---+$/)) {
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
        2: 'text-2xl font-heading text-brand-dark mt-10 mb-4',
        3: 'text-xl font-heading text-brand-dark mt-8 mb-3',
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
    
    // Close list if we hit a non-list line
    if (inList && line.trim() === '') {
      html.push(`</${listType}>`);
      inList = false;
      continue;
    }
    
    // Empty line
    if (line.trim() === '') {
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
  // Images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl shadow-sm my-6 w-full" />');

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
