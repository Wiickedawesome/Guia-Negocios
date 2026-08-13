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
        // Exclude admin pages
        if (page.includes('/admin')) return false;
        // Exclude dummy empty fallback pages
        if (page.includes('/lp/empty')) return false;
        // Exclude 404 or 500 error pages if any
        if (page.includes('/404') || page.includes('/500')) return false;
        // Exclude duplicate cross-language alias service pages to keep clean canonical URLs
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
        // Assign clean SEO priorities and change frequencies
        if (item.url === 'https://guianegocios.net/' || item.url === 'https://guianegocios.net/es/' || item.url === 'https://guianegocios.net/en/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/services')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.endsWith('/blog/') || item.url.endsWith('/blog')) {
          item.priority = 0.8;
          item.changefreq = 'daily';
        } else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/about') || item.url.includes('/contact')) {
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