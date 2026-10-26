# Sitemap

The recommended site structure. "TRC Tech Hiring" is a placeholder until the brand name is chosen.

## Navigation

The header carries the audience split on every page.

- **Left:** logo, linking home
- **Centre:** What we do (dropdown with the four practices), Why us, Team, Contact. Insights is added in phase 2.
- **Right:** "Apply as a candidate" (outline button) and "Hire tech talent" (solid green button)

Both buttons stay in the header on every page.

## Phase 1 pages

| # | Page | URL | Purpose |
|---|---|---|---|
| 1 | Home | `/` | Positioning, the two doors, practices, proof |
| 2 | What We Do | `/what-we-do/` | Hub page that routes to the four practices |
| 3 | Technology Hiring | `/technology-hiring/` | Pillar page |
| 4 | Product Hiring | `/product-hiring/` | Pillar page |
| 5 | AI & Data Hiring | `/ai-data-hiring/` | Pillar page |
| 6 | Leadership Hiring | `/leadership-hiring/` | Pillar page |
| 7 | Why Us | `/why-us/` | Proof: process, pool, parent credentials |
| 8 | Hire Talent | `/hire-talent/` | Company enquiry form |
| 9 | Submit Your Profile | `/submit-your-profile/` | Candidate form |
| 10 | Team | `/team/` | People and parent credentials |
| 11 | Contact | `/contact/` | Email, phone, office locations |
| 12 | Privacy Policy | `/privacy-policy/` | Required; missing from the brief |
| 13 | Thank You | `/thank-you/` | After submission; makes conversions measurable |
| 14 | Terms of Use | `/terms/` | Written by TRC's legal team; linked from the footer |

The brief had 8 pages. The four pillar pages are the change that matters.

Until each page is designed, the build renders it as a clearly marked "Planned page" with its purpose, so the homepage can be reviewed with every link working.

## What a pillar page is

A pillar page is an ordinary content page: a sales page for one practice. It is **not** a listing page.

| | Listing page | Pillar page |
|---|---|---|
| Content source | A database | Written into the page |
| Changes how | Automatically as records change | Someone edits it |
| Needs | Backend, admin panel, filters | One page template |
| Example | Bayt's job search | "Technology Hiring" |

The list of roles on a pillar page is written text, not database records. Nobody clicks a role to see openings. In phase 2 each role becomes a link to its own page.

"Pillar" means the main page for a topic, with smaller pages linking up to it:

```
Technology Hiring          the pillar
   ├── Backend Engineers   supporting pages, phase 2
   ├── Mobile Developers
   ├── DevOps & Cloud
   └── Cybersecurity
```

All four pillars use one template, built once and filled with different copy four times.

## Pillar page template

- H1 naming the practice
- Short intro: who this is for
- Roles covered, from the brief
- Who we hire for: the six domains
- How we work for this practice
- Reserved: a case study slot
- Call to action: "Hire tech talent", plus an inline short enquiry

| Pillar | Roles |
|---|---|
| Technology | Software Engineering, Frontend, Backend, Full Stack, Mobile, QA & Automation, Cloud/DevOps, Cybersecurity |
| Product | Product Management, Product Owners, Business Analysts, Product Analysts, UX/UI & Product Design |
| AI & Data | Data Engineering, Data Analytics, AI/ML, Data Science, GenAI/LLM Engineering |
| Leadership | Engineering Managers, Head of Engineering, Technology Directors, CTO/CPO |

## Phase 2

Reserved in the structure now, built later.

| Section | URL pattern | Notes |
|---|---|---|
| Role pages | `/leadership-hiring/cto/` | One page per job title. Start with 6 to 8 leadership and AI roles. |
| Insights | `/insights/` | The CMS must support this from day one |
| Industries | `/industries/` | From the six domains |
| Case studies | `/case-studies/` | Needs client permission |
| Clients and testimonials | On Home and Why Us | Content dependency |

## Not in scope

- **No jobs board.** 8 of 11 competitors do not run one.
- **No candidate logins or profiles.** That is the job portal model and a different project.

## Blocking the build

1. **Brand name.** Blocks logo, palette changes, domain and every page title.
2. **Domain.** New domain or a section of trcconsulting.org. Decide before any URL above is final.
3. **The 5,000 pool.** Blocks the numbers strip and the Why Us page.
4. **Form destination.** The shared inbox does not exist yet, and email alone will not hold.
5. **Privacy policy wording.** TRC's legal team.
6. **Content owner.** Four pillar pages, Why Us and Team all need copy.
