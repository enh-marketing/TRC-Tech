"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/motion";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];

/**
 * Scroll depth for concept 3: every descendant marked `data-depth="N"` moves N pixels
 * as the wrapper passes through the screen, so layers at different N drift at
 * different speeds. Tied to the scroll (a GSAP ScrollTrigger with a 0.5s scrub), so
 * it moves only while the visitor scrolls and never on its own.
 *
 *   "exit"     from the top of the page until the wrapper has left the screen: 0 to N.
 *              For the hero, which starts in view.
 *   "through"  from the wrapper entering at the bottom to leaving at the top: N to -N.
 *
 * Runs only where `media` matches and the visitor has not asked for reduced motion
 * (gsap.matchMedia, which also undoes it all if either changes). It writes
 * `transform` on the marked elements, so they must carry no CSS transform or
 * transform animation of their own: mark plain wrappers.
 */
export function O3Depth({
  children,
  className,
  mode = "through",
  media = "(min-width: 1024px)",
}: {
  children: React.ReactNode;
  className?: string;
  mode?: "exit" | "through";
  media?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm: ReturnType<Gsap["matchMedia"]> | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      const root = ref.current;
      if (cancelled || !root) return;
      mm = gsap.matchMedia(root);
      mm.add(`${media} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-depth]", root).forEach((el) => {
          const n = Number(el.dataset.depth) || 0;
          gsap.fromTo(
            el,
            { y: mode === "exit" ? 0 : n },
            {
              y: mode === "exit" ? n : -n,
              ease: "none",
              scrollTrigger: { trigger: root, start: mode === "exit" ? 0 : "top bottom", end: "bottom top", scrub: 0.5 },
            },
          );
        });
      });
    });
    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [mode, media]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
