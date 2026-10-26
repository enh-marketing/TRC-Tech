"use client";

import { useEffect, type DependencyList, type RefObject } from "react";

/*
 * The site's motion layer. Two libraries, one job each:
 *
 *   GSAP (with ScrollTrigger): everything driven by the scroll position, such as
 *   reveals, the What we do track and the counters. Loaded here, on demand, after the
 *   page is interactive, so it never weighs on the first paint.
 *
 *   Motion (motion/react): enter and exit of React state, such as menus, the phone
 *   menu and the tab switches. Set up once in MotionProvider.
 *
 * CSS keeps the rest (hovers, the slide timers, the illustrations), because it needs no
 * JavaScript at all. Nothing moves when the device asks for reduced motion.
 */

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let loading: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | null = null;

/** GSAP and ScrollTrigger, imported once and shared; ScrollTrigger is registered on first load. */
export function loadGsap() {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  });
  return loading;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs `setup` inside a gsap.context scoped to `scope` once GSAP has loaded, and reverts
 * every tween and ScrollTrigger it made when the component unmounts or `deps` change
 * (the cleanup the GSAP React guide asks for). `setup` may return its own cleanup.
 * Skipped entirely with reduced motion, so the page shows its final state.
 */
export function useScrollMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (gsap: Gsap, ScrollTrigger: ScrollTriggerType) => void | (() => void),
  deps: DependencyList = [],
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: ReturnType<Gsap["context"]> | undefined;
    let cancelled = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      ctx = gsap.context(() => setup(gsap, ScrollTrigger), scope.current ?? undefined);
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // The caller lists what the setup depends on.
  }, deps);
}

/** Shared easing and timing, after NN/g: short, ease-out on the way in, quicker on the way out. */
export const ease = { out: [0.2, 0.7, 0.2, 1] as const, in: [0.4, 0, 1, 1] as const };
