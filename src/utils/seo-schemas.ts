import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

let cachedSchemas: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

export async function getActiveAeoSchemas(): Promise<any[]> {
  const now = Date.now();
  if (cachedSchemas !== null && (now - lastFetchTime < CACHE_TTL_MS)) {
    return cachedSchemas;
  }

  try {
    const q = query(collection(db, 'seoSchemas'), where('status', '==', 'Active'));
    const schemaSnap = await getDocs(q);
    cachedSchemas = schemaSnap.docs.map(d => d.data());
    lastFetchTime = now;
    return cachedSchemas;
  } catch (e) {
    // If it fails (e.g. offline or permission), cache empty array to avoid 50 repeated failures
    cachedSchemas = [];
    lastFetchTime = now;
    return [];
  }
}
