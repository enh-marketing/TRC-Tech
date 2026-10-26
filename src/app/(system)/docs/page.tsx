import type { Metadata } from "next";
import Link from "next/link";
import { Bracket } from "@/components/ui";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";
import { getDocs } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Project docs",
  robots: { index: false, follow: false },
  description: "The brief, research, sitemap, homepage plan, decisions and open questions behind the TRC Tech Hiring website.",
};

export default function DocsIndex() {
  const docs = getDocs();

  return (
    <div className="min-h-dvh bg-surface-canvas">
      <ShowcaseHeader />
      <main className="mx-auto max-w-[1200px] px-4 pt-12 pb-24">
        <header className="flex max-w-[720px] flex-col gap-3">
          <p className="flex items-center gap-3 text-eyebrow uppercase text-ink-500">
            <Bracket />
            Project docs
          </p>
          <h1 className="m-0 text-display-lg text-ink-900">Everything behind the design</h1>
          <p className="m-0 text-body-lg text-ink-700">
            The brief, the research, the sitemap and homepage plan, every decision and every open
            question, kept with the design system so nothing from the planning is lost.
          </p>
        </header>

        <ol className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-2">
          {docs.map((doc, i) => (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="flex h-full flex-col gap-2 rounded-md border border-line-100 bg-surface-100 p-6 no-underline shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="font-mono text-caption text-ink-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-heading-md text-ink-900">{doc.title}</span>
                <span className="text-body-sm text-ink-700">{doc.summary}</span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
