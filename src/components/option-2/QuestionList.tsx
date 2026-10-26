"use client";

import * as m from "motion/react-m";
import { useRef, useState } from "react";
import { Plus } from "@/components/site/icons";
import type { FaqItem } from "@/content/home";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Group = { label: string; items: FaqItem[] };

/**
 * The FAQ topics as a vertical tab list (WAI-ARIA tabs: up and down arrows,
 * Home, End) and each topic's questions as a ruled list of native details
 * elements: one open at a time per topic, sliding open where the browser
 * supports it (.faq-item). A new topic's questions fade up (Motion, 250ms);
 * nothing animates on first load.
 */
export function QuestionList({ groups, children }: { groups: Group[]; children?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [switched, setSwitched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function choose(i: number) {
    setActive(i);
    setSwitched(true);
  }
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = groups.length - 1;
    const to =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (to === null) return;
    e.preventDefault();
    choose(to);
    tabs.current[to]?.focus();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
      <div className="flex flex-col gap-10 lg:col-span-4">
        {children}
        <div role="tablist" aria-label="Question topics" aria-orientation="vertical" data-reveal className="flex flex-col gap-2">
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
                id={`o2-faq-tab-${i}`}
                aria-selected={selected}
                aria-controls={`o2-faq-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-full px-6 text-start text-heading-sm transition-colors duration-200",
                  selected ? "bg-surface-accent text-ink-on-accent" : "text-ink-700 ring-1 ring-line-200 hover:text-ink-900 hover:ring-ink-900",
                )}
              >
                {group.label}
                <span aria-hidden="true" className="text-caption tabular-nums opacity-80">{String(group.items.length).padStart(2, "0")}</span>
                <span className="sr-only">, {group.items.length} questions</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 lg:col-span-7 lg:col-start-6">
        {groups.map((group, i) => (
          <div key={group.label} role="tabpanel" id={`o2-faq-panel-${i}`} aria-labelledby={`o2-faq-tab-${i}`} hidden={i !== active}>
            <m.ul
              key={i === active ? `on-${i}` : `off-${i}`}
              initial={switched && i === active ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: ease.out } }}
              className="m-0 list-none border-b border-line-200 p-0"
            >
              {group.items.map((item, j) => (
                <li key={item.q} data-reveal className="border-t border-line-200">
                  <details name={`o2-faq-${i}`} open={j === 0} className="faq-item group">
                    <summary className="flex min-h-11 cursor-pointer list-none items-start gap-5 py-6 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                      <span className="w-7 shrink-0 pt-1 text-body-sm text-ink-500 tabular-nums group-open:text-accent-700">{String(j + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-heading-md text-ink-900">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-900 ring-1 ring-line-200 transition duration-300 group-open:bg-surface-accent group-open:text-ink-on-accent group-open:ring-surface-accent motion-reduce:transition-none"
                      >
                        <Plus className="size-5 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" />
                      </span>
                    </summary>
                    <p className="m-0 max-w-[62ch] ps-12 pe-2 pb-7 text-body-lg text-ink-700 sm:pe-14">{item.a}</p>
                  </details>
                </li>
              ))}
            </m.ul>
          </div>
        ))}
      </div>
    </div>
  );
}
