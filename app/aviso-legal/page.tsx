import { PendingField } from "@/components/legal-pending-field";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de BCN SHOT.",
  path: "/aviso-legal",
});

export default function LegalNoticePage() {
  return (
    <Container className="pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-prose">
        <h1 className="text-4xl font-semibold md:text-5xl">Aviso legal</h1>

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
            <h2 className="text-foreground text-xl font-semibold">1. Datos identificativos</h2>
            <p className="mt-3">
              En cumplimiento del deber de información de la Ley 34/2002, de 11 de julio, de
              Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
              informa de que este sitio web (en adelante, el &quot;Sitio&quot;), accesible en{" "}
              <span className="text-foreground">{siteConfig.url}</span>, es titularidad de:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Titular: <PendingField>nombre y apellidos completos de Oriol</PendingField>
              </li>
              <li>
                NIF/DNI: <PendingField>NIF del titular</PendingField>
              </li>
              <li>
                Domicilio: <PendingField>domicilio fiscal o profesional</PendingField>
              </li>
              <li>
                Correo electrónico de contacto:{" "}
                <span className="text-foreground">{siteConfig.email}</span>
              </li>
              <li>Actividad: fotografía de moda, retrato y editorial en Barcelona.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">2. Objeto</h2>
            <p className="mt-3">
              El Sitio tiene como finalidad mostrar el portfolio fotográfico de BCN SHOT y
              facilitar el contacto de personas interesadas en solicitar una sesión fotográfica o
              proponer una colaboración.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">3. Condiciones de uso</h2>
            <p className="mt-3">
              El acceso y la navegación por el Sitio atribuyen la condición de persona usuaria e
              implican la aceptación de este aviso legal. La persona usuaria se compromete a
              hacer un uso adecuado y lícito del Sitio, de acuerdo con la legislación vigente, la
              buena fe y el orden público, y a no utilizarlo con fines fraudulentos o lesivos para
              terceros.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">4. Propiedad intelectual e industrial</h2>
            <p className="mt-3">
              Todas las fotografías, textos, logotipos, marcas y demás contenidos del Sitio son
              propiedad del titular indicado en el apartado 1, o se publican con la autorización
              expresa de las personas fotografiadas, y están protegidos por la normativa de
              propiedad intelectual e industrial aplicable.
            </p>
            <p className="mt-3">
              Queda prohibida su reproducción, distribución, comunicación pública o transformación
              total o parcial sin la autorización previa y por escrito del titular, salvo en los
              casos permitidos por la ley.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">5. Responsabilidad</h2>
            <p className="mt-3">
              El titular no garantiza la disponibilidad continua del Sitio y no se hace
              responsable de interrupciones del servicio motivadas por causas ajenas a su control,
              incluidas las de carácter técnico.
            </p>
            <p className="mt-3">
              El Sitio puede incluir enlaces a redes sociales externas (por ejemplo, Instagram)
              cuyo contenido, funcionamiento y políticas de privacidad no dependen del titular y
              se rigen por las condiciones propias de cada plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">6. Alojamiento</h2>
            <p className="mt-3">
              Proveedor de alojamiento del Sitio:{" "}
              <PendingField>proveedor de hosting definitivo</PendingField>.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">7. Legislación aplicable</h2>
            <p className="mt-3">
              Este aviso legal se rige por la legislación española. Para la resolución de
              cualquier controversia derivada del acceso o uso del Sitio, y sin perjuicio de los
              derechos que correspondan a las personas consumidoras conforme a la normativa
              aplicable, las partes se someten a los juzgados y tribunales que correspondan según
              el domicilio del titular indicado en el apartado 1.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
