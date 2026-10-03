/** Validation shared between client and server for the contact form. */

export const INQUIRY_TYPES = ["Sesión", "Colaboración TFP", "Otra"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const LIMITS = {
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
} as const;

export type ContactField = "name" | "email" | "type" | "message" | "consent";

export type ContactValues = {
  name: string;
  email: string;
  type: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<ContactField, string>>;

export const FIELD_LABELS: Record<ContactField, string> = {
  name: "Nombre",
  email: "Correo electrónico",
  type: "Tipo de consulta",
  message: "Mensaje",
  consent: "Política de privacidad",
};

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  type: INQUIRY_TYPES[0],
  message: "",
  consent: false,
};

// Simple and permissive: the real check is whether the reply actually arrives.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

export function valuesFromFormData(formData: FormData): ContactValues {
  const str = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    name: str("name"),
    email: str("email"),
    type: str("type"),
    message: str("message"),
    consent: formData.get("consent") === "on",
  };
}

/** Length in characters (not UTF-16 units), consistent with what the user sees. */
function charLength(s: string) {
  return Array.from(s).length;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Escribe tu nombre.";
  else if (charLength(name) > LIMITS.nameMax) errors.name = `El nombre no puede superar los ${LIMITS.nameMax} caracteres.`;
  else if (/[\r\n]/.test(name) || CONTROL_CHARS_RE.test(name)) errors.name = "El nombre contiene caracteres no válidos.";

  if (!email) errors.email = "Escribe tu correo electrónico.";
  else if (email.length > LIMITS.emailMax) errors.email = `El correo no puede superar los ${LIMITS.emailMax} caracteres.`;
  else if (!EMAIL_RE.test(email)) errors.email = "Escribe un correo válido, por ejemplo nombre@dominio.com.";

  if (!(INQUIRY_TYPES as readonly string[]).includes(values.type)) errors.type = "Elige un tipo de consulta.";

  if (!message) errors.message = "Escribe tu mensaje.";
  else if (charLength(message) < LIMITS.messageMin)
    errors.message = `El mensaje debe tener al menos ${LIMITS.messageMin} caracteres.`;
  else if (charLength(message) > LIMITS.messageMax)
    errors.message = `El mensaje no puede superar los ${LIMITS.messageMax} caracteres.`;
  else if (CONTROL_CHARS_RE.test(message)) errors.message = "El mensaje contiene caracteres no válidos.";

  if (!values.consent) errors.consent = "Debes aceptar la política de privacidad para enviar el formulario.";

  return errors;
}
