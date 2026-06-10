import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site.config";

/**
 * Booking band (PRD 4.1) — full-width graphite section, serif headline,
 * consultation CTA, and the phone number set large and clickable.
 * `id="book"` is the in-page target for the Book a Consultation links.
 */
export function BookingBand() {
  const { practice, nav } = siteConfig;

  return (
    <section id="book" className="bg-graphite text-porcelain">
      <Container className="py-section text-center lg:py-section-lg">
        <p className="eyebrow text-champagne">Consultations</p>
        <h2 className="mx-auto mt-6 max-w-[20ch] text-display font-light text-porcelain">
          Let&rsquo;s talk about the smile you actually want
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-porcelain/70">
          A consultation is a conversation, not a sales pitch. Tell us what
          you&rsquo;d change, and we&rsquo;ll tell you honestly what it takes.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <Button
            href={practice.bookingUrl}
            surface="dark"
            variant="primary"
          >
            {nav.bookLabel}
          </Button>
          <p className="text-porcelain/70">
            or call{" "}
            <a
              href={practice.phoneHref}
              className="font-display text-2xl text-porcelain underline-offset-4 hover:text-champagne sm:text-3xl"
            >
              {practice.phone}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
