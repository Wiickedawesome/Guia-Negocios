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
    // Build/SSR prefers the Admin SDK (no App Check token needed). If no
    // credential is usable, or it lacks Firestore access as the CI service
    // account currently does, fall back to the client SDK - that path works
    // when APP_CHECK_DEBUG_TOKEN is configured (as CI does).
    let rows: any[] | null = null;

    if (isNode) {
      try {
        const adminDb = getAdminDb();
        if (adminDb) {
          const snapshot = await adminDb
            .collection('seoSchemas')
            .where('status', '==', 'Active')
            .get();
          rows = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }));
        }
      } catch (adminErr: any) {
        console.warn(`[seo-schemas] Admin SDK read failed, falling back to client SDK: ${adminErr?.message || adminErr}`);
      }
    }

    if (rows === null) {
      const q = query(collection(db, 'seoSchemas'), where('status', '==', 'Active'));
      const schemaSnap = await getDocs(q);
      rows = schemaSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    cachedSchemas = rows;
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
