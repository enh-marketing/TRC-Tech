import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import { PracticeIcon } from "@/components/sections/home/PracticeIcon";
import { whatWeDo } from "@/content/home";
import { pillars } from "@/content/site";
import { ArrowLink, SectionHead, spread, wrap } from "./shared";

/**
 * The four practices as an index, one row per practice: number, name, summary
 * with every role it covers, and the role count with an arrow. The whole row is
 * the link; on hover its icon and arrow fill green. Rules between rows draw in.
 */
export function ConceptPractices() {
  return (
    <section id="what-we-do" aria-labelledby="o2-practices-title" className={`bg-surface-canvas ${spread}`}>
      <div className={wrap}>
        <SectionHead id="o2-practices-title" index="01" label={whatWeDo.eyebrow} title={whatWeDo.title} tail={whatWeDo.titleTail} intro={whatWeDo.intro} />

        <ol className="m-0 mt-14 list-none p-0 lg:mt-20">
          {pillars.map((p, i) => (
            <li key={p.slug} data-reveal>
              <span aria-hidden="true" data-reveal="rule" className="block h-px bg-line-200" />
              <Link
                href={p.href}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 gap-y-5 py-8 no-underline lg:grid-cols-12 lg:gap-x-8 lg:py-11"
              >
                <span className="pt-1 text-body-sm text-ink-500 tabular-nums lg:col-span-1 lg:pt-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-4 lg:col-span-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-200 text-ink-900 transition-colors duration-200 group-hover:bg-surface-accent group-hover:text-ink-on-accent">
                    <PracticeIcon slug={p.slug} className="size-6" />
                  </span>
                  <span className="text-heading-lg text-ink-900 sm:text-display-sm">{p.title}</span>
                </span>
                <span className="col-span-2 flex flex-col gap-4 lg:col-span-5">
                  <span className="text-body-lg text-ink-700">{p.summary}</span>
                  <ul
                    aria-label={`${p.title} roles`}
                    className="m-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-body-sm text-ink-500 [&>li:not(:last-child)]:after:ms-2 [&>li:not(:last-child)]:after:content-['·']"
                  >
                    {p.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </span>
                <span className="col-span-2 flex items-center justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end lg:justify-start lg:gap-6">
                  <span className="text-body-sm font-semibold text-ink-900 tabular-nums">{p.roles.length} role specialisms</span>
                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-full border border-line-200 text-ink-900 transition-colors duration-200 group-hover:border-surface-accent group-hover:bg-surface-accent group-hover:text-ink-on-accent"
                  >
                    <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <span aria-hidden="true" data-reveal="rule" className="block h-px bg-line-200" />

        <div data-reveal className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="m-0 text-eyebrow text-ink-500 uppercase">All practices</p>
          <ArrowLink href="/what-we-do/">See how each practice works</ArrowLink>
        </div>
      </div>
    </section>
  );
}
