"use client";

import { cn } from "@/lib/cn";
import { Moon, Sun } from "./icons";

const THEME_KEY = "trc-theme";

function isDarkNow() {
  const forced = document.documentElement.getAttribute("data-theme");
  if (forced) return forced === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * One button that flips between light and dark. The icon and the label come
 * from the same .only-light / .only-dark rules as the logo, so the server and
 * the browser render identical markup and nothing flickers on load. The
 * choice is stored under the key the layout's inline script reads.
 */
export function ThemeSwitch({ onBrand = false, className }: { onBrand?: boolean; className?: string }) {
  function toggle() {
    const next = isDarkNow() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the switch still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150",
        onBrand
          ? "border-ink-on-brand/40 text-ink-on-brand hover:bg-ink-on-brand/10"
          : "border-line-200 text-ink-900 hover:bg-surface-200",
        className,
      )}
    >
      <span className="only-light">
        <Moon />
        <span className="sr-only">Switch to dark theme</span>
      </span>
      <span className="only-dark">
        <Sun />
        <span className="sr-only">Switch to light theme</span>
      </span>
    </button>
  );
}
