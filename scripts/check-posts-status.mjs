import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({ projectId: 'guianegocios-prod' });
const db = getFirestore(app);

// Posts 3-5 content (shorter summaries - agent can expand later)
const posts = [
  {
    id: '7gzGP4WBui54uMCLOLEO',
    title: 'Post 3: Contabilidad para restaurantes'
  },
  {
    id: 'TeP5qaOrOBfM9upbPVwL',
    title: 'Post 4: Licencia comercial Knoxville'
  },
  {
    id: 'wx9AobQj4gRValKXEfnL',
    title: 'Post 5: Cuenta bancaria para negocio'
  }
];

async function main() {
  for (const post of posts) {
    const doc = await db.collection('blogs').doc(post.id).get();
    const data = doc.data();
    const words = (data.contentEs || '').split(/\s+/).length;
    const visuals = Math.ceil(words / 200) + 1;
    console.log(`${post.title}`);
    console.log(`  Words: ${words} -> Target visuals: ${visuals}`);
    console.log(`  Has citations: ${data.contentEs?.includes('Fuentes') || data.contentEs?.includes('Referencias')}`);
    console.log('');
  }
  process.exit(0);
}

main().catch(e => { console.error(e.message); process.exit(1); });
