/**
 * Homepage copy and data. Changing words here never touches layout code.
 *
 * `draft` marks content that needs facts, commitments or approval from TRC.
 * Copy without it is proposed wording.
 */

export type Draftable = { draft?: string };

/**
 * The three headline drafts from the homepage plan, each split into a lead and
 * a muted tail for the two-tone heading style. TRC picks one; the first is the
 * default, and the one search engines and the share image use.
 */
export type Headline = { lead: string; tail: string };
const titleOptions: Headline[] = [
  { lead: "Permanent tech and product hiring,", tail: "from experienced engineers to CTOs." },
  { lead: "Hire the engineers, product leaders", tail: "and AI specialists your roadmap needs." },
  { lead: "Technology and product talent", tail: "for product and IT companies." },
];

/** A slide's call to action. `track` reports clicks to analytics, as on the other calls to action. */
export type HeroAction = { label: string; href: string; track?: "hire_cta_click" | "apply_cta_click" };

/**
 * A slide's background photo. The review build uses free Unsplash stock photos
 * with a `placeholder` note, so they render in preview only; with preview off
 * the hero is plain brand teal until TRC supplies its own photos.
 */
export type HeroPhoto = { src: string; credit: { name: string; url: string }; placeholder?: string };

const heroStock = (file: string, name: string, slug: string): HeroPhoto => ({
  src: `/placeholders/hero/${file}.jpg`,
  credit: { name, url: `https://unsplash.com/photos/${slug}` },
  placeholder: "Unsplash stock photo, preview only",
});

/**
 * The hero's slides, in order. The first takes the chosen headline draft. Every
 * fact here is already on the site: the form promise from the Forms doc, and
 * 1999 and 400+ as published at trcconsulting.org.
 */
export type HeroSlide = {
  key: "companies" | "candidates" | "backing";
  /** Label on the card's tag. */
  tab: string;
  /** First slide only: the pill above the headline. */
  eyebrow?: string;
  title?: Headline;
  body: string;
  primary: HeroAction;
  /** First slide only: the second button beside the headline. */
  secondary?: HeroAction;
  /** Shown behind the whole hero while this slide's card is at the front. */
  photo?: HeroPhoto;
};

const hireAction: HeroAction = { label: "Hire tech talent", href: "/hire-talent/", track: "hire_cta_click" };
const applyAction: HeroAction = { label: "Apply as a candidate", href: "/submit-your-profile/", track: "apply_cta_click" };

export const heroSlides: HeroSlide[] = [
  {
    key: "companies",
    tab: "For companies",
    eyebrow: "Permanent hiring for product and IT companies",
    body: "We find permanent technology, product, data and AI talent, and the leaders who run those teams.",
    primary: hireAction,
    secondary: applyAction,
    photo: heroStock("hero-01", "TECNIC Bioprocess Solutions", "office-workers-are-busy-working-on-computers-R4a4zrZ8KfQ"),
  },
  {
    key: "candidates",
    tab: "For candidates",
    title: { lead: "Your next role,", tail: "in tech, product or data." },
    body: "Nine fields and your resume. We contact you when a role matches your experience, location and preferences.",
    primary: applyAction,
    photo: heroStock("hero-02", "Christian Velitchkov", "man-in-black-long-sleeve-shirt-using-macbook-mXz64B8-3h0"),
  },
  {
    key: "backing",
    tab: "Since 1999",
    title: { lead: "Specialist hiring,", tail: "backed by a firm founded in 1999." },
    body: "The tech practice is part of TRC Corporate Consulting, which lists 400+ clients on its website.",
    primary: { label: "Why TRC", href: "/why-us/" },
    photo: heroStock("hero-03", "Campaign Creators", "man-standing-in-front-of-people-sitting-beside-table-with-laptop-computers-gMsnXqILjp4"),
  },
];

export const hero = {
  title: `${titleOptions[0].lead} ${titleOptions[0].tail}`,
  titleOptions,
  body: "We find permanent technology, product, data and AI talent, and the leaders who run those teams, for product and IT companies.",
  trust: "A TRC Corporate Consulting company",
};

/**
 * Proof strip. Only verified figures. The first two are published by the
 * parent company at trcconsulting.org; the last two count the practice's
 * own scope from the brief. The 5,000+ candidate pool stays out until TRC
 * confirms it is a separate count from the parent's 5,000+ projects.
 */
