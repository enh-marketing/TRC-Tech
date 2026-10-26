import { SectionHeader } from "@/components/ui";
import { howItWorks } from "@/content/home";
import { site } from "@/content/site";
import { HowItWorksSteps } from "./HowItWorksSteps";

/**
 * How it works. A switch beside the heading picks the track, companies or
 * candidates; four cards in a row show that track's three steps and the
 * shared fourth, joined by round arrows. The fourth card never changes,
 * which is the section's point: two tracks, one outcome.
 */
export function HowItWorks() {
  const ctas = {
    companies: { label: howItWorks.companies.cta, href: site.cta.hire.href, event: "hire_cta_click" },
    candidates: { label: howItWorks.candidates.cta, href: site.cta.apply.href, event: "apply_cta_click" },
  };
  const header = (
    <SectionHeader
      id="how-it-works-title"
      onBrand
      eyebrow={howItWorks.eyebrow}
      title={howItWorks.title}
      titleTail={howItWorks.titleTail}
    />
  );

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="bg-surface-brand text-ink-on-brand">
      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
        <HowItWorksSteps content={howItWorks} ctas={ctas} header={header} intro={howItWorks.intro} />
      </div>
    </section>
  );
}
