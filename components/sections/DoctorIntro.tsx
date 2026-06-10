import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Frame } from "@/components/ui/Frame";
import { siteConfig } from "@/lib/site.config";

/**
 * Doctor introduction (PRD 4.1) — 7/5 split. Environmental portrait and a
 * short first-person statement set in display italic, signed.
 */
export function DoctorIntro() {
  const { doctor } = siteConfig;

  return (
    <section className="border-t border-ink-line">
      <Container className="grid grid-cols-1 items-center gap-12 py-section lg:grid-cols-12 lg:gap-16 lg:py-section-lg">
        {/* Portrait — 5/12 */}
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-line">
            <Frame
              alt={`${doctor.name} at ${siteConfig.practice.name}`}
              label={doctor.displayName}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </Reveal>

        {/* Statement — 7/12 */}
        <Reveal className="lg:col-span-7" delay={80}>
          <p className="eyebrow">The Practice</p>
          <blockquote className="mt-6">
            <p className="font-display-italic text-display-sm font-light leading-[1.25] text-graphite">
              &ldquo;{doctor.statement}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="font-display text-lg text-graphite">
                {doctor.name}
              </p>
              <p className="eyebrow mt-2">Founder</p>
            </footer>
          </blockquote>
          <div className="mt-8">
            <AnimatedLink href="/about" className="text-sm">
              Read Dr. {doctor.firstName}&rsquo;s story
            </AnimatedLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
