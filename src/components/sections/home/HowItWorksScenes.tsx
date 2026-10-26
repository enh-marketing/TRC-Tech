/**
 * Illustrated scenes for the How it works cards, after the agency's
 * reference: bold outlines, pastel fills and tilted, overlapping paper cards,
 * in the TRC palette. No words or figures, so nothing reads as a claim.
 *
 * Static transforms (rotate, position) sit on outer <g> elements; the inner
 * <g> or shape carries an sc-* class that globals.css animates, so the CSS
 * transform never replaces the SVG one. Each scene loops: it builds as its card
 * mounts, holds, eases out and builds again (see globals.css), and does not move
 * with reduced motion.
 */

import { cn } from "@/lib/cn";

/* Colour roles, read from --sc-* variables that each card tone sets (see `palettes`),
   so the same drawing reads on a teal, green or light panel. */
const line = "stroke-[var(--sc-line)]";
const paper = "fill-[var(--sc-paper)] stroke-[var(--sc-line)]";
const mint = "fill-[var(--sc-mint)] stroke-[var(--sc-line)]";
const tealTint = "fill-[var(--sc-tint)] stroke-[var(--sc-line)]";
const soft = "stroke-[var(--sc-soft)]";
const badge = "fill-[var(--sc-accent)] stroke-[var(--sc-line)]";
const tick = "stroke-[var(--sc-tick)]";
const d = (ms: number) => ({ animationDelay: `${ms}ms` });

