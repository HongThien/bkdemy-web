import Link from "next/link";
import clsx from "clsx";

// Khối 3 tạm ẩn — ERP chưa có lớp thật, thêm lại khi có (Thùy chốt 2026-07).
const TOAN_BO_KHOI = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];

// Thanh chuyển khối — hiện ở MỌI trang tuyển sinh (1 khối riêng /khoi-N, và cả
// 3 trang gộp /tieu-hoc /thcs /thpt) để PH có con học nhiều khối khác nhau
// (VD lớp 9 + lớp 4) luôn nhảy được sang khối khác, không cần biết trang gộp
// đang giới hạn trong 1 cấp. Không đổi Hero/CBAS theo khối — chỉ là link điều
// hướng, bấm là chuyển hẳn trang (Thùy chốt: đơn giản hơn là ghép nội dung động).
export function ChonKhoiNav({ khoiDangXem }: { khoiDangXem: string[] }) {
  return (
    <div className="border-b border-ink/10 bg-paper-dim/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 py-4">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-soft">
          Xem khối khác:
        </span>
        {TOAN_BO_KHOI.map((k) => (
          <Link
            key={k}
            href={`/khoi-${k}`}
            className={clsx(
              "rounded-full px-3 py-1 text-sm font-semibold transition-colors",
              khoiDangXem.includes(k)
                ? "bg-ink text-white"
                : "border border-ink/20 text-ink hover:bg-ink/5"
            )}
          >
            {k}
          </Link>
        ))}
      </div>
    </div>
  );
}
