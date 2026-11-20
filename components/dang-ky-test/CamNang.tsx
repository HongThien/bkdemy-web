"use client";

// Tab 3 — Cẩm nang phụ huynh 2026, hiện từng trang dạng ảnh (public/cam-nang/NN.webp).
// Ảnh xuất từ file PDF gốc, ĐÃ BỎ: mục lục, trang "Quick Guide A" (có mật khẩu mặc định Cổng PH),
// bìa sau; trang "Tự luyện trên app" đã cắt dải thông tin đăng nhập ở cuối.
// Đổi cẩm nang ⇒ xuất lại ảnh rồi sửa mảng TRANG bên dưới (số trang + chiều cao).
import { useEffect, useState } from "react";
import Image from "next/image";

export const CAM_NANG_MUC = [
  { id: "cn-tom-tat", ten: "Tóm tắt", trang: 2 },
  { id: "cn-hoc-phi", ten: "Học phí", trang: 4 },
  { id: "cn-bo-tro", ten: "Bổ trợ", trang: 10 },
  { id: "cn-danh-gia", ten: "Đánh giá", trang: 16 },
] as const;

const RONG = 1240;
const CAO = 1753;
const CAO_RIENG: Record<number, number> = { 15: 1557 };
const SO_TRANG = 17;
const MO_TA: Record<number, string> = {
  1: "Bìa cẩm nang đồng hành cùng BK Academy",
  2: "Tóm tắt: học phí, hỗ trợ học tập, bản đồ năng lực",
  3: "Giới thiệu ba nội dung chính của cẩm nang",
  4: "Học phí: các khoản thu",
  5: "Học phí: chính sách khuyến mại",
  6: "Học phí: chương trình giới thiệu phụ huynh mới",
  7: "Học phí được tính như thế nào",
  8: "Chu kỳ tính và thanh toán học phí",
  9: "Học phí: phụ huynh hay hỏi",
  10: "Bổ trợ học tập: 5 hình thức",
  11: "Bổ trợ bù",
  12: "Bổ trợ yếu",
  13: "Bổ trợ đuổi",
  14: "Bổ trợ ôn thi",
  15: "Tự luyện trên app",
  16: "BK Math Map — bản đồ năng lực Toán học",
  17: "Cách phụ huynh đọc bản đồ năng lực của con",
};
const duong = (n: number) => `/cam-nang/${String(n).padStart(2, "0")}.webp`;

export function CamNang() {
  const [phong, setPhong] = useState<number | null>(null);

  useEffect(() => {
    if (phong === null) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setPhong(null);
    document.addEventListener("keydown", esc);
    const cu = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = cu;
    };
  }, [phong]);

  return (
    <div>
      <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">Cẩm nang phụ huynh 2026</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-soft">
        Học phí, các hình thức bổ trợ và cách BK đánh giá năng lực của con. Chạm vào trang để phóng to.
      </p>

      <div className="mx-auto mt-8 max-w-3xl space-y-4">
        {Array.from({ length: SO_TRANG }, (_, i) => i + 1).map((n) => {
          const muc = CAM_NANG_MUC.find((m) => m.trang === n);
          return (
            <button
              key={n}
              type="button"
              id={muc?.id}
              onClick={() => setPhong(n)}
              aria-label={`Phóng to trang ${n}: ${MO_TA[n]}`}
              className="block w-full scroll-mt-40 cursor-zoom-in overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm"
            >
              <Image
                src={duong(n)}
                alt={MO_TA[n]}
                width={RONG}
                height={CAO_RIENG[n] ?? CAO}
                unoptimized
                priority={n === 1}
                loading={n === 1 ? undefined : "lazy"}
                className="h-auto w-full"
              />
            </button>
          );
        })}
      </div>

      {phong !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={MO_TA[phong]}
          className="fixed inset-0 z-[70] overflow-auto bg-ink-dark/95"
          onClick={() => setPhong(null)}
        >
          <button
            type="button"
            onClick={() => setPhong(null)}
            aria-label="Đóng"
            className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl font-semibold text-ink shadow-lg"
          >
            ×
          </button>
          {/* Điện thoại: ảnh rộng 1000px để kéo xem ngang dọc; màn rộng: vừa khung */}
          <Image
            src={duong(phong)}
            alt={MO_TA[phong]}
            width={RONG}
            height={CAO_RIENG[phong] ?? CAO}
            unoptimized
            onClick={(e) => e.stopPropagation()}
            className="mx-auto h-auto w-[1000px] max-w-none cursor-default lg:w-full lg:max-w-5xl"
          />
        </div>
      )}
    </div>
  );
}
