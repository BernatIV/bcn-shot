import type { DecorativeImage, SiteImage } from "./types";

export const siteConfig = {
  name: "BCN SHOT",
  url: "https://bcnshot.com",
  email: "info@bcnshot.com",
  /** Legal identity shown on /aviso-legal and /privacidad (confirmed by Oriol). */
  owner: { name: "Oriol Mañé Duatis", nif: "47909332X" },
  instagramUrl: "https://www.instagram.com/bcnshot/" as string | null,
  /** Oriol's personal Instagram account (as opposed to the BCN SHOT project account above). */
  personalInstagramUrl: "https://www.instagram.com/oriolmaneduatis/" as string | null,
  heroImage: {
    src: "/images/portfolio/retrato-parque-gafas.webp",
    width: 1366,
    height: 2048,
    alt: {
      es: "Retrato de una mujer con top negro de cuello alto, aros dorados y gafas de sol sobre la cabeza, sonriendo en un parque soleado",
      ca: "Retrat d'una dona amb top negre de coll alt, arracades daurades i ulleres de sol al cap, somrient en un parc assolellat",
      en: "Portrait of a woman in a black high-neck top, gold hoop earrings and sunglasses on her head, smiling in a sunny park",
    },
    focalPoint: { x: 50, y: 32 },
  } as SiteImage | null,
  aboutPortrait: {
    src: "/images/site/oriol-retrato.webp",
    width: 1254,
    height: 1254,
    alt: {
      es: "Retrato de Oriol sosteniendo una cámara a la altura del pecho y mirando a cámara",
      ca: "Retrat de l'Oriol sostenint una càmera a l'altura del pit i mirant a càmera",
      en: "Portrait of Oriol holding a camera at chest height and looking at the camera",
    },
    focalPoint: { x: 50, y: 40 },
  } as SiteImage | null,
  /** Horizontal logo cropped from the original logo file (logo.jpeg). */
  logo: { src: "/images/site/logo.png", width: 717, height: 160 } as DecorativeImage | null,
  /**
   * Behavior of the featured photos on the homepage (decision pending from Marc):
   * "link" → link to /portfolio.
   */
  featuredBehavior: "link" as const,
  /** Lightbox: reaching the end loops back to the start (uniform decision, changeable here). */
  lightboxLoop: true,
  /** Paths without the locale prefix (route segments are not translated); labels live in content/copy. */
  nav: [
    { path: "/portfolio", key: "portfolio" },
    { path: "/sobre-mi", key: "about" },
    { path: "/contacto", key: "contact" },
  ],
  ctaPath: "/contacto",
} as const;
