# Icon Generation Instructions

## Generating PNG Icons from SVG

The IReader website uses a custom SVG icon that needs to be converted to PNG format for various use cases (favicon, PWA icons, etc.).

### Method 1: Using the HTML Generator (Recommended)

1. Open `scripts/generate-icons.html` in a web browser
2. Click each button to generate and download the PNG files:
   - 16x16 (favicon)
   - 32x32 (favicon)
   - 192x192 (PWA icon)
   - 512x512 (PWA icon)
3. Move the downloaded files to the `public/` directory

### Method 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Generate 16x16
magick convert -background none -density 300 src/app/icon.svg -resize 16x16 public/icon-16x16.png

# Generate 32x32
magick convert -background none -density 300 src/app/icon.svg -resize 32x32 public/icon-32x32.png

# Generate 192x192
magick convert -background none -density 300 src/app/icon.svg -resize 192x192 public/icon-192x192.png

# Generate 512x512
magick convert -background none -density 300 src/app/icon.svg -resize 512x512 public/icon-512x512.png
```

### Method 3: Using Node.js with sharp

```bash
npm install sharp
```

Then create and run a script:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 32, 192, 512];
const svgBuffer = fs.readFileSync('src/app/icon.svg');

sizes.forEach(size => {
  sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(`public/icon-${size}x${size}.png`)
    .then(() => console.log(`Generated icon-${size}x${size}.png`));
});
```

## Required Files

After generation, ensure these files exist in the `public/` directory:
- `icon-16x16.png`
- `icon-32x32.png`
- `icon-192x192.png`
- `icon-512x512.png`

These are referenced in `src/app/layout.tsx` and `public/manifest.json`.
