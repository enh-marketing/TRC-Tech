import { SectionHeader } from "@/components/ui";
import { domains } from "@/content/home";
import { DomainsMap } from "./DomainsMap";

/**
 * Who we hire for. On desktop a hiring map: TRC at the centre, the six kinds
 * of organisation around it, and a panel beside the heading for the one
 * selected. On phones and tablets the same six stops sit on a vertical line.
 * The heading renders once; the grid in DomainsMap places it for both.
 */
export function Domains() {
  const header = (
    <SectionHeader
      id="domains-title"
      eyebrow={domains.eyebrow}
      title={domains.title}
      titleTail={domains.titleTail}
      intro={domains.intro}
    />
  );
  return (
    <section aria-labelledby="domains-title" className="overflow-hidden bg-surface-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
        <DomainsMap items={domains.items} header={header} />
      </div>
    </section>
  );
}
