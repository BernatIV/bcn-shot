import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks, type NavLinkItem } from "@/components/nav-links";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { dictionaries } from "@/content/copy";
import { localizePath, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const items: NavLinkItem[] = siteConfig.nav.map((item) => ({
    href: localizePath(locale, item.path),
    label: t.nav[item.key],
  }));
  const cta = { href: localizePath(locale, siteConfig.ctaPath), label: t.nav.cta };
  const logo = { href: localizePath(locale, "/"), label: t.common.logoLabel };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20 lg:h-24">
        <Logo {...logo} />
        <nav aria-label={t.common.mainNav} className="hidden md:block">
          <NavLinks items={items} className="flex items-center gap-8 text-[0.9375rem]" />
        </nav>
        <div className="flex items-center gap-2 md:gap-6">
          <LanguageSwitcher current={locale} label={t.common.languageNav} className="hidden md:block" />
          <ButtonLink href={cta.href} className="hidden px-5 py-2.5 md:inline-flex">
            {cta.label}
          </ButtonLink>
          <MobileNav
            locale={locale}
            items={items}
            cta={cta}
            logo={logo}
            labels={{
              open: t.common.openMenu,
              close: t.common.closeMenu,
              title: t.common.menuTitle,
              nav: t.common.mainNav,
              language: t.common.languageNav,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
