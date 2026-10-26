import { whyTrc } from "@/content/home";
import { O3Reasons } from "./O3Reasons";
import { frame } from "./shared";

/**
 * Why TRC, concept 3's own take: the three reasons (focus, level, backing) as
 * panels that open one at a time, each showing its proof: the four practices,
 * a staircase of the levels we place, or the parent firm's figures (see
 * O3Reasons). The intro is left out because the About section already says it.
 */
export function O3Why() {
  return (
    <section aria-labelledby="o3-why-title" className="bg-surface-canvas py-20 lg:py-28">
      <div className={frame}>
        <div data-reveal="stagger">
          <p className="m-0 inline-flex rounded-full px-4 py-1.5 text-eyebrow text-ink-700 uppercase ring-1 ring-line-200">{whyTrc.eyebrow}</p>
          <h2 id="o3-why-title" className="m-0 mt-5 text-display-sm sm:text-display-md text-ink-900 xl:whitespace-nowrap">
            {whyTrc.title} <span className="text-ink-500">{whyTrc.titleTail}</span>
          </h2>
        </div>
        <div className="mt-12 lg:mt-16">
          <O3Reasons />
        </div>
      </div>
    </section>
  );
}
