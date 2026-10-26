"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import type { Headline, HeroSlide } from "@/content/home";
import { pillars, roleCount } from "@/content/site";
import { cardFrame, cardPanel } from "@/components/ui";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { PracticeIcon } from "../PracticeIcon";
import { PauseButton, SlideAction, SlideTimer, SlideTitle, StepButton, pad, useSlides } from "./slides";

/** Card colours, after the Latest insights cards. */
const tones = [
  { card: "bg-surface-brand-hover text-ink-on-brand", muted: "text-ink-on-brand/75", tag: "text-accent-on-brand-hover", arrow: "bg-surface-accent text-ink-on-accent" },
  { card: "bg-surface-accent text-ink-on-accent", muted: "text-ink-on-accent/90", tag: "text-ink-on-accent", arrow: "bg-surface-brand text-accent-on-brand" },
  { card: "bg-surface-100 text-ink-900", muted: "text-ink-700", tag: "text-accent-700", arrow: "bg-surface-brand text-accent-on-brand" },
];

/** Where a card sits in the stack, by its place behind the front card. */
function stackStyle(place: number, dragX: number, leaving: boolean): React.CSSProperties {
  if (leaving) return { transform: "translate(-70%, -6%) rotate(-14deg)", opacity: 0, zIndex: 40 };
  const rot = [0, 4, -4][place] ?? 0;
  return {
    transform:
      place === 0
        ? `translateX(${dragX}px) rotate(${dragX / 22}deg)`
        : `translate(${place * 22}px, ${place * 18}px) rotate(${rot}deg) scale(${1 - place * 0.05})`,
    zIndex: 30 - place,
  };
}

/**
 * The hero as a card deck. The headline and both doors stay put on the left; on
 * the right, three slide cards sit in a stack. The front card can be dragged or
 * flicked aside, or moved with the arrows, and goes to the back of the deck.
 * Behind it all, the front card's photo fades in, greyscale on the teal.
 */
