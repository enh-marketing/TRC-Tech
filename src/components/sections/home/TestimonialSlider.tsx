"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Testimonial } from "@/content/home";
import { cn } from "@/lib/cn";
import { Silhouette } from "./Silhouette";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-accent-700">
      <span className="sr-only">Rated {rating} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={cn("size-5", i >= rating && "opacity-25")}>
          <path
            fill="currentColor"
            d="M10 1.6l2.47 5.36 5.86.68-4.34 4 1.17 5.78L10 14.5l-5.16 2.92 1.17-5.78-4.34-4 5.86-.68z"
          />
        </svg>
      ))}
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

/**
 * One quote at a time, moved only by the reader: arrow buttons, the
 * keyboard's left and right keys, or a swipe. All quotes share one grid cell,
 * so the block is as tall as the longest and nothing jumps on change.
 * Built on the WAI-ARIA carousel pattern; inactive quotes are inert.
 */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  const button =
    "flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-200 bg-surface-100 text-ink-900 transition-colors duration-150 hover:border-ink-900 hover:bg-surface-200";

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
      className="mx-auto flex max-w-[960px] flex-col items-center gap-5"
    >
      <div className="flex w-full items-center gap-6 lg:gap-10">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={cn(button, "hidden md:flex")}>
          <Arrow direction="left" />
        </button>

        <div aria-live="polite" className="grid min-w-0 flex-1">
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
                  "m-0 flex flex-col items-center gap-5 text-center transition-[opacity,transform] duration-300 ease-out [grid-area:1/1] motion-reduce:transition-none",
                  active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                {t.rating ? <Stars rating={t.rating} /> : null}
                <blockquote className="m-0">
                  <p className="m-0 max-w-[34ch] text-heading-md font-normal text-ink-900 sm:max-w-[44ch] md:text-heading-lg md:font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="flex flex-col items-center gap-3">
                  <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-surface-300 ring-2 ring-surface-100 outline outline-1 outline-line-100">
                    {t.photo ? (
                      <Image src={t.photo} alt="" fill sizes="48px" className="object-cover" />
                    ) : (
                      <Silhouette className="absolute inset-x-[14%] bottom-0 h-[80%] w-[72%] fill-line-200/60" />
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

        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={cn(button, "hidden md:flex")}>
          <Arrow direction="right" />
        </button>
      </div>

      {/* Below the quote: arrows again on phones, and a position counter everywhere. */}
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={cn(button, "md:hidden")}>
          <Arrow direction="left" />
        </button>
        <p className="m-0 min-w-12 text-center text-body-sm text-ink-500 tabular-nums" aria-hidden="true">
          {index + 1} / {count}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={cn(button, "md:hidden")}>
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  );
}
