import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import { domainIcons } from "@/components/sections/home/DomainIcons";
import { PracticeIcon } from "@/components/sections/home/PracticeIcon";
import { Silhouette } from "@/components/sections/home/Silhouette";
import { Bracket } from "@/components/ui";
import { hero, heroSlides, proof, whatWeDo, whyTrc } from "@/content/home";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { O3Depth } from "./O3Depth";

/**
 * The three people from the agency's reference, supplied by the agency and cut
 * out of their backgrounds on this Mac (Apple's on-device subject lifting): the
 * full figure for the centre, square head-and-shoulders crops for the discs.
 * Their licence is not confirmed, so preview only; without preview each becomes
 * a silhouette until TRC supplies photos it has the rights to.
 */
type Cutout = { src: string; width: number; height: number; placeholder?: string };
const supplied = "Supplied by the agency, licence to confirm, preview only";
const people: Record<"centre" | "left" | "right", Cutout> = {
  centre: { src: "/placeholders/people/banner-centre.webp", width: 900, height: 1008, placeholder: supplied },
  left: { src: "/placeholders/people/banner-left.webp", width: 440, height: 440, placeholder: supplied },
  right: { src: "/placeholders/people/banner-right.webp", width: 440, height: 440, placeholder: supplied },
};

/** "Permanent hiring, mid-level to CTO" from Why TRC, split into a title and a line. */
const [levelTitle, levelLine] = whyTrc.points[1].title.split(", ");

const card = "rounded-2xl bg-surface-raised shadow-card ring-1 ring-line-100";

/** A portrait in a coloured disc, head and shoulders, with a trail of dots towards the centre. */
function Disc({ person, side, className }: { person: Cutout; side: "left" | "right"; className?: string }) {
  const photo = isShown(person);
  const dot = "absolute rounded-full bg-ink-on-brand/25";
  return (
    <div aria-hidden="true" className={cn("o3-pop absolute", className)}>
      <div className="relative size-full overflow-hidden rounded-full bg-surface-accent">
        {photo ? (
          <Image src={person.src} alt="" width={person.width} height={person.height} sizes="200px" className="absolute inset-0 size-full object-cover" />
        ) : (
          <Silhouette className="absolute inset-x-[14%] bottom-0 h-[78%] w-[72%] fill-ink-on-accent/25" />
        )}
      </div>
      {side === "left" ? (
        <>
          <span className={cn(dot, "top-[calc(100%+8px)] left-[74%] size-1.5")} />
          <span className={cn(dot, "top-[calc(100%+22px)] left-[90%] size-2.5")} />
          <span className={cn(dot, "top-[calc(100%+42px)] left-[106%] size-3.5")} />
        </>
      ) : (
        <>
          <span className={cn(dot, "top-[calc(100%+8px)] right-[74%] size-2")} />
          <span className={cn(dot, "top-[calc(100%+26px)] right-[88%] size-3")} />
          <span className={cn(dot, "top-[calc(100%+50px)] right-[100%] size-4")} />
        </>
      )}
    </div>
  );
}

/**
 * Concept 3's hero, after the agency's reference: one full-width brand band
 * behind the header, a centred headline, the two calls to action in a single
 * pill (where the reference has an email field), and a scene of people and
 * floating cards on large arcs. Every card carries real content: the four
 * practices, the parent firm, the level we hire at and two published figures.
 * On first paint the headline rises into place, the sentence and buttons follow, the
 * arcs open and the people and cards settle in turn: about a second in all, in CSS so
 * nothing waits for JavaScript, and none of it with reduced motion.
 */