function Svg({ children }: { children: React.ReactNode }) {
  return (
    // Icon-sized: about 136px wide, with a heavier line so it stays crisp at that size.
    <svg viewBox="0 0 220 170" aria-hidden="true" className="h-auto w-full max-w-[8.5rem] overflow-visible" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

/** Two tilted sheets: a back page, and a brief whose ticks draw in, with a pencil. */
function Brief() {
  return (
    <Svg>
      <g transform="rotate(-10 78 96)">
        <g className="sc-in-left">
          <rect x="30" y="40" width="96" height="112" rx="10" className={paper} />
          <path d="M48 70h52M48 86h60M48 102h40M48 118h52" className={soft} />
        </g>
      </g>
      <g transform="rotate(7 146 88)">
        <g className="sc-in-right" style={d(120)}>
          <rect x="94" y="26" width="106" height="124" rx="10" className={paper} />
          <rect x="108" y="42" width="58" height="9" rx="4.5" className="fill-[var(--sc-accent)] stroke-none" />
          {[64, 88, 112].map((y, i) => (
            <g key={y}>
              <rect x="108" y={y} width="13" height="13" rx="3.5" className={i < 2 ? mint : paper} />
              <path d={`M128 ${y + 6.5}h${i === 1 ? 40 : 52}`} className={soft} />
              {i < 2 ? <path d={`M110.5 ${y + 6.5}l3.2 3.2 5.3-6`} pathLength={1} className={cn("sc-draw", tick)} style={d(600 + i * 250)} /> : null}
            </g>
          ))}
        </g>
      </g>
      <g transform="translate(150 118) rotate(-38)">
        <g className="sc-wiggle" style={d(900)}>
          <rect x="0" y="-7" width="54" height="14" rx="3" className={mint} />
          <rect x="44" y="-7" width="10" height="14" rx="3" className={tealTint} />
          <path d="M0 -7 L-12 0 L0 7 Z" className={paper} />
          <path d="M-12 0 l4 -2.3 v4.6 Z" className="fill-[var(--sc-line)] stroke-[var(--sc-line)]" strokeWidth="1" />
        </g>
      </g>
    </Svg>
  );
}

/** A fan of three profile cards; the front one gets a green tick badge. */
function Shortlist() {
  const card = (cx: number, avatar: string) => (
    <>
      <rect x={cx - 44} y="34" width="88" height="112" rx="10" className={paper} />
      <circle cx={cx} cy="68" r="15" className={avatar} />
      <path d={`M${cx - 6} 64.5a6 6 0 1 1 12 0a6 6 0 1 1 -12 0`} className={line} strokeWidth="1.6" />
      <path d={`M${cx - 26} 102h52M${cx - 18} 116h36`} className={soft} />
    </>
  );
  return (
    <Svg>
      <g transform="rotate(-14 70 150)">
        <g className="sc-fan-left" style={d(80)}>{card(70, tealTint)}</g>
      </g>
      <g transform="rotate(14 150 150)">
        <g className="sc-fan-right" style={d(80)}>{card(150, tealTint)}</g>
      </g>
      <g className="sc-rise-in">{card(110, mint)}</g>
      <g className="sc-pop" style={d(650)}>
        <circle cx="146" cy="40" r="15" className={badge} />
        <path d="M139.5 40.5l4.5 4.5 8-9" className={tick} strokeWidth="2.6" />
      </g>
    </Svg>
  );
}

/** Two speech bubbles, one with typing dots, and two people. */
function Interview() {
  return (
    <Svg>
      <g className="sc-pop">
        <path d="M34 30h86a12 12 0 0 1 12 12v30a12 12 0 0 1-12 12H62l-16 14v-14H34a12 12 0 0 1-12-12V42a12 12 0 0 1 12-12Z" className={tealTint} />
        {[56, 77, 98].map((x, i) => (
          <circle key={x} cx={x} cy="57" r="5" className="sc-dot fill-[var(--sc-line)] stroke-none" style={d(500 + i * 150)} />
        ))}
      </g>
      <g className="sc-pop" style={d(350)}>
        <path d="M186 84h-86a12 12 0 0 0-12 12v28a12 12 0 0 0 12 12h58l16 14v-14h12a12 12 0 0 0 12-12V96a12 12 0 0 0-12-12Z" className={mint} />
        <path d="M106 104h62M106 118h40" className={soft} />
      </g>
      <g className="sc-in-left" style={d(200)}>
        <circle cx="34" cy="128" r="16" className={mint} />
        <path d="M26 125a8 8 0 0 1 16 0" className={line} strokeWidth="1.6" />
      </g>
      <g className="sc-in-right" style={d(500)}>
        <circle cx="194" cy="52" r="16" className={tealTint} />
        <path d="M186 49a8 8 0 0 1 16 0" className={line} strokeWidth="1.6" />
      </g>
    </Svg>
  );
}

/** A resume, an upload arrow that bobs, and a bar that fills. */
function Upload() {
  return (
    <Svg>
      <g transform="rotate(-6 98 92)">
        <g className="sc-rise-in">
          <path d="M60 34h58l22 22v84a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8Z" className={paper} />
          <path d="M118 34v22h22" className={line} />
          <circle cx="80" cy="66" r="11" className={mint} />
          <path d="M98 62h22M98 72h14M66 96h58M66 110h58M66 124h40" className={soft} />
        </g>
      </g>
      <g className="sc-bob" style={d(500)}>
        <circle cx="166" cy="54" r="22" className={badge} />
        <path d="M166 66V42m0 0-9 9m9-9 9 9" className={line} strokeWidth="2.6" />
      </g>
      <rect x="44" y="154" width="136" height="10" rx="5" className={paper} />
      <rect x="46" y="156" width="132" height="6" rx="3" className="sc-fill fill-[var(--sc-accent)] stroke-none" style={d(400)} />
    </Svg>
  );
}

/** A bell that rings, with a badge and ring lines. */
function Alert() {
  return (
    <Svg>
      <path d="M58 54c-7 9-9 20-7 31M44 46c-10 13-12 30-8 45" className={cn("sc-arc", soft)} style={d(400)} />
      <path d="M162 54c7 9 9 20 7 31M176 46c10 13 12 30 8 45" className={cn("sc-arc", soft)} style={d(400)} />
      <g className="sc-ring" style={d(300)}>
        <circle cx="110" cy="28" r="6" className={tealTint} />
        <path d="M110 34c-24 0-38 18-38 42v26l-12 16h100l-12-16V76c0-24-14-42-38-42Z" className={tealTint} />
        <path d="M96 132a14 14 0 0 0 28 0" className={mint} />
      </g>
      <g className="sc-pop" style={d(700)}>
        <circle cx="146" cy="44" r="15" className={badge} />
        <circle cx="146" cy="44" r="4" className="fill-[var(--sc-tick)] stroke-none" />
      </g>
    </Svg>
  );
}

/** A letter rising out of an envelope, with a seal. */
function Offer() {
  return (
    <Svg>
      <rect x="46" y="78" width="128" height="78" rx="10" className={tealTint} />
      <g className="sc-letter" style={d(150)}>
        <rect x="62" y="30" width="96" height="92" rx="8" className={paper} />
        <path d="M76 52h44M76 66h68M76 80h56" className={soft} />
        <g className="sc-pop" style={d(800)}>
          <circle cx="138" cy="98" r="14" className={badge} />
          <path d="M132 98.5l4.2 4.2 7.5-8.5" className={tick} strokeWidth="2.6" />
        </g>
      </g>
      <path d="M46 98l64 36 64-36v48a10 10 0 0 1-10 10H56a10 10 0 0 1-10-10V98Z" className={paper} />
      <path d="M46 156l50-32M174 156l-50-32" className={soft} />
    </Svg>
  );
}

const scenes = { brief: Brief, shortlist: Shortlist, interview: Interview, upload: Upload, bell: Alert, offer: Offer };
export type SceneName = keyof typeof scenes;

/**
 * Colour roles per card tone. "light" follows the theme (tint and neutral panels);
 * "brand" and "accent" sit on the fixed teal and green panels, so they are fixed too.
 */
const palettes = {
  light: {
    "--sc-line": "var(--trc-ink-900)",
    "--sc-paper": "var(--trc-surface-100)",
    "--sc-mint": "color-mix(in srgb, var(--trc-surface-accent) 40%, transparent)",
    "--sc-tint": "color-mix(in srgb, var(--trc-surface-brand) 14%, transparent)",
    "--sc-soft": "color-mix(in srgb, var(--trc-ink-900) 35%, transparent)",
    "--sc-accent": "var(--trc-surface-accent)",
    "--sc-tick": "var(--trc-ink-900)",
  },
  brand: {
    "--sc-line": "#053736",
    "--sc-paper": "#ffffff",
    "--sc-mint": "#6ebe48",
    "--sc-tint": "#cfe3d9",
    "--sc-soft": "rgb(5 55 54 / 0.35)",
    "--sc-accent": "#6ebe48",
    "--sc-tick": "#053736",
  },
  accent: {
    "--sc-line": "#053736",
    "--sc-paper": "#ffffff",
    "--sc-mint": "#d9efcc",
    "--sc-tint": "#a9d891",
    "--sc-soft": "rgb(5 55 54 / 0.35)",
    "--sc-accent": "#053736",
    "--sc-tick": "#6ebe48",
  },
} as const;
export type ScenePalette = keyof typeof palettes;

export function Scene({ name, palette = "light", className }: { name: SceneName; palette?: ScenePalette; className?: string }) {
  const Body = scenes[name];
  return (
    <div aria-hidden="true" className={cn("sc flex items-center justify-center", className)} style={palettes[palette] as React.CSSProperties}>
      <Body />
    </div>
  );
}
