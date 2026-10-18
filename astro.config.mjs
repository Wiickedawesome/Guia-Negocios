// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://guianegocios.net',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude /es/ redirect URL since it 301s to root / (sitemap should only contain 200 OK indexable pages)
        if (page === 'https://guianegocios.net/es/' || page === 'https://guianegocios.net/es') return false;
        // Exclude legacy 301-redirected blog slug
        if (page === 'https://guianegocios.net/en/blog/how-to-build-business-credit' || page === 'https://guianegocios.net/en/blog/how-to-build-business-credit/') return false;
        // Exclude admin dashboard
        if (page.includes('/admin')) return false;
        // Exclude dynamic client view shells and fallbacks
        if (page.includes('/lp/empty') || page.includes('/lp/view') || page.includes('/blog/view')) return false;
        // Exclude error pages
        if (page.includes('/404') || page.includes('/500')) return false;
        // Exclude cross-language alias service redirects
        if (
          page.includes('/es/services/complete-launch-bundle') ||
          page.includes('/es/services/creedava-support') ||
          page.includes('/es/services/operations-growth') ||
          page.includes('/en/services/apoyo-creedava') ||
          page.includes('/en/services/paquete-lanzamiento-completo') ||
          page.includes('/en/services/operaciones-crecimiento')
        ) {
          return false;
        }
        return true;
      },
      serialize(item) {
        // Normalize URL to have clean trailing slash matching canonical tags (except root if normalized)
        if (!item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }

        // Assign clean SEO priorities and change frequencies
        if (item.url === 'https://guianegocios.net/' || item.url === 'https://guianegocios.net/en/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/services/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url === 'https://guianegocios.net/es/services/' || item.url === 'https://guianegocios.net/en/services/') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.endsWith('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'daily';
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/about/') || item.url.includes('/contact/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/faq/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        // lastmod is deliberately NOT set. It used to be `new Date()`, which
        // stamped build time on all 36 URLs on every deploy, so the value was
        // identical everywhere and changed constantly - Google treats a
        // lastmod like that as unreliable and ignores it. Omitting it is
        // honest and has the same practical effect. Setting a real per-page
        // value needs a build-time content map (post date field).
        return item;
      }
    })
  ],
  redirects: {
    '/admin': '/admin/login',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es'],
    routing: 'manual',
  },
});