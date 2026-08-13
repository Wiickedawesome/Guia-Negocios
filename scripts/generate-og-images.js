import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  {
    title: 'Guia Negocios',
    subtitle: 'TU GUÍA HACIA EL ÉXITO',
    subSubtitle: 'YOUR GUIDE TO SUCCESS',
    filename: 'og-home.png'
  },
  {
    title: 'Sobre Nosotros',
    subtitle: 'CONOCE A NUESTRO EQUIPO',
    subSubtitle: 'MEET OUR TEAM',
    filename: 'og-about.png'
  },
  {
    title: 'Nuestros Servicios',
    subtitle: 'SOLUCIONES EMPRESARIALES',
    subSubtitle: 'BUSINESS SOLUTIONS',
    filename: 'og-services.png'
  },
  {
    title: 'Contacto',
    subtitle: 'ESTAMOS AQUÍ PARA AYUDARTE',
    subSubtitle: 'WE ARE HERE TO HELP',
    filename: 'og-contact.png'
  },
  {
    title: 'Blog',
    subtitle: 'CONSEJOS, NOTICIAS Y RECURSOS',
    subSubtitle: 'TIPS, NEWS & RESOURCES',
    filename: 'og-blog.png'
  }
];

async function generateImages() {
  console.log('Generating OG images...');
  const logoPath = path.join(__dirname, '../public/images/GuiaNegociosLOGO-LIGHT-transparent.webp');
  let logoBase64 = '';
  try {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/webp;base64,${logoBuffer.toString('base64')}`;
  } catch (e) {
    console.error('Could not load logo:', e);
  }

  const outDir = path.join(__dirname, '../public/images/og');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  for (const p of pages) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 630px;
            background-color: #172F2B;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          /* Subtle background circles for that business card feel */
          .circle-1 {
            position: absolute;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.05);
            top: -200px;
            right: -200px;
          }
          .circle-2 {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.05);
            bottom: -300px;
            left: -100px;
          }
          .logo {
            width: 140px;
            height: auto;
            margin-bottom: 40px;
            /* Filter to make it pure white if it isn't already */
            filter: brightness(0) invert(1);
          }
          .title {
            font-family: 'DM Serif Display', serif;
            font-size: 80px;
            color: #F8F9FA;
            margin-bottom: 30px;
            text-align: center;
            line-height: 1.1;
          }
          .divider {
            width: 100px;
            height: 4px;
            background-color: #C59B42;
            margin-bottom: 40px;
            border-radius: 2px;
          }
          .subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 22px;
            font-weight: 500;
            color: #E2E8F0;
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .sub-subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 400;
            color: #94A3B8;
            letter-spacing: 4px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        ${logoBase64 ? `<img src="${logoBase64}" class="logo" />` : ''}
        <h1 class="title">${p.title}</h1>
        <div class="divider"></div>
        <div class="subtitle">${p.subtitle}</div>
        <div class="sub-subtitle">${p.subSubtitle}</div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000)); // wait for fonts to render
    const outPath = path.join(outDir, p.filename);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Generated ${p.filename}`);
  }

  await browser.close();
  console.log('Done!');
}

generateImages().catch(console.error);
