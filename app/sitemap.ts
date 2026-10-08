import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { localizePath, locales } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";

const routes = ["/", "/portfolio", "/sobre-mi", "/contacto", "/aviso-legal", "/privacidad"];

/** One entry per page and language, each one listing its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}${localizePath(locale, route)}`,
      alternates: { languages: languageAlternates(route, true) },
    })),
  );
}
