import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "xUI — Modern React & Tailwind UI components";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25% 15%, rgba(168,85,247,0.25), transparent 45%), radial-gradient(circle at 80% 85%, rgba(244,63,94,0.22), transparent 45%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 32,
            color: "#a1a1aa",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #f43f5e, #d946ef, #a855f7)",
              display: "flex",
            }}
          />
          xUI
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            Beautiful components.
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              background: "linear-gradient(90deg, #fb7185, #e879f9, #c084fc)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Copy, paste, ship.
          </div>
        </div>

        <div style={{ fontSize: 30, color: "#a1a1aa" }}>
          React 19 · Tailwind CSS v4 · x-ui-self.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