export const proof = [
  { figure: "27+", label: "Years in consulting", source: "Published at trcconsulting.org" },
  { figure: "400+", label: "Clients", source: "Published at trcconsulting.org" },
  { figure: "4", label: "Hiring practices", source: "Technology, product, AI and data, leadership" },
  { figure: "20", label: "Role specialisms", source: "From experienced engineers to CTO and CPO" },
];

export const whatWeDo = {
  eyebrow: "What we do",
  title: "Four practices,",
  titleTail: "one team.",
  intro: "Each practice has its own page with the roles we fill, the companies we hire for and how we work.",
};

export const domains = {
  eyebrow: "Who we hire for",
  title: "Built for product",
  titleTail: "and IT companies.",
  intro: "The six kinds of organisation this practice is set up to serve.",
  /** Clockwise around the hiring map, from the top. `short` is the label on the map. */
  items: [
    { icon: "product", short: "Product & SaaS", title: "Product & SaaS", body: "Companies whose software is the product, from first release to scale." },
    { icon: "fintech", short: "FinTech / BFSI", title: "FinTech / BFSI technology", body: "Technology teams in banking, financial services, insurance and payments." },
    { icon: "startup", short: "Start-ups", title: "Start-ups & scale-ups", body: "Early teams hiring their first engineers and leaders, and growing teams hiring fast." },
    { icon: "midmarket", short: "Mid-market", title: "Mid-market", body: "Established companies building or strengthening an in-house tech team." },
    { icon: "services", short: "IT & ITeS", title: "IT / IT-enabled services", body: "Services and delivery organisations building capability for their clients." },
    { icon: "transformation", short: "Transformation", title: "Digital transformation programmes", body: "Organisations modernising their systems, who need people who have done it before." },
  ] as const,
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "Two tracks,",
  titleTail: "one outcome.",
  intro: "Companies and candidates each work with us their own way. Both tracks end in the same place.",
  draft: "Process steps to be confirmed by TRC",
  companies: {
    label: "For companies",
    steps: [
      { icon: "brief" as const, title: "Share the brief", body: "Tell us the role, the team and what good looks like. A job description helps but is optional." },
      { icon: "shortlist" as const, title: "Review a shortlist", body: "We send profiles matched to your brief, with our notes on each person." },
      { icon: "interview" as const, title: "Interview", body: "You meet the people you choose. We handle scheduling and collect feedback from both sides." },
    ],
    cta: "Start a hiring brief",
  },
  candidates: {
    label: "For candidates",
    steps: [
      { icon: "upload" as const, title: "Submit your profile", body: "Nine fields and your resume. You can add more detail afterwards if you want to." },
      { icon: "bell" as const, title: "Hear from a recruiter", body: "We contact you when a role matches your experience, location and preferences." },
      { icon: "interview" as const, title: "Interview", body: "We brief you before each conversation and pass on feedback afterwards." },
    ],
    cta: "Submit your profile",
  },
  meet: {
    title: "Offer and joining",
    body: "We stay with both sides through the offer and the notice period, until the joining date.",
  },
};

export const whyTrc = {
  eyebrow: "Why TRC",
  title: "A specialist practice,",
  titleTail: "with a consulting firm behind it.",
  intro: "One focus, technology and product hiring, inside a firm that has advised companies since 1999.",
  /** Three stacking cards. Every figure and level comes from the brief or trcconsulting.org. */
  points: [
    {
      tag: "Focus",
      title: "Technology and product roles only",
      body: "This practice hires across four disciplines and nothing else: technology, product, AI and data, and engineering leadership.",
    },
    {
      tag: "Level",
      title: "Permanent hiring, mid-level to CTO",
      body: "We place people into permanent roles, from experienced individual contributors to the leaders who run engineering and product.",
    },
    {
      tag: "Backing",
      title: "Part of TRC Corporate Consulting",
      body: "The tech practice is part of TRC Corporate Consulting, founded in 1999, which lists 400+ clients on its website.",
    },
  ],
  /** The levels named in the brief's role lists, lowest first. */
  ladder: ["Mid-level", "Lead", "Engineering Manager", "Head of Engineering", "Director", "CTO / CPO"],
  /** Both published at trcconsulting.org. */
  backing: [
    { value: "1999", label: "TRC Corporate Consulting founded" },
    { value: "400+", label: "Clients listed at trcconsulting.org" },
  ],
  /** Shown in preview only, until TRC confirms the figure. */
  pendingPoint: {
    title: "The candidate pool",
    body: "A figure for the active candidate pool goes here once TRC confirms it, with its source.",
  },
};

