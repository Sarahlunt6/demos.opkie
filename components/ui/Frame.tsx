import Image from "next/image";

type Tone = "before" | "after" | "neutral";

// Placeholder tones, all token-derived (no raw hex). "before" and "after"
// differ slightly so the slider reveal is visible with placeholder blocks.
const toneClass: Record<Tone, string> = {
  before: "bg-ink-line text-smoke",
  after: "bg-graphite/10 text-graphite",
  neutral: "bg-ink-line text-smoke",
};

export interface FrameProps {
  /**
   * Real image path under /public/images. When set, renders an optimized
   * next/image. When omitted, renders a solid neutral placeholder block at the
   * same dimensions so layout is final before photography (see IMAGES.md).
   */
  src?: string;
  alt: string;
  /** Centered caption shown on the placeholder block only. */
  label?: string;
  tone?: Tone;
  /** Fill an aspect-ratio container (the common case). */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * One image slot — optimized photo when a real `src` is supplied, otherwise a
 * same-origin solid placeholder. Keeping placeholders local (not remote
 * placehold.co) removes a third-party dependency and keeps LCP fast.
 */
export function Frame({
  src,
  alt,
  label,
  tone = "neutral",
  fill = false,
  width,
  height,
  sizes,
  priority,
  className = "",
}: FrameProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center ${toneClass[tone]} ${
        fill ? "absolute inset-0 h-full w-full" : "h-full w-full"
      } ${className}`}
    >
      {label && (
        <span className="px-4 text-center text-[11px] font-medium uppercase tracking-[0.14em]">
          {label}
        </span>
      )}
    </div>
  );
}
