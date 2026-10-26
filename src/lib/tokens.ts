export type ColorToken = {
  name: string;
  light: string;
  dark: string;
  usage: string;
};

export type ColorGroup = { title: string; note: string; tokens: ColorToken[] };

export const colorGroups: ColorGroup[] = [
  {
    title: "Surfaces",
    note: "Page grounds and panel fills. surface-accent, the logo green, is the same in both themes; surface-brand is the wordmark teal in dark and a light brand mint in light, so the light theme has no dark fills.",
    tokens: [
      { name: "surface-canvas", light: "#f6f9f7", dark: "#04211f", usage: "Page background and plain sections. A soft green-grey in light, so white cards have depth." },
      { name: "surface-100", light: "#ffffff", dark: "#04211f", usage: "Raised surfaces: header, cards, inputs. Equals the page in dark." },
      { name: "surface-200", light: "#edf3f0", dark: "#0a2e2b", usage: "Alternating section bands and muted fills. White cards sit on it in light." },
      { name: "surface-300", light: "#e2eae6", dark: "#113a37", usage: "Input fills, table headers, disabled controls." },
      { name: "surface-raised", light: "#ffffff", dark: "#0a2e2b", usage: "A neutral card that must stand off the page. Pair with shadow-sm and a line-100 ring." },
      { name: "surface-brand", light: "#e0eee9", dark: "#053736", usage: "Hero, How it works band, footer, brand cards and buttons. A light brand mint in light (no dark fills); the wordmark teal in dark." },
      { name: "surface-brand-hover", light: "#ffffff", dark: "#0a4a48", usage: "A card sitting on a brand surface, and the brand button hover." },
      { name: "surface-accent", light: "#6ebe48", dark: "#6ebe48", usage: "Primary buttons and accent blocks. The logo bracket green." },
    ],
  },
  {
    title: "Ink",
    note: "Text colours. Every pairing below holds at least 4.5:1 against the surface its note names, in both themes.",
    tokens: [
      { name: "ink-900", light: "#053736", dark: "#eef5f2", usage: "Headings on surface-100, 200 and 300." },
      { name: "ink-700", light: "#2d4442", dark: "#c6d6d2", usage: "Body copy. 10.4:1 on surface-100." },
      { name: "ink-500", light: "#566a67", dark: "#95a9a5", usage: "Captions and helper text. 5.1:1 on surface-200, 4.7:1 on surface-300. Never body copy." },
      { name: "ink-on-brand", light: "#053736", dark: "#ffffff", usage: "All text on surface-brand: teal on the mint (10.9:1), white on teal (13.1:1). Small text never below 75%." },
      { name: "ink-on-accent", light: "#053736", dark: "#053736", usage: "All text on surface-accent. 5.7:1. White here is 2.3:1 and is banned." },
    ],
  },
  {
    title: "Accent and lines",
    note: "accent-700 exists because raw surface-accent is too light to read as text on a white page.",
    tokens: [
      { name: "accent-700", light: "#387024", dark: "#8fd46e", usage: "Links, active nav, inline icons. 5.3:1 on surface-200." },
      { name: "accent-on-brand", light: "#387024", dark: "#6ebe48", usage: "Green text and icons on brand surfaces. 5.0:1 on the mint, 5.7:1 on teal." },
      { name: "accent-on-brand-hover", light: "#387024", dark: "#8fd46e", usage: "Green text on surface-brand-hover. 5.7:1 on the lighter teal." },
      { name: "line-100", light: "#d8e3de", dark: "#17413e", usage: "Decorative hairlines only. Card edges and section rules." },
      { name: "line-200", light: "#6f8884", dark: "#5c7a75", usage: "Borders that carry meaning: every input outline. 3.8:1." },
      { name: "brand-edge", light: "#c4dad2", dark: "#5c7a75", usage: "Edge of brand cards and the brand button. A soft line on the mint in light; in dark it outlines the button, 3.1:1, so it does not sink into the page." },
      { name: "focus-ring", light: "#053736", dark: "#6ebe48", usage: "The 2px focus outline. 3:1 or better on every surface it lands on." },
    ],
  },
  {
    title: "Status",
    note: "Status colour never carries meaning alone. success-600 shares a hue axis with the brand green, so every status needs a word or an icon beside it.",
    tokens: [
      { name: "danger-600", light: "#b3261e", dark: "#ff8a80", usage: "Validation errors: message text and the field border." },
      { name: "success-600", light: "#2f6f23", dark: "#8fd46e", usage: "Submission confirmations. Always paired with a tick or the word Sent." },
      { name: "warning-600", light: "#8a5a00", dark: "#ffc766", usage: "Non-blocking notices, such as an unsupported file type." },
    ],
  },
];

export type TypeStyle = {
  name: string;
  size: string;
  lineHeight: string;
  weight: number;
  className: string;
  sample: string;
  usage: string;
};

