import { Bracket } from "@/components/ui";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line-100 py-16">
      <header className="mb-8 flex max-w-[720px] flex-col gap-3">
        <p className="flex items-center gap-3 text-eyebrow uppercase text-ink-500">
          <Bracket />
          {eyebrow}
        </p>
        <h2 className="m-0 text-display-md text-ink-900">{title}</h2>
        {intro ? <p className="m-0 text-body-lg text-ink-700">{intro}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function Subhead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4 flex max-w-[720px] flex-col gap-1">
      <h3 className="m-0 text-heading-md text-ink-900">{title}</h3>
      {note ? <p className="m-0 text-body-sm text-ink-500">{note}</p> : null}
    </div>
  );
}
