"use server";

import { headers } from "next/headers";
import { dictionaries } from "@/content/copy";
import {
  emptyContactValues,
  validateContact,
  valuesFromFormData,
  type ContactErrors,
  type ContactValues,
  type InquiryType,
} from "@/lib/contact-validation";
import { defaultLocale, hasLocale, localeNames } from "@/lib/i18n";
import { sendMail } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

export type ContactState = {
  status: "idle" | "invalid" | "error" | "success";
  values: ContactValues;
  errors: ContactErrors;
  message?: string;
  /** Changes on every response so the client can react to it (focus, etc.). */
  submittedAt?: number;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = valuesFromFormData(formData);
  const submittedAt = Date.now();

  // Server Actions can't read the [lang] root param: the form sends it as a hidden field.
  const lang = formData.get("lang");
  const locale = typeof lang === "string" && hasLocale(lang) ? lang : defaultLocale;
  const t = dictionaries[locale].contact.form;

  // Honeypot field: real users never see it or fill it in.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "error", values, errors: {}, message: t.status.genericError, submittedAt };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 }).ok) {
    return { status: "error", values, errors: {}, message: t.status.rateLimited, submittedAt };
  }

  const errors = validateContact(values, t.validation);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", values, errors, submittedAt };
  }

  // The email is for Oriol, so it is always written in Spanish.
  const type = dictionaries.es.contact.form.inquiryTypes[values.type as InquiryType];
  const name = values.name.trim();
  const email = values.email.trim();
  const result = await sendMail({
    replyTo: email,
    subject: `Nueva consulta web (${type}) — ${name}`,
    text: [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Tipo de consulta: ${type}`,
      `Idioma de la web: ${localeNames[locale]}`,
      "",
      values.message.trim(),
      "",
      "—",
      "Enviado desde el formulario de contacto de bcnshot.com",
    ].join("\n"),
  });

  if (!result.ok) {
    return { status: "error", values, errors: {}, message: t.status.genericError, submittedAt };
  }

  return {
    status: "success",
    values: emptyContactValues,
    errors: {},
    message: t.status.success,
    submittedAt,
  };
}
