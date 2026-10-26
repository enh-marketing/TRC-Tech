import Link from "next/link";
import { Bracket, cardFrame, cardPanel } from "@/components/ui";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { isShown } from "@/lib/placeholder";
import { ArrowRight, Building, MapPin, Mail, Phone } from "./icons";
import { Logo } from "./Logo";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="m-0 text-eyebrow uppercase text-ink-on-brand/75">{title}</h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">{children}</ul>
    </div>
  );
}

/** On hover the logo's bracket slides in beside the link: the system's "selected" mark. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 text-body text-ink-on-brand/85 no-underline transition-colors duration-150 hover:text-ink-on-brand focus-visible:text-ink-on-brand"
      >
        <Bracket
          size="sm"
          className="-ms-3.5 opacity-0 transition-[margin,opacity] duration-200 ease-out group-hover:ms-0 group-hover:opacity-100 group-focus-visible:ms-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        />
        {children}
      </Link>
    </li>
  );
}

/** Email and phone as compact action pills: a round icon, a small label, the value, and an arrow that turns on hover. */
function ContactPill({ label, value, href, icon }: { label: string; value: string; href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group flex min-h-16 w-full min-w-0 items-center gap-3 rounded-full bg-ink-on-brand/[0.06] py-2 ps-2 pe-4 no-underline ring-1 ring-ink-on-brand/10 transition duration-150 hover:bg-ink-on-brand/[0.1] hover:ring-surface-accent/60 sm:w-auto sm:flex-auto"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-accent text-ink-on-accent">{icon}</span>
      <span className="flex min-w-0 flex-col">
        <span className="text-caption text-ink-on-brand/75">{label}</span>
        <span className="text-body font-semibold break-words text-ink-on-brand tabular-nums xl:text-heading-sm">{value}</span>
      </span>
      <ArrowRight className="ms-auto size-4 shrink-0 -rotate-45 text-accent-on-brand transition-transform duration-200 ease-out group-hover:rotate-0 motion-reduce:transition-none" />
    </a>
  );
}

function PlaceLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-eyebrow uppercase text-ink-on-brand/75">
      <span className="text-accent-on-brand-hover">{icon}</span>
      {children}
    </span>
  );
}

export function SiteFooter() {
  const { contact, parent } = site;
  const year = new Date().getFullYear();
  const showContact = isShown(contact);

  return (
    <footer className="bg-surface-brand text-ink-on-brand">
      <div className="mx-auto max-w-[1200px] px-4 pt-14 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,9fr)_minmax(0,15fr)] lg:gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-16">
          <div className="flex flex-col items-start gap-6">
            <Link href="/" aria-label={`${site.name}, home`} className="w-fit">
              <Logo height={48} />
            </Link>
            <p className="m-0 max-w-[30ch] text-heading-lg text-ink-on-brand">
              Permanent tech and product hiring, <span className="text-ink-on-brand/60">for product and IT companies.</span>
            </p>
            <a
              href={parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-on-brand/25 px-4 text-body-sm whitespace-nowrap text-ink-on-brand no-underline transition-colors duration-150 hover:border-surface-accent"
            >
              <Bracket size="sm" />A {parent.name} company
              <ArrowRight className="size-4 -rotate-45 text-accent-on-brand transition-transform duration-200 ease-out group-hover:rotate-0 motion-reduce:transition-none" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {site.social.linkedin ? (
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-body-sm text-ink-on-brand">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>

          {showContact ? (
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap gap-2.5">
                {contact.email ? (
                  <ContactPill label="Email us" value={contact.email} href={`mailto:${contact.email}`} icon={<Mail className="size-5" />} />
                ) : null}
                {contact.phone ? (
                  <ContactPill label="Call us" value={contact.phone} href={contact.phoneHref} icon={<Phone className="size-5" />} />
                ) : null}
              </div>
              {contact.address || contact.offices.length ? (
                <div className={cardFrame}>
                  <div className={cn("grid overflow-hidden bg-surface-brand-hover sm:grid-cols-2", cardPanel)}>
                    {contact.address ? (
                      <div className="flex flex-col gap-2.5 p-5">
                        <PlaceLabel icon={<MapPin className="size-4" />}>Head office</PlaceLabel>
                        <address className="text-body-sm not-italic text-ink-on-brand/90">{contact.address}</address>
                      </div>
                    ) : null}
                    {contact.offices.length ? (
                      <div className="flex flex-col gap-2.5 border-t border-ink-on-brand/10 p-5 sm:border-t-0 sm:border-l">
                        <PlaceLabel icon={<Building className="size-4" />}>Offices</PlaceLabel>
                        <dl className="m-0 flex flex-col gap-1.5 text-body-sm">
                          {contact.offices.map((group) => (
                            <div key={group.region} className="flex gap-2">
                              <dt className="shrink-0 font-semibold text-accent-on-brand-hover">{group.region}</dt>
                              <dd className="m-0 text-ink-on-brand/90">{group.cities.join(", ")}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <nav aria-label="Footer" className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink-on-brand/15 py-12 md:grid-cols-4">
          <Column title="What we do">
            {pillars.map((p) => (
              <FooterLink key={p.slug} href={p.href}>
                {p.title}
              </FooterLink>
            ))}
          </Column>
          <Column title="Company">
            <FooterLink href="/">Home</FooterLink>
            {site.nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </Column>
          <Column title="For companies">
            <FooterLink href={site.cta.hire.href}>{site.cta.hire.label}</FooterLink>
            <FooterLink href="/#how-it-works">How it works</FooterLink>
            <FooterLink href="/insights/">Insights</FooterLink>
          </Column>
          <Column title="For candidates">
            <FooterLink href={site.cta.apply.href}>{site.cta.apply.label}</FooterLink>
            <FooterLink href="/#faq">Questions</FooterLink>
            <FooterLink href="/privacy-policy/">How we use your data</FooterLink>
          </Column>
        </nav>
      </div>

      <div className="border-t border-ink-on-brand/15">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-5">
          <p className="m-0 text-caption text-ink-on-brand/70">
            © {year} {parent.legalName} All rights reserved.
          </p>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2 p-0">
            {site.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-caption text-ink-on-brand/80 no-underline hover:text-accent-on-brand">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#top" className="group inline-flex min-h-11 items-center gap-3 text-caption text-ink-on-brand/80 no-underline hover:text-ink-on-brand">
                Back to top
                <span className="flex size-9 items-center justify-center rounded-full border border-ink-on-brand/25 transition-colors duration-150 group-hover:border-surface-accent">
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
