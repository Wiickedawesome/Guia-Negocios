# Guia Negocios - Agent Guidelines

Welcome to the Guia de Negocios repository. Please adhere to the following architectural, design, and structural rules when assisting with code modifications or feature additions.

## 1. Tech Stack
- **Framework:** Astro (Static Site Generation / SSR)
- **Styling:** Tailwind CSS (Vanilla CSS is heavily supplemented by Tailwind utility classes here)
- **Backend/Database:** Firebase Firestore
- **AI Integration:** Google Gemini (via `firebase/ai`)
- **Icons/Images:** Pexels & Unsplash stock photography, inline SVG icons.

## 2. Project Architecture
- **Bilingual Structure:** The site is fully bilingual. Page routes are split strictly into `/src/pages/en/` and `/src/pages/es/`. Do not mix English and Spanish content within a single page component.
- **I18n:** Shared UI elements (like headers/footers) use the dictionary in `src/i18n/ui.ts` via the `useTranslations` utility.
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
