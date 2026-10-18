import { ImageResponse } from "next/og";
import { palette } from "@/lib/palette";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 20,
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
