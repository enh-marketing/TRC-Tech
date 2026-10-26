# Build and tech

How the site is built, and how the homepage sections are managed in code.

## Stack

- **Next.js 16.4.2** (App Router) and **React 19.3.1**
- **Tailwind CSS 4.3.3**, configured CSS-first in `src/app/globals.css`
- **TypeScript 5.9**
- **Readex Pro** self-hosted with `next/font/google`: no third-party font request, no layout shift
- Dev server on port 3100 (`npm run dev`)

Tailwind v4 was chosen as the default for a new project. Moving to v3 later is a config change, not a rewrite.

## Theming

Raw values sit on `:root` as `--trc-*` variables and flip in three blocks: the light defaults, a `prefers-color-scheme: dark` block guarded by `:root:not([data-theme="light"])`, and `:root[data-theme="dark"]` for the explicit toggle.

The Tailwind theme maps them with `@theme inline`, which keeps the `var()` reference inside each generated utility. `bg-surface-100` is correct in both themes, and **no `dark:` prefix appears anywhere in the markup**. A third theme is one more block of variables.

**Layering.** Light and dark layer differently, so two tokens carry the difference instead of the markup. `surface-canvas` is the page and every plain section: `#f6f9f7`, a soft green-grey, in light, and the same `#04211f` as `surface-100` in dark. `surface-100` is white in light, for the header, cards and inputs, so they stand off the page. `surface-raised` is for a neutral card that must lift off the page: white in light, `#0a2e2b` in dark. Alternate bands stay `surface-200` (`#edf3f0` in light). Light text colours were tuned for the deeper bands: `ink-500` `#566a67` (5.1:1 on `surface-200`) and `accent-700` `#387024` (5.3:1). `accent-on-brand` (`#8fd46e`) is green text on the lighter teal, `surface-brand-hover`, where the accent itself drops to 4.4:1. Teal text on the green is never lighter than 90% (4.8:1). Light shadows are two soft layers; dark shadows are unchanged. **No dark fills in light** (agency rule, 26 October 2026): `surface-brand` is a light brand mint (`#e0eee9`) in light and the wordmark teal in dark, `surface-brand-hover` (cards on a brand surface) is white in light, and `ink-on-brand` flips to teal, so the hero, the How it works band, the footer, the phone menu, brand cards and brand buttons are all light in the light theme with no component code per theme. Green text and icons on brand surfaces use `accent-on-brand` (`#387024` in light, `#6ebe48` in dark) and `accent-on-brand-hover` on the lighter cards. Logos on brand surfaces use the theme-aware `Logo`. Small text on brand surfaces is never below 75% opacity (4.5:1 on the mint); title tails stay at 60% as large text. The hero photos sit at 14% on the mint (25% on teal), set by `--trc-hero-photo-opacity`. Dark teal remains only as text, icons, outlines and the logo. Anything that cuts a notch in the page colour, such as the "or" badge between the final doors and the logo strip's blend background, uses `surface-canvas`.

## Spacing

The design system names ten steps; all of them already exist in Tailwind's 4px scale, so code uses the Tailwind number.

| Token | Value | Tailwind |
|---|---|---|
| space-1, 2, 3, 4 | 4, 8, 12, 16px | `1`, `2`, `3`, `4` |
| space-5 | 24px | `6` |
| space-6 | 32px | `8` |
| space-7 | 48px | `12` |
| space-8 | 64px | `16` |
| space-9 | 96px | `24` |
| space-10 | 128px | `32` |

## File structure for the site

As built on 23 October 2026. Four route groups share the root layout (fonts and the theme script); `(option-2)` and `(option-3)` hold homepage concepts 2 and 3 (added 26 October 2026):

