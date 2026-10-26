import { faq } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { O3QuestionList } from "./O3QuestionList";
import { frame } from "./shared";

/**
 * The FAQ section. Placeholder answers show in preview only, and a topic left
 * with no questions is dropped, as in concepts 1 and 2.
 */
export function O3Faq() {
  const groups = faq.groups.map((g) => ({ label: g.label, items: shown(g.items) })).filter((g) => g.items.length > 0);

  return (
    <section id="faq" aria-labelledby="o3-faq-title" className="bg-surface-canvas py-20 lg:py-28">
      <div className={frame}>
        <O3QuestionList groups={groups} contact={faq.contact}>
          <h2 id="o3-faq-title" className="m-0 text-display-sm sm:text-display-md text-ink-900">
            {faq.title} <span className="text-ink-500">{faq.titleTail}</span>
          </h2>
          <p className="m-0 mt-6 max-w-[46ch] text-body-lg text-ink-700">{faq.intro}</p>
        </O3QuestionList>
      </div>
    </section>
  );
}
