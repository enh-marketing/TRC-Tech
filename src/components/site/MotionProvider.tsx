"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const features = () => import("./motion-features").then((m) => m.default);

/**
 * Motion for the whole site: the slim `m` components, with their animation code
 * loaded after the first render (LazyMotion), and the visitor's reduced-motion
 * setting respected everywhere (MotionConfig). `strict` stops anyone using the
 * full `motion` component by mistake.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={features} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
