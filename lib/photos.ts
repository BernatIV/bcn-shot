import fs from "node:fs";
import path from "node:path";
import { photos } from "@/content/photos";
import { devPlaceholderPhotos } from "@/content/dev-placeholder-photos";
import type { FocalPoint, PortfolioPhoto } from "@/content/types";

const isDev = process.env.NODE_ENV === "development";
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

/** Valida les dades del portafolis. Llança error per trencar `next dev`/`next build` si hi ha dades incorrectes. */
export function validatePhotos(list: PortfolioPhoto[], { checkFiles }: { checkFiles: boolean }) {
  const errors: string[] = [];
  const ids = new Set<string>();
  const orders = new Set<number>();

  for (const p of list) {
    const label = `photo "${p.id}"`;
    if (!p.id) errors.push("photo without id");
    if (ids.has(p.id)) errors.push(`${label}: duplicated id`);
    ids.add(p.id);
    if (orders.has(p.order)) errors.push(`${label}: duplicated order ${p.order}`);
    orders.add(p.order);
    if (!(p.width > 0) || !(p.height > 0)) errors.push(`${label}: width/height must be positive`);
    if (p.published && p.alt.trim().length < 5) errors.push(`${label}: published photo needs a descriptive alt`);
    if (p.shotDate && !/^\d{4}-\d{2}-\d{2}$/.test(p.shotDate)) errors.push(`${label}: shotDate must be YYYY-MM-DD`);
    if (p.focalPoint && !isValidFocalPoint(p.focalPoint)) errors.push(`${label}: focalPoint must be 0..100`);
    if (checkFiles) {
      for (const src of [p.src, p.lightboxSrc]) {
        if (src && src.startsWith("/") && !fs.existsSync(path.join(process.cwd(), "public", src))) {
          errors.push(`${label}: file not found in public${src}`);
        }
      }
    }
  }

  const featured = list.filter((p) => p.published && p.featured).length;
  if (list.length > 0 && (featured < 4 || featured > 8)) {
    console.warn(`[photos] ${featured} featured photos; the home page expects between 4 and 8.`);
  }

  if (errors.length > 0) {
    throw new Error(`Invalid portfolio data (content/photos.ts):\n- ${errors.join("\n- ")}`);
  }
}

function isValidFocalPoint({ x, y }: FocalPoint) {
  return x >= 0 && x <= 100 && y >= 0 && y <= 100;
}

const source = photos.length === 0 && isDev ? devPlaceholderPhotos : photos;
validatePhotos(source, { checkFiles: isDev || isBuild });

export const usingPlaceholderPhotos = source !== photos;

export function getPublishedPhotos(): PortfolioPhoto[] {
  return source.filter((p) => p.published).sort((a, b) => a.order - b.order);
}

export function getFeaturedPhotos(): PortfolioPhoto[] {
  return getPublishedPhotos()
    .filter((p) => p.featured)
    .slice(0, 8);
}
