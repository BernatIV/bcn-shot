import type { SiteImage } from "./types";

export const siteConfig = {
  name: "BCN SHOT",
  url: "https://bcnshot.com",
  email: "info@bcnshot.com",
  locale: "es_ES",
  instagramUrl: "https://www.instagram.com/bcnshot/" as string | null,
  /** Oriol's personal Instagram account (as opposed to the BCN SHOT project account above). */
  personalInstagramUrl: "https://www.instagram.com/oriolmaneduatis/" as string | null,
  heroImage: {
    src: "/images/portfolio/retrato-parque-gafas.webp",
    width: 1366,
    height: 2048,
    alt: "Retrato de una mujer con top negro de cuello alto, aros dorados y gafas de sol sobre la cabeza, sonriendo en un parque soleado",
    focalPoint: { x: 50, y: 32 },
  } as SiteImage | null,
  aboutPortrait: {
    src: "/images/site/oriol-retrato.webp",
    width: 1254,
    height: 1254,
    alt: "Retrato de Oriol sosteniendo una cámara a la altura del pecho y mirando a cámara",
    focalPoint: { x: 50, y: 40 },
  } as SiteImage | null,
  /** Horizontal logo cropped from the original logo file (logo.jpeg). */
  logo: { src: "/images/site/logo.png", width: 717, height: 160, alt: "" } as SiteImage | null,
  /**
   * Behavior of the featured photos on the homepage (decision pending from Marc):
   * "link" → link to /portfolio.
   */
  featuredBehavior: "link" as const,
  /** Lightbox: reaching the end loops back to the start (uniform decision, changeable here). */
  lightboxLoop: true,
  nav: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/contacto", label: "Contacto" },
  ],
  cta: { href: "/contacto", label: "Reserva tu sesión" },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
