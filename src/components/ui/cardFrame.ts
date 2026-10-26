/**
 * The card border used across the site, after the How it works cards: a slim
 * translucent bezel (6px of the text colour at 8%, with a hairline edge at 20%)
 * around a coloured panel whose corners are concentric with it (16px outside,
 * 10px inside). Tinting from ink-900 makes the bezel read the same on the page,
 * on the bands and on brand surfaces, in both themes.
 *
 * Where cards stack and overlap (the hero deck, the Why TRC stack), the section
 * sets `--card-ground` to its own background so the bezel is solid and the card
 * behind never shows through it.
 */
export const cardFrame =
  "rounded-lg bg-[color-mix(in_srgb,var(--trc-ink-900)_8%,var(--card-ground,transparent))] p-1.5 shadow-card ring-1 ring-ink-900/20";

/** The panel inside a frame: 10px corners and a soft inner highlight. Add the colour and padding. */
export const cardPanel = "rounded-[10px] ring-1 ring-white/10 ring-inset";

/** Hover lift for a framed card that is a link or holds one. */
export const cardLift =
  "transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card-hover hover:ring-ink-900/40 motion-reduce:transition-none";
