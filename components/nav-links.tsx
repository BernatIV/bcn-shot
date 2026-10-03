"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({
  className,
  linkClassName,
  onNavigate,
}: {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {siteConfig.nav.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center underline-offset-[6px] transition-colors hover:text-foreground hover:underline",
                active ? "text-foreground underline decoration-1" : "text-muted",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
