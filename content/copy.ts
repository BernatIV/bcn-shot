/**
 * Textos visibles de la web (castellà).
 * Són PROPOSTES editables de l'spec, no afirmacions factuals: Oriol els ha de validar abans de publicar.
 * Centralitzats aquí per poder afegir català/anglès més endavant.
 */
export const copy = {
  meta: {
    defaultTitle: "BCN SHOT — Fotografía de moda y retrato en Barcelona",
    description:
      "BCN SHOT es el proyecto de fotografía de moda, retrato y editorial de Oriol, con base en Barcelona.",
  },
  home: {
    title: "Fotografía de moda y retrato en Barcelona",
    subtitle: "Imágenes con personalidad, creadas para mostrar tu estilo.",
    primaryCta: "Reserva tu sesión",
    secondaryCta: "Ver portfolio",
    featuredHeading: "Trabajo seleccionado",
    featuredLink: "Ver todo el portfolio",
    proposalHeading: "Moda, retrato y editorial",
    proposalItems: [
      {
        title: "Sesiones de retrato",
        text: "Retratos con una estética cuidada, pensados para mostrar quién eres.",
      },
      {
        title: "Moda y editorial",
        text: "Imágenes para tu book o para un proyecto editorial con una idea clara.",
      },
      {
        title: "Colaboraciones",
        text: "Abierto a proponer y desarrollar colaboraciones creativas.",
      },
    ],
    proposalLocation:
      "Sesiones en exteriores de Barcelona o en otras ubicaciones que acordemos.",
    aboutHeading: "Sobre mí",
    aboutLink: "Conoce a Oriol",
  },
  about: {
    title: "Sobre mí",
    description: "Oriol, fotógrafo de moda, retrato y editorial en Barcelona.",
    // TODO_PUBLICACION: ajustar amb la veu d'Oriol.
    paragraphs: [
      "Soy Oriol, fotógrafo en Barcelona. Me interesa crear retratos y editoriales con una estética cuidada y una conexión natural con cada persona.",
    ],
  },
  portfolio: {
    title: "Portfolio",
    description: "Selección de fotografía de moda, retrato y editorial de BCN SHOT.",
    intro: "Moda, retrato y editorial.",
    emptyTitle: "El portfolio se está preparando",
    emptyText: "Muy pronto podrás ver aquí una selección de trabajos. Mientras tanto, puedes escribirme.",
  },
  contact: {
    title: "Contacto",
    description: "Cuéntame qué tienes en mente para tu sesión de moda o retrato en Barcelona.",
    intro:
      "Cuéntame qué tienes en mente: una sesión personal, un editorial o una colaboración.",
    emailLabel: "Correo",
    instagramLabel: "Instagram",
  },
  finalCta: {
    heading: "¿Tienes una idea en mente?",
    text: "Cuéntame qué te gustaría hacer y hablamos.",
  },
} as const;
