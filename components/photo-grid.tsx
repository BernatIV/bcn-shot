"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/lightbox";
import type { PortfolioPhoto } from "@/content/types";
import { cn } from "@/lib/cn";
import { focalPointToObjectPosition } from "@/lib/focal-point";

export function PhotoGrid({ photos, loop }: { photos: PortfolioPhoto[]; loop: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <ul className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <figure>
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                className="group block w-full cursor-zoom-in overflow-hidden bg-border/40"
                aria-label={`Ampliar: ${photo.title ?? photo.alt}`}
                aria-haspopup="dialog"
              >
                <Image
                  src={photo.src}
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  className={cn(
                    "h-auto w-full transition-opacity duration-300 group-hover:opacity-90",
                    // Single column (mobile) keeps the original aspect ratio unless focalPoint is set;
                    // multi-column layouts always use a uniform 4:5 crop so the grid stays even.
                    photo.focalPoint ? "aspect-[4/5] object-cover" : "sm:aspect-[4/5] sm:object-cover",
                  )}
                  style={{ objectPosition: focalPointToObjectPosition(photo.focalPoint) }}
                />
              </button>
              {photo.title || photo.credit ? (
                <figcaption className="mt-2 flex flex-wrap justify-between gap-x-4 text-sm text-muted">
                  {photo.title ? <span>{photo.title}</span> : null}
                  {photo.credit ? <span>{photo.credit}</span> : null}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
      <Lightbox
        photos={photos}
        index={openIndex}
        loop={loop}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        returnFocusTo={openerRef}
      />
    </>
  );
}
