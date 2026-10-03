// Exports a web-ready version of an original photo to public/images/<dir>/<id>.webp
// and prints the entry to paste into content/photos.ts.
//
// Usage: npm run image -- <original> <id> [--max=2400] [--dir=portfolio] [--quality=85]
// Example: npm run image -- "C:/path/originals/photo.jpeg" retrato-parque-01
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [input, id, ...rest] = process.argv.slice(2);
if (!input || !id) {
  console.error("Usage: npm run image -- <original> <id> [--max=2400] [--dir=portfolio] [--quality=85]");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(id)) {
  console.error("The id must be kebab-case: only a-z, 0-9 and hyphens.");
  process.exit(1);
}

const opts = Object.fromEntries(rest.map((a) => a.replace(/^--/, "").split("=")));
const max = Number(opts.max ?? 2400);
const quality = Number(opts.quality ?? 85);
const dir = opts.dir ?? "portfolio";

const outDir = path.join("public", "images", dir);
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${id}.webp`);

const info = await sharp(input)
  .rotate() // applies EXIF orientation
  .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
  .toColorspace("srgb")
  .withIccProfile("srgb") // keeps an explicit color profile
  .webp({ quality })
  .toFile(outFile);

console.log(`✓ ${outFile} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
console.log(`{
  id: "${id}",
  src: "/images/${dir}/${id}.webp",
  width: ${info.width},
  height: ${info.height},
  alt: "TODO: description in Spanish",
  featured: false,
  published: true,
  order: 0,
},`);