```
src/app/(site)/layout.tsx       SkipLink, SiteHeader, <main id="main">, SiteFooter
src/app/(site)/page.tsx         the homepage, at /: sections listed in order
src/app/(site)/[slug]/page.tsx  every planned page, rendered as a marked placeholder
src/app/(system)/design-system/ the design system reference, at /design-system
src/app/(system)/docs/          these documents, at /docs
src/app/(option-2)/home-option-2/  concept 3's route since 26 October 2026, shown to the client as concept 2
src/app/_archive/(option-2)/       concept 2's page and layout as they were, never served
src/app/(option-3)/home-option-3/  stub: redirects to /home-option-2/, where concept 3 now lives
src/app/icon.png                favicon, made from the real logo file padded to a square
src/content/site.ts             nav, footer, contact, offices, company facts
src/content/home.ts             all homepage copy and data, typed
src/components/ui/              the design system components
src/components/site/            SiteHeader (with the practices menu and mobile drawer),
                                SiteFooter, SkipLink, Logo, Draft markers, AnalyticsListener,
                                MotionProvider, ScrollReveal
src/components/sections/home/   Hero, ProofStrip, ClientLogos, Pillars, Domains,
                                HowItWorks, WhyTrc, Testimonials, LatestInsights, Faq
src/lib/seo.ts                  Organization and WebSite JSON-LD
src/lib/analytics.ts            one track() helper for call-to-action clicks
src/lib/motion.ts               loadGsap, useScrollMotion: the GSAP side of the motion layer
src/components/option-2/        concept 2's sections, header, footer and shared layout pieces
src/components/option-3/        concept 3's sections, header, footer and badge
```

## How sections are managed

1. **Simple composition, not a page builder.** `page.tsx` lists the sections in order. Reordering means moving one line.
2. **Copy lives apart from the components.** Changing text never touches layout code. When a CMS arrives, `home.ts` becomes a data fetch with the same types.
3. **Phase 2 sections hide themselves until their content is ready.** Logos need 6 or more with permission; testimonials need 2 or more with name, role and company; insights need 3 or more posts; a StatTile cannot render without a source. Nothing ships as an empty grey box.
4. **One source for contact facts.** `site.ts` feeds the header, footer, contact page and JSON-LD.
5. **Server components by default.** Only the mobile menu needs browser JavaScript. The homepage is pre-rendered as static HTML.

## Preview mode

`site.preview` in `src/content/site.ts` switches on placeholder content, the Draft markers and the reserved phase 2 slots, and sets the page to `noindex`. Set it to `false` for launch.

Content items can carry a `placeholder` note. `shown()` in `src/lib/placeholder.ts` drops them when preview is off, so dummy quotes, dummy articles, dummy FAQ answers, the parent company's logos and the parent company's contact details can never go live by accident. Replacing an item with real content means removing its `placeholder` note.

## Client logo carousel

`src/components/sections/home/LogoMarquee.tsx` and the `.marquee-*` and `.logo-mono` rules in `globals.css`. Two identical copies of the logo list move by half their width for a seamless loop; the second copy is hidden from screen readers. The moving track carries the page background colour, because it is a stacking context and the logos' blend modes mix with it.

## Counting figures

`CountUp` in `src/components/ui/CountUp.tsx` (client). `StatTile` uses it when `countUp` is set and the figure starts with a number (`"400+"` splits into 400 and a suffix). The server renders the final value; once GSAP has loaded, a figure still below the screen resets to zero and counts up once when it reaches 85% of the screen (a GSAP tween on a ScrollTrigger, `power3.out` over 1.6s; see Motion). An invisible copy of the final value holds the width, so the suffix never moves, and screen readers get only the final value. Reduced motion skips the count. In the numbers strip, tiles are row subgrids (`bare`), so their figure, label and source share rows across columns.

## Card frame

Every content card uses one frame, after the How it works cards: `cardFrame`, `cardPanel` and `cardLift` in `src/components/ui/cardFrame.ts`. The frame is a 6px bezel of the text colour (`ink-900`) at 8% with a hairline edge at 20% and the `shadow-card` drop shadow; the panel inside carries the card's colour, 10px corners concentric with the frame's 16px, and a faint inner highlight. Because the bezel tints from `ink-900`, it reads the same on the page, the bands and brand surfaces in both themes. Where cards overlap (the hero deck, the Why TRC stack) the container sets `--card-ground` to its background so the bezel is solid and the card behind never shows through. `cardLift` raises link cards 6px on hover. Used by: the hero deck, What we do (and its end card), the hiring map's detail card, How it works, Why TRC (and the pool card), Latest insights, the FAQ questions and contact card, the final doors, the footer's address card, and the shared `Card` (design system). Not framed: the testimonial portraits (photos), pills and buttons, and small tiles inside a card.

## Testimonial wall

