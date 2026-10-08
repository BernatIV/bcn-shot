import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content/copy";
import { hasLocale, type Locale } from "@/lib/i18n";

/** Locale of the current request (the [lang] root segment). Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Dictionary of the current request. Server Components only. */
export async function getCopy() {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}
