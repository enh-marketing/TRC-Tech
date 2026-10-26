import Image from "next/image";
import { Logo } from "@/components/site/Logo";
import { ArrowRight } from "@/components/site/icons";
import { CountUp } from "@/components/ui/CountUp";
import { hero, proof, whyTrc } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { frame } from "./shared";

/** Stock faces standing in for the team, so preview only; without preview the row is left out. */
const team = ["05", "06", "07"].map((n) => ({
  src: `/placeholders/people/portrait-${n}.jpg`,
  placeholder: "Unsplash stock photo, preview only",
}));

/** The phrases set dark inside Why TRC's intro, the rest muted: the two tones every concept 3 heading uses. */
const emphasis = ["technology and product hiring", "advised companies since 1999"];

function emphasise(text: string, phrases: string[]) {
  const pattern = new RegExp(`(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return text.split(pattern).map((part, i) => (phrases.includes(part) ? <strong key={i} className="font-semibold text-ink-900">{part}</strong> : part));
}

/**
 * One tone per card, after the reference's four colours, from TRC's palette:
 * green, mint, a neutral and a green tint. Each card carries a pair of large
 * outlined rings, placed differently, as the reference's line shapes are.
 */
const cards = [
  { tone: "bg-surface-accent text-ink-on-accent", rings: "-top-20 -right-16" },
  { tone: "bg-surface-brand text-ink-on-brand", rings: "-right-24 -bottom-24" },
  { tone: "bg-surface-300 text-ink-900", rings: "-top-24 -left-20" },
  { tone: "bg-surface-accent/30 text-ink-900", rings: "-bottom-20 -left-16" },
];

/**
 * About and figures, after the agency's reference: a row of faces, one large
 * statement with its key phrases in bold, the firm it belongs to, then the
 * four published figures as coloured cards that count up once. The statement
 * is Why TRC's intro; it is not a quote, so it carries no quotation marks.
 */
export function O3About() {
  const faces = team.filter(isShown);

  return (
    <section aria-labelledby="o3-about-title" className="bg-surface-canvas py-20 lg:py-28">
      <div className={frame}>
        <div data-reveal="stagger" className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          {faces.length ? (
            <div aria-hidden="true" className="mb-8 flex">
              {faces.map((face, i) => (
                <span key={face.src} className={cn("relative size-14 overflow-hidden rounded-full bg-surface-300 ring-4 ring-surface-canvas", i > 0 && "-ms-3", i === 1 && "z-10 size-16 -mt-1")}>
                  <Image src={face.src} alt="" fill sizes="64px" className="object-cover object-top" />
                </span>
              ))}
            </div>
          ) : null}
          <h2 id="o3-about-title" className="m-0 text-display-sm sm:text-display-md text-ink-500">
            {emphasise(whyTrc.intro, emphasis)}
          </h2>
          <a
            href={site.parent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex min-h-11 flex-col items-center gap-2 text-body-sm text-ink-700 no-underline hover:text-ink-900 sm:flex-row sm:gap-3"
          >
            <Logo height={32} />
            <span className="inline-flex items-center gap-2">
              {hero.trust}
              <ArrowRight className="size-4 -rotate-45 text-accent-700 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <ul className="m-0 mt-14 grid list-none grid-cols-2 gap-3 p-0 sm:gap-4 lg:mt-20 lg:grid-cols-4">
          {proof.map((item, i) => {
            const match = item.figure.match(/^([\d,]+)(.*)$/);
            const value = match ? Number(match[1].replace(/,/g, "")) : null;
            const card = cards[i % cards.length];
            return (
              <li
                key={item.label}
                data-reveal
                className={cn("relative flex min-h-[220px] flex-col justify-between gap-6 overflow-hidden rounded-[24px] p-5 sm:min-h-[260px] sm:p-7 lg:min-h-[280px]", card.tone)}
              >
                <span aria-hidden="true" className={cn("pointer-events-none absolute size-56 rounded-full border-[18px] border-current opacity-[0.09]", card.rings)}>
                  <span className="absolute inset-[22%] rounded-full border-[14px] border-current" />
                </span>
                <p className="relative m-0 text-stat tabular-nums lg:text-display-xl">
                  {value !== null ? <CountUp value={value} /> : item.figure}
                  {match?.[2]}
                </p>
                <div className="relative flex flex-col gap-1">
                  <p className="m-0 text-heading-sm">{item.label}</p>
                  <p className="m-0 text-caption opacity-80">{item.source}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
