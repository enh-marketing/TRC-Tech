"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/Logo";
import type { domains } from "@/content/home";
import { cardFrame, cardPanel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { domainIcons } from "./DomainIcons";

type Domain = (typeof domains.items)[number];

/** Becomes true the first time the element is mostly on screen, so animations play when someone can see them. */
function useSeen<T extends Element>(threshold: number) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/** True while the element is at least `threshold` on screen, so the tour only runs when someone can see it. */
function useOnScreen(ref: React.RefObject<Element | null>, threshold: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return on;
}

/* Map geometry: TRC at the centre, six stops on a ring, clockwise from the top. The box is just tall
   enough for the top and bottom labels and centred on TRC, so the visual sits in the middle of it. */
const BOX_H = 103.4;
const CENTRE = { x: 50, y: 51.7 };
const RADIUS = 38;
const stops = Array.from({ length: 6 }, (_, i) => {
  const a = ((-90 + i * 60) * Math.PI) / 180;
  const x = +(CENTRE.x + RADIUS * Math.cos(a)).toFixed(3);
  const y = +(CENTRE.y + RADIUS * Math.sin(a)).toFixed(3);
  // Labels sit on the far side of each stop from TRC, so a spoke never runs through one.
  return { x, y, left: `${x}%`, top: `${+((y / BOX_H) * 100).toFixed(3)}%`, labelAbove: Math.sin(a) < -0.01 };
});

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

/** How long the tour stays on each stop. The progress bar in the panel runs for this long. */
const TOUR_MS = 5000;

/**
 * Desktop: a hiring map. The six stops are tabs; the panel under the heading
 * shows the selected one. It tours the stops on its own, following the
 * WAI-ARIA carousel pattern: it pauses while the pointer or keyboard focus is
 * on the map or panel and while the map is off screen, stops for good once
 * someone picks a stop, and has a pause button (WCAG 2.2.2). The tour is off
 * by default when the device asks for reduced motion.
 */
function HiringMap({ items }: { items: readonly Domain[] }) {
  const [active, setActive] = useState(0);
  const [mapRef, seen] = useSeen<HTMLDivElement>(0.4);
  const onScreen = useOnScreen(mapRef, 0.4);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const running = playing && onScreen && !hovering && !focused;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = items.length - 1;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  const select = (i: number, focus = false) => {
    const to = i < 0 ? last : i > last ? 0 : i;
    setActive(to);
    if (focus) tabs.current[to]?.focus();
  };
  // A choice made by the reader ends the tour.
  const choose = (i: number, focus = false) => {
    setPlaying(false);
    select(i, focus);
  };
  const hold = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
  };
  const current = items[active];
  const Icon = domainIcons[current.icon];

  function onKeyDown(e: React.KeyboardEvent) {
    const to =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? active + 1
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? active - 1
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (to === null) return;
    e.preventDefault();
    choose(to, true);
  }

  return (
    <>
      <div
        role="tabpanel"
        id="domain-panel"
        data-reveal
        aria-labelledby={`domain-tab-${active}`}
        className={cn("relative hidden lg:col-start-1 lg:row-start-3 lg:block", cardFrame)}
        {...hold}
      >
        <div className={cn("relative isolate overflow-hidden bg-surface-brand p-[26px] text-ink-on-brand", cardPanel)}>
          {/* The tour's timer: when the bar fills, the next stop is selected. Pausing the bar pauses the tour. */}
          {playing ? (
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-ink-on-brand/10">
              <span
                key={active}
                className="map-progress block h-full origin-left bg-surface-accent"
                style={{ animationDuration: `${TOUR_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                onAnimationEnd={() => select(active + 1)}
              />
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-6 -z-10 size-24 border-t-[18px] border-r-[18px] border-current opacity-[0.1]"
          />
          <div key={active} aria-live={playing ? "off" : "polite"} className="map-in flex min-h-[13.5rem] flex-col gap-4">
            <div className="flex items-center gap-4">
              <span data-play={seen} className="flex size-14 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
                <Icon className="size-7" />
              </span>
              <span className="text-eyebrow text-ink-on-brand/75 uppercase tabular-nums">
                {String(active + 1).padStart(2, "0")} of {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="m-0 text-heading-lg">{current.title}</h3>
            <p className="m-0 text-body-lg text-ink-on-brand/80">{current.body}</p>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink-on-brand/15 pt-5">
            <span className="text-caption text-ink-on-brand/75">
              {playing ? "Touring all six. Pick one to stop." : "Pick a stop, or step through."}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause the tour" : "Play the tour"}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-ink-on-brand/25 transition-colors duration-150 hover:bg-ink-on-brand/10"
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                onClick={() => choose(active - 1)}
                aria-label="Previous kind of organisation"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full ring-1 ring-ink-on-brand/25 transition-colors duration-150 hover:bg-ink-on-brand/10"
              >
                <Arrow direction="left" />
              </button>
              <button
                type="button"
                onClick={() => choose(active + 1)}
                aria-label="Next kind of organisation"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-surface-accent text-ink-on-accent transition-colors duration-150 hover:bg-surface-accent-hover"
              >
                <Arrow direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={mapRef}
        data-inview={seen}
        data-reveal
        className="relative mx-auto hidden aspect-[1000/1034] w-full max-w-[560px] lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:block lg:self-center"
        {...hold}
      >
        {/* The ring, an inner ring and the six spokes. */}
        <svg viewBox={`0 0 100 ${BOX_H}`} aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
          <circle cx={CENTRE.x} cy={CENTRE.y} r={RADIUS} fill="none" className="stroke-line-100" strokeWidth="0.3" />
          <circle cx={CENTRE.x} cy={CENTRE.y} r={RADIUS * 0.62} fill="none" className="stroke-line-100" strokeWidth="0.25" strokeDasharray="0.6 1.4" />
          {stops.map((s, i) => (
            <line
              key={i}
              x1={CENTRE.x}
              y1={CENTRE.y}
              x2={s.x}
              y2={s.y}
              strokeLinecap="round"
              className={cn(
                "transition-[stroke,stroke-width] duration-300",
                i === active ? "map-spoke-active stroke-surface-accent" : "stroke-line-200/50",
              )}
              strokeWidth={i === active ? 0.6 : 0.25}
              strokeDasharray={i === active ? undefined : "0.8 1.2"}
            />
          ))}
        </svg>

        {/* TRC at the centre, with a halo; it sends out a ring each time the selection changes. */}
        <div
          aria-hidden="true"
          className="absolute aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-accent/10"
          style={{ left: `${CENTRE.x}%`, top: `${(CENTRE.y / BOX_H) * 100}%` }}
        />
        <div
          aria-hidden="true"
          className="absolute flex aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface-brand shadow-md ring-1 ring-brand-edge"
          style={{ left: `${CENTRE.x}%`, top: `${(CENTRE.y / BOX_H) * 100}%` }}
        >
          <span key={active} className="map-pulse absolute inset-0 rounded-full border-2 border-surface-accent opacity-0" />
          <Logo height={44} />
        </div>

        <div role="tablist" aria-label="Kinds of organisation we hire for" onKeyDown={onKeyDown}>
          {items.map((d, i) => {
            const StopIcon = domainIcons[d.icon];
            const selected = i === active;
            return (
              <button
                key={d.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`domain-tab-${i}`}
                aria-selected={selected}
                aria-controls="domain-panel"
                tabIndex={selected ? 0 : -1}
                data-play={!seen ? "false" : selected ? "true" : "intro"}
                onClick={() => choose(i)}
                className={cn(
                  "di-host absolute flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition duration-300 motion-reduce:transition-none",
                  selected
                    ? "scale-110 bg-surface-accent text-ink-on-accent shadow-md ring-8 ring-surface-accent/20"
                    : "bg-surface-100 text-accent-700 shadow-sm ring-1 ring-line-100 hover:shadow-md hover:ring-line-200",
                )}
                style={{ left: stops[i].left, top: stops[i].top }}
              >
                <StopIcon className="size-7" />
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 -translate-x-1/2 text-body-sm font-semibold whitespace-nowrap transition-colors duration-300",
                    stops[i].labelAbove ? "bottom-full mb-3" : "top-full mt-3",
                    selected ? "text-ink-900" : "text-ink-700",
                  )}
                >
                  {d.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/** Phones and tablets: the same six stops on a vertical line, all text showing. Each icon plays as it scrolls into view. */
function Stop({ d, i }: { d: Domain; i: number }) {
  const [ref, seen] = useSeen<HTMLLIElement>(0.7);
  const StopIcon = domainIcons[d.icon];
  return (
    <li ref={ref} className="relative flex gap-5 py-4">
      <span
        data-play={seen}
        className={cn(
          "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full ring-1",
          i === 0 ? "bg-surface-accent text-ink-on-accent ring-surface-accent" : "bg-surface-100 text-accent-700 ring-line-100",
        )}
      >
        <StopIcon className="size-6" />
      </span>
      <div className="flex flex-col gap-1 pt-1">
        <span className="text-eyebrow text-ink-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="m-0 text-heading-sm text-ink-900">{d.title}</h3>
        <p className="m-0 text-body-sm text-ink-700">{d.body}</p>
      </div>
    </li>
  );
}

function StopList({ items }: { items: readonly Domain[] }) {
  return (
    // The dashed line the stops sit on is a pseudo-element, since an ol may only hold li elements.
    <ol data-reveal className="relative m-0 max-w-[640px] list-none p-0 before:absolute before:top-8 before:bottom-8 before:left-6 before:border-l before:border-dashed before:border-line-200 before:content-[''] lg:hidden">
      {items.map((d, i) => (
        <Stop key={d.title} d={d} i={i} />
      ))}
    </ol>
  );
}

/**
 * One grid for both layouts. Desktop: heading and panel in the left column,
 * centred against the map on the right. Below 1024px: heading, then the list.
 */
export function DomainsMap({ items, header }: { items: readonly Domain[]; header: React.ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16 lg:gap-y-10">
      <div className="lg:col-start-1 lg:row-start-2">{header}</div>
      <HiringMap items={items} />
      <StopList items={items} />
    </div>
  );
}