`PortraitWall` in `src/components/sections/home/PhaseTwo.tsx`, with the column layout in `testimonials.wall` in `src/content/home.ts`. The wall is full width; each column is 10% of the screen up to 200px. Each column has a drop (`offset`, in px at desktop, scaled by `--u` from 0.42 on phones to 1.45 on screens 1536px and wider) and a breakpoint it appears from. A card shows its photo only when `isShown()` allows it; otherwise a silhouette and its role.

The faded placeholder cards that topped each column and the dashed threads under them were removed on 26 October 2026 (they read as loading skeletons); the wall now opens with top padding. The headline block rises into the wall's U with a negative top margin set per breakpoint, up to a `3xl` breakpoint at 1800px (defined in `@theme`, because an arbitrary `min-[1800px]` variant sorts before `2xl` and loses).

The review build's portraits are in `public/placeholders/people/portrait-01.jpg` to `portrait-13.jpg`: 480 by 600 crops made with Unsplash's face-area crop. Rename a file when replacing it, because the image optimiser and browsers cache by path.

## Hero slides

`src/components/sections/home/hero/`. `slides.tsx` is the slider engine: `useSlides(count)` keeps the current slide and the play state, and pauses on hover, on focus and when the hero is scrolled off screen (IntersectionObserver); any choice by the reader stops autoplay, and reduced motion turns it off on load. The timer is a CSS animation (`.hero-timer` in `globals.css`, seven seconds); its `animationend` moves to the next slide, so pausing the animation pauses the slider and the bar and the slide can never drift apart. The same file holds the pause and step buttons, the slide heading (H1 for slide one, H2 after) and the pill links, which keep `data-track` for the analytics listener. `HeroDeck.tsx` is the hero: the deck follows the pointer while dragging, a release past 80px sends the front card to the back, and cards settle with a CSS transition. The card captures the pointer only after it has moved 6px; capturing on press sent every click to the card instead of its links, so the card's buttons did not work with a mouse or a tap (fixed 26 October 2026, tested with real clicks). The slide copy is `heroSlides` in `src/content/home.ts`; each slide's `photo` carries its file, credit and placeholder note, and `isShown()` drops it with preview off. The photos are `next/image` with `fill` and `sizes="100vw"` (a 750px file on phones), the first with `preload`; the fade and slow zoom are the `.hero-photo` rules in `globals.css` (no zoom with reduced motion). Files are in `public/placeholders/hero/`, 1920px wide; rename a file when replacing it, because the image optimiser and browsers cache by path.

## Testimonial slider

`src/components/sections/home/TestimonialSlider.tsx`, a client component. Stars use `accent-700` for 3:1 or better as meaningful graphics, with a screen-reader line "Rated 5 out of 5".

## Insights slider

`src/components/sections/home/InsightsSlider.tsx`, with card widths and gaps in the `.insights` rules in `globals.css` (78% of the screen on phones, 320px from 640px, 340px from 1024px). The row moves with a transform; the clipped container's own scroll is pinned at zero, because browsers scroll a hidden card into view when it receives keyboard focus, which would fight the transform. Tested with real Tab key presses.

## What we do track

`src/components/sections/home/PracticeTrack.tsx` (client). When pinned, the outer element is `100svh` plus the track's overflow tall, and a sticky full-height box holds the heading and the track; a GSAP ScrollTrigger tween maps the page's progress through that stretch onto the track's `x`, smoothed with `scrub: 0.6`, and drives the counter and the progress bar (see Motion). A ResizeObserver re-measures the overflow and the content column's left edge, which sets the track's side padding so the first card lines up with the heading. Focus on a card scrolls the page rather than the clipped row. The pinned mode is gated by a media query: `(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)`. Practice icons live in `PracticeIcon.tsx`, shared with Why TRC.

## How it works switch

`src/components/sections/home/HowItWorksSteps.tsx` (client) holds the chosen track. On a switch the first three cards, keyed by track, come in 60ms apart with Motion; step 04, the same in both tracks, keeps its node and does not move. The cards' first appearance is the scroll reveal's (see Motion). The round arrows between cards sit in the 48px gap and show only in the full four-card row (1024px up); below that the list is a scroll-snap row (`snap-x`, `scroll-px-4` to keep the gutter). The scenes are SVGs in `HowItWorksScenes.tsx`, coloured through `--sc-*` variables (line, paper, mint, tint, soft, accent, tick) that each card tone sets: a theme-following palette for the tint and neutral panels, and fixed palettes for the teal and green panels, which are the same in both themes. Static rotations sit on outer `<g>` elements and the animated parts on inner ones (`sc-*` classes in `globals.css`), because a CSS transform would otherwise replace the SVG `transform` attribute.

