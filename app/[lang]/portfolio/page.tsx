import { CtaSection } from "@/components/cta-section";
import { PhotoGrid } from "@/components/photo-grid";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { localizePath } from "@/lib/i18n";
import { getCopy } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { getPublishedPhotos } from "@/lib/photos";

export async function generateMetadata() {
  const { locale, t } = await getCopy();
  return pageMetadata({ locale, title: t.portfolio.title, description: t.portfolio.description, path: "/portfolio" });
}

export default async function PortfolioPage() {
  const { locale, t } = await getCopy();
  const photos = getPublishedPhotos(locale);
  const ctaHref = localizePath(locale, siteConfig.ctaPath);

  return (
    <>
      <Container className="pt-10 md:pt-16">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <h1 className="text-4xl font-semibold md:text-6xl">{t.portfolio.title}</h1>
            <p className="mt-3 text-lg text-muted">{t.portfolio.intro}</p>
          </div>
          {photos.length > 0 ? (
            <ButtonLink href={ctaHref} variant="secondary">
              {t.nav.cta}
            </ButtonLink>
          ) : null}
        </header>

        {photos.length > 0 ? (
          <PhotoGrid
            photos={photos}
            loop={siteConfig.lightboxLoop}
            labels={{ enlarge: t.portfolio.enlarge, lightbox: t.portfolio.lightbox }}
          />
        ) : (
          <div className="flex flex-col items-start gap-6 border-t border-border py-16 md:py-24">
            <h2 className="text-2xl font-semibold md:text-3xl">{t.portfolio.emptyTitle}</h2>
            <p className="max-w-prose text-lg text-muted">{t.portfolio.emptyText}</p>
            <ButtonLink href={ctaHref}>{t.nav.cta}</ButtonLink>
          </div>
        )}
      </Container>
      {photos.length > 0 ? <CtaSection /> : null}
    </>
  );
}
