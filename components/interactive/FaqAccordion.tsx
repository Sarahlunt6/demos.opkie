"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Faq } from "@/lib/site.config";

/**
 * FAQ accordion (PRD 5). Built on native <details>/<summary> so it works and
 * is keyboard-operable with no JS. Enhanced on the client for:
 *   - one-open-at-a-time
 *   - animated height (grid-rows 0fr <-> 1fr, sequenced so both directions
 *     animate while the panel stays in the DOM)
 *   - prefers-reduced-motion: instant open/close, no transition
 * The same `items` feed the FAQPage JSON-LD (Phase 4), keeping copy and schema
 * from one source.
 */
export function FaqAccordion({ items }: { items: readonly Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-ink-line">
      {items.map((item, i) => (
        <FaqItem
          key={item.question}
          index={i}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

function FaqItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [rows, setRows] = useState<"0fr" | "1fr">("0fr");

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (open) {
      // Reveal content first, then animate height on the next frame.
      details.open = true;
      if (reduce) {
        setRows("1fr");
      } else {
        requestAnimationFrame(() => setRows("1fr"));
      }
    } else {
      // Animate closed; native open is removed on transitionend (or now, if
      // motion is reduced) so the panel leaves the accessibility tree.
      setRows("0fr");
      if (reduce) details.open = false;
    }
  }, [open]);

  const onSummaryClick = (e: MouseEvent) => {
    // Take over native toggling so we can enforce one-open + animate.
    e.preventDefault();
    onToggle();
  };

  const onTransitionEnd = () => {
    if (!open && detailsRef.current) detailsRef.current.open = false;
  };

  const panelId = `faq-panel-${index}`;

  return (
    <details
      ref={detailsRef}
      className="border-b border-ink-line"
    >
      <summary
        onClick={onSummaryClick}
        aria-controls={panelId}
        className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden"
      >
        <span className="font-display text-lg text-graphite sm:text-xl">
          {item.question}
        </span>
        {/* Plus that becomes a minus when open */}
        <span
          aria-hidden="true"
          className="relative mt-1 h-4 w-4 flex-none text-smoke"
        >
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
          <span
            className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out ${
              open ? "scale-y-0" : "scale-y-100"
            }`}
          />
        </span>
      </summary>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: rows }}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="overflow-hidden">
          <p className="measure pb-6 text-body text-smoke">{item.answer}</p>
        </div>
      </div>
    </details>
  );
}