export function HeroDeck({ slides, headline }: { slides: HeroSlide[]; headline: Headline }) {
  const s = useSlides(slides.length);
  const [dragX, setDragX] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const start = useRef<number | null>(null);
  const dragging = useRef(false);
  const first = slides[0];

  const advance = (dir: 1 | -1, chosen: boolean) => {
    if (dir === 1) {
      setLeaving(s.index);
      window.setTimeout(() => setLeaving(null), 420);
    }
    if (chosen) s.choose(s.index + dir);
    else s.go(s.index + dir);
  };

  const onDown = (e: React.PointerEvent) => {
    start.current = e.clientX;
    dragging.current = false;
  };
  // The card takes the pointer only once it is really dragged, so a plain click still reaches the links on it.
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    if (!dragging.current && Math.abs(dx) > 6) {
      dragging.current = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (dragging.current) setDragX(dx);
  };
  const onUp = () => {
    if (start.current === null) return;
    const dx = dragX;
    start.current = null;
    dragging.current = false;
    setDragX(0);
    if (Math.abs(dx) > 80) advance(dx < 0 ? 1 : -1, true);
  };

  return (
    <section {...s.bind} aria-labelledby="hero-title" aria-roledescription="carousel" className="hero-full relative isolate flex flex-col overflow-hidden bg-surface-brand text-ink-on-brand">
      {/* Greyscale at a quarter opacity on the teal keeps white text at 4.5:1 or better over the brightest pixel. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {slides.map((slide, i) =>
          slide.photo && isShown(slide.photo) ? (
            <Image
              key={slide.key}
              src={slide.photo.src}
              alt=""
              fill
              sizes="100vw"
              preload={i === 0}
              className={cn("hero-photo object-cover", i === s.index && "is-active")}
            />
          ) : null,
        )}
      </div>
      <div className="mx-auto grid w-full max-w-[1200px] flex-1 items-center gap-14 px-4 pt-10 pb-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="flex flex-col items-start gap-7">
          {first.eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-on-brand/10 px-3.5 py-1.5 text-body-sm text-ink-on-brand ring-1 ring-ink-on-brand/15">
              <span className="size-1.5 bg-surface-accent" aria-hidden="true" />
              {first.eyebrow}
            </span>
          ) : null}
          <SlideTitle slide={first} i={0} headline={headline} onBrand className="text-display-md text-ink-on-brand sm:text-display-lg xl:text-display-xl" />
          <p className="m-0 max-w-[46ch] text-body-lg text-ink-on-brand/85">{first.body}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <SlideAction action={first.primary} look="primary" />
            {first.secondary ? <SlideAction action={first.secondary} look="outline" /> : null}
          </div>
        </div>

        <div className="hero-deck-in flex flex-col items-start gap-8 lg:items-center">
          <div className="relative h-[30rem] w-full max-w-[26rem] touch-pan-y select-none [--card-ground:var(--trc-surface-brand)] sm:h-[27rem]" aria-live={s.playing ? "off" : "polite"}>
            {slides.map((slide, i) => {
              const place = (i - s.index + slides.length) % slides.length;
              const tone = tones[i % tones.length];
              const front = place === 0;
              const isLeaving = leaving === i;
              return (
                <article
                  key={slide.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${slide.tab}`}
                  aria-hidden={!front}
                  inert={!front}
                  onPointerDown={front ? onDown : undefined}
                  onPointerMove={front ? onMove : undefined}
                  onPointerUp={front ? onUp : undefined}
                  onPointerCancel={front ? onUp : undefined}
                  className={cn(
                    "absolute inset-0 flex",
                    cardFrame,
                    // Cards behind the front one show as coloured edges only, so their text never peeks out.
                    "[&>*>*]:transition-opacity [&>*>*]:duration-300",
                    front ? "cursor-grab active:cursor-grabbing" : "[&>*>*]:opacity-0",
                    dragX === 0 && "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                  )}
                  style={stackStyle(place, front ? dragX : 0, isLeaving)}
                >
                  <div className={cn("flex flex-1 flex-col gap-4 p-[22px] sm:p-[26px]", cardPanel, tone.card)}>
                    <div className="flex items-center justify-between">
                      <span className={cn("text-eyebrow uppercase", tone.tag)}>
                        <span className="tabular-nums">{pad(i + 1)}</span> · {slide.tab}
                      </span>
                      <span className={cn("text-caption tabular-nums", tone.muted)}>
                        {pad(i + 1)} / {pad(slides.length)}
                      </span>
                    </div>
                    {i === 0 ? (
                      <div className="flex flex-col gap-2">
                        <p className="m-0 text-heading-lg">Four practices, one team.</p>
                        <p className={cn("m-0 text-body-sm", tone.muted)}>
                          <span className="tabular-nums">{roleCount}</span> role specialisms, from experienced engineers to CTO and CPO.
                        </p>
                      </div>
                    ) : (
                      <SlideTitle slide={slide} i={i} headline={headline} onBrand={i % tones.length === 0} className="text-display-sm sm:text-display-md [&_span]:text-current [&_span]:opacity-70" />
                    )}
                    {/* The first card would repeat the headline beside it, so it shows the four practices instead, each linking to its page. */}
                    {i === 0 ? (
                      <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
                        {pillars.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={p.href}
                              draggable={false}
                              className="group/tile flex h-full items-center gap-2 rounded-md bg-ink-on-brand/[0.06] p-2.5 text-ink-on-brand no-underline ring-1 ring-ink-on-brand/10 ring-inset transition-colors duration-150 hover:bg-ink-on-brand/[0.12] sm:gap-3 sm:p-3"
                            >
                              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent transition-transform duration-200 group-hover/tile:-rotate-6 sm:size-8">
                                <PracticeIcon slug={p.slug} className="size-4" />
                              </span>
                              <span className="flex min-w-0 flex-col">
                                <span className="text-body-sm font-semibold">{p.short}</span>
                                <span className="text-caption text-ink-on-brand/70 tabular-nums">{p.roles.length} roles</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={cn("m-0 text-body", tone.muted)}>{slide.body}</p>
                    )}
                    <Link
                      href={slide.primary.href}
                      data-track={slide.primary.track}
                      data-location={slide.primary.track ? "hero" : undefined}
                      draggable={false}
                      className="group mt-auto flex items-center justify-between gap-4 border-t border-current/15 pt-5 text-heading-md text-inherit no-underline"
                    >
                      {slide.primary.label}
                      <span className={cn("flex size-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1", tone.arrow)}>
                        <ArrowRight className="size-5" />
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="flex w-full max-w-[26rem] items-center gap-3">
            <StepButton s={s} dir={-1} />
            <div className="flex-1">
              <SlideTimer s={s} className="h-1 rounded-full bg-ink-on-brand/15" barClassName="rounded-full bg-surface-accent" />
              {!s.playing ? <span className="block h-1 rounded-full bg-ink-on-brand/15" /> : null}
              <p className="m-0 mt-2 text-center text-caption text-ink-on-brand/70" aria-hidden="true">
                Drag the card, or use the arrows
              </p>
            </div>
            <button
              type="button"
              onClick={() => advance(1, true)}
              aria-label="Next slide"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-surface-accent text-ink-on-accent transition-colors hover:bg-surface-accent-hover"
            >
              <ArrowRight className="size-4" />
            </button>
            <PauseButton s={s} />
          </div>
        </div>
      </div>
    </section>
  );
}
