"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { PracticeIcon } from "@/components/sections/home/PracticeIcon";
import { ArrowRight } from "@/components/site/icons";
import { Bracket } from "@/components/ui/Bracket";
import { whyTrc } from "@/content/home";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Each reason's colours: green, mint, white. Body text keeps full strength on green so it passes contrast. */
const looks = [
  { panel: "bg-surface-accent text-ink-on-accent", body: "text-ink-on-accent", tag: "bg-surface-raised text-ink-900", dial: "bg-surface-raised text-ink-900", rings: "-top-24 -right-20" },
  { panel: "bg-surface-brand text-ink-on-brand", body: "text-ink-on-brand/80", tag: "bg-surface-accent text-ink-on-accent", dial: "bg-surface-accent text-ink-on-accent", rings: "-right-24 -bottom-24" },
  { panel: "bg-surface-raised text-ink-900 shadow-sm ring-1 ring-line-100", body: "text-ink-700", tag: "bg-surface-brand text-ink-on-brand", dial: "bg-surface-accent text-ink-on-accent", rings: "-bottom-20 -left-16" },
];

/** Focus: the four practices, each with its looping icon and its number of role specialisms. */
function Practices() {
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
      {pillars.map((p) => (
        <li key={p.slug}>
          <Link
            href={p.href}
            className="o3-icon-host flex h-full flex-col items-start gap-2 rounded-2xl bg-surface-raised p-3 text-ink-900 no-underline transition-shadow duration-200 hover:shadow-card sm:flex-row sm:items-center sm:gap-3"
          >
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
              <PracticeIcon slug={p.slug} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-body-sm font-semibold">{p.short}</span>
              <span className="text-caption text-ink-500 tabular-nums">{p.roles.length} role specialisms</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Level: the levels we place as a staircase of pills, lowest at the bottom, each
 * step set further in. A light climbs it for good, one level after another.
 */
function Ladder() {
  const top = whyTrc.ladder.length - 1;
  return (
    <ol aria-label="Levels we place, lowest first" className="m-0 flex list-none flex-col-reverse items-start gap-1.5 p-0">
      {whyTrc.ladder.map((level, i) => (
        <li
          key={level}
          style={{ marginInlineStart: `${i * 9}%`, ["--i" as string]: i }}
          className={cn(
            "relative isolate overflow-hidden rounded-full px-3.5 py-1.5 text-caption font-semibold whitespace-nowrap",
            i === top ? "bg-surface-accent text-ink-on-accent" : "bg-surface-raised text-ink-900",
          )}
        >
          {i < top ? <span aria-hidden="true" className="o3-climb absolute inset-0 -z-10 bg-surface-accent/35 opacity-0" /> : null}
          {level}
        </li>
      ))}
    </ol>
  );
}

/** Backing: the parent firm's two published figures and a link to its site. */
function Backing() {
  const { parent } = site;
  const host = new URL(parent.url).hostname.replace(/^www\./, "");
  return (
    <div className="flex flex-col items-start gap-3">
      <dl className="m-0 grid w-full grid-cols-2 gap-2">
        {/* Plain figures, no count: the panel opening is the motion here, and a scroll-driven
            count measured while the panel was closed would start late. */}
        {whyTrc.backing.map((item) => (
          <div key={item.label} className="flex flex-col-reverse gap-1 rounded-2xl bg-surface-brand p-4 text-ink-on-brand">
            <dt className="text-caption text-ink-on-brand/80">{item.label}</dt>
            <dd className="m-0 text-stat tabular-nums">{item.value}</dd>
          </div>
        ))}
      </dl>
      <a
        href={parent.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-11 items-center gap-3 rounded-full ps-1.5 pe-1.5 text-body-sm font-semibold text-ink-900 no-underline ring-1 ring-line-200 transition-colors duration-150 hover:ring-ink-900"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-surface-brand">
          <Bracket size="sm" />
        </span>
        {host}
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
          <ArrowRight className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

const details = [<Practices key="focus" />, <Ladder key="level" />, <Backing key="backing" />];

/** True from 1024px, where the reasons sit side by side and open on hover too. */
function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

/**
 * Why TRC's three reasons as panels, one open at a time. From 1024px they stand
 * side by side at a fixed height and the open one widens (flex-grow) to show its
 * detail: the practices, the level ladder or the parent firm's figures. Pointing
 * at a panel opens it after a short pause; a click, a tap or Enter on its title
 * does too. Below 1024px they stack as an accordion. Each title is a button with
 * aria-expanded; a closed panel's detail is inert, so its links take no focus.
 */
export function O3Reasons() {
  const [active, setActive] = useState(0);
  const wide = useWide();
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0 lg:h-[560px] lg:flex-row lg:gap-4">
      {whyTrc.points.map((point, i) => {
        const open = i === active;
        const look = looks[i % looks.length];
        return (
          <li
            key={point.tag}
            data-reveal
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse" || !wide) return;
              window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => setActive(i), 140);
            }}
            onPointerLeave={() => window.clearTimeout(timer.current)}
            style={{ flexGrow: open ? 2.4 : 1 }}
            className={cn(
              "o3-icon-host relative isolate flex min-w-0 flex-col overflow-hidden rounded-[28px] p-5 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none sm:p-7 lg:basis-0",
              look.panel,
            )}
          >
            <span aria-hidden="true" className={cn("pointer-events-none absolute -z-10 size-56 rounded-full border-[18px] border-current opacity-[0.09]", look.rings)}>
              <span className="absolute inset-[22%] rounded-full border-[14px] border-current" />
            </span>

            <div className="flex items-start justify-between gap-4">
              <span aria-hidden="true" className="text-display-md leading-none tabular-nums opacity-25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className={cn("flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 motion-reduce:transition-none", look.dial, open && "rotate-90")}
              >
                <ArrowRight className="size-4" />
              </span>
            </div>

            <div className="mt-8 flex flex-1 flex-col justify-end lg:mt-0">
              <span className={cn("mb-4 self-start rounded-full px-3 py-1 text-caption font-semibold", look.tag)}>{point.tag}</span>
              <h3 className="m-0 text-heading-lg">
                {/* A closed panel's whole face is the button (the ::after covers it). */}
                <button
                  type="button"
                  id={`${id}-title-${i}`}
                  aria-expanded={open}
                  aria-controls={`${id}-detail-${i}`}
                  onClick={() => setActive(i)}
                  className={cn("cursor-pointer text-start text-inherit", !open && "after:absolute after:inset-0 after:content-['']")}
                >
                  {point.title}
                </button>
              </h3>
              <div
                id={`${id}-detail-${i}`}
                role="region"
                aria-labelledby={`${id}-title-${i}`}
                inert={!open}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className={cn("m-0 mt-3 max-w-[52ch] text-body", look.body)}>{point.body}</p>
                  <div className="mt-6">{details[i]}</div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
