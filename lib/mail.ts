/**
 * Enviament de correu transaccional. El proveïdor encara NO està decidit (Oriol i Marc).
 * Configuració per variables d'entorn (veure .env.example). Sense configuració, `sendMail`
 * retorna `not_configured` i el formulari mostra l'error amb l'alternativa mailto: (mai simula l'enviament).
 *
 * Per afegir un proveïdor: implementar un `MailTransport` i registrar-lo a `getTransport`.
 */

export type MailMessage = {
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "rejected" | "network" };

type MailTransport = (message: MailMessage) => Promise<SendResult>;

const resendTransport =
  (apiKey: string): MailTransport =>
  async (message) => {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: message.from,
          to: [message.to],
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) {
        // Només l'estat HTTP: mai el contingut del missatge.
        console.error(`[mail] provider rejected the message (status ${res.status})`);
        return { ok: false, reason: "rejected" };
      }
      return { ok: true };
    } catch {
      console.error("[mail] network error contacting provider");
      return { ok: false, reason: "network" };
    }
  };

function getTransport(): MailTransport | null {
  switch (process.env.MAIL_PROVIDER) {
    case "resend":
      return process.env.RESEND_API_KEY ? resendTransport(process.env.RESEND_API_KEY) : null;
    default:
      return null;
  }
}

export function getMailConfig() {
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "info@bcnshot.com";
  const transport = getTransport();
  if (!from || !transport) return null;
  return { from, to, transport };
}

export async function sendMail(message: Omit<MailMessage, "from" | "to">): Promise<SendResult> {
  const config = getMailConfig();
  if (!config) {
    console.error("[mail] mail provider is not configured (MAIL_PROVIDER / CONTACT_FROM_EMAIL)");
    return { ok: false, reason: "not_configured" };
  }
  return config.transport({ ...message, from: config.from, to: config.to });
}
