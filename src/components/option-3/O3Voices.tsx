import Image from "next/image";
import { ReservedSlot } from "@/components/site/Draft";
import { Silhouette } from "@/components/sections/home/Silhouette";
import { testimonials, type WallCard, type WallColumn } from "@/content/home";
import { cn } from "@/lib/cn";
import { isShown, shown } from "@/lib/placeholder";
import { O3Depth } from "./O3Depth";
import { O3QuoteSlider } from "./O3QuoteSlider";
import { frame } from "./shared";

/** Tile colours on the mint band: white, a green tint and green (concept 1's neutral, brand and accent). */
const looks: Record<WallCard["tone"], { tile: string; figure: string; label: string }> = {
  neutral: { tile: "bg-surface-raised", figure: "fill-line-200/45", label: "bg-surface-brand text-ink-on-brand" },
  brand: { tile: "bg-surface-accent/35", figure: "fill-ink-900/15", label: "bg-surface-raised text-ink-900" },
  accent: { tile: "bg-surface-accent", figure: "fill-ink-on-accent/25", label: "bg-surface-raised text-ink-900" },
};

const showFrom: Record<WallColumn["from"], string> = { base: "flex", md: "hidden md:flex", lg: "hidden lg:flex" };

function Portrait({ card }: { card: WallCard }) {
  const look = looks[card.tone];
  // A stock photo is a placeholder: it shows in preview only, then the silhouette and role take over.
  const photo = card.photo && isShown(card) ? card.photo : null;
  return (
    <div className={cn("wall-card relative aspect-[4/5] overflow-hidden rounded-xl shadow-sm md:rounded-[22px]", look.tile)}>
      {photo ? (
        <Image src={photo} alt="" fill sizes="(min-width: 1536px) 190px, (min-width: 1024px) 10vw, 18vw" className="object-cover" />
      ) : (
        <>
          <span className={cn("absolute top-2.5 left-2.5 hidden max-w-[calc(100%-1.25rem)] rounded-full px-2.5 py-1 text-caption leading-tight md:block", look.label)}>
            {card.role}
          </span>
          <Silhouette className={cn("absolute inset-x-[8%] bottom-0 h-[72%] w-[84%]", look.figure)} />
        </>
      )}
    </div>
  );
}

/** How far each column drifts as the section scrolls past (O3Depth), so the wall has depth. */
const drift = [36, 14, 44, 20, 8, 20, 44, 14, 36];

/**
 * Concept 1's staggered portrait wall, in concept 3's language: rounder tiles and
 * concept 3's tones. From 768px the columns drift at different speeds while the page
 * scrolls (outer columns most), and only then; tiles still tilt towards the pointer.
 * Decorative, so hidden from screen readers.
 */
function Wall({ columns }: { columns: WallColumn[] }) {
  return (
    <O3Depth media="(min-width: 768px)">
      <div aria-hidden="true" data-reveal className="wall flex justify-center gap-2 px-2 pt-10 md:gap-3 lg:gap-4 lg:pt-14 2xl:gap-5">
        {columns.map((column, i) => (
          <div
            key={i}
            data-depth={drift[i % drift.length]}
            className={cn("wall-column relative w-[18%] max-w-[200px] flex-col gap-2 md:w-[13%] md:gap-3 lg:w-[10%] lg:gap-4", showFrom[column.from])}
            style={{ marginTop: `calc(${column.offset} * var(--u))` }}
          >
            {column.cards.map((card) => (
              <Portrait key={card.role} card={card} />
            ))}
          </div>
        ))}
      </div>
    </O3Depth>
  );
}

/**
 * Testimonials: concept 1's section (the portrait wall, the centred heading set
 * into it, one quote at a time) at the agency's request, redrawn in concept 3's
 * style on a full-width mint band: a pill label, the two-tone heading, rounded
 * floating tiles and the quote as a stacked white card (O3QuoteSlider). Same
 * quotes and minimum of two as concept 1, credited to a role and a kind of
 * company, never a named person.
 */
export function O3Voices() {
  const items = shown(testimonials.items);
  if (items.length < 2) return <ReservedSlot title="Testimonials" note="Two or more approved quotes with name, role and company." />;

  return (
    <section aria-labelledby="o3-voices-title" className="relative overflow-hidden bg-surface-brand pb-20 text-ink-on-brand lg:pb-28">
      <Wall columns={testimonials.wall} />

      <div className={frame}>
        <div
          data-reveal="stagger"
          className="relative z-10 mx-auto mt-10 flex max-w-[820px] flex-col items-center text-center lg:-mt-24 xl:-mt-36 2xl:-mt-48 3xl:-mt-60"
        >
          <p className="m-0 inline-flex rounded-full px-4 py-1.5 text-eyebrow uppercase ring-1 ring-ink-on-brand/25">{testimonials.eyebrow}</p>
          <h2 id="o3-voices-title" className="m-0 mt-5 text-display-sm sm:text-display-md">
            {testimonials.title} <span className="text-ink-on-brand/65">{testimonials.titleTail}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-body-lg text-ink-on-brand/80">{testimonials.intro}</p>
        </div>

        <div data-reveal className="relative z-10 mt-12 lg:mt-14">
          <O3QuoteSlider items={items} />
        </div>
      </div>
    </section>
  );
}
