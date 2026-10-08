import type { LegalPage } from "./types";

/**
 * Visible website copy — Spanish (reference language: its shape defines the `Copy` type).
 * These are editable PROPOSALS from the spec, not factual claims: Oriol must approve them before launch.
 */

const legalNotice: LegalPage = {
  title: "Aviso legal",
  description: "Aviso legal de BCN SHOT.",
  sections: [
    {
      heading: "1. Titular del sitio web",
      blocks: [
        "En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico, se informa de los datos del titular de este sitio web:",
        [
          "Titular: **{owner}**",
          "NIF: **{nif}**",
          "Localidad: **Barcelona (España)**",
          "Correo electrónico: **{email}**",
          "Actividad: fotografía de moda, retrato y editorial",
          "Sitio web: **{url}**",
        ],
      ],
    },
    {
      heading: "2. Finalidad del sitio web",
      blocks: [
        "BCN SHOT muestra el trabajo fotográfico del titular y facilita el contacto de personas interesadas en solicitar una sesión o proponer una colaboración.",
      ],
    },
    {
      heading: "3. Uso del sitio web",
      blocks: [
        "La persona usuaria se compromete a utilizar el sitio web de forma lícita y a no realizar acciones que puedan perjudicar su funcionamiento o los derechos de terceros.",
      ],
    },
    {
      heading: "4. Propiedad intelectual y derechos de imagen",
      blocks: [
        "Los textos, fotografías, logotipos y demás contenidos del sitio web están protegidos por la normativa aplicable. Su reproducción, distribución o uso público requiere la autorización de quien ostente los derechos, salvo en los casos permitidos por la ley.",
        "La publicación de fotografías de personas se realiza conforme a las autorizaciones que correspondan en cada caso.",
      ],
    },
    {
      heading: "5. Enlaces externos",
      blocks: [
        "Este sitio web puede incluir enlaces a plataformas externas, como Instagram. El titular no controla sus contenidos ni sus políticas de privacidad.",
      ],
    },
    {
      heading: "6. Protección de datos",
      blocks: [
        "La información sobre el tratamiento de datos personales se encuentra en la [Política de privacidad](/privacidad).",
      ],
    },
  ],
};

const privacyPolicy: LegalPage = {
  title: "Política de privacidad",
  metaTitle: "Privacidad",
  description: "Información sobre privacidad y datos del formulario de contacto de BCN SHOT.",
  intro:
    "En BCN SHOT tratamos los datos personales que nos facilitas para responder a tus consultas y gestionar las sesiones fotográficas o colaboraciones que nos propongas.",
  sections: [
    {
      heading: "1. Responsable",
      blocks: [
        [
          "Responsable: **{owner}**",
          "NIF: **{nif}**",
          "Localidad: **Barcelona (España)**",
          "Correo electrónico: **{email}**",
          "Sitio web: **{url}**",
        ],
      ],
    },
    {
      heading: "2. Qué datos tratamos y para qué",
      blocks: [
        "Si utilizas el formulario de contacto, tratamos tu nombre, dirección de correo electrónico, tipo de consulta y el contenido del mensaje. Si nos escribes directamente por correo, tratamos los datos que incluyas en tu comunicación.",
        "Utilizamos estos datos para responderte y, en su caso, preparar una sesión fotográfica, un presupuesto o una colaboración. No los utilizamos para enviarte publicidad no solicitada.",
      ],
    },
    {
      heading: "3. Base jurídica",
      blocks: [
        "Cuando solicitas información sobre una sesión o presupuesto, el tratamiento es necesario para atender tu petición y realizar gestiones previas a una posible contratación. Para otras consultas o propuestas de colaboración, tratamos los datos que nos facilitas para poder responderte.",
      ],
    },
    {
      heading: "4. Cuánto tiempo conservamos los datos",
      blocks: [
        "Conservamos las consultas durante el tiempo necesario para responderlas y gestionar la relación que pueda surgir. Si se contrata un servicio, conservaremos los datos que deban mantenerse durante los plazos exigidos por la normativa aplicable. Después, los suprimiremos cuando ya no sean necesarios.",
      ],
    },
    {
      heading: "5. Proveedores y transferencias internacionales",
      blocks: [
        "La web está alojada en Vercel. Los mensajes enviados mediante el formulario se procesan a través de Resend para hacerlos llegar por correo electrónico al responsable.",
        "Estos proveedores pueden acceder a los datos necesarios para prestar sus servicios. Resend almacena datos, incluido el contenido de los mensajes, en Estados Unidos. Vercel también contempla el tratamiento de datos fuera del Espacio Económico Europeo. Estos tratamientos deben realizarse con las garantías exigidas por la normativa de protección de datos. No vendemos tus datos personales a terceros.",
      ],
    },
    {
      heading: "6. Tus derechos",
      blocks: [
        "Puedes solicitar el acceso a tus datos, su rectificación o supresión, así como ejercer los demás derechos reconocidos por la normativa de protección de datos, escribiendo a **{email}**.",
        "También puedes presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que el tratamiento de tus datos no es adecuado.",
      ],
    },
    {
      heading: "7. Cookies",
      blocks: [
        "Esta web solo utiliza una cookie técnica, **NEXT_LOCALE**, que se guarda cuando eliges un idioma con el selector de idioma para mostrarte la web en ese idioma en tus próximas visitas. Dura un año y no se utiliza para ninguna otra finalidad. Al ser necesaria para prestar una función que tú solicitas, no requiere tu consentimiento.",
        "No utilizamos cookies de análisis ni de publicidad. Esta información se actualizará si se incorporan herramientas de análisis, publicidad u otras tecnologías que lo requieran.",
      ],
    },
  ],
};