## Hiring map

`src/components/sections/home/DomainsMap.tsx` (client) and `DomainIcons.tsx`. The six stops are placed with trigonometry in a 100 by 103.4 box, so the SVG spokes and the absolutely positioned buttons share one coordinate system. The box is just tall enough for the top and bottom labels and centred on TRC, so the visible map sits in its middle and lines up with the centre of the heading and panel beside it (within 4px at 1024, 1280 and 1536px). One grid holds both layouts, so the section heading renders once. Icons animate from `globals.css`: parts carry `di-*` classes, and the host's `data-play` attribute (`intro` once, `true` three times) or `:hover` (endless) sets the loop count through custom properties. An IntersectionObserver starts the animations only when the map or a phone stop is on screen.

## Dual-path doors

`src/components/ui/DualPathBand.tsx`. Each door is an `article` whose call-to-action link stretches over it with an `::after` overlay; the watermark sits at `-z-10` inside an `isolate` door, so it paints under the copy without making the copy a positioned box that would shrink the link area. The widening is plain CSS in `globals.css` (`.doors > .door`): `flex-grow` from 1 to 1.3 on `:hover` (pointer devices only) and `:focus-within`, from 1280px up. The copy column is fixed at 24.5rem there, so text never re-wraps mid-animation. The `titleAs` prop sets h2 or h3, depending on whether the band has its own section heading.

## Footer

`src/components/site/SiteFooter.tsx`. Offices come from `site.contact.offices`, grouped by region.

## FAQ tabs

`src/components/sections/home/FaqTabs.tsx`, a client component holding the selected topic. Each topic's questions are `<details>` elements with a shared `name`, so the browser closes the others when one opens. Placeholder answers are filtered out with preview off, and a topic with nothing left is dropped. The slide-open is CSS only (`.faq-item` in `globals.css`): `interpolate-size: allow-keywords` plus a `block-size` transition on `::details-content`. Browsers without those features show the answer instantly, and reduced motion turns it off.

## Two-tone titles

`TwoToneTitle` and the `titleTail` prop on `SectionHeader`, in `src/components/ui/SectionHeader.tsx`. Headings take a `title` and a `titleTail` in `src/content/home.ts`.

## Brand button edge

The deep teal button's border uses the `brand-edge` token: the same as the fill in light, `#5c7a75` in dark (3.1:1 on dark `surface-200`), so the button stays visible on dark teal surfaces.

## Theme switch

`src/components/site/ThemeSwitch.tsx`. It writes `data-theme` on the root element and stores the choice under `trc-theme`, the key the layout's inline script reads before first paint. The design system page's three-way toggle uses the same key.

## URLs

`trailingSlash: true`, so every URL matches the sitemap (`/hire-talent/`). The share image lives at `/og.png` (`src/app/og.png/route.tsx`) because Next.js does not add a trailing slash to file-like paths, so crawlers get it with no redirect.

## Before deployment

- Set `NEXT_PUBLIC_SITE_URL` to the real domain. Canonical URLs, the share image URL and the JSON-LD all read it; without it they point at `http://localhost:3100`.
- Set `site.preview` to `false` only at launch, not for a review deployment.

## Content source

Phase 1: typed content files in the repo. Move to a headless CMS when Insights launches or when TRC wants to edit copy itself. The deciding question is who edits content after launch.

## SEO

- One H1 per page, an H2 per section, H3 inside cards.
- Metadata API: title, description, canonical URL, Open Graph image.
- Organization JSON-LD (name, URL, logo, parent organisation, a contact point once the email exists) and WebSite JSON-LD, rendered as a `<script type="application/ld+json">` with `<` escaped, as the Next.js docs require.
- Internal links from the pillar cards and the footer's pillar column.
- No reliance on FAQ rich results.

## Analytics

