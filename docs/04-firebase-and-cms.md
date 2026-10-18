# Firebase Data Architecture & Content Management System — Guia Negocios

## 1. Firebase Architecture Overview

The system interacts with Firebase via client-side SDK singletons (`src/lib/firebase.ts`) and Firebase Admin SDK in Cloud Functions.

```
                            ┌────────────────────────┐
                            │   src/lib/firebase.ts  │
                            └───────────┬────────────┘
                                        │
                       ┌────────────────┴────────────────┐
                       ▼                                 ▼
             Cloud Firestore (db)          Gemini on Vertex AI (ai / aiModel)
```

---

## 2. Cloud Firestore Schemas

### Collection: `blogs`

Each document in the `blogs` collection represents a bilingual blog article.

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `titleEn` | `string` | English title of the blog post |
| `slugEn` | `string` | English URL slug (unique identifier for `/en/blog/[slug]`) |
| `contentEn` | `string` | Markdown raw content string for English version |
| `titleEs` | `string` | Spanish title of the blog post |
| `slugEs` | `string` | Spanish URL slug (unique identifier for `/es/blog/[slug]`) |
| `contentEs` | `string` | Markdown raw content string for Spanish version |
| `status` | `string` | Publication state (`"Published"` \| `"Draft"`) |
| `publishDate` | `string` | ISO 8601 publication timestamp |
| `createdAt` | `string` | ISO 8601 creation timestamp |
| `author` | `string` | Author name or `"Equipo GUIA NEGOCIOS"` |
| `metaDesc` | `string` | Short SEO summary for meta description tags |
| `keywords` | `array<string>` | Related SEO tags and search keywords |
| `views` | `number` | Real-time page view counter |
| `targetKeyword` | `string` | Primary SEO target keyword for the post |
| `keywords` | `array<string>` | Related SEO tags used by the keyword/AEO tooling |
| `language` | `string` | Source language of the draft (`"es"` etc.) |
| `featuredImage` | `string` | Hero image URL used for the post card and OG image |
| `imageCredit` | `string` | Attribution string for the hero image (e.g. `"Photo by Unsplash"`) |
| `authorAvatar` | `string` | Path to the author avatar asset |
| `readTime` | `string` | Displayed reading-time estimate |
| `updatedAt` | `string` | ISO 8601 last-modified timestamp |

---

## 2b. Other Firestore Collections

The database currently has **18 root collections**. The public-facing content ones are:

| Collection | Access | Purpose |
| :--- | :--- | :--- |
| `blogs` | public read | Bilingual blog articles (above) |
| `landingPages` | public read | Stored HTML for `/lp/[slug]` campaign pages, injected via `set:html` |
| `seoSchemas` | public read | FAQPage JSON-LD strings emitted by `AeoInjector.astro`; each document has `keyword`, `status`, `schemaStr` |
| `settings` | admin only | Site configuration. `settings/admin` holds API keys and integration settings |
| `contacts` | create-only for anyone | Contact and LP lead submissions |
| `notifications` | create-only for anyone | Admin notification feed for the above |
| `mail` | create-only for anyone | Outbound email queue consumed by the `firestore-send-email` extension; `to` must be `info@guianegocios.net` unless the writer is an admin |
| `usedImages` | admin only | Dedupe registry so a stock photo is not reused across posts |

The remaining collections are written by the SEO agent and its admin pages: `agent-runs`, `seoAudits`, `keywords`, `keyword-gaps`, `backlinks`, `reports`, `citation-audits`, `onpage-audits`, `linkOutreach`, `integrations`. `reports` is shared — the agent writes `reports/seo-weekly__<date>` documents alongside human-created reports, which is intentional.

> **Rules summary:** public read for `blogs` / `landingPages` / `seoSchemas`; anonymous **create** for `contacts` / `notifications` / `mail`; everything else admin-only. "Admin" is determined by **email** (`email.lower().matches('.*@guianegocios[.]net')`), not by `request.auth != null`. `endsWith` is not a valid rules function and fails validation silently.

---

## 3. Markdown Transformation Pipeline (`src/utils/blog.ts`)

When a blog document is fetched from Firestore:

1. **`markdownToHtml(markdown: string)`**: Parses raw markdown into structured HTML. Replaces Unsplash image syntax with lazy-loaded `<img>` tags and formats blockquotes.
2. **`processHtmlForBlog(html: string)`**: Analyzes `<h2>` and `<h3>` tags in the HTML, injects unique `id="..."` anchor attributes, and generates a structured Table of Contents (ToC) array.

---

## 4. EasyMDE & Gemini AI Copilot Integration

Inside [src/pages/admin/blog/editor.astro](file:///home/wicked/Projects/Guia%20Negocios/src/pages/admin/blog/editor.astro):

* **EasyMDE Instance:** Standard WYSIWYG/Markdown editor attached to `<textarea id="editor">`.
* **Gemini Copilot Trigger:** Users enter a blog topic and click "Generate Draft".
* **Model Execution:** Calls `aiModel.generateContent(...)` passing a strict prompt instructing Gemini to return formatted Markdown with `##` headings and relevant Unsplash image embeddings (`![alt](https://images.unsplash.com/...)`).
* **Injection:** The returned string is pushed into `easyMDE.value(generatedMarkdown)`.

---

## 5. App Check & Secret Storage

### App Check

App Check is **ENFORCED** on `firestore.googleapis.com`, `firebaseml.googleapis.com`, `identitytoolkit.googleapis.com` and `places.googleapis.com`.

> **The Firebase console cannot enforce App Check for Cloud Functions.** The console lists only the four services above — `cloudfunctions.googleapis.com` is never among them — so toggling enforcement there has no effect on callables. For Cloud Functions, App Check is enforced **in code**, by passing `enforceAppCheck: true` in each `onCall` options object. All 12 callables currently set it.

Consequences to be aware of:

* **Build-time reads:** enforced Firestore means a Node build cannot read Firestore without a token. CI supplies an App Check **debug token**; locally you must set `APP_CHECK_DEBUG_TOKEN` in `.env` or the build falls back to the client path and can fail. See `docs/05-development-and-deployment.md`.
* **Admin pages cannot be verified on `localhost`** — admin sign-in fails there because App Check cannot be satisfied normally. Verify admin UI on the live domain.
* Admin pages on `localhost` rely on a **debug token**. With `enforceAppCheck` on the callables, an *unregistered* debug token is rejected, so register it in the console before testing callables locally.

### Where secrets live

No API key is read from an `import.meta.env.PUBLIC_*` variable. Astro inlines every `PUBLIC_*` value into the client bundle, which ships it to every visitor.

| Secret | Stored in | Read by |
| :--- | :--- | :--- |
| `pexelsKey` | `settings/admin` + `localStorage.pexels_api_key` | `getPexelsApiKey()` — **only** the admin blog editor's image search |
| `unsplashKey` | `settings/admin` + `localStorage.unsplash_access_key` | `getUnsplashAccessKey()` |
| `geminiKey` | `settings/admin` + `localStorage` | optional Tier-3 direct Gemini REST fallback only |

> Both key getters check `localStorage` **before** Firestore, and cache in a module-level variable. When rotating a key, clear `localStorage` and hard-reload — otherwise the old key keeps being served and a successful rotation looks like a failure.
>
> `PUBLIC_PEXELS_API_KEY` in `.env` is **dead** — nothing has read it since the keys were removed from the client bundle.
