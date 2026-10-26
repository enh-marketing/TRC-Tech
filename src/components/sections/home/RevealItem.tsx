"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A list item that gets data-inview="true" the first time it is a third on
 * screen, so CSS can start an entrance animation when someone can see it.
 */
export function RevealItem({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return (
    <li ref={ref} data-inview={seen} className={className} style={style}>
      {children}
    </li>
  );
}
