import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { dictionaries } from "@/content/copy";
import { localizePath, type Locale } from "@/lib/i18n";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <Container className="py-24 md:py-36">
      <h1 className="text-4xl font-semibold md:text-6xl">{t.notFound.title}</h1>
      <p className="mt-5 max-w-prose text-lg text-muted">{t.notFound.text}</p>
      <div className="mt-8 flex flex-wrap gap-6">
        <ButtonLink href={localizePath(locale, "/")}>{t.notFound.home}</ButtonLink>
        <ButtonLink href={localizePath(locale, "/portfolio")} variant="link">
          {t.notFound.portfolio}
        </ButtonLink>
      </div>
    </Container>
  );
}
