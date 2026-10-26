import Link from "next/link";
import { ArrowRight, Building, Mail, MapPin, Phone } from "@/components/site/icons";
import { Logo } from "@/components/site/Logo";
import { pillars, site } from "@/content/site";
import { isShown } from "@/lib/placeholder";
import { conceptHome, wrap } from "./shared";

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-0 text-eyebrow text-ink-500 uppercase">{title}</h2>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-body text-ink-700 no-underline underline-offset-[5px] transition-colors hover:text-ink-900 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Concept 2's footer: the same statement, links and contact details as concept 1,
 * set as the last spread of the page. A large statement and the contact details
 * share the top; the four link columns sit under a single rule. In-page links
 * point at this page's own sections.
 */
export function ConceptFooter() {
  const { contact, parent } = site;
  const year = new Date().getFullYear();
  const showContact = isShown(contact);

  return (
    <footer className="bg-surface-100">
      <div className={`${wrap} pt-20 lg:pt-28`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col items-start gap-8 lg:col-span-6">
            <Link href={conceptHome} aria-label={`${site.name}, home`} className="w-fit">
              <Logo height={44} />
            </Link>
            <p className="m-0 max-w-[22ch] text-display-sm text-ink-900 sm:text-display-md">
              Permanent tech and product hiring, <span className="text-ink-500">for product and IT companies.</span>
            </p>
            <a
              href={parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 text-btn-label text-ink-900 no-underline underline-offset-[6px] hover:underline"
            >
              A {parent.name} company
              <ArrowRight className="size-4 -rotate-45 text-accent-700 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          {showContact ? (
            <address className="flex flex-col gap-8 not-italic lg:col-span-5 lg:col-start-8">
              <div className="flex flex-col gap-4">
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 no-underline">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
                      <Mail className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-caption text-ink-500">Email us</span>
                      <span className="text-heading-md break-all text-ink-900 group-hover:underline group-hover:underline-offset-4">{contact.email}</span>
                    </span>
                  </a>
                ) : null}
                {contact.phone ? (
                  <a href={contact.phoneHref} className="group flex items-center gap-4 no-underline">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
                      <Phone className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-caption text-ink-500">Call us</span>
                      <span className="text-heading-md text-ink-900 tabular-nums group-hover:underline group-hover:underline-offset-4">{contact.phone}</span>
                    </span>
                  </a>
                ) : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {contact.address ? (
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-eyebrow text-ink-500 uppercase">
                      <MapPin className="size-4 text-accent-700" />
                      Head office
                    </span>
                    <span className="text-body-sm text-ink-700">{contact.address}</span>
                  </div>
                ) : null}
                {contact.offices.length ? (
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-eyebrow text-ink-500 uppercase">
                      <Building className="size-4 text-accent-700" />
                      Offices
                    </span>
                    <dl className="m-0 flex flex-col gap-1.5 text-body-sm">
                      {contact.offices.map((group) => (
                        <div key={group.region} className="flex gap-2">
                          <dt className="shrink-0 font-semibold text-accent-700">{group.region}</dt>
                          <dd className="m-0 text-ink-700">{group.cities.join(", ")}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}
              </div>
            </address>
          ) : null}
        </div>

        <span aria-hidden="true" data-reveal="rule" className="mt-16 block h-px bg-line-200 lg:mt-24" />
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4">
          <Column title="What we do" links={pillars.map((p) => ({ href: p.href, label: p.title }))} />
          <Column title="Company" links={[{ href: conceptHome, label: "Home" }, ...site.nav]} />
          <Column
            title="For companies"
            links={[
              { href: site.cta.hire.href, label: site.cta.hire.label },
              { href: "#how-it-works", label: "How it works" },
              { href: "/insights/", label: "Insights" },
            ]}
          />
          <Column
            title="For candidates"
            links={[
              { href: site.cta.apply.href, label: site.cta.apply.label },
              { href: "#faq", label: "Questions" },
              { href: "/privacy-policy/", label: "How we use your data" },
            ]}
          />
        </nav>
      </div>

      <div className="bg-surface-200">
        {/* In preview, room below the bar so the concept badge never covers the legal links. */}
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-5 ${site.preview ? "pb-20" : "pb-5"}`}>
          <p className="m-0 text-caption text-ink-500">
            © {year} {parent.legalName} All rights reserved.
          </p>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2 p-0">
            {site.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-caption text-ink-700 no-underline hover:text-ink-900 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#top" className="group inline-flex min-h-11 items-center gap-3 text-caption text-ink-700 no-underline hover:text-ink-900">
                Back to top
                <span className="flex size-9 items-center justify-center rounded-full border border-line-200 transition-colors group-hover:border-surface-accent group-hover:bg-surface-accent group-hover:text-ink-on-accent">
                  <ArrowRight className="size-4 -rotate-90" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
