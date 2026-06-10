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
  porcelain: "#FAFAF8",
  enamel: "#FFFFFF",
  graphite: "#1C1B1A",
  smoke: "#6E6A66",
  champagne: "#B8A06A",
  inkLine: "#E5E2DD",
} as const;
