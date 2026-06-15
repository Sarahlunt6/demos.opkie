"use client";

import { useEffect, useState } from "react";
import { hubConfig } from "@/lib/hub.config";
import { Container } from "@/components/layout/Container";

const { templates } = hubConfig;

/**
 * Sticky template index (PRD 3.4) — the page's navigation spine, especially on
 * mobile where five sections is a long scroll. Anchor links with a color chip
 * each (the one place a template's brand hue appears in hub UI). Active-section
 * indication via IntersectionObserver. Appears under the hero and pins on scroll.
 */
export function TemplateIndex() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = templates
      .map((t) => document.getElementById(`template-${t.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.replace("template-", ""));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Templates"
      className="sticky top-0 z-30 border-y border-line bg-studio-white/95 backdrop-blur-sm"
    >
      <Container>
        <ul className="flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {templates.map((t) => {
            const isActive = active === t.id;
            return (
              <li key={t.id} className="flex-none">
                <a
                  href={`#template-${t.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive ? "bg-mist text-carbon" : "text-carbon/60 hover:text-carbon"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 flex-none rounded-full"
                    style={{ backgroundColor: t.brandHue }}
                  />
                  {t.name}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
