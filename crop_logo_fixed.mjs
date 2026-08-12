import sharp from 'sharp';

async function cropEmblem() {
  try {
    const img = sharp('public/images/GuiaNegociosLOGO.png');
    const metadata = await img.metadata();
    
    // We just want the emblem on the left. The full image is 800px wide.
    // Let's crop the left 280 pixels.
    await img
      .extract({ left: 0, top: 0, width: 280, height: metadata.height })
      .trim()
      .webp()
      .toFile('public/images/GuiaNegocios-emblem-color.webp');
      
    console.log("Successfully extracted colored emblem with 280 width!");
  } catch (error) {
    console.error("Error cropping emblem:", error);
  }
}

cropEmblem();
