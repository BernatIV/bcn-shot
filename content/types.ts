import type { Localized } from "@/lib/i18n";

export type FocalPoint = { x: number; y: number }; // 0..100

export type PortfolioPhoto = {
  id: string; // stable and unique
  src: string; // web-ready version, local path (/images/...) or a controlled URL
  lightboxSrc?: string; // larger, optimized version
  width: number; // real pixel dimensions of the web version
  height: number;
  alt: Localized; // useful description, in every language
  title?: Localized;
  shotDate?: string; // ISO YYYY-MM-DD, only if verified
  location?: string; // only if it can be published
  credit?: string; // agreed with the model / crew
  focalPoint?: FocalPoint;
  featured: boolean;
  published: boolean;
  order: number;
};

/** A portfolio photo with its texts resolved to one language (what components receive). */
export type Photo = Omit<PortfolioPhoto, "alt" | "title"> & { alt: string; title?: string };

/** A single approved image (hero, Oriol's portrait...). */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  focalPoint?: FocalPoint;
};

/** Purely decorative image (alt=""), e.g. the logo inside a link that already has an accessible name. */
export type DecorativeImage = { src: string; width: number; height: number };
