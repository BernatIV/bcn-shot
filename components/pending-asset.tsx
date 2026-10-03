import { cn } from "@/lib/cn";

/**
 * Marcador explícit d'un actiu pendent (foto, retrat...). No és una imatge: és un bloc etiquetat
 * perquè ningú el confongui amb obra d'Oriol. Substituir abans de publicar (TODO_PUBLICACION).
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
