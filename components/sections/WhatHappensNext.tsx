import { hubConfig } from "@/lib/hub.config";
import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";

// Step copy is the hub's own voice; the timeframe comes from config.
const steps = [
  {
    title: "Pick the style",
    body: "Choose the template that feels like your practice. One link, one decision.",
  },
  {
    title: "We make it yours",
    body: "We swap in your name, team, photos, and services — and tune the copy to your voice.",
  },
  {
    title: `Live in ${hubConfig.turnaround}`,
    body: "We launch it, connect your domain, and hand you a site that is fast and findable.",
  },
];

/** What happens next (PRD 4.1 #6) — three plain steps; timeframe from config. */
export function WhatHappensNext() {
  return (
    <section aria-labelledby="next-heading" className="border-t border-line bg-mist py-16 lg:py-24">
      <Container>
        <UtilityLabel className="block text-accent">What happens next</UtilityLabel>
        <h2 id="next-heading" className="mt-3 text-display-sm">
          From pick to live in three steps
        </h2>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-carbon pt-5">
              <span className="label text-carbon/50">Step {i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-carbon">{step.title}</h3>
              <p className="mt-2 text-sm text-carbon/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
