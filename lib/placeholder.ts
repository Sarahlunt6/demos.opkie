/**
 * Placeholder image source generator.
 *
 * Every image slot in IMAGES.md is solid-neutral until real photography is
 * supplied. Centralizing the URLs here means the layout is final now and the
 * client swap is a single search for `ph(` to replace with a local
 * `/images/...` path. Tones are drawn from the porcelain palette so the
 * placeholders sit in the design rather than fighting it.
 *
 * The hex values below exist ONLY to render neutral placeholder blocks — they
 * are not component styling (which uses named tokens exclusively).
 */

type Tone = "before" | "after" | "neutral" | "dark";

const TONES: Record<Tone, { bg: string; fg: string }> = {
  // "before" reads slightly duller, "after" slightly brighter, so the slider
  // reveal is visible even with placeholder blocks.
  before: { bg: "E6E1D8", fg: "8A857E" },
  after: { bg: "F4F2ED", fg: "B8A06A" },
  neutral: { bg: "EFECE9", fg: "6E6A66" },
  dark: { bg: "26241F", fg: "B8A06A" },
};

export function ph(
  width: number,
  height: number,
  label: string,
  tone: Tone = "neutral",
): string {
  const { bg, fg } = TONES[tone];
  const text = encodeURIComponent(label);
  return `https://placehold.co/${width}x${height}/${bg}/${fg}?text=${text}&font=playfair-display`;
}
