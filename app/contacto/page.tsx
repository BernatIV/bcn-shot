import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/ui/container";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: copy.contact.title,
  description: copy.contact.description,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <Container className="grid gap-12 pt-10 md:grid-cols-12 md:pt-16">
      <div className="md:col-span-5">
        <h1 className="text-4xl font-semibold md:text-6xl">{copy.contact.title}</h1>
        <p className="mt-6 max-w-[42ch] text-lg">{copy.contact.intro}</p>
        <dl className="mt-10 space-y-5 text-[0.9375rem]">
          <div>
            <dt className="text-muted">{copy.contact.emailLabel}</dt>
            <dd>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">
                {siteConfig.email}
              </a>
            </dd>
          </div>
          {siteConfig.instagramUrl ? (
            <div>
              <dt className="text-muted">{copy.contact.instagramLabel}</dt>
              <dd>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline underline-offset-4"
                  aria-label="Instagram de BCN SHOT (se abre en una pestaña nueva)"
                >
                  Instagram
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <ContactForm />
      </div>
    </Container>
  );
}