Calls to action carry `data-track` and `data-location` attributes, and one small listener reports clicks, so the buttons stay server-rendered links. Two events, `hire_cta_click` and `apply_cta_click`, each with a `location`: header, mobile header, mobile menu, hero, pillar card, how it works, dual-path band, footer. This shows which door works where, and settles the mobile header decision. Form completions are tracked on `/thank-you/`. The analytics tool and its consent handling are TRC's decision.

## Accessibility

- Skip link, landmarks (header, nav, main, footer), one H1, headings in order
- `scroll-padding-top` for the sticky header (WCAG 2.2, 2.4.11)
- Targets at least 44px (WCAG 2.2 asks for 24px)
- Mobile menu: a button with `aria-expanded`, focus kept inside the open drawer, Escape closes it
- FAQ built on native `<details>`
- `prefers-reduced-motion` respected
- Colour contrast is built into the tokens

## Motion

Added on 26 October 2026 at the agency's request, after research into GSAP, Motion (formerly Framer Motion) and corporate motion practice (sources in the Sources doc). The rules: every animation has a job, entering motion eases out and runs 0.2 to 0.6 seconds (NN/g: most UI animation belongs between 100 and 400ms, longer only for large moves), nothing loops for show, and nothing moves with reduced motion set.

**Who does what.** One library per kind of job, so they never animate the same thing:

| Layer | Used for | Where |
|---|---|---|
| GSAP 3.15 with ScrollTrigger | Anything driven by the scroll position | `src/lib/motion.ts` (`loadGsap`, `useScrollMotion`), `ScrollReveal`, What we do track, `CountUp` |
| Motion 14.6 (`motion/react`) | Enter and exit of React state | `MotionProvider`, the header's practices menu, the phone menu, the How it works track switch, the FAQ topic switch |
| CSS | Hovers, the hero slide timer and photos, the illustrations, the logo strip, the sliders, the FAQ accordion | `globals.css` and utility classes |

**GSAP.** Loaded on demand after the page is interactive (`loadGsap`, a dynamic import shared by every caller; ScrollTrigger registered once). `useScrollMotion` runs each setup inside a `gsap.context` scoped to the component and reverts every tween and ScrollTrigger on unmount, as the GSAP React guide asks; with lazy loading this replaces `useGSAP`, which needs GSAP at import time.
- **Scroll reveals** (`ScrollReveal` in the site layout): anything marked `data-reveal` fades up 24px over 0.5s (`power2.out`), once, when its top reaches 90% of the screen, in batches a beat apart (`ScrollTrigger.batch`, stagger 0.08s, at most 0.4s per batch). Only content below the fold when GSAP loads is hidden first, so nothing on screen blinks out. Opacity only, never `visibility`, so screen readers still reach it, and keyboard focus reveals an item at once. After a long jump, content already scrolled past appears without animating. Marked: every `SectionHeader`, the numbers strip groups, the What we do row, the hiring map and its card, the How it works intro and cards, the Why TRC pill and pool card, the logo band, the portrait wall, the testimonial slider, the insights row, the FAQ topics and questions, the phone line and the two doors. Not marked: the hero (above the fold), the Why TRC stacking cards (they have their own scroll motion) and the footer.
- **What we do track:** the section stays CSS-sticky; a ScrollTrigger tween moves the row (`x`) with `scrub: 0.6`, so the cards glide instead of stepping with each wheel tick. The counter and progress bar (a `scaleX` quick setter) follow the smoothed position.
- **Counters:** `CountUp` tweens 0 to the figure over 1.6s (`power3.out`) on a once-only ScrollTrigger at 85%. A figure already on screen when GSAP loads keeps its value.

**Motion.** `MotionProvider` wraps the site in `MotionConfig reducedMotion="user"` and `LazyMotion` with the `domAnimation` features loaded on demand (`strict`, so only the slim `m` components can be used). Menus enter over 180 to 220ms easing out and leave over 120 to 160ms easing in, staying mounted until their exit finishes (`AnimatePresence`). The How it works switch brings the first three cards in 60ms apart; step 04, the same in both tracks, stays put. The FAQ topic switch fades the new questions up over 250ms. Neither switch animates on first load; that is the scroll reveal's job.

**Hero.** The card deck settles in over 600ms on first paint with a CSS keyframe (`hero-deck-in`), not GSAP, so it never waits for JavaScript. The headline is not animated, so the largest paint is unaffected.

