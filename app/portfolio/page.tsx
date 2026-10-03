import { CtaSection } from "@/components/cta-section";
import { PhotoGrid } from "@/components/photo-grid";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { getPublishedPhotos } from "@/lib/photos";

export const metadata = pageMetadata({
  title: copy.portfolio.title,
  description: copy.portfolio.description,
  path: "/portfolio",
});

export default function PortfolioPage() {
  const photos = getPublishedPhotos();

  return (
    <>
      <Container className="pt-10 md:pt-16">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <h1 className="text-4xl font-semibold md:text-6xl">{copy.portfolio.title}</h1>
            <p className="mt-3 text-lg text-muted">{copy.portfolio.intro}</p>
          </div>
          {photos.length > 0 ? (
            <ButtonLink href={siteConfig.cta.href} variant="secondary">
              {siteConfig.cta.label}
            </ButtonLink>
          ) : null}
        </header>

        {photos.length > 0 ? (
          <PhotoGrid photos={photos} loop={siteConfig.lightboxLoop} />
        ) : (
          <div className="flex flex-col items-start gap-6 border-t border-border py-16 md:py-24">
            <h2 className="text-2xl font-semibold md:text-3xl">{copy.portfolio.emptyTitle}</h2>
            <p className="max-w-prose text-lg text-muted">{copy.portfolio.emptyText}</p>
            <ButtonLink href={siteConfig.cta.href}>{siteConfig.cta.label}</ButtonLink>
          </div>
        )}
      </Container>
      {photos.length > 0 ? <CtaSection /> : null}
    </>
  );
}
