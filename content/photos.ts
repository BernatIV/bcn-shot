import type { PortfolioPhoto } from "./types";

/**
 * Fotos del portafolis (derivats web a /public/images/portfolio, generats amb `npm run image`).
 * Originals fora del repositori (mai a public/).
 *
 * - `published: true` només amb permís de publicació de les persones retratades.
 * - `featured: true` per a 4–8 fotos de portada.
 * - `order` ascendent i únic (salts de 10 per poder intercalar).
 */
export const photos: PortfolioPhoto[] = [
  {
    id: "retrato-parque-gafas",
    src: "/images/portfolio/retrato-parque-gafas.webp",
    width: 1366,
    height: 2048,
    alt: "Retrato de una mujer con top negro de cuello alto, aros dorados y gafas de sol sobre la cabeza, sonriendo en un parque soleado",
    featured: false, // és la foto de portada (siteConfig.heroImage)
    published: true,
    order: 10,
  },
  {
    id: "moda-calle-estampado",
    src: "/images/portfolio/moda-calle-estampado.webp",
    width: 1800,
    height: 2400,
    alt: "Mujer con top de estampado de cebra, pantalón blanco ancho y gafas de sol, de pie en la esquina de una calle de ciudad",
    featured: true,
    published: true,
    order: 20,
  },
  {
    id: "verano-mar-sombrero",
    src: "/images/portfolio/verano-mar-sombrero.webp",
    width: 1800,
    height: 2400,
    alt: "Mujer con sombrero de paja, gafas de sol y vestido blanco de encaje sobre unas rocas junto a un mar turquesa",
    featured: true,
    published: true,
    order: 30,
  },
  {
    id: "cafeteria-mesa",
    src: "/images/portfolio/cafeteria-mesa.webp",
    width: 1350,
    height: 2400,
    alt: "Mujer sentada a la mesa de una cafetería luminosa, con un brownie y un café con leche delante",
    featured: true,
    published: true,
    order: 40,
  },
  {
    id: "retrato-gorra-perfil",
    src: "/images/portfolio/retrato-gorra-perfil.webp",
    width: 1600,
    height: 1200,
    alt: "Retrato de perfil de una mujer con gorra gris desgastada y aros plateados, con la mano cerca de la barbilla, en una calle con grafitis",
    featured: true,
    published: true,
    order: 50,
  },
  {
    id: "retrato-parque-banco",
    src: "/images/portfolio/retrato-parque-banco.webp",
    width: 1600,
    height: 2400,
    alt: "Mujer sentada en un banco de un parque, con top negro sin mangas y pantalón oscuro, mirando a cámara con una sonrisa",
    featured: true,
    published: true,
    order: 60,
  },
];
