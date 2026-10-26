import { whatWeDo } from "@/content/home";
import { pillars, site } from "@/content/site";
import { O3PracticeDeck, type PracticeSlide } from "./O3PracticeDeck";
import { frame } from "./shared";

/**
 * A photo per practice, chosen by the agency from Unsplash (free licence; credits
 * in docs/10-sources.md): Sabbir Ahmed's man at a laptop, Peter Jones's man with a
 * notebook and Aram's man in front of a skyline. The agency's fourth pick is
 * Unsplash+ (paid), so AI & Data keeps stock portrait 02 until it is licensed or
 * replaced. Stock, so preview only; without preview each card shows a silhouette.
 */
const photos: Record<string, string> = {
  "technology-hiring": "/placeholders/practice/x6G4KsTZPkM.jpg",
  "product-hiring": "/placeholders/practice/WZROBIlY8Rg.jpg",
  "ai-data-hiring": "/placeholders/people/portrait-02.jpg",
  "leadership-hiring": "/placeholders/practice/LksuubJHIrc.jpg",
};

/**
 * What we do, after the agency's reference: a pill label, the heading in the
 * shared two-tone title style, then the practices as a deck of large cards.
 */
export function O3Practices() {
  const slides: PracticeSlide[] = pillars.map((p) => ({
    slug: p.slug,
    title: p.title,
    short: p.short,
    summary: p.summary,
    roles: p.roles,
    href: p.href,
    photo: site.preview ? (photos[p.slug] ?? null) : null,
  }));

  return (
    // Clipped sideways: the hidden cards wait 24px to either side for their slide-in.
    <section id="what-we-do" aria-labelledby="o3-practices-title" className="overflow-x-clip bg-surface-canvas py-20 lg:py-28">
      <div className={frame}>
        <O3PracticeDeck items={slides}>
          <p className="m-0 inline-flex rounded-full px-4 py-1.5 text-eyebrow text-ink-700 uppercase ring-1 ring-line-200">{whatWeDo.eyebrow}</p>
          <h2 id="o3-practices-title" className="m-0 mt-5 text-display-sm sm:text-display-md text-ink-900">
            {whatWeDo.title}{" "}
            <span className="text-ink-500">{whatWeDo.titleTail}</span>
          </h2>
        </O3PracticeDeck>
      </div>
    </section>
  );
}
