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

const TEN_THU: Record<string, string> = {
  T2: "Thứ 2",
  T3: "Thứ 3",
  T4: "Thứ 4",
  T5: "Thứ 5",
  T6: "Thứ 6",
  T7: "Thứ 7",
  CN: "Chủ Nhật",
};

// lop.lich đến dạng "T3 18:00–19:30 · T6 18:00–19:30" (xem lib/data.ts) — parse ra
// từng khung giờ để hiện tên thứ đầy đủ + tính số phút/buổi cho ô Học phí.
function parseKhungGio(raw: string): { text: string; phut: number | null } {
  const match = raw.match(/^(\S+)\s+(\d{1,2}):(\d{2})[–-](\d{1,2}):(\d{2})$/);
  if (!match) return { text: raw, phut: null };
  const [, thuMa, h1, m1, h2, m2] = match;
  const tenThu = TEN_THU[thuMa] ?? thuMa;
  const phut = (Number(h2) * 60 + Number(m2)) - (Number(h1) * 60 + Number(m1));
  return { text: `${tenThu}, ${h1}:${m1} - ${h2}:${m2}`, phut };
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
  const khungGioList = lop.lich ? lop.lich.split(" · ").map(parseKhungGio) : [];
  const phutMoiBuoi = khungGioList.find((k) => k.phut != null)?.phut ?? null;

  return (
    <Card className={className}>
      {/* Định danh lớp — không boxed, đứng ngoài các khung thông tin bên dưới */}
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

      {/* Khung thông tin riêng biệt: mô tả / lịch học / học phí / trạng thái lớp.
          Thiếu mô tả thì bỏ hẳn khung đó, không hiện khung rỗng (đúng quy ước chung của site). */}
      <div className="mt-4 space-y-2.5">
        {lop.mo_ta && (
          <InfoBox label="Mô tả">
            <p>{lop.mo_ta}</p>
          </InfoBox>
        )}

        {khungGioList.length > 0 && (
          <InfoBox label="Lịch học">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {khungGioList.map((k, i) => (
                <span key={k.text} className="flex items-center gap-x-2">
                  {i > 0 && <span className="text-ink/30">-</span>}
                  <span className="whitespace-nowrap font-medium text-ink">{k.text}</span>
                </span>
              ))}
            </div>
          </InfoBox>
        )}

        <InfoBox label="Học phí">
          <p className="font-semibold text-ink">
            {lop.gia_buoi.toLocaleString("vi-VN")}đ/buổi{phutMoiBuoi != null && `/${phutMoiBuoi} phút`}
          </p>
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
