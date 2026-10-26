"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type Mode = "system" | "light" | "dark";
const modes: Mode[] = ["system", "light", "dark"];
export const THEME_KEY = "trc-theme";

/** Applied before paint by the inline script in layout.tsx, and again here on change. */
export function applyTheme(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);
}

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");

  // Read the stored choice after mount, so the server and client markup match.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY) as Mode | null;
      if (stored && modes.includes(stored)) setMode(stored);
    } catch {
      // Private browsing or blocked storage: stay on system.
    }
  }, []);

  function choose(next: Mode) {
    setMode(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Nothing to do; the choice still applies for this page view.
    }
  }

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex gap-1 rounded-md border border-line-100 bg-surface-200 p-1"
    >
      {modes.map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={mode === m}
          onClick={() => choose(m)}
          className={cn(
            "cursor-pointer rounded-sm px-3 py-1.5 text-body-sm capitalize transition-colors duration-150",
            mode === m
              ? "bg-surface-accent text-ink-on-accent"
              : "bg-transparent text-ink-700 hover:text-ink-900",
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
