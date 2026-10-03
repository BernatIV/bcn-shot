import { LegalPending } from "@/components/legal-pending";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de BCN SHOT.",
  path: "/aviso-legal",
});

export default function LegalNoticePage() {
  return (
    <LegalPending
      title="Aviso legal"
      items={[
        "Titular del sitio web y datos identificativos.",
        "Datos de contacto: info@bcnshot.com.",
        "Proveedor de alojamiento (pendiente de decidir).",
        "Condiciones de uso y propiedad intelectual de las fotografías.",
      ]}
    />
  );
}
