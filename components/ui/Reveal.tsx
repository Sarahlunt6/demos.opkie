"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered fade-up — single reveal per section, once (PRD 2.6).
 * Honors prefers-reduced-motion by rendering content immediately with no
 * transform (opacity-only intent, no movement). Also reveals immediately if
 * IntersectionObserver is unavailable so content is never trapped hidden.
 */
export function Reveal({
  as,
  className = "",
  delay = 0,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-500 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
