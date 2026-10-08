/**
 * Locale configuration shared by the proxy, Server Components and Client Components.
 * No server-only imports here.
 */

export const locales = ["es", "ca", "en"] as const;
export type Locale = (typeof locales)[number];

/** Main language of the site: used for visitors without Accept-Language (e.g. crawlers). */
export const defaultLocale: Locale = "es";
/** Used when the browser only asks for languages we don't support (French, German...). */
export const foreignLocale: Locale = "en";

/** Technical preference cookie, only set when the visitor picks a language explicitly. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** A value translated into every supported language. */
export type Localized<T = string> = Record<Locale, T>;

/** Language names in their own language (for the language switcher). */
export const localeNames: Localized = { es: "Español", ca: "Català", en: "English" };
/** BCP 47 tags (number formatting). */
export const localeTags: Localized = { es: "es-ES", ca: "ca-ES", en: "en-GB" };
/** Open Graph locales. */
export const ogLocales: Localized = { es: "es_ES", ca: "ca_ES", en: "en_GB" };

export function hasLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Prefixes an internal path with the locale: ("ca", "/portfolio") → "/ca/portfolio", ("ca", "/") → "/ca". */
export function localizePath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Removes the locale prefix from a pathname: "/ca/portfolio" → "/portfolio", "/ca" → "/". */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  if (!hasLocale(first)) return pathname;
  return `/${rest.join("/")}`;
}

/** Languages of Spain without their own version: Spanish is more useful to them than English. */
const SPANISH_FALLBACK = new Set(["gl", "eu", "ast", "an"]);

/** Picks the best supported locale from an Accept-Language header. */
export function matchAcceptLanguage(header: string | null | undefined): Locale {
  if (!header?.trim()) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter((entry) => entry.tag && entry.tag !== "*" && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (hasLocale(primary)) return primary;
    if (SPANISH_FALLBACK.has(primary)) return "es";
  }
  return foreignLocale;
}

/** The visitor's preferred locale: the language they picked explicitly (cookie), else the browser's Accept-Language. */
export function preferredLocale(cookie: string | null | undefined, acceptLanguage: string | null | undefined): Locale {
  return hasLocale(cookie) ? cookie : matchAcceptLanguage(acceptLanguage);
}

/** Request header set by proxy.ts with the locale of the URL (read by app/global-not-found.tsx). */
export const LOCALE_HEADER = "x-bcn-locale";
