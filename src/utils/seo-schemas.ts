import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getAdminDb } from './admin-db';

let cachedSchemas: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

// Build/SSR runs in Node, where the client SDK cannot obtain an App Check token.
const isNode = typeof window === 'undefined';

export async function getActiveAeoSchemas(): Promise<any[]> {
  const now = Date.now();
  if (cachedSchemas !== null && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedSchemas;
  }

  try {
    let rows: any[];

    // Build/SSR: use the Admin SDK so reads bypass App Check.
    const adminDb = isNode ? getAdminDb() : null;
    if (adminDb) {
      const snapshot = await adminDb
        .collection('seoSchemas')
        .where('status', '==', 'Active')
        .get();
      rows = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }));
    } else {
      // Browser runtime, or Admin SDK unavailable: client SDK path.
      const q = query(collection(db, 'seoSchemas'), where('status', '==', 'Active'));
      const schemaSnap = await getDocs(q);
      rows = schemaSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    cachedSchemas = dedupeByKeyword(rows);
    lastFetchTime = now;
    return cachedSchemas;
  } catch (e: any) {
    // A failed read must surface. Returning [] here silently shipped pages with
    // no AEO markup (and no error) while App Check blocked build-time reads.
    throw new Error(
      `[seo-schemas] Could not read active AEO schemas from Firestore: ${e?.message || e}. ` +
        `Provide FIREBASE_SERVICE_ACCOUNT_KEY, GOOGLE_APPLICATION_CREDENTIALS, or serviceAccountKey.json.`
    );
  }
}

/**
 * Collapse near-duplicate schemas that target the same keyword.
 *
 * The collection has accumulated two documents per keyword (a space-form and a
 * hyphen-form document ID) whose FAQs are paraphrases of each other. Emitting
 * both puts duplicate questions in the page's structured data, which risks
 * Google discarding the markup. Keep one document per keyword: the richest
 * schemaStr wins, tie-broken by document ID so the choice is deterministic.
 */
function dedupeByKeyword(schemas: any[]): any[] {
  const bestPerKeyword = new Map<string, any>();

  for (const schema of schemas) {
    const key = String(schema?.keyword || '').trim().toLowerCase();
    if (!key || !schema?.schemaStr) continue;

    const current = bestPerKeyword.get(key);
    if (current && !isRicherSchema(schema, current)) continue;

    bestPerKeyword.set(key, schema);
  }

  return [...bestPerKeyword.values()];
}

function isRicherSchema(candidate: any, incumbent: any): boolean {
  const candidateLen = String(candidate.schemaStr || '').length;
  const incumbentLen = String(incumbent.schemaStr || '').length;
  if (candidateLen !== incumbentLen) return candidateLen > incumbentLen;
  return String(candidate.id) < String(incumbent.id);
}
