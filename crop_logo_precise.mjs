import sharp from 'sharp';

async function cropEmblem() {
  try {
    const img = sharp('public/images/GuiaNegociosLOGO.png');
    const metadata = await img.metadata();
    
    await img
      .trim()
      .toFile('public/images/trimmed_temp.png');
      
    const trimmed = sharp('public/images/trimmed_temp.png');
    const trimMeta = await trimmed.metadata();
    
    // The emblem is typically taller than it is wide, or roughly square.
    // If the image is 800x500, the emblem is probably around 350px wide.
    // Let's just crop the left 320 pixels.
    const cropWidth = Math.floor(trimMeta.width * 0.35); // 35% of the width
    
    await trimmed
      .extract({ left: 0, top: 0, width: cropWidth, height: trimMeta.height })
      .webp()
      .toFile('public/images/GuiaNegocios-emblem-color.webp');
      
    console.log("Successfully extracted colored emblem to GuiaNegocios-emblem-color.webp with width:", cropWidth);
  } catch (error) {
    console.error("Error cropping emblem:", error);
  }
}

cropEmblem();
