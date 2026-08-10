# AI Agent Architectural Guide — Guia Negocios

> **Target Audience:** Autonomous AI coding agents, Pair programming subagents, and LLM-assisted developers.

---

## 1. System Invariants & Core Rules

As an AI agent operating within the **Guia Negocios** workspace, you **MUST** strictly uphold the following non-negotiable invariants:

### A. Bilingual Route Isolation
* Public routes are split strictly into `/src/pages/en/` (English) and `/src/pages/es/` (Spanish).
* **NEVER** place Spanish copy into an `/en/` page or English copy into an `/es/` page.
* Dynamic routes (`/en/blog/[slug].astro`, `/es/blog/[slug].astro`, `/en/lp/[slug].astro`, `/es/lp/[slug].astro`) fetch corresponding language content from Cloud Firestore based on the language path parameter.

### B. Shared UI & i18n Dictionary Pattern
* Shared navigation headers, footers, and global call-to-actions must use the translation dictionary in [src/i18n/utils.ts](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/utils.ts), which references [en.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/en.json) and [es.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/es.json).
* To add new UI text tokens, always update both `en.json` and `es.json` simultaneously.

### C. Design System & Aesthetics
* **Brand Colors:** Use custom Tailwind utility classes (`brand-primary` `#2563EB`, `brand-dark` `#0F172A`, `brand-gray` `#64748B`) defined in [src/styles/global.css](file:///home/wicked/Projects/Guia%20Negocios/src/styles/global.css). Do not use generic browser blue or dark colors.
* **Glassmorphism:** Use `bg-white/10 backdrop-blur-md border border-white/10` for card overlays and high-end modern panels.
* **Typography & Spacing:** Use `font-heading` for headers, `font-sans` for copy, `rounded-xl` or `rounded-2xl` for containers, and `shadow-xl` for depth.

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
| `src/lib/firebase.ts` | Centralized Firebase SDK setup | Exports `db` (Firestore) and `aiModel` (Gemini API) |
| `src/utils/blog.ts` | Blog markdown processor | Contains `markdownToHtml` and `processHtmlForBlog` (Auto Table of Contents generator) |
| `src/scripts/admin-utils.js` | Admin UI client helper library | Provides global window helpers `showToast()`, `showModal()`, `showConfirm()`, `simulateAction()` |
| `src/pages/admin/blog/editor.astro` | Admin Markdown Blog Editor | Embeds EasyMDE instance and Gemini AI Copilot generator |
| `functions/src/index.ts` | Firebase Cloud Functions | Serverless Node 20 TypeScript entrypoint |

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

* **Firebase Auth Guard:** Admin pages rely on client-side authentication checks; SSR middleware route protection can be added in future iterations if SSR mode is enabled.
* **EasyMDE Client Hydration:** EasyMDE requires `is:inline` or client script mounting inside Astro templates due to direct DOM manipulation.
