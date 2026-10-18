import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";
import { resume } from "@/data/resume";

export const alt = "Ruchir Jadhav — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: palette.bg,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: palette.accent,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: palette.secondary,
            }}
          />
          Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 800,
            color: palette.textPrimary,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Ruchir Jadhav
          <span style={{ color: palette.accent }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: palette.textMuted,
            marginTop: 32,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {resume.headline}
        </div>
      </div>
    ),
    { ...size }
  );
}
