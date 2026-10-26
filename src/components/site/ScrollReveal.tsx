"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

type Kind = "fade" | "rule" | "stagger" | "media";

/**
 * Brings section content in as it scrolls into view, once, with nearby items a beat
 * apart (ScrollTrigger.batch). What `data-reveal` does depends on its value:
 *
 *   (empty)    the element fades up 24px.
 *   "rule"     a hairline or accent rule draws in from the left (homepage concept 2).
 *   "stagger"  the element stays put and its children fade up 20px one after another,
 *              0.09s apart: a heading block's label, title and intro (homepage concept 3).
 *   "media"    the element stays put and its images (or its [data-media] wrappers) settle
 *              from 106% to full size over 1.1s, inside their own frame (homepage concept 3).
 *
 * Only content below the fold when GSAP loads is hidden first, so nothing on screen
 * ever blinks out. Opacity only, never visibility, so screen readers still find it,
 * and keyboard focus reveals an item straight away. Runs again on each page.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const fold = window.innerHeight * 0.92;
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => el.getBoundingClientRect().top > fold);
        if (!items.length) return;
        const kind = (el: Element): Kind => {
          const v = (el as HTMLElement).dataset.reveal;
          return v === "rule" || v === "stagger" || v === "media" ? v : "fade";
        };
        const of = (k: Kind) => items.filter((el) => kind(el) === k);
        const kids = (el: Element) => Array.from(el.children) as HTMLElement[];
        // A "media" element's [data-media] wrappers if it has them (use one where the image has
        // its own CSS transform transition, which would fight GSAP), otherwise its images.
        const imgs = (el: Element) => {
          const marked = el.querySelectorAll("[data-media]");
          return Array.from(marked.length ? marked : el.querySelectorAll("img"));
        };
        // GSAP warns on an empty target, and a page may have none of a kind.
        const set = (targets: Element[], vars: object) => {
          if (targets.length) gsap.set(targets, vars);
        };
        set(of("fade"), { opacity: 0, y: 24 });
        set(of("rule"), { scaleX: 0, transformOrigin: "0% 50%" });
        set(of("stagger").flatMap(kids), { opacity: 0, y: 20 });
        set(of("media").flatMap(imgs), { scale: 1.06 });

        /** Straight to the final state: for content already scrolled past, and on focus. */
        const finish = (el: Element) => {
          const k = kind(el);
          const targets = k === "stagger" ? kids(el) : k === "media" ? imgs(el) : [el];
          set(targets, { opacity: 1, y: 0, scaleX: 1, scale: 1, clearProps: "opacity,transform" });
        };

        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            // After a long jump (End key, an anchor link), anything already scrolled past
            // simply appears; only what is on screen animates, staggered by at most 0.4s
            // in total, so the content in view never waits behind content above it.
            const past = batch.filter((el) => el.getBoundingClientRect().bottom < 0);
            const here = batch.filter((el) => !past.includes(el));
            past.forEach(finish);
            const fades = here.filter((el) => kind(el) === "fade");
            const rules = here.filter((el) => kind(el) === "rule");
            if (fades.length)
              gsap.to(fades, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: Math.min(0.08, 0.4 / fades.length),
                overwrite: true,
                clearProps: "opacity,transform",
              });
            if (rules.length)
              gsap.to(rules, { scaleX: 1, duration: 0.8, ease: "power2.out", stagger: 0.06, overwrite: true, clearProps: "transform" });
            here
              .filter((el) => kind(el) === "stagger")
              .forEach((el) => gsap.to(kids(el), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.09, overwrite: true, clearProps: "opacity,transform" }));
            const media = here.filter((el) => kind(el) === "media").flatMap(imgs);
            if (media.length) gsap.to(media, { scale: 1, duration: 1.1, ease: "power2.out", overwrite: true, clearProps: "transform" });
          },
        });
        const onFocus = (e: FocusEvent) => {
          const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-reveal]");
          if (!el) return;
          const k = kind(el);
          const targets = k === "stagger" ? kids(el) : k === "media" ? [] : [el];
          const hidden = targets.filter((t) => Number(gsap.getProperty(t, "opacity")) < 1);
          if (hidden.length) gsap.to(hidden, { opacity: 1, y: 0, duration: 0.2, overwrite: true, clearProps: "opacity,transform" });
        };
        document.addEventListener("focusin", onFocus);
        return () => document.removeEventListener("focusin", onFocus);
      });
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
