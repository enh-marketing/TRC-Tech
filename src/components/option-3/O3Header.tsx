"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui";
import { ArrowRight, ChevronDown, Close, Menu } from "@/components/site/icons";
import { Logo } from "@/components/site/Logo";
import { ThemeSwitch } from "@/components/site/ThemeSwitch";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { conceptHome, frame } from "./shared";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Concept 3's header, after the agency's reference: it sits on the top of the
 * hero band with no bar of its own, the links and the two buttons on the right.
 * Once the page scrolls it gains a full-width translucent bar, so it stays
 * readable over any section. Below 1024px the logo is centred with the menu button on
 * the right, as in the reference's phone layout. Same navigation as concept 1.
 */
export function O3Header() {
  const [scrolled, setScrolled] = useState(false);
  const [practicesOpen, setPracticesOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const practicesRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!practicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPracticesOpen(false);
      // Focus inside the closing menu would be lost, so hand it back to the toggle.
      const box = practicesRef.current;
      if (box?.contains(document.activeElement)) box.querySelector<HTMLButtonElement>("button")?.focus();
    };
    const onPointer = (e: PointerEvent) => !practicesRef.current?.contains(e.target as Node) && setPracticesOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [practicesOpen]);

  useEffect(() => {
    if (!sheetOpen) return;
    const sheet = sheetRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return setSheetOpen(false);
      if (e.key !== "Tab" || !sheet) return;
      const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    const button = menuButtonRef.current;
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [sheetOpen]);

  const navLink = "flex min-h-11 items-center rounded-full px-3.5 text-body-sm text-ink-900 no-underline transition-colors duration-150 hover:bg-ink-900/[0.06]";

  return (
    <>
      <header
        id="top"
        className={cn(
          "sticky top-0 z-40 transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-surface-raised/90 shadow-sm ring-1 ring-line-100 backdrop-blur-md backdrop-saturate-150" : "bg-transparent",
        )}
      >
        <div className={cn(frame, "grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 sm:h-[72px] lg:flex")}>
          <span aria-hidden="true" className="lg:hidden" />
          <Link href={conceptHome} aria-label={`${site.name}, home`} className="flex shrink-0 items-center justify-self-center lg:me-auto">
            <Logo height={40} priority />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            <div ref={practicesRef} className="relative">
              <button
                type="button"
                aria-expanded={practicesOpen}
                aria-controls="o3-practices"
                onClick={() => setPracticesOpen((o) => !o)}
                className={cn(navLink, "cursor-pointer gap-1.5", practicesOpen && "bg-ink-900/[0.06]")}
              >
                What we do
                <ChevronDown className={cn("size-4 transition-transform duration-200", practicesOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {practicesOpen ? (
                  <m.div
                    id="o3-practices"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: ease.out } }}
                    exit={{ opacity: 0, y: -4, transition: { duration: 0.12, ease: ease.in } }}
                    className="absolute top-full left-1/2 mt-3 w-[600px] -translate-x-1/2 rounded-3xl bg-surface-raised p-2 shadow-card ring-1 ring-line-100"
                  >
                    <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0">
                      {pillars.map((p) => (
                        <li key={p.slug}>
                          <Link href={p.href} className="group flex h-full flex-col gap-1 rounded-2xl p-4 no-underline transition-colors duration-150 hover:bg-surface-brand">
                            <span className="text-heading-sm text-ink-900">{p.title}</span>
                            <span className="text-body-sm text-ink-700">{p.summary}</span>
                            <span className="mt-1 text-caption text-ink-500 tabular-nums">{p.roles.length} role specialisms</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/what-we-do/" className="mt-1 flex items-center justify-between rounded-2xl px-4 py-3 text-body-sm text-ink-900 no-underline hover:bg-surface-brand">
                      All four practices
                      <ArrowRight className="size-4" />
                    </Link>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </div>
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className={navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end lg:ms-4">
            <ThemeSwitch className="hidden lg:flex" />
            <Link
              href={site.cta.apply.href}
              data-track="apply_cta_click"
              data-location="header"
              className="o3-press hidden min-h-11 items-center rounded-full border border-ink-900 px-5 text-btn-label text-ink-900 no-underline transition-colors duration-150 hover:bg-ink-900/[0.06] xl:flex"
            >
              {site.cta.apply.label}
            </Link>
            {/* Wrapped: the button's own inline-flex would override a hidden class on it. */}
            <span className="hidden lg:inline-flex">
              <Button href={site.cta.hire.href} data-track="hire_cta_click" data-location="header" className="o3-press">
                {site.cta.hire.label}
              </Button>
            </span>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={sheetOpen}
              aria-controls="o3-sheet"
              onClick={() => setSheetOpen(true)}
              className="o3-press flex size-11 cursor-pointer items-center justify-center rounded-full text-ink-900 transition-colors duration-150 hover:bg-ink-900/[0.06] lg:hidden"
            >
              <Menu className="size-6" />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* The phone sheet slides down (220ms) and lifts away faster (160ms). */}
      <AnimatePresence>
        {sheetOpen ? (
          <m.div
            id="o3-sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: ease.out } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: ease.in } }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface-brand px-5 pt-5 pb-8 lg:hidden"
          >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
              <ThemeSwitch className="justify-self-start" />
              <Link href={conceptHome} onClick={() => setSheetOpen(false)} aria-label={`${site.name}, home`}>
                <Logo height={40} />
              </Link>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="flex size-11 cursor-pointer items-center justify-center justify-self-end rounded-full text-ink-900 hover:bg-ink-900/[0.06]"
              >
                <Close className="size-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Main" className="mt-8 flex flex-col">
              <Link href={conceptHome} onClick={() => setSheetOpen(false)} className="py-3 text-heading-lg text-ink-900 no-underline">
                Home
              </Link>
              <p className="m-0 mt-6 mb-3 text-eyebrow text-ink-500 uppercase">What we do</p>
              <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {pillars.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.href}
                      onClick={() => setSheetOpen(false)}
                      className="flex min-h-14 items-center justify-between rounded-2xl bg-surface-raised px-5 text-heading-md text-ink-900 no-underline shadow-sm ring-1 ring-line-100"
                    >
                      {p.title}
                      <ArrowRight className="size-5 text-accent-700" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col">
                {site.nav.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setSheetOpen(false)} className="py-3 text-heading-lg text-ink-900 no-underline">
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Button href={site.cta.hire.href} size="lg" data-track="hire_cta_click" data-location="mobile_menu">
                {site.cta.hire.label}
              </Button>
              <Link
                href={site.cta.apply.href}
                data-track="apply_cta_click"
                data-location="mobile_menu"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-ink-900 px-7 text-btn-label text-ink-900 no-underline"
              >
                {site.cta.apply.label}
              </Link>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
