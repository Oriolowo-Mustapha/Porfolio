import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f2ec",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#8a7a68" }}>
          {site.role.toUpperCase()} — {site.location.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, color: "#1c1a17" }}>
            Oriolowo
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1.02,
              color: "#1c1a17",
            }}
          >
            Mustapha
            <span style={{ color: "#a8551a" }}>.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              marginTop: 32,
              color: "#5a544a",
              maxWidth: 780,
            }}
          >
            Secure, scalable backends with C#/.NET and TypeScript/Node.js
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #d5cfc2",
            paddingTop: 24,
            fontSize: 20,
            color: "#8a7a68",
          }}
        >
          <span>aphabase.dev</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    size,
  );
}
