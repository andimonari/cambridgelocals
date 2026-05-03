import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Cambridge Locals — Local insights for students, tourists & professionals"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #818cf8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.05em",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          Cambridge, England
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Cambridge Locals
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Local insights for students, tourists &amp; professionals
        </div>
      </div>
    ),
    { ...size }
  )
}
