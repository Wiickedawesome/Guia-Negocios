# Troubleshooting & Architectural Decision Records (ADR) — Guia Negocios

## 1. Common Issues & Troubleshooting

### Issue 1: Firebase Permission Denied on Firestore Queries
* **Symptom:** `FirebaseError: Missing or insufficient permissions` when fetching blog documents or saving in `/admin/blog/editor`.
* **Cause:** `firestore.rules` is blocking access or authentication context is unverified.
* **Fix:** Inspect `firestore.rules`. Public read is granted per collection (`blogs`, `landingPages`, `seoSchemas`), and unauthenticated **create** is granted for `contacts` / `notifications` / `mail`. Everything else is admin-only, and "admin" is an **email** check — `email.lower().matches('.*@guianegocios[.]net')` — not merely `request.auth != null`.
* **Note:** `endsWith` is **not** a valid rules function and fails validation silently; use the `matches()` form above. Admin pages and the blog editor additionally depend on App Check being satisfied (see `docs/04-firebase-and-cms.md`).

### Issue 2: EasyMDE Editor Fails to Render on Astro Hydration
* **Symptom:** Textarea displays as plain text without Markdown toolbars in `/admin/blog/editor`.
* **Cause:** EasyMDE requires browser DOM window context (`window`, `document`) which is not available during Astro SSG build step.
* **Fix:** Wrap EasyMDE initialization inside client scripts (`<script>` tag with `is:inline` or inside `DOMContentLoaded` event listener).

### Issue 3: Broken Relative Links between English and Spanish Pages
* **Symptom:** User clicks language switcher and ends up on a 404 page.
* **Cause:** Route slug mismatch between `/en/` and `/es/`.
* **Fix:** Use `BaseLayout.astro` automatic `alternatePath` resolution or ensure both English and Spanish page routes share standardized route targets.

---

## 2. Architectural Decision Records (ADR)

### ADR 001 — Database Migration from Markdown Files to Cloud Firestore
* **Date:** 2026-06-15
* **Status:** Approved & Implemented
* **Context:** Originally, blogs were stored as static markdown files in `src/content/blog/`. However, non-technical team members needed an online dashboard to edit, publish, and analyze post performance.
* **Decision:** Migrated blog storage to Firebase Cloud Firestore collection `blogs`, using dynamic Astro routes `/en/blog/[slug].astro` and `/es/blog/[slug].astro`.

### ADR 002 — Adoption of Gemini AI Copilot inside Admin EasyMDE Editor
* **Date:** 2026-07-02
* **Status:** Approved & Implemented
* **Context:** Content creation in both English and Spanish required significant manual formatting effort for markdown headings and imagery.
* **Decision:** Integrated Google Gemini model (`firebase/ai`) directly into `/admin/blog/editor.astro` to generate structured Markdown drafts directly into the EasyMDE instance.

### ADR 003 — Standardizing Tailwind CSS v4 Engine
* **Date:** 2026-07-20
* **Status:** Approved & Implemented
* **Context:** Tailwind CSS v4 provides native `@tailwindcss/vite` integration, reducing build times and simplifying custom brand design tokens.
* **Decision:** Updated build pipeline to Tailwind v4 and migrated brand tokens (`brand-primary`, `brand-dark`, `brand-gray`) into `src/styles/global.css`.
