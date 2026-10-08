import Link from "next/link";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { dictionaries } from "@/content/copy";
import { localizePath, type Locale } from "@/lib/i18n";

const linkClass = "inline-flex min-h-11 items-center text-muted underline-offset-[6px] hover:text-foreground hover:underline";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16">
        <div className="flex flex-col items-start gap-6">
          <Logo href={localizePath(locale, "/")} label={t.common.logoLabel} />
          <ButtonLink href={localizePath(locale, siteConfig.ctaPath)}>{t.nav.cta}</ButtonLink>
        </div>
        <div className="flex flex-col gap-x-8 text-[0.9375rem] sm:flex-row sm:flex-wrap md:justify-end">
          <a href={`mailto:${siteConfig.email}`} className={linkClass}>
            {siteConfig.email}
          </a>
          {siteConfig.instagramUrl ? (
            <a
              href={siteConfig.instagramUrl}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.common.instagramBcnShot} ${t.common.newTab}`}
            >
              Instagram
            </a>
          ) : null}
          <Link href={localizePath(locale, "/aviso-legal")} className={linkClass}>
            {t.common.legalNotice}
          </Link>
          <Link href={localizePath(locale, "/privacidad")} className={linkClass}>
            {t.common.privacy}
          </Link>
        </div>
      </Container>
      <Container className="pb-8 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
