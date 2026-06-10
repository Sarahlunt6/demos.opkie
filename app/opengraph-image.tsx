import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";
import { palette } from "@/lib/tokens";

// Sitewide OpenGraph / social card (PRD 7). Applies to every route unless a
// route defines its own. Rendered from config so a client swap updates it.
export const alt = `${siteConfig.practice.name} — ${siteConfig.practice.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { practice } = siteConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: palette.porcelain,
          padding: "80px",
          color: palette.graphite,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: palette.smoke,
          }}
        >
          {practice.tagline}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, width: 96, backgroundColor: palette.champagne }} />
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 92,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {practice.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: palette.smoke,
          }}
        >
          <span>
            {practice.address.city}, {practice.address.state}
          </span>
          <span>{practice.phone}</span>
        </div>
      </div>
    ),
    size,
  );
}
