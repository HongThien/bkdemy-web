"use client";

// Khung 3 tab của /dang-ky-test — link gửi cho PH ĐÃ nhắn Zalo.
// Cả 3 khối luôn được dựng, chỉ ẩn/hiện ⇒ PH điền dở form, sang xem Phân lớp / Cẩm nang
// rồi quay lại vẫn còn nguyên. Nội dung từng tab do app/dang-ky-test/page.tsx truyền vào.
// Link mở thẳng tab bằng #: /dang-ky-test#phan-lop · #cam-nang (mặc định: đăng ký).
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import clsx from "clsx";
import { CAM_NANG_MUC } from "./CamNang";

const TABS = [
  { id: "dang-ky", ten: "Đăng ký test", an: false },
  { id: "phan-lop", ten: "Phân lớp", an: false },
  { id: "cam-nang", ten: "Cẩm nang BK", an: false },
  // Chờ gom feedback thật của phụ huynh — có nội dung thì thêm khối + đổi an: false
  { id: "feedback", ten: "Phụ huynh nói gì", an: true },
].filter((t) => !t.an);
type TabId = "dang-ky" | "phan-lop" | "cam-nang";

function theoDoiHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}
const layHash = () => window.location.hash.slice(1);

export function TrangDangKyTest({ dangKy, phanLop, camNang }: { dangKy: ReactNode; phanLop: ReactNode; camNang: ReactNode }) {
  const hash = useSyncExternalStore(theoDoiHash, layHash, () => "");
  const tab: TabId = TABS.some((t) => t.id === hash) ? (hash as TabId) : "dang-ky";

  // Thanh tab bám ngay dưới header chung của site (cao khác nhau giữa điện thoại / máy tính)
  const [dinh, setDinh] = useState(65);
  useEffect(() => {
    const h = document.querySelector("header");
    if (!h) return;
    const ro = new ResizeObserver(() => setDinh(Math.round(h.getBoundingClientRect().height)));
    ro.observe(h);
    return () => ro.disconnect();
  }, []);

  function doiTab(id: string) {
    window.location.assign(`#${id}`); // bắn hashchange ⇒ tab đổi; nút Back của máy quay lại tab trước
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="bg-paper">
      <div className="sticky z-30 border-b border-ink/10 bg-paper/95 backdrop-blur" style={{ top: dinh }}>
        <div role="tablist" aria-label="Nội dung" className="mx-auto flex max-w-3xl gap-1 px-3 sm:px-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`khoi-${t.id}`}
              onClick={() => doiTab(t.id)}
              className={clsx(
                "flex-1 border-b-[3px] px-2 py-3.5 text-sm font-semibold transition-colors sm:text-base",
                tab === t.id ? "border-gold text-ink" : "border-transparent text-slate-soft hover:text-ink"
              )}
            >
              {t.ten}
            </button>
          ))}
        </div>
        {tab === "cam-nang" && (
          <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-3 pb-2.5 pt-2 sm:px-6">
            {CAM_NANG_MUC.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => document.getElementById(m.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="shrink-0 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm font-medium text-slate hover:border-ink/40"
              >
                {m.ten}
              </button>
            ))}
          </div>
        )}
      </div>

      <div role="tabpanel" id="khoi-dang-ky" aria-labelledby="tab-dang-ky" hidden={tab !== "dang-ky"}>
        {dangKy}
      </div>

      <div role="tabpanel" id="khoi-phan-lop" aria-labelledby="tab-phan-lop" hidden={tab !== "phan-lop"}>
        {phanLop}
        <div className="pb-16 text-center">
          <button
            type="button"
            onClick={() => doiTab("dang-ky")}
            className="rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-white hover:bg-ink-dark"
          >
            Đăng ký test xếp lớp
          </button>
        </div>
      </div>

      <div role="tabpanel" id="khoi-cam-nang" aria-labelledby="tab-cam-nang" hidden={tab !== "cam-nang"}>
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">{camNang}</div>
      </div>
    </div>
  );
}
