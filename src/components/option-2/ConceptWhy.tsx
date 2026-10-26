import { ArrowRight } from "@/components/site/icons";
import { PracticeIcon } from "@/components/sections/home/PracticeIcon";
import { whyTrc } from "@/content/home";
import { pillars, site } from "@/content/site";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { Label, Title, spread, wrap } from "./shared";

/** Point 01: the four practices and how many roles each covers. */
function Practices() {
  return (
    <ul className="m-0 grid list-none gap-px overflow-hidden rounded-xl bg-line-100 p-0 ring-1 ring-line-100 sm:grid-cols-2">
      {pillars.map((p) => (
        <li key={p.slug} className="flex items-center gap-4 bg-surface-100 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
            <PracticeIcon slug={p.slug} className="size-5" />
          </span>
          <span className="flex flex-col">
            <span className="text-heading-sm text-ink-900">{p.short}</span>
            <span className="text-caption text-ink-500 tabular-nums">{p.roles.length} role specialisms</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Point 02: the levels we place, lowest first, as a rising scale (bars grow on phones). */
function Ladder() {
  const n = whyTrc.ladder.length;
  return (
    <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-6 sm:gap-2">
      {whyTrc.ladder.map((level, i) => (
        <li key={level} className="flex items-center gap-3 sm:flex-col sm:items-stretch sm:gap-3">
          <span className={cn("w-36 shrink-0 text-body-sm sm:order-2 sm:w-auto", i === n - 1 ? "font-semibold text-ink-900" : "text-ink-700")}>{level}</span>
          <span
            aria-hidden="true"
            className="block h-2 w-(--w) rounded-full bg-surface-accent sm:order-1 sm:w-full"
            style={{ "--w": `${((i + 1) / n) * 100}%`, opacity: 0.35 + (0.65 * i) / (n - 1) } as React.CSSProperties}
          />
        </li>
      ))}
    </ol>
  );
}

/** Point 03: the parent firm's two published figures. */
function Backing() {
  return (
    <dl className="m-0 grid grid-cols-2 gap-6">
      {whyTrc.backing.map((f) => (
        <div key={f.label} className="flex flex-col gap-2 border-s-2 border-surface-accent ps-5">
          <dt className="order-2 text-body-sm text-ink-700">{f.label}</dt>
          <dd className="order-1 m-0 text-[clamp(2.75rem,2rem+2vw,3.75rem)] leading-none font-semibold tracking-[-0.03em] text-ink-900 tabular-nums">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const visuals = [Practices, Ladder, Backing];

/**
 * Why TRC as an article: the title column stays in view on wide screens while
 * the three points read down the right, each with its evidence underneath.
 * Ruled, not carded; the points are the same as concept 1's, word for word.
 */
export function ConceptWhy() {
  return (
    <section aria-labelledby="o2-why-title" className={`bg-surface-100 ${spread}`}>
      <div className={`${wrap} grid gap-14 lg:grid-cols-12 lg:gap-x-8`}>
        <div className="lg:col-span-5">
          <div data-reveal className="flex flex-col items-start gap-6 lg:sticky lg:top-32">
            <Label index="04">{whyTrc.eyebrow}</Label>
            <Title id="o2-why-title" lead={whyTrc.title} tail={whyTrc.titleTail} className="o2-title" />
            <p className="m-0 max-w-[40ch] text-body-lg text-ink-700">{whyTrc.intro}</p>
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center gap-4 no-underline"
            >
              <span className="flex flex-col">
                <span className="text-caption text-ink-500">Part of</span>
                <span className="text-heading-sm text-ink-900 group-hover:underline group-hover:underline-offset-4">{site.parent.name}</span>
              </span>
              <span className="flex size-10 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
                <ArrowRight className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          {whyTrc.points.map((point, i) => {
            const Visual = visuals[i];
            return (
              <Fragment key={point.title}>
                {i > 0 ? <span aria-hidden="true" data-reveal="rule" className="block h-px bg-line-200" /> : null}
                <article data-reveal className={cn("flex flex-col gap-5 pb-12", i > 0 && "pt-12")}>
                  <Label index={String(i + 1).padStart(2, "0")}>{point.tag}</Label>
                  <h3 className="m-0 text-heading-lg text-ink-900 sm:text-display-sm">{point.title}</h3>
                  <p className="m-0 max-w-[52ch] text-body-lg text-ink-700">{point.body}</p>
                  <div className="mt-3">
                    <Visual />
                  </div>
                </article>
              </Fragment>
            );
          })}
          {/* Preview only, until TRC confirms the figure. */}
          {site.preview ? (
            <article data-reveal className="flex flex-col gap-4 rounded-xl bg-surface-200 p-7">
              <Label index={String(whyTrc.points.length + 1).padStart(2, "0")}>Pool</Label>
              <h3 className="m-0 text-heading-lg text-ink-900">{whyTrc.pendingPoint.title}</h3>
              <p className="m-0 text-body text-ink-700">{whyTrc.pendingPoint.body}</p>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
