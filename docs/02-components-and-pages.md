# Component Catalogue & Page Hierarchy — Guia Negocios

## 1. Page Hierarchy & Routing Map

The application routes are structured strictly into three domain sections:

### A. Root (Spanish Home)
* `/src/pages/index.astro` — Spanish homepage. Spanish is the default locale and is served at the site root, so this is the real `/es` home content rather than a locale-detecting redirect.

### B. English Public Portal (`/src/pages/en/`)
* `/en/index.astro` — Homepage featuring business value propositions, service highlights, and testimonials.
* `/en/about.astro` — Company history, mission, vision, and team overview in Knoxville, TN.
* `/en/services.astro` — Comprehensive listing of consultancy tiers and launch packages.
* `/en/services/operations-growth.astro` — Tier 06 Operations & Growth Systems detailed service guide.
* `/en/services/complete-launch-bundle.astro` — Tier 05 Complete Business Launch Bundle detailed service guide.
* `/en/services/creedava-support.astro` — Tier 07 CreedaVA Ongoing Support guide.
* `/en/blog.astro` — Public blog feed listing published articles from Firestore.
* `/en/blog/[slug].astro` — Dynamic article viewer rendering transformed markdown and Table of Contents.
* `/en/blog/view.astro` — Client-hydration shell served by the `validateSlugRewrite` function for live blog slugs.
* `/en/faq.astro` — FAQ catalogue with category filter and live search.
* `/en/contact.astro` — Consultation intake form and direct contact channels.
* `/en/lp/[slug].astro` — Dynamic landing page generator for targeted marketing campaigns.
* `/en/lp/view.astro` — Landing-page hydration shell used by the LP rewrite flow.

### C. Spanish Public Portal (`/src/pages/es/`)
* `/es/index.astro` — 301-redirects `/es/` to `/` (the Spanish home is the root `index.astro`; see §A).
* `/es/about.astro` — Historia de la empresa, misión, visión y equipo en Knoxville, TN.
* `/es/services.astro` — Catálogo completo de servicios de consultoría y paquetes de lanzamiento.
* `/es/services/operaciones-crecimiento.astro` — Tier 06, Guía detallada de Sistemas de Operación y Crecimiento.
* `/es/services/paquete-lanzamiento-completo.astro` — Tier 05, Guía detallada del Paquete Completo de Lanzamiento.
* `/es/services/apoyo-creedava.astro` — Tier 07, Guía de Apoyo Continuo con CreedaVA.
* `/es/blog.astro` — Feed público del blog con artículos publicados desde Firestore.
* `/es/blog/[slug].astro` — Visor dinámico de artículos con tabla de contenidos.
* `/es/blog/view.astro` — Shell de hidratación servido por la función `validateSlugRewrite` para slugs de blog en vivo.
* `/es/faq.astro` — Catálogo de preguntas frecuentes con filtro por categoría y búsqueda.
* `/es/contact.astro` — Formulario de contacto y consulta de negocios.
* `/es/lp/[slug].astro` — Generador dinámico de páginas de aterrizaje.
* `/es/lp/view.astro` — Shell de hidratación de landing pages usado por el flujo de rewrite.

### D. Administrative Suite (`/src/pages/admin/`)
* `/admin/login.astro` — Admin authentication gateway.
* `/admin/dashboard.astro` — Central operations overview & metrics.
* `/admin/blog.astro` — Blog post collection manager (List, filter, status, delete).
* `/admin/blog/editor.astro` — EasyMDE Markdown Editor with Gemini AI draft copilot.
* `/admin/seo-agent.astro` — SEO Agent command center: 7-day autonomous skill schedule, per-skill manual runs, kill switch, site-wide Gemini audit (writes `seoAudits`), and recent agent runs.
* `/admin/keywords.astro` — Keyword rank tracking tool.
* `/admin/backlinks.astro` — Backlink index monitor.
* `/admin/reports.astro` — Analytics & conversion report generator.
* `/admin/landing-pages.astro` & `/builder.astro` — Landing page campaign manager & visual builder.
* `/admin/analytics.astro` — GA4 traffic dashboard (sources, top pages, geography).
* `/admin/backlinks/outreach.astro` — Link-outreach campaign manager (targets + AI email drafts).
* `/admin/settings.astro` — Site configuration & API integrations manager.

---

## 2. Shared Layout Components

### `BaseLayout.astro`
Wraps all public pages.
* **Props:** `title: string`, `description: string`, `ogImage?: string`, `altPath?: string`, `noindex?: boolean`, `noTracking?: boolean`
* **Features:** Injects canonical tags, bilingual `hreflang` metadata, OpenGraph tags, JSON-LD Schema.org metadata, header slot, and footer slot.
* `noindex` defaults to `false`; it is set by `404.astro` (reproducing the `noindex` that Astro adds to redirect pages) and across the whole `/admin/*` surface via `AdminLayout` and the standalone `admin/login.astro`.

### `AdminLayout.astro`
Wraps all administrative dashboard pages.
* **Props:** `title: string`
* **Features:** Sidebar navigation, top header bar, user authentication guard script, modal container.

---

## 3. Reusable UI Components

* `Header.astro`: Public header with desktop/mobile responsive navigation, language toggle (`EN` / `ES`), and quick contact CTA.
* `Footer.astro`: Enterprise footer with localized links, service directory, address, and legal disclaimers.
* `FaqAccordion.astro`: Accessible accordion component for frequently asked questions. Rendered by **both** `/services` pages — if it is imported but not rendered the page still emits FAQPage schema with no visible FAQ, which is a structured-data violation.
* `LegalDisclaimer.astro`: Legal-advice disclaimer. Takes no props and derives its language from the URL. Shown on the blog index, blog posts, both `/services` pages and the six service guides — deliberately **not** on the homepage.
* `AeoInjector.astro`: Emits FAQPage JSON-LD from the `seoSchemas` collection. Rendered once by `BaseLayout`, so it runs on every public page, but a schema is only emitted when the page path matches the schema's keyword.
  * **The homepage emits none, by design.** The generator writes questions by simulating "People Also Ask"; verified 2026-09-24 that **0** of its 32 unique questions appeared anywhere in the rendered homepage (the page has zero `<details>` elements). FAQPage markup must describe visible content, so the homepage case was removed. The filter also guards the empty-token case — `slug.includes('')` is always true, so an unguarded root path would match *every* schema.
  * **Do not dedupe these schemas by keyword.** The generator stores each keyword under two documents (a space-form id and a hyphen-form id) which looks like duplication, but the live pairs hold **different** questions — 32 unique across the 10 documents. Collapsing them kept only 18 and dropped 14. Attempted and reverted twice.
