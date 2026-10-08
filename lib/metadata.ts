import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { localizePath, locales, ogLocales, type Locale } from "@/lib/i18n";

/** hreflang alternates for a path without locale prefix. x-default is the unprefixed URL, which redirects by language. */
export function languageAlternates(path: string, absolute = false) {
  const base = absolute ? siteConfig.url : "";
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = `${base}${localizePath(locale, path)}`;
  languages["x-default"] = `${base}${path}`;
  return languages;
}

/**
 * Full metadata per page (openGraph merges shallowly, so it needs to be repeated in full each time).
 * `path` is the route WITHOUT the locale prefix ("/portfolio").
 */
export function pageMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale;
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = localizePath(locale, path);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      siteName: siteConfig.name,
      url,
      title: title ? `${title} | ${siteConfig.name}` : undefined,
      description,
    },
  };
}
