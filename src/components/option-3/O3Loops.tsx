"use client";

import { useEffect } from "react";

/**
 * Stops the loops of any concept 3 section that is out of view, so the page draws no
 * frames for motion nobody can see (battery on phones). Each child of <main> and the
 * footer gets `data-offscreen` while it is more than 200px outside the screen; the
 * [data-offscreen] rule in globals.css ("Homepage concept 3") pauses only the endless animations
 * inside it, never one-shot ones.
 */
export function O3OffscreenPause() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main#main > *, body footer"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.target as HTMLElement).toggleAttribute("data-offscreen", !e.isIntersecting)),
      { rootMargin: "200px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      els.forEach((el) => el.removeAttribute("data-offscreen"));
    };
  }, []);
  return null;
}
