import type { Copy, LegalPage } from "./types";

/** Visible website copy — English. Editable proposals pending Oriol's review. */

const legalNotice: LegalPage = {
  title: "Legal notice",
  description: "Legal notice for BCN SHOT.",
  sections: [
    {
      heading: "1. Website owner",
      blocks: [
        "In compliance with Spanish Law 34/2002 on information society services and electronic commerce (LSSI), the details of the owner of this website are as follows:",
        [
          "Owner: **{owner}**",
          "Tax ID (NIF): **{nif}**",
          "Location: **Barcelona (Spain)**",
          "Email: **{email}**",
          "Activity: fashion, portrait and editorial photography",
          "Website: **{url}**",
        ],
      ],
    },
    {
      heading: "2. Purpose of the website",
      blocks: [
        "BCN SHOT showcases the owner's photographic work and makes it easy for anyone interested to request a session or propose a collaboration.",
      ],
    },
    {
      heading: "3. Use of the website",
      blocks: [
        "Users agree to use the website lawfully and not to carry out any action that may harm its operation or the rights of third parties.",
      ],
    },
    {
      heading: "4. Intellectual property and image rights",
      blocks: [
        "The texts, photographs, logos and other content on this website are protected by applicable law. Reproducing, distributing or publicly using them requires the authorisation of the rights holder, except where permitted by law.",
        "Photographs of people are published in accordance with the authorisations applicable in each case.",
      ],
    },
    {
      heading: "5. External links",
      blocks: [
        "This website may include links to external platforms such as Instagram. The owner does not control their content or their privacy policies.",
      ],
    },
    {
      heading: "6. Data protection",
      blocks: ["Information about how personal data is processed can be found in the [Privacy policy](/privacidad)."],
    },
  ],
};

const privacyPolicy: LegalPage = {
  title: "Privacy policy",
  metaTitle: "Privacy",
  description: "Information about privacy and the data collected through the BCN SHOT contact form.",
  intro:
    "At BCN SHOT we process the personal data you provide in order to answer your enquiries and to manage the photo sessions or collaborations you propose.",
  sections: [
    {
      heading: "1. Data controller",
      blocks: [
        [
          "Controller: **{owner}**",
          "Tax ID (NIF): **{nif}**",
          "Location: **Barcelona (Spain)**",
          "Email: **{email}**",
          "Website: **{url}**",
        ],
      ],
    },
    {
      heading: "2. What data we process and why",
      blocks: [
        "If you use the contact form, we process your name, email address, type of enquiry and the content of your message. If you email us directly, we process the data you include in your message.",
        "We use this data to reply to you and, where appropriate, to prepare a photo session, a quote or a collaboration. We do not use it to send you unsolicited advertising.",
      ],
    },
    {
      heading: "3. Legal basis",
      blocks: [
        "When you ask for information about a session or a quote, processing is necessary to handle your request and to take steps prior to entering into a possible contract. For other enquiries or collaboration proposals, we process the data you provide in order to reply to you.",
      ],
    },
    {
      heading: "4. How long we keep your data",
      blocks: [
        "We keep enquiries for as long as necessary to answer them and to manage any relationship that may arise. If a service is contracted, we will keep the data that must be retained for the periods required by applicable law. After that, we will delete it once it is no longer needed.",
      ],
    },
    {
      heading: "5. Service providers and international transfers",
      blocks: [
        "The website is hosted by Vercel. Messages sent through the form are processed by Resend so that they reach the controller by email.",
        "These providers may access the data needed to provide their services. Resend stores data, including the content of messages, in the United States. Vercel may also process data outside the European Economic Area. Such processing must be carried out with the safeguards required by data protection law. We do not sell your personal data to third parties.",
      ],
    },
    {
      heading: "6. Your rights",
      blocks: [
        "You can request access to your data, its rectification or erasure, and exercise the other rights recognised by data protection law, by writing to **{email}**.",
        "You can also lodge a complaint with the Spanish Data Protection Agency (AEPD) if you believe your data is not being processed appropriately.",
      ],
    },
    {
      heading: "7. Cookies",
      blocks: [
        "This website only uses one technical cookie, **NEXT_LOCALE**, which is stored when you choose a language with the language selector so that the website is shown in that language on your next visits. It lasts one year and is not used for any other purpose. As it is necessary to provide a feature you request, it does not require your consent.",
        "We use Vercel Analytics to know the approximate number of visits to the website. This tool does not use cookies and does not identify individual users; it generates aggregated, anonymous statistics about site usage.",
        "We do not use analytics or advertising cookies. This information will be updated if analytics, advertising or other technologies that require it are added.",
      ],
    },
  ],
};

