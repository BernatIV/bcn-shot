import { Container } from "@/components/ui/container";

/**
 * Legal page pending review. This is NOT legal text: it only lists the data that still needs providing.
 * TODO_PUBLICACION: replace with copy reviewed by Oriol (blocks public launch).
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
