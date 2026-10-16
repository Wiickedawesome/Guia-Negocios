# Guia Negocios — Enterprise Platform Architecture & Codebase Guide

[![Framework: Astro 7](https://img.shields.io/badge/Framework-Astro_v7-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Styling: Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Database: Firebase Firestore](https://img.shields.io/badge/Database-Firebase_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![AI Engine: Vertex AI](https://img.shields.io/badge/AI_Engine-Vertex_AI_Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://cloud.google.com/vertex-ai)
[![TypeScript: Strict](https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Executive Overview & Business Purpose

**Guia Negocios** is an enterprise-grade, bilingual business consulting and digital infrastructure platform tailored for Hispanic and multicultural business owners across East Tennessee and beyond. 

The application serves dual operational functions:
1. **Public Multilingual Web Portal (`/en`, `/es`):** Delivers localized marketing, service breakdowns, interactive consultation scheduling, and dynamic educational blog resources regarding business formation (LLC, EIN, licensing), compliance, and operational growth.
2. **Integrated Admin Operations Suite (`/admin`):** Provides business managers with an easy-to-use CMS, blog editor powered by EasyMDE, Gemini-assisted AI content copilot, real-time SEO audit tools, keyword tracking, backlink management, and conversion landing page builders.

---

## System Architecture

The project leverages a hybrid Jamstack architecture combining static site generation (SSG) via Astro 7 for ultra-fast performance, localized client hydration, and serverless real-time data persistence via Cloud Firestore and Firebase Cloud Functions.

### High-Level Architecture Diagram

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 440" width="100%" height="100%" style="background:#0F172A; border-radius: 12px; font-family: system-ui, -apple-system, sans-serif;">
  <!-- Definitions -->
  <defs>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <linearGradient id="darkCard" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#6D28D9"/>
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="450" y="32" fill="#F8FAFC" font-size="16" font-weight="700" text-anchor="middle" letter-spacing="1">GUIA NEGOCIOS — SYSTEM ARCHITECTURE</text>

  <!-- Client Layer -->
  <rect x="40" y="60" width="220" height="340" rx="10" fill="url(#darkCard)" stroke="#334155" stroke-width="1.5"/>
  <rect x="40" y="60" width="220" height="36" rx="10" fill="#1E293B"/>
  <text x="150" y="83" fill="#93C5FD" font-size="13" font-weight="700" text-anchor="middle">CLIENT & PRESENTATION</text>

  <rect x="55" y="110" width="190" height="65" rx="8" fill="#0F172A" stroke="#2563EB" stroke-width="1"/>
  <text x="150" y="135" fill="#F8FAFC" font-size="12" font-weight="700" text-anchor="middle">Public Portal (EN/ES)</text>
  <text x="150" y="155" fill="#94A3B8" font-size="10" text-anchor="middle">Static Pages & Dynamic Blogs</text>

  <rect x="55" y="190" width="190" height="65" rx="8" fill="#0F172A" stroke="#2563EB" stroke-width="1"/>
  <text x="150" y="215" fill="#F8FAFC" font-size="12" font-weight="700" text-anchor="middle">Admin Workspace</text>
  <text x="150" y="235" fill="#94A3B8" font-size="10" text-anchor="middle">Dashboard, CMS, Editor, SEO</text>

  <rect x="55" y="270" width="190" height="115" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
  <text x="150" y="293" fill="#38BDF8" font-size="11" font-weight="700" text-anchor="middle">Frontend UI Stack</text>
  <text x="150" y="315" fill="#94A3B8" font-size="10" text-anchor="middle">• Astro Components (.astro)</text>
  <text x="150" y="333" fill="#94A3B8" font-size="10" text-anchor="middle">• React Hydrated Islands</text>
  <text x="150" y="351" fill="#94A3B8" font-size="10" text-anchor="middle">• Tailwind CSS v4 Engine</text>
  <text x="150" y="369" fill="#94A3B8" font-size="10" text-anchor="middle">• EasyMDE Markdown Editor</text>

  <!-- Server/Build Layer -->
  <rect x="340" y="60" width="220" height="340" rx="10" fill="url(#darkCard)" stroke="#334155" stroke-width="1.5"/>
  <rect x="340" y="60" width="220" height="36" rx="10" fill="#1E293B"/>
  <text x="450" y="83" fill="#60A5FA" font-size="13" font-weight="700" text-anchor="middle">ASTRO BUILD ENGINE</text>

  <rect x="355" y="110" width="190" height="75" rx="8" fill="url(#blueGrad)"/>
  <text x="450" y="138" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">Astro SSG Compiler</text>
  <text x="450" y="158" fill="#DBEAFE" font-size="10" text-anchor="middle">Zero-JS HTML Static Output</text>

  <rect x="355" y="200" width="190" height="75" rx="8" fill="#0F172A" stroke="#3B82F6" stroke-width="1"/>
  <text x="450" y="228" fill="#F8FAFC" font-size="12" font-weight="700" text-anchor="middle">i18n Translation Engine</text>
  <text x="450" y="248" fill="#94A3B8" font-size="10" text-anchor="middle">en.json / es.json Dictionaries</text>

  <rect x="355" y="290" width="190" height="95" rx="8" fill="#0F172A" stroke="#334155" stroke-width="1"/>
  <text x="450" y="315" fill="#38BDF8" font-size="11" font-weight="700" text-anchor="middle">Markdown Pipeline</text>
  <text x="450" y="338" fill="#94A3B8" font-size="10" text-anchor="middle">markdownToHtml()</text>
  <text x="450" y="358" fill="#94A3B8" font-size="10" text-anchor="middle">processHtmlForBlog() (Auto ToC)</text>

  <!-- Cloud Services Layer -->
  <rect x="640" y="60" width="220" height="340" rx="10" fill="url(#darkCard)" stroke="#334155" stroke-width="1.5"/>
  <rect x="640" y="60" width="220" height="36" rx="10" fill="#1E293B"/>
  <text x="750" y="83" fill="#FBBF24" font-size="13" font-weight="700" text-anchor="middle">FIREBASE CLOUD BACKEND</text>

  <rect x="655" y="110" width="190" height="80" rx="8" fill="url(#amberGrad)"/>
  <text x="750" y="138" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">Cloud Firestore</text>
  <text x="750" y="158" fill="#FEF3C7" font-size="10" text-anchor="middle">Collection: 'blogs'</text>
  <text x="750" y="173" fill="#FEF3C7" font-size="10" text-anchor="middle">Metadata & Page Metrics</text>

  <rect x="655" y="205" width="190" height="80" rx="8" fill="url(#purpleGrad)"/>
  <text x="750" y="233" fill="#FFFFFF" font-size="13" font-weight="700" text-anchor="middle">Google Vertex AI</text>
  <text x="750" y="253" fill="#EDE9FE" font-size="10" text-anchor="middle">Firebase AI Logic · Vertex AI</text>
  <text x="750" y="268" fill="#EDE9FE" font-size="10" text-anchor="middle">Blog Draft Copilot</text>

  <rect x="655" y="300" width="190" height="85" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="1"/>
  <text x="750" y="325" fill="#F8FAFC" font-size="12" font-weight="700" text-anchor="middle">Firebase Functions</text>
  <text x="750" y="345" fill="#94A3B8" font-size="10" text-anchor="middle">TypeScript Node 24 Runtime</text>
  <text x="750" y="360" fill="#94A3B8" font-size="10" text-anchor="middle">SEO & Analytics Tasks</text>

  <!-- Connectors -->
  <line x1="260" y1="140" x2="340" y2="140" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="260" y1="220" x2="640" y2="140" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>
  <line x1="560" y1="145" x2="640" y2="145" stroke="#F59E0B" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="260" y1="240" x2="640" y2="245" stroke="#A855F7" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>
</svg>

---

## Core Features & System Capabilities

### 1. Bilingual Routing & Localization (`/en` & `/es`)
* Strict sub-path architecture ensuring no localized content leakage between routes.
* Translation utility ([src/i18n/utils.ts](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/utils.ts)) reading dictionary tokens from [en.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/en.json) and [es.json](file:///home/wicked/Projects/Guia%20Negocios/src/i18n/es.json).
* Automatic `<link rel="alternate" hreflang="...">` meta insertion in [BaseLayout.astro](file:///home/wicked/Projects/Guia%20Negocios/src/layouts/BaseLayout.astro).

### 2. Firestore-Backed Blog & Content Management
* Dynamic fetching of blog posts from Firebase Firestore (`blogs` collection).
* Real-time content transformation via `markdownToHtml` and `processHtmlForBlog` in [src/utils/blog.ts](file:///home/wicked/Projects/Guia%20Negocios/src/utils/blog.ts), providing auto-generated Headings TOC (Table of Contents) and responsive image wrappers.

### 3. Integrated Admin Workspace (`/admin`)
* **Blog Editor (`/admin/blog/editor`):** Built-in **EasyMDE** Markdown editor instance.
* **AI Copilot (`Gemini`):** Direct injection of generated bilingual blog drafts with formatted markdown headings (`##`) and curated Unsplash imagery.
* **SEO Audit & Keywords (`/admin/seo-audit`, `/admin/keywords`):** Automated site metrics and search rank audit view.
* **Landing Page Builder (`/admin/landing-pages/builder`):** Dynamic landing page creation tool.

---

## Technology Stack

| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Framework** | [Astro](https://astro.build) | `^7.1.3` | Static Site Generation & Island Architecture |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | `^4.3.3` | Utility-first styling engine with Vite plugin |
| **UI Components** | [React](https://react.dev) | `^19.2.7` | Hydrated client widgets & administrative tools |
| **Database** | [Firebase Firestore](https://firebase.google.com/docs/firestore) | `^12.16.0` | Cloud Document Database |
| **AI Integration** | Google Vertex AI — Gemini models (`firebase/ai` in the browser, `@google/genai` in functions) | `^12.16.0` | In-browser & backend AI Copilot |
| **Backend API** | [Firebase Cloud Functions](https://firebase.google.com/docs/functions) | Node 24 | Serverless backend routines |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Strict | Type safety across client & functions |

---

## Repository Structure & Folder Purpose Map

```
guia-negocios/
├── .agents/                    # Workspace agent guidelines & rules (AGENTS.md)
├── docs/                       # Enterprise Technical Documentation
│   ├── 00-AI-AGENT-GUIDE.md    # Master AI Agent System & Architectural Guide
│   ├── 01-architecture.md      # Detailed Technical Architecture & Stack Specs
│   ├── 02-components-and-pages.md # Page Route Maps & Component Hierarchy
│   ├── 03-styling-and-i18n.md  # Design Tokens, Glassmorphism & i18n Mechanics
│   ├── 04-firebase-and-cms.md  # Firestore Data Model & Blog Copilot Engine
│   ├── 05-development-and-deployment.md # Setup, Commands & Firebase Hosting
│   └── 06-troubleshooting-and-decision-logs.md # Gotchas & ADR Decision Records
├── functions/                  # Firebase Cloud Functions (Node 24 TypeScript)
│   ├── src/                    # Cloud Function handlers (index.ts)
│   └── tsconfig.json           # Functions TypeScript compiler configuration
├── public/                     # Static Web Assets
│   ├── GuiaNegociosFAV.png     # Website Favicon
│   └── images/                 # Optimized static site imagery & logos
├── scripts/                    # Developer Utility Scripts
│   ├── README.md               # Script Documentation
│   └── fetch-blogs.js          # Firestore database verification tool
├── src/                        # Main Astro Application Source
│   ├── components/             # Reusable UI Components (Header, Footer, FAQ)
│   ├── i18n/                   # Translation Dictionaries (en.json, es.json) & Utils
│   ├── layouts/                # Base & Admin Page Layout Wrappers
│   ├── lib/                    # Shared Libraries & Firebase SDK Instances
│   ├── pages/                  # File-based Page Routes
│   │   ├── admin/              # Management Dashboard & EasyMDE Blog Editor
│   │   ├── en/                 # English Public Pages (Home, Services, Blog, Contact)
│   │   ├── es/                 # Spanish Public Pages (Inicio, Servicios, Blog, Contacto)
│   │   └── index.astro         # Root Route Redirector
│   ├── scripts/                # Client-side UI Toast & Modal Utilities
│   ├── styles/                 # Tailwind CSS Global Stylesheets
│   └── utils/                  # Blog Markdown Parsers & ToC Generators
├── .env.example                # Documented Environment Variable Template
├── .gitignore                  # Security & Git Exclusion Rules
├── astro.config.mjs            # Astro Framework & Tailwind Vite Config
├── firebase.json               # Firebase Hosting & Functions Configuration
├── firestore.rules             # Cloud Firestore Security Rules
├── package.json                # Project Dependencies & Build Scripts
└── tsconfig.json               # Root TypeScript Settings
```

---

## Installation & Local Development

### Prerequisites
* **Node.js:** `>=22.12.0` (LTS recommended)
* **npm:** `>=10.0.0`
* **Firebase CLI:** `npx -y firebase-tools@latest`

### Step 1 — Clone & Install Dependencies
```bash
git clone https://github.com/guianegocios/guia-negocios.git
cd guia-negocios

# Install root dependencies
npm install

# Install Cloud Functions dependencies
cd functions && npm install && cd ..
```

### Step 2 — Environment Setup
Copy `.env.example` to `.env` and fill in your Firebase credentials:
```bash
cp .env.example .env
```

### Step 3 — Start Development Server

Per project guidelines, use **background mode** when running the Astro dev server:

```bash
# Start Astro dev server in background
npx astro dev --background

# Inspect background server status
npx astro dev status

# Stream background server logs
npx astro dev logs

# Stop background server
npx astro dev stop
```

The application will be accessible locally at `http://localhost:4321`.

---

## Build & Production Deployment Workflow

### Build Verification
To generate the static production bundle:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

### Deploying to Firebase Hosting

Ensure Firebase CLI is authenticated and active project is selected:

```bash
# Authenticate with Firebase
npx firebase login

# Deploy static site & functions
npx firebase deploy
```

---

## Environment Variables Reference

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `PUBLIC_FIREBASE_API_KEY` | Client (`public`) | Firebase Web API Key |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Client (`public`) | Firebase Auth Domain URL |
| `PUBLIC_FIREBASE_PROJECT_ID` | Client (`public`) | Firebase GCP Project ID |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Client (`public`) | Firebase Cloud Storage Bucket |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client (`public`) | Cloud Messaging Sender ID |
| `PUBLIC_FIREBASE_APP_ID` | Client (`public`) | Firebase Application ID |

---

## Coding Standards & Architectural Guidelines

1. **Strict Language Separation:** `/src/pages/en/` and `/src/pages/es/` must remain completely isolated. Do not mix English and Spanish text in the same page file.
2. **Brand Color Tokens:** Always use custom design system colors defined in Tailwind CSS (`brand-primary` `#2563EB`, `brand-dark` `#0F172A`, `brand-gray` `#64748B`) rather than unstyled browser defaults.
3. **Firebase Singleton Instances:** All Firebase client services must import the pre-initialized singletons `db` and `aiModel` from `src/lib/firebase.ts`. Never re-initialize `initializeApp()` inside individual UI components.
4. **Security Enforcement:** Never commit GCP service account `.json` key files or `.env` files to git. Use standard `.gitignore` rules.

---

## Future Roadmap

- [ ] **Multi-tenant Client Portal:** Secure client login for document upload & tracking LLC registration progress.
- [ ] **Automated Appointment Scheduler:** Native Google Calendar / Cal.com integration for direct strategy session booking.
- [ ] **Expanded AI Capabilities:** Automated translation synchronization between English and Spanish blog drafts in EasyMDE.
- [ ] **PWA Offline Support:** Service worker implementation for cached offline blog reading.

---

## License & Legal

Copyright © 2026 **Guia Negocios**. All rights reserved.  
Unpublished proprietary software. Unauthorized copying, distribution, or modification is strictly prohibited.

---

## Contact & Support

* **Business Entity:** GUIA NEGOCIOS
* **Service Area:** Knoxville, TN & Regional Southeastern US
* **Website:** [https://guianegocios.net](https://guianegocios.net)
* **Technical Support:** `support@guianegocios.net`
