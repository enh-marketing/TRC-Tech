"use client";

import * as m from "motion/react-m";
import { useRef, useState } from "react";
import { Button } from "@/components/ui";
import { howItWorks } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { SectionHead, spread, wrap } from "./shared";

type TrackKey = "companies" | "candidates";
const keys: TrackKey[] = ["companies", "candidates"];
const ctas = {
  companies: { label: howItWorks.companies.cta, href: site.cta.hire.href, event: "hire_cta_click" },
  candidates: { label: howItWorks.candidates.cta, href: site.cta.apply.href, event: "apply_cta_click" },
};

/**
 * How it works as a numbered line rather than illustrated cards: the chosen
 * track's three steps and the shared fourth sit on one rule, step 04 filled
 * green because both tracks end there. A two-way switch (WAI-ARIA tabs: arrow
 * keys, Home, End) chooses the track; on a switch the first three steps come
 * in one after another (Motion) and step 04 stays put. Below 1024px the steps
 * stack on a vertical rule.
 */
export function ConceptProcess() {
  const [track, setTrack] = useState<TrackKey>("companies");
  const [switched, setSwitched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const steps = [...howItWorks[track].steps, howItWorks.meet];

  function choose(next: TrackKey) {
    setTrack(next);
    setSwitched(true);
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next: TrackKey = e.key === "Home" ? "companies" : e.key === "End" ? "candidates" : track === "companies" ? "candidates" : "companies";
    choose(next);
    tabs.current[keys.indexOf(next)]?.focus();
  }

  return (
    <section id="how-it-works" aria-labelledby="o2-process-title" className={`bg-surface-canvas ${spread}`}>
      <div className={wrap}>
        <SectionHead id="o2-process-title" index="03" label={howItWorks.eyebrow} title={howItWorks.title} tail={howItWorks.titleTail} intro={howItWorks.intro}>
          <div role="tablist" aria-label="Choose a track" onKeyDown={onKeyDown} className="inline-flex rounded-full bg-surface-200 p-1 ring-1 ring-line-100">
            {keys.map((k, i) => {
              const selected = track === k;
              return (
                <button
                  key={k}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`o2-tab-${k}`}
                  aria-selected={selected}
                  aria-controls="o2-process-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(k)}
                  className={cn(
                    "min-h-11 cursor-pointer rounded-full px-5 text-body-sm transition-colors duration-200",
                    selected ? "bg-surface-100 font-semibold text-ink-900 shadow-sm" : "text-ink-700 hover:text-ink-900",
                  )}
                >
                  {howItWorks[k].label}
                </button>
              );
            })}
          </div>
        </SectionHead>

        <div role="tabpanel" id="o2-process-panel" aria-labelledby={`o2-tab-${track}`} data-reveal className="relative mt-16 lg:mt-24">
          {/* The rule the steps sit on: across on wide screens, down on narrow ones. */}
          <span aria-hidden="true" data-reveal="rule" className="absolute top-6 right-0 left-0 hidden h-px bg-line-200 lg:block" />
          <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-line-200 lg:hidden" />
          <ol className="relative m-0 grid list-none gap-10 p-0 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => {
              const last = i === steps.length - 1;
              return (
                <m.li
                  // Step 03 is "Interview" in both tracks, so the track is part of the key.
                  key={last ? step.title : `${track}-${step.title}`}
                  initial={switched && !last ? { opacity: 0, y: 14 } : false}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.06, ease: ease.out } }}
                  className="flex gap-5 lg:flex-col lg:gap-7"
                >
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full text-body-sm font-semibold tabular-nums",
                      last ? "bg-surface-accent text-ink-on-accent" : "bg-surface-canvas text-ink-900 ring-1 ring-line-200",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2 pt-2 lg:pt-0 lg:pe-4">
                    <h3 className="m-0 text-heading-md text-ink-900">{step.title}</h3>
                    <p className="m-0 text-body text-ink-700">{step.body}</p>
                  </div>
                </m.li>
              );
            })}
          </ol>
        </div>

        <div data-reveal className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-20">
          <Button href={ctas[track].href} size="lg" data-track={ctas[track].event} data-location="how_it_works" className="w-full sm:w-auto">
            {ctas[track].label}
          </Button>
          <p className="m-0 text-body-sm text-ink-700">
            {track === "companies" ? "Looking for a role instead? Switch to For candidates above." : "Hiring instead? Switch to For companies above."}
          </p>
        </div>
      </div>
    </section>
  );
}
