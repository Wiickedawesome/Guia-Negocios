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
             Cloud Firestore (db)               Google Gemini API (aiModel)
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
