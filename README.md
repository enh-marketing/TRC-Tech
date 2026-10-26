# TRC Tech Hiring

The TRC Tech Hiring website, its design system and its project documents, in one Next.js project. The homepage is built; the other pages in the sitemap render as marked placeholders.

## Running it

```bash
npm install
npm run dev
```

| URL | What |
|---|---|
| http://localhost:3100/ | The website homepage |
| http://localhost:3100/design-system/ | The design system reference |
| http://localhost:3100/docs/ | The project documents |

## Preview mode

`site.preview` in `src/content/site.ts` is on. Reviewers can also flip between the three headline drafts with the numbered buttons beside the hero headline. It shows a review bar, amber **Draft** markers on content that needs facts or approval from TRC, and dashed slots where phase 2 sections will go, and it keeps the site out of search results. Set it to `false` for launch.

```bash
npm run build && npm start   # production build
```

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind v4, configured CSS-first in `src/app/globals.css`
- Readex Pro self-hosted through `next/font/google`
- TypeScript

## Where the brand values came from

The two brand colours were read from the pixels of TRC Corporate Consulting's own logo file and cross-checked against the live stylesheet at trcconsulting.org:

| | Value | Role |
|---|---|---|
| Deep teal | `#053736` | Wordmark ink, `surface-brand`, `ink-900` in light |
| Green | `#6ebe48` | Logo bracket, `surface-accent` |
| Typeface | Readex Pro | The face already in use on trcconsulting.org |

Nothing was matched by eye.

## How theming works

Raw values live on `:root` in `globals.css` and flip in three places: the light defaults, a `prefers-color-scheme: dark` block guarded by `:root:not([data-theme="light"])`, and a `:root[data-theme="dark"]` block for the explicit toggle.

The Tailwind theme then maps them with `@theme inline`, which keeps the `var()` reference inside each generated utility:

```css
@theme inline {
  --color-surface-100: var(--trc-surface-100);
}
```

The practical result: `bg-surface-100` is correct in both themes, and **there is no `dark:` prefix anywhere in the markup**. Adding a third theme later means adding one block of variables, with no component changes.

## Spacing

The design system names ten steps. They all already exist in Tailwind's native 4px scale, so the Tailwind number is what you write. The mapping table is on the Spacing section of the page.

| Token | Value | Tailwind |
|---|---|---|
| space-1 to space-4 | 4 to 16px | `1`, `2`, `3`, `4` |
| space-5 | 24px | `6` |
| space-6 | 32px | `8` |
| space-7 | 48px | `12` |
| space-8 | 64px | `16` |
| space-9 | 96px | `24` |
| space-10 | 128px | `32` |

## Components

All exported from `@/components/ui`:

`Bracket` · `Button` · `Card` / `PillarCard` · `DualPathBand` · `FormField` (with `Input`, `Select`, `Textarea`, `FileInput`) · `SectionHeader` · `StatTile` · `Tag` / `StaticTag`

Each exists because a page in the agreed sitemap needs it.

## Rules that are not negotiable

**White text never goes on the brand green.** It measures 2.3:1 and fails at every size. Green fills carry `ink-on-accent` (5.7:1). For green text on a light ground, use `accent-700` (5.0:1).

**Input borders use `line-200`, never `line-100`.** Only `line-200` meets the 3:1 floor for a border that a user has to see to operate a control.

**Status colour never stands alone.** `success-600` sits on the same hue axis as the brand green, so every status needs a word or an icon beside it.

**`StatTile` requires a source.** It is a required prop. A figure with nothing behind it does not ship.

## Before deployment

Set `NEXT_PUBLIC_SITE_URL` to the real domain, or the canonical URL, share image and structured data will point at localhost. Keep preview on for a review deployment; turn it off only at launch.

## Project docs

Everything behind the design lives in `docs/` as ten markdown files: the brief, the brief review, the competitor review, the sitemap, the forms, the homepage plan, build and tech notes, open questions, the decision log and the sources.

They render at http://localhost:3100/docs, and the same files are sections in the published design system. **The markdown in `docs/` is the single source.** Edit it here, then republish so both copies match.

## Known placeholders

- **The vertical's name.** TechX, TechAspire, TechXpert and TechSphere are all still open. "TRC Tech Hiring" is a stand-in.
- **The logo files.** `public/trc-logo.png` and `public/trc-logo-footer.png` are the parent company's marks, raster at 131×76. Request vector originals before build.
- **Every figure in the stat tiles.** Whether the 5,000 candidate pool exists today is an open question with TRC.

When the real name and mark arrive, four token values and one font family change in `globals.css`. No component needs touching.

## Related

The same system is published as a browsable design-system reference at
https://claude.ai/artifact/FHJC5fLwaGsuu3nMTJ7Vyn (private; share from that page).
