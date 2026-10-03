"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRef, type KeyboardEvent, type RefObject, type TouchEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import type { PortfolioPhoto } from "@/content/types";

const SWIPE_THRESHOLD = 50;

const controlClass =
  "inline-flex size-12 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white disabled:pointer-events-none disabled:opacity-30";

export function Lightbox({
  photos,
  index,
  loop,
  onIndexChange,
  onClose,
  returnFocusTo,
}: {
  photos: PortfolioPhoto[];
  index: number | null;
  loop: boolean;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const open = index !== null;
  const total = photos.length;
  const photo = open ? photos[index] : null;
  const hasPrev = open && (loop ? total > 1 : index > 0);
  const hasNext = open && (loop ? total > 1 : index < total - 1);

  const go = (delta: -1 | 1) => {
    if (index === null) return;
    const next = index + delta;
    if (loop) onIndexChange((next + total) % total);
    else if (next >= 0 && next < total) onIndexChange(next);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#0d0d0d] motion-safe:animate-[fade-in_200ms_ease-out]" />
        <Dialog.Content
          aria-describedby={undefined}
          onKeyDown={onKeyDown}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            closeRef.current?.focus();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            returnFocusTo.current?.focus();
          }}
          className="fixed inset-0 z-50 flex flex-col text-white outline-none"
        >
          <Dialog.Title className="sr-only">Visor de fotos</Dialog.Title>

          <div className="flex h-16 shrink-0 items-center justify-between px-3 sm:px-5">
            <p className="px-2 text-sm tabular-nums text-white/75" aria-live="polite" aria-atomic="true">
              {open ? (
                <>
                  <span className="sr-only">Foto </span>
                  {index + 1} / {total}
                </>
              ) : null}
            </p>
            <Dialog.Close ref={closeRef} className={controlClass} aria-label="Cerrar visor">
              <CloseIcon />
            </Dialog.Close>
          </div>

          <div
            className="relative min-h-0 flex-1 touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            {photo ? (
              <div className="pointer-events-none absolute inset-0 mx-14 sm:mx-20">
                <Image
                  key={photo.id}
                  src={photo.lightboxSrc ?? photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  className="object-contain motion-safe:animate-[fade-in_250ms_ease-out]"
                />
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => go(-1)}
              disabled={!hasPrev}
              aria-label="Foto anterior"
              className={`${controlClass} absolute top-1/2 left-1 -translate-y-1/2 sm:left-4`}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={!hasNext}
              aria-label="Foto siguiente"
              className={`${controlClass} absolute top-1/2 right-1 -translate-y-1/2 sm:right-4`}
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="flex min-h-16 shrink-0 items-center justify-center px-6 py-3 text-center text-sm text-white/75">
            {photo?.title ? <p>{photo.title}</p> : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
