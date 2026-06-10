import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site.config";

/**
 * Phase 1 placeholder. The full homepage (transformation slider hero,
 * services editorial, doctor section, gallery preview, testimonials,
 * booking band) is built in Phase 2. This stub exists so the foundation —
 * tokens, fonts, header, footer — is reviewable and the app builds clean.
 */
export default function Home() {
  return (
    <Container as="section" className="py-section lg:py-section-lg">
      <p className="eyebrow">Porcelain — Phase 1 Foundation</p>
      <h1 className="mt-6 max-w-[14ch] text-display-lg font-light text-graphite">
        The smile you&apos;ve been{" "}
        <em className="font-light italic">postponing.</em>
      </h1>
      <p className="measure mt-8 text-body-lg text-smoke">
        Foundation is in place: design tokens, typography, the configuration
        system, and the site frame. The homepage and its transformation slider
        arrive in Phase 2.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href={siteConfig.practice.bookingUrl}>
          {siteConfig.nav.bookLabel}
        </Button>
        <Button href="/services" variant="outline">
          View Services
        </Button>
      </div>
    </Container>
  );
}
