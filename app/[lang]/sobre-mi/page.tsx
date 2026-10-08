import Image from "next/image";
import { PendingAsset } from "@/components/pending-asset";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/icons";
import { siteConfig } from "@/content/site";
import { focalPointToObjectPosition } from "@/lib/focal-point";
import { getCopy } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const { locale, t } = await getCopy();
  return pageMetadata({ locale, title: t.about.title, description: t.about.description, path: "/sobre-mi" });
}

const instagramLinkClass =
  "inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline";

export default async function AboutPage() {
  const { locale, t } = await getCopy();
  const { aboutPortrait, instagramUrl, personalInstagramUrl } = siteConfig;
  const hasInstagram = instagramUrl || personalInstagramUrl;

  return (
    <Container className="grid gap-10 pt-10 md:grid-cols-12 md:gap-12 md:pt-16">
      <div className="md:col-span-5">
        {aboutPortrait ? (
          <Image
            src={aboutPortrait.src}
            width={aboutPortrait.width}
            height={aboutPortrait.height}
            alt={aboutPortrait.alt[locale]}
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full object-cover"
            style={{ objectPosition: focalPointToObjectPosition(aboutPortrait.focalPoint) }}
          />
        ) : (
          <PendingAsset label={t.pending.portrait} className="aspect-[4/5] w-full" />
        )}
      </div>
      <div className="md:col-span-6 md:col-start-7 md:self-end">
        <h1 className="text-4xl font-semibold md:text-6xl">{t.about.title}</h1>
        <div className="mt-8 space-y-5 text-lg">
          {t.about.paragraphs.map((p) => (
            <p key={p} className="max-w-prose">
              {p}
            </p>
          ))}
        </div>
        {hasInstagram ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-8">
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={instagramLinkClass}
                aria-label={`${t.about.instagramProfessional} ${t.common.newTab}`}
              >
                <InstagramIcon className="size-5 shrink-0" />
                @bcnshot
              </a>
            ) : null}
            {personalInstagramUrl ? (
              <a
                href={personalInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={instagramLinkClass}
                aria-label={`${t.about.instagramPersonal} ${t.common.newTab}`}
              >
                <InstagramIcon className="size-5 shrink-0" />
                @oriolmaneduatis
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
