import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const ogSize = { width: 1200, height: 630 };

// Share card for detail pages. Palette matches lib/colors.json (see CLAUDE.md).
export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: palette.bg,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: palette.accent,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: palette.secondary }} />
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 64 : 80,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: palette.textPrimary,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: palette.textMuted }}>
          <span>{footer ?? "Ruchir Jadhav"}</span>
          <span style={{ color: palette.accent }}>ruchirjadhav.dev</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
