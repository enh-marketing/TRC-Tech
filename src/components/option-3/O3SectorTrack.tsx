"use client";

import { useEffect, useRef, useState } from "react";
import { domainIcons } from "@/components/sections/home/DomainIcons";
import type { domains } from "@/content/home";
import { cn } from "@/lib/cn";
import { useScrollMotion } from "@/lib/motion";
import { frame } from "./shared";

type Sector = (typeof domains.items)[number];

/**
 * Each card's colours, in turn: green, white, mint, white, a green tint, white.
 * Body text keeps full strength on green so it passes contrast.
 */
const looks = [
  { card: "bg-surface-accent text-ink-on-accent", body: "text-ink-on-accent", icon: "bg-surface-raised text-accent-700" },
  { card: "bg-surface-raised text-ink-900 ring-1 ring-line-100 shadow-sm", body: "text-ink-700", icon: "bg-surface-accent text-ink-on-accent" },
  { card: "bg-surface-brand text-ink-on-brand", body: "text-ink-on-brand/80", icon: "bg-surface-accent text-ink-on-accent" },
  { card: "bg-surface-raised text-ink-900 ring-1 ring-line-100 shadow-sm", body: "text-ink-700", icon: "bg-surface-accent text-ink-on-accent" },
  { card: "bg-surface-accent/30 text-ink-900", body: "text-ink-700", icon: "bg-surface-raised text-accent-700" },
  { card: "bg-surface-raised text-ink-900 ring-1 ring-line-100 shadow-sm", body: "text-ink-700", icon: "bg-surface-accent text-ink-on-accent" },
];

/**
 * True on screens at least 1024px wide and 740px tall, unless the device asks for
 * reduced motion; otherwise the row is a plain swipe row. Same rule as concept 1.
 */
/** The closest a pinned stage sits to the top of the screen: the 72px header plus 24px. */
const STICK_MIN = 96;

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
 * Who we hire for as a scroll carousel, the mechanism of concept 1's What we do
 * track in concept 3's style: from 1024px the section pins while the page
 * scrolls and the vertical scroll slides the cards sideways (a GSAP ScrollTrigger
 * with a 0.6s scrub), with a count and a progress bar beside the button; once the
 * last card is in view the page carries on. Below 1024px, on short screens or with
 * reduced motion, it is a native swipe row that snaps to each card.
 *
 * Pinned, the stage is only as tall as its content and sticks at a centred offset
 * (never closer than 96px to the top, clear of the header), with a spacer below it as
 * long as the row's travel. So in the page's flow the section keeps the usual spacing
 * above it, and while pinned the content still sits in the middle of the screen.
 */
export function O3SectorTrack({ header, intro, action, items }: { header: React.ReactNode; intro: React.ReactNode; action: React.ReactNode; items: readonly Sector[] }) {
  const pinned = usePinned();
  const outer = useRef<HTMLDivElement>(null);
  const edge = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [gutter, setGutter] = useState(20);
  const [stick, setStick] = useState(STICK_MIN);
  const [dist, setDist] = useState(0);
  const [step, setStep] = useState(1);

  // The row starts at the content column's left edge; measure it and how far the row must travel.
  useEffect(() => {
    const measure = () => {
      setGutter(Math.round(edge.current?.getBoundingClientRect().left ?? 20));
      if (track.current && viewport.current) setDist(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
      if (stage.current) setStick(Math.max(STICK_MIN, Math.round((window.innerHeight - stage.current.offsetHeight) / 2)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    if (stage.current) ro.observe(stage.current);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  // Map the page scroll through the pinned stretch onto the row's travel; the count and bar follow it.
  useScrollMotion(
    outer,
    (gsap) => {
      const box = outer.current;
      if (!pinned || !dist || !track.current || !box) return;
      const setBar = bar.current ? gsap.quickSetter(bar.current, "scaleX") : null;
      // The stretch in which the stage is stuck: from its top reaching `stick` until the
      // spacer below it has scrolled by. Functions, so a refresh measures them again.
      const start = () => box.getBoundingClientRect().top + window.scrollY + (parseFloat(getComputedStyle(box).paddingTop) || 0) - stick;
      gsap.to(track.current, {
        x: -dist,
        ease: "none",
        scrollTrigger: { trigger: box, start, end: () => start() + dist, scrub: 0.6 },
        onUpdate() {
          const p = this.progress();
          setBar?.(Math.max(0.06, p));
          setStep(Math.min(items.length, Math.round(p * (items.length - 1)) + 1));
        },
      });
    },
    [pinned, dist, stick, items.length],
  );

  return (
    <div ref={outer} className={pinned ? "pt-24 pb-28" : "py-20 lg:py-28"}>
      <div ref={stage} className={cn(pinned && "sticky")} style={pinned ? { top: stick } : undefined}>
        <div className={frame}>
          <div ref={edge}>
            {header}
            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              {intro}
              <div className="flex flex-wrap items-center gap-6">
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
                {action}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={viewport}
          data-reveal
          // Swiping, the row takes keyboard focus so arrow keys scroll it; pinned, the page scroll drives it.
          tabIndex={pinned ? undefined : 0}
          aria-label={pinned ? undefined : "Kinds of organisation, scroll sideways"}
          // Pinned, the browser must not scroll this box itself.
          onScroll={pinned ? (e) => (e.currentTarget.scrollLeft = 0) : undefined}
          className={cn(
            "mt-10 lg:mt-12",
            pinned ? "overflow-hidden" : "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
          style={pinned ? undefined : { scrollPaddingInline: gutter }}
        >
          <ul ref={track} className="m-0 flex w-max list-none items-stretch gap-4 p-0 py-3 sm:gap-5" style={{ paddingInline: gutter }}>
            {items.map((item, i) => {
              const Icon = domainIcons[item.icon];
              const look = looks[i % looks.length];
              return (
                <li key={item.title} className="flex w-[82vw] max-w-[28rem] shrink-0 snap-start sm:w-[26rem]">
                  <div
                    className={cn(
                      "di-host o3-icon-host group relative isolate flex min-h-[300px] w-full flex-col overflow-hidden rounded-[28px] p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8 motion-reduce:transition-none",
                      look.card,
                    )}
                  >
                    {/* Soft rings in the corner that swell on hover, and the number as a faint watermark. */}
                    <span aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 -z-10 size-64 rounded-full border-[22px] border-current opacity-[0.07] transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none" />
                    <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-4 -z-10 size-28 rounded-full border-[14px] border-current opacity-[0.07]" />
                    <span aria-hidden="true" className="pointer-events-none absolute top-7 right-7 -z-10 text-display-md leading-none tabular-nums opacity-25 sm:top-8 sm:right-8 xl:text-display-lg xl:leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className={cn("flex size-16 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none", look.icon)}>
                      <Icon className="size-8" />
                    </span>
                    <h3 className="m-0 mt-auto pt-10 text-heading-lg">{item.title}</h3>
                    <p className={cn("m-0 mt-2 text-body-lg", look.body)}>{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {pinned ? null : (
          <p aria-hidden="true" className={cn(frame, "m-0 mt-2 text-caption text-ink-500")}>
            Swipe for the next kind of organisation
          </p>
        )}
      </div>
      {/* The scroll the stage stays stuck for: as long as the row has to travel. */}
      {pinned ? <div aria-hidden="true" style={{ height: dist }} /> : null}
    </div>
  );
}
