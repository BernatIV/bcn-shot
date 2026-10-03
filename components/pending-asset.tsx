import { cn } from "@/lib/cn";

/**
 * Explicit marker for a pending asset (photo, portrait...). It isn't an image: it's a labeled
 * block so nobody mistakes it for Oriol's work. Replace before launch (TODO_PUBLICACION).
 */
export function PendingAsset({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Imagen pendiente: ${label}`}
      data-todo="TODO_PUBLICACION"
      className={cn(
        "flex items-center justify-center border border-dashed border-muted/60 bg-[repeating-linear-gradient(135deg,transparent_0_12px,rgb(0_0_0/0.035)_12px_24px)] p-6 text-center",
        className,
      )}
    >
      <p className="max-w-[26ch] text-sm text-muted">
        <span className="block font-mono text-xs tracking-wider uppercase">TODO_PUBLICACION</span>
        <span className="mt-2 block">{label}</span>
      </p>
    </div>
  );
}