export function O3Hero() {
  const slide = heroSlides[0];
  const headline = hero.titleOptions[0];
  const { apply, hire } = site.cta;
  const centre = isShown(people.centre);

  return (
    // Pulled up under the sticky header by its height, and padded by the same, so the band starts at the top.
    <section aria-labelledby="hero-title" className="relative -mt-16 overflow-hidden bg-surface-brand text-ink-on-brand sm:-mt-[72px]">
      <div className="relative pt-16 sm:pt-[72px]">
        <div className="relative z-10 mx-auto max-w-[1100px] px-5 pt-10 text-center sm:pt-14 lg:pt-14">
          <h1 id="hero-title" className="o3-rise m-0 text-display-md sm:text-display-lg xl:text-display-xl">
            {headline.lead} <span className="text-ink-on-brand/65 lg:block">{headline.tail}</span>
          </h1>
          <p className="o3-fade-up mx-auto mt-5 max-w-[44ch] text-body-lg text-ink-on-brand/80 [--d:120ms]">{slide.body}</p>

          {/* Both calls to action in one pill, where the reference has its email field and button.
              On phones the pill opens out: the button on top, full width, the link under it. */}
          <div className="o3-fade-up mx-auto mt-8 flex w-full max-w-[360px] flex-col-reverse gap-2 [--d:220ms] sm:inline-flex sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:rounded-full sm:bg-surface-raised sm:p-2 sm:ps-6 sm:shadow-card sm:ring-1 sm:ring-line-100">
            <Link
              href={apply.href}
              data-track="apply_cta_click"
              data-location="hero"
              className="group inline-flex min-h-11 items-center justify-center gap-2 px-4 text-btn-label text-ink-900 no-underline sm:px-0 sm:pe-3"
            >
              <span className="underline decoration-line-200 underline-offset-[6px] transition-colors group-hover:decoration-surface-accent">{apply.label}</span>
              <ArrowRight className="size-4 text-accent-700 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
            <Link
              href={hire.href}
              data-track="hire_cta_click"
              data-location="hero"
              className="o3-press inline-flex min-h-13 items-center justify-center rounded-full bg-surface-accent px-7 text-btn-label sm:min-h-12 text-ink-on-accent no-underline transition-colors duration-150 hover:bg-surface-accent-hover"
            >
              {hire.label}
            </Link>
          </div>
        </div>

        {/* The scene. The arcs and people are decoration; the cards are content. From
            1024px it has depth as the page scrolls away: three layers drift at different
            speeds (O3Depth), the arcs slowest, the cards fastest. The layers are plain
            full-size wrappers, so the depth never touches the entrance animations. */}
        <O3Depth mode="exit" className="relative mx-auto mt-10 h-[390px] max-w-[1180px] sm:mt-12 sm:h-[440px] lg:h-[500px]">
          <div data-depth="56" aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span className="o3-arc-in absolute top-[34%] left-1/2 aspect-square w-[190%] -translate-x-1/2 rounded-full border-[28px] border-surface-brand-hover/55 sm:w-[130%] sm:border-[40px] lg:w-[104%] 2xl:w-[150%]" />
            <span className="o3-arc-in absolute top-[62%] left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full border-[22px] border-surface-brand-hover/55 [--d:100ms] sm:w-[76%] sm:border-[30px] lg:w-[60%]" />
          </div>

          <div data-depth="24" aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-0 left-[38%] w-[250px] -translate-x-1/2 sm:left-1/2 sm:w-[330px] lg:w-[390px]">
              {centre ? (
                <Image src={people.centre.src} alt="" width={people.centre.width} height={people.centre.height} preload sizes="(min-width: 1024px) 390px, (min-width: 640px) 330px, 250px" className="o3-rise h-auto w-full [--rise:28px]" />
              ) : (
                <Silhouette className="o3-rise block aspect-[4/5] w-full fill-ink-on-brand/15 [--rise:28px]" />
              )}
            </div>
          </div>

          <div data-depth="-40" className="pointer-events-none absolute inset-0 *:pointer-events-auto">
            <Disc person={people.left} side="left" className="top-[2%] left-[3%] size-20 [--d:260ms] sm:left-[8%] sm:size-28 lg:top-[-2%] lg:left-[12%] lg:size-32" />
            <Disc person={people.right} side="right" className="top-[-13%] right-[5%] size-20 [--d:320ms] sm:top-[-12%] sm:right-[4%] sm:size-28 lg:top-[-14%] lg:right-[4%] lg:size-44" />

            {/* The four practices, where the reference has its referral form. */}
            <div className="o3-pop absolute top-[24%] left-[49%] w-[160px] [--d:380ms] sm:top-[26%] sm:left-[57%] sm:w-[230px] lg:top-[28%] lg:left-[58%] lg:w-[260px]">
              <div className={cn(card, "p-3 sm:p-5")}>
                <p className="m-0 text-body-sm font-semibold text-ink-900 sm:text-heading-sm">
                  {whatWeDo.title} {whatWeDo.titleTail}
                </p>
                <ul className="m-0 mt-2.5 flex list-none flex-col gap-1.5 p-0 sm:mt-4 sm:gap-2">
                  {pillars.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={p.href}
                        className="o3-icon-host group flex min-h-8 items-center gap-2 rounded-lg px-2 text-caption text-ink-900 no-underline ring-1 ring-line-200 transition-colors duration-150 hover:bg-surface-brand hover:ring-surface-accent sm:min-h-10 sm:gap-2.5 sm:px-3 sm:text-body-sm"
                      >
                        <PracticeIcon slug={p.slug} className="size-4 shrink-0 text-accent-700 transition-transform duration-300 motion-reduce:transition-none group-hover:scale-125" />
                        {p.short}
                        <ArrowRight className="ms-auto size-3.5 shrink-0 text-ink-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent-700" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* The parent firm, where the reference has the referrer's name. */}
              <a
                href={site.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(card, "absolute -top-11 -right-2 flex items-center gap-2 rounded-xl p-1.5 pe-3 no-underline transition-shadow hover:shadow-card-hover sm:-top-12 sm:-right-6 sm:gap-2.5 sm:p-2 sm:pe-4")}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-brand sm:size-9">
                  <Bracket size="sm" />
                </span>
                <span className="flex flex-col text-start leading-tight">
                  <span className="text-[11px] font-semibold text-ink-900 sm:text-caption">{site.parent.name}</span>
                  <span className="text-[11px] text-ink-500 sm:text-caption">Since {site.parent.founded}</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            {/* The level we hire at, where the reference has a job card. */}
            <div className={cn(card, "di-host group o3-pop absolute top-[46%] left-6 hidden items-center gap-4 p-4 pe-8 [--d:450ms] md:flex lg:left-[2%]")}>
              <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-surface-brand text-ink-on-brand transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110 group-hover:-rotate-6">
                <domainIcons.midmarket className="size-6" />
              </span>
              <span className="flex flex-col gap-0.5 text-start">
                <span className="text-heading-md text-ink-900">{levelTitle}</span>
                <span className="text-body-sm text-ink-500 first-letter:uppercase">{levelLine}</span>
              </span>
            </div>

            {/* Two published figures, where the reference has its hire and reward card. */}
            <div className={cn(card, "o3-pop absolute top-[56%] right-0 hidden w-[204px] p-4 text-start [--d:520ms] lg:block lg:right-[3%]")}>
              <p className="m-0 text-heading-sm text-ink-900">
                {proof[0].figure} {proof[0].label.toLowerCase()}
              </p>
              <div className="mt-3 rounded-xl bg-surface-brand px-4 py-3 text-center">
                <p className="m-0 text-caption text-ink-on-brand/80">{proof[1].label}</p>
                <p className="m-0 text-display-sm text-ink-on-brand tabular-nums">{proof[1].figure}</p>
              </div>
              <p className="m-0 mt-2 text-caption text-ink-500">{proof[1].source}</p>
            </div>
          </div>
        </O3Depth>
      </div>
    </section>
  );
}
