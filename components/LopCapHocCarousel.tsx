"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { LopTuyenSinh } from "@/lib/data";
import { LopCard } from "@/components/LopCard";

export function LopCapHocCarousel({
  lopList,
  khoiList,
}: {
  lopList: LopTuyenSinh[];
  khoiList: string[];
}) {
  const khoiCoLop = useMemo(() => {
    const set = new Set(lopList.map((lop) => lop.khoi));
    return khoiList.filter((k) => set.has(k));
  }, [lopList, khoiList]);

  const [khoiChon, setKhoiChon] = useState(khoiCoLop[0] ?? khoiList[0]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [khoiChon]);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  const lopTheoKhoi = lopList.filter((lop) => lop.khoi === khoiChon);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {khoiList.map((k) => {
          const coLop = khoiCoLop.includes(k);
          const dangChon = k === khoiChon;
          return (
            <button
              key={k}
              type="button"
              disabled={!coLop}
              onClick={() => setKhoiChon(k)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                dangChon
                  ? "bg-ink text-white"
                  : coLop
                    ? "border border-ink/20 text-ink hover:bg-ink/5"
                    : "cursor-not-allowed border border-dashed border-ink/15 text-slate-soft/50"
              )}
            >
              Khối {k}
            </button>
          );
        })}
      </div>

      {lopTheoKhoi.length === 0 ? (
        <p className="mx-auto mt-6 max-w-md text-center text-sm text-slate-soft">
          Khối {khoiChon} đang mở lớp mới —{" "}
          <a href="#dang-ky" className="font-semibold text-ink hover:text-gold">
            nhắn Zalo bên dưới
          </a>{" "}
          để BK xếp lịch test.
        </p>
      ) : (
        <>
          <p className="mt-4 text-center text-sm text-slate-soft">
            Đang có <span className="font-semibold text-ink">{lopTheoKhoi.length} lớp khối {khoiChon}</span>.
          </p>
          <div className="relative mt-4">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
            >
              {lopTheoKhoi.map((lop) => (
                <LopCard key={lop.id} lop={lop} className="w-[82%] shrink-0 snap-start sm:w-[380px]" />
              ))}
            </div>

            {lopTheoKhoi.length > 1 && (
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
        </>
      )}
    </div>
  );
}
