import type { Metadata } from "next";
import Image from "next/image";
import {
  Bracket,
  Button,
  DualPathBand,
  FileInput,
  FormField,
  Input,
  PillarCard,
  SectionHeader,
  Select,
  StatTile,
  StaticTag,
  Textarea,
} from "@/components/ui";
import { Section, Subhead } from "@/components/showcase/Section";
import { SkillsDemo } from "@/components/showcase/SkillsDemo";
import { Swatch } from "@/components/showcase/Swatch";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";
import { finalCta } from "@/content/home";
import { colorGroups, radiusScale, spacingScale, typeGroups } from "@/lib/tokens";

function Cover() {
  const brackets = [528, 576, 624].flatMap((x) =>
    [56, 104, 152].map((y) => `M${x} ${y} h24 v24`),
  );
  const greenBrackets = [840, 888].flatMap((x) =>
    [180, 228].map((y) => `M${x} ${y} h24 v24`),
  );

  return (
    <svg
      viewBox="0 0 960 300"
      className="block h-auto w-full"
      role="img"
      aria-label="TRC Tech Hiring design system cover"
    >
      <rect x="0" y="0" width="960" height="300" className="fill-surface-100" />
      <rect x="504" y="32" width="168" height="236" rx="8" className="fill-ink-900" />
      <rect x="688" y="32" width="112" height="110" rx="8" className="fill-accent-700" />
      <rect x="688" y="158" width="112" height="110" rx="8" className="fill-line-200" />
      <rect x="816" y="32" width="160" height="236" rx="8" className="fill-surface-accent" />
      <g fill="none" strokeWidth="8" className="stroke-surface-accent">
        {brackets.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="none" strokeWidth="8" className="stroke-surface-brand">
        {greenBrackets.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <text x="56" y="163" className="fill-ink-900 text-[88px] font-semibold tracking-[-0.02em]">
        TRC Tech
      </text>
      <text x="56" y="244" className="fill-ink-900 text-[88px] font-semibold tracking-[-0.02em]">
        Hiring
      </text>
      <text x="56" y="276" className="fill-ink-500 text-[14px] max-sm:hidden">
        Technology and product hiring for TRC Corporate Consulting.
      </text>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Tokens, typography and components for the TRC Tech Hiring website. Colours sampled from the TRC Corporate Consulting mark.",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-dvh bg-surface-canvas">
      <ShowcaseHeader />

      <main className="mx-auto max-w-[1200px] px-4 pb-24">
        <div className="pt-8">
          <Cover />
        </div>

        <div className="mt-8 rounded-lg border border-line-100 bg-surface-200 p-6">
          <p className="m-0 max-w-[720px] text-body text-ink-700">
            Built from the TRC Corporate Consulting mark. The two brand colours were read from the
            pixels of <span className="font-mono text-body-sm">TRC-logo.png</span>, not matched by
            eye. The vertical&rsquo;s own name and logo are still open, so this system is wired to be
            re-pointed: change four token values and the font family, and everything below follows.
          </p>
          <p className="m-0 mt-4 max-w-[720px] text-body-sm text-ink-500">
            Next.js 16, React 19, Tailwind v4. Tokens flip by theme at the CSS variable level, so a
            single class such as <span className="font-mono">bg-surface-100</span> is correct in both
            themes and no <span className="font-mono">dark:</span> prefix appears in the markup.
          </p>
          <p className="m-0 mt-4 max-w-[720px] text-body-sm text-ink-700">
            The brief, research, sitemap, homepage plan, decisions and open questions are in{" "}
            <a href="/docs" className="text-accent-700 underline underline-offset-2">
              Project docs
            </a>
            .
          </p>
        </div>

        <Section
          id="logo"
          eyebrow="Logo"
          title="Two versions, two grounds"
          intro="Placeholders from the parent company. Both are raster PNG at roughly 131 by 76, sharp at header size and nowhere else. Request vector originals before build."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-md border border-line-100 p-6">
              <div className="flex min-h-28 items-center justify-center rounded-md bg-white p-6">
                <Image src="/trc-logo.png" alt="TRC Corporate Consulting" width={131} height={76} />
              </div>
              <p className="m-0 font-mono text-body-sm text-ink-900">trc-logo.png</p>
              <p className="m-0 text-caption text-ink-700">
                Positive. On surface-100 and surface-200.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-md border border-line-100 p-6">
              <div className="flex min-h-28 items-center justify-center rounded-md bg-surface-brand p-6">
                <Image
                  src="/trc-logo-footer.png"
                  alt="TRC Corporate Consulting, reversed"
                  width={130}
                  height={76}
                />
              </div>
              <p className="m-0 font-mono text-body-sm text-ink-900">trc-logo-footer.png</p>
              <p className="m-0 text-caption text-ink-700">
                Reversed. On surface-brand and photography.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-[720px] text-body-sm text-ink-700">
            Never recolour, rotate, crop or redraw the mark, and never set the wordmark in live type.
            Clear space on all four sides is 24px.
          </p>
        </Section>

        <Section
          id="colour"
          eyebrow="Colour"
          title={`${colorGroups.reduce((n, g) => n + g.tokens.length, 0)} tokens, two themes`}
          intro="Each swatch shows its light and dark value. Contrast figures in the notes are measured, not estimated."
        >
          <div className="flex flex-col gap-10">
            {colorGroups.map((group) => (
              <div key={group.title}>
                <Subhead title={group.title} note={group.note} />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.tokens.map((token) => (
                    <Swatch key={token.name} token={token} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-md border-2 border-danger-600 p-6">
            <p className="m-0 text-heading-sm text-ink-900">One hard rule</p>
            <p className="m-0 mt-2 max-w-[720px] text-body text-ink-700">
              White text on the brand green measures 2.3:1 and fails at every size. Green fills always
              carry <span className="font-mono text-body-sm">ink-on-accent</span> text, which measures
              5.7:1. Where green is needed as text on a light ground, use{" "}
              <span className="font-mono text-body-sm">accent-700</span>.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="rounded-full bg-surface-accent px-5 py-3 text-btn-label text-ink-on-accent">
                Correct, 5.7:1
              </div>
              <div className="rounded-full bg-surface-accent px-5 py-3 text-btn-label text-white line-through decoration-2">
                Never, 2.3:1
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="typography"
          eyebrow="Typography"
          title="Readex Pro, one family"
          intro="The face TRC already uses, self-hosted through next/font so there is no third-party request and no layout shift."
        >
          <div className="flex flex-col gap-10">
            {typeGroups.map((group) => (
              <div key={group.title}>
                <Subhead title={group.title} />
                <div className="flex flex-col divide-y divide-line-100 border-y border-line-100">
                  {group.styles.map((style) => (
                    <div
                      key={style.name}
                      className="grid gap-3 py-5 lg:grid-cols-[220px_1fr] lg:gap-8"
                    >
                      <div className="flex flex-col gap-1">
                        <p className="m-0 font-mono text-body-sm text-ink-900">{style.name}</p>
                        <p className="m-0 font-mono text-caption text-ink-500">
                          {style.size} / {style.lineHeight} / {style.weight}
                        </p>
                        <p className="m-0 text-caption text-ink-700">{style.usage}</p>
                      </div>
                      <p className={`m-0 min-w-0 text-ink-900 ${style.className}`}>{style.sample}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="spacing"
          eyebrow="Spacing"
          title="A 4px step, mapped to Tailwind"
          intro="The system names ten steps. They all exist in Tailwind's native scale already, so use the Tailwind number and read this table when the design file says space-5."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-200">
                  <th className="py-3 pe-4 text-field-label text-ink-900">Token</th>
                  <th className="py-3 pe-4 text-field-label text-ink-900">Value</th>
                  <th className="py-3 pe-4 text-field-label text-ink-900">Tailwind</th>
                  <th className="py-3 pe-4 text-field-label text-ink-900">Used for</th>
                  <th className="py-3 text-field-label text-ink-900">Scale</th>
                </tr>
              </thead>
              <tbody>
                {spacingScale.map((step) => (
                  <tr key={step.name} className="border-b border-line-100">
                    <td className="py-3 pe-4 font-mono text-body-sm text-ink-900">{step.name}</td>
                    <td className="py-3 pe-4 font-mono text-body-sm tabular-nums text-ink-700">
                      {step.px}px
                    </td>
                    <td className="py-3 pe-4 font-mono text-body-sm text-accent-700">
                      p-{step.tw} / gap-{step.tw}
                    </td>
                    <td className="py-3 pe-4 text-body-sm text-ink-700">{step.usage}</td>
                    <td className="py-3">
                      <span
                        className="block h-3 rounded-sm bg-surface-accent"
                        style={{ width: `${step.px}px` }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="shape"
          eyebrow="Shape"
          title="Square corners, borders over shadow"
          intro="The mark is built from right angles, so radii stay tight and a border does the work a shadow would do elsewhere."
        >
          <Subhead title="Radius" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {radiusScale.map((r) => (
              <div key={r.name} className="flex gap-4 rounded-md border border-line-100 p-4">
                <div
                  className="size-14 shrink-0 bg-surface-300"
                  style={{ borderRadius: r.value }}
                  aria-hidden="true"
                />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="m-0 font-mono text-body-sm text-ink-900">{r.name}</p>
                  <p className="m-0 font-mono text-caption text-accent-700">{r.tw}</p>
                  <p className="m-0 text-caption text-ink-700">{r.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Subhead
              title="Shadow"
              note="Only on a card that is itself a link, the sticky header after scroll, and dropdowns."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-surface-100 p-6 shadow-sm">
                <p className="m-0 font-mono text-body-sm text-ink-900">shadow-sm</p>
                <p className="m-0 mt-1 text-caption text-ink-700">Resting state of a linked card.</p>
              </div>
              <div className="rounded-md bg-surface-100 p-6 shadow-md">
                <p className="m-0 font-mono text-body-sm text-ink-900">shadow-md</p>
                <p className="m-0 mt-1 text-caption text-ink-700">Hover, sticky header, dropdowns.</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Subhead
              title="The bracket motif"
              note="The one piece of ornament the system allows. One per section, never rotated, never filled."
            />
            <div className="flex flex-wrap items-end gap-8 rounded-md border border-line-100 p-8">
              <div className="flex flex-col items-start gap-2">
                <Bracket size="lg" />
                <p className="m-0 font-mono text-caption text-ink-500">lg · section opener</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Bracket />
                <p className="m-0 font-mono text-caption text-ink-500">md · eyebrow</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Bracket size="sm" />
                <p className="m-0 font-mono text-caption text-ink-500">sm · list bullet</p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="components"
          eyebrow="Components"
          title="Eight components, built for the sitemap"
          intro="Every one of these exists because a page in the agreed sitemap needs it. Nothing here is speculative."
        >
          <div className="flex flex-col gap-12">
            <div>
              <Subhead
                title="Button"
                note="Three ranks, used once each per view. Labels are sentence case and name the action."
              />
              <div className="flex flex-col gap-4 rounded-md border border-line-100 p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Button href="#components" size="lg">
                    Hire tech talent
                  </Button>
                  <Button href="#components" variant="secondary" size="lg">
                    Apply as a candidate
                  </Button>
                  <Button variant="brand">Book a call</Button>
                  <Button size="sm">Add role</Button>
                  <Button disabled>Submitting</Button>
                </div>
                <div className="flex flex-wrap gap-4 rounded-md bg-surface-brand p-6">
                  <Button href="#components">Hire tech talent</Button>
                  <Button href="#components" variant="onBrand">
                    Apply as a candidate
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Subhead
                title="Tag"
                note="The skills multi-select on the candidate form, and the static roles list on a pillar page. Selection fills, so it never rests on the border alone."
              />
              <div className="flex flex-col gap-6 rounded-md border border-line-100 p-6">
                <div>
                  <p className="m-0 mb-3 text-caption text-ink-500">
                    Interactive: click to select
                  </p>
                  <SkillsDemo />
                </div>
                <div>
                  <p className="m-0 mb-3 text-caption text-ink-500">Static</p>
                  <div className="flex flex-wrap gap-2">
                    <StaticTag>Data Engineering</StaticTag>
                    <StaticTag>AI / ML</StaticTag>
                    <StaticTag>GenAI / LLM</StaticTag>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Subhead
                title="FormField"
                note="Both forms on the site are built from this. Label above the control, help or error below, nine fields maximum on the public candidate step."
              />
              <div className="rounded-md border border-line-100 p-6">
                <p className="m-0 mb-6 text-caption text-ink-500">
                  Fields marked * are required.
                </p>
                <div className="flex max-w-[420px] flex-col gap-6">
                  <FormField id="f-name" label="Full name" required>
                    <Input id="f-name" name="name" defaultValue="Ananya Krishnan" />
                  </FormField>
                  <FormField
                    id="f-email"
                    label="Email address"
                    required
                    error="enter a complete email address."
                  >
                    <Input
                      id="f-email"
                      name="email"
                      type="email"
                      defaultValue="ananya@"
                      invalid
                      aria-describedby="f-email-error"
                    />
                  </FormField>
                  <FormField id="f-notice" label="Notice period" required>
                    <Select id="f-notice" name="notice" defaultValue="30 days">
                      <option>Immediate</option>
                      <option>15 days</option>
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                    </Select>
                  </FormField>
                  <FormField
                    id="f-ctc"
                    label="Expected CTC (LPA)"
                    required
                    help="Annual figure in lakhs. A range is fine."
                  >
                    <Input
                      id="f-ctc"
                      name="ctc"
                      type="number"
                      inputMode="decimal"
                      placeholder="42"
                      aria-describedby="f-ctc-help"
                    />
                  </FormField>
                  <FormField
                    id="f-note"
                    label="Brief note about your experience"
                    help="About 500 characters."
                  >
                    <Textarea id="f-note" name="note" aria-describedby="f-note-help" />
                  </FormField>
                  <FormField id="f-cv" label="Resume" required help="PDF or Word, up to 5 MB.">
                    <FileInput id="f-cv" name="resume" accept=".pdf,.doc,.docx" />
                  </FormField>
                </div>
              </div>
            </div>

            <div>
              <Subhead
                title="PillarCard"
                note="The four-pillar grid on the home page. The roles list is bulleted with the bracket at list scale."
              />
              <div className="grid gap-8 rounded-md border border-line-100 p-6 lg:grid-cols-3">
                <PillarCard
                  title="Technology Hiring"
                  href="#components"
                  body="Engineering teams for product and IT companies, from senior individual contributors upward."
                  roles={["Backend", "Mobile", "Cloud / DevOps", "Cybersecurity"]}
                />
                <PillarCard
                  title="AI & Data Hiring"
                  href="#components"
                  body="Data and AI teams for companies scaling past their first production model."
                  roles={["Data Engineering", "AI / ML", "GenAI / LLM"]}
                />
                <PillarCard
                  title="Leadership Hiring"
                  href="#components"
                  body="Engineering and product leadership, from engineering manager to CTO."
                  roles={["Head of Engineering", "CTO / CPO"]}
                />
              </div>
            </div>

            <div>
              <Subhead
                title="SectionHeader"
                note="Opens every section, on light grounds and on the brand panel. Titles are two-tone: the lead in full ink, the tail on its own line in a muted tone."
              />
              <div className="flex flex-col gap-6 rounded-md border border-line-100 p-6">
                <SectionHeader
                  eyebrow="What we do"
                  title="Four hiring practices,"
                  titleTail="one team."
                  intro="We cover technology, product, AI and leadership roles for product and IT companies."
                />
                <div className="rounded-lg bg-surface-brand p-10">
                  <SectionHeader
                    onBrand
                    eyebrow="Why us"
                    title="Built on"
                    titleTail="TRC's hiring practice."
                    intro="The tech vertical runs on the process TRC Corporate Consulting already uses."
                  />
                </div>
              </div>
            </div>

            <div>
              <Subhead
                title="StatTile"
                note="The source line is a required prop, not decoration. A figure with nothing behind it cannot ship."
              />
              <div className="flex flex-col gap-6 rounded-md border border-line-100 p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <StatTile
                    figure="5,000+"
                    label="Candidates in the active pool"
                    source="Placeholder: to be confirmed with TRC"
                  />
                  <StatTile figure="48 hrs" label="To first shortlist" source="Placeholder: example figure" />
                  <StatTile
                    figure="27+"
                    label="Years in consulting, parent company"
                    source="trcconsulting.org, October 2026"
                  />
                </div>
                <div className="rounded-lg bg-surface-brand p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <StatTile
                      onBrand
                      figure="5,000+"
                      label="Candidates in the active pool"
                      source="Placeholder: to be confirmed with TRC"
                    />
                    <StatTile
                      onBrand
                      figure="48 hrs"
                      label="To first shortlist"
                      source="Placeholder: example figure"
                    />
                  </div>
                </div>
                <p className="m-0 max-w-[720px] text-body-sm text-warning-600">
                  Note: 5,000+ and 48 hrs are placeholders. Only 27+ years is a published figure, and it
                  belongs to the parent company. Whether the 5,000 candidate pool exists today is still
                  an open question with TRC.
                </p>
              </div>
            </div>

            <div>
              <Subhead
                title="DualPathBand"
                note="The two doors, at the foot of every page that is not itself a form. Companies always first in source order. On wide screens the door under the pointer or keyboard focus opens wider; the copy has a fixed width, so nothing re-wraps."
              />
              <div className="rounded-md border border-line-100 p-6">
                <DualPathBand
                  companies={{ ...finalCta.companies, cta: "Hire tech talent", href: "#components" }}
                  candidates={{ ...finalCta.candidates, cta: "Apply as a candidate", href: "#components" }}
                />
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-line-100 pt-8">
          <p className="m-0 max-w-[720px] text-body-sm text-ink-500">
            Placeholders in this system: the vertical&rsquo;s name, the logo files, and every figure in
            the stat tiles. Everything else is built and ready to apply to the page designs.
          </p>
        </footer>
      </main>
    </div>
  );
}
