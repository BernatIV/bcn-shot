import type { PortfolioPhoto } from "./types";

/**
 * Portfolio photos (web derivatives in /public/images/portfolio, generated with `npm run image`).
 * Originals kept outside the repository (never in public/).
 *
 * - `published: true` only with permission to publish from the people photographed.
 * - `featured: true` for 4–8 homepage photos.
 * - `alt` (and `title`, if any) in every language: es, ca, en.
 * - `order` ascending and unique (gaps of 10 so items can be reordered easily).
 */
export const photos: PortfolioPhoto[] = [
  {
    id: "retrato-parque-vestido-flores",
    src: "/images/portfolio/retrato-parque-vestido-flores.webp",
    width: 1600,
    height: 2400,
    alt: {
      es: "Retrato de una mujer de pelo largo con vestido de tirantes negro estampado de flores, sonriendo a la luz del atardecer en un parque",
      ca: "Retrat d'una dona de cabell llarg amb vestit de tirants negre estampat de flors, somrient a la llum del capvespre en un parc",
      en: "Portrait of a long-haired woman in a black floral slip dress, smiling in the evening light in a park",
    },
    featured: true,
    published: true,
    order: 10,
  },
  {
    id: "moda-calle-negro-bolso",
    src: "/images/portfolio/moda-calle-negro-bolso.webp",
    width: 1920,
    height: 2400,
    alt: {
      es: "Mujer rubia con conjunto negro de punto y bolso de charol negro, con una mano en el pelo, en medio de una calle de ciudad",
      ca: "Dona rossa amb conjunt negre de punt i bossa de xarol negra, amb una mà als cabells, al mig d'un carrer de ciutat",
      en: "Blonde woman in a black knit outfit with a black patent leather bag, one hand in her hair, in the middle of a city street",
    },
    featured: true,
    published: true,
    order: 20,
  },
  {
    id: "retrato-playa-rizos", // also the hero/cover photo (siteConfig.heroImage)
    src: "/images/portfolio/retrato-playa-rizos.webp",
    width: 1920,
    height: 2400,
    alt: {
      es: "Primer plano de una mujer de pelo rizado y oscuro mirando por encima del hombro, con el pelo al viento junto al mar",
      ca: "Primer pla d'una dona de cabell arrissat i fosc mirant per sobre l'espatlla, amb els cabells al vent a prop del mar",
      en: "Close-up of a woman with dark curly hair looking over her shoulder, her hair blowing in the wind by the sea",
    },
    featured: true,
    published: true,
    order: 30,
  },
  {
    id: "moda-calle-gabardina",
    src: "/images/portfolio/moda-calle-gabardina.webp",
    width: 1768,
    height: 2400,
    alt: {
      es: "Mujer con gafas de sol, gabardina beige sobre vestido amarillo claro, botas marrones y bolso de lunares, de pie en una plaza soleada",
      ca: "Dona amb ulleres de sol, gavardina beix sobre vestit groc clar, botes marrons i bossa de pics, dreta en una plaça assolellada",
      en: "Woman in sunglasses, a beige trench coat over a pale yellow dress, brown boots and a polka-dot bag, standing in a sunny square",
    },
    featured: true,
    published: true,
    order: 40,
  },
  {
    id: "moda-calle-cuclillas",
    src: "/images/portfolio/moda-calle-cuclillas.webp",
    width: 1600,
    height: 2400,
    alt: {
      es: "Mujer de pelo largo con ropa negra y zapatillas de plataforma, en cuclillas en la acera con la barbilla apoyada en la mano",
      ca: "Dona de cabell llarg amb roba negra i sabatilles de plataforma, ajupida a la vorera amb la barbeta recolzada a la mà",
      en: "Long-haired woman in black clothes and platform sneakers, crouching on the pavement with her chin resting on her hand",
    },
    featured: true,
    published: true,
    order: 50,
  },
  {
    id: "playa-mano-vestido-verde",
    src: "/images/portfolio/playa-mano-vestido-verde.webp",
    width: 1920,
    height: 2400,
    alt: {
      es: "Mujer de pelo rizado con vestido verde y collar de cuentas tendiendo la mano hacia la cámara en una playa",
      ca: "Dona de cabell arrissat amb vestit verd i collaret de perles allargant la mà cap a la càmera en una platja",
      en: "Curly-haired woman in a green dress and beaded necklace reaching her hand towards the camera on a beach",
    },
    featured: true,
    published: true,
    order: 60,
  },
];