export const en: Copy = {
  meta: {
    defaultTitle: "BCN SHOT — Fashion and portrait photography in Barcelona",
    description: "BCN SHOT is Oriol's fashion, portrait and editorial photography project, based in Barcelona.",
  },
  common: {
    skipToContent: "Skip to content",
    mainNav: "Main",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Menu",
    logoLabel: "BCN SHOT, go to home page",
    languageNav: "Language",
    newTab: "(opens in a new tab)",
    instagramBcnShot: "BCN SHOT on Instagram",
    legalNotice: "Legal notice",
    privacy: "Privacy",
  },
  nav: {
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
    cta: "Book your session",
  },
  pending: {
    prefix: "Pending image",
    hero: "Main cover photo (approved by Oriol)",
    featured: "Selection of 4 to 8 featured photos (featured in content/photos.ts)",
    portrait: "Real portrait of Oriol (approved by him)",
  },
  home: {
    title: "Fashion and portrait photography in Barcelona",
    subtitle: "Images with personality, created to show your style.",
    secondaryCta: "View portfolio",
    featuredHeading: "Selected work",
    featuredLink: "View the full portfolio",
    proposalHeading: "Fashion, portrait and editorial",
    proposalItems: [
      {
        title: "Portrait sessions",
        text: "Portraits with a carefully considered aesthetic, designed to show who you are.",
      },
      {
        title: "Fashion and editorial",
        text: "Images for your book or for an editorial project with a clear idea.",
      },
      {
        title: "Collaborations",
        text: "Open to proposing and developing creative collaborations.",
      },
    ],
    proposalLocation: "Outdoor sessions in Barcelona or at other locations we agree on.",
    aboutHeading: "About me",
    aboutLink: "Meet Oriol",
  },
  about: {
    title: "About me",
    description: "Oriol Mañé Duatis, fashion and portrait photographer in Barcelona.",
    paragraphs: [
      "I'm Oriol Mañé Duatis, a fashion and portrait photographer based in Barcelona. I see photography as a meeting point between aesthetic direction and spontaneity, always looking for images that convey truth and character.",
      "Spending several years living in and travelling around India and Australia shaped the way I see and connect with people. I learned to adapt to any environment, to observe without prejudice and to value the beauty of everyday life. As a photographer — and also as a musician — I pay close attention to rhythm, body language and silences, the key elements that give a portrait a strength of its own.",
      "My aim in every project is for technique never to overshadow the person. I work to create a comfortable space in front of the lens, convinced that an excellent photograph is one where naturalness speaks for itself.",
    ],
    instagramProfessional: "BCN SHOT's professional Instagram, @bcnshot",
    instagramPersonal: "Oriol's personal Instagram, @oriolmaneduatis",
  },
  portfolio: {
    title: "Portfolio",
    description: "A selection of fashion, portrait and editorial photography by BCN SHOT.",
    intro: "Fashion, portrait and editorial.",
    emptyTitle: "The portfolio is being prepared",
    emptyText: "A selection of work will be here very soon. In the meantime, feel free to write to me.",
    enlarge: "Enlarge",
    lightbox: {
      title: "Photo viewer",
      photo: "Photo",
      close: "Close viewer",
      previous: "Previous photo",
      next: "Next photo",
    },
  },
  contact: {
    title: "Contact",
    description: "Tell me what you have in mind for your fashion or portrait session in Barcelona.",
    intro: "Tell me what you have in mind: a personal session, an editorial or a collaboration.",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    form: {
      fields: {
        name: "Name",
        email: "Email",
        type: "Type of enquiry",
        message: "Message",
        consent: "Privacy policy",
      },
      inquiryTypes: {
        session: "Session",
        tfp: "TFP collaboration",
        other: "Other",
      },
      messageHint: "Between {min} and {max} characters.",
      errorSummary: "Please check the following fields:",
      emailFallback: "Email:",
      honeypot: "Leave this field empty",
      consent: "I have read and accept the [privacy policy](/privacidad).",
      submit: "Send message",
      submitting: "Sending…",
      status: {
        genericError: "Your message couldn't be sent. Please try again later or email me directly.",
        rateLimited: "You've sent several messages in a row. Please wait a few minutes or email me directly.",
        success: "Thank you, I've received your message. I'll reply by email.",
      },
      validation: {
        nameRequired: "Enter your name.",
        nameTooLong: "Your name can't be longer than {max} characters.",
        nameInvalid: "Your name contains characters that aren't allowed.",
        emailRequired: "Enter your email address.",
        emailTooLong: "Your email can't be longer than {max} characters.",
        emailInvalid: "Enter a valid email address, for example name@domain.com.",
        typeRequired: "Choose a type of enquiry.",
        messageRequired: "Enter your message.",
        messageTooShort: "Your message must be at least {min} characters long.",
        messageTooLong: "Your message can't be longer than {max} characters.",
        messageInvalid: "Your message contains characters that aren't allowed.",
        consentRequired: "You need to accept the privacy policy to send the form.",
      },
    },
  },
  finalCta: {
    heading: "Have an idea in mind?",
    text: "Tell me what you'd like to do and let's talk.",
  },
  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    home: "Back to home page",
    portfolio: "View portfolio",
  },
  legalNotice,
  privacyPolicy,
};
