import Image from "next/image";
import Link from "next/link";
import { Silhouette } from "@/components/sections/home/Silhouette";
import { finalCta } from "@/content/home";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";

/**
 * The faces around the closing statement, three a side. Stock portraits, so
 * preview only; without preview each disc shows a silhouette. Phones keep the
 * four corner faces and drop the two beside the text.
 */
const faces = [
  { n: "01", place: "top-[10%] left-[5%] size-12 sm:top-[16%] sm:left-[7%] sm:size-16" },
  { n: "02", place: "hidden sm:block top-[38%] left-[17%] size-14" },
  { n: "09", place: "bottom-[8%] left-[8%] size-11 sm:bottom-[18%] sm:left-[12%] sm:size-14" },
  { n: "11", place: "top-[8%] right-[6%] size-11 sm:top-[12%] sm:right-[8%] sm:size-16" },
  { n: "12", place: "hidden sm:block top-[40%] right-[16%] size-14" },
  { n: "13", place: "bottom-[10%] right-[5%] size-12 sm:bottom-[16%] sm:right-[10%] sm:size-16" },
].map((f) => ({ ...f, src: `/placeholders/people/portrait-${f.n}.jpg`, placeholder: "Unsplash stock photo, preview only" }));

const button = "o3-press inline-flex min-h-13 items-center justify-center rounded-full px-7 text-btn-label no-underline transition-colors duration-150";

/**
 * Get started, after the agency's reference: a full-width brand band with
 * faint dotted orbits, faces around the edge, and the closing statement in the
 * middle. The reference's single button becomes the two paths, each under its
 * own question; its sub-line becomes the phone line (preview only while the
 * number is the parent company's).
 */
export function O3Start() {
  const { contact, cta } = site;
  const paths = [
    { ask: finalCta.companies.title, ...cta.hire, track: "hire_cta_click", primary: true },
    { ask: finalCta.candidates.title, ...cta.apply, track: "apply_cta_click", primary: false },
  ];

  return (
    <section aria-labelledby="o3-start-title" className="relative overflow-hidden bg-surface-brand py-28 text-ink-on-brand sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {["w-[70%] sm:w-[52%]", "w-[120%] sm:w-[78%]", "w-[170%] sm:w-[104%]"].map((size) => (
          <span key={size} className={cn("absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink-on-brand/15", size)} />
        ))}
        {faces.map((face) => (
          <span key={face.n} data-reveal className={cn("absolute overflow-hidden rounded-full bg-surface-accent/40 shadow-sm ring-4 ring-surface-brand", face.place)}>
            {isShown(face) ? (
              <Image src={face.src} alt="" fill sizes="64px" className="object-cover object-top" />
            ) : (
              <Silhouette className="absolute inset-x-[14%] bottom-0 h-[78%] w-[72%] fill-ink-on-brand/20" />
            )}
          </span>
        ))}
      </div>

      <div data-reveal="stagger" className="relative mx-auto flex max-w-[760px] flex-col items-center px-5 text-center">
        <h2 id="o3-start-title" className="m-0 text-display-sm sm:text-display-md">
          {finalCta.title} <span className="text-ink-on-brand/65">{finalCta.titleTail}</span>
        </h2>
        {isShown(contact) && contact.phone ? (
          <p className="m-0 mt-6 text-body-sm text-ink-on-brand/80">
            {finalCta.talk}{" "}
            <a href={contact.phoneHref} className="text-heading-md whitespace-nowrap text-ink-on-brand tabular-nums underline decoration-ink-on-brand/30 underline-offset-4 hover:decoration-ink-on-brand">
              {contact.phone}
            </a>
          </p>
        ) : null}

        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-8">
          {paths.map((path) => (
            <div key={path.href} className="flex flex-col items-center gap-3">
              <p className="m-0 text-body-sm text-ink-on-brand/75">{path.ask}</p>
              <Link
                href={path.href}
                data-track={path.track}
                data-location="get_started"
                className={cn(
                  button,
                  path.primary
                    ? "bg-surface-accent text-ink-on-accent hover:bg-surface-accent-hover"
                    : "border border-ink-on-brand/60 text-ink-on-brand hover:border-ink-on-brand hover:bg-ink-on-brand/10",
                )}
              >
                {path.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
