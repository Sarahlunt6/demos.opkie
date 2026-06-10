import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TransformationSlider } from "@/components/interactive/TransformationSlider";
import { siteConfig } from "@/lib/site.config";

// Headline split into lines so each rises with a 60ms stagger (PRD 2.6).
// The emphasized word is set in display italic (PRD 2.3).
const HEADLINE_LINES: { text: string; italic?: boolean }[] = [
  { text: "The smile" },
  { text: "you’ve been" },
  { text: "postponing.", italic: true },
];

export function Hero() {
  const hero = siteConfig.gallery[0];
  const sliderEyebrow = `Case ${hero.id} — ${hero.detail}`;

  return (
    <section className="border-b border-ink-line pb-section pt-12 lg:pb-section-lg lg:pt-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Copy — asymmetric 5/12 (PRD 2.4) */}
        <div className="lg:col-span-5">
          <p
            className="eyebrow animate-line-rise"
            style={{ animationDelay: "0ms" }}
          >
            {siteConfig.practice.tagline}
          </p>

          <h1 className="mt-6 text-display-lg font-light text-graphite">
            {HEADLINE_LINES.map((line, i) => (
              <span
                key={line.text}
                className="block animate-rise"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                {line.italic ? (
                  <em className="font-display-italic font-light">{line.text}</em>
                ) : (
                  line.text
                )}
              </span>
            ))}
          </h1>

          <p
            className="measure animate-line-rise mt-8 text-body-lg text-smoke"
            style={{ animationDelay: "320ms" }}
          >
            A boutique studio for veneers, smile makeovers, and Invisalign in{" "}
            {siteConfig.practice.address.city}. Unhurried care, designed around
            your face.
          </p>

          <div
            className="animate-line-rise mt-10"
            style={{ animationDelay: "400ms" }}
          >
            <Button href={siteConfig.practice.bookingUrl}>
              {siteConfig.nav.bookLabel}
            </Button>
          </div>
        </div>

        {/* Signature slider — asymmetric 7/12 */}
        <div
          className="animate-line-rise lg:col-span-7"
          style={{ animationDelay: "200ms" }}
        >
          <TransformationSlider
            beforeAlt={hero.beforeAlt}
            afterAlt={hero.afterAlt}
            label={`Case ${hero.id}`}
            eyebrow={sliderEyebrow}
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>
      </Container>
    </section>
  );
}
