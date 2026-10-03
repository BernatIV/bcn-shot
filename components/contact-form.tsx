"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { sendContact, type ContactState } from "@/app/contacto/actions";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  FIELD_LABELS,
  INQUIRY_TYPES,
  LIMITS,
  emptyContactValues,
  validateContact,
  valuesFromFormData,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-validation";

const initialState: ContactState = { status: "idle", values: emptyContactValues, errors: {} };

const inputClass =
  "block w-full rounded-button border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted/70 focus-visible:border-foreground aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  // Errors de validació al client (abans d'enviar). Els del servidor arriben a `state.errors`.
  const [clientErrors, setClientErrors] = useState<{ errors: ContactErrors; at: number } | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const serverIsNewer = !clientErrors || (state.submittedAt ?? 0) > clientErrors.at;
  const errors = serverIsNewer ? state.errors : clientErrors.errors;
  const errorFields = Object.keys(errors) as ContactField[];

  useEffect(() => {
    if (!state.submittedAt) return;
    if (state.status === "invalid") summaryRef.current?.focus();
    else if (state.status === "success" || state.status === "error") statusRef.current?.focus();
  }, [state]);

  useEffect(() => {
    if (clientErrors) summaryRef.current?.focus();
  }, [clientErrors]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const found = validateContact(valuesFromFormData(new FormData(e.currentTarget)));
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setClientErrors({ errors: found, at: Date.now() });
    } else {
      setClientErrors(null);
    }
  };

  const fieldProps = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const fieldError = (name: ContactField) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="mt-2 text-sm text-danger">
        {errors[name]}
      </p>
    ) : null;

  // `key` força a reinicialitzar els camps no controlats amb els valors retornats pel servidor.
  const v = state.values;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="space-y-7" key={state.submittedAt ?? 0}>
      {errorFields.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border border-danger/40 bg-surface p-5 text-sm outline-none focus-visible:outline-danger"
        >
          <p className="font-semibold text-danger">Revisa los siguientes campos:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorFields.map((f) => (
              <li key={f}>
                <a href={`#contact-${f}`} className="underline underline-offset-4">
                  {FIELD_LABELS[f]}
                </a>
                : {errors[f]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.status === "success" || state.status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={state.status === "error" ? "alert" : "status"}
          className={cn(
            "border bg-surface p-5 text-sm outline-none",
            state.status === "success" ? "border-success/40 text-success" : "border-danger/40 text-danger",
          )}
        >
          <p>{state.message}</p>
          {state.status === "error" ? (
            <p className="mt-2 text-foreground">
              Correo:{" "}
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                {siteConfig.email}
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label htmlFor="contact-name" className="mb-2 block font-medium">
          {FIELD_LABELS.name}
        </label>
        <input
          {...fieldProps("name")}
          type="text"
          autoComplete="name"
          required
          maxLength={LIMITS.nameMax}
          defaultValue={v.name}
          className={inputClass}
        />
        {fieldError("name")}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block font-medium">
          {FIELD_LABELS.email}
        </label>
        <input
          {...fieldProps("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={LIMITS.emailMax}
          defaultValue={v.email}
          className={inputClass}
        />
        {fieldError("email")}
      </div>

      <div>
        <label htmlFor="contact-type" className="mb-2 block font-medium">
          {FIELD_LABELS.type}
        </label>
        <select {...fieldProps("type")} defaultValue={v.type} className={cn(inputClass, "appearance-auto")}>
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {fieldError("type")}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block font-medium">
          {FIELD_LABELS.message}
        </label>
        <p id="contact-message-hint" className="mb-2 text-sm text-muted">
          Entre {LIMITS.messageMin} y {LIMITS.messageMax.toLocaleString("es-ES")} caracteres.
        </p>
        <textarea
          {...fieldProps("message")}
          aria-describedby={cn("contact-message-hint", errors.message && "contact-message-error")}
          required
          rows={7}
          maxLength={LIMITS.messageMax}
          defaultValue={v.message}
          className={cn(inputClass, "resize-y")}
        />
        {fieldError("message")}
      </div>

      {/* Camp trampa anti-spam: invisible per a persones i tecnologies d'assistència. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">No rellenes este campo</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            required
            defaultChecked={v.consent}
            className="mt-1 size-5 shrink-0 accent-foreground"
          />
          <label htmlFor="contact-consent" className="text-[0.9375rem]">
            He leído y acepto la{" "}
            <Link href="/privacidad" className="underline underline-offset-4">
              política de privacidad
            </Link>
            .
          </label>
        </div>
        {fieldError("consent")}
      </div>

      <button type="submit" disabled={pending} aria-disabled={pending} className={buttonClasses("primary", "w-full sm:w-auto")}>
        {pending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
