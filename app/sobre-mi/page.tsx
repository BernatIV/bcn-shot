import Image from "next/image";
import { PendingAsset } from "@/components/pending-asset";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { focalPointToObjectPosition } from "@/lib/focal-point";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: copy.about.title,
  description: copy.about.description,
  path: "/sobre-mi",
});

export default function AboutPage() {
  const { aboutPortrait } = siteConfig;

  return (
    <Container className="grid gap-10 pt-10 md:grid-cols-12 md:gap-12 md:pt-16">
      <div className="md:col-span-5">
        {aboutPortrait ? (
          <Image
            src={aboutPortrait.src}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            alt={aboutPortrait.alt}
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full object-cover"
            style={{ objectPosition: focalPointToObjectPosition(aboutPortrait.focalPoint) }}
          />
        ) : (
          <PendingAsset label="Retrato real de Oriol (aprobado por él)" className="aspect-[4/5] w-full" />
        )}
      </div>
      <div className="md:col-span-6 md:col-start-7 md:self-end">
        <h1 className="text-4xl font-semibold md:text-6xl">{copy.about.title}</h1>
        <div className="mt-8 space-y-5 text-lg">
          {copy.about.paragraphs.map((p) => (
            <p key={p} className="max-w-prose">
              {p}
            </p>
          ))}
        </div>
        <blockquote className="border-accent mt-8 max-w-prose border-l-2 pl-5 text-xl italic">
          <p>&ldquo;{copy.about.quote.text}&rdquo;</p>
          <footer className="text-muted mt-2 text-base not-italic">
            — {copy.about.quote.author}
          </footer>
        </blockquote>
        <ButtonLink href={siteConfig.cta.href} className="mt-10">
          {siteConfig.cta.label}
        </ButtonLink>
      </div>
    </Container>
  );
}
