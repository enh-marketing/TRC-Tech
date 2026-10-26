import Link from "next/link";
import { domainIcons } from "@/components/sections/home/DomainIcons";
import { ArrowRight, Mail, MapPin, Phone } from "@/components/site/icons";
import { Logo } from "@/components/site/Logo";
import { Bracket } from "@/components/ui";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { conceptHome, frame } from "./shared";

const card = "rounded-2xl bg-surface-raised shadow-sm ring-1 ring-line-100";
const lift = "transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-5">
      <h2 className="m-0 inline-flex rounded-full px-4 py-1.5 text-eyebrow text-ink-700 uppercase ring-1 ring-line-200">{title}</h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">{children}</ul>
    </div>
  );
}

/** On hover a small arrow slides in beside the link. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center gap-2 text-body text-ink-700 no-underline transition-colors duration-150 hover:text-ink-900 focus-visible:text-ink-900">
        <ArrowRight className="-ms-5 size-3.5 text-accent-700 opacity-0 transition-[margin,opacity] duration-200 ease-out group-hover:ms-0 group-hover:opacity-100 group-focus-visible:ms-0 group-focus-visible:opacity-100 motion-reduce:transition-none" />
        {children}
      </Link>
    </li>
  );
}

/**
 * Email or phone as a compact white card: the icon in a green circle, a label, the
 * value, and (from 640px) an arrow that turns on hover. Compact so the two sit
 * side by side above the address card with each value on one line.
 */
function ContactCard({ label, value, href, icon }: { label: string; value: string; href: string; icon: React.ReactNode }) {
  return (
    <a href={href} className={cn(card, "o3-icon-host group flex min-w-0 items-center gap-3 p-3 pe-4 no-underline transition-shadow duration-200 hover:shadow-card")}>
      <span aria-hidden="true" className={cn("flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent", lift)}>
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-caption text-ink-500">{label}</span>
        <span className="text-body font-semibold whitespace-nowrap text-ink-900 tabular-nums xl:text-heading-sm">{value}</span>
      </span>
      <span aria-hidden="true" className="ms-auto hidden size-8 shrink-0 items-center justify-center rounded-full bg-surface-brand text-ink-on-brand sm:flex">
        <ArrowRight className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
      </span>
    </a>
  );
}

/**
 * Concept 3's footer: concept 1's content (statement, parent firm, contact
 * details, the four link columns, legal links) in concept 3's language. The
 * statement in the shared heading style; beside it (below it under 1280px) email
 * and phone side by side above the address card, all white cards with green or
 * mint icon circles; outlined pill labels over the columns, and "Back to top" as
 * a pill with its arrow in a green circle. The contact icons loop like every
 * concept 3 icon (data-icons="loop"). Contact details are the parent company's,
 * so they show in preview only, as on concept 1.
 */
export function O3Footer() {
  const { contact, parent } = site;
  const year = new Date().getFullYear();
  const showContact = isShown(contact);
  const Offices = domainIcons.midmarket;

  return (
    <footer data-icons="loop" className="bg-surface-canvas text-ink-900">
      <div className={cn(frame, "pt-16 lg:pt-24")}>
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-x-10">
          <div className="flex flex-col items-start gap-8 xl:col-span-4">
            <Link href={conceptHome} aria-label={`${site.name}, home`} className="w-fit">
              <Logo height={48} />
            </Link>
            <p className="m-0 max-w-[30ch] text-heading-lg">
              Permanent tech and product hiring, <span className="text-ink-500">for product and IT companies.</span>
            </p>
            <a
              href={parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(card, "group inline-flex items-center gap-3 rounded-xl p-2 pe-4 no-underline transition-shadow duration-200 hover:shadow-card")}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-brand">
                <Bracket size="sm" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-body-sm font-semibold text-ink-900">A {parent.name} company</span>
                <span className="text-caption text-ink-500">Since {parent.founded}</span>
              </span>
              <ArrowRight className="ms-2 size-4 -rotate-45 text-accent-700 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {site.social.linkedin ? (
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-body-sm text-ink-900">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          {showContact ? (
            <div className="flex flex-col gap-4 xl:col-span-8 xl:self-end">
              {/* Email and phone in one row above the address card. */}
              {contact.email || contact.phone ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {contact.email ? (
                    <ContactCard label="Email us" value={contact.email} href={`mailto:${contact.email}`} icon={<Mail className="o3-loop-bob size-5" />} />
                  ) : null}
                  {contact.phone ? (
                    <ContactCard label="Call us" value={contact.phone} href={contact.phoneHref} icon={<Phone className="o3-loop-ring size-5" />} />
                  ) : null}
                </div>
              ) : null}
              {contact.address || contact.offices.length ? (
                <div className={cn(card, "grid gap-6 p-6 sm:grid-cols-2")}>
                  {contact.address ? (
                    <div className="o3-icon-host group flex flex-col gap-3">
                      <span className="flex items-center gap-3 text-caption text-ink-500">
                        <span aria-hidden="true" className={cn("flex size-9 items-center justify-center rounded-full bg-surface-brand text-ink-on-brand", lift)}>
                          <MapPin className="o3-loop-hop size-4" />
                        </span>
                        Head office
                      </span>
                      <address className="text-body-sm not-italic text-ink-700">{contact.address}</address>
                    </div>
                  ) : null}
                  {contact.offices.length ? (
                    <div className="di-host o3-icon-host group flex flex-col gap-3">
                      <span className="flex items-center gap-3 text-caption text-ink-500">
                        <span aria-hidden="true" className={cn("flex size-9 items-center justify-center rounded-full bg-surface-brand text-ink-on-brand", lift)}>
                          <Offices className="size-4" />
                        </span>
                        Offices
                      </span>
                      <dl className="m-0 flex flex-col gap-1.5 text-body-sm">
                        {contact.offices.map((group) => (
                          <div key={group.region} className="flex gap-2">
                            <dt className="shrink-0 font-semibold text-ink-900">{group.region}</dt>
                            <dd className="m-0 text-ink-700">{group.cities.join(", ")}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <nav aria-label="Footer" className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-200 py-12 md:grid-cols-4 lg:mt-20">
          <Column title="What we do">
            {pillars.map((p) => (
              <FooterLink key={p.slug} href={p.href}>
                {p.title}
              </FooterLink>
            ))}
          </Column>
          <Column title="Company">
            <FooterLink href={conceptHome}>Home</FooterLink>
            {site.nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </Column>
          <Column title="For companies">
            <FooterLink href={site.cta.hire.href}>{site.cta.hire.label}</FooterLink>
            <FooterLink href="#how-it-works">How it works</FooterLink>
            <FooterLink href="/insights/">Insights</FooterLink>
          </Column>
          <Column title="For candidates">
            <FooterLink href={site.cta.apply.href}>{site.cta.apply.label}</FooterLink>
            <FooterLink href="#faq">Questions</FooterLink>
            <FooterLink href="/privacy-policy/">How we use your data</FooterLink>
          </Column>
        </nav>
      </div>

      <div className="border-t border-line-200">
        <div className={cn(frame, "flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-6")}>
          <p className="m-0 text-caption text-ink-500">
            © {year} {parent.legalName} All rights reserved.
          </p>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-3 p-0">
            {site.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-caption text-ink-700 no-underline hover:text-ink-900 hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#top"
                className="o3-press group inline-flex min-h-11 items-center gap-3 rounded-full ps-4 pe-1.5 text-caption text-ink-900 no-underline ring-1 ring-line-200 transition-colors duration-150 hover:ring-ink-900"
              >
                Back to top
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">
                  <ArrowRight className="size-4 -rotate-90 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
