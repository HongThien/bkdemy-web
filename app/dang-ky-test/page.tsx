import type { Metadata } from "next";
import { DangKyTestForm } from "@/components/DangKyTestForm";

// Trang PH tự đăng ký lịch test xếp lớp (Thùy 15/10). Gửi link này qua Zalo được —
// proxy.ts đã cho phép trên domain thật. Dữ liệu/ghi: xem components/DangKyTestForm.tsx.
export const metadata: Metadata = {
  title: "Đăng ký test xếp lớp",
  description: "Bố mẹ chọn lịch test cho con — trung tâm sẽ liên hệ lại xác nhận.",
};

export default function DangKyTestPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">BKdemy</p>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Đăng ký test xếp lớp</h1>
        <p className="mt-3 mb-8 text-slate-soft">
          Bố mẹ chọn lớp, trường, môn và giờ test phù hợp. Mỗi môn một ca riêng — hệ thống báo luôn giờ con làm xong để bố mẹ tiện đón.
        </p>
        <DangKyTestForm />
      </div>
    </div>
  );
}
