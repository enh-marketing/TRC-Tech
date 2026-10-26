import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";

/**
 * A figure, what it counts, and where it came from. The source line is
 * required: TRC Tech Hiring is a new vertical, so a figure belonging to
 * TRC Corporate Consulting has to say so. No verified figure, no tile.
 */
export function StatTile({
  figure,
  label,
  source,
  onBrand = false,
  bare = false,
  countUp = false,
  className,
}: {
  figure: string;
  label: string;
  source: string;
  onBrand?: boolean;
  /** No fill or radius, for a strip without cards. Its parent must be a grid. */
  bare?: boolean;
  /** Count the number up from zero when it first scrolls into view. */
  countUp?: boolean;
  className?: string;
}) {
  // "400+" splits into the number and its suffix; a "+" takes the accent.
  const match = figure.match(/^([\d,]+)(.*)$/);
  const value = match ? Number(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  return (
    <div
      className={cn(
        // Bare tiles share rows with their neighbours (the strip's grid), so figure,
        // label and source line up across columns even when a label wraps.
        bare ? "row-span-3 grid grid-rows-subgrid gap-y-1" : "flex flex-col gap-1",
        !bare && "rounded-md p-6",
        !bare && (onBrand ? "bg-ink-on-brand/10" : "bg-surface-200"),
        className,
      )}
    >
      <p
        className={cn(
          // Flex, so a figure with a suffix sits on exactly the same line as one without.
          "m-0 flex items-baseline text-stat tabular-nums",
          bare && "lg:text-display-xl",
          onBrand ? "text-accent-on-brand" : "text-ink-900",
        )}
      >
        {value === null ? (
          figure
        ) : (
          <>
            {countUp ? <CountUp value={value} /> : match?.[1]}
            {suffix ? <span className={suffix === "+" && !onBrand ? "text-accent-700" : undefined}>{suffix}</span> : null}
          </>
        )}
      </p>
      <p className={cn("m-0 text-heading-sm", bare && "mt-2", onBrand ? "text-ink-on-brand" : "text-ink-900")}>{label}</p>
      <p className={cn("m-0 text-caption", onBrand ? "text-ink-on-brand/70" : "text-ink-500")}>
        {source}
      </p>
    </div>
  );
}
