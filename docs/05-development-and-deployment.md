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
