import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 md:py-36">
      <h1 className="text-4xl font-semibold md:text-6xl">Página no encontrada</h1>
      <p className="mt-5 max-w-prose text-lg text-muted">La página que buscas no existe o se ha movido.</p>
      <div className="mt-8 flex flex-wrap gap-6">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/portfolio" variant="link">
          Ver portfolio
        </ButtonLink>
      </div>
    </Container>
  );
}
