"use client";

import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center gap-2 min-h-8 px-3 py-1 rounded-full border text-body-sm " +
  "transition-colors duration-150 ease-out";

/** A read-only pill. Used for the roles list on a pillar page. */
export function StaticTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(base, "border-line-200 bg-surface-100 text-ink-700", className)}>
      {children}
    </span>
  );
}

/**
 * A selectable pill for the skills and roles multi-selects. Selection
 * fills with surface-accent, so it is never signalled by border alone.
 */
export function Tag({
  children,
  selected = false,
  onToggle,
  onRemove,
  className,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  className?: string;
}) {
  const label = typeof children === "string" ? children : undefined;

  return (
    <span
      className={cn(
        base,
        selected
          ? "bg-surface-accent border-surface-accent text-ink-on-accent"
          : "bg-surface-100 border-line-200 text-ink-700 hover:border-ink-900 hover:text-ink-900",
        className,
      )}
    >
      {onToggle ? (
        <button
          type="button"
          aria-pressed={selected}
          onClick={onToggle}
          className="cursor-pointer bg-transparent p-0 text-inherit"
        >
          {children}
        </button>
      ) : (
        children
      )}
      {onRemove ? (
        <button
          type="button"
          aria-label={label ? `Remove ${label}` : "Remove"}
          onClick={onRemove}
          className="inline-flex cursor-pointer border-0 bg-transparent p-0 leading-none text-inherit"
        >
          &times;
        </button>
      ) : null}
    </span>
  );
}
