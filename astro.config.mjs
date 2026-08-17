// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://guianegocios.net',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude root redirect URL since it 301s to /es/ (sitemap should only contain 200 OK indexable pages)
        if (page === 'https://guianegocios.net/' || page === 'https://guianegocios.net') return false;
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
        // Normalize URL to have clean trailing slash matching canonical tags
        if (!item.url.endsWith('/')) {
          item.url = `${item.url}/`;
        }

        // Assign clean SEO priorities and change frequencies
        if (item.url === 'https://guianegocios.net/es/' || item.url === 'https://guianegocios.net/en/') {
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
        item.lastmod = new Date();
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