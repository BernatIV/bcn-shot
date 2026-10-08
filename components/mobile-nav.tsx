"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { NavLinks, type NavLinkItem } from "@/components/nav-links";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";

/** Mobile menu: accessible dialog (trapped focus, Escape, focus returned to the button, scroll locked). */
export function MobileNav({
  locale,
  items,
  cta,
  logo,
  labels,
}: {
  locale: Locale;
  items: NavLinkItem[];
  cta: NavLinkItem;
  logo: { href: string; label: string };
  labels: { open: string; close: string; title: string; nav: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes, however it changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close it if the viewport switches to desktop while the menu is open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="-mr-2 inline-flex size-11 items-center justify-center md:hidden"
        aria-label={labels.open}
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-background motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out]"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{labels.title}</Dialog.Title>
          <Container className="flex h-16 items-center justify-between">
            <Logo {...logo} onNavigate={close} />
            <Dialog.Close className="-mr-2 inline-flex size-11 items-center justify-center" aria-label={labels.close}>
              <CloseIcon />
            </Dialog.Close>
          </Container>
          <Container className="flex flex-1 flex-col justify-between pt-10 pb-10">
            <nav aria-label={labels.nav}>
              <NavLinks
                items={items}
                className="flex flex-col gap-2"
                linkClassName="font-display text-3xl font-semibold tracking-tight"
                onNavigate={close}
              />
            </nav>
            <div className="flex flex-col gap-6">
              <LanguageSwitcher current={locale} label={labels.language} onNavigate={close} className="-ml-3" />
              <ButtonLink href={cta.href} onClick={close} className="w-full">
                {cta.label}
              </ButtonLink>
            </div>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
