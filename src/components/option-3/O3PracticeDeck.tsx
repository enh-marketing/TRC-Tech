"use client";

import * as m from "motion/react-m";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { PracticeIcon } from "@/components/sections/home/PracticeIcon";
import { Silhouette } from "@/components/sections/home/Silhouette";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

export type PracticeSlide = { slug: string; title: string; short: string; summary: string; roles: string[]; href: string; photo: string | null };

const control =
  "o3-press flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink-900 text-ink-900 transition-colors duration-150 hover:border-surface-accent hover:bg-surface-accent hover:text-ink-on-accent";

/**
 * The four practices as a deck, after the agency's reference: one large card at
 * a time with two lighter cards stacked behind it, arrows and a count beside the
 * heading, and the practice names below to jump straight to one. WAI-ARIA
 * carousel: inactive cards are inert, the change is announced politely, a swipe
 * also moves it. Every card shares one grid cell, so the block keeps the height
 * of the tallest and nothing below moves. It changes only when the reader asks.
 */
export function O3PracticeDeck({ items, children }: { items: PracticeSlide[]; children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [moved, setMoved] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = items.length;
  const show = (i: number) => {
    setIndex(((i % count) + count) % count);
    setMoved(true);
  };

  return (
    <div aria-roledescription="carousel" aria-label="Our practices">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div data-reveal="stagger">{children}</div>
        <div data-reveal className="flex items-center gap-3">
          <p aria-hidden="true" className="m-0 me-2 text-body-sm text-ink-500 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <button type="button" onClick={() => show(index - 1)} className={control}>
            <ArrowRight className="size-5 rotate-180" />
            <span className="sr-only">Previous practice</span>
          </button>
          <button type="button" onClick={() => show(index + 1)} className={control}>
            <ArrowRight className="size-5" />
            <span className="sr-only">Next practice</span>
          </button>
        </div>
      </div>

      <div
        data-reveal
        className="relative mt-10 pb-8 lg:mt-14"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {/* The two cards stacked behind, as in the reference. */}
        <span aria-hidden="true" className="absolute inset-x-5 top-4 bottom-4 rounded-[28px] bg-surface-accent/45 sm:inset-x-8" />
        <span aria-hidden="true" className="absolute inset-x-10 top-8 bottom-0 rounded-[28px] bg-surface-accent/20 sm:inset-x-16" />

        <div aria-live="polite" className="relative grid">
          {items.map((p, i) => {
            const active = i === index;
            return (
              <m.div
                key={p.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.title}`}
                aria-hidden={!active}
                inert={!active}
                initial={false}
                animate={{ opacity: active ? 1 : 0, x: active ? 0 : i < index ? -24 : 24, transition: { duration: moved ? 0.35 : 0, ease: ease.out } }}
                className={cn(
                  "o3-icon-host group/slide grid overflow-hidden rounded-[28px] bg-surface-accent text-ink-on-accent shadow-card [grid-area:1/1] md:grid-cols-[minmax(0,1fr)_auto]",
                  !active && "pointer-events-none",
                )}
              >
                <div className="relative flex flex-col p-7 sm:p-10 lg:p-12">
                  {/* The number as a large, faint watermark behind the corner (agency's request). */}
                  <span aria-hidden="true" className="pointer-events-none absolute top-3 right-5 text-[88px] leading-none font-semibold tracking-tight tabular-nums opacity-[0.12] sm:top-4 sm:right-8 sm:text-[120px] xl:text-[136px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative m-0 flex items-center gap-3 pe-16 text-heading-lg sm:text-display-md">
                    <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-raised text-accent-700 transition-transform duration-300 motion-reduce:transition-none group-hover/slide:scale-110 group-hover/slide:-rotate-6">
                      <PracticeIcon slug={p.slug} className="size-5" />
                    </span>
                    {p.title}
                  </h3>
                  <p className="relative m-0 mt-6 max-w-[48ch] text-body">{p.summary}</p>
                  <p className="relative m-0 mt-6 text-body-sm">
                    <span className="font-semibold">{p.roles.length} role specialisms:</span> {p.roles.join(", ")}
                  </p>
                  <Link
                    href={p.href}
                    className="o3-press group relative mt-8 inline-flex min-h-12 items-center gap-3 self-start rounded-full bg-surface-raised ps-5 pe-1.5 text-btn-label text-ink-900 no-underline shadow-sm transition-shadow hover:shadow-card"
                  >
                    Explore {p.title}
                    <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-surface-brand text-ink-on-brand">
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </span>
                  </Link>
                </div>
                {/* The photo as a square (agency's request), set into the card and framed on the face.
                    Square at every size: on top on phones, beside the words from 768px, centred
                    against them when they run taller. */}
                <div
                  aria-hidden="true"
                  data-reveal="media"
                  className="relative order-first m-3 aspect-square justify-self-stretch overflow-hidden rounded-[18px] bg-surface-accent-hover sm:m-4 md:order-none md:w-[300px] md:self-center lg:w-[360px] xl:w-[400px]"
                >
                  {/* The photo settles from 106% as its card comes in (Motion), inside the fixed frame. */}
                  <m.div
                    initial={false}
                    animate={{ scale: active ? 1 : 1.06, transition: { duration: moved ? 0.7 : 0, ease: ease.out } }}
                    className="absolute inset-0"
                  >
                    {p.photo ? (
                      <Image src={p.photo} alt="" fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 360px, 100vw" className="object-cover object-[50%_25%]" />
                    ) : (
                      <Silhouette className="absolute inset-x-[20%] bottom-0 h-[80%] w-[60%] fill-ink-on-accent/20" />
                    )}
                  </m.div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {items.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => show(i)}
            aria-current={i === index || undefined}
            className={cn(
              "o3-icon-host o3-press group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-body-sm transition-colors duration-150",
              i === index ? "bg-surface-accent text-ink-on-accent" : "text-ink-700 ring-1 ring-line-200 hover:text-ink-900 hover:ring-ink-900",
            )}
          >
            <PracticeIcon slug={p.slug} className="size-4 transition-transform duration-300 motion-reduce:transition-none group-hover:scale-125" />
            {p.short}
            <span className="sr-only"> practice</span>
          </button>
        ))}
      </div>
    </div>
  );
}
