import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { allowIndexing } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
