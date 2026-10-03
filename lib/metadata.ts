import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/** Full metadata per page (openGraph merges shallowly, so it needs to be repeated in full each time). */
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
