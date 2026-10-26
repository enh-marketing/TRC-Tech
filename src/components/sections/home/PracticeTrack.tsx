"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import type { Pillar } from "@/content/site";
import { cardFrame, cardLift, cardPanel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useScrollMotion } from "@/lib/motion";
import { PracticeIcon } from "./PracticeIcon";

/**
 * Card tones, after the Latest insights cards: teal, light green, neutral and
 * green. Teal and green are fixed in both themes; the light two follow it.
 */
const tones = [
  { panel: "bg-surface-brand text-ink-on-brand", muted: "text-ink-on-brand/75", icon: "bg-surface-accent text-ink-on-accent", chip: "border-ink-on-brand/20 text-ink-on-brand/85", rule: "border-ink-on-brand/15" },
  { panel: "bg-[color-mix(in_srgb,var(--trc-surface-accent)_25%,var(--trc-surface-100))] text-ink-900", muted: "text-ink-700", icon: "bg-surface-brand text-accent-on-brand", chip: "border-ink-900/15 text-ink-700", rule: "border-ink-900/10" },
  { panel: "bg-surface-300 text-ink-900", muted: "text-ink-700", icon: "bg-surface-accent text-ink-on-accent", chip: "border-ink-900/15 text-ink-700", rule: "border-ink-900/10" },
  { panel: "bg-surface-accent text-ink-on-accent", muted: "text-ink-on-accent/90", icon: "bg-surface-brand text-accent-on-brand", chip: "border-ink-on-accent/25 text-ink-on-accent", rule: "border-ink-on-accent/20" },
];

/**
 * True on screens at least 1024px wide and 740px tall, unless the device asks for
 * reduced motion. Otherwise the row is a plain swipe row, so the pinned view never
 * has to fit on a screen too short for it.
 */
function usePinned() {
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return pinned;
}

/**
 * The practice cards in a horizontal track. From 1024px up the section pins
 * while the page scrolls, and the vertical scroll slides the track sideways
 * (a GSAP ScrollTrigger with a short scrub, so the cards glide rather than
 * jump with each wheel tick); once the last card is in view the page carries on. Below 1024px, or with
 * reduced motion, it is a native swipe row. Tabbing to a card scrolls the page
 * to the point where that card is in view.
 */
