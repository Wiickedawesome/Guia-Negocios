# Development Workflow & Deployment Guide — Guia Negocios

## 1. Local Environment Setup

### Prerequisites
- Node.js version 22 or higher (`node -v`)
- npm version 10 or higher (`npm -v`)
- Firebase CLI (`npx -y firebase-tools@latest`)

### Step-by-Step Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/guianegocios/guia-negocios.git
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

### Build-time Firestore credentials (required)

Blog posts, landing pages, and AEO schemas are read from Firestore **at build time**. Those reads run in Node, where the client SDK cannot obtain an App Check token, so the build uses the Firebase Admin SDK instead. Without a usable credential the build **fails on purpose** — previously it silently fell back to hardcoded content, which shipped only 4 of 8 posts and omitted every landing page.

Credentials are resolved in this order:

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

# Deploy hosting and functions targets
npx firebase deploy
```

### Deploying Security Rules Only

To deploy updated `firestore.rules` without redeploying site code:

```bash
npx firebase deploy --only firestore:rules
```
