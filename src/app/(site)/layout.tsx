import { AnalyticsListener } from "@/components/site/AnalyticsListener";
import { MotionProvider } from "@/components/site/MotionProvider";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SkipLink } from "@/components/site/SkipLink";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
      <AnalyticsListener />
      <ScrollReveal />
    </MotionProvider>
  );
}
