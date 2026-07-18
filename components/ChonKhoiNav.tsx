import Link from "next/link";
import clsx from "clsx";

// Khối 3 tạm ẩn — ERP chưa có lớp thật, thêm lại khi có (Thùy chốt 2026-07).
const TOAN_BO_KHOI = ["4", "5", "6", "7", "8", "9", "10", "11", "12"];

// Thanh chuyển khối — chỉ hiện trên trang 1 khối riêng (/khoi-N), không hiện ở
// /tieu-hoc /thcs /thpt (3 trang đó đã có picker lọc data riêng, thêm cái này vào sẽ trùng ý).
export function ChonKhoiNav({ khoiHienTai }: { khoiHienTai: string }) {
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
              k === khoiHienTai
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
