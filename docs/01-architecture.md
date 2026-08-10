# Technical Architecture & System Design — Guia Negocios

## 1. Overview

**Guia Negocios** is built using a modern Jamstack architecture designed for extreme performance, high search engine visibility (SEO), and low operational maintenance cost.

The system combines static page generation (SSG) with dynamic serverless database persistence via Cloud Firestore and on-demand artificial intelligence capabilities via Google Gemini.

---

## 2. High-Level Component Diagram

```
                        ┌─────────────────────────────────┐
                        │      Client Web Browser         │
                        └────────────────┬────────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   │                                           │
                   ▼                                           ▼
       ┌──────────────────────┐                    ┌──────────────────────┐
       │   Public Static SSG  │                    │   Admin Operations   │
       │    Pages (EN / ES)   │                    │    Suite (/admin)    │
       └───────────┬──────────┘                    └───────────┬──────────┘
                   │                                           │
                   │           ┌──────────────────┐            │
                   └──────────►│ Cloud Firestore  │◄───────────┘
                               │ Database ('blogs')│
                               └─────────┬────────┘
                                         │
                                         ▼
                               ┌──────────────────┐
                               │  Google Gemini   │
                               │  AI Model Engine │
                               └──────────────────┘
```

---

## 3. Core Technical Decisions

### A. Astro 5 Framework Choice
* **Why Astro?** Guia Negocios is a content-rich business portal. Astro ships zero JavaScript by default for static pages, resulting in perfect Google Lighthouse scores and superior mobile web performance.
* **Island Architecture:** Interactive components (such as administrative forms or dynamic modals) are hydrated only when required.

### B. Cloud Firestore for Content
* **Why Firestore?** Rather than committing markdown files to git, non-technical business managers need an online blog & CMS editor. Firestore provides real-time document sync, security rules, and seamless web SDK integration.

### C. Tailwind CSS v4 Engine
* **Why Tailwind v4?** Next-generation styling performance with first-class `@theme` directive support directly inside standard CSS stylesheets without complex PostCSS configurations.
