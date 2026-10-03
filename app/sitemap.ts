import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

const routes = ["/", "/portfolio", "/sobre-mi", "/contacto", "/aviso-legal", "/privacidad"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route === "/" ? siteConfig.url : `${siteConfig.url}${route}`,
  }));
}
