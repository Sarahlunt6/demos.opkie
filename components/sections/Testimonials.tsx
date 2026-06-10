"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site.config";

const INTERVAL = 8000; // auto-advance cadence (PRD 5)

/**
 * Patient words (PRD 4.1 / 5) — one testimonial at a time, large serif quote.
 * Auto-advances every 8s, pauses on hover/focus, with manual prev/next arrows.
 * No dots-only control. Auto-advance is suspended under reduced-motion.
 */
export function Testimonials() {
  const items = siteConfig.testimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (paused || reduceRef.current || items.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, index, items.length]);

  const current = items[index];

  return (
    <section className="border-t border-ink-line">
      <Container className="py-section lg:py-section-lg">
        <div
          className="mx-auto max-w-3xl text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <p className="eyebrow">In Patients&rsquo; Words</p>

          <figure className="mt-8" aria-live="polite">
            <blockquote className="text-balance text-display-sm font-light leading-[1.3] text-graphite">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="eyebrow mt-8">
              {current.name} &mdash; {current.procedure}
            </figcaption>
          </figure>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center border border-ink-line text-graphite transition-colors duration-200 hover:border-champagne"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
            <p className="eyebrow tabular-nums" aria-hidden="true">
              {index + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center border border-ink-line text-graphite transition-colors duration-200 hover:border-champagne"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
