"use client";

import { useRef } from "react";
import type { LopTuyenSinh } from "@/lib/data";
import { LopCard } from "@/components/LopCard";

export function LopKhoi7Carousel({ lopList }: { lopList: LopTuyenSinh[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
      >
        {lopList.map((lop) => (
          <LopCard key={lop.id} lop={lop} className="w-[82%] shrink-0 snap-start sm:w-[380px]" />
        ))}
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
