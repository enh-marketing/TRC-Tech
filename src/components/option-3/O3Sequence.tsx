"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "@/lib/motion";

type Gsap = Awaited<ReturnType<typeof loadGsap>>["gsap"];

/**
 * How it works, played in order the first time each lane comes into view: the lane's
 * line draws from its first step to its end (across from 768px, down on phones),
 * the step circles pop in one after another as the line reaches them, then the arrow
 * into the shared step's card. It shows the order of the steps rather than decorating
 * them. Marks: `data-seq-lane` on a lane, `data-seq="rail" | "node" | "end"` inside.
 *
 * Once only, about a second in all. Like the scroll reveals, a lane already on screen
 * when GSAP loads keeps its final state, so nothing blinks out; nothing runs with
 * reduced motion (gsap.matchMedia).
 */
export function O3Sequence({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm: ReturnType<Gsap["matchMedia"]> | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      const root = ref.current;
      if (cancelled || !root) return;
      const fold = window.innerHeight * 0.92;
      const lanes = gsap.utils.toArray<HTMLElement>("[data-seq-lane]", root).filter((lane) => lane.getBoundingClientRect().top > fold);
      if (!lanes.length) return;
      mm = gsap.matchMedia(root);
      mm.add({ wide: "(min-width: 768px)", calm: "(prefers-reduced-motion: no-preference)" }, (context) => {
        const { wide, calm } = context.conditions as { wide: boolean; calm: boolean };
        if (!calm) return;
        lanes.forEach((lane) => {
          const rail = lane.querySelector("[data-seq='rail']");
          const nodes = lane.querySelectorAll("[data-seq='node']");
          const end = lane.querySelector("[data-seq='end']");
          const tl = gsap.timeline({ scrollTrigger: { trigger: lane, start: "top 78%", once: true } });
          if (rail)
            tl.from(rail, { ...(wide ? { scaleX: 0, transformOrigin: "0% 50%" } : { scaleY: 0, transformOrigin: "50% 0%" }), duration: 0.9, ease: "power2.inOut" }, 0);
          if (nodes.length) tl.from(nodes, { scale: 0.6, opacity: 0, duration: 0.35, ease: "back.out(1.5)", stagger: 0.2 }, 0.1);
          if (end && getComputedStyle(end).display !== "none") tl.from(end, { scale: 0.5, opacity: 0, duration: 0.3, ease: "back.out(1.5)" }, 0.75);
        });
      });
    });
    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
