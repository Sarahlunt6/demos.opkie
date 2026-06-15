import { hubConfig } from "@/lib/hub.config";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const { contact } = hubConfig;
const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

/**
 * Final CTA band (PRD 4.1 #8) — carbon. "Found yours?" + "Tell us your pick"
 * (booking from config) + a large, clickable phone number.
 */
export function FinalCta() {
  return (
    <section className="bg-carbon text-studio-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-display-sm text-studio-white">Found yours?</h2>
            <p className="measure mt-3 text-studio-white/70">
              Tell us which template fits and we will make it yours.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href={contact.bookingUrl} variant="onCarbon">
              Tell us your pick
            </Button>
            <a
              href={telHref}
              className="text-xl font-semibold text-studio-white underline-offset-4 hover:underline"
            >
              {contact.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
