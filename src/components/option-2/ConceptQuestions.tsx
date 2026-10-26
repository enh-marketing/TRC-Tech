import { Button } from "@/components/ui";
import { faq } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { QuestionList } from "./QuestionList";
import { Label, Title, spread, wrap } from "./shared";

/**
 * The FAQ: the title, topics and the way out ("Still have questions?") in a
 * column on the left, the questions as a ruled list on the right. Placeholder
 * answers show in preview only, and an empty topic is dropped, as in concept 1.
 */
export function ConceptQuestions() {
  const groups = faq.groups.map((g) => ({ label: g.label, items: shown(g.items) })).filter((g) => g.items.length > 0);

  return (
    <section id="faq" aria-labelledby="o2-faq-title" className={`bg-surface-canvas ${spread}`}>
      <div className={wrap}>
        <QuestionList groups={groups}>
          <div data-reveal className="flex flex-col gap-6">
            <Label index="07">{faq.eyebrow}</Label>
            <Title id="o2-faq-title" lead={faq.title} tail={faq.titleTail} className="text-display-sm sm:text-display-md" />
            <p className="m-0 text-body-lg text-ink-700">{faq.intro}</p>
          </div>
        </QuestionList>

        <div data-reveal className="mt-16 grid gap-6 rounded-2xl bg-surface-100 p-8 ring-1 ring-line-100 sm:p-10 lg:mt-24 lg:grid-cols-12 lg:items-center lg:gap-x-8">
          <div className="flex flex-col gap-2 lg:col-span-8">
            <h3 className="m-0 text-heading-lg text-ink-900">{faq.contact.title}</h3>
            <p className="m-0 text-body-lg text-ink-700">{faq.contact.body}</p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Button href={faq.contact.href} size="lg" variant="secondary">
              {faq.contact.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
