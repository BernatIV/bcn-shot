import type { PortfolioPhoto } from "./types";

/**
 * Fotos de prova NOMÉS per a desenvolupament local (`next dev`) quan `photos` és buit.
 * Són imatges grises etiquetades com a placeholder; mai es fan servir en producció.
 */
const portrait = { src: "/images/placeholders/portrait.svg", width: 1200, height: 1600 };
const landscape = { src: "/images/placeholders/landscape.svg", width: 1600, height: 1067 };

const shapes = [portrait, portrait, landscape, portrait, landscape, portrait, portrait, landscape, portrait];

export const devPlaceholderPhotos: PortfolioPhoto[] = shapes.map((shape, i) => ({
  id: `placeholder-${i + 1}`,
  ...shape,
  alt: `Imagen de prueba ${i + 1} (placeholder de desarrollo)`,
  featured: i < 6,
  published: true,
  order: i + 1,
}));
