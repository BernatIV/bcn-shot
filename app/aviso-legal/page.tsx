import Link from "next/link";
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

        <div className="mt-8 space-y-8 text-muted">
          <section>
            <h2 className="text-foreground text-xl font-semibold">1. Titular del sitio web</h2>
            <p className="mt-3">
              En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y
              de comercio electrónico, se informa de los datos del titular de este sitio web:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Titular: <span className="text-foreground">Oriol Mañé Duatis</span>
              </li>
              <li>
                NIF: <span className="text-foreground">47909332X</span>
              </li>
              <li>
                Localidad: <span className="text-foreground">Barcelona (España)</span>
              </li>
              <li>
                Correo electrónico:{" "}
                <span className="text-foreground">{siteConfig.email}</span>
              </li>
              <li>Actividad: fotografía de moda, retrato y editorial</li>
              <li>
                Sitio web: <span className="text-foreground">{siteConfig.url}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">2. Finalidad del sitio web</h2>
            <p className="mt-3">
              BCN SHOT muestra el trabajo fotográfico del titular y facilita el contacto de
              personas interesadas en solicitar una sesión o proponer una colaboración.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">3. Uso del sitio web</h2>
            <p className="mt-3">
              La persona usuaria se compromete a utilizar el sitio web de forma lícita y a no
              realizar acciones que puedan perjudicar su funcionamiento o los derechos de
              terceros.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">
              4. Propiedad intelectual y derechos de imagen
            </h2>
            <p className="mt-3">
              Los textos, fotografías, logotipos y demás contenidos del sitio web están protegidos
              por la normativa aplicable. Su reproducción, distribución o uso público requiere la
              autorización de quien ostente los derechos, salvo en los casos permitidos por la
              ley.
            </p>
            <p className="mt-3">
              La publicación de fotografías de personas se realiza conforme a las autorizaciones
              que correspondan en cada caso.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">5. Enlaces externos</h2>
            <p className="mt-3">
              Este sitio web puede incluir enlaces a plataformas externas, como Instagram. El
              titular no controla sus contenidos ni sus políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">6. Protección de datos</h2>
            <p className="mt-3">
              La información sobre el tratamiento de datos personales se encuentra en la{" "}
              <Link href="/privacidad" className="text-foreground underline">
                Política de privacidad
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
