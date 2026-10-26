import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "brand" | "onBrand";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border text-btn-label " +
  "transition-colors duration-150 ease-out cursor-pointer " +
  "disabled:bg-surface-300 disabled:border-surface-300 disabled:text-ink-500 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-surface-accent border-surface-accent text-ink-on-accent hover:bg-surface-accent-hover hover:border-surface-accent-hover",
  secondary:
    "bg-transparent border-line-200 text-ink-900 hover:bg-surface-200 hover:border-ink-900",
  brand:
    "bg-surface-brand border-brand-edge text-ink-on-brand hover:bg-surface-brand-hover hover:border-surface-brand-hover",
  onBrand:
    "bg-transparent border-ink-on-brand text-ink-on-brand hover:bg-ink-on-brand/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 py-2",
  md: "min-h-11 px-6 py-3",
  lg: "min-h-13 px-7 py-3.5",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    href: string;
  };
type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/**
 * One primary action per screen region. Labels are sentence case and
 * name the action: "Hire tech talent", never "Submit" or "Click here".
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
