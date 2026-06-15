import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";

// The baseline every template ships with — hub's own voice, no template names.
const includes = [
  {
    title: "Mobile-optimized",
    body: "Built mobile-first and tested on real phones, where most patients will find you.",
  },
  {
    title: "Core Web Vitals engineering",
    body: "Fast to load and stable on screen, so search engines and patients both reward it.",
  },
  {
    title: "Local SEO structure",
    body: "Clean metadata, structured data, and a consistent name, address, and phone.",
  },
  {
    title: "Accessibility",
    body: "Keyboard-operable, screen-reader-friendly, and built to WCAG 2.1 AA.",
  },
  {
    title: "Your branding throughout",
    body: "Your colors, logo, photography, and voice — the template is the structure, not the limit.",
  },
];

/** Every site includes (PRD 4.1 #7) — quiet text section, baseline guarantees. */
export function EverySiteIncludes() {
  return (
    <section aria-labelledby="includes-heading" className="border-t border-line py-16 lg:py-24">
      <Container>
        <UtilityLabel className="block text-accent">Every site includes</UtilityLabel>
        <h2 id="includes-heading" className="mt-3 max-w-[24ch] text-display-sm">
          Whichever you pick, the engineering underneath is the same
        </h2>

        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {includes.map((item) => (
            <div key={item.title} className="border-t border-line pt-4">
              <dt className="font-semibold text-carbon">{item.title}</dt>
              <dd className="mt-1.5 text-sm text-carbon/70">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
