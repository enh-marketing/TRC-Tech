import Link from "next/link";
import { cn } from "@/lib/cn";
import { Bracket } from "./Bracket";
import { cardFrame, cardLift, cardPanel } from "./cardFrame";

type Door = {
  /** Small line above the title. */
  label: string;
  title: string;
  body: string;
  /** What the form asks for, so nobody is surprised on the next page. */
  pointsLabel?: string;
  points?: string[];
  cta: string;
  href: string;
};

const tones = {
  companies: {
    door: "bg-surface-brand text-ink-on-brand",
    muted: "text-ink-on-brand/75",
    handle: "bg-surface-accent text-ink-on-accent",
    bracket: "accent" as const,
  },
  candidates: {
    door: "bg-surface-accent text-ink-on-accent",
    muted: "text-ink-on-accent/90",
    handle: "bg-surface-brand text-ink-on-brand",
    bracket: "brand" as const,
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function DoorPanel({
  door,
  tone,
  titleAs: Title,
  track,
}: {
  door: Door;
  tone: (typeof tones)[keyof typeof tones];
  titleAs: "h2" | "h3";
  track: Record<string, string>;
}) {
  return (
    // The link covers the door, so the focus ring is drawn around the door, outside it,
    // where it shows against the page in both themes.
    <article
      data-reveal
      className={cn("door group relative flex outline-offset-4 outline-focus-ring has-[a:focus-visible]:outline-2", cardFrame, cardLift)}
    >
      <div className={cn("relative isolate flex w-full flex-col overflow-hidden p-[26px] sm:p-[34px] xl:p-[42px]", cardPanel, tone.door)}>
        {/* The logo's bracket, oversized; it eases out towards the corner as the door opens. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-8 right-8 -z-10 size-20 border-t-[16px] border-r-[16px] border-current opacity-[0.16] transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 motion-reduce:transition-none sm:size-32 sm:border-t-[24px] sm:border-r-[24px]"
        />

        {/* Fixed width on wide screens, so the copy never re-wraps while the door grows. */}
        <div className="mb-10 flex flex-col gap-5 xl:w-[24.5rem]">
          <p className={cn("m-0 text-eyebrow uppercase", tone.muted)}>{door.label}</p>
          <Title className="m-0 text-display-md">{door.title}</Title>
          <p className={cn("m-0 text-body-lg", tone.muted)}>{door.body}</p>
          {door.points?.length ? (
            <div className="mt-2 flex flex-col gap-3">
              {door.pointsLabel ? <p className={cn("m-0 text-eyebrow uppercase", tone.muted)}>{door.pointsLabel}</p> : null}
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {door.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-body">
                    <Bracket size="sm" tone={tone.bracket} className="mt-2.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-6 border-t border-current/15 pt-6">
          {/* The link stretches over the whole door, so the door is one large target. */}
          <Link
            href={door.href}
            className="text-heading-md text-inherit no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            {...track}
          >
            {door.cta}
          </Link>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none",
              tone.handle,
            )}
          >
            <span className="-rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0 motion-reduce:transition-none">
              <Arrow />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * The two doors, repeated at the foot of every page that is not itself
 * a form. The companies door comes first in source order everywhere, so
 * keyboard and screen-reader users meet them in a stable order. On wide
 * screens the door under the pointer or keyboard focus opens wider.
 */
export function DualPathBand({
  companies,
  candidates,
  trackLocation,
  titleAs = "h2",
}: {
  companies: Door;
  candidates: Door;
  /** When set, both doors report clicks to analytics with this location. */
  trackLocation?: string;
  /** h3 when the band sits under its own section heading. */
  titleAs?: "h2" | "h3";
}) {
  const track = (event: string): Record<string, string> =>
    trackLocation ? { "data-track": event, "data-location": trackLocation } : {};
  return (
    <div className="doors flex flex-col gap-4 lg:flex-row">
      <DoorPanel door={companies} tone={tones.companies} titleAs={titleAs} track={track("hire_cta_click")} />
      {/* Sits on the seam between the doors and cuts a notch out of both. */}
      <div aria-hidden="true" className="relative z-10 h-0 lg:h-auto lg:w-0">
        <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface-canvas text-eyebrow text-ink-900 uppercase ring-8 ring-surface-canvas">
          or
        </span>
      </div>
      <DoorPanel door={candidates} tone={tones.candidates} titleAs={titleAs} track={track("apply_cta_click")} />
    </div>
  );
}
