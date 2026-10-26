import Link from "next/link";
import { site } from "@/content/site";

/**
 * NOT USED since 26 October 2026: removed from the page at the agency's request (the
 * file could not be deleted from this environment; deleting it is safe).
 *
 * Preview only: says which concept this is and links to concept 1, for
 * side-by-side review. Short on phones, so it covers as little as possible.
 * Reads "Concept 2": internally concept 3, it is the second of the two the
 * client sees (the original concept 2 is archived).
 */
export function O3Badge() {
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
