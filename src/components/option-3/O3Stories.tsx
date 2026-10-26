"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/site/icons";
import { Bracket } from "@/components/ui";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

export type Story = {
  title: string;
  excerpt: string;
  audience: string;
  dateTime: string;
  date: string;
  readMinutes: number;
  href: string;
  photo: string | null;
};

/** Pixels within which the row counts as at a card, or at either end. */
const NEAR = 24;

const control =
  "o3-press flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-200 text-ink-900 transition-colors duration-150 hover:border-ink-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-200";

/**
 * The insights row after the agency's reference: the heading on the left with
 * previous, next and "All insights" on the right, then a row of article cards
 * that starts at the content column and runs off the right edge. It scrolls
 * natively (swipe, trackpad, keyboard once focused), snaps to each card, and the
 * arrows step one card at a time, greyed out at either end. Nothing moves on
 * its own; with reduced motion the arrows jump instead of gliding.
 */
export function O3Stories({ items, allHref, children }: { items: Story[]; allHref: string; children: React.ReactNode }) {
  const row = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = row.current;
    if (!el) return;
    // The last card often cannot reach the start line, so the row's true end sits a few
    // pixels past it; within NEAR of either end counts as the end.
    setAtStart(el.scrollLeft <= NEAR);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - NEAR);
  }, []);

  useEffect(() => {
    const el = row.current;
    update();
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  /**
   * Scrolls to the next or previous card's snap position. A relative scrollBy is
   * not enough: with mandatory snapping, Chrome leaves a smooth scrollBy from the
   * very end of the row where it is.
   */
  function step(dir: 1 | -1) {
    const el = row.current;
    if (!el) return;
    // The row's padding equals its scroll padding (.o3-bleed); padding resolves to pixels, scroll padding stays a calc().
    const inset = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const max = el.scrollWidth - el.clientWidth;
    const stops = Array.from(el.querySelectorAll("li"), (li) => Math.min(max, Math.max(0, li.offsetLeft - inset)));
    const now = el.scrollLeft;
    const target = dir > 0 ? stops.find((x) => x > now + NEAR) : stops.reverse().find((x) => x < now - NEAR);
    if (target === undefined) return;
    el.scrollTo({ left: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-x-10 gap-y-6 px-5 sm:px-8 lg:px-12">
        <div data-reveal className="max-w-[760px]">
          {children}
        </div>
        <div data-reveal className="flex items-center gap-3">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-controls="o3-stories" className={control}>
            <ArrowRight className="size-5 rotate-180" />
            <span className="sr-only">Previous articles</span>
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-controls="o3-stories" className={control}>
            <ArrowRight className="size-5" />
            <span className="sr-only">Next articles</span>
          </button>
          <Link
            href={allHref}
            className="o3-press group ms-2 inline-flex min-h-12 items-center gap-3 rounded-full border border-ink-900 ps-5 pe-1.5 text-btn-label text-ink-900 no-underline transition-colors duration-150 hover:bg-ink-900/[0.06]"
          >
            All insights
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
          </Link>
        </div>
      </div>

      {/* No p-0 here: a padding utility would override .o3-bleed's side padding. Relative, so
          each card's offsetLeft is measured from the row (see step). */}
      <ul
        ref={row}
        id="o3-stories"
        aria-label="Latest articles"
        tabIndex={0}
        data-reveal
        className="o3-bleed relative m-0 mt-10 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-6 sm:gap-5 lg:mt-14"
      >
        {items.map((post) => (
          <li key={post.title} className="w-[280px] shrink-0 snap-start sm:w-[340px] lg:w-[380px]">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface-raised shadow-sm ring-1 ring-line-100 transition-shadow duration-300 hover:shadow-card has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-focus-ring">
              {/* The photo settles as the row comes in (the wrapper, via ScrollReveal) and zooms
                  a touch on hover (the image, via CSS): two elements, so the two never fight. */}
              <div aria-hidden="true" data-reveal="media" className="relative aspect-[16/9] overflow-hidden bg-surface-brand">
                {post.photo ? (
                  <div data-media className="absolute inset-0">
                    <Image src={post.photo} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 280px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                  </div>
                ) : (
                  <Bracket size="lg" className="absolute top-6 left-6" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                {/* Each part keeps its dot, so a wrapped line never starts with one. */}
                <p className="m-0 flex flex-wrap items-center gap-x-2 text-caption text-ink-500">
                  <span className="whitespace-nowrap">
                    <span className="text-eyebrow text-accent-700 uppercase">{post.audience}</span>
                    <span aria-hidden="true"> ·</span>
                  </span>
                  <span className="whitespace-nowrap">
                    <time dateTime={post.dateTime}>{post.date}</time>
                    <span aria-hidden="true"> ·</span>
                  </span>
                  <span className="whitespace-nowrap tabular-nums">{post.readMinutes} min read</span>
                </p>
                <h3 className="m-0 mt-3 text-heading-lg text-ink-900">
                  {/* The title is the link; it stretches over the whole card. */}
                  <Link href={post.href} className="text-inherit no-underline after:absolute after:inset-0 focus-visible:outline-none">
                    {post.title}
                  </Link>
                </h3>
                <span aria-hidden="true" className="my-5 block h-px bg-line-200" />
                <p className="m-0 line-clamp-3 text-body-sm text-ink-700">{post.excerpt}</p>
                <span aria-hidden="true" className="mt-auto flex items-center gap-2.5 pt-6 text-caption font-medium text-ink-900">
                  Read the article
                  <span className={cn("flex size-6 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none")}>
                    <ArrowRight className="size-3.5" />
                  </span>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
