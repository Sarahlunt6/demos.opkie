import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { TransformationSlider } from "@/components/interactive/TransformationSlider";
import { siteConfig } from "@/lib/site.config";

/**
 * Smile gallery preview (PRD 4.1) — three interactive comparison cases and a
 * link to the full gallery. The signature slider repeats here at smaller scale.
 */
export function GalleryPreview() {
  const cases = siteConfig.gallery.slice(0, 3);

  return (
    <section className="border-t border-ink-line">
      <Container className="py-section lg:py-section-lg">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Smile Gallery</p>
            <h2 className="mt-4 max-w-[16ch] text-display font-light">
              Real work, shown plainly
            </h2>
          </div>
          <AnimatedLink href="/smile-gallery" className="text-sm">
            View the full gallery
          </AnimatedLink>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {cases.map((c) => (
            <Reveal key={c.id}>
              <TransformationSlider
                beforeAlt={c.beforeAlt}
                afterAlt={c.afterAlt}
                label={`Case ${c.id}`}
                aspect="4 / 5"
                eyebrow={`Case ${c.id} — ${c.procedure}`}
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
