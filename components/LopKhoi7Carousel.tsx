"use client";

import { useRef } from "react";
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

export function LopKhoi7Carousel({ lopList }: { lopList: LopTuyenSinh[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-lop-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
      >
        {lopList.map((lop) => {
          const trangThai = trangThaiSiSo(lop);
          return (
            <Card
              key={lop.id}
              data-lop-card
              className="w-[85vw] max-w-[360px] shrink-0 snap-start sm:w-[360px]"
            >
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
                <p className="shrink-0 font-semibold text-ink">{lop.gia_buoi.toLocaleString("vi-VN")}đ/buổi</p>
              </div>

              {(lop.gv_dung_lop || lop.gv_dung_lop_anh) && (
                <div className="mt-4 flex items-center gap-3 border-t border-ink/10 pt-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-paper-dim">
                    {lop.gv_dung_lop_anh && (
                      <Image src={lop.gv_dung_lop_anh} alt={lop.gv_dung_lop ?? "GV"} fill sizes="48px" className="object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-soft">GV phụ trách chính</p>
                    <p className="text-sm font-semibold text-ink">{lop.gv_dung_lop ?? "—"}</p>
                  </div>
                </div>
              )}

              {lop.mo_ta && <p className="mt-4 text-sm text-slate-soft">{lop.mo_ta}</p>}

              {lop.lich && (
                <p className="mt-4 text-sm text-slate-soft">
                  <span className="font-semibold text-ink">Lịch học:</span> {lop.lich}
                </p>
              )}

              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-paper-dim">
                  <div className={`h-full rounded-full ${trangThai.mau}`} style={{ width: `${trangThai.phanTram}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-slate-soft">
                  {lop.si_so_hien_tai}/{lop.si_so_max} học sinh · <span className="font-semibold text-ink">{trangThai.text}</span>
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {lopList.length > 1 && (
        <div className="mt-2 flex justify-center gap-3">
          <button
            type="button"
            aria-label="Lớp trước"
            onClick={() => scrollBy(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-ink/5"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Lớp tiếp theo"
            onClick={() => scrollBy(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-ink/5"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
