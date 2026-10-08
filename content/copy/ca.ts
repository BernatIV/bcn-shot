import type { Copy, LegalPage } from "./types";

/** Visible website copy — Catalan. Editable proposals pending Oriol's review. */

const legalNotice: LegalPage = {
  title: "Avís legal",
  description: "Avís legal de BCN SHOT.",
  sections: [
    {
      heading: "1. Titular del lloc web",
      blocks: [
        "En compliment de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic, s'informa de les dades del titular d'aquest lloc web:",
        [
          "Titular: **{owner}**",
          "NIF: **{nif}**",
          "Localitat: **Barcelona (Espanya)**",
          "Correu electrònic: **{email}**",
          "Activitat: fotografia de moda, retrat i editorial",
          "Lloc web: **{url}**",
        ],
      ],
    },
    {
      heading: "2. Finalitat del lloc web",
      blocks: [
        "BCN SHOT mostra el treball fotogràfic del titular i facilita el contacte de les persones interessades a sol·licitar una sessió o proposar una col·laboració.",
      ],
    },
    {
      heading: "3. Ús del lloc web",
      blocks: [
        "La persona usuària es compromet a utilitzar el lloc web de manera lícita i a no fer accions que en puguin perjudicar el funcionament o els drets de tercers.",
      ],
    },
    {
      heading: "4. Propietat intel·lectual i drets d'imatge",
      blocks: [
        "Els textos, les fotografies, els logotips i la resta de continguts del lloc web estan protegits per la normativa aplicable. La reproducció, distribució o ús públic requereix l'autorització de qui en tingui els drets, llevat dels casos permesos per la llei.",
        "La publicació de fotografies de persones es fa d'acord amb les autoritzacions que corresponguin en cada cas.",
      ],
    },
    {
      heading: "5. Enllaços externs",
      blocks: [
        "Aquest lloc web pot incloure enllaços a plataformes externes, com ara Instagram. El titular no en controla els continguts ni les polítiques de privacitat.",
      ],
    },
    {
      heading: "6. Protecció de dades",
      blocks: [
        "La informació sobre el tractament de dades personals es troba a la [Política de privacitat](/privacidad).",
      ],
    },
  ],
};

const privacyPolicy: LegalPage = {
  title: "Política de privacitat",
  metaTitle: "Privacitat",
  description: "Informació sobre privacitat i dades del formulari de contacte de BCN SHOT.",
  intro:
    "A BCN SHOT tractem les dades personals que ens facilites per respondre les teves consultes i gestionar les sessions fotogràfiques o col·laboracions que ens proposis.",
  sections: [
    {
      heading: "1. Responsable",
      blocks: [
        [
          "Responsable: **{owner}**",
          "NIF: **{nif}**",
          "Localitat: **Barcelona (Espanya)**",
          "Correu electrònic: **{email}**",
          "Lloc web: **{url}**",
        ],
      ],
    },
    {
      heading: "2. Quines dades tractem i per a què",
      blocks: [
        "Si fas servir el formulari de contacte, tractem el teu nom, l'adreça de correu electrònic, el tipus de consulta i el contingut del missatge. Si ens escrius directament per correu, tractem les dades que incloguis en la teva comunicació.",
        "Fem servir aquestes dades per respondre't i, si escau, preparar una sessió fotogràfica, un pressupost o una col·laboració. No les fem servir per enviar-te publicitat no sol·licitada.",
      ],
    },
    {
      heading: "3. Base jurídica",
      blocks: [
        "Quan sol·licites informació sobre una sessió o un pressupost, el tractament és necessari per atendre la teva petició i fer gestions prèvies a una possible contractació. Per a altres consultes o propostes de col·laboració, tractem les dades que ens facilites per poder-te respondre.",
      ],
    },
    {
      heading: "4. Quant de temps conservem les dades",
      blocks: [
        "Conservem les consultes durant el temps necessari per respondre-les i gestionar la relació que en pugui sorgir. Si es contracta un servei, conservarem les dades que s'hagin de mantenir durant els terminis que exigeixi la normativa aplicable. Després, les suprimirem quan ja no siguin necessàries.",
      ],
    },
    {
      heading: "5. Proveïdors i transferències internacionals",
      blocks: [
        "El web està allotjat a Vercel. Els missatges enviats mitjançant el formulari es processen a través de Resend per fer-los arribar per correu electrònic al responsable.",
        "Aquests proveïdors poden accedir a les dades necessàries per prestar els seus serveis. Resend emmagatzema dades, inclòs el contingut dels missatges, als Estats Units. Vercel també preveu el tractament de dades fora de l'Espai Econòmic Europeu. Aquests tractaments s'han de fer amb les garanties que exigeix la normativa de protecció de dades. No venem les teves dades personals a tercers.",
      ],
    },
    {
      heading: "6. Els teus drets",
      blocks: [
        "Pots sol·licitar l'accés a les teves dades, la rectificació o la supressió, així com exercir la resta de drets reconeguts per la normativa de protecció de dades, escrivint a **{email}**.",
        "També pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades si consideres que el tractament de les teves dades no és adequat.",
      ],
    },
    {
      heading: "7. Galetes",
      blocks: [
        "Aquest web només fa servir una galeta tècnica, **NEXT_LOCALE**, que es desa quan tries un idioma amb el selector d'idioma per mostrar-te el web en aquest idioma en les properes visites. Dura un any i no s'utilitza per a cap altra finalitat. Com que és necessària per prestar una funció que sol·licites tu, no requereix el teu consentiment.",
        "Fem servir Vercel Analytics per conèixer el nombre aproximat de visites al web. Aquesta eina no fa servir galetes ni identifica les persones usuàries; genera estadístiques agregades i anònimes sobre l'ús del lloc.",
        "No fem servir galetes d'anàlisi ni de publicitat. Aquesta informació s'actualitzarà si s'incorporen eines d'anàlisi, publicitat o altres tecnologies que ho requereixin.",
      ],
    },
  ],
};

