"use client";

import * as m from "motion/react-m";
import { useRef, useState } from "react";
import { Button, cardFrame, cardLift, cardPanel } from "@/components/ui";
import { ArrowRight } from "@/components/site/icons";
import type { howItWorks } from "@/content/home";
import { Scene, type ScenePalette } from "./HowItWorksScenes";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Content = typeof howItWorks;
type TrackKey = "companies" | "candidates";
type Cta = { label: string; href: string; event: string };

/** The switch's icons, on the site's 24px, 1.5px outline grid: a building for companies, a person for candidates. */
function TrackIcon({ track, className = "size-5" }: { track: TrackKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {track === "companies" ? (
        <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 10h4a1 1 0 0 1 1 1v10M3 21h18M8 8h3M8 12h3M8 16h3" />
      ) : (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
        </>
      )}
    </svg>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Card tones, after the Latest insights cards: deep teal (a shade lighter than the band,
 * so it stays a card), a green tint, a neutral, and solid green for the shared outcome. Teal and green are fixed in both themes;
 * the tint and neutral follow the theme, and so does their text.
 */
const tones: { panel: string; muted: string; pill: string; palette: ScenePalette }[] = [
  { panel: "bg-surface-brand-hover text-ink-on-brand", muted: "text-ink-on-brand/75", pill: "bg-surface-accent text-ink-on-accent", palette: "brand" },
  { panel: "bg-[color-mix(in_srgb,var(--trc-surface-accent)_25%,var(--trc-surface-100))] text-ink-900", muted: "text-ink-700", pill: "bg-surface-brand text-ink-on-brand", palette: "light" },
  { panel: "bg-surface-300 text-ink-900", muted: "text-ink-700", pill: "bg-surface-accent text-ink-on-accent", palette: "light" },
  { panel: "bg-surface-accent text-ink-on-accent", muted: "text-ink-on-accent/90", pill: "bg-surface-brand text-accent-on-brand", palette: "accent" },
];

/** The round arrow between cards, in the full four-card row from 1024px up. */
function Connector() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 -right-11 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-brand text-accent-on-brand ring-1 ring-ink-on-brand/25 lg:flex"
    >
      <ArrowRight className="size-4" />
    </span>
  );
}

/** The track switch, the four steps of the chosen track (the fourth is shared), and its call to action. */
export function HowItWorksSteps({
  content,
  ctas,
  header,
  intro,
}: {
  content: Content;
  ctas: Record<TrackKey, Cta>;
  header: React.ReactNode;
  intro: string;
}) {
  const [track, setTrack] = useState<TrackKey>("companies");
  // Cards animate only after a switch; their first appearance is the scroll reveal's job.
  const [switched, setSwitched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const keys: TrackKey[] = ["companies", "candidates"];
  const steps = content[track].steps;

  function onKeyDown(e: React.KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next: TrackKey = e.key === "Home" ? "companies" : e.key === "End" ? "candidates" : track === "companies" ? "candidates" : "companies";
    setTrack(next);
    setSwitched(true);
    tabs.current[keys.indexOf(next)]?.focus();
  }

  return (
    <>
      {/* Two columns, bottoms aligned: the heading on the left; the intro and the switch on the
          right, flush with the right edge of the last card below. Phones stack them on the left. */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-x-12">
        {header}
        <div data-reveal className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
          <p className="m-0 max-w-[46ch] text-body-lg text-pretty text-ink-on-brand">{intro}</p>
          <div
            role="tablist"
            aria-label="Choose a track"
            onKeyDown={onKeyDown}
            className="relative grid w-full grid-cols-2 rounded-full bg-ink-on-brand/10 p-1 ring-1 ring-ink-on-brand/15 sm:w-auto"
          >
            {/* The green pill slides to the chosen track. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-surface-accent shadow-md transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: track === "candidates" ? "translateX(100%)" : "none" }}
            />
            {keys.map((k, i) => {
              const selected = k === track;
              return (
                <button
                  key={k}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`hiw-tab-${k}`}
                  aria-selected={selected}
                  aria-controls="hiw-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => {
                    setTrack(k);
                    setSwitched(true);
                  }}
                  className={cn(
                    "relative z-10 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-body-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-6",
                    selected ? "text-ink-on-accent" : "text-ink-on-brand hover:text-accent-on-brand",
                  )}
                >
                  <TrackIcon track={k} />
                  {content[k].label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div role="tabpanel" id="hiw-panel" aria-labelledby={`hiw-tab-${track}`} data-reveal className="mt-12 lg:mt-16">
        {/* On a switch the first three cards (keyed by track) come in one after another
            (Motion); step 04 is the same in both tracks, so it stays put, which is the point of
            the section. Below 1024px the cards sit in a swipeable row with the next one peeking
            in; focusable so the row can also be scrolled from the keyboard. */}
        <ol
          tabIndex={0}
          aria-label={`${content[track].label}: four steps`}
          className="-mx-4 m-0 flex list-none snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-4 [scrollbar-width:none] focus-visible:outline-offset-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-12 lg:overflow-visible lg:p-0 [&::-webkit-scrollbar]:hidden"
        >
          {[...steps.map((step) => ({ scene: step.icon, title: step.title, body: step.body })), { scene: "offer" as const, ...content.meet }].map(
            (card, i, all) => {
              const last = i === all.length - 1;
              // As in the reference, cards alternate: picture first, then words first.
              const wordsFirst = i % 2 === 1;
              const tone = tones[i];
              return (
                <m.li
                  // Step 03 is "Interview" in both tracks, so the track is part of the key.
                  key={last ? card.title : `${track}-${card.title}`}
                  initial={switched && !last ? { opacity: 0, y: 16 } : false}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.06, ease: ease.out } }}
                  // The site's card frame (see cardFrame): a slim translucent bezel around a coloured panel.
                  className={cn("group relative flex w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto", cardFrame, cardLift)}
                >
                  <div className={cn("flex w-full", cardPanel, tone.panel, wordsFirst ? "flex-col-reverse" : "flex-col")}>
                    <Scene name={card.scene} palette={tone.palette} className={cn("flex-1 px-6", wordsFirst ? "pt-5 pb-7" : "pt-7 pb-5")} />
                    <div className={cn("flex flex-col items-center gap-2 px-5 text-center", wordsFirst ? "pt-7" : "pb-7")}>
                      <span className={cn("rounded-full px-2.5 py-1 text-caption font-semibold tabular-nums", tone.pill)}>Step {pad(i + 1)}</span>
                      <h3 className="m-0 text-heading-lg text-balance">{card.title}</h3>
                      <p className={cn("m-0 max-w-[30ch] text-body-sm", tone.muted)}>{card.body}</p>
                    </div>
                  </div>
                  {last ? null : <Connector />}
                </m.li>
              );
            },
          )}
        </ol>

        <p className="m-0 mt-2 text-caption text-ink-on-brand/75 lg:hidden" aria-hidden="true">
          Swipe for the next step
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-12">
          <Button href={ctas[track].href} size="lg" data-track={ctas[track].event} data-location="how_it_works" className="w-full sm:w-auto">
            {ctas[track].label}
          </Button>
          <p className="m-0 text-body-sm text-ink-on-brand/75">
            {track === "companies" ? "Looking for a role instead? Switch to For candidates above." : "Hiring instead? Switch to For companies above."}
          </p>
        </div>
      </div>
    </>
  );
}
