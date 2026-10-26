import { site } from "@/content/site";

/**
 * Placeholder content (dummy quotes and articles, the parent company's
 * logos and contact details, unconfirmed FAQ answers) carries a
 * `placeholder` note. It renders in preview only. If preview is switched off
 * before the real content arrives, it disappears instead of going live.
 */
export type Placeholder = { placeholder?: string };

export function isShown(item: Placeholder) {
  return site.preview || !item.placeholder;
}

export function shown<T extends Placeholder>(items: T[]) {
  return items.filter(isShown);
}
