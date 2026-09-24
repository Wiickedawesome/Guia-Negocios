/**
 * Landing-page HTML sanitisation.
 *
 * Landing pages are authored in the admin visual builder, which makes every
 * editable element `contenteditable="true"` so the owner can click and type.
 * Those attributes are an editing affordance only — they are not part of the
 * published design — but the quick-create path saved the raw HTML without
 * removing them, so live pages shipped click-to-edit headings, links and even
 * the submit button to the public.
 *
 * Stripping happens at render time rather than by rewriting stored documents:
 * that fixes already-published pages, keeps the builder working, and means the
 * content in Firestore stays byte-for-byte what the owner authored. The builder
 * also strips on save as a second line of defence.
 *
 * The attribute has no visual effect, so removing it cannot change the design.
 */
export function stripEditorAttributes(html: string): string {
  if (!html) return '';

  return (
    html
      // Handles contenteditable="true" / "false" / "" and single-quoted forms.
      .replace(/\s+contenteditable\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      // Handles the bare boolean form: <div contenteditable>
      .replace(/\s+contenteditable(?=[\s/>])/gi, '')
  );
}
