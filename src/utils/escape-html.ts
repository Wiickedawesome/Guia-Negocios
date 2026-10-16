/**
 * Escapes a value for safe interpolation into HTML.
 *
 * Accepts arbitrary values because some call sites render untrusted Firestore
 * documents; everything is coerced to a string first so a malformed document
 * cannot break rendering. Covers the five characters that can change HTML
 * structure in element or attribute context.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Returns the URL only when it is safe to place in an href/src attribute
 * (http(s) or site-relative), otherwise an empty string. Stored URLs are
 * untrusted: a "javascript:" value would execute on click.
 */
export function safeUrl(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (/^https?:\/\//i.test(raw) || raw.startsWith('/')) return raw;
  return '';
}

/**
 * Best-effort sanitizer for rendered Markdown / AI-generated HTML shown in
 * admin surfaces. Parses the fragment, removes elements that can execute or
 * re-inject markup, and scrubs event-handler attributes and javascript:/
 * data: URLs. Dependency-free; deliberately conservative.
 */
export function sanitizeHtml(html: unknown): string {
  const template = document.createElement('template');
  template.innerHTML = String(html ?? '');

  template.content
    .querySelectorAll('script, iframe, object, embed, form, style, link, meta, base, noscript, template, svg, math')
    .forEach((el) => el.remove());

  template.content.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = (attr.value || '').trim().toLowerCase();
      const isUrlAttr =
        ['href', 'src', 'xlink:href', 'action', 'formaction'].includes(name) || name.endsWith('src');
      const dangerousUrl = /^(javascript|vbscript|data):/.test(value);
      const dangerousStyle = name === 'style' && value.includes('expression(');
      if (name.startsWith('on') || dangerousStyle || (isUrlAttr && dangerousUrl)) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return template.innerHTML;
}
