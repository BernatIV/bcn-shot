/**
 * Inline marker for a legal fact that still needs to be confirmed (identity data, hosting
 * provider...). Used inside otherwise-final legal copy so pending items stay visible and
 * nobody mistakes a placeholder for a real legal statement (TODO_PUBLICACION).
 */
export function PendingField({ children }: { children: string }) {
  return (
    <span
      data-todo="TODO_PUBLICACION"
      className="whitespace-nowrap border-b border-dashed border-muted/70 font-mono text-[0.85em] text-muted"
    >
      [TODO_PUBLICACION: {children}]
    </span>
  );
}
