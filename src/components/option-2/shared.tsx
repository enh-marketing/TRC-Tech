import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import { cn } from "@/lib/cn";

/**
 * Homepage concept 2, "Editorial Index": shared layout pieces. One wider column
 * (1280px), a 12-column grid from 1024px, numbered section labels with a green
 * rule, and titles that run on as one sentence with the second half muted.
 */

/** Where concept 2 lives, so its own links (logo, Home) stay inside it. */
export const conceptHome = "/home-option-2";

/** The page column. */
export const wrap = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

/** Section padding: generous, so each section reads as its own spread. */
export const spread = "py-20 lg:py-32";

/** "01 / What we do": the rule draws in as the section arrives. `onBrand` for the brand surface. */
export function Label({ index, children, onBrand, className }: { index?: string; children: React.ReactNode; onBrand?: boolean; className?: string }) {
  return (
    <p className={cn("m-0 flex items-center gap-3 text-eyebrow uppercase", onBrand ? "text-ink-on-brand/75" : "text-ink-500", className)}>
      <span aria-hidden="true" data-reveal="rule" className="block h-0.5 w-8 shrink-0 bg-surface-accent" />
      {index ? (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true">/</span>
        </>
      ) : null}
      {children}
    </p>
  );
}

/** A title whose second half is muted, read as one sentence. */
export function Title({ lead, tail, as: Tag = "h2", id, className }: { lead: string; tail?: string; as?: "h1" | "h2" | "h3"; id?: string; className?: string }) {
  return (
    <Tag id={id} className={cn("m-0 text-ink-900", className)}>
      {lead}
      {tail ? (
        <>
          {" "}
          <span className="text-ink-500">{tail}</span>
        </>
      ) : null}
    </Tag>
  );
}

/**
 * The section opening: label and title on the left (7 columns), the intro and any
 * action on the right (4 columns), bottoms aligned. Stacks below 1024px.
 */
export function SectionHead({
  id,
  index,
  label,
  title,
  tail,
  intro,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  tail?: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
      <div data-reveal className="flex flex-col gap-6 lg:col-span-7">
        <Label index={index}>{label}</Label>
        <Title id={id} lead={title} tail={tail} className="o2-title" />
      </div>
      {intro || children ? (
        <div data-reveal className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">
          {intro ? <p className="m-0 text-body-lg text-ink-700">{intro}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** A text action with an arrow in a circle; the circle fills green on hover. */
export function ArrowLink({
  href,
  children,
  className,
  ...rest
}: { href: string; children: React.ReactNode; className?: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn("group inline-flex min-h-11 items-center gap-3 text-btn-label text-ink-900 no-underline", className)} {...rest}>
      <span className="underline decoration-line-200 decoration-1 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-surface-accent">{children}</span>
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-200 transition-colors duration-200 group-hover:border-surface-accent group-hover:bg-surface-accent group-hover:text-ink-on-accent"
      >
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </Link>
  );
}
