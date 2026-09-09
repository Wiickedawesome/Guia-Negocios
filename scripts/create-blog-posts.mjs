import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

initializeApp({
  projectId: 'guianegocios-prod',
  credential: applicationDefault()
});

const db = getFirestore();

const COVERS = {
  llc: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80',
  tax: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  restaurant: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=1200&q=80',
  license: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
  bank: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=1200&q=80',
};

const posts = JSON.parse(readFileSync(new URL('./blog-posts-data.json', import.meta.url), 'utf8'));

async function main() {
  const today = new Date().toISOString().split('T')[0];
  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const existing = await db.collection('blogs').where('slugEs', '==', post.slugEs).limit(1).get();

    if (!existing.empty) {
      console.log('SKIP: slugEs already exists: ' + post.slugEs);
      skipped++;
      continue;
    }

    await db.collection('blogs').add({
      titleEs: post.titleEs,
      titleEn: post.titleEn,
      slugEs: post.slugEs,
      slugEn: post.slugEn,
      contentEs: post.contentEs,
      contentEn: post.contentEn,
      metaDesc: post.metaDesc,
      keywords: post.keywords,
      targetKeyword: post.targetKeyword,
      featuredImage: COVERS[post.coverKey],
      imageCredit: 'Photo by Unsplash',
      author: 'Guia Negocios Team',
      authorAvatar: '/images/team-avatar.webp',
      readTime: 9,
      language: 'es',
      status: 'Draft',
      publishDate: post.publishDate || today,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      views: 0,
    });

    console.log('CREATED: ' + post.titleEn);
    created++;
  }

  console.log('\nDone: ' + created + ' created, ' + skipped + ' skipped');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
