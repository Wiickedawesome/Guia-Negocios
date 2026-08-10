# Component Catalogue & Page Hierarchy — Guia Negocios

## 1. Page Hierarchy & Routing Map

The application routes are structured strictly into three domain sections:

### A. Root Redirector
* `/src/pages/index.astro` — Detects browser locale or defaults redirect to `/en/` or `/es/`.

### B. English Public Portal (`/src/pages/en/`)
* `/en/index.astro` — Homepage featuring business value propositions, service highlights, and testimonials.
* `/en/about.astro` — Company history, mission, vision, and team overview in Knoxville, TN.
* `/en/services.astro` — Comprehensive listing of consultancy tiers and launch packages.
* `/en/services/operations-growth.astro` — Tier 05 Operations & Growth Systems detailed service guide.
* `/en/services/complete-launch-bundle.astro` — Tier 03 Complete Launch Bundle detailed service guide.
* `/en/services/creedava-support.astro` — Tier 01 Business Support & Compliance guide.
* `/en/blog.astro` — Public blog feed listing published articles from Firestore.
* `/en/blog/[slug].astro` — Dynamic article viewer rendering transformed markdown and Table of Contents.
* `/en/contact.astro` — Consultation intake form and direct contact channels.
* `/en/lp/[slug].astro` — Dynamic landing page generator for targeted marketing campaigns.

### C. Spanish Public Portal (`/src/pages/es/`)
* `/es/index.astro` — Página de inicio con propuesta de valor, servicios destacados y testimonios.
* `/es/about.astro` — Historia de la empresa, misión, visión y equipo en Knoxville, TN.
* `/es/services.astro` — Catálogo completo de servicios de consultoría y paquetes de lanzamiento.
* `/es/services/operaciones-crecimiento.astro` — Guía detallada del servicio Operaciones y Crecimiento.
* `/es/services/paquete-lanzamiento-completo.astro` — Guía detallada del Paquete de Lanzamiento Completo.
* `/es/services/apoyo-creedava.astro` — Guía de Apoyo Empresarial y Cumplimiento.
* `/es/blog.astro` — Feed público del blog con artículos publicados desde Firestore.
* `/es/blog/[slug].astro` — Visor dinámico de artículos con tabla de contenidos.
* `/es/contact.astro` — Formulario de contacto y consulta de negocios.
* `/es/lp/[slug].astro` — Generador dinámico de páginas de aterrizaje.

### D. Administrative Suite (`/src/pages/admin/`)
* `/admin/login.astro` — Admin authentication gateway.
* `/admin/dashboard.astro` — Central operations overview & metrics.
* `/admin/blog.astro` — Blog post collection manager (List, filter, status, delete).
* `/admin/blog/editor.astro` — EasyMDE Markdown Editor with Gemini AI draft copilot.
* `/admin/seo-audit.astro` — Real-time page SEO health auditor.
* `/admin/keywords.astro` — Keyword rank tracking tool.
* `/admin/backlinks.astro` — Backlink index monitor.
* `/admin/reports.astro` — Analytics & conversion report generator.
* `/admin/landing-pages.astro` & `/builder.astro` — Landing page campaign manager & visual builder.
* `/admin/settings.astro` — Site configuration & API integrations manager.

---

## 2. Shared Layout Components

### `BaseLayout.astro`
Wraps all public pages.
* **Props:** `title: string`, `description: string`
* **Features:** Injects canonical tags, bilingual `hreflang` metadata, OpenGraph tags, JSON-LD Schema.org metadata, header slot, and footer slot.

### `AdminLayout.astro`
Wraps all administrative dashboard pages.
* **Props:** `title: string`
* **Features:** Sidebar navigation, top header bar, user authentication guard script, modal container.

---

## 3. Reusable UI Components

* `Header.astro`: Public header with desktop/mobile responsive navigation, language toggle (`EN` / `ES`), and quick contact CTA.
* `Footer.astro`: Enterprise footer with localized links, service directory, address, and legal disclaimers.
* `FaqAccordion.astro`: Accessible accordion component for frequently asked questions.
