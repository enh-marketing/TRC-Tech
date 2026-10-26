import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The TRC Corporate Consulting mark, as a placeholder until the vertical has
 * its own. Rasters at 131x76 (positive) and 130x76 (reversed), so keep it under
 * 160px wide. Each file gets its own width, so neither is stretched.
 * `tone="auto"` swaps between the positive and reversed files by theme.
 */
export function Logo({
  tone = "auto",
  height = 40,
  className,
  priority = false,
}: {
  tone?: "auto" | "reversed";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((height * 131) / 76);
  const reversedWidth = Math.round((height * 130) / 76);
  if (tone === "reversed") {
    return (
      <Image
        src="/trc-logo-footer.png"
        alt="TRC"
        width={reversedWidth}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <span className={cn("inline-flex", className)}>
      <Image src="/trc-logo.png" alt="TRC" width={width} height={height} priority={priority} className="only-light" />
      <Image src="/trc-logo-footer.png" alt="TRC" width={reversedWidth} height={height} priority={priority} className="only-dark" />
    </span>
  );
}
