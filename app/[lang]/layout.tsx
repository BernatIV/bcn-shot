import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/content/site";
import { allowIndexing } from "@/lib/env";
import { locales, ogLocales } from "@/lib/i18n";
import { getCopy, getLocale } from "@/lib/locale";
import "../globals.css";

/** Every language is rendered statically at build time; any other first segment is a 404 (app/global-not-found.tsx). */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getCopy();
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.defaultTitle, template: `%s | ${siteConfig.name}` },
    description: t.meta.description,
    applicationName: siteConfig.name,
    // The canonical URL and hreflang alternates are set on each page (lib/metadata.ts) so they aren't inherited by routes like 404.
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      siteName: siteConfig.name,
      title: t.meta.defaultTitle,
      description: t.meta.description,
    },
    robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return <SiteShell locale={locale}>{children}</SiteShell>;
}