export const ca: Copy = {
  meta: {
    defaultTitle: "BCN SHOT — Fotografia de moda i retrat a Barcelona",
    description:
      "BCN SHOT és el projecte de fotografia de moda, retrat i editorial de l'Oriol, amb base a Barcelona.",
  },
  common: {
    skipToContent: "Salta al contingut",
    mainNav: "Principal",
    openMenu: "Obre el menú",
    closeMenu: "Tanca el menú",
    menuTitle: "Menú",
    logoLabel: "BCN SHOT, ves a l'inici",
    languageNav: "Idioma",
    newTab: "(s'obre en una pestanya nova)",
    instagramBcnShot: "Instagram de BCN SHOT",
    legalNotice: "Avís legal",
    privacy: "Privacitat",
  },
  nav: {
    portfolio: "Portfolio",
    about: "Sobre mi",
    contact: "Contacte",
    cta: "Reserva la teva sessió",
  },
  pending: {
    prefix: "Imatge pendent",
    hero: "Foto principal de portada (autoritzada per l'Oriol)",
    featured: "Selecció de 4 a 8 fotos destacades (featured a content/photos.ts)",
    portrait: "Retrat real de l'Oriol (aprovat per ell)",
  },
  home: {
    title: "Fotografia de moda i retrat a Barcelona",
    subtitle: "Imatges amb personalitat, creades per mostrar el teu estil.",
    secondaryCta: "Mira el portfolio",
    featuredHeading: "Treball seleccionat",
    featuredLink: "Mira tot el portfolio",
    proposalHeading: "Moda, retrat i editorial",
    proposalItems: [
      {
        title: "Sessions de retrat",
        text: "Retrats amb una estètica acurada, pensats per mostrar qui ets.",
      },
      {
        title: "Moda i editorial",
        text: "Imatges per al teu book o per a un projecte editorial amb una idea clara.",
      },
      {
        title: "Col·laboracions",
        text: "Obert a proposar i desenvolupar col·laboracions creatives.",
      },
    ],
    proposalLocation: "Sessions en exteriors de Barcelona o en altres ubicacions que acordem.",
    aboutHeading: "Sobre mi",
    aboutLink: "Coneix l'Oriol",
  },
  about: {
    title: "Sobre mi",
    description: "Oriol Mañé Duatis, fotògraf de moda i retrat a Barcelona.",
    paragraphs: [
      "Soc l'Oriol Mañé Duatis, fotògraf de moda i retrat establert a Barcelona. Entenc la fotografia com un punt de trobada entre la direcció estètica i l'espontaneïtat, i sempre busco imatges que transmetin veritat i caràcter.",
      "Haver viscut i viatjat uns quants anys per l'Índia i Austràlia va definir la meva manera de mirar i de relacionar-me amb les persones. Vaig aprendre a adaptar-me a qualsevol entorn, a observar sense prejudicis i a valorar la bellesa del que és quotidià. Com a fotògraf —i també com a músic—, paro una atenció especial al ritme, al llenguatge corporal i als silencis, elements clau perquè un retrat tingui força pròpia.",
      "El meu objectiu en cada projecte és que la tècnica no eclipsi mai la persona. Treballo per crear un espai còmode davant l'objectiu, convençut que l'excel·lència d'una fotografia rau a aconseguir que la naturalitat parli per si sola.",
    ],
    instagramProfessional: "Instagram professional de BCN SHOT, @bcnshot",
    instagramPersonal: "Instagram personal de l'Oriol, @oriolmaneduatis",
  },
  portfolio: {
    title: "Portfolio",
    description: "Selecció de fotografia de moda, retrat i editorial de BCN SHOT.",
    intro: "Moda, retrat i editorial.",
    emptyTitle: "El portfolio s'està preparant",
    emptyText: "Molt aviat hi podràs veure una selecció de treballs. Mentrestant, pots escriure'm.",
    enlarge: "Amplia",
    lightbox: {
      title: "Visor de fotos",
      photo: "Foto",
      close: "Tanca el visor",
      previous: "Foto anterior",
      next: "Foto següent",
    },
  },
  contact: {
    title: "Contacte",
    description: "Explica'm què tens en ment per a la teva sessió de moda o retrat a Barcelona.",
    intro: "Explica'm què tens en ment: una sessió personal, un editorial o una col·laboració.",
    emailLabel: "Correu",
    instagramLabel: "Instagram",
    form: {
      fields: {
        name: "Nom",
        email: "Correu electrònic",
        type: "Tipus de consulta",
        message: "Missatge",
        consent: "Política de privacitat",
      },
      inquiryTypes: {
        session: "Sessió",
        tfp: "Col·laboració TFP",
        other: "Altres",
      },
      messageHint: "Entre {min} i {max} caràcters.",
      errorSummary: "Revisa els camps següents:",
      emailFallback: "Correu:",
      honeypot: "No omplis aquest camp",
      consent: "He llegit i accepto la [política de privacitat](/privacidad).",
      submit: "Envia el missatge",
      submitting: "Enviant…",
      status: {
        genericError:
          "No hem pogut enviar el teu missatge. Torna-ho a provar més tard o escriu-me directament per correu.",
        rateLimited: "Has enviat diversos missatges seguits. Espera uns minuts o escriu-me directament per correu.",
        success: "Gràcies, he rebut el teu missatge. Et respondré per correu.",
      },
      validation: {
        nameRequired: "Escriu el teu nom.",
        nameTooLong: "El nom no pot superar els {max} caràcters.",
        nameInvalid: "El nom conté caràcters no vàlids.",
        emailRequired: "Escriu el teu correu electrònic.",
        emailTooLong: "El correu no pot superar els {max} caràcters.",
        emailInvalid: "Escriu un correu vàlid, per exemple nom@domini.com.",
        typeRequired: "Tria un tipus de consulta.",
        messageRequired: "Escriu el teu missatge.",
        messageTooShort: "El missatge ha de tenir com a mínim {min} caràcters.",
        messageTooLong: "El missatge no pot superar els {max} caràcters.",
        messageInvalid: "El missatge conté caràcters no vàlids.",
        consentRequired: "Has d'acceptar la política de privacitat per enviar el formulari.",
      },
    },
  },
  finalCta: {
    heading: "Tens una idea en ment?",
    text: "Explica'm què t'agradaria fer i en parlem.",
  },
  notFound: {
    title: "Pàgina no trobada",
    text: "La pàgina que busques no existeix o s'ha mogut.",
    home: "Torna a l'inici",
    portfolio: "Mira el portfolio",
  },
  legalNotice,
  privacyPolicy,
};
