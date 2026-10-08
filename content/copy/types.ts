import type { es } from "./es";

/** Shape of every dictionary: the Spanish one is the reference. */
export type Copy = typeof es;

/**
 * A legal page. Each block is a paragraph (string) or a bulleted list (string[]).
 * Inline markup (components/rich-text.tsx): **highlighted**, [link](/internal-path), {email}, {url}, {owner}, {nif}.
 */
export type LegalPage = {
  title: string;
  /** Shorter <title>, if different from the H1. */
  metaTitle?: string;
  description: string;
  intro?: string;
  sections: { heading: string; blocks: (string | string[])[] }[];
};
