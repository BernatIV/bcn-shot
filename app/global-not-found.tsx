import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { NotFoundContent } from "@/components/not-found-content";
import { SiteShell } from "@/components/site-shell";
import { dictionaries } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { hasLocale, LOCALE_COOKIE, LOCALE_HEADER, preferredLocale } from "@/lib/i18n";
import "./globals.css";

/**
 * 404 page for the whole app. The root layout lives in a dynamic segment (app/[lang]), so unknown URLs
 * are answered at the routing level with this page (dynamicParams = false in app/[lang]/layout.tsx).
 * Language: the one in the URL (header set by proxy.ts), else the visitor's preferred one.
 */
async function resolveLocale() {
  const requestHeaders = await headers();
  const fromUrl = requestHeaders.get(LOCALE_HEADER);
  if (hasLocale(fromUrl)) return fromUrl;
  const cookieStore = await cookies();
  return preferredLocale(cookieStore.get(LOCALE_COOKIE)?.value, requestHeaders.get("accept-language"));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = dictionaries[await resolveLocale()];
  return {
    metadataBase: new URL(siteConfig.url),
    title: `${t.notFound.title} | ${siteConfig.name}`,
  };
}

export default async function GlobalNotFound() {
  const locale = await resolveLocale();
  return (
    <SiteShell locale={locale}>
      <NotFoundContent locale={locale} />
    </SiteShell>
  );
}
