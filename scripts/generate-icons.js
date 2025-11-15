// Icon Generation Script
// Run with: node scripts/generate-icons.js
// Requires: npm install sharp

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp is not installed.');
  console.error('Please run: npm install sharp');
  console.error('Or use the HTML generator at scripts/generate-icons.html');
  process.exit(1);
}

const sizes = [16, 32, 192, 512];
const svgPath = path.join(__dirname, '..', 'src', 'app', 'icon.svg');
const publicDir = path.join(__dirname, '..', 'public');

// Read SVG file
const svgBuffer = fs.readFileSync(svgPath);

console.log('Generating PNG icons from SVG...');

// Generate each size
Promise.all(
  sizes.map(size => {
    const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
    return sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath)
      .then(() => {
        console.log(`✓ Generated icon-${size}x${size}.png`);
      })
      .catch(err => {
        console.error(`✗ Failed to generate icon-${size}x${size}.png:`, err.message);
      });
  })
).then(() => {
  console.log('\nAll icons generated successfully!');
  console.log('Files created in public/ directory:');
  sizes.forEach(size => {
    console.log(`  - icon-${size}x${size}.png`);
  });
}).catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
