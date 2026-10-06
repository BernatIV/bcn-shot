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

        <p className="mt-8 text-muted">
          En BCN SHOT tratamos los datos personales que nos facilitas para responder a tus
          consultas y gestionar las sesiones fotográficas o colaboraciones que nos propongas.
        </p>

        <div className="mt-8 space-y-8 text-muted">
          <section>
            <h2 className="text-foreground text-xl font-semibold">1. Responsable</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                Responsable: <span className="text-foreground">Oriol Mañé Duatis</span>
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
              <li>
                Sitio web: <span className="text-foreground">{siteConfig.url}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">2. Qué datos tratamos y para qué</h2>
            <p className="mt-3">
              Si utilizas el formulario de contacto, tratamos tu nombre, dirección de correo
              electrónico, tipo de consulta y el contenido del mensaje. Si nos escribes
              directamente por correo, tratamos los datos que incluyas en tu comunicación.
            </p>
            <p className="mt-3">
              Utilizamos estos datos para responderte y, en su caso, preparar una sesión
              fotográfica, un presupuesto o una colaboración. No los utilizamos para enviarte
              publicidad no solicitada.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">3. Base jurídica</h2>
            <p className="mt-3">
              Cuando solicitas información sobre una sesión o presupuesto, el tratamiento es
              necesario para atender tu petición y realizar gestiones previas a una posible
              contratación. Para otras consultas o propuestas de colaboración, tratamos los datos
              que nos facilitas para poder responderte.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">
              4. Cuánto tiempo conservamos los datos
            </h2>
            <p className="mt-3">
              Conservamos las consultas durante el tiempo necesario para responderlas y gestionar
              la relación que pueda surgir. Si se contrata un servicio, conservaremos los datos
              que deban mantenerse durante los plazos exigidos por la normativa aplicable.
              Después, los suprimiremos cuando ya no sean necesarios.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">
              5. Proveedores y transferencias internacionales
            </h2>
            <p className="mt-3">
              La web está alojada en Vercel. Los mensajes enviados mediante el formulario se
              procesan a través de Resend para hacerlos llegar por correo electrónico al
              responsable.
            </p>
            <p className="mt-3">
              Estos proveedores pueden acceder a los datos necesarios para prestar sus servicios.
              Resend almacena datos, incluido el contenido de los mensajes, en Estados Unidos.
              Vercel también contempla el tratamiento de datos fuera del Espacio Económico
              Europeo. Estos tratamientos deben realizarse con las garantías exigidas por la
              normativa de protección de datos. No vendemos tus datos personales a terceros.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">6. Tus derechos</h2>
            <p className="mt-3">
              Puedes solicitar el acceso a tus datos, su rectificación o supresión, así como
              ejercer los demás derechos reconocidos por la normativa de protección de datos,
              escribiendo a <span className="text-foreground">{siteConfig.email}</span>.
            </p>
            <p className="mt-3">
              También puedes presentar una reclamación ante la Agencia Española de Protección de
              Datos si consideras que el tratamiento de tus datos no es adecuado.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-xl font-semibold">7. Cookies</h2>
            <p className="mt-3">
              Si la web utiliza únicamente cookies técnicas estrictamente necesarias, no se
              requiere tu consentimiento para instalarlas. Esta información se actualizará si se
              incorporan herramientas de análisis, publicidad u otras tecnologías que lo
              requieran.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
