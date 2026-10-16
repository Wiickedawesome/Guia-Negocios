import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

initializeApp({ projectId: 'guianegocios-prod', credential: applicationDefault() });
const db = getFirestore();

const infographicData = {
  'como-abrir-llc-estados-unidos-sin-ssn': readFileSync('scripts/post-content/infographic-1.html', 'utf8'),
  'itin-creditos-impuestos-negocios': readFileSync('scripts/post-content/infographic-2.html', 'utf8'),
  'contabilidad-para-restaurantes-guia-completa': readFileSync('scripts/post-content/infographic-3.html', 'utf8'),
  'licencia-comercial-knoxville-guia-paso-a-paso': readFileSync('scripts/post-content/infographic-4.html', 'utf8'),
  'cuenta-bancaria-para-negocio-guia-practica': readFileSync('scripts/post-content/infographic-5.html', 'utf8'),
};

function injectInfographic(content, html) {
  const dividerIndex = content.indexOf('---');
  if (dividerIndex === -1) {
    return content + '\n\n' + html;
  }
  const afterDivider = content.indexOf('\n', dividerIndex) + 1;
  return content.slice(0, afterDivider) + '\n' + html + '\n' + content.slice(afterDivider);
}

async function main() {
  let updated = 0;
  for (const [slugEs, html] of Object.entries(infographicData)) {
    const snap = await db.collection('blogs').where('slugEs', '==', slugEs).limit(1).get();
    if (snap.empty) { console.log('SKIP (not found): ' + slugEs); continue; }
    const doc = snap.docs[0];
    const data = doc.data();
    // The infographic HTML is Spanish-only, so only the Spanish body is updated.
    const contentEs = injectInfographic(data.contentEs, html);
    await doc.ref.update({ contentEs, updatedAt: FieldValue.serverTimestamp() });
    console.log('UPDATED: ' + slugEs);
    updated++;
  }
  console.log('\nDone: ' + updated + ' posts updated with infographics');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
