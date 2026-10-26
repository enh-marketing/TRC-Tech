import { cn } from "@/lib/cn";

type BracketSize = "sm" | "md" | "lg";

const sizes: Record<BracketSize, string> = {
  sm: "size-1.5 border-t-2 border-r-2",
  md: "size-6 border-t-8 border-r-8",
  lg: "size-8 border-t-8 border-r-8",
};

/**
 * The top-right square bracket lifted from the TRC logo. The system's
 * single piece of ornament: one per section, never rotated or filled.
 */
export function Bracket({
  size = "md",
  tone = "accent",
  className,
}: {
  size?: BracketSize;
  /** "brand" draws it in deep teal, for the rare bracket that sits on a green fill. */
  tone?: "accent" | "brand";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block shrink-0 rounded-none",
        tone === "brand" ? "border-surface-brand" : "border-surface-accent",
        sizes[size],
        className,
      )}
    />
  );
}
