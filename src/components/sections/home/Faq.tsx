import { faq } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { FaqTabs } from "./FaqTabs";

/** Questions by topic, after the agency's reference: topic pills left, questions and a contact card right. */
export function Faq() {
  // Placeholder answers render in preview only; a topic with nothing left to show is dropped.
  const groups = faq.groups.map((g) => ({ label: g.label, items: shown(g.items) })).filter((g) => g.items.length > 0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-surface-200">
      <div className="mx-auto max-w-[1200px] px-4 py-16 lg:py-24">
        <FaqTabs
          header={{ eyebrow: faq.eyebrow, title: faq.title, titleTail: faq.titleTail, intro: faq.intro }}
          groups={groups}
          contact={faq.contact}
        />
      </div>
    </section>
  );
}
