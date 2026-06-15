import type { HubTemplate } from "@/lib/hub.config";
import { Container } from "@/components/layout/Container";
import { UtilityLabel } from "@/components/ui/UtilityLabel";
import { Button } from "@/components/ui/Button";
import { DevicePreview } from "@/components/interactive/DevicePreview";

/**
 * Template section (PRD 4.1 #4) — identical structure for every template so the
 * five are effortless to compare: utility label + codename, positioning line,
 * live device preview, three differentiators (signature first), and the tracked
 * "View the live site" action. The section id and tabindex let the sticky index
 * and the Style Finder jump and focus here.
 */
export function TemplateSection({
  template,
  priority = false,
}: {
  template: HubTemplate;
  priority?: boolean;
}) {
  return (
    <section
      id={`template-${template.id}`}
      tabIndex={-1}
      aria-labelledby={`template-${template.id}-heading`}
      className="scroll-mt-24 border-t border-line py-16 outline-none lg:py-24"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Preview */}
          <DevicePreview template={template} priority={priority} />

          {/* Content */}
          <div>
            <UtilityLabel className="block text-carbon/60">
              {template.label} — {template.name}
            </UtilityLabel>
            <UtilityLabel className="mt-1 block text-accent">
              For {template.bestFor}
            </UtilityLabel>

            <h2
              id={`template-${template.id}-heading`}
              className="mt-5 text-display-sm"
            >
              {template.positioning}
            </h2>

            <ul className="mt-7 space-y-4">
              {template.differentiators.map((point, i) => (
                <li key={point} className="flex gap-3 text-carbon/80">
                  <span
                    aria-hidden="true"
                    className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${
                      i === 0 ? "bg-accent" : "bg-line"
                    }`}
                  />
                  <span>
                    {i === 0 && (
                      <span className="font-medium text-carbon">
                        {template.signatureFeature}.{" "}
                      </span>
                    )}
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href={`/go/${template.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the live site
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
