import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import { DraftChip, ReservedSlot } from "@/components/site/Draft";
import { ArrowRight } from "@/components/site/icons";
import { clientLogos, insights, testimonials, type WallCard, type WallColumn } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown, shown } from "@/lib/placeholder";
import { LogoMarquee } from "./LogoMarquee";
import { Silhouette } from "./Silhouette";
import { InsightsSlider } from "./InsightsSlider";
import { TestimonialSlider } from "./TestimonialSlider";

/**
 * Phase 2 sections. Each needs a minimum of shown items (logos 6,
 * testimonials 2, insights 3). Placeholder items count only in preview, so
 * with preview off and no real content, the section renders nothing at all.
 */

/**
 * Gives every logo roughly the same visual area, whatever its proportions, so
 * a wide wordmark and a square mark carry similar weight. Explicit sizes also
 * stop small source files from shrinking further in the responsive srcset.
 */
function logoBox(width: number, height: number, scale = 1) {
  const ratio = width / height;
  const area = 3000 * scale * scale;
  let w = Math.sqrt(area * ratio);
  let h = Math.sqrt(area / ratio);
  if (h > 52 * scale) [h, w] = [52 * scale, 52 * scale * ratio];
  if (w > 150 * scale) [w, h] = [150 * scale, (150 * scale) / ratio];
  return { width: Math.round(w), height: Math.round(h) };
}

export function ClientLogos() {
  const logos = shown(clientLogos.items);
  if (logos.length < 6) {
    return <ReservedSlot title="Client logos" note="Six or more logos, each with written permission." />;
  }

  return (
    <section aria-labelledby="clients-title" className="bg-surface-canvas">
      {/* A hairline ties the logos to Why TRC above, with even space on both sides. */}
      <div className="mx-auto max-w-[1200px] px-4">
        <div data-reveal className="border-t border-line-100 pt-12 pb-14 lg:pt-14 lg:pb-16">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
            <h2 id="clients-title" className="m-0 text-eyebrow uppercase text-ink-500">
              {clientLogos.label}
            </h2>
          </div>
          <LogoMarquee logos={logos.map((l) => ({ ...l, box: logoBox(l.width, l.height, l.scale) }))} />
        </div>
      </div>
    </section>
  );
}

const cardTone: Record<WallCard["tone"], { card: string; figure: string; label: string }> = {
  neutral: { card: "bg-surface-300", figure: "fill-line-200/45", label: "text-ink-700" },
  brand: { card: "bg-surface-brand", figure: "fill-ink-on-brand/20", label: "text-ink-on-brand/85" },
  accent: { card: "bg-surface-accent", figure: "fill-ink-on-accent/25", label: "text-ink-on-accent" },
};

function WallPortrait({ card }: { card: WallCard }) {
  const tone = cardTone[card.tone];
  // A stock photo is a placeholder: it shows in preview only, then the silhouette takes over.
  const photo = card.photo && isShown(card) ? card.photo : null;
  return (
    <div className={cn("wall-card relative aspect-[4/5] overflow-hidden rounded-md ring-1 ring-line-100", tone.card)}>
      {photo ? (
        <Image src={photo} alt="" fill sizes="(min-width: 1536px) 190px, (min-width: 1024px) 10vw, 18vw" className="object-cover" />
      ) : (
        <>
          <span className={cn("absolute top-2.5 left-3 hidden max-w-[calc(100%-1.5rem)] text-caption leading-tight md:block", tone.label)}>
            {card.role}
          </span>
          <Silhouette className={cn("absolute inset-x-[8%] bottom-0 h-[72%] w-[84%]", tone.figure)} />
        </>
      )}
    </div>
  );
}

const showFrom: Record<WallColumn["from"], string> = { base: "flex", md: "hidden md:flex", lg: "hidden lg:flex" };

/** The staggered wall of portrait cards, after the reference design. Decorative, so hidden from screen readers. */
function PortraitWall({ columns }: { columns: WallColumn[] }) {
  return (
    <div aria-hidden="true" data-reveal className="wall flex justify-center gap-2 px-2 pt-10 md:gap-3 lg:gap-4 lg:pt-14 2xl:gap-5">
      {columns.map((column, i) => (
        <div
          key={i}
          className={cn("wall-column relative w-[18%] max-w-[200px] flex-col gap-2 md:w-[13%] md:gap-3 lg:w-[10%] lg:gap-4", showFrom[column.from])}
          style={{ marginTop: `calc(${column.offset} * var(--u))` }}
        >
          {column.cards.map((card) => (
            <WallPortrait key={card.role} card={card} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  const items = shown(testimonials.items);
  if (items.length < 2) {
    return <ReservedSlot title="Testimonials" note="Two or more approved quotes with name, role and company." />;
  }

  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden border-t border-line-100 bg-surface-200">
      <PortraitWall columns={testimonials.wall} />

      <div className="mx-auto max-w-[1200px] px-4 pb-12 lg:pb-16">
        <SectionHeader
          id="testimonials-title"
          centre
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          titleTail={testimonials.titleTail}
          intro={testimonials.intro}
          className="relative z-10 mt-10 lg:-mt-24 xl:-mt-36 2xl:-mt-48 3xl:-mt-60"
        />

        <div data-reveal className="relative z-10 mt-10">
          <TestimonialSlider items={items} />
        </div>

      </div>
    </section>
  );
}

export function LatestInsights() {
  const items = shown(insights.items);
  if (items.length < 3) {
    return <ReservedSlot title="Latest insights" note="Three or more published posts." />;
  }

  return (
    <section aria-labelledby="insights-title" className="overflow-hidden bg-surface-canvas py-16 lg:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-6 px-4">
        <SectionHeader
          id="insights-title"
          eyebrow={insights.eyebrow}
          title={insights.title}
          titleTail={insights.titleTail}
        />
        <Link
          href="/insights/"
          className="flex min-h-11 items-center gap-2 text-btn-label text-ink-900 no-underline hover:text-accent-700"
        >
          All insights
          <ArrowRight className="size-5" />
        </Link>
      </div>
      <div data-reveal className="insights-edge mt-6">
        <InsightsSlider items={items} />
      </div>
    </section>
  );
}
