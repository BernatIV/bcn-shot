/** Only indexed when ALLOW_INDEXING=true (real production). Staging environments: noindex. */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
