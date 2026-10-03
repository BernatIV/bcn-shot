import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { ArrowRightIcon } from "@/components/icons";
import { PendingAsset } from "@/components/pending-asset";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { focalPointToObjectPosition } from "@/lib/focal-point";
import { pageMetadata } from "@/lib/metadata";
import { getFeaturedPhotos } from "@/lib/photos";

export const metadata = pageMetadata({ description: copy.meta.description, path: "/" });

export default function HomePage() {
  const featured = getFeaturedPhotos();
  const { heroImage, aboutPortrait } = siteConfig;

  return (
    <>
      {/* Portada */}
      <section aria-labelledby="hero-title">
        <Container className="grid gap-8 pt-8 md:grid-cols-12 md:gap-10 md:pt-12 lg:gap-16">
          <div className="flex flex-col justify-end md:col-span-5 md:pb-4">
            <h1 id="hero-title" className="text-[2.5rem] font-semibold sm:text-5xl lg:text-6xl xl:text-7xl">
              {copy.home.title}
            </h1>
            <p className="mt-5 max-w-[40ch] text-lg text-muted md:text-xl">{copy.home.subtitle}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={siteConfig.cta.href}>{copy.home.primaryCta}</ButtonLink>
              <ButtonLink href="/portfolio" variant="link">
                {copy.home.secondaryCta}
              </ButtonLink>
            </div>
          </div>
          <div className="md:col-span-7">
            {heroImage ? (
              <Image
                src={heroImage.src}
                width={heroImage.width}
                height={heroImage.height}
                alt={heroImage.alt}
                preload
                sizes="(min-width: 768px) 58vw, 100vw"
                className="aspect-[4/5] w-full object-cover md:aspect-auto md:h-[min(80vh,860px)]"
                style={{ objectPosition: focalPointToObjectPosition(heroImage.focalPoint) }}
              />
            ) : (
              <PendingAsset
                label="Foto principal de portada (autorizada por Oriol)"
                className="aspect-[4/5] w-full md:aspect-auto md:h-[min(80vh,860px)]"
              />
            )}
          </div>
        </Container>
      </section>

      {/* Selecció de treballs */}
      <section aria-labelledby="featured-title" className="mt-24 md:mt-36">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <h2 id="featured-title" className="text-3xl font-semibold md:text-4xl">
              {copy.home.featuredHeading}
            </h2>
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center gap-2 underline-offset-[6px] hover:underline"
            >
              {copy.home.featuredLink}
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          {featured.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-8">
              {featured.map((photo) => (
                <li key={photo.id}>
                  <Link href="/portfolio" className="group block overflow-hidden bg-border/40">
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="aspect-[4/5] w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                      style={{ objectPosition: focalPointToObjectPosition(photo.focalPoint) }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <PendingAsset label="Selección de 4 a 8 fotos destacadas (featured en content/photos.ts)" className="aspect-[3/1] w-full" />
          )}
        </Container>
      </section>

      {/* Proposta */}
      <section aria-labelledby="proposal-title" className="mt-24 md:mt-36">
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 id="proposal-title" className="text-3xl font-semibold md:text-4xl">
              {copy.home.proposalHeading}
            </h2>
            <p className="mt-4 max-w-[40ch] text-muted">{copy.home.proposalLocation}</p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3 md:col-span-8">
            {copy.home.proposalItems.map((item) => (
              <li key={item.title} className="border-t border-foreground pt-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Presentació d'Oriol */}
      <section aria-labelledby="about-title" className="mt-24 md:mt-36">
        <Container className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-1">
            {aboutPortrait ? (
              <Image
                src={aboutPortrait.src}
                width={aboutPortrait.width}
                height={aboutPortrait.height}
                alt={aboutPortrait.alt}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: focalPointToObjectPosition(aboutPortrait.focalPoint) }}
              />
            ) : (
              <PendingAsset label="Retrato real de Oriol (aprobado por él)" className="aspect-[4/5] w-full" />
            )}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 id="about-title" className="text-3xl font-semibold md:text-4xl">
              {copy.home.aboutHeading}
            </h2>
            {copy.about.paragraphs.map((p) => (
              <p key={p} className="mt-5 max-w-prose text-lg">
                {p}
              </p>
            ))}
            <ButtonLink href="/sobre-mi" variant="link" className="mt-6">
              {copy.home.aboutLink}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
