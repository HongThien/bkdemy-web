import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/Logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#FAF7F1",
            borderRadius: 20,
            padding: "18px 28px",
            width: "fit-content",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} height={72} alt="BK Academy" />
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 36, lineHeight: 1.25 }}>
          BKAcademy: Hệ thống dạy toán bài bản
        </div>
        <div style={{ fontSize: 32, marginTop: 28, color: "#D9AC5C", fontWeight: 600 }}>
          Đúng người — Đúng lớp — Đúng lộ trình
        </div>
      </div>
    ),
    { ...size }
  );
}
