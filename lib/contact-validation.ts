/**
 * Validation shared between client and server for the contact form.
 * Messages come from the dictionary of the visitor's language (content/copy → contact.form.validation).
 */
import type { Copy } from "@/content/copy";

/** Stable values sent by the form; the visible labels live in content/copy (contact.form.inquiryTypes). */
export const INQUIRY_TYPES = ["session", "tfp", "other"] as const;
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

export type ValidationMessages = Copy["contact"]["form"]["validation"];

/** Fills {placeholders} in a translated message. */
export function fillTemplate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

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

export function isInquiryType(value: string): value is InquiryType {
  return (INQUIRY_TYPES as readonly string[]).includes(value);
}

/** Length in characters (not UTF-16 units), consistent with what the user sees. */
function charLength(s: string) {
  return Array.from(s).length;
}

export function validateContact(values: ContactValues, m: ValidationMessages): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = m.nameRequired;
  else if (charLength(name) > LIMITS.nameMax) errors.name = fillTemplate(m.nameTooLong, { max: LIMITS.nameMax });
  else if (/[\r\n]/.test(name) || CONTROL_CHARS_RE.test(name)) errors.name = m.nameInvalid;

  if (!email) errors.email = m.emailRequired;
  else if (email.length > LIMITS.emailMax) errors.email = fillTemplate(m.emailTooLong, { max: LIMITS.emailMax });
  else if (!EMAIL_RE.test(email)) errors.email = m.emailInvalid;

  if (!isInquiryType(values.type)) errors.type = m.typeRequired;

  if (!message) errors.message = m.messageRequired;
  else if (charLength(message) < LIMITS.messageMin)
    errors.message = fillTemplate(m.messageTooShort, { min: LIMITS.messageMin });
  else if (charLength(message) > LIMITS.messageMax)
    errors.message = fillTemplate(m.messageTooLong, { max: LIMITS.messageMax });
  else if (CONTROL_CHARS_RE.test(message)) errors.message = m.messageInvalid;

  if (!values.consent) errors.consent = m.consentRequired;

  return errors;
}
