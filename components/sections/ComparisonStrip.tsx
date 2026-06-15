import { hubConfig } from "@/lib/hub.config";
import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";

const { templates } = hubConfig;

const ROWS: { key: "bestFor" | "signatureFeature" | "personality"; label: string }[] = [
  { key: "bestFor", label: "Best for" },
  { key: "signatureFeature", label: "Signature feature" },
  { key: "personality", label: "Personality in three words" },
];

function cell(t: (typeof templates)[number], key: (typeof ROWS)[number]["key"]) {
  if (key === "personality") return t.personality.join(" / ");
  return t[key];
}

/**
 * Comparison strip (PRD 4.1 #5 / 5) — a five-column table at desktop. Below
 * 1024px it becomes a horizontally swipeable card row (one card per template,
 * snap-scroll, edge-peek so the next card is visibly cut off) — never a crushed
 * table. The two layouts render the same config; only one is in the DOM at a
 * time per breakpoint (the other is display:none, so it is hidden from AT too).
 */
export function ComparisonStrip() {
  return (
    <section aria-labelledby="compare-heading" className="border-t border-line py-16 lg:py-24">
      <Container>
        <UtilityLabel className="block text-accent">Side by side</UtilityLabel>
        <h2 id="compare-heading" className="mt-3 text-display-sm">
          Compare the five at a glance
        </h2>
      </Container>

      {/* Desktop: table */}
      <Container className="mt-10 hidden lg:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Comparison of the five templates by best fit, signature feature, and personality
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-44 py-4 pr-4 align-bottom">
                <span className="label text-carbon/50">Template</span>
              </th>
              {templates.map((t) => (
                <th key={t.id} scope="col" className="py-4 pl-4 align-bottom">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 flex-none rounded-full"
                      style={{ backgroundColor: t.brandHue }}
                    />
                    <span className="font-semibold text-carbon">{t.name}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-b border-line align-top">
                <th scope="row" className="py-5 pr-4">
                  <span className="label text-carbon/50">{row.label}</span>
                </th>
                {templates.map((t) => (
                  <td key={t.id} className="py-5 pl-4 text-sm text-carbon/80">
                    {cell(t, row.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

      {/* Below 1024px: snap-scroll cards with edge-peek */}
      <div className="mt-10 lg:hidden">
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Template comparison cards"
        >
          {templates.map((t) => (
            <li
              key={t.id}
              className="w-[78%] flex-none snap-start rounded-lg border border-line p-5 sm:w-[60%]"
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 flex-none rounded-full"
                  style={{ backgroundColor: t.brandHue }}
                />
                <span className="font-semibold text-carbon">{t.name}</span>
              </span>
              <dl className="mt-4 space-y-3">
                {ROWS.map((row) => (
                  <div key={row.key}>
                    <dt className="label text-carbon/50">{row.label}</dt>
                    <dd className="mt-1 text-sm text-carbon/80">{cell(t, row.key)}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
