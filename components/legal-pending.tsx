import { Container } from "@/components/ui/container";

/**
 * Pàgina legal pendent de validació. NO és un text legal: només llista les dades que cal aportar.
 * TODO_PUBLICACION: substituir per text revisat per Oriol (bloqueja el llançament públic).
 */
export function LegalPending({ title, items }: { title: string; items: string[] }) {
  return (
    <Container className="pt-10 md:pt-16">
      <div className="max-w-prose">
        <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
        <div data-todo="TODO_PUBLICACION" className="mt-10 border border-dashed border-muted/60 p-6">
          <p className="font-mono text-xs tracking-wider text-muted uppercase">TODO_PUBLICACION</p>
          <p className="mt-3">
            Este texto está pendiente de redactar y validar con los datos reales. Información necesaria:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
