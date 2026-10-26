import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Marks content that is waiting on facts or approval from TRC. Renders only in
 * preview mode, so turning preview off for launch removes every marker at once.
 */
export function DraftChip({
  children,
  onBrand = false,
  className,
}: {
  children: React.ReactNode;
  onBrand?: boolean;
  className?: string;
}) {
  if (!site.preview) return null;
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-lg border border-dashed px-2.5 py-0.5 text-caption",
        onBrand ? "border-warning-on-brand text-warning-on-brand" : "border-warning-600 text-warning-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", onBrand ? "bg-warning-on-brand" : "bg-warning-600")}
      />
      <span>
        <span className="font-semibold">Draft:</span> {children}
      </span>
    </span>
  );
}

/** A planned phase 2 section, shown to reviewers only. Nothing renders at launch. */
export function ReservedSlot({ title, note }: { title: string; note: string }) {
  if (!site.preview) return null;
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-dashed border-line-200 px-5 py-4">
        <span className="text-eyebrow uppercase text-ink-500">Reserved, phase 2</span>
        <span className="text-heading-sm text-ink-900">{title}</span>
        <span className="text-body-sm text-ink-500">{note}</span>
      </div>
    </div>
  );
}
