import Link from "next/link";
import { cn } from "@/lib/cn";
import { Bracket } from "./Bracket";
import { cardFrame, cardLift, cardPanel } from "./cardFrame";

/**
 * A bordered block for one idea. Use `href` only when the whole card has
 * a single destination; a card holding two links should let each stand.
 */
export function Card({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    // relative: lets a title link stretch over the whole card with an ::after overlay.
    <article className={cn("relative flex", cardFrame, href && cardLift)}>
      <div className={cn("flex w-full flex-col gap-3 bg-surface-100 p-6", cardPanel, className)}>{children}</div>
    </article>
  );
}

/**
 * The home-page pillar card: bracket, title, one line of copy, roles list.
 */
export function PillarCard({
  title,
  href,
  body,
  roles,
}: {
  title: string;
  href: string;
  body: string;
  roles: string[];
}) {
  return (
    <Card href={href} className="gap-4 p-8">
      <Bracket />
      <h3 className="m-0 text-heading-lg text-ink-900">
        <Link href={href} className="text-inherit no-underline hover:text-accent-700">
          {title}
        </Link>
      </h3>
      <p className="m-0 text-body text-ink-700">{body}</p>
      <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 text-body-sm text-ink-700">
        {roles.map((role) => (
          <li key={role} className="flex items-center gap-2">
            <Bracket size="sm" />
            {role}
          </li>
        ))}
      </ul>
    </Card>
  );
}
