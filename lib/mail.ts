/**
 * Sends transactional mail. Provider: Resend (decided).
 * Configured via environment variables (see .env.example). Without configuration, `sendMail`
 * returns `not_configured` and the form shows the error with the mailto: fallback (never fakes a send).
 *
 * To add a provider: implement a `MailTransport` and register it in `getTransport`.
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
        // HTTP status only: never the message content.
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
