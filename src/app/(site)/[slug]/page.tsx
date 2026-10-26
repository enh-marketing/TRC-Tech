import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, SectionHeader } from "@/components/ui";
import { plannedPages, site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return plannedPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = plannedPages.find((p) => p.slug === slug);
  return page ? { title: page.title, robots: { index: false, follow: false } } : {};
}

/**
 * Every page in the sitemap that is not designed yet. Honest about it, so the
 * homepage can be reviewed with working links before the rest is built.
 */
export default async function PlannedPage({ params }: Params) {
  const { slug } = await params;
  const page = plannedPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <section className="bg-surface-canvas">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 py-24 lg:py-32">
        <SectionHeader as="h1" titleSize="text-display-lg" eyebrow="Planned page" title={page.title} intro={page.purpose} />
        <p className="m-0 max-w-[60ch] text-body text-ink-700">
          This page is in the agreed sitemap and will be designed after the homepage is approved.
          {site.preview ? (
            <>
              {" "}The full specification is in{" "}
              <Link href="/docs/sitemap" className="text-accent-700 underline underline-offset-2">
                Project docs
              </Link>
              .
            </>
          ) : null}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/" variant="secondary">
            Back to the homepage
          </Button>
          {page.slug !== "hire-talent" ? <Button href={site.cta.hire.href}>{site.cta.hire.label}</Button> : null}
        </div>
      </div>
    </section>
  );
}
