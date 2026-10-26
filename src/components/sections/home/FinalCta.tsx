import { DualPathBand, SectionHeader } from "@/components/ui";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";
import { isShown } from "@/lib/placeholder";

export function FinalCta() {
  const { contact } = site;
  return (
    <section aria-labelledby="start-title" className="bg-surface-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 lg:mb-14">
          <SectionHeader
            id="start-title"
            eyebrow={finalCta.eyebrow}
            title={finalCta.title}
            titleTail={finalCta.titleTail}
          />
          {isShown(contact) && contact.phone ? (
            <p data-reveal className="m-0 flex flex-col gap-1 text-body-sm text-ink-500 lg:items-end">
              {finalCta.talk}
              <a href={contact.phoneHref} className="text-heading-md text-ink-900 tabular-nums no-underline hover:text-accent-700">
                {contact.phone}
              </a>
            </p>
          ) : null}
        </div>
        <DualPathBand
          titleAs="h3"
          trackLocation="dual_band"
          companies={{ ...finalCta.companies, cta: site.cta.hire.label, href: site.cta.hire.href }}
          candidates={{ ...finalCta.candidates, cta: site.cta.apply.label, href: site.cta.apply.href }}
        />
      </div>
    </section>
  );
}
