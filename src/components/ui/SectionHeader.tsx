import { cn } from "@/lib/cn";
import { Bracket } from "./Bracket";

/** Muted colour for the second line of a two-tone title, on light and brand grounds. */
export const titleTailTone = { light: "text-ink-500", onBrand: "text-ink-on-brand/60" };

/**
 * Two-tone title: the lead in full ink, the tail on its own line in a muted
 * tone. A space separates them so screen readers do not run the words
 * together. Every section title on the site uses this.
 */
export function TwoToneTitle({
  lead,
  tail,
  onBrand = false,
}: {
  lead: string;
  tail?: string;
  onBrand?: boolean;
}) {
  return (
    <>
      {lead}
      {tail ? (
        <>
          {" "}
          <span className={cn("block", onBrand ? titleTailTone.onBrand : titleTailTone.light)}>{tail}</span>
        </>
      ) : null}
    </>
  );
}

/**
 * Opens every section. The eyebrow is the only uppercase text in the
 * system; the content stays sentence case so screen readers do not
 * spell it out. One bracket per section lives here.
 */
export function SectionHeader({
  eyebrow,
  title,
  titleTail,
  intro,
  onBrand = false,
  centre = false,
  as: Heading = "h2",
  titleSize = "text-display-sm sm:text-display-md",
  id,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Second line of the title, in a muted tone. */
  titleTail?: string;
  intro?: string;
  onBrand?: boolean;
  centre?: boolean;
  as?: "h1" | "h2" | "h3";
  titleSize?: string;
  /** Put on the heading, so a section can point aria-labelledby at it. */
  id?: string;
  className?: string;
}) {
  return (
    <header
      data-reveal
      className={cn(
        "flex max-w-[720px] flex-col gap-3",
        centre && "mx-auto items-center text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-eyebrow uppercase",
          onBrand ? "text-ink-on-brand" : "text-ink-500",
        )}
      >
        <Bracket />
        {eyebrow}
      </p>
      <Heading id={id} className={cn("m-0", titleSize, onBrand ? "text-ink-on-brand" : "text-ink-900")}>
        <TwoToneTitle lead={title} tail={titleTail} onBrand={onBrand} />
      </Heading>
      {intro ? (
        <p className={cn("m-0 text-body-lg", onBrand ? "text-ink-on-brand" : "text-ink-700")}>
          {intro}
        </p>
      ) : null}
    </header>
  );
}
