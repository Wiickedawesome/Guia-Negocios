# AI Agent Architectural Guide — Guia Negocios

> **Target Audience:** Autonomous AI coding agents, Pair programming subagents, and LLM-assisted developers.

---

## 1. System Invariants & Core Rules

As an AI agent operating within the **Guia Negocios** workspace, you **MUST** strictly uphold the following non-negotiable invariants:

### A. Bilingual Route Isolation
* Public routes: the Spanish home is `src/pages/index.astro` (served at `/`); Spanish subpages live in `src/pages/es/` and are served under `/es/*`; English lives in `src/pages/en/` and is served under `/en/*`. `/es` and `/es/` 301-redirect to `/`, and unprefixed subpages (e.g. `/services/`) 301-redirect to their `/es/...` equivalents — all enforced in `src/middleware.ts`.
* **NEVER** place Spanish copy into an `/en/` page or English copy into an `/es/` page.
* Dynamic routes (`/en/blog/[slug].astro`, `/es/blog/[slug].astro`, `/en/lp/[slug].astro`, `/es/lp/[slug].astro`) fetch corresponding language content from Cloud Firestore based on the language path parameter.

### B. Shared UI & i18n Dictionary Pattern
* Shared navigation headers, footers, and global call-to-actions must use the translation dictionary in [src/i18n/utils.ts](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/utils.ts), which references [en.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/en.json) and [es.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/es.json).
* To add new UI text tokens, always update both `en.json` and `es.json` simultaneously.

### C. Design System & Aesthetics

**`docs/03-styling-and-i18n.md` §1 is the authority. Read it before building or restyling any page.** Summary of the non-negotiables:

