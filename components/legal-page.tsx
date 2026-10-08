import { RichText } from "@/components/rich-text";
import { Container } from "@/components/ui/container";
import type { LegalPage as LegalPageCopy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const vars = {
  email: siteConfig.email,
  url: siteConfig.url,
  owner: siteConfig.owner.name,
  nif: siteConfig.owner.nif,
};

/** Shared layout of /aviso-legal and /privacidad: the texts live in content/copy. */
export function LegalPage({ page, locale }: { page: LegalPageCopy; locale: Locale }) {
  return (
    <Container className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-prose">
        <h1 className="text-4xl font-semibold md:text-5xl">{page.title}</h1>

        {page.intro ? (
          <p className="mt-8 text-muted">
            <RichText text={page.intro} locale={locale} vars={vars} />
          </p>
        ) : null}

        <div className="mt-8 space-y-8 text-muted">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
              {section.blocks.map((block, i) =>
                typeof block === "string" ? (
                  <p key={i} className="mt-3">
                    <RichText text={block} locale={locale} vars={vars} />
                  </p>
                ) : (
                  <ul key={i} className="mt-4 list-disc space-y-2 pl-5">
                    {block.map((item) => (
                      <li key={item}>
                        <RichText text={item} locale={locale} vars={vars} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
