"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Any element with data-track="event_name" and data-location="where" is
 * tracked on click, so calls to action stay plain server-rendered links.
 */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el?.dataset.track) return;
      track(el.dataset.track, { location: el.dataset.location ?? "unknown" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
