import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import { howItWorks } from "@/content/home";
import { site } from "@/content/site";
import { O3Sequence } from "./O3Sequence";
import { frame } from "./shared";

type Track = typeof howItWorks.companies | typeof howItWorks.candidates;
type StepIconName = Track["steps"][number]["icon"];

/**
 * The step icons, on the site's 24px, 1.5px outline grid. Each moving part has an
 * o3-p-* class, so it loops in concept 3 (globals.css) and quickens on hover.
 */
function StepIcon({ name, className = "size-5" }: { name: StepIconName; className?: string }) {
  const parts: Record<StepIconName, React.ReactNode> = {
    brief: (
      <>
        <path d="M6 3.75h8.25L18 7.5v12.75H6V3.75Z" />
        <path d="M14 3.75V7.5h4" />
        <path className="o3-p-write" d="M9 12h6" />
        <path className="o3-p-write" style={{ animationDelay: "-0.8s" }} d="M9 15.75h4" />
      </>
    ),
    shortlist: (
      <>
        <path d="M11 6.5h9M11 12h9M11 17.5h6" />
        <path className="o3-p-pop" d="m4 6.75 1.5 1.5L8 5.75" />
        <path className="o3-p-pop" style={{ animationDelay: "-0.8s" }} d="m4 12.25 1.5 1.5L8 11.25" />
        <path className="o3-p-pop" style={{ animationDelay: "-1.6s" }} d="m4 17.75 1.5 1.5L8 16.75" />
      </>
    ),
    interview: (
      <>
        <path className="o3-p-lift" d="M5 4h8a1.5 1.5 0 0 1 1.5 1.5V10a1.5 1.5 0 0 1-1.5 1.5H8.5l-3 2.5v-2.5H5A1.5 1.5 0 0 1 3.5 10V5.5A1.5 1.5 0 0 1 5 4Z" />
        <path className="o3-p-lift" style={{ animationDelay: "-1.2s" }} d="M17.5 9H19a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-1.5 1.5h-.5V19l-3-2.5H11A1.5 1.5 0 0 1 9.5 15v-1" />
      </>
    ),
    upload: (
      <>
        <path d="M4 14.5v4A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-4" />
        <path className="o3-p-lift" d="M12 15.5v-11M8 8.5l4-4 4 4" />
      </>
    ),
    bell: (
      <>
        <path className="o3-p-ring" d="M12 3.5A5.5 5.5 0 0 0 6.5 9v4.25L5 15.5v1h14v-1l-1.5-2.25V9A5.5 5.5 0 0 0 12 3.5Z" />
        <path className="o3-p-bob" d="M10 19.5a2 2 0 0 0 4 0" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {parts[name]}
    </svg>
  );
}

/** A building for companies, a person for candidates (concept 1's track icons). */
function TrackIcon({ kind, className }: { kind: "companies" | "candidates"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === "companies" ? (
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

/**
 * The line a lane's steps sit on, with a green dot that travels along it for good
 * (globals.css, .o3-traveller). Down the left on phones, across from 768px; from
 * 1024px it runs on out of the lane and ends at the shared step's card.
 */
function Rail({ delay }: { delay: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[22px] bottom-0 left-[17px] w-2.5 overflow-hidden md:top-[17px] md:right-0 md:bottom-auto md:left-[22px] md:h-2.5 md:w-auto lg:-right-11"
      >
        <span data-seq="rail" className="absolute top-0 bottom-0 left-1 w-0.5 rounded-full bg-line-100 md:top-1 md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto" />
        <span className="o3-traveller absolute inset-0" style={{ animationDelay: delay }}>
          <span className="absolute bottom-0 left-0 size-2.5 rounded-full bg-surface-accent md:top-0 md:right-0 md:bottom-auto md:left-auto" />
        </span>
      </span>
      {/* Where the line meets the shared step's card. */}
      <span
        aria-hidden="true"
        data-seq="end"
        className="absolute top-[22px] -right-11 hidden size-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent ring-4 ring-surface-brand lg:flex"
      >
        <ArrowRight className="size-4" />
      </span>
    </>
  );
}

/** One track as a white lane: its label and button, then its three steps on the rail. */
function Lane({ track, kind, href, event, delay }: { track: Track; kind: "companies" | "candidates"; href: string; event: string; delay: string }) {
  return (
    <div
      data-reveal
      data-seq-lane
      className="o3-icon-host grid gap-6 rounded-[28px] bg-surface-raised p-5 text-ink-900 shadow-sm ring-1 ring-line-100 transition-shadow duration-300 hover:shadow-card sm:grid-cols-[1fr_auto] sm:items-center sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-brand text-ink-on-brand">
          <TrackIcon kind={kind} className="o3-loop-bob size-5" />
        </span>
        <h3 className="m-0 text-heading-md">{track.label}</h3>
      </div>

      {/* Last on phones, after the steps; beside the label from 640px. */}
      <Link
        href={href}
        data-track={event}
        data-location="how_it_works"
        className="o3-press group order-last inline-flex min-h-11 items-center gap-3 justify-self-start rounded-full ps-5 pe-1.5 text-btn-label text-ink-900 no-underline ring-1 ring-line-200 transition-colors duration-150 hover:ring-ink-900 sm:order-none"
      >
        {track.cta}
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
          <ArrowRight className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
        </span>
      </Link>

      <ol className="relative m-0 grid list-none gap-7 p-0 sm:col-span-2 md:grid-cols-3 md:gap-6">
        <Rail delay={delay} />
        {track.steps.map((step, i) => (
          <li key={step.title} className="grid grid-cols-[2.75rem_1fr] gap-x-4 md:flex md:flex-col md:gap-5">
            <span aria-hidden="true" data-seq="node" className="relative flex size-11 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent ring-4 ring-surface-raised">
              <StepIcon name={step.icon} />
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="text-caption font-semibold text-ink-500 tabular-nums">Step {String(i + 1).padStart(2, "0")}</span>
              <h4 className="m-0 text-heading-md">{step.title}</h4>
              <p className="m-0 text-body-sm text-ink-700">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Two lines coming together into one, ending at a point: the section's idea, drawn. The dashes flow. */
function MergeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 72" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path className="o3-flow" d="M8 12h30c32 0 36 24 66 24" />
      <path className="o3-flow" d="M8 60h30c32 0 36-24 66-24" />
      <path className="o3-flow" d="M104 36h34" />
      <circle cx="8" cy="12" r="4" fill="currentColor" stroke="none" />
      <circle cx="8" cy="60" r="4" fill="currentColor" stroke="none" />
      <circle cx="148" cy="36" r="7" fill="currentColor" stroke="none" />
      <circle className="o3-p-pop" cx="148" cy="36" r="12" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * How it works, concept 3's own take: both tracks at once instead of a switch.
 * Companies and candidates each get a white lane with three steps on a line,
 * a dot running along each; from 1024px both lines run out of their lanes into
 * one tall green card, the shared fourth step, so "two tracks, one outcome" is
 * the layout itself. Below 1024px the card follows the lanes, joined by a round
 * arrow. The first time each lane comes into view its line draws and its steps
 * appear in order (O3Sequence). Icons loop and quicken while a lane is hovered;
 * nothing moves with reduced motion.
 */
export function O3Process() {
  const { hire, apply } = site.cta;

  return (
    <section id="how-it-works" aria-labelledby="o3-process-title" className="bg-surface-brand py-20 text-ink-on-brand lg:py-28">
      <div className={frame}>
        <div data-reveal="stagger" className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <p className="m-0 inline-flex rounded-full px-4 py-1.5 text-eyebrow uppercase ring-1 ring-ink-on-brand/25">{howItWorks.eyebrow}</p>
            <h2 id="o3-process-title" className="m-0 mt-5 text-display-sm sm:text-display-md">
              {howItWorks.title} <span className="text-ink-on-brand/65">{howItWorks.titleTail}</span>
            </h2>
          </div>
          <p className="m-0 max-w-[46ch] text-body-lg text-ink-on-brand/80">{howItWorks.intro}</p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
          {/* Above the card, so each line and its arrow sit over the card's edge. */}
          <O3Sequence className="relative z-10 flex flex-col gap-4">
            <Lane track={howItWorks.companies} kind="companies" href={hire.href} event="hire_cta_click" delay="0s" />
            <Lane track={howItWorks.candidates} kind="candidates" href={apply.href} event="apply_cta_click" delay="-2.5s" />
          </O3Sequence>

          <span
            aria-hidden="true"
            className="relative z-20 -my-7 flex size-10 items-center justify-center justify-self-center rounded-full bg-surface-accent text-ink-on-accent ring-4 ring-surface-brand lg:hidden"
          >
            <ArrowRight className="size-4 rotate-90" />
          </span>

          <div
            data-reveal
            className="o3-icon-host relative flex flex-col gap-8 overflow-hidden rounded-[28px] bg-surface-accent p-6 text-ink-on-accent sm:p-8 lg:p-6 xl:p-8"
          >
            <span aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 size-56 rounded-full border-[18px] border-current opacity-[0.09]">
              <span className="absolute inset-[22%] rounded-full border-[14px] border-current" />
            </span>
            <div className="relative flex items-start justify-between gap-3">
              <span className="rounded-full bg-surface-raised px-3 py-1 text-caption font-semibold whitespace-nowrap text-ink-900">Step 04, both tracks</span>
              <span aria-hidden="true" className="text-display-md leading-none tabular-nums opacity-25 xl:text-display-lg">
                04
              </span>
            </div>
            {/* Mark beside the words on tablets; the mark mid-card and the words at its foot from 1024px. */}
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:gap-12 lg:flex-1 lg:flex-col lg:items-start lg:gap-8">
              <MergeMark className="w-full max-w-[220px] shrink-0 md:w-[200px] lg:my-auto lg:w-full" />
              <div>
                <h3 className="m-0 text-heading-lg">{howItWorks.meet.title}</h3>
                <p className="m-0 mt-2 text-body">{howItWorks.meet.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
