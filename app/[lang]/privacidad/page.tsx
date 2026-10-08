import { LegalPage } from "@/components/legal-page";
import { getCopy } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const { locale, t } = await getCopy();
  const page = t.privacyPolicy;
  return pageMetadata({ locale, title: page.metaTitle ?? page.title, description: page.description, path: "/privacidad" });
}

export default async function PrivacyPage() {
  const { locale, t } = await getCopy();
  return <LegalPage page={t.privacyPolicy} locale={locale} />;
}
