export type FocalPoint = { x: number; y: number }; // 0..100

export type PortfolioPhoto = {
  id: string; // estable i únic
  src: string; // versió web, ruta local (/images/...) o URL controlada
  lightboxSrc?: string; // versió més gran, optimitzada
  width: number; // píxels reals de la versió web
  height: number;
  alt: string; // descripció útil en castellà
  title?: string;
  shotDate?: string; // ISO YYYY-MM-DD, només si és verificat
  location?: string; // només si es pot publicar
  credit?: string; // acordat amb la model / equip
  focalPoint?: FocalPoint;
  featured: boolean;
  published: boolean;
  order: number;
};

/** Imatge individual aprovada (hero, retrat d'Oriol, logo...). */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  focalPoint?: FocalPoint;
};
