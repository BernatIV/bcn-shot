/** Només s'indexa quan ALLOW_INDEXING=true (producció real). Entorns de prova: noindex. */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
