# Guia Negocios — Website Audit Register

**Opened:** 2026-10-16
**Method:** WEBSITE_AUDIT framework — evidence-first, system-by-system, line-by-line.
**Status:** FIX PHASE — all code fixes pushed; **Cloud Functions deployed 2026-10-16** (owner login + agent redeploy after the dependency bump) — every functions-side fix is live. Dependency audits: root 10 → **0**, functions 5 → **0**. Remaining: owner decisions (F-A12 / F-A13 / F-A14 payment-crediting claim / F-A23 / F-A4 / F-A26-live) and P4 cleanups (F-A8 dead UI; admin-surface heading order).

> **Rules of this document**
> - Every entry is verified from source or live evidence **at the date stated in the entry**. No speculative entries.
> - Anything that could not be verified is explicitly marked **UNVERIFIED** with the reason (missing access, live check pending, etc.).
> - Findings move to `FIXED` only after the fix is verified (with the verification method recorded).
> - This file is the single source of truth for audit status. Chat summaries describe it; they do not replace it.

## Legend

- **Severity:** P0 launch blocker · P1 critical · P2 important · P3 minor · P4 observation
- **Confidence:** CONFIRMED (directly verified) · HIGH CONFIDENCE (strong evidence, one external condition uncheckable) · NEEDS VERIFICATION · NOT AN ISSUE (investigated, no defect)
- **Status:** OPEN · USER-DECISION (needs owner input) · FIXED (verified) · NOT-AN-ISSUE

## Index