export type FaqItem = { q: string; a: string; placeholder?: string };

const DUMMY = "Dummy answer, TRC to confirm";

export const faq: {
  eyebrow: string;
  title: string;
  titleTail: string;
  intro: string;
  contact: { title: string; body: string; cta: string; href: string };
  groups: { label: string; items: FaqItem[] }[];
} = {
  eyebrow: "Questions",
  title: "What people ask us first,",
  titleTail: "and our answers.",
  intro: "For the companies we hire for, and for the people we place. Pick a topic.",
  contact: {
    title: "Still have questions?",
    body: "If your question is not here, get in touch and a recruiter will answer it.",
    cta: "Contact us",
    href: "/contact/",
  },
  groups: [
    {
      label: "For companies",
      items: [
        {
          q: "Which roles do you hire for?",
          a: "Permanent technology, product, data and AI roles, and the engineering and product leaders who run those teams, from mid-level to CTO and CPO.",
        },
        {
          q: "Do you handle contract or temporary hiring?",
          a: "No. This practice handles permanent roles only.",
        },
        {
          q: "How do your fees work?",
          a: "Fees are agreed with you before the search starts and depend on the role and the number of positions. A recruiter will take you through the terms on the first call.",
          placeholder: DUMMY,
        },
        {
          q: "Which locations do you hire for?",
          a: "Roles across India, including remote and hybrid positions. Tell us where the team sits and where you are open to hiring from.",
          placeholder: DUMMY,
        },
      ],
    },
    {
      label: "For candidates",
      items: [
        {
          q: "Do you charge candidates anything?",
          a: "No. Candidates never pay to work with us.",
          placeholder: DUMMY,
        },
        {
          q: "What happens after I submit my profile?",
          a: "A recruiter reviews it and contacts you when a role matches your experience, location and preferences. You will not hear from us about roles that do not fit.",
          placeholder: DUMMY,
        },
        {
          q: "Can I share my profile if I am not actively looking?",
          a: "Yes. Many people share their profile so we can contact them when the right role comes up.",
        },
        {
          q: "How is my data used?",
          a: "We use your details to match you with relevant roles and share your profile with a hiring company only after speaking to you. You can ask us to update or delete your details at any time.",
          placeholder: "Dummy answer, TRC legal to write the privacy policy",
        },
      ],
    },
  ],
};

/** The two doors. Each list follows its form in docs/05-forms.md; change them together. */
export const finalCta = {
  eyebrow: "Get started",
  title: "Start with a conversation,",
  titleTail: "whichever side you are on.",
  talk: "Prefer to talk first?",
  companies: {
    label: "For companies",
    title: "Hiring for your team?",
    body: "Send a short brief and a recruiter will follow up to talk it through.",
    pointsLabel: "We ask for",
    points: ["The roles and number of openings", "Location and hiring timeline", "A job description, if you have one"],
  },
  candidates: {
    label: "For candidates",
    title: "Looking for your next role?",
    body: "Nine fields and your resume. We contact you when a role fits.",
    pointsLabel: "You share",
    points: ["Experience, location and key skills", "Your resume, as a PDF or Word file", "Salary and notice period later, if you choose"],
  },
};

/** Phase 2 sections. Each renders only once its shown items meet the minimum in the homepage plan. */

/** `scale` enlarges a logo whose source file has a lot of empty space around the artwork. */
export type ClientLogo = { name: string; src: string; width: number; height: number; scale?: number; placeholder?: string };

const PARENT_CLIENT = "Parent company's client, from trcconsulting.org";

/**
 * Logos from the "Trusted by Leading Businesses" section of trcconsulting.org.
 * These are TRC Corporate Consulting's consulting clients, not tech-hiring
 * clients, so the section says so. Written permission is needed before launch.
 */
