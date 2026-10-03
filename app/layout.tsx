import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { allowIndexing } from "@/lib/env";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: copy.meta.defaultTitle, template: `%s | ${siteConfig.name}` },
  description: copy.meta.description,
  applicationName: siteConfig.name,
  // The canonical URL is set on each page (lib/metadata.ts) so it isn't inherited by routes like 404.
  // TODO_PUBLICACION: add `images` to openGraph once there's an approved asset (or app/opengraph-image.jpg).
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: copy.meta.defaultTitle,
    description: copy.meta.description,
  },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 bg-foreground px-4 py-3 text-accent-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
