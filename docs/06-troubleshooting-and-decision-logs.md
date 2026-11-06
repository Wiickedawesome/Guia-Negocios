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
* **Gotcha — `altPath` is needed in TWO places.** `BaseLayout` computes `alternatePath` from its own `altPath` prop, but `<Header>` computes its toggle independently: with no `altPath` it only swaps `/es` ↔ `/en` and **keeps the slug**. So a page with a translated slug that passes `altPath` to the layout alone ships a toggle that 404s. This was live on all six service guides until 2026-11-05 — production's `firebase.json` 301s masked it, so it only showed in `astro dev`.
* **Detect it** by crawling `dist`: any `href` with no matching `dist/…/index.html` and no `firebase.json` redirect is a broken toggle or link. The only expected hit is `/404`, because Astro emits `dist/404.html` rather than `dist/404/index.html`. The link total itself is not stable — it grows with published content (1292 on 2026-11-05, 1354 on 2026-11-06) — so gate on "missing === 1", never on the total.

```astro
<BaseLayout … altPath="/en/services/operations-growth">
  <Header slot="header" altPath="/en/services/operations-growth" />
</BaseLayout>
```

### Issue 4: `firebase deploy` Fails with "Your credentials are no longer valid"
* **Symptom:** every deploy aborts with `Authentication Error: Your credentials are no longer valid. Please run firebase login --reauth`, even though `npx firebase login:list` prints a logged-in address.
* **Cause:** the cached refresh token has expired. `login:list` reports the *stored account*, not whether the token still works, so it looks healthy when it is not.
* **Fix:** run `npx firebase login --reauth` **interactively** — it opens a browser and needs a human sign-in. An agent cannot do this, and must not ask for the token or password. After re-auth, re-check `npx firebase use` resolves `guianegocios-prod` before deploying.
* **Note:** re-authing can switch the active account (it went from `john@creedava.com` to `info@guianegocios.net` on 2026-11-05). Confirm the account belongs to the target project before pushing to production.

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
