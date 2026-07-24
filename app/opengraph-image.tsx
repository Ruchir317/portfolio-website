import { ImageResponse } from "next/og";
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
          background: "#0C0C0F",
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
            color: "#14B8A6",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#F472B6",
            }}
          />
          Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 800,
            color: "#F0EFE8",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Ruchir Jadhav
          <span style={{ color: "#14B8A6" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#7A7A8A",
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
