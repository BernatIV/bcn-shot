import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20 lg:h-24">
        <Logo />
        <nav aria-label="Principal" className="hidden md:block">
          <NavLinks className="flex items-center gap-8 text-[0.9375rem]" />
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={siteConfig.cta.href} className="hidden px-5 py-2.5 md:inline-flex">
            {siteConfig.cta.label}
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
