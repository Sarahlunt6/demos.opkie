/**
 * JS-side palette mirror.
 *
 * The canonical token source is `@theme` in app/globals.css. A few non-CSS
 * contexts need the raw values too — the generated OG image (next/og) and the
 * browser theme-color meta — and cannot read CSS custom properties. This file
 * mirrors those six values for exactly those contexts. Keep it in sync with
 * globals.css; it is the only sanctioned place for palette hex outside CSS.
 */
export const palette = {
  porcelain: "#FAFBFC", // neutral-25
  enamel: "#FFFFFF", // neutral-0
  graphite: "#16191D", // neutral-900
  smoke: "#3A434E", // neutral-700
  champagne: "#6FA0D6", // blue-400
  inkLine: "#E5E9ED", // neutral-100
} as const;
