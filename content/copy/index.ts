import type { Locale } from "@/lib/i18n";
import { ca } from "./ca";
import { en } from "./en";
import { es } from "./es";
import type { Copy } from "./types";

export type { Copy, LegalPage } from "./types";

/** Every visible string, per language. Server Components read it via `getCopy()` (lib/locale.ts). */
export const dictionaries: Record<Locale, Copy> = { es, ca, en };
