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
    id: "retrato-parque-gafas",
    src: "/images/portfolio/retrato-parque-gafas.webp",
    width: 1366,
    height: 2048,
    alt: {
      es: "Retrato de una mujer con top negro de cuello alto, aros dorados y gafas de sol sobre la cabeza, sonriendo en un parque soleado",
      ca: "Retrat d'una dona amb top negre de coll alt, arracades daurades i ulleres de sol al cap, somrient en un parc assolellat",
      en: "Portrait of a woman in a black high-neck top, gold hoop earrings and sunglasses on her head, smiling in a sunny park",
    },
    featured: true, // also the hero/cover photo (siteConfig.heroImage)
    published: true,
    order: 10,
  },
  {
    id: "retrato-gorra-perfil",
    src: "/images/portfolio/retrato-gorra-perfil.webp",
    width: 1600,
    height: 1200,
    alt: {
      es: "Retrato de perfil de una mujer con gorra gris desgastada y aros plateados, con la mano cerca de la barbilla, en una calle con grafitis",
      ca: "Retrat de perfil d'una dona amb gorra grisa desgastada i arracades platejades, amb la mà a prop de la barbeta, en un carrer amb grafits",
      en: "Profile portrait of a woman in a faded grey cap and silver hoop earrings, with her hand near her chin, on a street with graffiti",
    },
    featured: true,
    published: true,
    order: 20,
  },
  {
    id: "verano-mar-sombrero",
    src: "/images/portfolio/verano-mar-sombrero.webp",
    width: 1800,
    height: 2400,
    alt: {
      es: "Mujer con sombrero de paja, gafas de sol y vestido blanco de encaje sobre unas rocas junto a un mar turquesa",
      ca: "Dona amb barret de palla, ulleres de sol i vestit blanc de puntes sobre unes roques al costat d'un mar turquesa",
      en: "Woman in a straw hat, sunglasses and white lace dress on some rocks beside a turquoise sea",
    },
    featured: true,
    published: true,
    order: 30,
  },
  {
    id: "moda-calle-estampado",
    src: "/images/portfolio/moda-calle-estampado.webp",
    width: 1800,
    height: 2400,
    alt: {
      es: "Mujer con top de estampado de cebra, pantalón blanco ancho y gafas de sol, de pie en la esquina de una calle de ciudad",
      ca: "Dona amb top d'estampat de zebra, pantalons blancs amples i ulleres de sol, dreta a la cantonada d'un carrer de ciutat",
      en: "Woman in a zebra-print top, wide white trousers and sunglasses, standing on a city street corner",
    },
    featured: true,
    published: true,
    order: 40,
  },
  {
    id: "cafeteria-mesa",
    src: "/images/portfolio/cafeteria-mesa.webp",
    width: 1350,
    height: 2400,
    alt: {
      es: "Mujer sentada a la mesa de una cafetería luminosa, con un brownie y un café con leche delante",
      ca: "Dona asseguda a la taula d'una cafeteria lluminosa, amb un brownie i un cafè amb llet al davant",
      en: "Woman sitting at a table in a bright café, with a brownie and a latte in front of her",
    },
    featured: true,
    published: true,
    order: 50,
  },
  {
    id: "retrato-parque-banco",
    src: "/images/portfolio/retrato-parque-banco.webp",
    width: 1600,
    height: 2400,
    alt: {
      es: "Mujer sentada en un banco de un parque, con top negro sin mangas y pantalón oscuro, mirando a cámara con una sonrisa",
      ca: "Dona asseguda en un banc d'un parc, amb top negre sense mànigues i pantalons foscos, mirant a càmera amb un somriure",
      en: "Woman sitting on a park bench in a sleeveless black top and dark trousers, smiling at the camera",
    },
    featured: true,
    published: true,
    order: 60,
  },
];
