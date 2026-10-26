import Image from "next/image";
import { ReservedSlot } from "@/components/site/Draft";
import { clientLogos } from "@/content/home";
import { shown } from "@/lib/placeholder";
import { wrap } from "./shared";

/** One visual height for every logo, enlarged where the file has empty space, capped in width. Narrow cells scale a logo down whole. */
function size(width: number, height: number, scale = 1) {
  const h = 30 * scale;
  const w = (h * width) / height;
  return w > 116 ? { width: 116, height: Math.round((116 * height) / width) } : { width: Math.round(w), height: Math.round(h) };
}

/**
 * The parent firm's clients as a still grid of twelve, divided by hairlines: easier
 * to scan than a moving strip, and every logo is visible at once. Same rule as
 * concept 1: six or more logos with permission, or nothing goes live.
 */
export function ConceptClients() {
  const logos = shown(clientLogos.items);
  if (logos.length < 6) return <ReservedSlot title="Client logos" note="Six or more logos, each with written permission." />;

  return (
    <section aria-labelledby="o2-clients" className="bg-surface-100 py-16 lg:py-24">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-8`}>
        <div data-reveal className="flex flex-col gap-5 lg:col-span-3">
          <span aria-hidden="true" data-reveal="rule" className="block h-0.5 w-8 bg-surface-accent" />
          <h2 id="o2-clients" className="m-0 text-heading-lg text-ink-900">
            {clientLogos.label}
          </h2>
        </div>
        <ul data-reveal className="m-0 grid list-none grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line-100 p-0 ring-1 ring-line-100 sm:grid-cols-4 lg:col-span-9 lg:grid-cols-6">
          {logos.map((logo) => {
            const box = size(logo.width, logo.height, logo.scale);
            return (
              <li key={logo.name} className="flex h-24 items-center justify-center bg-surface-100 px-3">
                <Image src={logo.src} alt={logo.name} width={box.width} height={box.height} style={{ width: box.width, height: "auto", maxWidth: "100%" }} className="logo-mono object-contain" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
