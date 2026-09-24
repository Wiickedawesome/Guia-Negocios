# Guia Negocios - Agent Guidelines

Welcome to the Guia de Negocios repository. Please adhere to the following architectural, design, and structural rules when assisting with code modifications or feature additions.

> **Read `docs/` before making changes.** The deep reference lives in `docs/`:
> `00-AI-AGENT-GUIDE.md` (start here), `01-architecture.md`,
> `02-components-and-pages.md`, `03-styling-and-i18n.md`,
> `04-firebase-and-cms.md` (Firestore collections, App Check, secrets),
> `05-development-and-deployment.md` (build credentials, deploy),
> `06-troubleshooting-and-decision-logs.md`, `07-backup-monitoring-rollback.md`.

## 0. Invariants - breaking these causes real damage

- **Spanish is served at the site root (`/`), English at `/en/`.** `/es/*` 301-redirects to `/`
  **by design**. Do NOT "fix" this and do NOT add Spanish pages under `/src/pages/es/` expecting
  them to be reachable at `/es/...`.
- **Never read an API key from `import.meta.env.PUBLIC_*`.** Astro inlines every `PUBLIC_*` value
  into the client bundle, shipping it to all visitors. Keys live in `settings/admin` in Firestore.
- **App Check is enforced on the callable Cloud Functions in code**, via `enforceAppCheck: true`.
  The Firebase console CANNOT enforce it for Cloud Functions - `cloudfunctions.googleapis.com` is
  not one of the services the console manages.
- **Do not dedupe `seoSchemas` by keyword.** Each keyword is stored twice (space-form and
  hyphen-form document ids). They look like duplicates but hold *different* questions.
  Collapsing them silently deletes content. Attempted and reverted twice.
- **Admin pages may not work on `localhost`** - App Check cannot be satisfied normally there.
  Verify admin UI on the live domain.

## 1. Tech Stack
- **Framework:** Astro (Static Site Generation / SSR)
- **Styling:** Tailwind CSS (Vanilla CSS is heavily supplemented by Tailwind utility classes here)
- **Backend/Database:** Firebase Firestore (18 root collections - see `docs/04-firebase-and-cms.md`)
- **AI Integration:** Google Gemini served from **Vertex AI**. In the browser it uses Firebase AI Logic
  (`firebase/ai`); from Cloud Functions it uses the Vertex **`global`** endpoint, because Gemini 3.x
  models 404 in regional locations such as `us-central1`.
- **Icons/Images:** Pexels & Unsplash stock photography, inline SVG icons.

## 2. Project Architecture
- **Bilingual Structure:** The site is fully bilingual. Spanish lives at the **root** (`/`,
  `src/pages/index.astro`); English lives under `/src/pages/en/`. `/src/pages/es/` contains the
  redirect shim only. Do not mix English and Spanish content within a single page component.
- **I18n:** Shared UI elements (like headers/footers) use the dictionary in `src/i18n/utils.ts` via
  the `useTranslations` utility. There is no `src/i18n/ui.ts`. Adding a UI string means updating
  **both** `src/i18n/en.json` and `src/i18n/es.json`.
- **Admin Dashboard:** Located under `/src/pages/admin/`. Uses `src/layouts/AdminLayout.astro`.

## 3. UI & Design Workflow
- **Brand Colors:** The design system relies heavily on `brand-primary` (blue), `brand-dark` (navy), and `brand-gray` (slate). Use these Tailwind custom classes instead of generic colors.
- **Aesthetics:** Prioritize glassmorphism (e.g., `bg-white/10 backdrop-blur-md`), soft shadows (`shadow-sm`), rounded corners (`rounded-xl`, `rounded-2xl`), and clean modern layouts.
- **Wait for Figma:** Do not build out full UI layouts or styled components until the Figma designs are provided. Use placeholders or basic structure if scaffolding is absolutely necessary.
- **Strict Page Structure:** Adhere strictly to the page separation. Each section (Home, Services, About, Contact) must remain a distinct page.

## 4. Blog & Content System
- **Database:** Blog posts are stored in **Firebase Firestore** (`blogs` collection), NOT as local markdown files in `src/content/`.
- **Editor:** The admin blog editor (`/admin/blog/editor.astro`) uses **EasyMDE** (Markdown). 
- **AI Copilot:** The blog editor includes a Gemini Copilot that injects Markdown format (with `##` headings and unique Pexels/Unsplash images) directly into the EasyMDE instance. 
- **Frontend Rendering:** Blog frontend pages (`en/blog/[slug].astro`) fetch from Firestore and process the markdown using `markdownToHtml` and `processHtmlForBlog` (which auto-generates the Table of Contents) located in `src/utils/blog.ts`.

## 5. Development 
- When starting the dev server, use background mode: `astro dev --background`
- Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.
- Firebase logic must import pre-initialized instances (`db`, `aiModel`) from `src/lib/firebase.ts`. Do not initialize Firebase apps within individual components.
