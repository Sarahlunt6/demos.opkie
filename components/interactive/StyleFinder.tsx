"use client";

import { useEffect, useRef, useState } from "react";
import { hubConfig } from "@/lib/hub.config";
import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";

const options = hubConfig.templates.map((t) => ({
  id: t.id,
  label: t.styleFinderLabel,
}));

/**
 * Style Finder (PRD 4.1.3) — one question, five answers, fully skippable. An
 * accessible radiogroup (roving tabindex, arrow keys). Selecting one smooth-
 * scrolls to that template's section, moves focus there, softly highlights it,
 * and records the choice in the URL (?style=) so a forwarded link pre-highlights.
 * Not a quiz, not gated; it exists to collapse five options into one start point.
 */
export function StyleFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function highlight(id: string) {
    const el = document.getElementById(`template-${id}`);
    if (!el) return;
    el.classList.remove("style-highlight");
    void el.offsetWidth; // reflow so the animation can replay
    el.classList.add("style-highlight");
  }

  function select(id: string, { scroll = true }: { scroll?: boolean } = {}) {
    setSelected(id);
    const url = new URL(window.location.href);
    url.searchParams.set("style", id);
    window.history.replaceState(null, "", url);

    const el = document.getElementById(`template-${id}`);
    if (el && scroll) {
      el.scrollIntoView({
        behavior: reduced() ? "auto" : "smooth",
        block: "start",
      });
      el.focus({ preventScroll: true });
    }
    highlight(id);
  }

  // Pre-highlight from a forwarded ?style= link, without yanking the scroll.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("style");
    if (!id) return;
    const idx = options.findIndex((o) => o.id === id);
    if (idx === -1) return;
    setSelected(id);
    setFocusIndex(idx);
    select(id, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % options.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + options.length) % options.length;
    else return;
    e.preventDefault();
    setFocusIndex(next);
    btnRefs.current[next]?.focus();
    select(options[next].id);
  }

  return (
    <section aria-labelledby="style-finder-q" className="border-t border-line bg-mist py-12">
      <Container>
        <UtilityLabel className="block text-accent">Find your fit</UtilityLabel>
        <h2 id="style-finder-q" className="mt-3 text-display-sm">
          What best describes your practice?
        </h2>
        <p className="mt-2 text-sm text-carbon/60">
          One tap jumps you to a starting point. Optional — scroll to see all five.
        </p>

        <div role="radiogroup" aria-labelledby="style-finder-q" className="mt-6 flex flex-wrap gap-2.5">
          {options.map((o, i) => {
            const isChecked = selected === o.id;
            return (
              <button
                key={o.id}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                role="radio"
                aria-checked={isChecked}
                tabIndex={isChecked || (selected === null && i === focusIndex) ? 0 : -1}
                onClick={() => {
                  setFocusIndex(i);
                  select(o.id);
                }}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isChecked
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line bg-studio-white text-carbon hover:border-carbon"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
