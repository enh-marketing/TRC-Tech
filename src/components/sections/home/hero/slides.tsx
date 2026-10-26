"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TwoToneTitle } from "@/components/ui";
import { ArrowRight } from "@/components/site/icons";
import type { HeroAction, HeroSlide, Headline } from "@/content/home";
import { cn } from "@/lib/cn";

/** How long each slide stays before the next. The timer bar runs for this long. */
export const SLIDE_MS = 7000;

/**
 * The hero's slider engine, after the WAI-ARIA
 * carousel pattern: it plays on its own, pauses while the pointer or keyboard
 * focus is inside and while it is off screen, stops for good once someone
 * picks a slide, has a pause button (WCAG 2.2.2), and does not play by
 * default when the device asks for reduced motion. The timer is a CSS
 * animation whose end advances the slide, so pausing it pauses the slider.
 */
export function useSlides(count: number) {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    setIndex(((i % count) + count) % count);
  };
  /** A choice made by the reader stops the autoplay. */
  const choose = (i: number) => {
    setPlaying(false);
    go(i);
  };

  const bind = {
    ref,
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      const to = (((index + dir) % count) + count) % count;
      choose(to);
      // On a tab, focus follows the selected tab, as the WAI-ARIA tabs pattern expects.
      if ((e.target as HTMLElement).getAttribute("role") === "tab") {
        e.preventDefault();
        ref.current?.querySelectorAll<HTMLElement>("[role=tab]")[to]?.focus();
      }
    },
  };

  return { index, go, choose, playing, setPlaying, running: playing && !hovering && !focused && onScreen, bind, count };
}

export type Slides = ReturnType<typeof useSlides>;

/** The timer bar. When it fills, the next slide shows. */
export function SlideTimer({ s, className, barClassName }: { s: Slides; className?: string; barClassName?: string }) {
  if (!s.playing) return null;
  return (
    <span aria-hidden="true" className={cn("block overflow-hidden", className)}>
      <span
        key={s.index}
        className={cn("hero-timer block h-full origin-left", barClassName)}
        style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: s.running ? "running" : "paused" }}
        onAnimationEnd={() => s.go(s.index + 1)}
      />
    </span>
  );
}

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

/** Round pause and play button, for the teal hero. */
export function PauseButton({ s }: { s: Slides }) {
  return (
    <button
      type="button"
      onClick={() => s.setPlaying(!s.playing)}
      aria-label={s.playing ? "Pause the slides" : "Play the slides"}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink-on-brand/30 text-ink-on-brand transition-colors duration-150 hover:bg-ink-on-brand/10"
    >
      {s.playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}

/** Round previous or next arrow, for the teal hero. */
export function StepButton({ s, dir }: { s: Slides; dir: -1 | 1 }) {
  return (
    <button
      type="button"
      onClick={() => s.choose(s.index + dir)}
      aria-label={dir < 0 ? "Previous slide" : "Next slide"}
      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink-on-brand/30 text-ink-on-brand transition-colors duration-150 hover:bg-ink-on-brand/10"
    >
      <ArrowRight className={cn("size-4", dir < 0 && "rotate-180")} />
    </button>
  );
}

/** The slide's title: the first slide takes the chosen headline draft and is the page's H1. */
export function SlideTitle({
  slide,
  i,
  headline,
  className,
  onBrand,
}: {
  slide: HeroSlide;
  i: number;
  headline: Headline;
  className?: string;
  onBrand?: boolean;
}) {
  const t = slide.title ?? headline;
  const Tag = i === 0 ? "h1" : "h2";
  return (
    <Tag id={i === 0 ? "hero-title" : undefined} className={cn("m-0", className)}>
      <TwoToneTitle lead={t.lead} tail={t.tail} onBrand={onBrand} />
    </Tag>
  );
}

const actionStyles = {
  primary: "bg-surface-accent border-surface-accent text-ink-on-accent hover:bg-surface-accent-hover hover:border-surface-accent-hover",
  outline: "bg-transparent border-ink-on-brand/60 text-ink-on-brand hover:border-ink-on-brand hover:bg-ink-on-brand/10",
};
export type ActionStyle = keyof typeof actionStyles;

/** A slide's call to action, as a pill button. Inactive slides are inert, so their buttons cannot take focus. */
export function SlideAction({ action, look }: { action: HeroAction; look: ActionStyle }) {
  return (
    <Link
      href={action.href}
      data-track={action.track}
      data-location={action.track ? "hero" : undefined}
      className={cn(
        "inline-flex min-h-13 items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-btn-label no-underline transition-colors duration-150",
        actionStyles[look],
      )}
    >
      {action.label}
    </Link>
  );
}

export const pad = (n: number) => String(n).padStart(2, "0");
