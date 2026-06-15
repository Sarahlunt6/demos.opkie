import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";

/**
 * Hero (PRD 4.1 #2) — short. Eyebrow + headline + one subline. The optional
 * ?for= personalization line is wired in Phase 3. Hub editorial copy lives here
 * (the hub's own voice); template-specific data and contact come from config.
 */
export function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <Container as="section" className="py-16 lg:py-24">
      <UtilityLabel className="block text-accent animate-fade-up">
        Opkie Website Studio
      </UtilityLabel>
      <h1
        className="mt-5 max-w-[20ch] text-display animate-fade-up"
        style={{ animationDelay: "60ms" }}
      >
        Five websites. Built, proven, ready for your practice.
      </h1>
      <p
        className="measure mt-6 text-body-lg text-carbon/70 animate-fade-up"
        style={{ animationDelay: "120ms" }}
      >
        Every option is fully built, mobile-optimized, and engineered for search.
        The only decision is style.
      </p>
      {children}
    </Container>
  );
}
