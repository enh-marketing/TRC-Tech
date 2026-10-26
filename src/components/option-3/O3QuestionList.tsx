"use client";

import * as m from "motion/react-m";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "@/components/site/icons";
import type { FaqItem } from "@/content/home";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

type Group = { label: string; items: FaqItem[] };
type Contact = { title: string; body: string; cta: string; href: string };

/**
 * The FAQ after the agency's reference. On the left the title and intro, then
 * the two topics where the reference has two figures: each shows its question
 * count large, as a tab (WAI-ARIA tabs: left and right arrows, Home, End). On
 * the right the topic's questions as an accordion, one open at a time (native
 * details sharing a name), sliding open where supported (.faq-item). A new
 * topic's questions fade up (Motion, 250ms); nothing animates on first load.
 */
export function O3QuestionList({ groups, contact, children }: { groups: Group[]; contact: Contact; children: React.ReactNode }) {
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
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (to === null) return;
    e.preventDefault();
    choose(to);
    tabs.current[to]?.focus();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
      <div data-reveal className="flex flex-col lg:col-span-5">
        {children}
        <div role="tablist" aria-label="Question topics" className="mt-10 flex gap-10 sm:gap-14">
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
                id={`o3-faq-tab-${i}`}
                aria-selected={selected}
                aria-controls={`o3-faq-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex cursor-pointer flex-col items-start gap-2 text-start"
              >
                <span aria-hidden="true" className={cn("text-stat tabular-nums transition-colors duration-200", selected ? "text-accent-700" : "text-ink-500 group-hover:text-ink-700")}>
                  {String(group.items.length).padStart(2, "0")}
                </span>
                <span className={cn("border-b-2 pb-1 text-body-sm transition-colors duration-200", selected ? "border-surface-accent text-ink-900" : "border-transparent text-ink-700 group-hover:text-ink-900")}>
                  {group.label}
                </span>
                <span className="sr-only">, {group.items.length} questions</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 lg:col-span-6 lg:col-start-7">
        {groups.map((group, i) => (
          <div key={group.label} role="tabpanel" id={`o3-faq-panel-${i}`} aria-labelledby={`o3-faq-tab-${i}`} hidden={i !== active}>
            <m.ul
              key={i === active ? `on-${i}` : `off-${i}`}
              initial={switched && i === active ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: ease.out } }}
              className="m-0 list-none p-0"
            >
              {group.items.map((item, j) => (
                <li key={item.q} data-reveal className={cn(j > 0 && "border-t border-line-100")}>
                  <details name={`o3-faq-${i}`} open={j === 0} className="faq-item group">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                      <span className="text-heading-sm text-ink-900">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-900 text-surface-raised transition-colors duration-300 group-open:bg-surface-accent group-open:text-ink-on-accent motion-reduce:transition-none"
                      >
                        <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
                      </span>
                    </summary>
                    <p className="m-0 max-w-[60ch] pe-12 pb-7 text-body text-ink-700">{item.a}</p>
                  </details>
                </li>
              ))}
            </m.ul>
          </div>
        ))}

        <div data-reveal className="mt-6 flex flex-col gap-4 rounded-2xl bg-surface-brand p-6 text-ink-on-brand sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex flex-col gap-1">
            <p className="m-0 text-heading-md">{contact.title}</p>
            <p className="m-0 text-body-sm text-ink-on-brand/80">{contact.body}</p>
          </div>
          <Link
            href={contact.href}
            className="o3-press group inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-surface-accent px-5 text-btn-label text-ink-on-accent no-underline transition-colors duration-150 hover:bg-surface-accent-hover sm:self-auto"
          >
            {contact.cta}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </Link>
        </div>
      </div>
    </div>
  );
}
