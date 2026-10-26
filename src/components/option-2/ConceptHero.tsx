import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowRight } from "@/components/site/icons";
import { PracticeIcon } from "@/components/sections/home/PracticeIcon";
import { hero, heroSlides, whatWeDo } from "@/content/home";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { ArrowLink, Label, Title, wrap } from "./shared";

/** Concept 1's in-page link "/#how-it-works" points at this page's own section here. */
const local = (href: string) => (href.startsWith("/#") ? href.slice(1) : href);

/**
 * Concept 2's hero: an editorial opening instead of a slider. The headline runs
 * large across the page; the sentence and both doors sit beside a framed
 * photograph; and the three messages concept 1 rotated through (the four
 * practices, the candidate offer, the parent firm) sit together underneath,
 * so nobody has to wait for a slide to read them. Nothing here autoplays.
 */
export function ConceptHero() {
  const [companies, candidates, backing] = heroSlides;
  const headline = hero.titleOptions[0];
  const photo = companies.photo && isShown(companies.photo) ? companies.photo : null;

  return (
    <section aria-labelledby="hero-title" className="bg-surface-canvas pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className={wrap}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <Label>{companies.eyebrow}</Label>
          <a
            href={site.parent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 text-body-sm text-ink-700 no-underline hover:text-ink-900"
          >
            {hero.trust}
            <ArrowRight className="size-4 -rotate-45 text-accent-700 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <Title as="h1" id="hero-title" lead={headline.lead} tail={headline.tail} className="o2-display mt-8 max-w-[17ch] lg:mt-12" />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col items-start gap-8 lg:col-span-5">
            <p className="m-0 max-w-[42ch] text-body-lg text-ink-700">{companies.body}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={companies.primary.href} size="lg" data-track={companies.primary.track} data-location="hero">
                {companies.primary.label}
              </Button>
              {companies.secondary ? (
                <Button href={companies.secondary.href} size="lg" variant="secondary" data-track={companies.secondary.track} data-location="hero">
                  {companies.secondary.label}
                </Button>
              ) : null}
            </div>
          </div>

          {/* The photograph opens upward on first paint (CSS); the logo's bracket marks its corner. */}
          <figure className="relative m-0 lg:col-span-7">
            <div className="o2-image-in relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-brand">
              {photo ? (
                <Image src={photo.src} alt="" fill preload sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw" className="object-cover saturate-[0.85]" />
              ) : (
                <span aria-hidden="true" className="absolute top-[18%] right-[14%] size-[38%] border-t-[28px] border-r-[28px] border-surface-accent" />
              )}
            </div>
            <span aria-hidden="true" className="absolute -top-3 -right-3 size-14 border-t-[10px] border-r-[10px] border-surface-accent sm:size-16" />
          </figure>
        </div>

        {/* What concept 1's three slides said, side by side. */}
        <ol className="m-0 mt-20 grid list-none gap-12 p-0 lg:mt-28 lg:grid-cols-3 lg:gap-x-8">
          <li data-reveal className="flex flex-col gap-5">
            <span aria-hidden="true" data-reveal="rule" className="block h-px bg-line-200" />
            <Label index="01">{companies.tab}</Label>
            <Title as="h2" lead={whatWeDo.title} tail={whatWeDo.titleTail} className="text-heading-lg" />
            <ul className="m-0 flex list-none flex-col p-0">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <a href={p.href} className="group flex min-h-11 items-center gap-3 border-b border-line-100 py-2 text-body text-ink-900 no-underline">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-200 text-ink-900 transition-colors duration-200 group-hover:bg-surface-accent group-hover:text-ink-on-accent">
                      <PracticeIcon slug={p.slug} className="size-4" />
                    </span>
                    {p.title}
                    <ArrowRight className="ms-auto size-4 text-ink-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent-700" />
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {[candidates, backing].map((slide, i) => (
            <li key={slide.key} data-reveal className={cn("flex flex-col gap-5")}>
              <span aria-hidden="true" data-reveal="rule" className="block h-px bg-line-200" />
              <Label index={String(i + 2).padStart(2, "0")}>{slide.tab}</Label>
              {slide.title ? <Title as="h2" lead={slide.title.lead} tail={slide.title.tail} className="text-heading-lg" /> : null}
              <p className="m-0 text-body text-ink-700">{slide.body}</p>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1">
                <ArrowLink href={local(slide.primary.href)} data-track={slide.primary.track} data-location={slide.primary.track ? "hero" : undefined}>
                  {slide.primary.label}
                </ArrowLink>
                {slide.secondary ? (
                  <ArrowLink href={local(slide.secondary.href)} data-track={slide.secondary.track} data-location={slide.secondary.track ? "hero" : undefined}>
                    {slide.secondary.label}
                  </ArrowLink>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
