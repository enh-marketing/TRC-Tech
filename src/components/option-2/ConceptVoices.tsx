import Image from "next/image";
import { ReservedSlot } from "@/components/site/Draft";
import { Silhouette } from "@/components/sections/home/Silhouette";
import { testimonials, type WallCard } from "@/content/home";
import { cn } from "@/lib/cn";
import { isShown, shown } from "@/lib/placeholder";
import { QuoteDeck } from "./QuoteDeck";
import { SectionHead, spread, wrap } from "./shared";

const tone: Record<WallCard["tone"], string> = {
  neutral: "bg-surface-300",
  brand: "bg-surface-brand",
  accent: "bg-surface-accent",
};

/** One row of three on phones, six from 640px, the full 3x3 from 1024px; lowered columns follow each layout. */
function place(i: number) {
  const low = (on: boolean, bp = "") => `${bp}${on ? "translate-y-6" : "translate-y-0"}`;
  return cn(low(i % 3 === 1), low(i % 2 === 1, "sm:"), low(i % 3 === 1, "lg:"), i >= 6 ? "hidden lg:block" : i >= 3 && "hidden sm:block");
}

/**
 * Testimonials: a mosaic of the people behind the work beside one large quote.
 * The portraits are concept 1's (stock photos in preview only, silhouettes
 * otherwise) and decorative; alternate columns sit lower, for an editorial
 * rhythm. Below 1024px the mosaic becomes one row (six portraits, three on
 * phones) so the quote is not pushed a screen away. Same quotes, same minimum
 * of two before the section shows.
 */
export function ConceptVoices() {
  const items = shown(testimonials.items);
  if (items.length < 2) return <ReservedSlot title="Testimonials" note="Two or more approved quotes with name, role and company." />;
  const portraits = testimonials.wall.flatMap((column) => column.cards).slice(0, 9);

  return (
    <section aria-labelledby="o2-voices-title" className={`bg-surface-canvas ${spread}`}>
      <div className={wrap}>
        <SectionHead id="o2-voices-title" index="05" label={testimonials.eyebrow} title={testimonials.title} tail={testimonials.titleTail} intro={testimonials.intro} />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-x-8">
          <div aria-hidden="true" data-reveal className="grid grid-cols-3 gap-2 pb-6 sm:grid-cols-6 sm:gap-3 lg:col-span-5 lg:grid-cols-3">
            {portraits.map((card, i) => {
              const photo = card.photo && isShown(card) ? card.photo : null;
              return (
                <div key={card.role} className={cn("relative aspect-[4/5] overflow-hidden rounded-xl", tone[card.tone], place(i))}>
                  {photo ? (
                    <Image src={photo} alt="" fill sizes="(min-width: 1024px) 150px, (min-width: 640px) 16vw, 30vw" className="object-cover" />
                  ) : (
                    <Silhouette className="absolute inset-x-[10%] bottom-0 h-[76%] w-[80%] fill-line-200/60" />
                  )}
                </div>
              );
            })}
          </div>
          <div data-reveal className="lg:col-span-6 lg:col-start-7">
            <QuoteDeck items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
