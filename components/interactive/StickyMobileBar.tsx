"use client";

import { useEffect, useState } from "react";
import { hubConfig } from "@/lib/hub.config";

const { contact } = hubConfig;
const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

/**
 * Sticky mobile footer bar (PRD 5) — "Call" + "Tell us your pick", mobile only,
 * appearing after 50% scroll. Slides in so it does not fight the hero.
 */
export function StickyMobileBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      setShown(scrolled > 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-studio-white p-3 transition-transform duration-200 ease-out lg:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3">
        <a
          href={telHref}
          className="flex min-h-[44px] flex-none items-center justify-center rounded-md border border-line px-5 text-sm font-medium text-carbon transition-colors duration-200 hover:border-carbon"
        >
          Call
        </a>
        <a
          href={contact.bookingUrl}
          className="flex min-h-[44px] flex-1 items-center justify-center rounded-md bg-carbon px-5 text-sm font-medium text-studio-white transition-colors duration-200 hover:bg-carbon/90"
        >
          Tell us your pick
        </a>
      </div>
    </div>
  );
}
