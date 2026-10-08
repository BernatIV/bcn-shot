"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localeNames,
  locales,
  localizePath,
  stripLocale,
  type Locale,
} from "@/lib/i18n";

/** Saves the explicit choice so the proxy uses it next time an unprefixed URL is visited. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/** Links to the current page in every language (same route, different prefix). */
export function LanguageSwitcher({
  current,
  label,
  className,
  onNavigate,
}: {
  current: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const path = stripLocale(usePathname());

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-1 text-sm">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={localizePath(locale, path)}
                hrefLang={locale}
                lang={locale}
                prefetch={false}
                aria-current={active ? "true" : undefined}
                aria-label={localeNames[locale]}
                onClick={() => {
                  rememberLocale(locale);
                  onNavigate?.();
                }}
                className={cn(
                  "inline-flex min-h-11 min-w-11 items-center justify-center font-medium tracking-wide uppercase underline-offset-[6px] transition-colors hover:text-foreground hover:underline",
                  active ? "text-foreground underline decoration-1" : "text-muted",
                )}
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
