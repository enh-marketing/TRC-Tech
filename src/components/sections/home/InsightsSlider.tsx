"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Insight } from "@/content/home";
import { cardFrame, cardLift, cardPanel } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Card tones, cycled in order. Brand and accent fills are fixed in both
 * themes; the tint and neutral follow the theme, so their text does too.
 */
const tones = [
  { card: "bg-surface-brand text-ink-on-brand", muted: "text-ink-on-brand/70" },
  { card: "bg-surface-accent/25 text-ink-900", muted: "text-ink-700" },
  { card: "bg-surface-accent text-ink-on-accent", muted: "text-ink-on-accent/90" },
  { card: "bg-surface-300 text-ink-900", muted: "text-ink-700" },
];

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

/**
 * Tall, coloured article cards in a row that runs off the right edge. The
 * active card sits at full size and the rest step back; arrows, the
 * keyboard's left and right keys, a swipe, or tabbing onto a card move the
 * row. It never moves on its own. Each card carries an oversized version of
 * the logo's bracket as a watermark.
 */
export function InsightsSlider({ items }: { items: Insight[] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const last = items.length - 1;
  const go = (to: number) => setIndex(Math.max(0, Math.min(last, to)));

  const arrow =
    "flex size-12 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Latest insights"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
        touchX.current = null;
      }}
      className="insights flex flex-col gap-8"
    >
      {/* The row starts at the content column's left edge and runs to the screen edge. */}
      {/* The slider positions cards itself; undo the scroll a browser applies when a hidden card gets focus. */}
      <div className="overflow-hidden py-6" onScroll={(e) => (e.currentTarget.scrollLeft = 0)}>
        <ul
          className="insights-track m-0 flex list-none items-center gap-[var(--gap)] transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(calc(${-index} * (var(--card-w) + var(--gap))))` }}
        >
          {items.map((post, i) => {
            const tone = tones[i % tones.length];
            const active = i === index;
            return (
              <li
                key={post.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
                onFocus={() => setIndex(i)}
                className={cn(
                  "w-[var(--card-w)] shrink-0 transition-transform duration-500 ease-out motion-reduce:transition-none",
                  // Inactive cards shrink towards the active one, so the gap beside it stays even
                  // and the card before it still peeks in from the left edge.
                  active ? "scale-100" : "scale-[0.88]",
                  i < index ? "origin-right" : i > index ? "origin-left" : "origin-center",
                )}
              >
                <article className={cn("group relative", cardFrame, cardLift)}>
                  <div className={cn("relative isolate flex aspect-[4/5] flex-col overflow-hidden p-6 sm:p-7", cardPanel, tone.card)}>
                    {/* The logo's bracket, oversized, as a watermark. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-[7%] right-[7%] -z-10 aspect-square w-[62%] border-t-[40px] border-r-[40px] border-current opacity-[0.1] transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:translate-y-2"
                    />
                    <div className="mt-auto flex flex-col gap-3">
                      <p className={cn("m-0 text-eyebrow uppercase", tone.muted)}>{post.audience}</p>
                      <h3 className="m-0 text-heading-lg">
                        <Link
                          href={post.href}
                          className="text-inherit no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className={cn("m-0 text-body-sm", tone.muted)}>{post.excerpt}</p>
                      <p className={cn("m-0 border-t border-current/15 pt-3 text-caption tabular-nums", tone.muted)}>
                        <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
                        <span aria-hidden="true"> · </span>
                        {post.readMinutes} min read
                      </p>
                    </div>
                  </div>
                  {/* The link covers the card, so the focus ring is drawn on the card. */}
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-focus-ring ring-offset-2 opacity-0 group-has-[a:focus-visible]:opacity-100" />
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous article"
          className={cn(arrow, "border-line-200 bg-surface-100 text-ink-900 hover:border-ink-900")}
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label="Next article"
          className={cn(arrow, "border-brand-edge bg-surface-brand text-ink-on-brand hover:bg-surface-brand-hover")}
        >
          <Arrow direction="right" />
        </button>
        <p className="m-0 ms-2 text-body-sm text-ink-500 tabular-nums" aria-hidden="true">
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}
