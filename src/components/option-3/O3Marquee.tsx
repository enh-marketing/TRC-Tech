"use client";

import { useState } from "react";

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

/**
 * Holds the moving testimonial rows and their pause button. The rows move for
 * more than five seconds, so WCAG 2.2.2 asks for a way to stop them: the
 * button, plus a pause while the pointer rests on them. With reduced motion
 * they never move, and the button is hidden (CSS).
 */
export function O3Marquee({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div data-paused={paused || undefined} className="o3-marquee mt-12 flex flex-col gap-3 sm:gap-4 lg:mt-16">
        {children}
      </div>
      <div className="o3-marquee-control mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink-on-brand/30 px-5 text-btn-label text-ink-on-brand transition-colors duration-150 hover:bg-ink-on-brand/10"
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? "Play testimonials" : "Pause testimonials"}
        </button>
      </div>
    </>
  );
}