* **Brand Colors:** Use custom Tailwind utility classes (`brand-primary` `#1B4E2B` forest green, `brand-accent` `#F0C850` gold, `brand-dark` `#1A2E35`, `brand-light` `#F2F7F4`, `brand-gray` `#1E2A2F`) defined in [src/styles/global.css](file:///home/wicked/Projects/Guia%20Negocios/src/styles/global.css). Do not use generic browser blues or off-palette colours.
* **Editorial, not decorative.** Flat surfaces, hairline dividers, generous whitespace. No glassmorphism, no card shadows, no hover lift, no `rounded-3xl` content cards, no gradient hero washes, no pill badges. These were all removed in the 2026-11 redesign; reintroducing one is a regression. The only sanctioned shadows are the tier cards, the `drop-shadow-*` logo/`<h1>` image shadows, and the mobile-menu overlay — see §1.
* **Radius:** `rounded-full` for every button/CTA/nav link; `rounded-[2.5rem]` only for the four service tier cards; `rounded-2xl` for form panels and toasts; **zero radius everywhere else**.
* **Typography:** `font-heading` for headings, `font-body` for copy (both resolve to Inter — DM Sans is a fallback that is never loaded). Heroes are `font-semibold` at `text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight`.
* **Hover contract:** interactive tiles are `bg-brand-light` and fill to `hover:bg-brand-primary`; every child must switch to `text-white` / `text-white/75` / `text-brand-accent` on `group-hover` or it becomes invisible.
* **Alignment:** every section sits in `ui/Container.astro` (`max-w-7xl`, 32px left edge at ≥1280px). Do not use `max-w-5xl`/`max-w-4xl` for body sections — it breaks the shared gutter.

### C2. Adding a New Page

Copy the hero from §1.2 of the styling doc, then check, in order:

1. `<Header slot="header" />` and `<Footer slot="footer" />` are both present. This was skipped once and shipped two FAQ pages with no nav, logo or language toggle — it is the single most-missed step.
2. Hero uses the left-aligned 7xl pattern with a small-caps eyebrow; no centred text, no gradient.
3. Section bands alternate `bg-white` / `bg-slate-50` with `border-t border-slate-200`; spacing `py-16 lg:py-20`.
4. Every internal `href` is prefixed with the page's own locale (`/en/...` on English pages, `/es/...` on Spanish ones; home is `/`).
5. Add the page to both locales, then confirm the sitemap count rises by 2 after `npm run build`.
6. `LegalDisclaimer` on any page giving business/tax/LLC/EIN guidance.
7. **If the slug is translated between locales**, pass `altPath` to `<Header>` as well as `<BaseLayout>` — the header does not inherit it. See `docs/06` Issue 3.
8. No published prices, no unsourced outcome statistics.

### D. Firebase Singleton SDK Rule
* Always import pre-initialized Firebase singletons (`db` for Firestore, `aiModel` for Gemini) from [src/lib/firebase.ts](file:///home/wicked/Projects/Guia%20Negocios/src/lib/firebase.ts).
* **NEVER** re-initialize Firebase (`initializeApp()`) inside individual Astro or React UI components.

### E. Background Server Workflow
* When starting the development server, run in background mode:
  ```bash
  npx astro dev --background
  ```
* Manage background server states using `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`.

---

## 2. Directory Responsibilities & Code Map

| Directory / File | Responsibilities | Key Conventions |
| :--- | :--- | :--- |
| `src/layouts/BaseLayout.astro` | Main public site layout shell | Handles `<head>`, canonical URLs, `hreflang` tags, schema JSON-LD, header/footer slots |
| `src/layouts/AdminLayout.astro` | Admin workspace layout shell | Handles sidebar navigation, user auth check, admin head metadata |
| `src/lib/firebase.ts` | Centralized Firebase SDK setup | Exports `app`, `db` (Firestore), `auth`, `functions`, `appCheck`, and `ai` / `aiModel` (Gemini via Vertex AI) |
| `src/utils/blog.ts` | Blog markdown processor | Contains `markdownToHtml` and `processHtmlForBlog` (Auto Table of Contents generator) |
| `src/scripts/admin-utils.js` | Admin UI client helper library | Provides global window helpers `showToast()`, `showModal()`, `showConfirm()` |
| `src/pages/admin/blog/editor.astro` | Admin Markdown Blog Editor | Embeds EasyMDE instance and Gemini AI Copilot generator |
| `functions/src/index.ts` | Firebase Cloud Functions | Node.js 24 (2nd gen, `us-central1`) TypeScript entrypoint; `seo-schedules.ts` adds the scheduled/`seoAgentRun` functions |

---

## 3. Data Flow & Blog Pipeline Architecture

```
                                   [EasyMDE Editor]
                                           │
                                  (Gemini Copilot)
                                           │
                                           ▼
                                 [Cloud Firestore]
                               (Collection: 'blogs')
                                           │
                                           ▼
                  ┌────────────────────────┴────────────────────────┐
                  ▼                                                 ▼
     /en/blog/[slug].astro                               /es/blog/[slug].astro
 (Fetch doc where slugEn == slug)                   (Fetch doc where slugEs == slug)
                  │                                                 │
                  └────────────────────────┬────────────────────────┘
                                           ▼
                                [src/utils/blog.ts]
                                 • markdownToHtml()
                           • processHtmlForBlog() (ToC)
                                           │
                                           ▼
                                 [Rendered HTML Page]
```

---

## 4. Coding & File Naming Conventions

1. **Astro Components:** PascalCase naming (e.g., `Header.astro`, `FaqAccordion.astro`).
2. **Page Slugs & Routes:** Kebab-case naming (e.g., `operations-growth.astro`, `complete-launch-bundle.astro`).
3. **Utility Modules:** CamelCase naming (e.g., `blog.ts`, `admin-utils.js`).
4. **Icons & Images:** Inline SVG icons preferred over external icon fonts. Images must be stored in `public/images/` and referenced as absolute path strings (e.g., `/images/illustration1.png`).

---

## 5. Known Limitations & Technical Debt

* **`AnimatedLogoHero.astro` is dead** (zero references). Safe to delete.
* **Legal disclaimer text lives in five places** — `LegalDisclaimer.astro` plus inline copies in `about.astro` and `contact.astro` (both locales). A wording change needs five edits.
* **Firebase Auth Guard:** Admin pages rely on client-side authentication checks; SSR middleware route protection can be added in future iterations if SSR mode is enabled.
* **App Check blocks `localhost`** for admin pages and for the blog's live-post hydration (`FirebaseError: Missing or insufficient permissions`), because the debug token is not registered. Admin and hydrated blog cards must be verified on the live domain, never locally.
* **EasyMDE Client Hydration:** EasyMDE requires `is:inline` or client script mounting inside Astro templates due to direct DOM manipulation.
* **Guide slugs differ per locale.** `/es/services/paquete-lanzamiento-completo` ↔ `/en/services/complete-launch-bundle`, `operaciones-crecimiento` ↔ `operations-growth`, `apoyo-creedava` ↔ `creedava-support`. `services.astro` resolves them through the `GUIDE_SLUGS` map — never build a guide href from `/${lang}/services/<english-slug>`. `firebase.json` still carries 301s for the old cross-locale paths; those are compatibility only.
* **Translated-slug pages must pass `altPath` to `<Header>`, not just `<BaseLayout>`.** The header's default language toggle only swaps `/es` ↔ `/en` and keeps the slug, so a guide page that passes `altPath` to the layout alone ships a toggle that 404s. All six guides now pass it to both. `blog/[slug].astro` does the same with `altUrl`.
* **Link crawls will always report two unavoidable misses.** (1) Astro emits `dist/404.html`, not `dist/404/index.html`, so a crawler resolving `/404` as a directory reports it missing — Firebase Hosting serves it correctly. (2) Sitemap/canonical `hreflang` alternates for a *non-existent* locale twin are avoided via `noAlternate`; genuine twins resolve through the `firebase.json` 301s. Measured 2026-11-05: **1292 links, 0 real misses**, `/404` the only false positive. The link total is **not** stable — it grows with published content (1354 on 2026-11-06 after two more posts), so gate on "missing === 1", not on the total. Do not "fix" the `/404` hit by creating a duplicate page.

**Resolved 2026-11-05, keep them resolved:** both FAQ pages now render `<Header>` (they previously had no nav, logo or language toggle); the six service guide pages and both FAQ pages were migrated off `rounded-*`/`shadow-*` to the flat editorial surface; the header breakpoint moved from `md` to `lg` (the nav overflowed 768px by 35px); the six guide pages were restructured into the full-bleed band + numbered-rail pattern (§1.7 of the styling doc); the CTA bands' letter monograms were replaced by the white CreedaVA vector logo on the two CreedaVA guides and removed entirely from the four Guia Negocios guides.

**Resolved 2026-11-06, was open:** production ran `redesign/site-refresh-2026-11` for a day while `main` was still pre-redesign, so any CI deploy from `main` would have reverted the site. The branch was fast-forwarded into `main` (`c482972`) and production redeployed from `main`. Both now hold the same commit.
