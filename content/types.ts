export type FocalPoint = { x: number; y: number }; // 0..100

export type PortfolioPhoto = {
  id: string; // stable and unique
  src: string; // web-ready version, local path (/images/...) or a controlled URL
  lightboxSrc?: string; // larger, optimized version
  width: number; // real pixel dimensions of the web version
  height: number;
  alt: string; // useful description in Spanish
  title?: string;
  shotDate?: string; // ISO YYYY-MM-DD, only if verified
  location?: string; // only if it can be published
  credit?: string; // agreed with the model / crew
  focalPoint?: FocalPoint;
  featured: boolean;
  published: boolean;
  order: number;
};

/** A single approved image (hero, Oriol's portrait, logo...). */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  focalPoint?: FocalPoint;
};
