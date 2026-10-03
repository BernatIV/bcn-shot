"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { NavLinks } from "@/components/nav-links";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

/** Mobile menu: accessible dialog (trapped focus, Escape, focus returned to the button, scroll locked). */
export function MobileNav() {
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
        aria-label="Abrir menú"
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-background motion-safe:data-[state=open]:animate-[fade-in_200ms_ease-out]"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Menú</Dialog.Title>
          <Container className="flex h-16 items-center justify-between">
            <Logo onNavigate={close} />
            <Dialog.Close className="-mr-2 inline-flex size-11 items-center justify-center" aria-label="Cerrar menú">
              <CloseIcon />
            </Dialog.Close>
          </Container>
          <Container className="flex flex-1 flex-col justify-between pt-10 pb-10">
            <nav aria-label="Principal">
              <NavLinks
                className="flex flex-col gap-2"
                linkClassName="font-display text-3xl font-semibold tracking-tight"
                onNavigate={close}
              />
            </nav>
            <ButtonLink href={siteConfig.cta.href} onClick={close} className="w-full">
              {siteConfig.cta.label}
            </ButtonLink>
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
