import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";

/**
 * Phase 1 placeholder. The full Showroom — hero, Style Finder, sticky template
 * index, five template sections with device previews, comparison strip,
 * what-happens-next, every-site-includes, final CTA — is built in Phase 2,
 * top to bottom from hub.config.ts.
 */
export default function HomePage() {
  return (
    <Container as="section" className="py-24">
      <UtilityLabel className="block text-accent">Opkie Website Studio</UtilityLabel>
      <h1 className="mt-5 max-w-[18ch] text-display">
        Five websites. Built, proven, ready for your practice.
      </h1>
      <p className="measure mt-6 text-body-lg text-carbon/70">
        Every option is fully built, mobile-optimized, and engineered for search.
        The only decision is style.
      </p>
    </Container>
  );
}
