import { Bracket, cardFrame, cardPanel, SectionHeader } from "@/components/ui";
import { Logo } from "@/components/site/Logo";
import { ArrowRight } from "@/components/site/icons";
import { whyTrc } from "@/content/home";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { PracticeIcon } from "./PracticeIcon";
import { RevealItem } from "./RevealItem";

const tones = [
  {
    card: "bg-surface-brand text-ink-on-brand",
    tag: "text-accent-on-brand",
    body: "text-ink-on-brand/75",
  },
  {
    card: "bg-surface-accent text-ink-on-accent",
    tag: "text-ink-on-accent",
    body: "text-ink-on-accent/90",
  },
  {
    card: "bg-surface-raised text-ink-900",
    tag: "text-accent-700",
    body: "text-ink-700",
  },
];

/** Card 1: the four practices, with the number of role specialisms each covers. */
function Practices() {
  return (
    <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
      {pillars.map((p) => (
        <li
          key={p.slug}
          className="flex flex-col items-start gap-3 rounded-md bg-ink-on-brand/[0.07] p-3.5 ring-1 ring-ink-on-brand/10 sm:flex-row sm:items-center"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
            <PracticeIcon slug={p.slug} />
          </span>
          <span className="flex flex-col">
            <span className="text-heading-sm">{p.short}</span>
            <span className="text-caption text-ink-on-brand/75">{p.roles.length} role specialisms</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Card 2: the seniority ladder. Bars grow, lowest first, as the card comes into view. */
function Ladder() {
  const n = whyTrc.ladder.length;
  return (
    <ol className="m-0 flex list-none flex-col gap-2 p-0" aria-label="Levels we hire for, lowest first">
      {whyTrc.ladder.map((level, i) => (
        <li key={level} className="grid grid-cols-[9.5rem_minmax(0,1fr)] items-center gap-4 text-body-sm">
          <span className={i === n - 1 ? "font-semibold" : "text-ink-on-accent/90"}>{level}</span>
          <span aria-hidden="true" className="h-3 overflow-hidden rounded-full bg-ink-on-accent/15">
            <span
              className="why-bar block h-full origin-left rounded-full bg-ink-on-accent"
              style={{ width: `${((i + 1) / n) * 100}%`, opacity: 0.45 + (0.55 * i) / (n - 1), animationDelay: `${i * 90}ms` }}
            />
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Card 3: the parent company's published figures. */
function Backing() {
  return (
    <dl className="m-0 grid grid-cols-2 gap-6 border-t border-line-200/40 pt-6">
      {whyTrc.backing.map((b) => (
        <div key={b.value} className="flex flex-col-reverse gap-1">
          <dt className="text-body-sm text-ink-700">{b.label}</dt>
          <dd className="m-0 text-display-lg text-ink-900 tabular-nums sm:text-display-xl">{b.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const visuals = [Practices, Ladder, Backing];

/**
 * Why TRC. On desktop the heading stays put on the left while three cards on
 * the right slide up and stack, each leaving its top edge showing. Below
 * 1024px the cards simply follow one another.
 */
export function WhyTrc() {
  return (
    <section aria-labelledby="why-trc-title" className="bg-surface-canvas">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="why-trc-title"
            eyebrow={whyTrc.eyebrow}
            title={whyTrc.title}
            titleTail={whyTrc.titleTail}
            intro={whyTrc.intro}
          />
          <a
            href={site.parent.url}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group flex w-fit items-center gap-5 rounded-full bg-surface-brand py-3 ps-5 pe-3 no-underline ring-1 ring-brand-edge"
          >
            <Logo height={32} />
            <span className="flex flex-col">
              <span className="text-caption text-ink-on-brand/70">Part of</span>
              <span className="text-heading-sm text-ink-on-brand">{site.parent.name}</span>
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
              <ArrowRight className="size-4 -rotate-45 transition-transform duration-200 ease-out group-hover:rotate-0 motion-reduce:transition-none" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <ul className="m-0 flex list-none flex-col gap-6 p-0 [--card-ground:var(--trc-surface-canvas)]">
            {whyTrc.points.map((point, i) => {
              const tone = tones[i];
              const Visual = visuals[i];
              return (
                <RevealItem
                  key={point.title}
                  className={cn("why-card relative flex flex-col lg:sticky lg:top-(--stack-top)", cardFrame)}
                  // Each card sticks a little lower than the one before, so the stack shows every edge.
                  // The stacking offset applies only while sticky; on a relative card it would push the card down.
                  style={{ "--stack-top": `calc(7rem + ${i * 2.25}rem)` } as React.CSSProperties}
                >
                  <div className={cn("relative isolate flex flex-1 flex-col overflow-hidden p-6 sm:p-9", cardPanel, tone.card)}>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-8 right-8 -z-10 size-24 border-t-[18px] border-r-[18px] border-current opacity-[0.08]"
                    />
                    <span className={cn("text-eyebrow uppercase tabular-nums", tone.tag)}>
                      {String(i + 1).padStart(2, "0")} · {point.tag}
                    </span>
                    <h3 className="m-0 mt-5 max-w-[20ch] text-heading-lg sm:text-display-md">{point.title}</h3>
                    <p className={cn("m-0 mt-3 max-w-[50ch] text-body", tone.body)}>{point.body}</p>
                    <div className="mt-auto pt-6 sm:pt-8">
                      <Visual />
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </ul>
          {/* Outside the stack, so it never slides over the cards. Preview only. */}
          {site.preview ? (
            <div data-reveal className={cardFrame}>
              <div className={cn("flex flex-col gap-3 bg-surface-raised p-6 sm:p-9", cardPanel)}>
                <span className="flex items-center gap-3">
                  <Bracket size="sm" />
                  <span className="text-eyebrow text-ink-500 uppercase tabular-nums">
                    {String(whyTrc.points.length + 1).padStart(2, "0")} · Pool
                  </span>
                </span>
                <h3 className="m-0 text-heading-lg text-ink-900">{whyTrc.pendingPoint.title}</h3>
                <p className="m-0 max-w-[50ch] text-body text-ink-700">{whyTrc.pendingPoint.body}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
