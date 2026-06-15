import Link from "next/link";
import { hubConfig } from "@/lib/hub.config";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";

const { contact } = hubConfig;

// Phone as a tel: href, non-numeric stripped.
const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

/**
 * Header (PRD 4.1 #1) — Opkie wordmark left; phone + "Talk to us" button right.
 * No nav items by design: the sticky template index is the page's navigation,
 * and the button carries the conversion. Slim, hairline bottom border.
 */
export function Header() {
  return (
    <header className="border-b border-line bg-studio-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-carbon">
          Opkie
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={telHref}
            className="hidden text-sm font-medium text-carbon underline-offset-4 hover:text-accent sm:inline"
          >
            {contact.phone}
          </a>
          <Button href={contact.bookingUrl}>Talk to us</Button>
        </div>
      </Container>
    </header>
  );
}
