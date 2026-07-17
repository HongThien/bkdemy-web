import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LopTuyenSinh } from "@/lib/data";
import { Card } from "@/components/ui";

function trangThaiSiSo(lop: LopTuyenSinh) {
  const conLai = lop.si_so_max - lop.si_so_hien_tai;
  const phanTram = Math.min(100, Math.round((lop.si_so_hien_tai / lop.si_so_max) * 100));
  if (conLai <= 0) return { text: "Đã đủ sĩ số", phanTram: 100, mau: "bg-slate-300" };
  if (conLai <= 5) return { text: `Còn ${conLai} chỗ trống`, phanTram, mau: "bg-gold" };
  return { text: "Đang tuyển sinh", phanTram, mau: "bg-sky" };
}

// Mỗi mục thông tin 1 khung riêng, có biên giới rõ — tránh cảm giác chữ dồn chung 1 khối (Thùy chốt).
function InfoBox({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-paper-dim/50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">{label}</p>
      <div className="mt-1.5 text-sm text-slate-soft">{children}</div>
    </div>
  );
}

export function LopCard({ lop, className = "" }: { lop: LopTuyenSinh; className?: string }) {
  const trangThai = trangThaiSiSo(lop);

  return (
    <Card className={className}>
      {/* Định danh lớp — không boxed, đứng ngoài 4 khung thông tin bên dưới */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl font-semibold text-ink">{lop.ten_lop}</p>
          <Link
            href={`#he-${lop.he.toLowerCase()}`}
            className="text-xs font-semibold uppercase tracking-wide text-gold hover:underline"
          >
            Hệ {lop.he}
          </Link>
        </div>

        {(lop.gv_dung_lop || lop.gv_dung_lop_anh) && (
          <div className="flex shrink-0 items-center gap-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-paper-dim">
              {lop.gv_dung_lop_anh && (
                <Image src={lop.gv_dung_lop_anh} alt={lop.gv_dung_lop ?? "GV"} fill sizes="40px" className="object-cover" />
              )}
            </div>
            <div>
              <p className="text-xs text-slate-soft">Giáo viên</p>
              <p className="text-sm font-semibold text-ink">{lop.gv_dung_lop ?? "—"}</p>
            </div>
          </div>
        )}
      </div>

      {/* 4 khung thông tin riêng biệt: mô tả / lịch học / học phí / trạng thái lớp */}
      <div className="mt-4 space-y-2.5">
        {lop.mo_ta && (
          <InfoBox label="Mô tả">
            <p>{lop.mo_ta}</p>
          </InfoBox>
        )}

        {lop.lich && (
          <InfoBox label="Lịch học">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {lop.lich.split(" · ").map((khungGio) => (
                <span key={khungGio} className="whitespace-nowrap font-medium text-ink">
                  {khungGio}
                </span>
              ))}
            </div>
          </InfoBox>
        )}

        <InfoBox label="Học phí">
          <p className="font-semibold text-ink">{lop.gia_buoi.toLocaleString("vi-VN")}đ/buổi</p>
        </InfoBox>

        <InfoBox label="Trạng thái lớp">
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
            <div className={`h-full rounded-full ${trangThai.mau}`} style={{ width: `${trangThai.phanTram}%` }} />
          </div>
          <p className="mt-1.5 text-xs">
            {lop.si_so_hien_tai}/{lop.si_so_max} học sinh · <span className="font-semibold text-ink">{trangThai.text}</span>
          </p>
        </InfoBox>
      </div>
    </Card>
  );
}
