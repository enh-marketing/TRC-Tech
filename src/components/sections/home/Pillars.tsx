import { SectionHeader } from "@/components/ui";
import { whatWeDo } from "@/content/home";
import { pillars } from "@/content/site";
import { PracticeTrack } from "./PracticeTrack";

/**
 * What we do. Landscape practice cards, each with its icon, summary and
 * roles, in a horizontal track that the page scroll drives on desktop.
 */
export function Pillars() {
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="bg-surface-200">
      <PracticeTrack
        allHref="/what-we-do/"
        items={pillars}
        header={
          <SectionHeader
            id="what-we-do-title"
            eyebrow={whatWeDo.eyebrow}
            title={whatWeDo.title}
            titleTail={whatWeDo.titleTail}
            intro={whatWeDo.intro}
          />
        }
      />
    </section>
  );
}
