import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Ignore static assets, admin routes, API endpoints, or files with extensions
  if (
    pathname.startsWith('/_') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return next();
  }

  // Root URL -> redirect to /es
  if (pathname === '/' || pathname === '') {
    return context.redirect('/es', 302);
  }

  // Fallback redirect for non-prefixed routes (e.g. /services -> /es/services)
  if (!pathname.startsWith('/es') && !pathname.startsWith('/en')) {
    return context.redirect(`/es${pathname}`, 302);
  }

  return next();
});
