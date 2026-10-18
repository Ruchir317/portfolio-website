import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.bg,
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 76,
          color: palette.textPrimary,
          letterSpacing: "-0.02em",
        }}
      >
        RJ
        <span style={{ color: palette.accent }}>.</span>
      </div>
    ),
    { ...size }
  );
}
