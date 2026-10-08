import { NotFoundContent } from "@/components/not-found-content";
import { getLocale } from "@/lib/locale";

export default async function NotFound() {
  return <NotFoundContent locale={await getLocale()} />;
}