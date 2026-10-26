/**
 * Facts shared by the header, footer, planned pages and JSON-LD.
 * One source, so contact details and navigation can never disagree.
 *
 * `null` means TRC has not supplied it yet. In preview mode those gaps
 * render as Draft markers; with preview off they simply do not render.
 */

export type Pillar = {
  slug: string;
  href: string;
  title: string;
  short: string;
  summary: string;
  roles: string[];
};

export const site = {
  /** Placeholder until TRC chooses between TechX, TechAspire, TechXpert and TechSphere. */
  name: "TRC Tech Hiring",
  nameIsPlaceholder: true,

  /** Shows the review bar, Draft markers and reserved slots. Set to false for launch. */
  preview: true,

  parent: {
    legalName: "TRC Corporate Consulting Pvt. Ltd.",
    name: "TRC Corporate Consulting",
    url: "https://www.trcconsulting.org/",
    founded: 1999,
  },

  /**
   * TRC Corporate Consulting's published details from trcconsulting.org/contact-us,
   * used until the tech hiring inbox and phone exist. Placeholder: preview only.
   */
  contact: {
    placeholder: "Parent company's details for now" as string | undefined,
    email: "contact@trcconsulting.org" as string | null,
    phone: "+91 88828 28822" as string | null,
    phoneHref: "tel:+918882828822",
    address:
      "Enkay Square, Plot No. 448A, 6th Floor, Udyog Vihar Phase V, Sector 19, Gurugram, Haryana 122016" as string | null,
    offices: [
      {
        region: "India",
        cities: ["Gurugram", "Noida", "Ahmedabad", "Mumbai", "Pune", "Kolkata", "Hyderabad", "Bengaluru", "Chennai"],
      },
      { region: "UAE", cities: ["Dubai", "Abu Dhabi"] },
    ],
  },

  social: {
    linkedin: null as string | null,
  },

  cta: {
    hire: { label: "Hire tech talent", href: "/hire-talent/" },
    apply: { label: "Apply as a candidate", href: "/submit-your-profile/" },
  },

  nav: [
    { label: "Why us", href: "/why-us/" },
    { label: "Team", href: "/team/" },
    { label: "Contact", href: "/contact/" },
  ],

  legal: [
    { label: "Privacy policy", href: "/privacy-policy/" },
    { label: "Terms of use", href: "/terms/" },
  ],
};

/** The four practices, in sitemap order. Roles are taken from section 5 of the brief. */
export const pillars: Pillar[] = [
  {
    slug: "technology-hiring",
    href: "/technology-hiring/",
    title: "Technology Hiring",
    short: "Technology",
    summary: "Software, cloud, quality and security engineers, from mid-level to lead.",
    roles: [
      "Software Engineering",
      "Frontend / Backend / Full Stack",
      "Mobile",
      "QA & Automation",
      "Cloud / DevOps",
      "Cybersecurity",
    ],
  },
  {
    slug: "product-hiring",
    href: "/product-hiring/",
    title: "Product Hiring",
    short: "Product",
    summary: "Product managers, owners, analysts and designers who decide what gets built.",
    roles: [
      "Product Management",
      "Product Owners",
      "Business Analysts",
      "Product Analysts",
      "UX / UI & Product Design",
    ],
  },
  {
    slug: "ai-data-hiring",
    href: "/ai-data-hiring/",
    title: "AI & Data Hiring",
    short: "AI & Data",
    summary: "Data engineers, analysts and scientists, and the people building with machine learning and LLMs.",
    roles: ["Data Engineering", "Data Analytics", "AI / ML", "Data Science", "GenAI / LLM Engineering"],
  },
  {
    slug: "leadership-hiring",
    href: "/leadership-hiring/",
    title: "Leadership Hiring",
    short: "Leadership",
    summary: "The people who run engineering and product teams, up to CTO and CPO.",
    roles: ["Engineering Managers", "Head of Engineering", "Technology Directors", "CTO / CPO"],
  },
];

export const roleCount = pillars.reduce((n, p) => n + p.roles.length, 0);

/** Every page in the agreed sitemap that is not built yet. Rendered as a clearly marked placeholder. */
export const plannedPages: { slug: string; title: string; purpose: string }[] = [
  { slug: "what-we-do", title: "What we do", purpose: "The hub page that routes to the four practices." },
  ...pillars.map((p) => ({ slug: p.slug, title: p.title, purpose: `The ${p.short.toLowerCase()} practice: roles, the companies we hire for, and how we work.` })),
  { slug: "why-us", title: "Why us", purpose: "The proof page: process, the candidate pool once verified, and TRC credentials." },
  { slug: "hire-talent", title: "Hire tech talent", purpose: "The company enquiry form, specified in Project docs under Forms." },
  { slug: "submit-your-profile", title: "Submit your profile", purpose: "The two-step candidate form, specified in Project docs under Forms." },
  { slug: "team", title: "Team", purpose: "The people behind the practice. Names, roles and photos to come from TRC." },
  { slug: "contact", title: "Contact", purpose: "The tech hiring email, phone and office locations, once TRC confirms them." },
  { slug: "privacy-policy", title: "Privacy policy", purpose: "Written and approved by TRC's legal team. Required before either form goes live." },
  { slug: "terms", title: "Terms of use", purpose: "Written and approved by TRC's legal team." },
  { slug: "thank-you", title: "Thank you", purpose: "Shown after a form is submitted, and where conversions are recorded." },
  { slug: "insights", title: "Insights", purpose: "Articles for companies and candidates. Phase 2 in the sitemap." },
  { slug: "case-studies", title: "Success stories", purpose: "Case studies and client stories, each with the client's permission. Phase 2 in the sitemap." },
];
