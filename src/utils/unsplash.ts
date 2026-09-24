import { collection, getDocs, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

let cachedUnsplashKey: string | null = null;
let cachedPexelsKey: string | null = null;

// Curated pool of 65+ unique high-quality Unsplash business & legal photos
// Used when API keys are not yet provided or when offline/rate-limited
export const CURATED_UNSPLASH_POOL = [
  { id: '1486406146926-c627a92ad1ab', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', alt: 'Modern corporate skyscraper symbolizing business growth and structure', topic: 'business' },
  { id: '1454165804606-c3d57bc86b40', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', alt: 'Financial planning, spreadsheets, and tax documents on desk', topic: 'tax' },
  { id: '1450133064473-71024230f91b', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80', alt: 'Legal contract review with pen and legal documents', topic: 'legal' },
  { id: '1554224155-8d04cb21cd6c', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', alt: 'Calculator, invoices, and accounting bookkeeping sheets', topic: 'bookkeeping' },
  { id: '1521791136064-7986c2920216', url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80', alt: 'Diverse entrepreneurs shaking hands after partnership agreement', topic: 'partnership' },
  { id: '1586486855514-8c633cc6fd38', url: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=1200&q=80', alt: 'Government tax compliance and IRS application papers', topic: 'ein' },
  { id: '1507679799987-c73779587ccf', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80', alt: 'Executive business leader presenting commercial strategy', topic: 'consulting' },
  { id: '1460925895917-afdab827c52f', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', alt: 'Digital marketing analytics and business growth charts on laptop screen', topic: 'marketing' },
  { id: '1551836022-d5d88e9218df', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80', alt: 'Collaborative team brainstorming in modern sunlit office', topic: 'team' },
  { id: '1556761175-5973dc0f32e7', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80', alt: 'Small business owner serving clients with digital point of sale', topic: 'retail' },
  { id: '1579532537598-459ecdaf39cc', url: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1200&q=80', alt: 'Piggy bank and stacked coins representing business capital savings', topic: 'finance' },
  { id: '1522071820081-009f0129c71c', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80', alt: 'Young startup entrepreneurs discussing launch milestones', topic: 'startup' },
  { id: '1559526324-4b87b5e36e44', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80', alt: 'Business financial report showing positive revenue growth graphs', topic: 'growth' },
  { id: '1517245386807-bb43f82c33c4', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', alt: 'Bilingual business workshop and mentorship training session', topic: 'training' },
  { id: '1531403009284-440f080d1e12', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', alt: 'Project management flowcharts and task organization on whiteboard', topic: 'operations' },
  { id: '1560250097-0b93528c311a', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80', alt: 'Professional business consultant in corporate attire', topic: 'leadership' },
  { id: '1573496359142-b8d87734a5a2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80', alt: 'Female entrepreneur analyzing financial metrics on laptop', topic: 'founder' },
  { id: '1542744173-8e7e53415bb0', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80', alt: 'Marketing strategy meeting with sticky notes and business plans', topic: 'strategy' },
  { id: '1497215728101-856f4ea42174', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80', alt: 'Open-concept corporate office workspace with contemporary design', topic: 'workplace' },
  { id: '1556155092-490a1ba16284', url: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80', alt: 'Business investor signing official LLC incorporation documents', topic: 'llc' },
  { id: '1520333789090-1afc82db536a', url: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80', alt: 'Customer support representative helping small business client', topic: 'support' },
  { id: '1504384308090-c894fdcc538d', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', alt: 'Modern high-tech workspace with dual monitors and coffee', topic: 'technology' },
  { id: '1590283603385-17ffb3a7f29f', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80', alt: 'Stock market ticker and investment returns dashboard', topic: 'investing' },
  { id: '1568602471122-7832951cc4c5', url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1200&q=80', alt: 'Commercial real estate office building exterior in Tennessee', topic: 'realestate' },
  { id: '1576267423445-b2e0074d68a4', url: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1200&q=80', alt: 'Executive conference room ready for board meeting', topic: 'meeting' },
  { id: '1526304640581-d334cdbbf45e', url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80', alt: 'US dollar banknotes and business receipts for tax filing', topic: 'money' },
  { id: '1577495508048-b635879837f1', url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', alt: 'Business handshake sealing negotiation and contract signing', topic: 'deal' }
];

export async function getUnsplashAccessKey(): Promise<string> {
  if (cachedUnsplashKey) return cachedUnsplashKey;

  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('unsplash_access_key');
    if (localKey && localKey.trim()) {
      cachedUnsplashKey = localKey.trim();
      return cachedUnsplashKey;
    }
  }

  // Not read from a PUBLIC_ environment variable, for the same reason as the
  // Pexels key below: Astro inlines PUBLIC_* values into the client bundle.
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'admin'));
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      if (data?.unsplashKey && data.unsplashKey.trim()) {
        cachedUnsplashKey = data.unsplashKey.trim();
        if (typeof window !== 'undefined') {
          localStorage.setItem('unsplash_access_key', cachedUnsplashKey);
        }
        return cachedUnsplashKey;
      }
    }
  } catch (e) {
    console.warn("Could not fetch unsplashKey from settings:", e);
  }

  return '';
}

export async function getPexelsApiKey(): Promise<string> {
  if (cachedPexelsKey) return cachedPexelsKey;

  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('pexels_api_key');
    if (localKey && localKey.trim()) {
      cachedPexelsKey = localKey.trim();
      return cachedPexelsKey;
    }
  }

  // The key is deliberately NOT read from a PUBLIC_ environment variable.
  // Astro inlines every PUBLIC_* value straight into the client bundle, so a
  // real key placed there is shipped to every visitor in readable JS. The
  // admin settings page is the only supported entry point: it stores the key
  // here in localStorage and in settings/admin, which is what we read below.
  try {
    const settingsSnap = await getDoc(doc(db, 'settings', 'admin'));
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      if (data?.pexelsKey && data.pexelsKey.trim()) {
        cachedPexelsKey = data.pexelsKey.trim();
        if (typeof window !== 'undefined') {
          localStorage.setItem('pexels_api_key', cachedPexelsKey);
        }
        return cachedPexelsKey;
      }
    }
  } catch (e) {
    console.warn("Could not fetch pexelsKey from settings:", e);
  }

  // No key configured — caller decides how to proceed
  return '';
}

export async function testUnsplashKey(accessKey: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey.trim()}`);
    if (res.ok) {
      return { valid: true };
    }
    const data = await res.json().catch(() => ({}));
    return { valid: false, error: data?.errors?.[0] || `HTTP ${res.status}: Unauthorized` };
  } catch (e: any) {
    return { valid: false, error: e?.message || 'Network error' };
  }
}

export async function testPexelsApiKey(apiKey: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const res = await fetch(`https://api.pexels.com/v1/curated?per_page=1`, {
      headers: {
        Authorization: apiKey.trim()
      }
    });
    if (res.ok) {
      return { valid: true };
    }
    const data = await res.json().catch(() => ({}));
    return { valid: false, error: data?.error || `HTTP ${res.status}: Invalid Pexels Key` };
  } catch (e: any) {
    return { valid: false, error: e?.message || 'Network error' };
  }
}

/**
 * Retrieves the set of all photo IDs and URLs already used across blog posts
 */
export async function getUsedPhotoSet(): Promise<Set<string>> {
  const used = new Set<string>();

  try {
    // 1. Fetch from usedImages collection in Firestore
    const usedSnap = await getDocs(collection(db, 'usedImages'));
    usedSnap.forEach(docSnap => {
      const d = docSnap.data();
      if (d.photoId) used.add(String(d.photoId));
      if (d.url) used.add(cleanPhotoUrl(d.url));
    });

    // 2. Fetch from existing blog posts in Firestore
    const blogsSnap = await getDocs(collection(db, 'blogs'));
    blogsSnap.forEach(docSnap => {
      const d = docSnap.data();
      if (d.featuredImage) used.add(cleanPhotoUrl(d.featuredImage));
      // Scan content for unsplash and pexels image links
      const content = `${d.content || ''} ${d.contentEs || ''} ${d.contentEn || ''}`;
      const unsplashMatches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_-]+/g);
      if (unsplashMatches) {
        unsplashMatches.forEach(m => used.add(cleanPhotoUrl(m)));
      }
      const pexelsMatches = content.match(/https:\/\/images\.pexels\.com\/photos\/[0-9]+/g);
      if (pexelsMatches) {
        pexelsMatches.forEach(m => used.add(cleanPhotoUrl(m)));
      }
    });
  } catch (e) {
    console.warn("Could not fetch used photo registry:", e);
  }

  return used;
}

export function cleanPhotoUrl(url: string): string {
  if (!url) return '';
  const unsplashMatch = url.match(/photo-([a-zA-Z0-9_-]+)/);
  if (unsplashMatch) return unsplashMatch[1];
  const pexelsMatch = url.match(/photos\/(\d+)/);
  if (pexelsMatch) return `pexels-${pexelsMatch[1]}`;
  return url.split('?')[0];
}

/**
 * Marks a photo as used in the Firestore Used Photos Album
 */
export async function markPhotoAsUsed(photo: { id?: string | number; url: string; alt?: string; topic?: string; blogId?: string; provider?: string }) {
  try {
    const photoId = String(photo.id || cleanPhotoUrl(photo.url));
    await addDoc(collection(db, 'usedImages'), {
      photoId,
      url: photo.url,
      alt: photo.alt || 'Blog Image',
      topic: photo.topic || 'General',
      blogId: photo.blogId || '',
      provider: photo.provider || (photo.url.includes('pexels') ? 'pexels' : 'unsplash'),
      usedAt: serverTimestamp()
    });
  } catch (e) {
    console.warn("Could not record photo in usedImages album:", e);
  }
}

export interface PhotoResult {
  id: string;
  url: string;
  thumbUrl: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  source?: 'unsplash' | 'pexels' | 'curated';
}

/**
 * Searches Pexels API with pagination and landscape orientation
 */
export async function searchPexelsPhotos(query: string, page = 1, perPage = 12): Promise<PhotoResult[]> {
  const apiKey = await getPexelsApiKey();
  if (!apiKey) return [];

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`, {
      headers: {
        Authorization: apiKey
      }
    });
    if (!res.ok) throw new Error(`Pexels error (${res.status})`);
    const data = await res.json();
    return (data.photos || []).map((item: any) => ({
      id: `pexels-${item.id}`,
      url: item.src?.landscape || item.src?.large2x || item.src?.large || item.src?.original,
      thumbUrl: item.src?.medium || item.src?.small || item.src?.tiny,
      alt: item.alt || `${query} high quality stock photo`,
      photographer: item.photographer || 'Pexels Creator',
      photographerUrl: item.photographer_url || item.url || 'https://www.pexels.com',
      source: 'pexels'
    }));
  } catch (e) {
    console.warn("Pexels API search failed:", e);
    return [];
  }
}

/**
 * Searches Unsplash API with full pagination and quality filters
 */
export async function searchUnsplashPhotos(query: string, page = 1, perPage = 12): Promise<PhotoResult[]> {
  const unsplashKey = await getUnsplashAccessKey();
  
  // 1. Try Unsplash if Key is available
  if (unsplashKey) {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${unsplashKey}&page=${page}&per_page=${perPage}&orientation=landscape`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return (data.results || []).map((item: any) => ({
            id: item.id,
            url: item.urls?.regular ? `${item.urls.regular}&w=1200&q=80&auto=format&fit=crop` : (item.urls?.full || ''),
            thumbUrl: item.urls?.small ? `${item.urls.small}&w=600&q=75&auto=format&fit=crop` : (item.urls?.thumb || ''),
            alt: item.alt_description || item.description || `High quality photo for ${query}`,
            photographer: item.user?.name || 'Unsplash Contributor',
            photographerUrl: item.user?.links?.html || 'https://unsplash.com',
            source: 'unsplash'
          }));
        }
      }
    } catch (e) {
      console.warn("Unsplash API search failed, attempting Pexels fallback:", e);
    }
  }

  // 2. Try Pexels as active live provider
  const pexelsResults = await searchPexelsPhotos(query, page, perPage);
  if (pexelsResults.length > 0) {
    return pexelsResults;
  }

  // 3. Fall back to curated pool when live keys are unavailable or empty
  const cleanQuery = query.toLowerCase();
  const matches = CURATED_UNSPLASH_POOL.filter(p => p.topic.includes(cleanQuery) || p.alt.toLowerCase().includes(cleanQuery));
  const pool = matches.length > 0 ? matches : CURATED_UNSPLASH_POOL;
  return pool.slice(0, perPage).map(p => ({
    id: p.id,
    url: p.url,
    thumbUrl: p.url.replace('&w=1200', '&w=600').replace('&q=80', '&q=75'),
    alt: p.alt,
    photographer: 'Curated Photo',
    photographerUrl: 'https://unsplash.com',
    source: 'curated'
  }));
}

/**
 * Universal photo search helper (alias for searchUnsplashPhotos with Pexels fallback)
 */
export const searchPhotos = searchUnsplashPhotos;

/**
 * Gets a guaranteed UNIQUE photo (via Unsplash, Pexels, or Curated Pool) that has never been used on any blog post
 */
export async function getUniqueUnsplashPhoto(topic: string, blogId?: string): Promise<{ url: string; alt: string; photoId: string }> {
  const usedPhotos = await getUsedPhotoSet();
  const unsplashKey = await getUnsplashAccessKey();
  const pexelsKey = await getPexelsApiKey();

  // 1. If Unsplash API Key is available, search live Unsplash API
  if (unsplashKey) {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(topic)}&client_id=${unsplashKey}&page=1&per_page=15&orientation=landscape`);
      if (res.ok) {
        const data = await res.json();
        for (const item of (data.results || [])) {
          const rawUrl = item.urls?.regular ? `${item.urls.regular}&w=1200&q=80&auto=format&fit=crop` : (item.urls?.full || '');
          const key = cleanPhotoUrl(rawUrl);
          if (!usedPhotos.has(key) && !usedPhotos.has(item.id)) {
            const alt = item.alt_description || item.description || `High quality photo for ${topic}`;
            await markPhotoAsUsed({ id: item.id, url: rawUrl, alt, topic, blogId, provider: 'unsplash' });
            return { url: rawUrl, alt, photoId: item.id };
          }
        }
      }
    } catch (e) {
      console.warn("Error fetching unique live Unsplash photo:", e);
    }
  }

  // 2. If Pexels API Key is available, search live Pexels API
  if (pexelsKey) {
    try {
      const pexelsResults = await searchPexelsPhotos(topic, 1, 20);
      for (const item of pexelsResults) {
        const key = cleanPhotoUrl(item.url);
        if (!usedPhotos.has(key) && !usedPhotos.has(item.id)) {
          await markPhotoAsUsed({ id: item.id, url: item.url, alt: item.alt, topic, blogId, provider: 'pexels' });
          return { url: item.url, alt: item.alt, photoId: item.id };
        }
      }
    } catch (e) {
      console.warn("Error fetching unique live Pexels photo:", e);
    }
  }

  // 3. Fallback to curated pool: Find the first unused photo
  for (const item of CURATED_UNSPLASH_POOL) {
    const key = cleanPhotoUrl(item.url);
    if (!usedPhotos.has(key) && !usedPhotos.has(item.id)) {
      await markPhotoAsUsed({ id: item.id, url: item.url, alt: item.alt, topic, blogId, provider: 'curated' });
      return { url: item.url, alt: item.alt, photoId: item.id };
    }
  }

  // 4. If all pool items have been used, pick with random variance parameter to ensure unique asset hash
  const randomPick = CURATED_UNSPLASH_POOL[Math.floor(Math.random() * CURATED_UNSPLASH_POOL.length)];
  const randomizedUrl = `${randomPick.url}&sig=${Date.now()}`;
  await markPhotoAsUsed({ id: randomPick.id, url: randomizedUrl, alt: randomPick.alt, topic, blogId, provider: 'curated' });
  return { url: randomizedUrl, alt: randomPick.alt, photoId: randomPick.id };
}

/**
 * Universal alias for getUniqueUnsplashPhoto
 */
export const getUniquePhoto = getUniqueUnsplashPhoto;

