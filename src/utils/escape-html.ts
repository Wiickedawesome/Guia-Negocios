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
