# Development Workflow & Deployment Guide — Guia Negocios

## 1. Local Environment Setup

### Prerequisites
- Node.js version 24 or higher (`node -v`) — matches the Cloud Functions Node 24 runtime
- npm version 10 or higher (`npm -v`)
- Firebase CLI (`npx -y firebase-tools@latest`)

### Step-by-Step Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/Wiickedawesome/Guia-Negocios.git
   cd guia-negocios
   ```

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **Install functions dependencies:**
   ```bash
   cd functions && npm install && cd ..
   ```

4. **Environment File Configuration:**
   Copy `.env.example` to `.env` and fill in Firebase project parameters:
   ```bash
   cp .env.example .env
   ```

---

## 2. Background Dev Server Workflow

Per workspace guidelines, start the Astro dev server in **background mode**:

```bash
# Launch background server
npx astro dev --background

# Check status of background server process
npx astro dev status

# Stream logs from background server
npx astro dev logs

# Stop background server
npx astro dev stop
```

---

## 3. Production Build & Static Site Generation

To verify that all pages compile cleanly into the `dist/` production static directory:

```bash
npm run build
```

This command triggers `astro build`, compiling static HTML pages for all routes (`/en/*`, `/es/*`, `/admin/*`).

### Build-time Firestore credentials

Blog posts, landing pages, AEO schemas and landing-page HTML are read from Firestore **at build time**. Those reads run in Node, where the client SDK cannot obtain a normal App Check token, so a second path is needed as well.

Reads try **two paths in order** and fail loudly only if **both** fail:

1. **Admin SDK** (`src/utils/admin-db.ts`) — used when a service-account credential is present.
2. **Client SDK with an App Check debug token** — used when `APP_CHECK_DEBUG_TOKEN` is set and that token is registered in the Firebase console.

**Neither path is mandatory, and that is deliberate.** Making the Admin SDK mandatory broke CI: the CI service account (`github-action-…@`) has no Firestore role, so `7 PERMISSION_DENIED`, build exit 1, and hosting stopped redeploying.

> **CI is carried by the client-SDK fallback, not by the service account.** The workflow does pass `FIREBASE_SERVICE_ACCOUNT_KEY`, but that service account currently lacks a Firestore role, so the Admin SDK path fails there. The debug-token path is what actually builds in CI — evidenced by successive green `firebase-hosting-merge.yml` runs during the same period.
>
> **Do not repeat the "content was missing for months" story.** App Check is enforced, so build-time reads do fail *without* a debug token — but that describes **local builds only** (`.env` has no `APP_CHECK_DEBUG_TOKEN`). CI has the token. The live site was verified to hold the full content throughout. One real production defect did exist: one EN post was absent from the sitemap while `firebase.json` 301'd its Firestore slug to a URL that 404'd.

Admin SDK credentials are resolved in this order:

1. `FIREBASE_SERVICE_ACCOUNT_KEY` (or `FIREBASE_SERVICE_ACCOUNT_JSON`) — raw JSON or base64-encoded JSON. This is how CI supplies the key.
2. `GOOGLE_APPLICATION_CREDENTIALS` — path to a service account JSON file.
3. `serviceAccountKey.json` — project root, for local development (gitignored).
4. Application Default Credentials (`gcloud auth application-default login`).

> Use a credential for **`guianegocios-prod`**. The project ID is pinned in `src/utils/admin-db.ts`, because ADC otherwise resolves the project from the local gcloud config and silently queries an empty database.

The credential must be able to read Firestore. `scripts/verify-firestore-rules.cjs` (local rules tests) and `scripts/check-deployed-rules.cjs` (confirms the deployed ruleset matches `firestore.rules`) use it for verification.

---

## 4. Deployment to Firebase Hosting

### Deploying Frontend Site & Cloud Functions

```bash
# Log in to Firebase CLI
npx firebase login

# Select active project
npx firebase use --add

# Deploy hosting only (usually automated — CI deploys on push to main)
npx firebase deploy --only hosting

# Deploy Cloud Functions (requires the Service Account User role on the project)
npx firebase deploy --only functions

# Full deploy (hosting + functions + rules) — admin use
npx firebase deploy
```

### Verified deploy sequence (verified 2026-11-05)

```bash
npx firebase login:list          # confirms an account is cached — NOT that the token works
npx firebase use                 # must print guianegocios-prod
npm run build                    # gate: no errors, and "N page(s) built"
npx firebase deploy --only hosting
node scripts/smoke-test-production.mjs   # gate: expect "0 failed"
```

**Do not hardcode the page count as the gate.** Blog posts and landing pages are read from Firestore at build time, so `page(s) built` and the sitemap URL count change whenever content is published, with no source edit. Measured on 2026-11-05 the build reported 58 pages / 38 sitemap URLs; on 2026-11-06 the same source reported 60 / 40 purely because two blog URLs were published in between. The gate is `0 failed` from the smoke test, not a fixed number.

A healthy deploy prints `found N files in dist`, `version finalized`, `release complete`. The CLI deploys whatever is in `dist/`, so **always build immediately before deploying** — it does not rebuild for you.

If it aborts with `Your credentials are no longer valid`, see `docs/06` Issue 4 — a human must run `login --reauth`.

### ⚠ Branch vs `main`

CI deploys hosting on push to **`main`**, but a manual `firebase deploy --only hosting` deploys **whatever branch is checked out**. Those can diverge, and on 2026-11-05 they did: production shipped `redesign/site-refresh-2026-11` while `main` still pointed at the pre-redesign commit.

**Consequence:** the next push to `main` triggers CI and reverts production to whatever `main` contains. After any manual branch deploy, merge that branch into `main` before the next `main` push, or production silently rolls back.

### Post-deploy verification

`scripts/smoke-test-production.mjs` is the gate. It exits non-zero on failure and covers the failures that were actually found live: branded 404 returning a real 404 status, wildcard blog/LP slugs 404ing instead of thin 200s, redirect loops on multi-segment paths, editor attributes or build-time `lastmod` leaking into output, analytics on admin pages, and the consent gate on public pages. Run it against production, or pre-flight a local build:

```bash
SMOKE_BASE_URL=http://localhost:4322 node scripts/smoke-test-production.mjs
```

### ⚠ A new post is readable but NOT in the sitemap until you redeploy

The blog rewrite (`/es|en/blog/**` → `validateSlugRewrite`) validates the slug against Firestore and serves the `blog/view` shell, which then fetches the post client-side. So a post published *after* the last build:

* **is** reachable — it returns `200` and renders for users;
* is **not** in `sitemap-0.xml`, because that file is generated at build time;
* serves a shell whose `<title>` is `Blog | Guia Negocios`, not the post title — no per-post SEO metadata.

Confirmed 2026-11-06: `/en/blog/knox-county-business-license-guide-tennessee/` returned `200` with the shell title while the deployed sitemap contained **0** references to it, and the local build listed it.

**Consequence:** publishing content and deploying are two separate steps. After any publish, rebuild and redeploy, or the new URL stays out of the sitemap and Google indexes a shell.

### Deploying Security Rules Only

To deploy updated `firestore.rules` without redeploying site code:

```bash
npx firebase deploy --only firestore:rules
```