**Cost, measured on the production build** (local, 26 October 2026): JavaScript transferred on the homepage rose from 160KB to 241KB. Of that, 20KB arrives with the page (Motion's slim core and the new code) and 62KB after the load event (GSAP 27KB, ScrollTrigger 17KB, Motion's animation features 18KB). Largest contentful paint 108ms against 104ms before; layout shift 0. The production preview is the `trc-prod` entry in `.claude/launch.json` (port 3200).

**Testing done:** reveals at 1280, 768 and 375px (nothing hidden on screen, nothing left hidden after a full scroll or a jump to the bottom), the What we do mapping (track at -365, -728, -1093, -1457px at each quarter, as before), counters, both menus (exit plays, focus trap and focus return intact), both switches, no horizontal overflow, no console errors. Reduced motion was checked in the code paths (every GSAP setup is skipped, Motion follows the OS setting, the CSS rules already stop); the test browser could not switch the operating system setting itself.

## Homepage concept 2 (archived)

**Archived on 26 October 2026** (only concepts 1 and 3 go to the client). The route files were copied to `src/app/_archive/(option-2)/home-option-2/` (Next.js never serves folders starting with `_`). Its address, `/home-option-2/`, now serves concept 3 (see Homepage concept 3); to bring the original back, give its two archived files a new route folder and address. Left in place, unused: `src/components/option-2/` and the "Homepage concept 2" CSS block (its `o2-*` classes; the `data-reveal="rule"` variant in `ScrollReveal` is shared code and stays). To remove concept 2 for good, delete those and `src/app/_archive/` (not `src/app/(option-2)/`, which now holds concept 3's route).

A second homepage at `/home-option-2`, built on 26 October 2026 for comparison (see Concept 2 in the homepage doc for the design). It lives in its own route group, `src/app/(option-2)/home-option-2/`, so it can have its own header and footer without touching concept 1's layout.

- **Shared content, no copies.** Every section reads the same `src/content/home.ts` and `site.ts` objects as concept 1 and applies the same rules: `shown()` and `isShown()` for placeholders, the same minimums for logos (6), testimonials (2) and insights (3), and `ReservedSlot` when they are not met.
- **Shared pieces.** `src/components/option-2/shared.tsx` holds the page column (`wrap`, 1280px), section spacing (`spread`), `Label` (the numbered label with the green rule), `Title` (lead and muted tail), `SectionHead` (title on the left, intro on the right) and `ArrowLink`. Its own type sizes are four fluid classes in `globals.css` (`o2-display`, `o2-title`, `o2-figure`, `o2-quote`), so concept 1's tokens are unchanged.
- **Motion, reused.** The same `MotionProvider` and `ScrollReveal`. `ScrollReveal` gained one variant for it: `data-reveal="rule"` draws a rule in from the left over 0.8s instead of fading it up. The figures use the same `CountUp`. Motion animates the header menu and menu sheet, the How it works and FAQ topic switches, and the quote change. The hero photo's wipe is a CSS keyframe (`o2-image-in`), so it never waits for JavaScript. No new dependencies; reduced motion is honoured on every path.
- **Accessibility.** The FAQ topics and How it works tracks follow the WAI-ARIA tabs pattern (arrow keys, Home and End); only one question opens at a time (native `details` sharing a `name`), sliding open with the existing `.faq-item` rule. The menu sheet is a dialog that keeps focus inside and returns it on close. The testimonial portraits are decorative and hidden from screen readers.
- **Search.** `robots: noindex, nofollow` and a canonical of `/`, so the concept never competes with the real homepage.
- **Removing it.** If concept 1 is chosen: delete `src/app/(option-2)/` and `src/components/option-2/`, and the "Homepage concept 2" block in `globals.css`. The `data-reveal="rule"` branch in `ScrollReveal` can stay (it does nothing without rules) or go. If concept 2 is chosen, it moves to `/` and concept 1's sections and layout are deleted; that is a separate, planned change.

## Homepage concept 3

**Address.** Since 26 October 2026 concept 3 is served at `/home-option-2/` and labelled "Concept 2" for the client (tab title; the preview badge, `O3Badge`, was removed from the layout at the agency's request, along with the extra footer padding that kept it clear of the legal links, and the unused file can be deleted), because the original concept 2 is archived. Its layout and page now live in `src/app/(option-2)/home-option-2/` (files could not be moved from this environment, so the old concept 2 folder was reused); `src/app/(option-3)/home-option-3/` is a stub that redirects, backed by a permanent redirect in `next.config.ts` (`/home-option-3/` to `/home-option-2/`). `conceptHome` in `shared.ts` points at the new address. Components keep their `option-3` / `O3` names. Checked on the dev and production servers: `/home-option-2/` 200, `/home-option-3/` 308 to it, `/` 200, and the motion tests pass at the new address in Chromium and WebKit.

Started on 26 October 2026, built one section at a time from the agency's references (see Concept 3 in the homepage doc). Its own route group, `src/app/(option-3)/home-option-3/`, with the same `MotionProvider`, `ScrollReveal` and analytics listener as the other concepts. The page lists its sections in order and gains one line per section.

- **Files.** `src/components/option-3/`: `shared.ts` (the route and `frame`, the centred content column every section uses: up to 1400px, with 20, 32 and 48px side padding), `O3Header`, `O3Hero`, `O3About` (statement and figure cards, using concept 1's `CountUp`), `O3Voices` with `O3QuoteSlider` (testimonials: concept 1's portrait wall data and `.wall` scaling, its columns floating with `o3-float`, and a client slider adapted from concept 1's `TestimonialSlider`; `O3Marquee` is no longer used and can be deleted, the sandbox here would not remove it), `O3Ribbon` (the two crossing text ribbons; it reuses the testimonial rows' `o3-track` animation with its own durations, 70s and 90s), `O3Practices` with `O3PracticeDeck` (the practice cards, arrows, count and practice buttons), `O3Sectors` with `O3SectorTrack` (the Who we hire for scroll carousel: concept 1's `PracticeTrack` mechanism, a sticky section `100svh` plus the row's travel tall, a GSAP ScrollTrigger tween on the row's `x` with `scrub: 0.6`, and a `quickSetter` progress bar; it pins only at 1024px wide and 740px tall without reduced motion, otherwise a native snap row; pinned, the stage is content height with `position: sticky` at `max(96px, (100vh - stage height) / 2)`, a spacer as tall as the row's travel follows it, and the ScrollTrigger's start and end are functions measured on each refresh), `O3Process` (How it works: two lanes and the shared step card, its own step icons, all server-rendered; the motion is CSS), `O3Why` with `O3Reasons` (Why TRC's panels: client state for the open panel, `flex-grow` for the width and a `0fr` to `1fr` grid row for the detail, `inert` on closed details, and a 1024px media query so only wide screens open on hover), `O3Journal` with `O3Stories` (the insights row and its arrows), `O3Faq` with `O3QuestionList` (topic tabs and the accordion; it reuses the `.faq-item` slide-open rule), `O3Start` (the closing band), `O3Footer` (in the layout, after `<main>`; it carries its own `data-icons="loop"`), `O3Depth`, `O3Sequence` and `O3Loops` (the motion layer, below), `O3Badge`. The client logo section is concept 1's `ClientLogos`, unchanged. Its type uses concept 1's tokens only (no sizes of its own). Its type uses concept 1's tokens only, with no sizes of its own. Its CSS is one block in `globals.css` headed "Homepage concept 3": the hero cards' one-time settle (`o3-pop`, each item sets its own `--d` delay), the looping icons, the ribbon and testimonial rows, and the insights row's edge padding.
- **Looping icons.** Concept 3's `<main>` carries `data-icons="loop"`. Under it, the domain icons' existing `di-*` animations run with `--di-loops: infinite`, and the practice icons' parts loop with their own keyframes (`pi-left`, `pi-right`, `pi-tilt`, `pi-lift`, `pi-twinkle`, `pi-pop`, `pi-wave`, 2.4s). `PracticeIcon` now draws each moving part as its own path with a `pi-*` class; the shapes are unchanged, and outside concept 3 nothing animates (checked on concepts 1 and 2). Single-path icons loop as a whole with `o3-loop-bob`, `o3-loop-ring` and `o3-loop-hop` (the footer's envelope, phone and pin). The How it works step icons mark their moving parts `o3-p-lift`, `o3-p-pop`, `o3-p-write`, `o3-p-ring` and `o3-p-bob`, on the same 2.4s tempo. Three more loops share it: `.o3-traveller`, the dot on each lane (a wrapper the line's length, moved from -100% to 0 so only `transform` animates, down on phones and across from 768px), `.o3-flow` (the merge mark's dashes) and `.o3-climb` (Why TRC's ladder, each level delayed by its `--i`). An element marked `.o3-icon-host` sets `--icon-tempo: 0.45` while hovered or focused, which shortens the practice icons' cycle to about 1.1s; hosts also scale or tilt their icon with a Tailwind group hover. Reduced motion turns every part off.
- **Insights row.** A native horizontal scroller (`snap-x snap-mandatory`) with the `.o3-bleed` class: its side padding and scroll padding are the content column's outer margin plus its padding, `calc(max(0px, (100% - 1400px) / 2) + 20, 32 or 48px)`, so the first card lines up with the heading and the row runs to the screen edge. Do not add a padding utility to it; it would override that. The arrows read each card's `offsetLeft` (the row is `relative`, so it is the offset parent), subtract the row's padding, and `scrollTo` the next or previous position, smooth unless reduced motion is set. The scrollbar is hidden; the row takes keyboard focus. `Insight` gained an optional `image`.
- **Motion layer.** One library per job, as on concept 1. CSS (the "Homepage concept 3" block): the hero entrance (`o3-rise`, `o3-fade-up`, `o3-arc-in`, `o3-pop`, each animating the individual `translate` and `scale` properties so GSAP's `transform` can never fight them), the press (`.o3-press`, unlayered so it can add `scale` to an element's Tailwind transition list) and the loops. GSAP: `ScrollReveal` gained two variants, `data-reveal="stagger"` (a block's children fade up 0.09s apart) and `data-reveal="media"` (images, or `[data-media]` wrappers where the image has its own CSS transform transition, settle from 106%); `O3Depth` (scroll depth for `[data-depth]` layers, `gsap.matchMedia` so it runs only at the given width without reduced motion and reverts if either changes; the hero uses `exit`, the wall `through`); `O3Sequence` (How it works: each lane's `[data-seq]` line, nodes and end play once in a timeline). Motion: the What we do photo's scale on a slide change. `O3Loops`: `O3OffscreenPause` (an IntersectionObserver sets `data-offscreen` on each section more than 200px out of view); one CSS rule pauses only the looping classes inside it, so one-shot animations are never frozen half way. (A footer pause switch, `O3PauseSwitch`, was removed at the agency's request; open question 27.) GSAP only writes `transform` on plain wrappers that carry no CSS transform of their own. Test scripts (Playwright, run against `next start`) live outside the project; see Motion in the homepage doc for results.
- **Full width.** Section backgrounds run edge to edge; only their content sits in `frame`. The testimonial portrait wall sits outside it, so it spans the screen.
- **Header over the hero.** The header is sticky and transparent; the hero band is pulled up under it by the header's height (`-mt-16`, 72px from 640px) and padded by the same amount, so the brand colour starts at the top of the screen. After 8px of scroll the header gains a full-width translucent raised background, a hairline and a shadow.
- **Hero photos.** `public/placeholders/people/banner-centre.webp` (900 by 1008, 144KB, the whole figure trimmed to its edges), `banner-left.webp` and `banner-right.webp` (440 by 440, 23 and 50KB, square head-and-shoulders crops shown with `object-cover` inside the discs). Cut out of the agency's supplied photos with macOS Vision (`VNGenerateForegroundInstanceMaskRequest`, on the device) and saved as WebP with transparency. They carry the placeholder note, so `isShown()` keeps them to preview. The first cutouts (`cutout-03`, `-04`, `-10`, made from the testimonial portraits) were removed when these replaced them.
- **Removing it.** Delete `src/app/(option-3)/`, `src/components/option-3/`, the three `banner-*.webp` files and the "Homepage concept 3" CSS block. Nothing in concepts 1 or 2 depends on them.

## Performance budget

LCP 2.5s or less, INP 200ms or less, CLS 0.1 or less at the 75th percentile on mobile. In practice: no video, no carousel library, no chat widget, images through `next/image` with sizes, fonts through `next/font`, animation libraries loaded after the page (see Motion for the measured cost).

## Forms

Server Actions: validate, store in a database, put resumes in private storage, notify the inbox, redirect to the thank-you page. See the Forms section.

## Deployment

Not deployed. The design system runs locally only. Deploy when instructed.
