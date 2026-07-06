"use client";

import { useMemo, useState } from "react";
import type { BangVangEntry } from "@/components/BangVangItem";
import { BangVangItem } from "@/components/BangVangItem";
import { EmptyState } from "@/components/ui";

export function BangVangFilter({ items }: { items: BangVangEntry[] }) {
  const khois = useMemo(
    () => Array.from(new Set(items.map((i) => i.khoi).filter(Boolean))) as string[],
    [items]
  );
  const kyThis = useMemo(
    () => Array.from(new Set(items.map((i) => i.ky_thi).filter(Boolean))) as string[],
    [items]
  );

  const [khoi, setKhoi] = useState("");
  const [ky, setKy] = useState("");

  const filtered = items.filter((i) => (!khoi || i.khoi === khoi) && (!ky || i.ky_thi === ky));

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <select
          value={khoi}
          onChange={(e) => setKhoi(e.target.value)}
          className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm text-slate"
        >
          <option value="">Tất cả khối</option>
          {khois.map((k) => (
            <option key={k} value={k}>
              Khối {k}
            </option>
          ))}
        </select>
        <select
          value={ky}
          onChange={(e) => setKy(e.target.value)}
          className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm text-slate"
        >
          <option value="">Tất cả kỳ thi</option>
          {kyThis.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="Chưa có thành tích nào" description="Thử bỏ bớt bộ lọc hoặc quay lại sau." />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <BangVangItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
