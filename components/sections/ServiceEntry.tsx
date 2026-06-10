import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Frame } from "@/components/ui/Frame";
import { siteConfig, type Service } from "@/lib/site.config";

/**
 * One large editorial service entry — image + serif title + two-line excerpt
 * + arrow link (PRD 4.1). Alignment alternates via `imageFirst`. Shared by the
 * homepage featured list and the services hub so they stay visually identical.
 */
export function ServiceEntry({
  service,
  imageFirst,
}: {
  service: Service;
  imageFirst: boolean;
}) {
  return (
    <Reveal className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-6 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-line">
          <Frame
            alt={`${service.title} at ${siteConfig.practice.name}`}
            label={service.shortTitle}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>

      <div className={`lg:col-span-6 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
        <p className="eyebrow">{service.eyebrow}</p>
        <h3 className="mt-4 text-display-sm font-light">{service.title}</h3>
        <p className="measure mt-5 text-body-lg text-smoke">{service.excerpt}</p>
        <Link
          href={`/services/${service.slug}`}
          className="group mt-7 inline-flex items-center gap-2 text-sm text-graphite"
        >
          <span className="relative">
            Explore {service.shortTitle}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-[250ms] ease-out group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
