import { LegalPage } from "@/components/legal-page";
import { getCopy } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const { locale, t } = await getCopy();
  const page = t.legalNotice;
  return pageMetadata({ locale, title: page.metaTitle ?? page.title, description: page.description, path: "/aviso-legal" });
}

export default async function LegalNoticePage() {
  const { locale, t } = await getCopy();
  return <LegalPage page={t.legalNotice} locale={locale} />;
}
