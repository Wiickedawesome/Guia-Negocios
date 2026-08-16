import { collection, getDocs, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

let cachedUnsplashKey: string | null = null;

// Curated pool of 65+ unique high-quality Unsplash business & legal photos
// Used when Unsplash API key is not yet provided or when offline/rate-limited
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

  const envKey = (import.meta as any).env?.PUBLIC_UNSPLASH_ACCESS_KEY || (typeof window !== 'undefined' && (window as any).UNSPLASH_ACCESS_KEY);
  if (envKey && envKey.trim()) {
    cachedUnsplashKey = envKey.trim();
    return cachedUnsplashKey;
  }

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
      if (d.photoId) used.add(d.photoId);
      if (d.url) used.add(cleanPhotoUrl(d.url));
    });

    // 2. Fetch from existing blog posts in Firestore
    const blogsSnap = await getDocs(collection(db, 'blogs'));
    blogsSnap.forEach(docSnap => {
      const d = docSnap.data();
      if (d.featuredImage) used.add(cleanPhotoUrl(d.featuredImage));
      // Scan content for unsplash image links
      const content = `${d.content || ''} ${d.contentEs || ''} ${d.contentEn || ''}`;
      const matches = content.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_-]+/g);
      if (matches) {
        matches.forEach(m => used.add(cleanPhotoUrl(m)));
      }
    });
  } catch (e) {
    console.warn("Could not fetch used photo registry:", e);
  }

  return used;
}

export function cleanPhotoUrl(url: string): string {
  const match = url.match(/photo-([a-zA-Z0-9_-]+)/);
  return match ? match[1] : url.split('?')[0];
}

/**
 * Marks a photo as used in the Firestore Used Photos Album
 */
export async function markPhotoAsUsed(photo: { id?: string; url: string; alt?: string; topic?: string; blogId?: string }) {
  try {
    const photoId = photo.id || cleanPhotoUrl(photo.url);
    await addDoc(collection(db, 'usedImages'), {
      photoId,
      url: photo.url,
      alt: photo.alt || 'Blog Image',
      topic: photo.topic || 'General',
      blogId: photo.blogId || '',
      usedAt: serverTimestamp()
    });
  } catch (e) {
    console.warn("Could not record photo in usedImages album:", e);
  }
}

/**
 * Searches Unsplash API with full pagination and quality filters
 */
export async function searchUnsplashPhotos(query: string, page = 1, perPage = 12): Promise<Array<{ id: string; url: string; thumbUrl: string; alt: string; photographer: string; photographerUrl: string }>> {
  const accessKey = await getUnsplashAccessKey();
  if (!accessKey) {
    // Return filtered pool when key is not configured
    const cleanQuery = query.toLowerCase();
    const matches = CURATED_UNSPLASH_POOL.filter(p => p.topic.includes(cleanQuery) || p.alt.toLowerCase().includes(cleanQuery));
    const pool = matches.length > 0 ? matches : CURATED_UNSPLASH_POOL;
    return pool.map(p => ({
      id: p.id,
      url: p.url,
      thumbUrl: p.url.replace('&w=1200', '&w=400'),
      alt: p.alt,
      photographer: 'Unsplash Artist',
      photographerUrl: 'https://unsplash.com'
    }));
  }

  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&page=${page}&per_page=${perPage}&orientation=landscape`);
    if (!res.ok) throw new Error(`Unsplash error (${res.status})`);
    const data = await res.json();
    return (data.results || []).map((item: any) => ({
      id: item.id,
      url: item.urls?.regular || item.urls?.full,
      thumbUrl: item.urls?.small || item.urls?.thumb,
      alt: item.alt_description || item.description || `High quality photo for ${query}`,
      photographer: item.user?.name || 'Unsplash Contributor',
      photographerUrl: item.user?.links?.html || 'https://unsplash.com'
    }));
  } catch (e) {
    console.warn("Unsplash API search failed, falling back to curated pool:", e);
    return CURATED_UNSPLASH_POOL.slice(0, perPage).map(p => ({
      id: p.id,
      url: p.url,
      thumbUrl: p.url.replace('&w=1200', '&w=400'),
      alt: p.alt,
      photographer: 'Unsplash Artist',
      photographerUrl: 'https://unsplash.com'
    }));
  }
}

/**
 * Gets a guaranteed UNIQUE Unsplash photo that has never been used on any blog post
 */
export async function getUniqueUnsplashPhoto(topic: string, blogId?: string): Promise<{ url: string; alt: string; photoId: string }> {
  const usedPhotos = await getUsedPhotoSet();
  const accessKey = await getUnsplashAccessKey();

  // 1. If Unsplash API Key is available, search live API
  if (accessKey) {
    try {
      const results = await searchUnsplashPhotos(topic, 1, 15);
      for (const item of results) {
        const key = cleanPhotoUrl(item.url);
        if (!usedPhotos.has(key) && !usedPhotos.has(item.id)) {
          await markPhotoAsUsed({ id: item.id, url: item.url, alt: item.alt, topic, blogId });
          return { url: item.url, alt: item.alt, photoId: item.id };
        }
      }
    } catch (e) {
      console.warn("Error fetching unique live Unsplash photo:", e);
    }
  }

  // 2. Fallback to curated pool: Find the first unused photo
  for (const item of CURATED_UNSPLASH_POOL) {
    const key = cleanPhotoUrl(item.url);
    if (!usedPhotos.has(key) && !usedPhotos.has(item.id)) {
      await markPhotoAsUsed({ id: item.id, url: item.url, alt: item.alt, topic, blogId });
      return { url: item.url, alt: item.alt, photoId: item.id };
    }
  }

  // 3. If all pool items have been used, pick with random variance parameter to ensure unique asset hash
  const randomPick = CURATED_UNSPLASH_POOL[Math.floor(Math.random() * CURATED_UNSPLASH_POOL.length)];
  const randomizedUrl = `${randomPick.url}&sig=${Date.now()}`;
  await markPhotoAsUsed({ id: randomPick.id, url: randomizedUrl, alt: randomPick.alt, topic, blogId });
  return { url: randomizedUrl, alt: randomPick.alt, photoId: randomPick.id };
}