export const clientLogos = {
  label: "Clients of TRC Corporate Consulting",
  items: [
    { name: "Genpact", src: "/clients/genpact.webp", width: 369, height: 136, scale: 1.45 },
    { name: "EXL", src: "/clients/exl.webp", width: 368, height: 137 },
    { name: "Cyient", src: "/clients/cyient.png", width: 799, height: 178 },
    { name: "Paytm", src: "/clients/paytm.webp", width: 81, height: 26 },
    { name: "Flipkart", src: "/clients/flipkart.webp", width: 159, height: 42 },
    { name: "Myntra", src: "/clients/myntra.webp", width: 130, height: 41 },
    { name: "Delhivery", src: "/clients/delhivery.png", width: 1250, height: 240 },
    { name: "Walmart", src: "/clients/walmart.webp", width: 130, height: 42 },
    { name: "Muthoot FinCorp ONE", src: "/clients/muthoot-fincorp-one.webp", width: 200, height: 200 },
    { name: "Licious", src: "/clients/licious.webp", width: 357, height: 150 },
    { name: "Mamaearth", src: "/clients/mamaearth.png", width: 280, height: 42 },
    { name: "Air India Express", src: "/clients/air-india-express.webp", width: 492, height: 150 },
  ].map((logo): ClientLogo => ({ ...logo, placeholder: PARENT_CLIENT })),
};

export type Testimonial = {
  quote: string;
  role: string;
  company: string;
  audience: "Company" | "Candidate";
  /** Stars, 1 to 5. Show only a rating the client actually gave. */
  rating?: number;
  /** A real client's photo, with consent. Never a stock face beside a quote. */
  photo?: string;
  placeholder?: string;
};

/**
 * Dummy quotes to show the layout. Deliberately credited to a role and a kind
 * of company, never to an invented person, so nothing reads as a real review.
 */
/**
 * The portrait wall above the testimonials. Nine staggered columns; `offset`
 * is the drop in px at desktop size, `from` is the breakpoint a column
 * appears at.
 *
 * Photos are free Unsplash stock images, used as placeholders at the
 * agency's request. They carry a `placeholder` note, so they render in
 * preview only: stock faces must never go live under a "trusted by" heading,
 * and Unsplash's licence does not cover implied endorsement. With preview
 * off, each card falls back to a silhouette and its role until TRC supplies a
 * real client photo, with consent, without the note.
 */
export type WallCard = {
  role: string;
  tone: "neutral" | "brand" | "accent";
  photo?: string;
  credit?: { name: string; url: string };
  placeholder?: string;
};
export type WallColumn = { offset: number; from: "base" | "md" | "lg"; cards: WallCard[] };

const STOCK = "Unsplash stock photo, preview only";
const unsplash = (file: string, name: string, slug: string): Pick<WallCard, "photo" | "credit" | "placeholder"> => ({
  photo: `/placeholders/people/portrait-${file.slice(1)}.jpg`,
  credit: { name, url: `https://unsplash.com/photos/${slug}` },
  placeholder: STOCK,
});

const wall: WallColumn[] = [
  {
    offset: 76,
    from: "base",
    cards: [
      { role: "CTO", tone: "neutral", ...unsplash("p05", "Abhishek Rai", "a-man-with-black-hair-and-a-beard-smiling-eucPfcmTQig") },
      { role: "Data Engineer", tone: "brand", ...unsplash("p02", "IMANA", "a-young-woman-with-dark-wavy-hair-smiles-brightly-smiling-HVbaH3p9B8k") },
    ],
  },
  {
    offset: 0,
    from: "base",
    cards: [
      { role: "Head of Engineering", tone: "brand", ...unsplash("p03", "Kamal Dharma Teja Dasari", "a-smiling-man-wearing-glasses-and-a-suit-jacket-zXR0fNWHDDQ") },
      { role: "Product Manager", tone: "neutral", ...unsplash("p04", "Christina @ wocintechchat.com", "woman-on-focus-photography-SJvDxw0azqw") },
    ],
  },
  {
    offset: 92,
    from: "md",
    cards: [{ role: "Backend Engineer", tone: "neutral", ...unsplash("p07", "Vincenzo De Simone", "young-man-in-glasses-wearing-a-black-shirt-indoors-BjnXKceifJA") }],
  },
  {
    offset: 10,
    from: "lg",
    cards: [{ role: "Engineering Manager", tone: "accent", ...unsplash("p06", "Skytech Aviation", "a-woman-in-a-white-blazer-and-black-pants-smiles-hODuXSsWzjQ") }],
  },
  {
    offset: 58,
    from: "base",
    cards: [{ role: "Technology Director", tone: "neutral", ...unsplash("p09", "Skytech Aviation", "a-smiling-man-in-a-suit-stands-in-an-office-P3i8MtIT1ug") }],
  },
  {
    offset: 6,
    from: "lg",
    cards: [{ role: "UX Designer", tone: "brand", ...unsplash("p10", "Christina @ wocintechchat.com", "woman-sitting-next-to-window-Zpzf7TLj_gA") }],
  },
  {
    offset: 92,
    from: "md",
    cards: [{ role: "AI / ML Engineer", tone: "neutral", ...unsplash("p01", "Sairaj Gandhe", "a-young-man-in-a-blue-shirt-with-crossed-arms-H43Gn5Nx5xM") }],
  },
  {
    offset: 0,
    from: "base",
    cards: [
      { role: "Founder", tone: "neutral", ...unsplash("p12", "PodMatch", "woman-in-black-blazer-smiling-2mMhaoBGjCs") },
      { role: "DevOps Engineer", tone: "brand", ...unsplash("p11", "Diego Suarez", "smiling-man-in-white-shirt-with-arms-crossed-VkdH0Eemwqs") },
    ],
  },
  {
    offset: 76,
    from: "base",
    cards: [
      { role: "Product Owner", tone: "accent", ...unsplash("p08", "Paul White", "woman-in-black-blazer-sitting-by-the-table-with-macbook-sLpRv294Uzo") },
      { role: "QA Engineer", tone: "neutral", ...unsplash("p13", "Jurica Koletić", "man-wearing-henley-top-portrait-7YVZYZeITc8") },
    ],
  },
];

