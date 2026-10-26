import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/docs/Prose";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";
import { cn } from "@/lib/cn";
import { getDoc, getDocs } from "@/lib/docs";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return doc
    ? { title: `${doc.title} · Project docs`, description: doc.summary, robots: { index: false, follow: false } }
    : {};
}

function DocList({ current }: { current: string }) {
  const docs = getDocs();
  return (
    <ol className="m-0 flex list-none flex-col gap-1 p-0">
      {docs.map((d, i) => (
        <li key={d.slug}>
          <Link
            href={`/docs/${d.slug}`}
            aria-current={d.slug === current ? "page" : undefined}
            className={cn(
              "flex gap-3 rounded-sm px-3 py-2 text-body-sm no-underline transition-colors duration-150",
              d.slug === current
                ? "bg-surface-accent text-ink-on-accent"
                : "text-ink-700 hover:bg-surface-200 hover:text-ink-900",
            )}
          >
            <span className="font-mono tabular-nums opacity-70">{String(i + 1).padStart(2, "0")}</span>
            {d.title}
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default async function DocPage({ params }: Params) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const docs = getDocs();
  const index = docs.findIndex((d) => d.slug === slug);
  const prev = docs[index - 1];
  const next = docs[index + 1];

  return (
    <div className="min-h-dvh bg-surface-canvas">
      <ShowcaseHeader />
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-10 pb-24 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <details className="rounded-md border border-line-100 p-3 lg:hidden">
            <summary className="cursor-pointer text-field-label text-ink-900">All documents</summary>
            <div className="mt-3">
              <DocList current={slug} />
            </div>
          </details>
          <nav aria-label="Project documents" className="hidden lg:block">
            <Link href="/docs" className="mb-3 block px-3 text-eyebrow uppercase text-ink-500 no-underline">
              Project docs
            </Link>
            <DocList current={slug} />
          </nav>
        </aside>

        <main className="min-w-0">
          <p className="m-0 font-mono text-caption text-ink-500 tabular-nums">
            {String(index + 1).padStart(2, "0")} of {String(docs.length).padStart(2, "0")}
          </p>
          <h1 className="mt-2 mb-0 text-display-lg text-ink-900">{doc.title}</h1>
          <Prose source={doc.body} />

          <nav aria-label="Previous and next" className="mt-16 grid gap-4 border-t border-line-100 pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/docs/${prev.slug}`} className="flex flex-col gap-1 rounded-md border border-line-100 p-4 no-underline hover:border-line-200">
                <span className="text-caption text-ink-500">Previous</span>
                <span className="text-heading-sm text-ink-900">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/docs/${next.slug}`} className="flex flex-col gap-1 rounded-md border border-line-100 p-4 text-end no-underline hover:border-line-200">
                <span className="text-caption text-ink-500">Next</span>
                <span className="text-heading-sm text-ink-900">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        </main>
      </div>
    </div>
  );
}
