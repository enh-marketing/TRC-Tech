"use client";

import { useRef, useState } from "react";
import { useScrollMotion } from "@/lib/motion";

const format = new Intl.NumberFormat("en-IN");

/**
 * A figure that counts up from zero the first time it scrolls into view (a GSAP
 * tween on a ScrollTrigger, 1.6s, easing out). The server renders the final
 * value, so it is right without JavaScript and for search engines; a figure
 * already on screen when GSAP loads keeps it rather than blinking to zero. The
 * final value also holds the width, so the suffix never shifts while the
 * digits run. Screen readers get the final value only, and reduced motion
 * skips the count.
 */
export function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useScrollMotion(
    ref,
    (gsap) => {
      const el = ref.current;
      if (!el || el.getBoundingClientRect().top < window.innerHeight) return;
      const counter = { n: 0 };
      setShown(0);
      gsap.to(counter, {
        n: value,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => setShown(Math.round(counter.n)),
      });
      // If the count is torn down part way, show the real figure.
      return () => setShown(value);
    },
    [value, duration],
  );

  return (
    <span ref={ref} className="inline-grid">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {format.format(value)}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {format.format(shown)}
      </span>
      <span className="sr-only">{format.format(value)}</span>
    </span>
  );
}
