import { CountUp } from "@/components/ui/CountUp";
import { proof } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { wrap } from "./shared";

/** "400+" as 400 and "+"; a figure that is not a number is shown as it is. */
function Figure({ figure }: { figure: string }) {
  const match = figure.match(/^([\d,]+)(.*)$/);
  if (!match) return <>{figure}</>;
  return (
    <>
      <CountUp value={Number(match[1].replace(/,/g, ""))} />
      {match[2] ? <span className="text-accent-on-brand">{match[2]}</span> : null}
    </>
  );
}

/**
 * The figures as a ledger on the brand surface: four columns divided by
 * hairlines, very large numbers that count up once, and each group labelled
 * across its two columns. Every figure, label and source is concept 1's.
 */
export function ConceptFigures() {
  const groups = [
    { label: site.parent.name, items: proof.slice(0, 2) },
    { label: "This practice", items: proof.slice(2) },
  ];

  return (
    <section aria-label="In numbers" className="bg-surface-brand text-ink-on-brand">
      <div className={`${wrap} py-16 lg:py-24`}>
        <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {groups.map((group, g) => (
            <div key={group.label} data-reveal className="col-span-2 grid grid-cols-subgrid content-start gap-y-8">
              <p className="col-span-2 m-0 flex items-center gap-3 text-eyebrow text-ink-on-brand/75 uppercase">
                {group.label}
                <span aria-hidden="true" data-reveal="rule" className="block h-px flex-1 bg-ink-on-brand/25" />
              </p>
              {group.items.map((item, i) => (
                <div
                  key={item.label}
                  className={cn(
                    // Rows shared with the neighbouring figure, so lines stay level when a label wraps.
                    "row-span-3 grid grid-rows-subgrid gap-y-2 pe-4",
                    i > 0 && "border-s border-ink-on-brand/15 ps-5 sm:ps-8",
                    g > 0 && i === 0 && "lg:border-s lg:border-ink-on-brand/15 lg:ps-8",
                  )}
                >
                  <p className="o2-figure m-0 flex items-baseline tabular-nums">
                    <Figure figure={item.figure} />
                  </p>
                  <p className="m-0 mt-3 text-heading-sm">{item.label}</p>
                  <p className="m-0 text-caption text-ink-on-brand/75">{item.source}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
