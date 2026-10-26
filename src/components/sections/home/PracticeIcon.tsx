/**
 * Outline icons for the four practices, on the site's 24px, 1.5px grid: code, layers, a spark and a flag.
 * Each moving part is its own path with a `pi-*` class; concept 3 loops them (globals.css), elsewhere they sit still.
 */
export function PracticeIcon({ slug, className = "size-5" }: { slug: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    "technology-hiring": (
      <>
        <path className="pi-left" d="m8 8-4 4 4 4" />
        <path className="pi-right" d="M16 8l4 4-4 4" />
        <path className="pi-slash" d="M13.5 5.5l-3 13" />
      </>
    ),
    "product-hiring": (
      <>
        <path className="pi-top" d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path className="pi-base" d="m3 13 9 5 9-5" />
      </>
    ),
    "ai-data-hiring": (
      <>
        <path className="pi-spark" d="m12 4 1.8 4.7 4.7 1.8-4.7 1.8L12 17l-1.8-4.7-4.7-1.8 4.7-1.8L12 4Z" />
        <path className="pi-spark-sm" d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
      </>
    ),
    "leadership-hiring": (
      <>
        <path className="pi-pole" d="M5 21V4" />
        <path className="pi-flag" d="M5 4h11l-2 4 2 4H5" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`practice-icon ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths[slug]}
    </svg>
  );
}