export const typeGroups: { title: string; styles: TypeStyle[] }[] = [
  {
    title: "Display",
    styles: [
      { name: "display-xl", size: "56px", lineHeight: "60px", weight: 600, className: "text-display-xl", sample: "Hire the tech team your roadmap needs", usage: "Home hero. One per page." },
      { name: "display-lg", size: "44px", lineHeight: "50px", weight: 600, className: "text-display-lg", sample: "Leadership Hiring", usage: "H1 on pillar pages and Why Us." },
      { name: "display-md", size: "34px", lineHeight: "42px", weight: 600, className: "text-display-md", sample: "Roles we cover", usage: "Section headings inside a page, from 640px." },
      { name: "display-sm", size: "30px", lineHeight: "38px", weight: 600, className: "text-display-sm", sample: "Four practices, one team.", usage: "Section headings on phones, so the hero headline stays the largest text." },
    ],
  },
  {
    title: "Headings",
    styles: [
      { name: "heading-lg", size: "26px", lineHeight: "34px", weight: 600, className: "text-heading-lg", sample: "Product Hiring", usage: "Pillar card titles, sub-sections." },
      { name: "heading-md", size: "20px", lineHeight: "28px", weight: 600, className: "text-heading-md", sample: "Data Engineering", usage: "Role groups, form section titles." },
      { name: "heading-sm", size: "17px", lineHeight: "24px", weight: 600, className: "text-heading-sm", sample: "Notice period", usage: "Dense lists and the team grid." },
    ],
  },
  {
    title: "Text",
    styles: [
      { name: "body-lg", size: "18px", lineHeight: "30px", weight: 400, className: "text-body-lg", sample: "We hire permanent technology and product talent, from senior engineers to CTOs.", usage: "Hero sub-copy and pillar intros." },
      { name: "body", size: "16px", lineHeight: "26px", weight: 400, className: "text-body", sample: "Tell us the role and a recruiter will follow up.", usage: "Default running text." },
      { name: "body-sm", size: "14px", lineHeight: "22px", weight: 400, className: "text-body-sm", sample: "Fields marked with an asterisk are required.", usage: "Dense copy, table cells, footer links." },
      { name: "caption", size: "13px", lineHeight: "18px", weight: 400, className: "text-caption", sample: "PDF or Word, up to 5 MB", usage: "Helper text and image captions, in ink-500." },
    ],
  },
  {
    title: "Utility",
    styles: [
      { name: "eyebrow", size: "12px", lineHeight: "16px", weight: 600, className: "text-eyebrow uppercase", sample: "What we do", usage: "Section kicker. The only uppercase in the system." },
      { name: "btn-label", size: "15px", lineHeight: "20px", weight: 600, className: "text-btn-label", sample: "Hire tech talent", usage: "All button labels. Sentence case." },
      { name: "field-label", size: "14px", lineHeight: "18px", weight: 500, className: "text-field-label", sample: "Expected CTC (LPA)", usage: "Form labels, above the control." },
      { name: "stat", size: "44px", lineHeight: "48px", weight: 600, className: "text-stat tabular-nums", sample: "5,000+", usage: "Stat tile figures. Tabular numerals." },
    ],
  },
];

export const spacingScale = [
  { name: "space-1", px: 4, tw: "1", usage: "Icon to label gap." },
  { name: "space-2", px: 8, tw: "2", usage: "Label to control gap, tag padding." },
  { name: "space-3", px: 12, tw: "3", usage: "Control inner padding." },
  { name: "space-4", px: 16, tw: "4", usage: "Default flex and grid gap. Page gutter floor." },
  { name: "space-5", px: 24, tw: "6", usage: "Card padding, gap between form fields." },
  { name: "space-6", px: 32, tw: "8", usage: "Card grid gap." },
  { name: "space-7", px: 48, tw: "12", usage: "Gap between sub-sections." },
  { name: "space-8", px: 64, tw: "16", usage: "Section padding on phones." },
  { name: "space-9", px: 96, tw: "24", usage: "Section padding on desktop." },
  { name: "space-10", px: 128, tw: "32", usage: "Hero and dual-path band only." },
];

export const radiusScale = [
  { name: "radius-none", value: "0", tw: "rounded-none", usage: "The bracket motif, dividers, full-bleed bands." },
  { name: "radius-sm", value: "4px", tw: "rounded-sm", usage: "Inputs, selects, textareas, checkboxes." },
  { name: "radius-md", value: "8px", tw: "rounded-md", usage: "Cards, stat tiles, image frames." },
  { name: "radius-lg", value: "16px", tw: "rounded-lg", usage: "Feature panels, dual-path band." },
  { name: "radius-pill", value: "999px", tw: "rounded-full", usage: "Buttons, round icon buttons, skill tags and role chips." },
];
