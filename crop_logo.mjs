import sharp from 'sharp';

async function cropEmblem() {
  try {
    // Read the original colored logo
    const img = sharp('public/images/GuiaNegociosLOGO.png');
    const metadata = await img.metadata();
    
    // The logo is 800x501. The emblem is typically on the left side.
    // Let's assume the emblem takes up the first ~300 pixels in width (usually a square).
    // Let's crop a square from the left.
    // A square from height 501 would be 501x501, or 350x350 if there's padding.
    // Let's trim the image first to remove outer transparent padding, then crop the left part.
    
    await img
      .trim()
      .toFile('public/images/trimmed_temp.png');
      
    const trimmed = sharp('public/images/trimmed_temp.png');
    const trimMeta = await trimmed.metadata();
    
    // Extract the left square part based on height
    const emblemWidth = trimMeta.height;
    
    await trimmed
      .extract({ left: 0, top: 0, width: emblemWidth, height: trimMeta.height })
      .webp()
      .toFile('public/images/GuiaNegocios-emblem-color.webp');
      
    console.log("Successfully extracted colored emblem to GuiaNegocios-emblem-color.webp");
  } catch (error) {
    console.error("Error cropping emblem:", error);
  }
}

cropEmblem();
