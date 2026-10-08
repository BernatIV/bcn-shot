import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { localizePath } from "@/lib/i18n";
import { getCopy } from "@/lib/locale";

export async function CtaSection({ headingLevel: Heading = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const { locale, t } = await getCopy();

  return (
    <section aria-labelledby="cta-final" className="mt-24 md:mt-36">
      <Container>
        <div className="flex flex-col gap-8 border-t border-foreground pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
          <div className="max-w-prose">
            <Heading id="cta-final" className="text-3xl font-semibold md:text-5xl">
              {t.finalCta.heading}
            </Heading>
            <p className="mt-4 text-lg text-muted">{t.finalCta.text}</p>
          </div>
          <ButtonLink href={localizePath(locale, siteConfig.ctaPath)} className="shrink-0">
            {t.nav.cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
