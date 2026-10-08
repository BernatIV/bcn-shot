import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, LOCALE_COOKIE, LOCALE_HEADER, localizePath, preferredLocale } from "@/lib/i18n";

/**
 * Language routing: every page lives under /es, /ca or /en.
 * URLs without a locale prefix are redirected to the visitor's language:
 * 1. the language they picked explicitly (cookie), 2. the browser's Accept-Language, 3. Spanish.
 * URLs that already have a prefix are never redirected (shared links and crawlers see what they asked for).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = pathname.split("/")[1];
  if (hasLocale(prefix)) {
    // Lets the global 404 page render in the language of the URL.
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, prefix);
    return NextResponse.next({ request: { headers } });
  }

  const locale = preferredLocale(request.cookies.get(LOCALE_COOKIE)?.value, request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = localizePath(locale, pathname);
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next internals, public images and any path with a file extension (icons, robots.txt, sitemap.xml...).
  matcher: ["/((?!_next/|images/|.*\\.[^/]*$).*)"],
};