| ID | Sev | Confidence | Category | Title | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| F-A1 | P3 | CONFIRMED | SEO | `/admin` pages are not `noindex` | FIXED — verified live (`931e22b`) |
| F-A2 | P2 | CONFIRMED | Content | `blog.ts` seed fallback carries pre-correction tax claims (ITIN/AOTC/EITC, CTC amount) | FIXED (`931e22b`; deploys with hosting CI) |
| F-A3 | P2 | CONFIRMED | Content / Functions | `generateLinkOutreach` curated list: wrong `centrohispano.org` target + dead TNHCC entry | URL fixed (`1baed15`); **TNHCC entry NOT actually removed until 2026-10-18** — `1baed15` added only the removal comment |
| F-A4 | P3 | CONFIRMED (source; not live) | Content / Product | Landing-page templates ship the 15%-discount promo block — absent from both live LPs | USER-DECISION |
| F-A5 | P3 | CONFIRMED | Security hygiene | `firebase.ts` reads `PUBLIC_GEMINI_API_KEY` (violates the repo's own invariant) | FIXED (`931e22b`; deploys with hosting CI) |
| F-A6 | P3 | CONFIRMED | Config | `.env.example` is misleading (contradicts its own comment; unused vars) | FIXED (`931e22b`) |
| F-A7 | P3 | CONFIRMED (live) | Accessibility | Nested `<main>` elements on AdminLayout pages (2 main tags served) | FIXED (`accab0d`; dist-verified 1 `<main>`) |
| F-A8 | P4 | CONFIRMED | Dead UI | "Remember me" checkbox, admin header search box, `window.simulateAction` have no behavior | FIXED — all three removed (2026-10-18) |
| F-A9 | P3 | CONFIRMED | Security hygiene | `showToast()` renders Firestore/AI-derived strings via `innerHTML` | FIXED (`accab0d`) |
| F-A10 | P3 | CONFIRMED | Docs | Eight verified docs↔site drift items (docs/00 ×2, docs/02, docs/03, `.agents/AGENTS.md` ×2, README) | FIXED |
| F-A11 | P4 | CONFIRMED | Cleanup | Empty leftover dir `src/pages/[lang]/services/` | FIXED — removed |
| F-A12 | P2 | CONFIRMED | Content | Homepage trust metric "15+ Negocios Lanzados / Businesses Launched" — no source in repo | USER-DECISION |
| F-A13 | P2 | CONFIRMED | Content | Testimonials name specific clients (previously flagged by owner as placeholder) | USER-DECISION |
| F-A14 | P2 | CONFIRMED | Content | FAQ (both locales) publishes unverified claims (bundle payment crediting, notary/translation services) | PARTIAL — notary/translation confirmed real by owner (2026-10-16); payment-crediting claim still unconfirmed |
| F-A23 | P3 | CONFIRMED | Content / i18n | EN/ES FAQ answers diverge in meaning, not just wording | USER-DECISION (owner unsure of true scope; both FAQ pages measured heading-clean) |

*IDs are not contiguous — earlier numbers from the initial register pass are retained so prior references stay valid. New findings continue from F-A24.*

### Index — Batch 2 (2026-10-16, deep pass: Functions / admin / scripts / remaining pages)

| ID | Sev | Confidence | Category | Title | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| F-A24 | **P1** | CONFIRMED | Security | Stored XSS: anonymous form input executes inside the admin session (notification modal) | FIXED — verified live in production (`f931bbd`) |
| F-A25 | P2 | CONFIRMED | Functions | `scheduledContentEngine` never saves a draft (field-name mismatch) — feature dead since creation | FIXED + DEPLOYED 2026-10-16 (`1baed15`) |
| F-A26 | P3 | CONFIRMED (source; not live) | Content | LP template ships fabricated social proof — absent from live LPs; template's *comparison table* IS live with unverified claims (competitor $300+/h, "Garantizado" 24h) | USER-DECISION — template now warns against unsourced stats; live comparison table needs owner call |
| F-A27 | P2 | CONFIRMED | Agent config | `conversion-copywriter-lp` skill instructs agents to build *pricing* pages — contradicts standing no-price rule | FIXED (skill rewritten, no-price rule added) |
| F-A28 | P2 | CONFIRMED (dormant) | Scripts | `update-post1..4-visuals.mjs` would unpublish live posts (`status:'draft'`) if re-run | FIXED — all four deleted |
| F-A29 | P2 | CONFIRMED | Docs | `docs/05`: wrong clone URL; bare `firebase deploy` command (would touch rules/extension/hosting); Node version claim | FIXED (docs) |
| F-A40 | P2 | CONFIRMED | Security | Admin pages render externally-influenced strings as HTML (GSC queries, AI output, GA4 data) | FIXED (`accab0d`) — deploys with hosting CI |
| F-A41 | P2 | CONFIRMED (live) | SEO / UX | ES landing pages' EN language switch + `hreflang="en"` point to a 404 (`/en/lp/…` not built) | FIXED (`931e22b`) — deploys with hosting CI |
| F-A42 | P3 | CONFIRMED (live) | Security hygiene | Missing security headers (XCTO / XFO / Referrer-Policy / CSP absent; HSTS only) | FIXED (`firebase.json`: XCTO+Referrer-Policy `**`, XFO `DENY` `/admin/**`; no CSP by design) |
| F-A30 | P3 | CONFIRMED | Scripts | `verify-firestore-rules.cjs` always exits 0 — a gate that can never fail | FIXED (`1baed15`) |
| F-A31 | P3 | CONFIRMED | Functions / Admin | Success reported after failed writes (seo skills hardcode `status:'ok'`; admin alerts say "Completed" on error) | FIXED (`1baed15`, `accab0d`) |
| F-A32 | P3 | CONFIRMED | Functions | Residual fabricated metrics: Trends `\|\| 50/45` fallback; report writes `"null%"`, `activeLinks \|\| totalLinks`, hardcoded "healthy" summary | FIXED (`1baed15`) |
| F-A33 | P3 | CONFIRMED | Functions | Internal-linking embeddings never generate (`afterData.content` field does not exist) | FIXED (`1baed15`) |
| F-A34 | P3 | CONFIRMED | UI / Functional | Blog list: hydrated posts bypass active search; oldest-first ordering after hydration | FIXED (`931e22b`) |
| F-A35 | P3 | CONFIRMED | Content / i18n / a11y | Public copy defects: Spanish word in EN page; heading-order skips ×6 pages; research citation misuse; EN alt text on ES page | FIXED — ES alt text, citation, EN copy; heading order corrected (6 service pages, homepages, footer/404, blog view shells). Residual skips: admin-internal + Firestore-stored content (see Part 6) |
| F-A36 | P3 | CONFIRMED | Security hygiene | Admin settings echoes stored API keys into the DOM; keys persisted in plaintext localStorage | FIXED (`accab0d`) |
| F-A37 | P3 | CONFIRMED | Scripts | Broken/stale script cluster (backfill fails App Check; anon-write script impossible; ES HTML into EN; wrong SOS link; README 1 of 23) | PARTIAL — infographic EN-injection fixed, README rewritten, un-runnable scripts flagged, SOS-link script deleted |
| F-A38 | P3 | CONFIRMED | Agent config | Skills carry stale claims (BOI — CONFIRMED obsolete via fincen.gov, 2026-10-16) + unverified macro stats + fabricated template stat; hard rules missing from `AGENTS.md` | FIXED (skills + `AGENTS.md`) |
| F-A39 | P3 | CONFIRMED | Admin workflow | New post defaults to *Published* and Preview persists it; reports "schedule" writes settings nothing consumes | FIXED (`accab0d`) |
| F-A43 | P3 | CONFIRMED | Supply chain | Dependency advisories: 33 on the default branch (1 critical, 16 high, 10 moderate, 6 low — GitHub/Dependabot, reported on every push); `functions/` local audit: 5 (4 high, 1 critical) | FIXED — root `npm audit` 10 → 0 (incl. `@grpc/grpc-js` override); functions 5 → 0 (incl. critical `proxy-addr`); functions redeployed |
| — | P4 | CONFIRMED | Various | See "P4 observations (batch 2)" | OPEN |

### Index — Batch 3 (2026-10-18, SEO-agent page audit)

| ID | Sev | Confidence | Category | Title | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| F-A44 | P2 | CONFIRMED | Admin / Functions | Kill switch wiped the agent config (full-map replace) and the flip was inverted — "Pause" re-wrote the active state | FIXED (`1a9b3f8`) — dotted paths + correct flip |
| F-A45 | P2 | CONFIRMED | Functions | Dismissed/resolved `seo-tasks` resurrected as `open` by the Sunday re-upsert (status forced, `createdAt` reset) | FIXED (`1a9b3f8`) — status + original `createdAt` preserved |
| F-A46 | P2 | CONFIRMED | Admin / Functions | Two scoring rubrics wrote to the same `seoAudits` collection: the button ran a 10-page browser crawl, the schedule a 36-page server crawl | FIXED (`1a9b3f8`) — button now calls the server audit; client crawl deleted |
| F-A47 | P2 | CONFIRMED | Functions | hreflang penalty counted pages with no EN/ES twin (the 2 correctly-tagless Spanish LPs) → false −4; same false positive queued in the Monday on-page skill | FIXED (`1a9b3f8`) — twin-aware in both scorers; validated live |
| F-A48 | P3 | CONFIRMED | Admin | Task "Fix Now" opened the public page URL instead of the admin tool | FIXED (`1a9b3f8`) — routes via `getFixToolPage()` |

## Findings — Batch 1 (2026-10-16, config + shared frontend + public main pages)

### F-A1 — `/admin` pages are not `noindex`
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** SEO
- **Location:** `src/layouts/AdminLayout.astro:25`; public entry point `src/components/Footer.astro` (Administrador link on every public page); `public/robots.txt`
- **Description:** `BaseLayout` supports a `noindex` prop (used by `404.astro` and the four `/blog/view` + `/lp/view` shells). `AdminLayout` passes only `noTracking`, so every `/admin/*` page — including `/admin/login` — ships without a `robots` meta tag.
- **Evidence:** `AdminLayout.astro:25` → `<BaseLayout title={title} description={description} noTracking>`. Repo-wide grep for `noindex` matches only `BaseLayout.astro` (definition), `404.astro`, and the four view shells.
- **Verification:** source read + repo-wide grep, 2026-10-16. **Live (2026-10-16):** `/admin/login/` → 200, title `Admin Login | GUIA NEGOCIOS`, **0** `name="robots"` occurrences; `robots.txt` serves `Disallow: /admin/` + `/admin/*` as designed; the footer `Admin` → `/admin` link renders on every public page (seen in the live LP browser render). Note: `/admin/login` (no slash) 301s to `/admin/login/`.
- **Expected:** `/admin/*` responses carry `<meta name="robots" content="noindex">`.
- **Actual:** no robots meta. Mitigation is only `robots.txt` `Disallow: /admin/` — a crawl directive, not an indexing directive, and it does not prevent indexing of a linked URL.
- **Impact:** Low practical risk today (nothing external links to `/admin/login` except the site footer; no search visibility observed). It becomes a real risk the moment any external page links to an admin URL.
- **Root cause:** `AdminLayout` predates the `noindex` prop addition to `BaseLayout`.
- **Affected areas:** all 13 admin pages.
- **Recommended fix:** pass `noindex` from `AdminLayout` to `BaseLayout` (one line). Verify: build, deploy, confirm `<meta name="robots" content="noindex">` on `/admin/login`.
- **Launch impact:** Non-blocker.

### F-A2 — `blog.ts` seed fallback carries pre-correction tax claims
- **Severity:** P2 · **Confidence:** CONFIRMED · **Category:** Content accuracy
- **Location:** `src/utils/blog.ts` — `POST_OVERRIDES` (const starts ~line 60; EN ITIN post ~lines 1150–1230, ES ITIN post ~lines 1240–1400)
- **Description:** The hardcoded seed posts (used only when Firestore returns **zero** published posts for a language) still contain claims that were corrected in the live Firestore posts on 2026-09-24 after IRS verification:
  1. EN · AOTC: "Can claim with ITIN" — now **false** for tax year 2026 (IRS requires an SSN valid for work, for the taxpayer *and* the student).
  2. EN · EITC: "You can claim the EITC even without an SSN, as long as you file your return with an ITIN" — the EITC requires a valid SSN; the corrected public copy (`public/llms.txt`) says exactly that.
  3. CTC amount in the seed is `$2,000`; the corrected live figure is `$2,200` (per the 2026-09-24 IRS-verified correction).
- **Evidence:** `blog.ts` seed text at the ITIN entries vs `public/llms.txt` FAQ answer ("…the Earned Income Tax Credit requires a valid Social Security number…") and the correction log in repo memory (2026-09-24, ITIN post figures verified against irs.gov).
- **Verification:** source read (both files), 2026-10-16.
- **Expected:** Seed fallback copy matches the corrected, IRS-verified live copy.
- **Actual:** Seed still carries the pre-correction claims. Dormant while Firestore has published posts; activates silently if the `blogs` collection ever returns zero published docs for a language (e.g., transient read failure falls through to `posts.length === 0` → seed set).
- **Impact:** A tax-accuracy regression served to the public in a fallback scenario, on the site's most sensitive content class (IRS figures).
- **Root cause:** Corrections were applied to live Firestore content; the seed copy in code was never updated.
- **Affected areas:** `/es/blog/*` + `/en/blog/*` renderers when fallback activates.
- **Recommended fix:** Update the two seed posts to the corrected TY2026 wording/figures (or regenerate the seed from the live, corrected Firestore documents). Verify: `npm run build` still passes; diff seed text against live posts.
- **Launch impact:** Non-blocker, but must be fixed before the site is declared content-clean.

### F-A3 — `generateLinkOutreach` still hardcodes the wrong `centrohispano.org` target
- **Severity:** P2 · **Confidence:** CONFIRMED · **Category:** Content / Functions
- **Location:** `functions/src/index.ts` ~line 956 (`generateLinkOutreach`, curated opportunity #1)
- **Description:** The callable's curated list still contains `https://www.centrohispano.org/recursos` — verified in a prior session to be the **wrong organization** (Hispanic Center of Reading & Berks County, **Pennsylvania**, and a 404). It was corrected to `centrohispanotn.org` in the Firestore `linkOutreach` collection on 2026-09-25, but the code was never updated. The dedupe check is `where('targetUrl', '==', opp.targetUrl)`, so pressing "AI Research" in the admin re-adds the bad target as a new Draft.
- **Evidence:** `index.ts` curated array entry (`targetName: "Centro Hispano de East TN", targetUrl: "https://www.centrohispano.org/recursos"`); correction log 2026-09-25 in repo memory.
- **Verification:** source read, 2026-10-16.
- **Expected:** The curated list matches the corrected, verified targets (or reads from configuration).
- **Actual:** Stale target still in code; dedupe by URL means the corrected Firestore row does not prevent re-insertion of the bad one.
- **Impact:** Admin-triggered re-pollution of outreach targets with a known-bad URL; wasted outreach drafting on a wrong org.
- **Root cause:** The 2026-09-25 fix updated data (Firestore) but not the code that writes that data.
- **Affected areas:** `/admin/backlinks/outreach` flow, `linkOutreach` collection.
- **Recommended fix:** Correct the URL in `index.ts` to `https://www.centrohispanotn.org/` (matching the verified target) — and while in there, re-verify the other five curated URLs (`tnhcc.org`, `knoxvillechamber.com/directory`, `nashvillehispanicchamber.com/directory`, `tsbdc.org/knoxville`, `chattanoogachamber.com/...`). Verify: `npm run build` in `functions/`; deploy requires the owner (functions deploy needs interactive auth).
- **Launch impact:** Non-blocker; fix before the outreach flow is used again.
- **Correction (2026-10-18):** this register previously recorded the finding as FIXED (`1baed15`). Verified via `git show 1baed15:functions/src/index.ts` that commit applied the **URL fix only** — it added the comment claiming the TNHCC entry was removed while leaving the entry in the array. TNHCC was actually removed on 2026-10-18 (both `tnhcc.org` and `tnhcc.com` confirmed DNS-dead the same day), and all five remaining curated URLs re-verified live (all HTTP 200).

### F-A4 — Landing-page templates still ship the 15%-discount promo block
- **Severity:** P2 · **Confidence:** CONFIRMED · **Category:** Content / Product
- **Location:** `src/utils/landing-page-templates.ts` — lines 21, 26, 35, 407, 415, 471–474, 505
- **Description:** All three generated landing-page templates still contain the promo: "OFERTA ESPECIAL PARA NEGOCIOS", "15% de Descuento", "Oferta por Tiempo Limitado", "¡Asegure su Descuento del 15% Hoy!", "Reclamar Mi Cupón del 15% OFF". This was deliberately left in a prior session (out of approved scope) and flagged to the owner then; no decision has been recorded.
- **Evidence:** grep of `landing-page-templates.ts` for `Oferta|Descuento|15%` → 8 matches.
- **Verification:** source read, 2026-10-16.
- **Live verification (2026-10-16):** neither live LP (`/es/lp/centro-hispano-registro-asesoria-negocios/`, `/es/lp/llamanos-asesoria-negocios/`) contains `15%`/`Oferta por Tiempo Limitado` in raw HTML or in the rendered browser DOM → **not currently published.** Severity adjusted P2 → P3: exposure is on *future* LPs created from these templates.
- **Expected:** Owner decision: keep (as a deliberate campaign device) or remove.
- **Actual:** Undecided; present in all three templates — dormant until an admin inserts the promo blocks.
- **Impact:** A standing discount offer in generated marketing pages is a business commitment the owner may not intend. Note: this is a *campaign discount*, not a service price — it does not violate the standing "no published prices" constraint, but it is a price-like claim.
- **Root cause:** Never decided.
- **Recommended fix:** Owner decision. If remove: strip the promo sections and the coupon CTA from all three templates; verify by regenerating a draft LP in the admin builder and checking the rendered HTML.
- **Launch impact:** Non-blocker; decision needed.

### F-A5 — `firebase.ts` reads `PUBLIC_GEMINI_API_KEY`
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** Security hygiene
- **Location:** `src/lib/firebase.ts:88`
- **Description:** `getGeminiApiKey()` falls back to `import.meta.env.PUBLIC_GEMINI_API_KEY`. This directly violates the repo invariant "**Never read an API key from `import.meta.env.PUBLIC_*`** — Astro inlines those into the client bundle." No `PUBLIC_GEMINI_API_KEY` is set anywhere today, so no key is currently leaked — but the code path exists and would inline a real key into the public bundle the moment anyone sets that variable.
- **Evidence:** `firebase.ts:88` → `const envKey = (import.meta as any).env?.PUBLIC_GEMINI_API_KEY || ...`. Grep: no `.env` files with this var; no other `PUBLIC_*` key consumers.
- **Verification:** source read + repo-wide grep, 2026-10-16.
- **Expected:** AI keys come from Firestore `settings/admin` or user-entered local storage — never from `PUBLIC_*` env.
- **Actual:** Latent inlining footgun present in the bundle path of every page that imports `firebase.ts`.
- **Impact:** None today; potential full key exposure later with zero warning.
- **Root cause:** Pre-dates the invariant (or was missed when it was codified).
- **Recommended fix:** Delete the `PUBLIC_GEMINI_API_KEY` branch (keep the `window.GEMINI_API_KEY` runtime escape hatch if desired — that is not build-inlined).
- **Launch impact:** Non-blocker; cheap and should ship.

### F-A6 — `.env.example` is misleading
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** Configuration
- **Location:** `.env.example`
- **Description:** (a) It defines `PUBLIC_UNSPLASH_ACCESS_KEY` directly beneath a comment saying "Do NOT prefix these with PUBLIC_". (b) It lists `PUBLIC_FIREBASE_*` and `FIREBASE_ADMIN_*` variables that **no code consumes** (Firebase web config is hardcoded in `src/lib/firebase.ts`; admin creds resolve via `admin-db.ts` from `FIREBASE_SERVICE_ACCOUNT_KEY`/`GOOGLE_APPLICATION_CREDENTIALS`/`serviceAccountKey.json`/ADC).
- **Evidence:** `.env.example` contents vs repo grep — no consumer of `PUBLIC_FIREBASE_*` or `FIREBASE_ADMIN_*`; `unsplash.ts` deliberately states the key must NOT be `PUBLIC_`-prefixed.
- **Verification:** source read + grep, 2026-10-16.
- **Expected:** Example file documents only variables the code actually reads, with correct prefixes.
- **Actual:** Contradictory + stale entries; a new operator following it would set unused vars and might set a key var with the wrong prefix.
- **Impact:** Operator misconfiguration; mild security-practice confusion.
- **Recommended fix:** Rewrite `.env.example` to the real surface: `FIREBASE_SERVICE_ACCOUNT_KEY` (or `GOOGLE_APPLICATION_CREDENTIALS`), `APP_CHECK_DEBUG_TOKEN`, `GEMINI_API_KEY` (functions), and a clear "stock keys live in Admin → Settings" note. Verify against `admin-db.ts`, `firebase.ts`, `functions/src/ai.ts`, workflows.
- **Launch impact:** Non-blocker.

### F-A7 — Nested `<main>` on every admin page
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** Accessibility / HTML validity
- **Location:** `src/layouts/AdminLayout.astro` (`<main class="flex-1 overflow-y-auto …">`) inside `src/layouts/BaseLayout.astro` (`<main id="main-content">`)
- **Description:** `AdminLayout` renders `<BaseLayout>` (which wraps its default slot in `<main id="main-content">`) and itself outputs a second `<main>` for the page content. Only one `<main>` per document is valid; screen-reader landmark navigation sees a nested main.
- **Evidence:** `AdminLayout.astro` — `<BaseLayout … noTracking>` wraps the whole admin shell; the shell contains `<main class="flex-1 …"><slot /></main>`. `BaseLayout.astro` wraps the default slot in `<main id="main-content" class="flex-grow">`.
- **Verification:** source read, 2026-10-16 (`AdminLayout.astro:2` imports `BaseLayout`; `:25` renders it; `:122` inner `<main>`; `BaseLayout.astro:369` `<main id="main-content">`). **Live (2026-10-16):** `/admin/blog/`, `/admin/settings/`, `/admin/seo-agent/` each serve **2** `<main>` tags; `/admin/login/` (standalone page) serves 1 — correct.
- **Expected:** One `<main>` landmark per document.
- **Actual:** Two, nested, on every AdminLayout-based page.
- **Impact:** Landmark navigation ambiguity for assistive tech; HTML validation warning. Admin surface only.
- **Recommended fix:** In `AdminLayout`, change the inner `<main>` to a `<div>` (keep the scroll container styling), or add a `noMain`-style escape to BaseLayout. The minimal-risk fix is the `<div>` swap.
- **Launch impact:** Non-blocker.

### F-A8 — Dead UI elements (no behavior)
- **Severity:** P4 · **Confidence:** CONFIRMED · **Category:** Cleanup / UI
- **Location / Evidence (all source-read 2026-10-16):**
  1. `src/pages/admin/login.astro` — "Remember me" checkbox: no `id`, no handler; has no effect on session persistence.
  2. `src/layouts/AdminLayout.astro` — the header search input ("Search...") has no `id`/handler and searches nothing.
  3. `src/scripts/admin-utils.js:122` — `window.simulateAction()` is defined but has **zero** callers repo-wide (grep).
- **Impact:** Operator confusion only ("I typed a search and nothing happened").
- **Recommended fix:** Remove all three, or wire the search box to something real. Verify via grep that nothing references them before deleting.
- **Resolution (2026-10-18):** All three removed — grep re-confirmed zero code callers beforehand. The login "Remember me" checkbox and the admin header search input were deleted from the markup (the "Forgot password?" link stays, right-aligned); `window.simulateAction()` was deleted from `admin-utils.js`; the `docs/00` helper table updated to match. Build 56 pages clean.
- **Launch impact:** None.

### F-A9 — `showToast()` renders remote strings via `innerHTML`
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** Security hygiene
- **Location:** `src/scripts/admin-utils.js:36`
- **Description:** `toast.innerHTML = \`…${message}\`` where `message` is supplied by admin pages, several of which pass Firestore-derived or AI-generated strings (e.g., error messages from callables, titles from documents). This is an admin-surface self-XSS/late-injection pattern, not a public vulnerability.
- **Evidence:** `admin-utils.js:36`; callers passing dynamic content from Firestore/AI in `admin/seo-agent.astro`, `admin/blog.astro`, `admin/keywords.astro` etc.
- **Verification:** source read, 2026-10-16.
- **Expected:** Text is inserted with `textContent`, or escaped before `innerHTML`.
- **Actual:** Raw interpolation.
- **Impact:** A crafted document title / AI response containing HTML would execute in the admin's session. Requires the attacker to already control stored content — low likelihood, non-zero.
- **Recommended fix:** Build the icon span, then set the message via `textContent` on a child element.
- **Launch impact:** Non-blocker.

### F-A10 — Docs ↔ site drift (eight verified items)
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** Docs
- **Location / Evidence (all source-read 2026-10-16):**
  1. `docs/00` §1.A: "routes split strictly into `/src/pages/en/` + `/src/pages/es/`" — omits root `src/pages/index.astro` (Spanish home), `[lang]/`, `404.astro`, and does not state the real routing model (which root `AGENTS.md` states correctly).
  2. `docs/03`: `getLangFromUrl` "Defaults to `en`" — **false**; `src/i18n/utils.ts` has `defaultLang = 'es'` and `astro.config.mjs` `defaultLocale: 'es'`.
  3. `docs/02` §C: describes `/es/index.astro` as homepage content — actually `Astro.redirect('/', 301)`.
  4. `docs/02` route map omits: `/es|/en/faq.astro`, the four `view` shells, `admin/analytics.astro`, `admin/backlinks/outreach.astro`.
  5. `.agents/AGENTS.md` §2: "`/src/pages/es/` contains the redirect shim only" — false; 13 files, only `es/index.astro` is a shim.
  6. `.agents/AGENTS.md` §3: "Wait for Figma — do not build out full UI" — stale (site is fully built and live); owner confirmation requested.
  7. `docs/00` §1.C + `docs/03` + `.agents/AGENTS.md` §3: brand colors claimed as `brand-primary #2563EB` (blue) / `#0F172A` / `#64748B`. Actual tokens in `src/styles/global.css`: `--color-brand-primary: #1B4E2B` (forest green), `--color-brand-accent: #F0C850` (gold), `--color-brand-dark: #1A2E35`, `--color-brand-gray: #1E2A2F`. Anyone rebuilding UI from these docs would produce the wrong palette.
  8. `README.md`: badge "AI Integration: Gemini API" and architecture-SVG claims "TypeScript Node 20 Runtime" / "Google Gemini API … firebase/ai Model SDK" — actual stack is Vertex AI (`@google/genai`, location `global`, `gemini-3.7-flash` family) and `nodejs24` runtime (`functions/package.json`).
- **Impact:** Misleading agent/human documentation → wrong invariants repeated in future sessions (this has already caused two documented mistakes historically).
- **Recommended fix:** Apply all eight corrections (docs only). Item 6 is an owner decision.
- **Launch impact:** None (docs).

### F-A11 — Empty leftover directory `src/pages/[lang]/services/`
- **Severity:** P4 · **Confidence:** CONFIRMED · **Category:** Cleanup
- **Location:** `src/pages/[lang]/services/` (empty)
- **Description:** Remnant of the removed programmatic-SEO layer (`programmatic-pages.ts` + `[slug].astro` no longer exist; zero `PROGRAMMATIC` references in `src/`).
- **Verification:** directory listing + repo-wide grep, 2026-10-16.
- **Recommended fix:** Delete the empty directory (Git does not track empty dirs, so this is local housekeeping only).
- **Launch impact:** None.

### F-A12 — Homepage trust metric "15+" has no recorded source
- **Severity:** P2 · **Confidence:** CONFIRMED · **Category:** Content
- **Location:** `src/pages/index.astro:191-192`, `src/pages/en/index.astro:192-193`
- **Description:** "15+ Negocios Lanzados / 15+ Businesses Launched" — no source for this figure exists in the repo. The other two trust-bar tiles are self-descriptive ("100% bilingual team", "East TN") and not numeric claims.
- **Verification:** source read + grep for the figure, 2026-10-16. **Live (2026-10-16):** "15+" present on `/` and `/en/` (1 occurrence each).
- **Impact:** An uncorroborated performance claim in the site's most prominent trust element.
- **Recommended fix:** Owner to confirm the number (replace or remove; if replaced, state the real count). Do not guess.
- **Launch impact:** Non-blocker; needs owner input.

### F-A13 — Testimonials name specific clients
- **Severity:** P2 · **Confidence:** CONFIRMED · **Category:** Content
- **Location:** `src/pages/index.astro` testimonial section (~lines 286–360), `src/pages/en/index.astro`
- **Description:** Three 5-star testimonials with names and companies ("Sylvia M. — Rocs Construction", "Carlos R. — CleanPro Services", third card same pattern). Repo memory records the owner stating these are placeholder testimonials and that real ones will be supplied. No decision recorded since.
- **Verification:** source read, 2026-10-16; memory cross-reference. **Live (2026-10-16):** all three testimonials (Sylvia M., Carlos R., Yesi Perez) render on both `/` and `/en/`.
- **Impact:** Publishing invented testimonials with real-sounding identities is a consumer-protection / review-manipulation risk if they remain at launch.
- **Recommended fix:** Owner supplies real testimonials, or the section is reworded/removed. Do not invent replacements.
- **Launch impact:** Non-blocker, but should be resolved before marketing the site.

### F-A14 — FAQ publishes unverified service claims (both locales)
- **Severity:** P2 · **Confidence:** CONFIRMED · **Category:** Content
- **Location:** `src/pages/es/faq.astro` (process category) and `src/pages/en/faq.astro` (same Q, translated)
- **Description:** "Acreditamos los pagos de servicios previos hacia su paquete mayor / We credit prior standalone services toward your comprehensive bundle" — a commercial commitment nobody has confirmed; and the notary/translation-services answer ("Sí. Proveemos traducción… servicio de Notario Público bilingüe a domicilio…") — previously flagged as unverified. Both remain live.
- **Verification:** source read, 2026-10-16; cross-reference to 2026-09-25 audit notes. **Live (2026-10-16):** "Acreditamos los pagos" appears 2× on `/es/faq/`.
- **Impact:** Publicly stated service commitments the business may not honor (or legally cannot, if notary credentials/licensing are not held).
- **Recommended fix:** Owner confirms both claims (keep, reword, or remove). If notary services are real, note that mobile notary in TN has licensing considerations.
- **Owner verification (2026-10-16):** owner confirmed the notary service is real ("I am truly a notary") → the notary/translation claim is **resolved as genuine**. The "we credit prior standalone service payments" claim remains **unconfirmed**.
- **Launch impact:** Non-blocker; needs owner input.

### F-A23 — EN/ES FAQ answers diverge in meaning
- **Severity:** P3 · **Confidence:** CONFIRMED · **Category:** Content / i18n
- **Location:** `src/pages/en/faq.astro` vs `src/pages/es/faq.astro` (operations category answers)
- **Description:** Recorded pairs include: EN "vector logo **direction**" vs ES "**entrega** de su logotipo vectorial"; EN adds "receipt tracking, margin optimization" where ES says "control básico de ingresos y gastos". Both are live answers to the same question.
- **Verification:** source read of both files, 2026-10-16.
- **Impact:** The two locales promise different scopes for the same service.
- **Recommended fix:** Decide the true scope, then align both languages.
- **Launch impact:** Non-blocker.

## Findings — Batch 2 (2026-10-16, deep pass: Cloud Functions, admin suite, scripts, remaining public pages)

> **Method note:** produced by four full-file deep reads (functions/src; the 13 admin pages; scripts + docs/05 + docs/07 + skills; services/about/404/utils). The **P1 and all P2 items were re-verified line-by-line by the lead auditor** against the quoted source before entry. Nothing in this batch is inferred.

### F-A24 — P1 · CONFIRMED — Stored XSS: anonymous form input executes inside the admin session
**Category:** Security

**Write side (untrusted input, stored verbatim):**
- `src/pages/es/contact.astro` (notifications block, ~line 280): `` message: `${name} (${email}) — ${subject || 'Consulta General'}` ``
- `src/pages/en/contact.astro` (same block, EN copy)
- `src/scripts/lp-lead-form.ts` (notifications block): `` message: `${name}${email ? ` (${email})` : ''}${phone ? ` — ${phone}` : ''}` ``

**Sink (raw HTML):** `src/layouts/AdminLayout.astro` — the notification modal interpolates `${n.title}` / `${n.message}` into an HTML string passed to `window.showModal`, which assigns it via `overlay.innerHTML` in `src/scripts/admin-utils.js`. The contacts fallback branch (`'<name>' requested <subject>…`) feeds the same sink with `contacts.name`.

**Permission path:** `firestore.rules` deliberately allows **anonymous create** on `notifications` (title ≤200, message ≤600 — content otherwise unvalidated).

**Description:** Any anonymous visitor can submit the contact form with `<img src=x onerror=…>` in the name/subject fields. The payload persists and executes as HTML in the admin's authenticated origin when the notification bell is opened — no user action beyond the admin's normal workflow.

**Escalation chain (why this is P1, not P3):** admin session → read `settings/admin` (API keys echoed into the DOM, F-A36) → invoke admin callables (`generateAiContent`, reports) → write `landingPages` (the builder stores raw HTML; public renderers use `set:html` with only `contenteditable` stripped) → **persistent XSS for all public visitors**.

**Evidence:** both endpoints re-read by the lead auditor 2026-10-16 (writer block and sink block quoted above); `admin-utils.js` `overlay.innerHTML` sink re-read 2026-10-16.

**Fix applied (2026-10-16) — code complete; production verification pending deploy.** New shared helper `src/utils/escape-html.ts` (`escapeHtml` — coerces arbitrary values, escapes the five HTML-structural characters). **Sink:** `src/layouts/AdminLayout.astro` now escapes `title`, `message`, `id` and `link` before the modal's `innerHTML` interpolation — this covers both the live listener and the contacts-fallback branch, and neutralises any payload already stored in `notifications`. The stored `link` is additionally restricted to same-origin paths (`link.startsWith('/')`) because a crafted `javascript:` value would otherwise execute on click. **Writers:** both contact pages now escape visitor input in the `mail.html` email bodies (the email client is the renderer, so write-time escaping is correct there); `lp-lead-form.ts` had its local duplicate replaced by the shared util. **Single-escape policy (deviation from this register's original recommendation, deliberate):** `notifications` documents stay stored raw and are escaped at render; `mail.html` is escaped at write. Escaping at both layers would double-encode legitimate `&`/`<` input.

**Fix verification (2026-10-16):** `npm run build` → 56 pages, clean. Compiled bundles inspected: shared chunk `escape-html.CfOHO0aD.js` contains the five-entity chain; the notification chunk applies it to `title`/`message`/`id`/`link` and carries the `startsWith('/')` guard; both contact chunks wrap all five email fields (`${i(name)}` etc.). **Live exploit re-test is part of deploy verification** — the finding stays fix-recorded until the deployed bundle is checked after the next hosting deploy.

**Launch impact:** **Fix first** — exploitable by an unauthenticated party against the live site.

---

### F-A25 — P2 · CONFIRMED — `scheduledContentEngine` has never saved a draft
**Locations:** `functions/src/contentEngine.ts` — `parseDelimited` (~line 279) vs the consumer block (~line 216).

**Evidence:** `parseDelimited` builds keys as `key.charAt(0).toLowerCase() + key.slice(1).toLowerCase()` → `title_es`, `content_es`, `meta_desc`, `image_search`, while the consumer reads `parsed.contentEs`, `parsed.titleEs`, `parsed.metaDesc`, `parsed.imageSearch`. The guard `if (!parsed.contentEs || !parsed.contentEn) { console.error(…); return; }` is therefore **always true** → the weekly run returns before any `blogs` write, and the scheduled wrapper completes without throwing (reports healthy).

**Verification:** both functions traced line-by-line 2026-10-16.

**Impact:** the automated bilingual-draft pipeline (the human-review workflow) has never produced a draft and still logs a size-looking error each run. No public harm; feature silently dead.

**Fix:** normalise the parsed keys (map `META_DESC`→`metaDesc`, etc.) or read snake_case in the consumer; add a field-list assertion.

---

### F-A26 — P3 · CONFIRMED in source; NOT live — LP template ships fabricated social proof; template's comparison table IS live
**Location:** `src/utils/landing-page-templates.ts` — `metrics_stats` block (~lines 305-330).

**Evidence (re-read 2026-10-16):** `+500` / `Empresarios Asesorados`; `4.9/5` / `Satisfacción de Clientes` / `Calificación Verificada`; `24h` / `Tiempo de Respuesta`.

**Impact:** any landing page built from this block publishes an invented client count and a fabricated "verified" rating with no review platform — the same consumer-protection class as the earlier testimonial finding. The 24h tile is an SLA the business must honor.

**Live exposure — RESOLVED (2026-10-16):** neither live LP contains the metrics block (`+500`, `4.9/5`, `Calificación Verificada`) — checked in raw HTML *and* the rendered browser DOM. **However, the template family is partly live:** the comparison-table block (`landing-page-templates.ts:270`, `<th>Abogados Tradicionales</th>`) renders on `/es/lp/llamanos-asesoria-negocios/`, carrying unverified claims — "✕ Cobro por hora ($300+)" (a competitor-pricing claim), "✓ Garantizado" for a 24h phone response, and "Tarifas fijas sin sorpresas". Severity adjusted P2 → P3 for the metrics block (template-only); the live comparison claims are tracked here as owner-decision items of the same class as F-A14.

**Fix:** owner decision — (a) confirm or reword the live comparison-table claims, (b) provide real figures or replace the numeric tiles before any LP uses that block. Do not guess.

---

### F-A27 — P2 · CONFIRMED — Agent skill instructs pricing pages, contradicting the standing no-price rule
**Location:** `.agents/skills/conversion-copywriter-lp/SKILL.md:25-28`

**Evidence (re-read 2026-10-16):** archetype list includes "… + **2-Tier Pricing** + Discount Countdown CTA", "… Deliverables Matrix + **Pricing** + Testimonials + FAQ", "**Quote / Price Estimate**".

**Impact:** both prior price-leak incidents began with unused price content being re-rendered; this skill instructs an agent to *author new* priced pages. Standing constraint: "The user never wants published service prices."

**Fix:** amend the skill (remove pricing archetypes, state the no-price rule); consider adding the no-price + banned-layout rules to root `AGENTS.md` (F-A38).

---

### F-A28 — P2 · CONFIRMED (dormant) — Four one-off scripts would unpublish live posts if re-run
**Location:** `scripts/update-post1-visuals.mjs` … `update-post4-visuals.mjs` — each `docRef.update()` sets `status: 'draft'` (lowercase); the site filters `status == 'Published'`.

**Impact:** re-running any of them de-publishes its live post (blog URLs 404 until manual re-publish). They also embed pre-correction tax claims (F-A2 class) and a wrong SOS link (F-A37).

**Fix:** delete the four superseded scripts (needs approval), or fix the status casing and add a dry-run guard.

---

### F-A29 — P2 · CONFIRMED — `docs/05` gives a wrong clone URL and a dangerous deploy command
**Locations / evidence:**
- `docs/05:14` — `git clone https://github.com/guianegocios/guia-negocios.git`; the actual remote is `https://github.com/Wiickedawesome/Guia-Negocios.git` (read from `.git/config` 2026-10-16).
- `docs/05:96-105` — instructs `npx firebase deploy` with no `--only` and no mention that hosting rides GitHub Actions on push to `main` and functions deploy manually. A bare deploy also fires **firestore rules + the `firestore-send-email` extension + hosting**.
- `docs/05:6` — "Node.js ≥22" vs `functions/package.json` `engines.node = 24`.

**Fix:** correct all three (docs-only).

---

### F-A40 — P2 · CONFIRMED — Admin pages render externally-influenced strings as HTML
**Locations (deep-pass verified):**
- `src/pages/admin/keywords.astro:437-442` — GSC query strings (`kw.keyword`) + AI `kw.reason` into `innerHTML`; `:200-202` — `data-kw` attribute interpolation.
- `src/pages/admin/reports.astro:184-190` — `marked.parse(report.content)` (marked does not sanitize) into a modal; `<pre>` fallback is a second raw path.
- `src/pages/admin/blog/editor.astro:641,651` — AI copilot strings into `innerHTML` (user messages are escaped; AI messages are not).
- `backlinks.astro:112-113`, `backlinks/outreach.astro:111-132`, `dashboard.astro:307,346`, `analytics.astro:289-347` (GA4), `seo-agent.astro:389-390,663-665`, `blog.astro:411-415`, `landing-pages.astro:156-165`.

**Root cause:** template-literal `innerHTML` with no escaping helper; strongest vector is the **GSC-sourced keyword strings** (anyone can cause a query to appear in Search Console).

**Fix:** one shared escape/`textContent` helper across admin renderers; sanitize `marked` output; validate stored URLs before using them in `href`.

---

### F-A30 — P3 · CONFIRMED — The local rules-verification script can never fail
**Location:** `scripts/verify-firestore-rules.cjs:205-207` — prints `RESULT: … FAILED` then `process.exit(0)` unconditionally.

**Impact:** a 39-check safety harness that always exits green; `docs/07` presents it as a pre-deploy gate (doc inherits the defect).

**Fix:** `process.exit(failures.length ? 1 : 0)`; re-run against the emulator to confirm both outcomes.

---

### F-A31 — P3 · CONFIRMED — Success reported after failed writes (functions + admin)
**Locations / evidence:**
- `functions/src/seo/keyword-gaps.ts:111-116`, `seo/backlinks.ts:88-93`, `seo/synthesizer.ts:58-85` — per-doc write failures `console.warn`; the run still returns `status: 'ok'`.
- `functions/src/seo/rank-history.ts:61-83` — `written++` before `batch.commit()`; failed commits only warn; run returns `status:'ok', findings: written`.
- `functions/src/index.ts:1006-1008` — `linkOutreach` save failures swallowed; the callable returns the opportunities array as if persisted.
- `src/pages/admin/backlinks.astro:217` / `backlinks/outreach.astro:215` — `alert('… ' + (e.message || 'Completed'))` shows "Completed"/"Complete" when the callable failed without a message.

**Impact:** admin-facing "all fine" signals on partial/total write failure — the same silent-write-loss class this project has already been burned by.

**Fix:** derive status from actual write counts; never hardcode `ok`; surface failure counts in run records and UI.

---

### F-A32 — P3 · CONFIRMED — Residual fabricated metrics (keyword discovery + executive report)
**Locations / evidence:**
- `functions/src/index.ts:252-253` — `…?.value?.[index] || 50` / `|| 45` substitutes fabricated Google Trends points (and also collapses a genuine 0 to 50), so `discoverKeywords` can emit invented `↑ N` deltas.
- `functions/src/index.ts` report generator (~1055-1070) — writes `seoHealth: "${seoScore}%"` where `seoScore` is `null` when no audit exists (stored/displayed as `"null%"`); `activeBacklinks: activeLinks || totalLinks` counts non-Active links as active; a hardcoded summary asserts "Site performance is healthy. …" regardless of the measured score.

**Fix:** null-safe rendering (`null` + UI `—`), `activeLinks` only, derive the summary from measured inputs.

---

### F-A33 — P3 · CONFIRMED — Internal-linking embeddings never generate (wrong field name)
**Location:** `functions/src/internalLinking.ts:19` — `if (!afterData.content) return;` but `blogs` documents store `contentEs`/`contentEn`, so the guard always returns early and **no embedding is ever written**; the nearest-neighbour internal-link feature in `contentEngine.ts` therefore never has data. `contentEngine.ts` would additionally emit `- [undefined](undefined)` labels (`data.title` / `data.slugEs` are not the stored fields) if it ever ran.

**Fix:** read `contentEs`/`contentEn` explicitly; correct the label fields; add a write to verify.

---

### F-A34 — P3 · CONFIRMED — Blog list: hydrated posts bypass active search; date order inverted
**Location:** `src/pages/es/blog.astro` / `src/pages/en/blog.astro` (~lines 236-266)

**Evidence:** after the Firestore fetch, cards are added with `grid.prepend(card)` while iterating a **descending-sorted** list (newest → oldest) → the oldest live post renders first. No `applyFilter()` call runs after `loadLivePublishedPosts()`, so a query typed before hydration completes is not applied to the newly added cards.

**Fix:** append in order (or iterate reversed with prepend) and call `applyFilter()` after hydration.

---

### F-A35 — P3 · CONFIRMED — Public copy / consistency defects
- `src/pages/en/services/operations-growth.astro:171` — "Sistemas don't work unless your team uses them." (Spanish word inside an EN page).
- Heading-order skips (h1→h3, h2→h4/h5) across the six service detail pages (e.g. `es/services/apoyo-creedava.astro:44→:71`).
- `src/utils/research.ts:203-207` — a census statistic is bound to `https://www.census.gov` (generic homepage that cannot substantiate it) and the ES/EN descriptions assert **different** claims ("1 in 4 … Latino-owned" vs "1 de cada 4 … fundados por minorías"); this knowledge base feeds AI content generation, so bad citations propagate.
- `src/pages/es/services.astro:279,720` — English alt text on the Spanish page.
- `src/pages/en/services/operations-growth.astro:42` — "Tier 06 Advance Package" typo.
- **Live (2026-10-16):** `Sistemas don't work` confirmed on `/en/services/operations-growth/`; the homepage adds one more skip — h2 "Lo que nuestros clientes dicen" → h4 ×3 (testimonial names).

---

### F-A36 — P3 · CONFIRMED — Admin settings echoes stored API keys into the DOM and localStorage
**Locations:** `src/pages/admin/settings.astro:186-202` — stored keys from `settings/admin` are assigned into inputs on load (Show buttons flip `type=password`→`text`); `src/lib/firebase.ts` persists the Gemini key to `localStorage` in plaintext.

**Impact:** any script executing on an admin page (see F-A24/F-A40) can read every stored service key. Raises the blast radius of the admin-XSS class.

**Fix (proposed):** write-only secret inputs (no prefill), in-memory caching, and F-A24/F-A40 fixes as the primary mitigation.

---

### F-A37 — P3 · CONFIRMED — Broken / stale operational script cluster
- `scripts/backfill-aeo-schemas.mjs` — sends only an admin ID token; the callable now also requires App Check → **cannot work as written** (the script's own header claims otherwise).
- `scripts/update-ein-post.js` — anonymous auth writing `blogs` → impossible under current rules.
- `scripts/list-blogs.js`, `scripts/fetch-blogs.js` — client SDK without App Check → reads blocked; `list-blogs.js` hardcodes a stale copy of the web config.
- `scripts/generate-infographics.mjs:33-38` — injects the **Spanish** infographic HTML into the **English** post body.
- `scripts/update-post4-visuals.mjs` + `scripts/post-content/post4-*.md` — `tnmap.tn.gov` labelled "Tennessee Secretary of State" (wrong site).
- `scripts/README.md` documents 1 of 23 scripts; `search-console-audit.sh`/`searchconsole-audit.sh` near-duplicates; `ping-indexnow.sh` dead no-op block.

---

### F-A38 — P3 · CONFIRMED / NEEDS VERIFICATION — Agent-skill guidance: stale claims + missing hard rules
- `.agents/skills/hispanic-business-compliance/SKILL.md:64-67` — asserts BOI reporting obligations with 90/30-day deadlines and a "$591 per day" penalty. **CONFIRMED obsolete (2026-10-16):** FinCEN's BOI page (fincen.gov, page updated 2026-08-11, fetched 2026-10-16) states **U.S. companies are exempt from BOI reporting** — the skill's domestic filing deadlines and penalty guidance do not apply. Any content generated from this skill before it is fixed risks publishing wrong legal guidance.
- `.agents/skills/seo-aeo-geo-optimizer/SKILL.md` (§3) and `.agents/skills/social-media-repurposer/SKILL.md` (§1–2) prescribe macro statistics as reusable facts ("5 Million+", "$653B", "1 in 4", "90% de los emprendedores no sabe"). None is dated or sourced in-file — **NEEDS VERIFICATION externally before reuse** in published content.
- `.agents/skills/blog-visual-designer/SKILL.md` — a catalog template embeds a fabricated performance stat ("89% Éxito (+217%)") badged "Reporte SBA & Census" — an agent could paste it into a post.
- Root `AGENTS.md` carries the dedupe/App Check/`PUBLIC_*` invariants but **not** the no-price or banned-layout rules (they live only in agent memory + one skill) — F-A27 demonstrates the gap.

---

### F-A39 — P3 · CONFIRMED — Admin workflow hazards
- `src/pages/admin/blog/editor.astro:152` — a brand-new post's Status select defaults to **Published**, and "Preview" persists via `saveBlogPost(currentStatus)` → a half-written post can go live.
- `src/pages/admin/reports.astro:119` — "Save schedule" writes settings that **nothing consumes** (no scheduled function reads `reportSchedule`) — the page promises recurring reports that will never be generated.

---

### F-A41 — P2 · CONFIRMED (live) — ES landing pages link their EN counterpart to a 404
**Category:** SEO / UX

**Evidence (live, 2026-10-16):** on `/es/lp/llamanos-asesoria-negocios/` the header language switcher ("Switch to English") and the emitted alternate link both target `/en/lp/llamanos-asesoria-negocios/`:
- raw HTML contains the relative `href="/en/lp/llamanos-asesoria-negocios/"` (×2) and `<link rel="alternate" hreflang="en" href="https://guianegocios.net/en/lp/llamanos-asesoria-negocios/">`;
- `GET /en/lp/llamanos-asesoria-negocios/` → **404**.

**Source:** `src/pages/en/lp/[slug].astro` exists, but the EN build does not emit this slug, while the switcher/hreflang logic assumes a twin exists.

**Impact:** an English-speaking visitor on a live marketing page clicking "EN" lands on a 404; search engines get an `hreflang` cross-reference pointing at a 404 URL.

**Fix options:** (a) build the EN twin for both live LPs; or (b) suppress the switcher/hreflang for LP pages whose twin does not exist and route the switch to `/en/contact/` (or `/en/`). Owner decision.

---

### F-A42 — P3 · CONFIRMED (live) — Missing security headers
**Category:** Security hygiene

**Evidence (live, 2026-10-16):** response headers for `https://guianegocios.net/` contain only `strict-transport-security: max-age=31556926` — no `X-Content-Type-Options`, no `X-Frame-Options`, no `Referrer-Policy`, no CSP.

**Impact:** no MIME-sniffing protection and no framing protection — most relevant for `/admin/*` (login page can be framed → clickjacking/UI-redress). Firebase Hosting adds nothing by default; all are one `firebase.json` `headers` block away.

**Fix:** add for `**`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`; for `/admin/**`: `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`). A full CSP is a separate, larger decision.

---

### P4 observations (batch 2, compact)
- **Deployed-but-unreferenced callables:** `generateOnDemandReport`, `runSeoAudit` have no call sites in `src/` (reports regenerate client-side). Dead endpoints; remove or wire. (`runSiteWideAudit`, listed here in batch 2, was wired to the admin button on 2026-10-18 — see F-A46.)
- `settings.astro:420-422` — "Reset All Data" always reports "Data reset cancelled — this is a demo environment." (stub on production).
- Dead controls: dashboard "Traffic Overview" range select; settings "Upload Photo" button; duplicate `slugify`/`generateSlug` in the editor; unused imports (`where`, `deleteDoc`); dashboard renders `#0` position for unmeasured keywords.
- 25+ `alert()` calls across 9 admin files (functional, inconsistent with the toast system).
- `src/utils/unsplash.ts:7` comment says "65+ photos"; the array has 27.
- `src/styles/global.css` `--font-heading` lists `"Geist"` first, but no Geist webfont is loaded anywhere (`BaseLayout` loads only DM Sans + Inter) — dead font token; headings actually render in Inter.
- "Tier NN" labels on Spanish pages vs "Niveles" in the ES contact form (terminology inconsistency).
- `dataJournalism.ts` drafts omit `keywords` and tag bilingual content `language: "es"`; `readTime` hardcoded (9 / 6).
- `index.ts:224` interpolates `lang` unencoded into the autocomplete URL (admin-only); `runSeoAudit` still fetches `request.data.targetUrl` — residual post-auth SSRF (admin-only).
- `es/services.astro` renders `Tier NN` / `Más Popular` in English (7 occurrences) where ES elsewhere uses "Nivel".

## Findings — Batch 3 (2026-10-18, SEO-agent page audit)

Context: the owner asked whether the seo-agent page's score, executive summary and action items are real and meaningful. Measured first (live DB + code + live pages), then fixed:

- The score is real and current: `100 − deductions` from a server crawl of all 36 sitemap URLs, written every Sunday 02:00 UTC. History: 90 (Sep 27) → 90 → 90 → **86 (Oct 18)**.
- The executive summary is the newest audit's, AI-written but constrained to the measured deductions (verified claim-by-claim against the stored `deductions` array).
- The 17 open tasks were all real `title-length` defects (live titles measured at 72–97 chars, including the 17-char ` | GUIA NEGOCIOS` suffix appended by the layout). Fix/dismiss decisions deferred to the owner as content work.

### F-A44 — P2 · CONFIRMED — Kill switch wiped the agent config and could never pause
**Category:** Admin / Functions

**Evidence (code read + live doc, 2026-10-18):** `seo-agent.astro` `toggleKillSwitch()` wrote `{ config: { enabled: currentlyActive, killSwitch: !currentlyActive } }` — a plain map that *replaces* `config`, deleting `autonomy`, `maxQueriesPerSkill`, `summaryRecipients`, `lastRunAt` (all present in the live doc). The values written were the current state, not the flipped state: with the engine active, clicking "Pause Autonomous" re-wrote `enabled:true, killSwitch:false` (still active) while toasting "paused" — the engine could not be paused from the UI.

**Fix:** dotted-path `setDoc(doc, { 'config.enabled': nextActive, 'config.killSwitch': !nextActive }, { merge: true })`; removed a no-op `getDoc` read. Deployed.

### F-A45 — P2 · CONFIRMED — Dismissed/resolved SEO tasks resurrected every Sunday
**Category:** Functions

**Evidence:** the synthesizer's task upsert forced `status: 'open'` and `createdAt: new Date()` on every run (`merge: true` only protects fields it does not write). All 17 `seo-tasks` measured `open`; the admin page filters out only `dismissed`/`resolved`, so any dismiss action silently reverted the next Sunday.

**Fix:** the upsert reads the existing doc first; `dismissed`/`resolved` status and the original `createdAt` are preserved across re-runs. Deployed.

### F-A46 — P2 · CONFIRMED — Two scoring rubrics wrote to one collection
**Category:** Admin / Functions

**Evidence:** 24 `seoAudits` docs — the newest 4 server-written (36 pages, `deductions` array), the older 20 client/legacy-written (10–25-page browser crawl, no `deductions`, scores 83/92/94). The "Run Site-Wide Audit" button ran the client crawl with a different rubric; the server callable (`runSiteWideAudit`, 36 pages, same rubric as the weekly schedule) had zero UI callers. Pressing the button silently changed what the displayed score meant.

**Fix:** the button now calls the server callable (300 s client timeout); ~190 lines of client crawl + browser AI scoring deleted, along with the now-unused `aiModel`/`addDoc`/`serverTimestamp` imports. Deployed + verified in the live bundle.

### F-A47 — P2 · CONFIRMED — hreflang penalty counted pages that correctly have no twin
**Category:** Functions

**Evidence:** both Spanish landing pages have no `/en/` twin (both 404, verified live) and correctly carry zero hreflang after the F-A41 fix (`931e22b`). The weekly server audit still deducted 4 points for "pages with no hreflang alternates" → score 86 instead of 90. The Monday on-page skill carried the same unconditional check (it had not yet flagged the LPs because the pre-`931e22b` pages still shipped dead hreflang tags — it would have flagged them from its next run).

**Fix:** twin-aware check in both scorers (`functions/src/index.ts` + `functions/src/seo/onpage.ts`): a missing-hreflang flag requires the other-language twin to exist in the sitemap URL list (same path, lang prefix swapped; `/` ↔ `/en/` special-cased). Validated against the live sitemap: exactly 2 pages have zero hreflang (the LPs), both evaluate twin = false → zero pages falsely flagged; expected score on the next server run = **90**. Deployed.

### F-A48 — P3 · CONFIRMED — Task "Fix Now" opened the public page
**Category:** Admin

**Evidence:** `loadAgentTasks()` linked `data.url` (the live page) when present, bypassing the `getFixToolPage()` router that maps blog/LP targets to the admin surfaces.

**Fix:** always routes via `getFixToolPage(message, url)`; blog tasks → `/admin/blog`, LP tasks → `/admin/landing-pages`. Deployed.

## Part 2 — Investigated: NOT an issue (false-positive protections)

| Item | Why it looked wrong | What was verified | Verdict |
| :--- | :--- | :--- | :--- |
| Firebase web `apiKey` in `src/lib/firebase.ts` | Looks like an exposed secret | Firebase web API keys are public identifiers by design; security is enforced by Firestore rules + App Check. Same for the reCAPTCHA site key. | NOT AN ISSUE |
| `validateSlugRewrite` fetches `https://guianegocios.net{shell}` | Suspected request loop / self-fetch | Static files are matched by Hosting **before** rewrites and the shells are real static files; the function only runs for paths with no static file. Verified in prior sessions; code re-read 2026-10-16. | NOT AN ISSUE |
| Cache-Control ordering in `firebase.json` | Historically mis-ordered | Fixed previously; **re-verified in place**: extension rule precedes `/_astro/**`. | FIXED (verified) |
| Duplicate-looking `seoSchemas` docs | Look like duplicated data | Pairs carry different questions; dedupe destroyed content twice. Code carries an explicit DO-NOT-DEDUPE warning; verified present in `AeoInjector.astro` 2026-10-16. | NOT AN ISSUE — DO NOT TOUCH |
| Contact form `PUBLIC`-ish behavior | Generic form posts to Firestore | Honeypot present; `firestore.rules` enforces size caps on `contacts`/`notifications`/`mail`. | NOT AN ISSUE |
| Consent banner + Meta Pixel | Pixel code in bundle looks pre-consent | Pixel script is only requested after consent; GA4 defaults denied before choice (Consent Mode v2). Code re-read 2026-10-16. | NOT AN ISSUE |
| `en/blog/view` + `lp/view` shells indexed? | Client-side shells could be crawled as thin pages | All four carry `noindex`, are excluded from the sitemap, and are `Disallow`ed in robots.txt. | NOT AN ISSUE |
| Callable names used by the admin UI | Any `httpsCallable(name)` pointing at a non-existent function | All 11 call sites map to real exports (`getAnalyticsData`, `scanSearchConsole`, `discoverKeywords`, `verifyBacklinks`, `generateLinkOutreach`, `seoAgentRun` + client `aiModel` → `generateAiContent`). | NOT AN ISSUE |
| Firestore collections used by code | Any collection missing from `firestore.rules` | Every collection read/written by `functions/src` and by all 13 admin pages is inside the known set and covered by rules (explicit blocks or the admin-only wildcard). `backlink-prospects` is covered by the wildcard. | NOT AN ISSUE |
| Hardcoded secrets in `functions/src` | Key-shaped strings | None. Keys come from `settings/admin` or `process.env`. `functions/serviceAccount.json` does not exist (ADC path). `.gitignore` covers service-account files, `.env*`, `extensions/*.env`. | NOT AN ISSUE |
| Removed features still referenced? | Stale refs to `scheduledAeoInjector`, `wait_and_deploy.sh`, `example-blog.com`, `competitor1.com`, `loremflickr` | Appear only in comments explaining their removal. | NOT AN ISSUE |
| Service prices on the public site | Price leakage | Zero service prices across `services.astro` ×2, `about` ×2, all 6 detail pages; zero `offers`/`price` in JSON-LD. Standing constraint intact (the LP discount block is tracked separately, F-A4/F-A26). | NOT AN ISSUE |
| FAQPage duplication | Two FAQPage blocks on one page | Exactly one FAQPage each in `es/en/services.astro` and `es/en/faq.astro`; `FaqAccordion` emits no JSON-LD. | NOT AN ISSUE |
| `seo-agent` historical bugs (missing `doc` import, docId crash) | Known past incidents | Both fixes intact in current source (`urlToDocId`, imports present, stale-run reaper, kill switch). | NOT AN ISSUE |
| `smoke-test-production.mjs` + docs/07 counts | Claims of 36/39 checks | Verified exact by counting `record()` calls (36) and `checks.push` entries (39). | NOT AN ISSUE |
| CreedaVA partner link | Dead/incorrect link | `https://creedava.com` returns 200 (checked live by the deep pass 2026-10-16). | NOT AN ISSUE |

## Part 3 — Coverage matrix (what has actually been audited)

| Area | Method | Status |
| :--- | :--- | :--- |
| `firebase.json`, `firestore.rules`, workflows ×2, `package.json`, `tsconfig`, `astro.config.mjs`, `.gitignore`, `.env.example` | full read | ✅ done |
| `public/robots.txt`, `public/llms.txt`, public asset inventory | full read | ✅ done |
| Shared: `BaseLayout`, `AdminLayout`, `Header`, `Footer`, `AeoInjector`, `FaqAccordion`, `LegalDisclaimer`, `admin-utils.js`, `lp-lead-form.ts`, `i18n/utils.ts` | full read | ✅ done |
| `src/utils`: `blog.ts` (full), `admin-db.ts`, `seo-schemas.ts`, `sanitize-landing-html.ts`, `infographics.ts` (partial) | full read | ✅ done |
| Public pages: `index`, `contact` ×2, `faq` ×2, `blog` list ×2 (partial JS), `blog/[slug]` ×2, 4 view shells, `lp/[slug]` ×2 | read | ✅ done |
| `src/pages/admin/*` (13 pages) | full read (deep pass) | ✅ done |
| `functions/src/**` (index full, contentEngine, dataJournalism, linkOutreach, internalLinking, seo-agent, seo-schedules, ai, seo/* ×11) | full read (deep pass) | ✅ done |
| `scripts/**` (23 files + post-content), `docs/05`, `docs/07`, `.agents/skills/**` | full read (deep pass) | ✅ done |
| Services pages ×8, About ×2, `404.astro`, `research.ts`, `unsplash.ts`, `brand-voice.ts`, `landing-page-templates.ts` (full) | full read (deep pass) | ✅ done |
| Live production checks (status codes, headers, redirects, cache, claims, LP render) | read-only live pass + browser render, 2026-10-16 (Part 5B) | ✅ done |
| External verification (GSC, GA4, Bing, GCP console, social) | pending — requires account access | ⬜ still pending after live pass |

## Part 4 — Hard constraints carried from project memory (any fix must preserve)

1. **No published service prices** — standing owner constraint. Campaign discounts (F-A4) are a decision, not covered by the price ban.
2. **Never dedupe `seoSchemas` by keyword** — pairs hold different questions.
3. **Never read API keys from `import.meta.env.PUBLIC_*`** — Astro inlines them client-side (F-A5 violates this; fix preserves the rule).
4. **App Check is enforced in code** (`enforceAppCheck: true`) on all callables; the Firebase console cannot enforce it for Cloud Functions.
5. **Admin UI cannot be verified on localhost** (App Check) — verify on the live domain.
6. **Routing model:** Spanish home at `/`; Spanish subpages live at `/es/*` (self-canonical); only `/es` + `/es/` 301 to `/`; unprefixed paths 302 into `/es/...`. Do not "fix".
7. **Homepage emits zero FAQPage by design** — never restore.
8. **Do not touch production Firestore data** without explicit approval.

## Part 5 — Unverified items (awaiting access / live checks)

| Item | Why unverified | How to verify |
| :--- | :--- | :--- |
| ~~Live exposure of F-A26 (LP template metrics block)~~ **RESOLVED 2026-10-16** | — | Not present on either live LP (raw HTML + rendered DOM). Comparison-table block IS live — see F-A26. |
| F-A24 exploitability end-to-end on production | Verified at code level only; no live test performed (must not be exploited destructively). The live LP lead form + both contact forms are deployed as analyzed. | Review the deployed `AdminLayout` bundle + attempt a benign marker submission with owner approval |
| GCP-side claims in `docs/07` (backup schedule, PITR, uptime check ENABLED, alert email verified) | No access to `guianegocios-prod` from this workstation | Console check with the owner's account; doc/policy file are mutually consistent but status not re-measured |
| ~~BOI rule currency in `.agents/skills/hispanic-business-compliance`~~ **RESOLVED 2026-10-16** | — | fincen.gov fetched: U.S. companies exempt; skill confirmed obsolete (F-A38). |
| `research.ts` census statistic substantiation (F-A35) | Generic homepage link; needs the actual survey page | Fetch Census ABS / SBO page and cite precisely |
| ~~All live HTTP status/header checks~~ **RESOLVED 2026-10-16** | — | Live pass completed (Part 5B). |
| GSC / GA4 / Bing external state | Requires account access | Owner-assisted check |
| Production Firestore document contents (`settings/admin` key state, live `landingPages` docs, notification bodies) | No access to `guianegocios-prod` from this workstation | Admin console read with the owner's account |
| Live behaviour of the LP lead form after deployment of any F-A24 fix | Pending fix | Browser test on live domain after deploy |

## Part 5B — Live verification pass results (2026-10-16)

**Method:** read-only GET/HEAD against `https://guianegocios.net` + one browser render; project smoke harness `scripts/smoke-test-production.mjs`; git hygiene check. No writes, no destructive tests.

- **Smoke harness: 36/36 PASS** (key pages, machine files, 404 handling, wildcard slug validation, sitemap integrity — all 36 sitemap URLs 200 — consent/analytics gating, admin pages analytics-free).
- **Redirects (all 301, all correct):** `/es/` → `/`, `/about/` → `/es/about/`, `/services/` → `/es/services/`, `http://` → `https://`, `www.` → apex; `/en/blog/how-to-build-business-credit/` → 301 to the `-united-states/` slug.
- **Status:** `/sitemap.xml` 200 · IndexNow key `cb04c8ab…txt` 200 · `/admin/login` → 301 → `/admin/login/` (200, `Admin Login | GUIA NEGOCIOS`).
- **Headers:** HSTS present (`max-age=31556926`); **no** XCTO/XFO/Referrer-Policy/CSP (→ F-A42). Cache: hashed `_astro/*.js` `public, max-age=31536000, immutable`; `/images/*.webp` `max-age=2592000`; HTML `max-age=3600` — matches `firebase.json` design.
- **robots.txt:** served as designed — disallows `/admin/`, `/admin/*`, and the four view/empty shells; sitemap reference present.
- **SEO live:** canonical `/` → `https://guianegocios.net/`; hreflang en → `/en/`, es → `/`, x-default → `/`; FAQPage exactly 1 on `es/en/services` + `es/en/faq`, **0 on the homepage** (design invariant holds); zero `<img>` without `alt` on the homepage; `<html lang>` correct per locale.
- **Content live:** "15+" and all three named testimonials present on `/` and `/en/` (F-A12/F-A13); "Acreditamos los pagos" 2× on `/es/faq/` (F-A14); "Sistemas don't work" on `/en/services/operations-growth/` (F-A35); headline order h1→h2→h3s with one h2→h4 skip (testimonials section, F-A35).
- **Landing pages (raw HTML + browser render):** neither live LP contains `+500` / `4.9/5` / `Calificación Verificada` / `15%` (F-A4 and the F-A26 metrics block are not live). The **comparison-table block is live** — competitor "$300+/hora" claim, "✓ Garantizado" 24h response, "Tarifas fijas sin sorpresas" (F-A26 updated). The EN language switch + `hreflang="en"` on `/es/lp/llamanos-asesoria-negocios/` point to `/en/lp/llamanos-asesoria-negocios/` → **404** (→ F-A41). Browser render confirmed static content (no Firestore client render).
- **Admin live:** `/admin/login/` ships no robots meta (F-A1) and no analytics; AdminLayout pages (`/admin/blog/`, `/admin/settings/`, `/admin/seo-agent/`) serve 2 `<main>` tags (F-A7).
- **Performance spot-check:** homepage TTFB 0.174 s, 56,046 B, total 0.219 s — no actionable bottleneck at this scale.
- **Git hygiene:** only `.env.example` tracked among secret-pattern files; `serviceAccountKey.json`, `.env`, `extensions/firestore-send-email.env` all correctly ignored; working tree clean apart from this register.
- **Observation (not classified as a defect):** browser console logs `requestStorageAccess: Permission denied.` once on the LP page — consistent with a browser/third-party-tag storage-access probe; no user-facing failure observed. Recorded for completeness.

---

## Part 6 — Document change log

- 2026-10-16 (batch 1): Register created (F-A1…F-A14, F-A23 + NOT-AN-ISSUE table + coverage matrix).
- 2026-10-16 (batch 2): Deep pass merged — F-A24 (P1 stored XSS, lead-verified), F-A25…F-A29, F-A40, F-A30…F-A39 + P4 observations. NOT-AN-ISSUE table extended with batch-2 verified-good items. Coverage matrix updated (functions/admin/scripts/remaining pages complete). Unverified-items section added (Part 5).
- 2026-10-16 (live pass): Read-only production verification completed (Part 5B; smoke 36/36). Live evidence folded into F-A1, F-A4, F-A7, F-A12, F-A13, F-A14, F-A26, F-A35, F-A38. F-A38 BOI item upgraded to CONFIRMED obsolete (fincen.gov). F-A4/F-A26 severities P2 → P3 (no live exposure; template-only). New findings: **F-A41** (P2, LP EN dead-end 404), **F-A42** (P3, missing security headers). New P4: dead `Geist` font token. F-A7 confirmed live (2 `<main>` on AdminLayout pages; `/admin/login/` 1). Three Part 5 items resolved, table updated. Docs drift (F-A10) extended to eight items (brand colors; README runtime/engine claims).
- 2026-10-16 (fixes, #1): **F-A24 fixed in code.** New `src/utils/escape-html.ts`; AdminLayout notification sink escapes title/message/id/link + same-origin link guard; contact `mail.html` bodies escaped (ES + EN); `lp-lead-form.ts` switched to the shared util. Build 56 pages clean; compiled-bundle evidence recorded in the F-A24 entry. Deploy verification pending.
- 2026-10-16 (fixes, #1 deploy): `f931bbd` pushed → CI hosting deploy success → **F-A24 verified live in production** (deployed bundle imports the escape util, `startsWith('/')` guard present).
- 2026-10-16 (fixes, #2 — pushed `1baed15`, `accab0d`, `931e22b`):
  - **Functions** (`1baed15`): content-engine `parseDelimited` now emits the camelCase keys the consumer reads; curated outreach URLs re-verified live (dead TNHCC target removal was **only commented, not applied** — actually removed 2026-10-18, see F-A3 correction); seo skills / internal-linking / rank-history report partial/error instead of false `ok`; trends never substitute invented points; report metrics null-safe; embeddings read `contentEs || contentEn`; `verify-firestore-rules.cjs` exits non-zero on drift.
  - **Admin hardening** (`accab0d`): shared `escape-html.ts` (`escapeHtml`/`safeUrl`/`sanitizeHtml`) applied across the admin renderers that interpolate Firestore/GSC/GA4/AI text; API-key inputs write-only; localStorage key persistence removed; editor defaults to Draft; reports "schedule" UI replaced by the automatic weekly report it actually has; toasts render as text.
  - **Site** (`931e22b`): LP `hreflang`/EN-switch fallback via build-time twin detection; blog hydration newest-first + filter reapply; `/admin/*` and `/admin/login/` `noindex`+`noTracking` (login had 8 gtag occurrences in dist before the fix); `.env.example` rewritten to the real env surface; seed tax-content corrections; EN copy typos; ES alt texts.
- 2026-10-16 (fixes, #3 — committed with this register update): docs drift F-A10 ×8 (routing model; brand palette `#1B4E2B`/`#F0C850`/`#1A2E35`/`#1E2A2F`; noindex usage; clone URL; split `firebase deploy` guidance; Node 24); `.agents/AGENTS.md` (bilingual structure, palette, stale Figma wait); root `AGENTS.md` (no-prices + no-unsourced-stats invariants); skills (pricing archetypes removed; BOI section rewritten to the March-2025 FinCEN exemption; fabricated 28/62/89 % bars + off-brand blues removed); scripts (4 unpublish-risk scripts deleted; `generate-infographics.mjs` never writes Spanish HTML into EN bodies; `scripts/README.md` rewritten); **F-A42** security headers added to `firebase.json`.
- 2026-10-16 (**functions deploy BLOCKED**): `npx firebase deploy --only functions` fails — the Firebase CLI is logged in as `contact@evrconstructions.com`, which lacks `iam.serviceAccounts.ActAs` on `guianegocios-prod@appspot.gserviceaccount.com`. Fix: log the CLI into the project-owner account (`npx firebase login:add` / `login:use`) or grant the role in GCP IAM. Until then the functions fixes exist only in git (`1baed15`), NOT in production. **RESOLVED 2026-10-16 — owner logged into the correct account; functions deployed (see fixes #5).**
- 2026-10-16 (new finding **F-A43**): GitHub reports 33 dependency advisories on the default branch on every push (1 critical, 16 high, 10 moderate, 6 low); `functions/` local `npm audit` reports 5 (4 high, 1 critical). Not auto-fixed — major-version bumps need review. OPEN / owner decision.
- 2026-10-16 (fixes, #4): **F-A35 completed** — heading hierarchy corrected in all six service detail pages (the h1→h3 eyebrow is now h2; every h4/h5 sub-heading is now h3) and the testimonial author names on both homepages (h2→h4 skip → h3). Classes untouched, so rendering is unchanged. F-A35 → FIXED.
- 2026-10-16 (fixes, #5 — dependencies + deploy + heading close-out):
  - **Functions deployed.** Owner logged into the correct CLI account; agent redeployed after the dependency bump — "Deploy complete", all functions updated. All functions-side fixes (F-A25, F-A3, F-A30–F-A33) are now **live in production**. Note: `functions/lib/` is gitignored and was stale locally — rebuilt before deploying.
  - **F-A43 FIXED.** Root `npm audit` 10 → **0** (`npm audit fix` cleared brace-expansion, http-cache-semantics, sharp, smol-toml, source-map-js; the remaining `firebase → @firebase/firestore → @grpc/grpc-js` chain was closed with a `@grpc/grpc-js ^1.14.6` override — npm's own suggestion was a downgrade to firebase@9, rejected). `functions/` audit 5 → **0** (undici, the **critical** `proxy-addr`, brace-expansion, @grpc/grpc-js, @fastify/busboy; lockfile-only). Build re-verified: 56 pages clean, functions `tsc` clean.
  - **Heading skips (all 56 built pages rescanned):** fixed the footer heading levels (removes the 404 page's h1→h3 skip globally) and the blog `view` shells (ToC/Related → h2, injected card titles → h3). Residual skips are only the noindex admin surface (12 pages, card h3 under h1) and Firestore-stored content (16 blog posts + 1 LP) — not fixable in code. **Public code-hosted pages: zero skips.** Both FAQ pages measured clean.
  - **F-A14 (owner input):** notary/translation service confirmed real by the owner → that claim resolved; the "credit prior standalone payments" claim still awaits confirmation.
  - **F-A10 completed:** docs/02 route map now lists the FAQ pages, the four `view` shells, `admin/analytics.astro` and `admin/backlinks/outreach.astro`; README's AI badge/SVG/table claims aligned to Vertex AI + nodejs24.
  - **F-A11:** empty `src/pages/[lang]/` directory tree removed.
- 2026-10-18 (fixes, #6 — session close): **F-A8 fixed** — dead UI removed: login "Remember me" checkbox, admin header search box, and `window.simulateAction()` (grep re-checked for callers first; `docs/00` helper table updated). Build 56 pages clean. **Audit session closed** — every code-fixable finding is fixed and, where applicable, deployed and live-verified; remaining items are owner decisions (F-A4 / F-A12 / F-A13 / F-A14 payment-crediting claim / F-A23 / F-A26-live) plus the P4 admin-surface heading order (internal, noindex).
- 2026-10-18 (fixes, #7 — SEO-agent page audit, `1a9b3f8`): new findings **F-A44–F-A48** fixed, functions deployed, hosting CI green, live bundle verified (callable wired, client crawl gone). Owner can confirm F-A47 by pressing "Run Site-Wide Audit" (now the 36-page server run) — expected score 90. The 17 `title-length` tasks remain open by design: they are real defects awaiting the owner's content decision (F-title work), after which Mark Done/dismissals now stick.
- 2026-10-18 (fixes, #8 — title-length batch, `703b012`): **all 17 `title-length` tasks fixed** (owner-approved "proceed to those"). 13 blog titles (7 Firestore docs × `titleEn`/`titleEs`) + 2 landing-page titles (`landingPages.title`) shortened in Firestore (backup `~/guianegocios-backups/titles-pre-shorten-2026-10-18.json`; validated ≤54 stored before writing), and the 2 services-page titles shortened in `src/i18n/en.json`/`es.json`. Every one of the 17 pages now renders **57-68 chars** (was 71-97), inside the crawler's 25-70 limit; primary keywords kept (knoxville business license, llc sin ssn, itin, credito, contabilidad, licencia comercial...). dist-verified locally before push; the 17 `seo-tasks` docs were marked `resolved` in Firestore after live verification. Convention documented in `docs/04` (rendered title = stored + 16-char suffix → keep stored ≤ 54).
