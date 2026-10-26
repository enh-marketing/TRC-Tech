import { site } from "@/content/site";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100").replace(/\/$/, "");

/** Organization and WebSite structured data for the homepage. */
export function homeJsonLd() {
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/trc-logo.png`,
    description: "Permanent technology, product, AI and leadership hiring for product and IT companies.",
    parentOrganization: {
      "@type": "Organization",
      name: site.parent.legalName,
      url: site.parent.url,
    },
  };
  // Added only once TRC has created the inbox.
  if (site.contact.email && !site.contact.placeholder) {
    organization.contactPoint = { "@type": "ContactPoint", contactType: "sales", email: site.contact.email };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: site.name, publisher: { "@id": `${siteUrl}/#organization` } },
    ],
  };
}

/** Escape `<` so the payload can never close its script tag (Next.js JSON-LD guidance). */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
