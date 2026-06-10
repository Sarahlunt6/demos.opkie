"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site.config";

/**
 * Mobile-only sticky booking bar (PRD 5). Appears after the visitor scrolls
 * past 50% of the page, with split Call and Book actions. Hidden on lg+ where
 * the header CTA is always visible. Both targets are >=44px tall.
 */
export function StickyBookingBar() {
  const { practice, nav } = siteConfig;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      setVisible(ratio > 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-porcelain transition-transform duration-300 ease-out lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 divide-x divide-ink-line">
        <a
          href={practice.phoneHref}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-[52px] items-center justify-center px-4 text-sm font-medium text-graphite"
        >
          Call
        </a>
        <a
          href={practice.bookingUrl}
          tabIndex={visible ? 0 : -1}
          className="flex min-h-[52px] items-center justify-center bg-graphite px-4 text-sm font-medium text-porcelain"
        >
          {nav.bookLabel}
        </a>
      </div>
    </div>
  );
}
