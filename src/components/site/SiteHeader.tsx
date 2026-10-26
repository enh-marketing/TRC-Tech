"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { Bracket, Button } from "@/components/ui";
import { pillars, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { ArrowRight, ChevronDown, Close, Menu } from "./icons";
import { Logo } from "./Logo";
import { ThemeSwitch } from "./ThemeSwitch";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [practicesOpen, setPracticesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const practicesRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // A 1px sentinel above the header tells us when it has become stuck.
  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setPracticesOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Practices menu: Escape and outside clicks close it.
  useEffect(() => {
    if (!practicesOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPracticesOpen(false);
    }
    function onPointer(e: PointerEvent) {
      if (!practicesRef.current?.contains(e.target as Node)) setPracticesOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [practicesOpen]);

  // Mobile drawer: lock scroll, keep focus inside, Escape closes, focus returns to the button.
  useEffect(() => {
    if (!drawerOpen) return;
    const drawer = drawerRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
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
  }, [drawerOpen]);

  return (
    <>
      <div id="header-sentinel" aria-hidden="true" className="h-px" />
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-surface-100/95 backdrop-blur-md backdrop-saturate-150 transition-[border-color,box-shadow] duration-150",
          scrolled ? "border-line-100 shadow-md" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-[76px] max-w-[1200px] items-center gap-6 px-4">
          <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Logo priority height={40} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div ref={practicesRef} className="relative">
              <button
                type="button"
                aria-expanded={practicesOpen}
                aria-controls="practices-menu"
                onClick={() => setPracticesOpen((v) => !v)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-1 rounded-full px-3 text-body-sm transition-colors duration-150",
                  practicesOpen ? "text-ink-900" : "text-ink-700 hover:text-ink-900",
                )}
              >
                What we do
                <ChevronDown className={cn("size-4 transition-transform duration-150", practicesOpen && "rotate-180")} />
              </button>

              {/* Drops in from the button (180ms, easing out) and lifts away a little quicker. */}
              <AnimatePresence>
                {practicesOpen ? (
                  <m.div
                    id="practices-menu"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: ease.out } }}
                    exit={{ opacity: 0, y: -4, transition: { duration: 0.12, ease: ease.in } }}
                    className="absolute top-full left-0 mt-3 w-[600px] rounded-lg border border-line-100 bg-surface-100 p-3 shadow-md"
                  >
                    <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0">
                      {pillars.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={p.href}
                            className="group flex h-full flex-col gap-1 rounded-md p-4 no-underline transition-colors duration-150 hover:bg-surface-200"
                          >
                            <span className="flex items-center justify-between gap-3 text-heading-sm text-ink-900">
                              {p.title}
                              <ArrowRight className="size-4 text-ink-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent-700" />
                            </span>
                            <span className="text-body-sm text-ink-700">{p.summary}</span>
                            <span className="mt-1 text-caption text-ink-500">{p.roles.length} role specialisms</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/what-we-do/"
                      className="mt-1 flex items-center justify-between rounded-md bg-surface-200 px-4 py-3 text-body-sm text-ink-900 no-underline hover:text-accent-700"
                    >
                      All four practices
                      <ArrowRight className="size-4" />
                    </Link>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </div>

            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-sm px-3 text-body-sm text-ink-700 no-underline transition-colors duration-150 hover:text-ink-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-3">
            <span className="hidden sm:block">
              <ThemeSwitch />
            </span>
            {/* Wrapped, because the button's own inline-flex would override a hidden class. */}
            <span className="hidden lg:block">
              <Button href={site.cta.apply.href} variant="secondary" data-track="apply_cta_click" data-location="header">
                {site.cta.apply.label}
              </Button>
            </span>
            <Button href={site.cta.hire.href} data-track="hire_cta_click" data-location="header">
              {site.cta.hire.label}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen(true)}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-200 text-ink-900 lg:hidden"
            >
              <Menu />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fades in with a short settle (220ms) and fades out faster (160ms). */}
      <AnimatePresence>
        {drawerOpen ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: ease.out } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.16, ease: ease.in } }}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface-brand text-ink-on-brand lg:hidden"
          >
            <div className="flex h-[76px] items-center justify-between px-4">
              <Logo height={40} />
              <div className="flex items-center gap-3">
              <ThemeSwitch onBrand />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink-on-brand/40 text-ink-on-brand"
              >
                <Close />
                <span className="sr-only">Close menu</span>
              </button>
              </div>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-8 px-4 pt-6 pb-10">
              <Link href="/" className="text-heading-lg text-ink-on-brand no-underline">
                Home
              </Link>
              <div className="flex flex-col gap-3">
                <p className="m-0 flex items-center gap-3 text-eyebrow uppercase text-ink-on-brand/70">
                  <Bracket />
                  What we do
                </p>
                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {pillars.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={p.href}
                        className="flex min-h-11 items-center justify-between border-b border-ink-on-brand/15 py-3 text-heading-md text-ink-on-brand no-underline"
                      >
                        {p.title}
                        <ArrowRight className="size-5 text-accent-on-brand" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-heading-lg text-ink-on-brand no-underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <Button href={site.cta.hire.href} size="lg" data-track="hire_cta_click" data-location="mobile_menu">
                  {site.cta.hire.label}
                </Button>
                <Button
                  href={site.cta.apply.href}
                  variant="onBrand"
                  size="lg"
                  data-track="apply_cta_click"
                  data-location="mobile_menu"
                >
                  {site.cta.apply.label}
                </Button>
              </div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
