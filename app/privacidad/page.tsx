import { PendingField } from "@/components/legal-pending-field";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacidad",
  description: "Información sobre privacidad y datos del formulario de contacto de BCN SHOT.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <Container className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-prose">
        <h1 className="text-4xl font-semibold md:text-5xl">Política de privacidad</h1>

        <div
          data-todo="TODO_PUBLICACION"
          className="mt-8 border border-dashed border-muted/60 p-4 text-sm text-muted"
        >
          Este texto está pendiente de revisión final por Oriol. Los datos marcados como{" "}
          <span className="font-mono text-xs uppercase">TODO_PUBLICACION</span> aún no están
          confirmados.
        </div>

        <div className="mt-8 space-y-8 text-muted">
          <section>
            <h2 className="text-foreground text-xl font-semibold">1. Responsable del tratamiento</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Responsable: <PendingField>nombre y apellidos completos de Oriol</PendingField>
              </li>
              <li>
                NIF/DNI: <PendingField>NIF del responsable</PendingField>
              </li>
              <li>
                Domicilio: <PendingField>domicilio fiscal o profesional</PendingField>
              </li>
              <li>
                Correo electrónico de contacto:{" "}
                <span className="text-foreground">{siteConfig.email}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">
              2. Qué datos recogemos y con qué finalidad
            </h2>
            <p className="mt-3">
              A través del formulario de la página <span className="text-foreground">/contacto</span>{" "}
              recogemos los siguientes datos: nombre, correo electrónico, tipo de consulta
              (sesión, colaboración TFP u otra) y el mensaje que escribes.
            </p>
            <p className="mt-3">
              La finalidad es responder a tu consulta y, en su caso, gestionar la organización de
              una sesión fotográfica o una colaboración. No usamos estos datos para ninguna otra
              finalidad ni para enviar comunicaciones comerciales no solicitadas.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">3. Legitimación</h2>
            <p className="mt-3">
              La base legal para el tratamiento es tu consentimiento expreso, otorgado al marcar
              la casilla de aceptación de esta política antes de enviar el formulario de contacto.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">4. Conservación de los datos</h2>
            <p className="mt-3">
              Tus datos se conservan durante el tiempo necesario para atender tu consulta y,
              posteriormente, durante los plazos legalmente exigibles para atender eventuales
              responsabilidades.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">5. Destinatarios</h2>
            <p className="mt-3">
              El contenido del formulario se envía por correo electrónico al responsable a través
              de un proveedor de envío de correo transaccional:{" "}
              <PendingField>proveedor de correo definitivo</PendingField>. El Sitio también está
              alojado por un proveedor de hosting:{" "}
              <PendingField>proveedor de hosting definitivo</PendingField>.
            </p>
            <p className="mt-3">
              No se ceden datos a terceros, salvo obligación legal.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">
              6. Derechos de las personas usuarias
            </h2>
            <p className="mt-3">
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
              limitación del tratamiento y portabilidad escribiendo a{" "}
              <span className="text-foreground">{siteConfig.email}</span> e indicando el derecho
              que deseas ejercer.
            </p>
            <p className="mt-3">
              Si consideras que tu solicitud no ha sido atendida correctamente, puedes presentar
              una reclamación ante la Agencia Española de Protección de Datos (
              <span className="text-foreground">www.aepd.es</span>).
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">7. Seguridad</h2>
            <p className="mt-3">
              Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. El
              contenido de los mensajes enviados a través del formulario no se registra en los
              logs del servidor.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">8. Cookies</h2>
            <p className="mt-3">
              Este sitio no utiliza cookies de seguimiento ni de publicidad. Únicamente podrían
              usarse cookies técnicas estrictamente necesarias para el funcionamiento de la web, si
              las hubiera.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">9. Cambios en esta política</h2>
            <p className="mt-3">
              Esta política puede actualizarse para adaptarse a cambios normativos o del propio
              Sitio. Cualquier cambio se publicará en esta misma página.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
