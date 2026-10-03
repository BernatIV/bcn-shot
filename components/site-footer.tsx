import Link from "next/link";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

const linkClass = "inline-flex min-h-11 items-center text-muted underline-offset-[6px] hover:text-foreground hover:underline";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16">
        <div className="flex flex-col items-start gap-6">
          <Logo />
          <ButtonLink href={siteConfig.cta.href}>{siteConfig.cta.label}</ButtonLink>
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
              aria-label="Instagram de BCN SHOT (se abre en una pestaña nueva)"
            >
              Instagram
            </a>
          ) : null}
          <Link href="/aviso-legal" className={linkClass}>
            Aviso legal
          </Link>
          <Link href="/privacidad" className={linkClass}>
            Privacidad
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
