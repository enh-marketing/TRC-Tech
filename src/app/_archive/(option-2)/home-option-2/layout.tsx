import { AnalyticsListener } from "@/components/site/AnalyticsListener";
import { MotionProvider } from "@/components/site/MotionProvider";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { SkipLink } from "@/components/site/SkipLink";
import { ConceptBadge } from "@/components/option-2/ConceptBadge";
import { ConceptFooter } from "@/components/option-2/ConceptFooter";
import { ConceptHeader } from "@/components/option-2/ConceptHeader";

/**
 * ARCHIVED on 26 October 2026 at the agency's request: only concepts 1 and 3 go to
 * the client. This is concept 2's layout exactly as it was at
 * src/app/(option-2)/home-option-2/layout.tsx. Folders starting with "_" are never
 * routed, so nothing here is served. Its old address, /home-option-2/, now shows
 * concept 3 (renamed for the client), so to restore it, give it a new route folder
 * (for example src/app/(concept-2-original)/home-option-2b/) with this file and page.tsx.
 *
 * Homepage concept 2 has its own header and footer, so it lives in its own
 * route group and leaves concept 1 at / untouched. The motion layer is shared.
 */
export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SkipLink />
      <ConceptHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <ConceptFooter />
      <ConceptBadge />
      <AnalyticsListener />
      <ScrollReveal />
    </MotionProvider>
  );
}
