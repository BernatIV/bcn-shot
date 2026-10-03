import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Metadades completes per pàgina (openGraph es fusiona superficialment, per això es repeteix sencer). */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: title ? `${title} | ${siteConfig.name}` : undefined,
      description,
    },
  };
}