export function PracticeTrack({ header, items, allHref }: { header: React.ReactNode; items: Pillar[]; allHref: string }) {
  const pinned = usePinned();
  const outer = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [gutter, setGutter] = useState(16);
  const [dist, setDist] = useState(0);
  const [step, setStep] = useState(1);
  const bar = useRef<HTMLSpanElement>(null);

  // Measure the content column's left edge and how far the track must travel.
  useEffect(() => {
    const measure = () => {
      const g = Math.round(gutterRef.current?.getBoundingClientRect().left ?? 16);
      setGutter(g);
      if (track.current && viewport.current) setDist(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  // Map the page scroll through the pinned stretch onto the track's travel. The section
  // stays CSS-sticky; ScrollTrigger only drives the track, smoothed by a 0.6s scrub. The
  // counter and bar follow the smoothed position, so they stay in step with the cards.
  useScrollMotion(
    outer,
    (gsap) => {
      if (!pinned || !dist || !track.current || !outer.current) return;
      const setBar = bar.current ? gsap.quickSetter(bar.current, "scaleX") : null;
      gsap.to(track.current, {
        x: -dist,
        ease: "none",
        scrollTrigger: { trigger: outer.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        onUpdate() {
          const p = this.progress();
          setBar?.(Math.max(0.06, p));
          setStep(Math.min(items.length, Math.round(p * (items.length - 1)) + 1));
        },
      });
    },
    [pinned, dist, items.length],
  );

  // Keyboard: bring a focused card into view by scrolling the page, not the clipped row.
  function onCardFocus(e: React.FocusEvent<HTMLElement>) {
    if (!pinned || !outer.current || !viewport.current || dist === 0) return;
    viewport.current.scrollLeft = 0;
    const li = e.currentTarget as HTMLElement;
    const want = Math.min(dist, Math.max(0, li.offsetLeft - gutter));
    const el = outer.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (want / dist) * total, behavior: "instant" as ScrollBehavior });
  }

  return (
    <div ref={outer} className={pinned ? undefined : "py-16 lg:py-24"} style={pinned ? { height: `calc(100svh + ${dist}px)` } : undefined}>
      <div className={cn(pinned && "sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-20")}>
        <div ref={gutterRef} className="mx-auto w-full max-w-[1200px] px-4">
          <div className="flex flex-wrap items-end justify-between gap-6">
            {header}
            {pinned ? (
              <div className="flex items-center gap-4" aria-hidden="true">
                <span className="text-body-sm text-ink-500 tabular-nums">
                  {String(step).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <span className="relative block h-1 w-24 overflow-hidden rounded-full bg-line-100 xl:w-40">
                  <span ref={bar} className="absolute inset-0 origin-left rounded-full bg-surface-accent" style={{ transform: "scaleX(0.06)" }} />
                </span>
                <span className="hidden text-body-sm text-ink-500 xl:inline">Scroll</span>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={viewport}
          data-reveal
          // Pinned, the browser must not scroll this box itself (it would when a card takes focus).
          onScroll={pinned ? (e) => (e.currentTarget.scrollLeft = 0) : undefined}
          className={cn(
            "mt-10 lg:mt-8",
            pinned
              ? "overflow-hidden"
              : "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
          style={pinned ? undefined : { scrollPaddingInline: gutter + 16 }}
        >
          <ul
            ref={track}
            className="m-0 flex w-max list-none items-stretch gap-6 py-2"
            style={{ paddingInline: gutter + 16 }}
          >
            {items.map((p, i) => {
              const tone = tones[i % tones.length];
              return (
                <li key={p.slug} onFocus={onCardFocus} className="w-[85vw] max-w-[36rem] shrink-0 snap-start sm:w-[34rem]">
                  <Link
                    href={p.href}
                    className={cn("group flex h-full no-underline", cardFrame, cardLift)}
                  >
                    <div className={cn("flex w-full flex-col gap-5 p-6 sm:p-7", cardPanel, tone.panel)}>
                      <div className="flex items-start justify-between gap-4">
                        <span className={cn("flex size-14 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none", tone.icon)}>
                          <PracticeIcon slug={p.slug} className="size-7" />
                        </span>
                        <span aria-hidden="true" className="text-display-md leading-none tabular-nums opacity-25 xl:text-display-lg xl:leading-none">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="m-0 text-heading-lg sm:text-display-md">{p.title}</h3>
                        <p className={cn("m-0 text-body", tone.muted)}>{p.summary}</p>
                      </div>
                      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label={`${p.title} roles`}>
                        {p.roles.map((role) => (
                          <li key={role} className={cn("rounded-full border px-2.5 py-1 text-caption", tone.chip)}>
                            {role}
                          </li>
                        ))}
                      </ul>
                      <div className={cn("mt-auto flex items-center justify-between gap-4 border-t pt-5", tone.rule)}>
                        <span className={cn("text-body-sm font-semibold", tone.muted)}>{p.roles.length} role specialisms</span>
                        <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full border border-current/30 transition-colors duration-200 group-hover:border-transparent group-hover:bg-surface-accent group-hover:text-ink-on-accent">
                          <ArrowRight className="size-5 -rotate-45 transition-transform duration-200 ease-out group-hover:rotate-0 motion-reduce:transition-none" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
            {/* The end of the row: one link to all four practices. */}
            <li onFocus={onCardFocus} className="w-[70vw] max-w-[22rem] shrink-0 snap-start sm:w-[22rem]">
              <Link
                href={allHref}
                className={cn("group flex h-full no-underline", cardFrame, cardLift)}
              >
                <span className={cn("flex w-full flex-col justify-between gap-8 bg-surface-100 p-[26px] text-ink-900", cardPanel)}>
                  <span className="text-eyebrow text-ink-500 uppercase">All practices</span>
                  <span className="flex flex-col gap-5">
                    <span className="text-display-md">See how each practice works</span>
                    <span className="flex size-14 items-center justify-center rounded-full bg-surface-brand text-accent-on-brand transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">
                      <ArrowRight className="size-6" />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {pinned ? null : (
          <p className="m-0 mx-auto mt-2 w-full max-w-[1200px] px-4 text-caption text-ink-500" aria-hidden="true">
            Swipe for the next practice
          </p>
        )}
      </div>
    </div>
  );
}
