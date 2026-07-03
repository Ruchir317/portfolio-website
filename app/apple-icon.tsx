import { ImageResponse } from "next/og";

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
          background: "#0C0C0F",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 76,
          color: "#F0EFE8",
          letterSpacing: "-0.02em",
        }}
      >
        RJ
        <span style={{ color: "#E8672A" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
