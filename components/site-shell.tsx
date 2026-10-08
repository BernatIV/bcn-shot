import { Analytics } from "@vercel/analytics/next";
import { Inter, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dictionaries } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

/**
 * The <html> document shared by the [lang] root layout and app/global-not-found.tsx.
 * It receives the locale explicitly because next/root-params isn't available in global-not-found.
 */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = dictionaries[locale];

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 bg-foreground px-4 py-3 text-accent-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.common.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