export const es = {
  meta: {
    defaultTitle: "BCN SHOT — Fotografía de moda y retrato en Barcelona",
    description:
      "BCN SHOT es el proyecto de fotografía de moda, retrato y editorial de Oriol, con base en Barcelona.",
  },
  common: {
    skipToContent: "Saltar al contenido",
    mainNav: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menuTitle: "Menú",
    logoLabel: "BCN SHOT, ir a inicio",
    languageNav: "Idioma",
    newTab: "(se abre en una pestaña nueva)",
    instagramBcnShot: "Instagram de BCN SHOT",
    legalNotice: "Aviso legal",
    privacy: "Privacidad",
  },
  nav: {
    portfolio: "Portfolio",
    about: "Sobre mí",
    contact: "Contacto",
    cta: "Reserva tu sesión",
  },
  pending: {
    prefix: "Imagen pendiente",
    hero: "Foto principal de portada (autorizada por Oriol)",
    featured: "Selección de 4 a 8 fotos destacadas (featured en content/photos.ts)",
    portrait: "Retrato real de Oriol (aprobado por él)",
  },
  home: {
    title: "Fotografía de moda y retrato en Barcelona",
    subtitle: "Imágenes con personalidad, creadas para mostrar tu estilo.",
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
    proposalLocation: "Sesiones en exteriores de Barcelona o en otras ubicaciones que acordemos.",
    aboutHeading: "Sobre mí",
    aboutLink: "Conoce a Oriol",
  },
  about: {
    title: "Sobre mí",
    description: "Oriol Mañé Duatis, fotógrafo de moda y retrato en Barcelona.",
    paragraphs: [
      "Soy Oriol Mañé Duatis, fotógrafo de moda y retrato afincado en Barcelona. Concibo la fotografía como un punto de encuentro entre la dirección estética y la espontaneidad, buscando siempre imágenes que transmitan verdad y carácter.",
      "Pasar varios años viviendo y viajando por la India y Australia definió mi forma de mirar y de relacionarme con las personas. Aprendí a adaptarme a cualquier entorno, a observar sin prejuicios y a valorar la belleza de lo cotidiano. Como fotógrafo —y también como músico—, presto especial atención al ritmo, al lenguaje corporal y a los silencios, elementos clave para que un retrato tenga fuerza propia.",
      "Mi objetivo en cada proyecto es que la técnica nunca eclipse a la persona. Trabajo para generar un espacio cómodo frente al objetivo, convencido de que la excelencia de una fotografía está en lograr que la naturalidad hable por sí sola.",
    ],
    instagramProfessional: "Instagram profesional de BCN SHOT, @bcnshot",
    instagramPersonal: "Instagram personal de Oriol, @oriolmaneduatis",
  },
  portfolio: {
    title: "Portfolio",
    description: "Selección de fotografía de moda, retrato y editorial de BCN SHOT.",
    intro: "Moda, retrato y editorial.",
    emptyTitle: "El portfolio se está preparando",
    emptyText: "Muy pronto podrás ver aquí una selección de trabajos. Mientras tanto, puedes escribirme.",
    enlarge: "Ampliar",
    lightbox: {
      title: "Visor de fotos",
      photo: "Foto",
      close: "Cerrar visor",
      previous: "Foto anterior",
      next: "Foto siguiente",
    },
  },
  contact: {
    title: "Contacto",
    description: "Cuéntame qué tienes en mente para tu sesión de moda o retrato en Barcelona.",
    intro: "Cuéntame qué tienes en mente: una sesión personal, un editorial o una colaboración.",
    emailLabel: "Correo",
    instagramLabel: "Instagram",
    form: {
      fields: {
        name: "Nombre",
        email: "Correo electrónico",
        type: "Tipo de consulta",
        message: "Mensaje",
        consent: "Política de privacidad",
      },
      inquiryTypes: {
        session: "Sesión",
        tfp: "Colaboración TFP",
        other: "Otra",
      },
      messageHint: "Entre {min} y {max} caracteres.",
      errorSummary: "Revisa los siguientes campos:",
      emailFallback: "Correo:",
      honeypot: "No rellenes este campo",
      consent: "He leído y acepto la [política de privacidad](/privacidad).",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      status: {
        genericError:
          "No hemos podido enviar tu mensaje. Inténtalo de nuevo más tarde o escríbeme directamente por correo.",
        rateLimited: "Has enviado varios mensajes seguidos. Espera unos minutos o escríbeme directamente por correo.",
        success: "Gracias, he recibido tu mensaje. Te responderé por correo.",
      },
      validation: {
        nameRequired: "Escribe tu nombre.",
        nameTooLong: "El nombre no puede superar los {max} caracteres.",
        nameInvalid: "El nombre contiene caracteres no válidos.",
        emailRequired: "Escribe tu correo electrónico.",
        emailTooLong: "El correo no puede superar los {max} caracteres.",
        emailInvalid: "Escribe un correo válido, por ejemplo nombre@dominio.com.",
        typeRequired: "Elige un tipo de consulta.",
        messageRequired: "Escribe tu mensaje.",
        messageTooShort: "El mensaje debe tener al menos {min} caracteres.",
        messageTooLong: "El mensaje no puede superar los {max} caracteres.",
        messageInvalid: "El mensaje contiene caracteres no válidos.",
        consentRequired: "Debes aceptar la política de privacidad para enviar el formulario.",
      },
    },
  },
  finalCta: {
    heading: "¿Tienes una idea en mente?",
    text: "Cuéntame qué te gustaría hacer y hablamos.",
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o se ha movido.",
    home: "Volver al inicio",
    portfolio: "Ver portfolio",
  },
  legalNotice,
  privacyPolicy,
};
