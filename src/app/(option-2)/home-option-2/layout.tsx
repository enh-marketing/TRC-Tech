import { AnalyticsListener } from "@/components/site/AnalyticsListener";
import { MotionProvider } from "@/components/site/MotionProvider";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { SkipLink } from "@/components/site/SkipLink";
import { O3Footer } from "@/components/option-3/O3Footer";
import { O3Header } from "@/components/option-3/O3Header";
import { O3OffscreenPause } from "@/components/option-3/O3Loops";

/**
 * Homepage concept 3, shown to the client as "Concept 2" at /home-option-2/ since
 * 26 October 2026: the original concept 2 was archived (src/app/_archive/), and the
 * agency did not want a gap in the numbering. Its code keeps the option-3 / O3 names.
 * It sits in this (option-2) folder only because files could not be moved from this
 * environment; /home-option-3/ redirects here (next.config.ts).
 *
 * Built section by section from the agency's references. The footer is concept 1's,
 * redrawn in this concept's style.
 */
export default function ConceptThreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SkipLink />
      <O3Header />
      {/* data-icons="loop": every content icon on this page loops for good (globals.css). */}
      <main id="main" tabIndex={-1} data-icons="loop" className="focus:outline-none">
        {children}
      </main>
      <O3Footer />
      <AnalyticsListener />
      <ScrollReveal />
      <O3OffscreenPause />
    </MotionProvider>
  );
}
