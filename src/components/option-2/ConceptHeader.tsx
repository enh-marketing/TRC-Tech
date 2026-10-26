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
import { conceptHome } from "./shared";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Concept 2's header: a floating bar that sits off the page edge, so the
 * editorial hero reads full width under it. Same navigation as concept 1.
 * The practices menu closes on Escape and outside clicks; the phone sheet
 * keeps focus inside, closes on Escape and hands focus back to its button.
 * Menus open and close with Motion.
 */
export function ConceptHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [practicesOpen, setPracticesOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const practicesRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // The bar gains a shadow once the page has moved under it.
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

  const navLink = "flex min-h-11 items-center rounded-full px-4 text-body-sm text-ink-700 no-underline transition-colors duration-150 hover:bg-surface-200 hover:text-ink-900";

  return (
    <>
      <header id="top" className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
        <div
          className={cn(
            "mx-auto flex h-16 max-w-[1280px] items-center gap-3 rounded-full bg-surface-100/90 ps-5 pe-2 ring-1 ring-line-100 backdrop-blur-md backdrop-saturate-150 transition-shadow duration-200",
            scrolled ? "shadow-md" : "shadow-sm",
          )}
        >
          <Link href={conceptHome} aria-label={`${site.name}, home`} className="me-auto flex shrink-0 items-center lg:me-0">
            <Logo height={36} priority />
          </Link>

          <nav aria-label="Main" className="mx-auto hidden items-center gap-1 lg:flex">
            <div ref={practicesRef} className="relative">
              <button
                type="button"
                aria-expanded={practicesOpen}
                aria-controls="o2-practices"
                onClick={() => setPracticesOpen((o) => !o)}
                className={cn(navLink, "cursor-pointer gap-1.5", practicesOpen && "bg-surface-200 text-ink-900")}
              >
                What we do
                <ChevronDown className={cn("size-4 transition-transform duration-200", practicesOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {practicesOpen ? (
                  <m.div
                    id="o2-practices"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: ease.out } }}
                    exit={{ opacity: 0, y: -4, transition: { duration: 0.12, ease: ease.in } }}
                    className="absolute top-full left-1/2 mt-4 w-[640px] -translate-x-1/2 rounded-2xl bg-surface-100 p-2 shadow-md ring-1 ring-line-100"
                  >
                    <ul className="m-0 grid list-none grid-cols-2 gap-px overflow-hidden rounded-xl bg-line-100 p-0">
                      {pillars.map((p, i) => (
                        <li key={p.slug} className="bg-surface-100">
                          <Link href={p.href} className="group flex h-full flex-col gap-1.5 p-5 no-underline transition-colors duration-150 hover:bg-surface-200">
                            <span className="flex items-center justify-between gap-3">
                              <span className="text-caption text-ink-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                              <ArrowRight className="size-4 text-ink-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent-700" />
                            </span>
                            <span className="text-heading-sm text-ink-900">{p.title}</span>
                            <span className="text-body-sm text-ink-700">{p.summary}</span>
                            <span className="text-caption text-ink-500 tabular-nums">{p.roles.length} role specialisms</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href="/what-we-do/" className="mt-2 flex items-center justify-between rounded-xl px-5 py-3 text-body-sm text-ink-900 no-underline hover:bg-surface-200">
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

          <div className="flex items-center gap-2">
            <ThemeSwitch className="hidden sm:flex" />
            <Link
              href={site.cta.apply.href}
              data-track="apply_cta_click"
              data-location="header"
              className="hidden min-h-11 items-center px-3 text-btn-label text-ink-900 no-underline underline-offset-[6px] hover:underline xl:flex"
            >
              {site.cta.apply.label}
            </Link>
            <Button href={site.cta.hire.href} data-track="hire_cta_click" data-location="header" className="hidden sm:inline-flex">
              {site.cta.hire.label}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={sheetOpen}
              aria-controls="o2-sheet"
              onClick={() => setSheetOpen(true)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-surface-accent text-ink-on-accent lg:hidden"
            >
              <Menu className="size-5" />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* The phone sheet slides down from the bar (220ms) and lifts away faster (160ms). */}
      <AnimatePresence>
        {sheetOpen ? (
          <m.div
            id="o2-sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: ease.out } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: ease.in } }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface-canvas px-5 pt-5 pb-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Link href={conceptHome} onClick={() => setSheetOpen(false)} aria-label={`${site.name}, home`}>
                <Logo height={36} />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeSwitch />
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-200 text-ink-900"
                >
                  <Close className="size-5" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
            </div>
            <nav aria-label="Main" className="mt-10 flex flex-col">
              <Link href={conceptHome} onClick={() => setSheetOpen(false)} className="py-3 text-display-sm text-ink-900 no-underline">
                Home
              </Link>
              <p className="m-0 mt-6 mb-2 text-eyebrow text-ink-500 uppercase">What we do</p>
              <ul className="m-0 list-none p-0">
                {pillars.map((p) => (
                  <li key={p.slug} className="border-t border-line-100">
                    <Link href={p.href} onClick={() => setSheetOpen(false)} className="flex min-h-14 items-center justify-between text-heading-md text-ink-900 no-underline">
                      {p.title}
                      <ArrowRight className="size-5 text-accent-700" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col">
                {site.nav.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setSheetOpen(false)} className="py-3 text-display-sm text-ink-900 no-underline">
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-10">
              <Button href={site.cta.hire.href} size="lg" data-track="hire_cta_click" data-location="mobile_menu">
                {site.cta.hire.label}
              </Button>
              <Button href={site.cta.apply.href} size="lg" variant="secondary" data-track="apply_cta_click" data-location="mobile_menu">
                {site.cta.apply.label}
              </Button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
