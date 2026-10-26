import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  ["/design-system#colour", "Colour"],
  ["/design-system#typography", "Typography"],
  ["/design-system#spacing", "Spacing"],
  ["/design-system#shape", "Shape"],
  ["/design-system#components", "Components"],
  ["/docs", "Project docs"],
  ["/", "Website"],
];

export function ShowcaseHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line-100 bg-surface-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-4 px-4 py-3">
        <Link href="/design-system" className="flex items-center gap-3 no-underline">
          <span className="flex items-center rounded-md bg-surface-brand px-3 py-2">
            <Logo height={51} priority />
          </span>
          <span className="text-heading-sm text-ink-900">Design system</span>
        </Link>
        <nav className="ms-auto flex flex-wrap items-center gap-4">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="text-body-sm text-ink-700 hover:text-accent-700">
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
