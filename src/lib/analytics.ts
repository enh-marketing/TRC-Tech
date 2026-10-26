/**
 * One place for analytics. No tool is chosen yet, so events go to a
 * `dataLayer` only if a tag manager has been added, and to the console in
 * development. Swapping in a real tool means changing this file only.
 */
type Payload = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: string, payload: Payload) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...payload });
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, payload);
}
