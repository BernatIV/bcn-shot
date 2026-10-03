// Exporta una versió web d'una foto original cap a public/images/<dir>/<id>.webp
// i mostra l'entrada per enganxar a content/photos.ts.
//
// Ús: npm run image -- <original> <id> [--max=2400] [--dir=portfolio] [--quality=85]
// Exemple: npm run image -- "C:/ruta/originals/foto.jpeg" retrato-parque-01
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [input, id, ...rest] = process.argv.slice(2);
if (!input || !id) {
  console.error("Ús: npm run image -- <original> <id> [--max=2400] [--dir=portfolio] [--quality=85]");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(id)) {
  console.error("L'id ha de ser kebab-case: només a-z, 0-9 i guions.");
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
  .rotate() // aplica l'orientació EXIF
  .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
  .toColorspace("srgb")
  .withIccProfile("srgb") // conserva un perfil de color explícit
  .webp({ quality })
  .toFile(outFile);

console.log(`✓ ${outFile} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
console.log(`{
  id: "${id}",
  src: "/images/${dir}/${id}.webp",
  width: ${info.width},
  height: ${info.height},
  alt: "TODO: descripció en castellà",
  featured: false,
  published: true,
  order: 0,
},`);
