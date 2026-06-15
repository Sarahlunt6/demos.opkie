import { hubConfig } from "@/lib/hub.config";
import { Container } from "./Container";

const { contact } = hubConfig;

const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

/**
 * Footer (PRD 4.1 #9) — Opkie identity + contact, minimal. NAP rendered from
 * config so it is identical everywhere it appears.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-studio-white">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold tracking-tight text-carbon">Opkie</p>
          <p className="mt-1 text-sm text-carbon/60">
            High-performance websites for dental practices.
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm sm:items-end">
          <a href={telHref} className="font-medium text-carbon hover:text-accent">
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-carbon/70 hover:text-accent"
          >
            {contact.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
