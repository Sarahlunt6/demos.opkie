"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TransformationSlider } from "@/components/interactive/TransformationSlider";
import { siteConfig } from "@/lib/site.config";

interface Filter {
  label: string;
  /** serviceSlug used as the URL value; null means "All". */
  value: string | null;
}

// Build the filter list from the gallery itself, preserving first-seen order.
function buildFilters(): Filter[] {
  const seen = new Map<string, string>();
  for (const c of siteConfig.gallery) {
    if (!seen.has(c.serviceSlug)) seen.set(c.serviceSlug, c.procedure);
  }
  return [
    { label: "All", value: null },
    ...Array.from(seen, ([value, label]) => ({ value, label })),
  ];
}

/**
 * Filterable grid of transformation cases (PRD 4.3). The active procedure is
 * held in the URL (?procedure=slug) so a filtered view is shareable and works
 * with the back button; filtering is instant and client-side, with a fade-in
 * layout transition that collapses to nothing under reduced motion.
 */
export function GalleryGrid() {
  const filters = buildFilters();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = searchParams.get("procedure");
  const cases = active
    ? siteConfig.gallery.filter((c) => c.serviceSlug === active)
    : siteConfig.gallery;

  const select = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("procedure", value);
    else params.delete("procedure");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by procedure"
        className="flex flex-wrap gap-x-2 gap-y-3"
      >
        {filters.map((filter) => {
          const isActive = filter.value === active;
          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => select(filter.value)}
              className={`min-h-[44px] border px-4 py-2 text-sm transition-colors duration-200 ${
                isActive
                  ? "border-graphite bg-graphite text-porcelain"
                  : "border-ink-line text-smoke hover:border-champagne hover:text-graphite"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* key on the active filter remounts the grid so cards replay the fade-in */}
      <div
        key={active ?? "all"}
        className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
      >
        {cases.map((c, i) => (
          <div
            key={c.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <TransformationSlider
              beforeAlt={c.beforeAlt}
              afterAlt={c.afterAlt}
              label={`Case ${c.id}`}
              aspect="4 / 5"
              eyebrow={`Case ${c.id} — ${c.procedure}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