export const testimonials = {
  eyebrow: "Testimonials",
  title: "Trusted by teams that build,",
  titleTail: "and the people who join them.",
  intro: "Hiring managers and candidates on what working with TRC is like.",
  wall,
  items: [
    {
      audience: "Company",
      quote:
        "They took the time to understand what our platform team actually needed, and the shortlist showed it. Every profile was someone we wanted to meet.",
      role: "Head of Engineering",
      company: "Series B SaaS company",
    },
    {
      audience: "Company",
      quote:
        "A head of engineering who fitted our stage was the hire we worried about most. The process was thorough, and we were kept informed at every step.",
      role: "Founder and CEO",
      company: "Fintech start-up",
    },
    {
      audience: "Candidate",
      quote:
        "I was not actively looking. The recruiter called with a role that matched what I had said I wanted, and prepared me properly for each round.",
      role: "Senior Data Engineer",
      company: "Placed in a product company",
    },
  ].map((t): Testimonial => ({ ...(t as Testimonial), rating: 5, placeholder: "Placeholder quote" })),
};

export type Insight = {
  title: string;
  excerpt: string;
  audience: "For companies" | "For candidates";
  date: string;
  readMinutes: number;
  href: string;
  /** The article's own image, when it has one. */
  image?: string;
  placeholder?: string;
};

/** Dummy articles to show the layout. They link to the planned Insights page. */
export const insights = {
  eyebrow: "Latest insights",
  title: "Notes from the hiring desk,",
  titleTail: "for companies and candidates.",
  items: [
    {
      title: "What to put in a brief for a senior backend hire",
      excerpt: "The five things that decide whether a shortlist lands: scope, stack, team, stage and the problem the hire will own.",
      audience: "For companies",
      date: "2026-10-14",
      readMinutes: 5,
      href: "/insights/",
    },
    {
      title: "How notice periods shape a realistic hiring timeline",
      excerpt: "With 30, 60 and 90-day notice periods common in India, the offer date is rarely the start date. How to plan around it.",
      audience: "For companies",
      date: "2026-10-07",
      readMinutes: 4,
      href: "/insights/",
    },
    {
      title: "Preparing for a product manager interview loop",
      excerpt: "What each round is really testing, from the product sense case to the stakeholder conversation.",
      audience: "For candidates",
      date: "2026-09-30",
      readMinutes: 6,
      href: "/insights/",
    },
    {
      title: "What a CTO search really involves",
      excerpt: "Mapping the market, assessing leadership, and why the shortlist is the easy part.",
      audience: "For companies",
      date: "2026-09-23",
      readMinutes: 7,
      href: "/insights/",
    },
    {
      title: "Hiring your first GenAI engineer",
      excerpt: "Which skills matter for shipping a product, and which job titles mean very little yet.",
      audience: "For companies",
      date: "2026-09-16",
      readMinutes: 5,
      href: "/insights/",
    },
    {
      title: "A resume that survives the first screen",
      excerpt: "Impact over duties, numbers you can stand behind, and one page that says what you built.",
      audience: "For candidates",
      date: "2026-09-09",
      readMinutes: 4,
      href: "/insights/",
    },
  ].map((i): Insight => ({ ...(i as Insight), placeholder: "Placeholder article" })),
};
