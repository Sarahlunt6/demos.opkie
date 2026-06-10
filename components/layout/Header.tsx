"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";

/**
 * Sticky, minimal header (PRD 2.4): wordmark left, nav + Book Consultation
 * right. Background transitions from transparent to porcelain with a hairline
 * border once the page is scrolled. Mobile collapses the nav into a panel.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ease-out ${
        scrolled || open
          ? "bg-porcelain border-b border-ink-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-graphite"
          onClick={() => setOpen(false)}
        >
          {siteConfig.practice.name}
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {siteConfig.nav.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm text-graphite"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          ))}
          <Button href={siteConfig.practice.bookingUrl} variant="primary">
            {siteConfig.nav.bookLabel}
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-graphite transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-6 bg-graphite transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-graphite transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </Container>

      {/* Mobile panel */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-ink-line bg-porcelain lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 font-display text-2xl text-graphite"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              href={siteConfig.practice.bookingUrl}
              variant="primary"
              className="mt-4 w-full"
            >
              {siteConfig.nav.bookLabel}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
