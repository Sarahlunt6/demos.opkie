import { ImageResponse } from "next/og";
import { hubConfig } from "@/lib/hub.config";
import { palette } from "@/lib/tokens";

// OG / social card (PRD 7) — the link gets shared in emails and texts, so the
// preview must be impeccable. Neutral hub identity (studio-white, carbon), the
// five templates as a strip; the only color is each template's brand hue, which
// also makes the five panels legible at thumbnail size.
export const alt = `Opkie — five dental website templates: ${hubConfig.templates
  .map((t) => t.name)
  .join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { templates } = hubConfig;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: palette.studioWhite,
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              fontWeight: 500,
              color: palette.carbon,
              opacity: 0.5,
            }}
          >
            OPKIE WEBSITE STUDIO
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              maxWidth: 900,
              fontSize: 68,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              fontWeight: 600,
              color: palette.carbon,
            }}
          >
            Five websites, ready for your practice.
          </div>
        </div>

        {/* Five-template strip */}
        <div style={{ display: "flex", gap: 20 }}>
          {templates.map((t) => (
            <div
              key={t.id}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderRadius: 10,
                border: `1px solid ${palette.line}`,
                overflow: "hidden",
                backgroundColor: palette.studioWhite,
              }}
            >
              {/* Browser-chrome bar in the template's brand hue */}
              <div
                style={{
                  display: "flex",
                  height: 16,
                  backgroundColor: t.brandHue,
                }}
              />
              {/* Body */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: 150,
                  padding: "18px 16px",
                  backgroundColor: palette.mist,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: 15,
                    letterSpacing: 2,
                    fontWeight: 500,
                    color: palette.carbon,
                    opacity: 0.5,
                  }}
                >
                  {t.label.toUpperCase()}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 8,
                    fontSize: 26,
                    fontWeight: 600,
                    color: palette.carbon,
                  }}
                >
                  {t.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
