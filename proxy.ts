import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Web chưa hoàn thiện (giới thiệu/chương trình/đội ngũ/bảng vàng/tin tức/tuyển
// dụng/liên hệ/tra cứu/trang chủ đều còn TODO(content)) — trên DOMAIN THẬT chỉ
// cho xem các trang tuyển sinh đã xong, mọi link khác tự chuyển sang /thcs.
// KHÔNG áp dụng trên *.vercel.app — vẫn cần xem đủ mọi trang để tiếp tục làm.
// Thùy chốt 2026-07-18 — gỡ proxy này khi web hoàn thiện xong hết.
const DUOC_PHEP = [
  "/tieu-hoc",
  "/thcs",
  "/thpt",
  "/khoi-3",
  "/khoi-4",
  "/khoi-5",
  "/khoi-6",
  "/khoi-7",
  "/khoi-8",
  "/khoi-9",
  "/khoi-10",
  "/khoi-11",
  "/khoi-12",
  "/opengraph-image",
];

const TEN_MIEN_THAT = ["bkacademy.edu.vn", "www.bkacademy.edu.vn"];

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (!TEN_MIEN_THAT.includes(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Asset tĩnh (ảnh, PDF, font...) luôn cho qua — chỉ chặn điều hướng trang.
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const hopLe = DUOC_PHEP.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (hopLe) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/thcs", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
