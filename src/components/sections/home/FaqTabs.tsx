"use client";

import * as m from "motion/react-m";
import { useRef, useState } from "react";
import { Button, cardFrame, cardPanel, SectionHeader } from "@/components/ui";
import { Plus } from "@/components/site/icons";
import type { FaqItem } from "@/content/home";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Group = { label: string; items: FaqItem[] };

/**
 * Topic pills on the left choose which questions show on the right. The pills
 * follow the WAI-ARIA tabs pattern: arrow keys move between topics, Home and
 * End jump to the ends. Questions are native details elements sharing a name
 * per topic, so opening one closes the others with no JavaScript. The first
 * question in each topic starts open. Where the browser supports it, the
 * answer slides open (see .faq-item in globals.css).
 */
export function FaqTabs({
  header,
  groups,
  contact,
}: {
  header: { eyebrow: string; title: string; titleTail: string; intro: string };
  groups: Group[];
  contact: { title: string; body: string; cta: string; href: string };
}) {
  const [active, setActive] = useState(0);
  // The questions animate only when the topic changes, not on first load.
  const [switched, setSwitched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = groups.length - 1;
    const to =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (to === null) return;
    e.preventDefault();
    setActive(to);
    setSwitched(true);
    tabs.current[to]?.focus();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
        <SectionHeader
          id="faq-title"
          eyebrow={header.eyebrow}
          title={header.title}
          titleTail={header.titleTail}
          intro={header.intro}
        />
        <div role="tablist" aria-label="Question topics" data-reveal className="flex flex-wrap gap-2">
          {groups.map((group, i) => {
            const selected = i === active;
            return (
              <button
                key={group.label}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`faq-tab-${i}`}
                aria-selected={selected}
                aria-controls={`faq-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => {
                  setActive(i);
                  setSwitched(true);
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "min-h-11 cursor-pointer rounded-full border px-5 text-body-sm transition-colors duration-150",
                  // Inverted ink, so the selected topic stands out in both themes
                  // (deep teal on light; near-white on dark).
                  selected
                    ? "border-surface-accent bg-surface-accent text-ink-on-accent"
                    : "border-line-200 bg-transparent text-ink-900 hover:border-ink-900",
                )}
              >
                {group.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-6">
        {groups.map((group, i) => (
          <div key={group.label} role="tabpanel" id={`faq-panel-${i}`} aria-labelledby={`faq-tab-${i}`} hidden={i !== active}>
            {/* Each question is a numbered card; the open one fills deep teal and its plus turns into a close mark.
                Keyed on whether it is the active topic, so a newly chosen topic remounts and its
                questions fade up (Motion, 250ms). */}
            <m.div
              key={i === active ? `on-${i}` : `off-${i}`}
              initial={switched && i === active ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: ease.out } }}
              className="flex flex-col gap-3"
            >
              {group.items.map((item, j) => (
                <div key={item.q} data-reveal className={cardFrame}>
                  <details
                    name={`faq-${i}`}
                    open={j === 0}
                    className={cn("faq-item group bg-surface-100 outline-offset-2 outline-focus-ring transition-[background-color,box-shadow] duration-300 open:bg-surface-brand has-[summary:focus-visible]:outline-2 motion-reduce:transition-none [&:not([open]):hover]:ring-line-200", cardPanel)}
                  >
                    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 p-5 focus-visible:outline-none sm:gap-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span className="w-7 shrink-0 text-eyebrow text-ink-500 tabular-nums transition-colors duration-300 group-open:text-accent-on-brand">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-heading-sm text-ink-900 transition-colors duration-300 group-open:text-ink-on-brand">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-900 ring-1 ring-line-200 transition duration-300 group-open:bg-surface-accent group-open:text-ink-on-accent group-open:ring-surface-accent motion-reduce:transition-none"
                      >
                        <Plus className="size-5 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" />
                      </span>
                    </summary>
                    {/* Indented to line up with the question, past its number. */}
                    <p className="m-0 max-w-[60ch] ps-16 pe-5 pb-6 text-body text-ink-on-brand/80 sm:ps-[4.5rem] sm:pe-6">{item.a}</p>
                  </details>
                </div>
              ))}
            </m.div>
          </div>
        ))}

        {/* A green tint, so it reads as the way out of the list rather than one more question. */}
        <div data-reveal className={cardFrame}>
          <div className={cn("flex flex-wrap items-center justify-between gap-x-8 gap-y-4 bg-[color-mix(in_srgb,var(--trc-surface-accent)_18%,var(--trc-surface-100))] p-6 sm:p-7", cardPanel)}>
            <div className="flex flex-col gap-1">
              <h3 className="m-0 text-heading-md text-ink-900">{contact.title}</h3>
              <p className="m-0 max-w-[44ch] text-body-sm text-ink-700">{contact.body}</p>
            </div>
            <Button href={contact.href} variant="brand">
              {contact.cta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
