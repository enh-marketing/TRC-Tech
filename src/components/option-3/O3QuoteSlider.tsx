"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Silhouette } from "@/components/sections/home/Silhouette";
import { ArrowRight } from "@/components/site/icons";
import type { Testimonial } from "@/content/home";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

/** Round arrows on the mint band, filling green on hover (concept 3's controls). */
const control =
  "o3-press flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink-on-brand text-ink-on-brand transition-colors duration-150 hover:border-surface-accent hover:bg-surface-accent hover:text-ink-on-accent";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-accent-700">
      <span className="sr-only">Rated {rating} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={cn("size-5", i >= rating && "opacity-25")}>
          <path fill="currentColor" d="M10 1.6l2.47 5.36 5.86.68-4.34 4 1.17 5.78L10 14.5l-5.16 2.92 1.17-5.78-4.34-4 5.86-.68z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Concept 1's one-quote-at-a-time slider in concept 3's style: a large white card
 * with two lighter cards stacked behind it (as the What we do deck), a faint green
 * quotation mark, the stars and audience pill, the quote, then the person's role
 * and kind of company. Round arrows and a count sit under the card. Moved only by
 * the reader: the arrows, the left and right keys, or a swipe. All quotes share
 * one grid cell, so the card is as tall as the longest and nothing jumps.
 * WAI-ARIA carousel pattern; inactive quotes are inert.
 */
export function O3QuoteSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = items.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="mx-auto flex max-w-[960px] flex-col items-center gap-8"
    >
      <div className="relative w-full pb-6">
        {/* The two cards stacked behind, as on the What we do deck. */}
        <span aria-hidden="true" className="absolute inset-x-5 top-3 bottom-3 rounded-[28px] bg-surface-raised/60 sm:inset-x-10" />
        <span aria-hidden="true" className="absolute inset-x-10 top-6 bottom-0 rounded-[28px] bg-surface-raised/35 sm:inset-x-20" />

        <div aria-live="polite" className="relative grid">
          {items.map((t, i) => {
            const active = i === index;
            return (
              <figure
                key={t.quote}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "relative m-0 flex flex-col overflow-hidden rounded-[28px] bg-surface-raised p-7 text-ink-900 shadow-card ring-1 ring-line-100 transition-[opacity,translate] duration-300 ease-out [grid-area:1/1] motion-reduce:transition-none sm:p-10 lg:px-14 lg:py-12",
                  // Quotes before the current one wait to the left, later ones to the right, so a
                  // change slides the way the reader moved (as the What we do deck does).
                  active ? "translate-x-0 opacity-100" : cn("pointer-events-none opacity-0", i < index ? "-translate-x-6" : "translate-x-6"),
                )}
              >
                <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-6 text-[160px] leading-none font-semibold text-surface-accent opacity-40 sm:right-10 sm:text-[200px]">
                  &rdquo;
                </span>
                <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2">
                  {t.rating ? <Stars rating={t.rating} /> : null}
                  <span className="rounded-full bg-surface-brand px-3 py-1 text-caption font-semibold text-ink-on-brand">{t.audience}</span>
                </div>
                <blockquote className="relative m-0 mt-6 sm:mt-8">
                  <p className="m-0 max-w-[48ch] text-heading-md font-normal md:text-heading-lg md:font-normal">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-4 border-t border-line-100 pt-6 sm:mt-10">
                  <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-brand">
                    {t.photo ? (
                      <Image src={t.photo} alt="" fill sizes="48px" className="object-cover" />
                    ) : (
                      <Silhouette className="absolute inset-x-[14%] bottom-0 h-[80%] w-[72%] fill-ink-on-brand/25" />
                    )}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-heading-sm text-ink-900">{t.role}</span>
                    <span className="text-body-sm text-ink-500">{t.company}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={control}>
          <ArrowRight className="size-5 rotate-180" />
        </button>
        <p aria-hidden="true" className="m-0 min-w-16 text-center text-body-sm text-ink-on-brand/80 tabular-nums">
          {pad(index + 1)} / {pad(count)}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={control}>
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
