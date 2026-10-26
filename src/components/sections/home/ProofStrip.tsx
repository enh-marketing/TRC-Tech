import { Bracket, StatTile } from "@/components/ui";
import { proof } from "@/content/home";
import { site } from "@/content/site";

/**
 * Verified figures only. The first two belong to the parent company and are
 * labelled as such; the last two count the practice's own scope.
 *
 * All four sit on one grid (four equal columns from 1024px, two below), so
 * every figure, label and source lines up across both groups. Each group's
 * label carries a hairline that spans its two columns. The figures count up
 * once as the strip scrolls into view.
 */
export function ProofStrip() {
  const groups = [
    { label: site.parent.name, items: proof.slice(0, 2) },
    { label: "This practice", items: proof.slice(2) },
  ];

  return (
    <section aria-label="In numbers" className="bg-surface-100">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-12 px-4 py-12 sm:gap-x-10 lg:grid-cols-4 lg:py-16">
        {groups.map((group) => (
          <div key={group.label} data-reveal className="col-span-2 grid grid-cols-subgrid content-start gap-y-7">
            <p className="col-span-2 m-0 flex items-center gap-3 text-eyebrow text-ink-500 uppercase">
              <Bracket size="sm" />
              {group.label}
              <span aria-hidden="true" className="h-px flex-1 bg-line-100" />
            </p>
            {group.items.map((item) => (
              <StatTile key={item.label} bare countUp figure={item.figure} label={item.label} source={item.source} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
