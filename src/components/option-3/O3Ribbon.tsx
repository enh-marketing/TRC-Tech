import { Bracket } from "@/components/ui";
import { domains } from "@/content/home";
import { pillars } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Two crossing ribbons of moving text above What we do, after the agency's
 * reference. The green one in front carries the 20 role specialisms and drifts
 * left; the mint one behind, tilted the other way, carries the six kinds of
 * organisation and drifts right. Real content, not slogans. Decorative (every
 * item is on the page elsewhere), so hidden from screen readers. Both rest under
 * the pointer and stand still with reduced motion (the shared o3-track rules).
 */
export function O3Ribbon() {
  const roles = pillars.flatMap((p) => p.roles);
  const kinds = [...domains.items, ...domains.items].map((d) => d.title);

  const row = (items: string[], tone: "front" | "back") => (
    <div className={cn("o3-track flex w-max", tone === "front" ? "o3-track-left [animation-duration:70s]" : "o3-track-right [animation-duration:90s]")}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="m-0 flex shrink-0 list-none items-center gap-8 p-0 pe-8 sm:gap-10 sm:pe-10">
          {items.map((item, i) => (
            <li key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap sm:gap-10">
              {item}
              <Bracket size="sm" tone={tone === "front" ? "brand" : "accent"} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );

  return (
    // Just enough room above and below for the 2.5° tilt at each width (about tan 2.5° x half the screen).
    <div aria-hidden="true" className="o3-marquee relative overflow-hidden py-8 sm:py-10 lg:py-12 2xl:py-16">
      <div className="absolute inset-x-[-10%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-surface-brand py-3 text-heading-sm text-ink-on-brand/75 sm:py-4 sm:text-heading-md">
        {row(kinds, "back")}
      </div>
      <div className="relative -mx-[10%] -rotate-[2.5deg] bg-surface-accent py-3.5 text-heading-sm font-medium text-ink-on-accent shadow-card sm:py-5 sm:text-heading-md">
        {row(roles, "front")}
      </div>
    </div>
  );
}
