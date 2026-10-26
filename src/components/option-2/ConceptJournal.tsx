import Link from "next/link";
import { ReservedSlot } from "@/components/site/Draft";
import { insights, type Insight } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { ArrowLink, SectionHead, spread, wrap } from "./shared";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Meta({ post, as: Tag = "p", className }: { post: Insight; as?: "p" | "span"; className?: string }) {
  return (
    <Tag className={className}>
      <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
      <span aria-hidden="true"> · </span>
      {post.readMinutes} min read
    </Tag>
  );
}

/**
 * Insights as a magazine page instead of a slider: the newest piece as a large
 * feature on the brand surface, the rest as a ruled list beside it, all visible
 * at once. Each whole entry is the link. Same articles as concept 1.
 */
export function ConceptJournal() {
  const items = shown(insights.items);
  if (items.length < 3) return <ReservedSlot title="Latest insights" note="Three or more published articles." />;
  const [lead, ...rest] = items;

  return (
    <section aria-labelledby="o2-journal-title" className={`bg-surface-100 ${spread}`}>
      <div className={wrap}>
        <SectionHead id="o2-journal-title" index="06" label={insights.eyebrow} title={insights.title} tail={insights.titleTail}>
          <ArrowLink href="/insights/">All insights</ArrowLink>
        </SectionHead>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-x-8">
          <article data-reveal className="group relative lg:col-span-6">
            <div className="relative isolate flex min-h-[26rem] flex-col justify-end gap-4 overflow-hidden rounded-2xl bg-surface-brand p-8 text-ink-on-brand sm:p-10 lg:h-full">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-[9%] right-[9%] -z-10 aspect-square w-[46%] border-t-[36px] border-r-[36px] border-current opacity-[0.1] transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 motion-reduce:transition-none"
              />
              <p className="m-0 text-eyebrow text-ink-on-brand/75 uppercase">{lead.audience}</p>
              <h3 className="m-0 max-w-[18ch] text-display-sm sm:text-display-md">
                <Link href={lead.href} className="text-inherit no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                  {lead.title}
                </Link>
              </h3>
              <p className="m-0 max-w-[48ch] text-body-lg text-ink-on-brand/85">{lead.excerpt}</p>
              <Meta post={lead} className="m-0 text-caption text-ink-on-brand/75 tabular-nums" />
            </div>
          </article>

          <ul className="m-0 list-none p-0 lg:col-span-6">
            {rest.map((post, i) => (
              <li key={post.title} data-reveal className="group relative">
                {i > 0 ? <span aria-hidden="true" data-reveal="rule" className="block h-px bg-line-200" /> : null}
                <div className="grid gap-2 py-6 first:pt-0">
                  <p className="m-0 flex flex-wrap items-center gap-x-3 text-caption text-ink-500">
                    <span className="font-semibold text-accent-700 uppercase tracking-[0.08em]">{post.audience}</span>
                    <Meta post={post} as="span" className="tabular-nums" />
                  </p>
                  <h3 className="m-0 text-heading-md text-ink-900 transition-colors duration-200 group-hover:text-accent-700">
                    <Link href={post.href} className="text-inherit no-underline after:absolute after:inset-0 after:content-['']">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="m-0 text-body-sm text-ink-700">{post.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
