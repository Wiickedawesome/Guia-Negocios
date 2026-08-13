import sharp from 'sharp';

const input = 'src/assets/images/Portrait.webp';
const output = 'public/images/team-avatar.webp';

sharp(input)
  .resize({
    width: 150,
    height: 150,
    fit: sharp.fit.cover,
    position: sharp.strategy.attention
  })
  .webp({ quality: 80 })
  .toFile(output)
  .then(info => console.log('Avatar created:', info))
  .catch(err => console.error('Error:', err));
