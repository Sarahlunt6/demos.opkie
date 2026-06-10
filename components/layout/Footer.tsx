import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "./Container";
import { formatHours, formatTime } from "@/lib/format";

const { practice, hours, nav, social } = siteConfig;

/**
 * Footer — renders NAP identically from config (PRD 7 local SEO).
 * Hairline rules, no background color shift from the page.
 */
export function Footer() {
  const grouped = formatHours(hours);

  return (
    <footer className="border-t border-ink-line">
      <Container className="py-section">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Identity + NAP */}
          <div className="md:col-span-4">
            <p className="font-display text-2xl tracking-tight text-graphite">
              {practice.name}
            </p>
            <p className="eyebrow mt-3">{practice.tagline}</p>

            <address className="mt-6 not-italic text-smoke">
              <p>{practice.address.street}</p>
              <p>
                {practice.address.suite}
                {practice.address.suite ? " · " : ""}
                {practice.address.city}, {practice.address.state}{" "}
                {practice.address.zip}
              </p>
              <p className="mt-3">
                <a href={practice.phoneHref} className="text-graphite">
                  {practice.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${practice.email}`} className="text-graphite">
                  {practice.email}
                </a>
              </p>
            </address>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2">
              {nav.footer.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-smoke hover:text-graphite">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="md:col-span-3">
            <p className="eyebrow">Services</p>
            <ul className="mt-4 space-y-2">
              {nav.footer.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-smoke hover:text-graphite">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div className="md:col-span-3">
            <p className="eyebrow">Hours</p>
            <ul className="mt-4 space-y-2">
              {grouped.map((row) => (
                <li key={row.label} className="flex justify-between text-smoke">
                  <span>{row.label}</span>
                  <span>
                    {row.open === null
                      ? "Closed"
                      : `${formatTime(row.open)} – ${formatTime(row.close!)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 flex flex-col gap-4 border-t border-ink-line pt-6 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {practice.foundedYear}
            {"–"}
            {new Date().getFullYear()} {practice.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <a href={social.instagram} className="hover:text-graphite">
                Instagram
              </a>
            </li>
            <li>
              <a href={social.facebook} className="hover:text-graphite">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
