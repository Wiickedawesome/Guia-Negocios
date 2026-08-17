---
name: seo-aeo-geo-optimizer
description: Complete framework for optimizing content for Google Search (SEO), AI Answer Engines (Perplexity, ChatGPT Search, Gemini, Claude - AEO), and Generative Search Overviews (Google AI Overviews - GEO).
---

# SEO, AEO & GEO Optimization Skill

This skill provides step-by-step methodologies to ensure content published on **GUIA DE NEGOCIOS** ranks at the top of Google and Bing (SEO) and is selected and cited as the authoritative source by generative AI search engines (Perplexity, ChatGPT Search, Gemini, Claude, and Google AI Overviews).

---

## 1. The Three Pillars: SEO vs. AEO vs. GEO

| Dimension | Target Platforms | Primary Objective | Optimization Strategy |
| :--- | :--- | :--- | :--- |
| **SEO (Search Engine Optimization)** | Google, Bing, Yahoo | Keyword rankings, organic click-throughs | H1-H3 hierarchy, semantic keywords, meta descriptions, clean URLs, internal linking. |
| **AEO (Answer Engine Optimization)** | Perplexity, ChatGPT Search, Gemini, Claude, Siri | Being quoted as the direct answer in conversational AI | 1-2 sentence definition blocks under H2s, structured Q&A formats, direct factual answers. |
| **GEO (Generative Engine Optimization)** | Google AI Overviews, LLM Synthesis Engines | Inclusion in AI generated multi-source summaries | Statistical citations ($653B, 178%), comparative tables, visual checklists, entity density (IRS, SBA). |

---

## 2. AEO Direct-Answer Hook Formula
When crafting any H2 section:
1. **The Heading:** State the exact question or high-intent query (e.g., `## ¿Qué es un Número EIN y Por Qué lo Necesita?`).
2. **The Direct-Answer Lead (AEO Hook):** The first 1-2 sentences MUST provide the complete, concise, self-contained definition without filler words:
   > *"Un Número de Identificación del Empleador (EIN) es un identificador tributario federal único de nueve dígitos emitido por el IRS que permite a las empresas contratar personal, abrir cuentas bancarias comerciales y blindar los números de Seguro Social de sus propietarios."*
3. **The Deep-Dive:** Follow immediately with numbered key points with bold leads, comparison tables, or visual checklists.

---

## 3. GEO Entity & Statistical Anchoring
Generative engines evaluate authority based on co-occurrence with verified entities and authoritative data:
* **Government Entities:** IRS, U.S. Small Business Administration (SBA), U.S. Patent and Trademark Office (USPTO), U.S. Census Bureau, SCORE, State Secretaries of State.
* **Economic Milestones:**
  * 5 Million+ Latino-owned businesses in the U.S.
  * $653 Billion annual contribution to the U.S. economy (Brookings/SLEI).
  * 1 in 4 new businesses nationwide founded by Hispanic entrepreneurs.
  * $25,000 IRS penalties for Form 5472 non-compliance (foreign-owned LLCs).

---

## 4. Structured JSON-LD Schema Templates

### Article Schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Spanish or English Post Title]",
  "description": "[Meta Description under 160 characters]",
  "author": {
    "@type": "Organization",
    "name": "Guia Negocios Team",
    "url": "https://guianegocios.net"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Guia Negocios",
    "logo": {
      "@type": "ImageObject",
      "url": "https://guianegocios.net/images/team-avatar.webp"
    }
  },
  "inLanguage": "es-US"
}
```

### FAQ Schema (for AEO Snippets):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Puedo abrir una LLC en Estados Unidos si no soy residente ni tengo SSN?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Los extranjeros no residentes (NRA) pueden registrar legalmente una LLC en cualquier estado de EE.UU. y tramitar su número EIN ante el IRS sin necesidad de tener Número de Seguro Social (SSN) ni visa americana."
      }
    }
  ]
}
```

---

## 5. SEO Checklist for Every Article
- [ ] Primary keyword appears in H1, first 100 words, one H2, and meta description.
- [ ] Meta description is between 120 and 158 characters with an action verb.
- [ ] URL slug is short, lowercase, hyphen-separated, and keyword-rich.
- [ ] At least 2 internal links to Guia Negocios service pages (`/es/services/...` or `/es/contact`).
- [ ] At least 3 verified outbound citations to `.gov` or `.edu` authoritative domains.
- [ ] 2 to 3 responsive visual graphics/infographics embedded flush to left column 0.
