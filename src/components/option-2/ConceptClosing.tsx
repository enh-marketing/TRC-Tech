import { Bracket, Button } from "@/components/ui";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { Label, wrap } from "./shared";

/**
 * The close: one statement across the brand surface, then the two paths as
 * columns of equal weight divided by a rule (not doors), each with what we ask
 * for or what you share, and its button. Same copy as concept 1.
 */
export function ConceptClosing() {
  const { contact } = site;
  const paths = [
    { ...finalCta.companies, cta: site.cta.hire, track: "hire_cta_click", primary: true },
    { ...finalCta.candidates, cta: site.cta.apply, track: "apply_cta_click", primary: false },
  ];

  return (
    <section aria-labelledby="o2-start-title" className="bg-surface-brand text-ink-on-brand">
      <div className={`${wrap} py-20 lg:py-32`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div data-reveal className="flex flex-col gap-6 lg:col-span-8">
            <Label index="08" onBrand>
              {finalCta.eyebrow}
            </Label>
            <h2 id="o2-start-title" className="o2-title m-0">
              {finalCta.title} <span className="text-ink-on-brand/65">{finalCta.titleTail}</span>
            </h2>
          </div>
          {isShown(contact) && contact.phone ? (
            <p data-reveal className="m-0 flex flex-col gap-1 text-body-sm text-ink-on-brand/75 lg:col-span-4 lg:items-end">
              {finalCta.talk}
              <a href={contact.phoneHref} className="text-heading-lg text-ink-on-brand tabular-nums no-underline hover:underline hover:underline-offset-4">
                {contact.phone}
              </a>
            </p>
          ) : null}
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-0">
          {paths.map((path, i) => (
            <div key={path.label} data-reveal className={cn("flex flex-col gap-6", i === 0 ? "lg:pe-16" : "border-t border-ink-on-brand/20 pt-12 lg:border-t-0 lg:border-s lg:ps-16 lg:pt-0")}>
              <p className="m-0 text-eyebrow text-ink-on-brand/75 uppercase">{path.label}</p>
              <h3 className="m-0 text-display-sm sm:text-display-md">{path.title}</h3>
              <p className="m-0 max-w-[44ch] text-body-lg text-ink-on-brand/85">{path.body}</p>
              <div className="flex flex-col gap-3">
                <p className="m-0 text-eyebrow text-ink-on-brand/75 uppercase">{path.pointsLabel}</p>
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {path.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body">
                      <Bracket size="sm" className="mt-2.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Button href={path.cta.href} size="lg" variant={path.primary ? "primary" : "onBrand"} data-track={path.track} data-location="closing">
                  {path.cta.label}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
