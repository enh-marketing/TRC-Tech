import Link from "next/link";
import { domains } from "@/content/home";
import { site } from "@/content/site";
import { O3SectorTrack } from "./O3SectorTrack";

/**
 * Who we hire for, after the agency's reference: a pill label, the two-tone
 * title (one line from 1024px) and the intro (one line from 640px) with the
 * button beside it, then the six kinds of organisation as a scroll carousel in
 * concept 3's card style (see O3SectorTrack). The icons loop, and tilt and
 * quicken on hover.
 */
export function O3Sectors() {
  const { hire } = site.cta;

  return (
    <section aria-labelledby="o3-sectors-title" className="bg-surface-canvas">
      <O3SectorTrack
        items={domains.items}
        header={
          <div data-reveal="stagger">
            <p className="m-0 inline-flex rounded-full px-4 py-1.5 text-eyebrow text-ink-700 uppercase ring-1 ring-line-200">{domains.eyebrow}</p>
            <h2 id="o3-sectors-title" className="m-0 mt-5 text-display-sm sm:text-display-md text-ink-900 lg:whitespace-nowrap">
              {domains.title} <span className="text-ink-500">{domains.titleTail}</span>
            </h2>
          </div>
        }
        intro={<p className="m-0 text-body-lg text-ink-700 sm:whitespace-nowrap">{domains.intro}</p>}
        action={
          <Link
            href={hire.href}
            data-track="hire_cta_click"
            data-location="who_we_hire_for"
            className="o3-press inline-flex min-h-13 shrink-0 items-center justify-center rounded-full bg-surface-accent px-8 text-btn-label text-ink-on-accent no-underline transition-colors duration-150 hover:bg-surface-accent-hover"
          >
            {hire.label}
          </Link>
        }
      />
    </section>
  );
}
