import { domainIcons } from "@/components/sections/home/DomainIcons";
import { domains } from "@/content/home";
import { SectionHead, spread, wrap } from "./shared";

/**
 * The six kinds of organisation as a still, ruled grid: every one is readable at
 * once, with no tour to wait for. Each icon plays its small animation while its
 * cell is hovered (the `di-host` rule shared with concept 1's map).
 */
export function ConceptSectors() {
  return (
    <section aria-labelledby="o2-sectors-title" className={`bg-surface-100 ${spread}`}>
      <div className={wrap}>
        <SectionHead id="o2-sectors-title" index="02" label={domains.eyebrow} title={domains.title} tail={domains.titleTail} intro={domains.intro} />

        <ul data-reveal className="m-0 mt-14 grid list-none gap-px overflow-hidden rounded-2xl bg-line-100 p-0 ring-1 ring-line-100 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {domains.items.map((d, i) => {
            const Icon = domainIcons[d.icon];
            return (
              <li key={d.title} className="di-host group flex flex-col gap-5 bg-surface-100 p-7 transition-colors duration-200 hover:bg-surface-canvas sm:p-9 lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex size-14 items-center justify-center rounded-full bg-surface-200 text-ink-900 transition-colors duration-200 group-hover:bg-surface-accent group-hover:text-ink-on-accent">
                    <Icon className="size-7" />
                  </span>
                  <span className="text-caption text-ink-500 tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(domains.items.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="m-0 text-heading-lg text-ink-900">{d.title}</h3>
                <p className="m-0 text-body text-ink-700">{d.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
