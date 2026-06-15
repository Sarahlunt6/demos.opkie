"use client";

import { useEffect, useRef, useState } from "react";
import type { HubTemplate } from "@/lib/hub.config";

const SLOT_LABELS = ["Home", "Signature feature", "Mobile view"] as const;

/**
 * Live device preview (PRD 3.5) — the signature element. A clean browser-chrome
 * frame that cross-fades three screenshots (home, signature interaction, mobile)
 * with dot indicators. Hover auto-cycles on desktop; tap advances on touch; the
 * dots are real buttons so the whole thing is keyboard-operable. Fixed aspect
 * ratio so there is zero layout shift (PRD 8).
 *
 * Until the real captures land (PREVIEWS.md), each slot is a neutral gray
 * placeholder at the exact frame ratio — layout is final, and swapping in
 * next/image later is a localized change.
 */
export function DevicePreview({
  template,
  priority = false,
}: {
  template: HubTemplate;
  priority?: boolean;
}) {
  void priority; // reserved for next/image when real screenshots land
  const [active, setActive] = useState(0);
  const reduced = useRef(false);
  const hovering = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Desktop hover auto-cycle; paused off-hover and under reduced motion.
  useEffect(() => {
    if (!hovering.current || reduced.current) return;
    const t = setInterval(() => setActive((i) => (i + 1) % 3), 1800);
    return () => clearInterval(t);
  });

  const advance = () => setActive((i) => (i + 1) % 3);
  const host = (() => {
    try {
      return new URL(template.demoUrl).host;
    } catch {
      return "opkie.com";
    }
  })();

  return (
    <div className="w-full">
      {/* Browser-chrome frame */}
      <div className="overflow-hidden rounded-md border border-line bg-studio-white">
        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-line bg-mist px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-studio-white" />
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-studio-white" />
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-studio-white" />
          </span>
          <span className="truncate rounded-sm bg-studio-white px-2 py-0.5 text-xs text-carbon/50">
            {host}
          </span>
        </div>

        {/* Screen — fixed 16:10, slots cross-fade */}
        <button
          type="button"
          onClick={advance}
          onMouseEnter={() => {
            hovering.current = true;
          }}
          onMouseLeave={() => {
            hovering.current = false;
          }}
          aria-label={`${template.name} preview — show next view`}
          className="relative block aspect-[16/10] w-full bg-mist"
        >
          {template.screenshots.map((src, i) => (
            <span
              key={src}
              aria-hidden={i !== active}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Placeholder until real screenshots exist (PREVIEWS.md). */}
              <span className="label text-carbon/40">
                {template.name} — {SLOT_LABELS[i]}
              </span>
            </span>
          ))}
        </button>
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {SLOT_LABELS.map((labelText, i) => (
          <button
            key={labelText}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${template.name} ${labelText.toLowerCase()}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              i === active ? "bg-carbon" : "bg-line hover:bg-carbon/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
