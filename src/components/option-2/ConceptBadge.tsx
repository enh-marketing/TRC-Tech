import Link from "next/link";
import { site } from "@/content/site";

/**
 * Preview only: says which concept this is and links to the other, for
 * side-by-side review. Short on phones, so it covers as little as possible.
 */
export function ConceptBadge() {
  if (!site.preview) return null;
  return (
    <Link
      href="/"
      className="fixed right-3 bottom-3 z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-surface-100 px-4 text-caption text-ink-900 no-underline shadow-md ring-1 ring-line-100 transition-colors hover:ring-surface-accent sm:right-4 sm:bottom-4"
    >
      <span className="font-semibold">Concept 2</span>
      <span aria-hidden="true" className="text-ink-500">·</span>
      <span className="sm:hidden">See concept 1</span>
      <span className="hidden sm:inline">Compare with concept 1</span>
    </Link>
  );
}
