import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#1E3A5F",
          color: "#FAF7F1",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#D9AC5C", fontWeight: 700, letterSpacing: 2 }}>
          BKDEMY
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.2 }}>
          Hệ thống dạy Toán bài bản
        </div>
        <div style={{ fontSize: 28, marginTop: 20, color: "#FAF7F1CC" }}>
          Lộ trình rõ ràng. Tiến bộ nhìn thấy được.
        </div>
      </div>
    ),
    { ...size }
  );
}
