"use server";

import { headers } from "next/headers";
import {
  emptyContactValues,
  validateContact,
  valuesFromFormData,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-validation";
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

const GENERIC_ERROR =
  "No hemos podido enviar tu mensaje. Inténtalo de nuevo más tarde o escríbeme directamente por correo.";

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = valuesFromFormData(formData);
  const submittedAt = Date.now();

  // Honeypot field: real users never see it or fill it in.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "error", values, errors: {}, message: GENERIC_ERROR, submittedAt };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 }).ok) {
    return {
      status: "error",
      values,
      errors: {},
      message: "Has enviado varios mensajes seguidos. Espera unos minutos o escríbeme directamente por correo.",
      submittedAt,
    };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", values, errors, submittedAt };
  }

  const name = values.name.trim();
  const email = values.email.trim();
  const result = await sendMail({
    replyTo: email,
    subject: `Nueva consulta web (${values.type}) — ${name}`,
    text: [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Tipo de consulta: ${values.type}`,
      "",
      values.message.trim(),
      "",
      "—",
      "Enviado desde el formulario de contacto de bcnshot.com",
    ].join("\n"),
  });

  if (!result.ok) {
    return { status: "error", values, errors: {}, message: GENERIC_ERROR, submittedAt };
  }

  return {
    status: "success",
    values: emptyContactValues,
    errors: {},
    message: "Gracias, he recibido tu mensaje. Te responderé por correo.",
    submittedAt,
  };
}
