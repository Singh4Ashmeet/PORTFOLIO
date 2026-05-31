import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ashmeet Singh — Backend & AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: 6,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        ASHMEET SINGH
      </div>
      <div>
        <div
          style={{
            maxWidth: 980,
            fontSize: 82,
            lineHeight: 0.95,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          Backend & AI Engineer
        </div>
        <div style={{ marginTop: 28, color: "#7dd3fc", fontSize: 28 }}>
          GuardAxis · CREDGEN AI · LinguAI
        </div>
      </div>
    </div>,
    size,
  );
}
