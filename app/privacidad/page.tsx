import { LegalPending } from "@/components/legal-pending";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacidad",
  description: "Información sobre privacidad y datos del formulario de contacto de BCN SHOT.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <LegalPending
      title="Política de privacidad"
      items={[
        "Responsable del tratamiento y datos de contacto.",
        "Datos que recoge el formulario de contacto (nombre, correo, tipo de consulta y mensaje) y finalidad.",
        "Base legal, plazo de conservación y derechos de las personas usuarias.",
        "Proveedor de envío de correo del formulario y proveedor de alojamiento (pendientes de decidir).",
        "Cookies técnicas de la plataforma, si las hubiera. La web no usa cookies de seguimiento.",
      ]}
    />
  );
}
