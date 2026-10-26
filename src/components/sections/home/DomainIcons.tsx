/**
 * Animated outline icons for the six kinds of organisation. Same grid as the
 * site icon set (24px box, 1.5px stroke, colour from the text). Parts carry
 * `di-*` classes; globals.css animates them when an ancestor has
 * `data-play="true"` (three loops, then rest), `data-play="intro"` (once),
 * or is hovered (loops while hovered). Nothing moves with reduced motion set.
 */

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`domain-icon ${className ?? "size-6"}`}
    >
      {children}
    </svg>
  );
}

/** A product window whose chart bars rise one after another. */
export const ProductIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8.5h18" />
    <path d="M6 6.25h.01M8.5 6.25h.01" />
    <path className="di-bar" strokeWidth="2" d="M8 17v-3" />
    <path className="di-bar" strokeWidth="2" d="M12 17v-5.5" style={{ animationDelay: "0.15s" }} />
    <path className="di-bar" strokeWidth="2" d="M16 17v-4" style={{ animationDelay: "0.3s" }} />
  </Svg>
);

/** A bank whose roof settles and columns rise. */
export const FintechIcon = (p: IconProps) => (
  <Svg {...p}>
    <g className="di-roof">
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M3 9.5h18" />
    </g>
    {[6, 10, 14, 18].map((x, i) => (
      <path key={x} className="di-col" d={`M${x} 17.5v-5`} style={{ animationDelay: `${i * 0.1}s` }} />
    ))}
    <path d="M3.5 20.5h17" />
  </Svg>
);

/** A rocket that hovers, with a flickering flame. */
export const StartupIcon = (p: IconProps) => (
  <Svg {...p}>
    <g className="di-rocket">
      <path d="M12 2.5c2.5 2 4 5 4 8.5v4.5H8V11c0-3.5 1.5-6.5 4-8.5Z" />
      <circle cx="12" cy="9.5" r="1.5" />
      <path d="M8 12.5 5.5 15v3L8 16.5M16 12.5l2.5 2.5v3L16 16.5" />
      <path className="di-flame" d="M10.5 18.5c0 1.5.7 2.5 1.5 3 .8-.5 1.5-1.5 1.5-3" />
    </g>
  </Svg>
);

/** An office building whose windows light up in turn. */
export const MidmarketIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" />
    <path d="M15 10h4a1 1 0 0 1 1 1v10" />
    <path d="M3 21h18" />
    {[
      [7, 7],
      [10.5, 7],
      [7, 11],
      [10.5, 11],
      [7, 15],
      [10.5, 15],
    ].map(([x, y], i) => (
      <rect
        key={`${x}-${y}`}
        className="di-win"
        x={x}
        y={y}
        width="1.8"
        height="1.8"
        rx="0.3"
        fill="currentColor"
        stroke="none"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </Svg>
);

/** Two server units with blinking status lights and a data line that runs. */
export const ServicesIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="16" height="6.5" rx="1.5" />
    <circle className="di-led" cx="7.5" cy="7.25" r="0.9" fill="currentColor" stroke="none" />
    <circle className="di-led" cx="7.5" cy="16.75" r="0.9" fill="currentColor" stroke="none" style={{ animationDelay: "0.45s" }} />
    <path className="di-data" d="M11 7.25h5.5M11 16.75h5.5" />
  </Svg>
);

/** Two arrows that turn a full circle around a core that pulses. */
export const TransformIcon = (p: IconProps) => (
  <Svg {...p}>
    <g className="di-spin">
      <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
      <path d="M20 20v-4h-4" />
    </g>
    <rect className="di-core" x="9.5" y="9.5" width="5" height="5" rx="1" />
  </Svg>
);

export const domainIcons = {
  product: ProductIcon,
  fintech: FintechIcon,
  startup: StartupIcon,
  midmarket: MidmarketIcon,
  services: ServicesIcon,
  transformation: TransformIcon,
};
