"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

export interface TransformationSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Intrinsic aspect ratio "w / h" — both images must match it exactly. */
  aspect?: string;
  /** Eyebrow label rendered above, e.g. "CASE 014 — PORCELAIN VENEERS, 8 UNITS". */
  eyebrow?: string;
  /** Hero usage: priority-load both images and pulse the handle once on mount. */
  priority?: boolean;
  /** sizes hint for next/image. */
  sizes?: string;
  className?: string;
}

const STEP = 2; // keyboard increment, percent
const STEP_LARGE = 10; // PageUp/PageDown increment, percent

/**
 * Before/after comparison with a draggable vertical divider (PRD 2.5).
 * Custom-built (no library): two layered images, the "after" clipped by a
 * clip-path inset driven by the handle position. Fully operable by pointer,
 * touch, and keyboard; reduced-motion safe.
 */
export function TransformationSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  aspect = "4 / 3",
  eyebrow,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 60vw",
  className = "",
}: TransformationSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50); // reveal position, 0–100
  const [dragging, setDragging] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Pulse the handle once after the load sequence, to invite interaction.
  useEffect(() => {
    if (!priority) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const t = setTimeout(() => setPulse(true), 900);
    return () => clearTimeout(t);
  }, [priority]);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPos(Math.min(100, Math.max(0, ratio * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setPulse(false);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = pos - STEP;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = pos + STEP;
        break;
      case "PageDown":
        next = pos - STEP_LARGE;
        break;
      case "PageUp":
        next = pos + STEP_LARGE;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = 100;
        break;
      default:
        return;
    }
    e.preventDefault();
    setPulse(false);
    setPos(Math.min(100, Math.max(0, next)));
  };

  const rounded = Math.round(pos);

  return (
    <figure className={className}>
      {eyebrow && (
        <figcaption className="eyebrow mb-4">{eyebrow}</figcaption>
      )}

      <div
        ref={containerRef}
        className="relative w-full select-none overflow-hidden bg-ink-line"
        style={{ aspectRatio: aspect }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Base layer: BEFORE (fully visible) */}
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className="object-cover"
        />

        {/* Top layer: AFTER, clipped from the left to the handle position */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes={sizes}
            priority={priority}
            draggable={false}
            className="object-cover"
          />
        </div>

        {/* Corner labels */}
        <span className="pointer-events-none absolute left-3 top-3 bg-graphite/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-porcelain">
          After
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-graphite/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-porcelain">
          Before
        </span>

        {/* Divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-enamel"
          style={{ left: `${pos}%` }}
        />

        {/* Handle — the focusable slider control */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-valuetext={`${rounded}% revealed`}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          className={`absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border border-ink-line bg-enamel shadow-[0_1px_4px_rgba(28,27,26,0.18)] ${
            pulse ? "animate-handle-pulse" : ""
          }`}
          style={{ left: `${pos}%` }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="text-graphite"
          >
            <path
              d="M8 6 4 10l4 4M12 6l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </figure>
  );
}
