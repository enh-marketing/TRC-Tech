"use client";

import * as m from "motion/react-m";
import { useRef, useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import type { Testimonial } from "@/content/home";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

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

const control =
  "flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-200 text-ink-900 transition-colors duration-200 hover:border-surface-accent hover:bg-surface-accent hover:text-ink-on-accent";

/**
 * One large quote at a time (WAI-ARIA carousel: arrows, a count, swipe, inactive
 * quotes inert). Every quote shares one grid cell, so the block keeps the height
 * of the longest and nothing below it moves; the change is a short Motion fade.
 * It moves only when the reader asks it to.
 */
export function QuoteDeck({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = items.length;
  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + count) % count);
    setMoved(true);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="flex flex-col gap-8"
    >
      <span aria-hidden="true" className="block h-12 text-[6rem] leading-[1] font-semibold text-surface-accent">
        &ldquo;
      </span>
      <div aria-live="polite" className="grid">
        {items.map((t, i) => {
          const active = i === index;
          return (
            <m.figure
              key={t.quote}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              initial={false}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10, transition: { duration: moved ? 0.3 : 0, ease: ease.out } }}
              className={cn("m-0 flex flex-col gap-8 [grid-area:1/1]", !active && "pointer-events-none")}
            >
              <blockquote className="m-0">
                <p className="o2-quote m-0 text-ink-900">{t.quote}</p>
              </blockquote>
              <figcaption className="flex flex-wrap items-end justify-between gap-4">
                <span className="flex flex-col gap-1">
                  <span className="text-eyebrow text-ink-500 uppercase">{t.audience}</span>
                  <span className="text-heading-sm text-ink-900">{t.role}</span>
                  <span className="text-body-sm text-ink-700">{t.company}</span>
                </span>
                {t.rating ? <Stars rating={t.rating} /> : null}
              </figcaption>
            </m.figure>
          );
        })}
      </div>
      <div className="flex items-center gap-3 border-t border-line-200 pt-6">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={control}>
          <ArrowRight className="size-5 rotate-180" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={control}>
          <ArrowRight className="size-5" />
        </button>
        <p aria-hidden="true" className="m-0 ms-auto text-body-sm text-ink-500 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
