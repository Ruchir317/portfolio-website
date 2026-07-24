import { ImageResponse } from "next/og";

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
          background: "#0C0C0F",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 20,
          color: "#F0EFE8",
          letterSpacing: "-0.02em",
        }}
      >
        RJ
        <span style={{ color: "#14B8A6" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
