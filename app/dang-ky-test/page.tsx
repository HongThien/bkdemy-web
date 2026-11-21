import type { Metadata } from "next";
import { DangKyTestForm } from "@/components/DangKyTestForm";
import { PhanLopNoiDung } from "@/components/PhanLopNoiDung";
import { LopCapHocCarousel } from "@/components/LopCapHocCarousel";
import { getLopTuyenSinh } from "@/lib/data";
import { CamNang } from "@/components/dang-ky-test/CamNang";
import { TrangDangKyTest } from "@/components/dang-ky-test/TrangDangKyTest";

// Trang PH tự đăng ký lịch test xếp lớp (Thùy 15/10). Gửi link này qua Zalo được —
// proxy.ts đã cho phép trên domain thật. Dữ liệu/ghi: xem components/DangKyTestForm.tsx.
// 20/11: thêm thanh 3 tab (Đăng ký test · Lớp học · Cẩm nang BK) để PH tự tìm hiểu thêm
// ngay trên cùng link — mở thẳng tab bằng #lop-hoc / #cam-nang. Tab Lớp học gộp
// lớp đang mở (mọi khối, có bộ chọn khối) + hệ thống phân lớp (Thùy 20/11).
// Không cache tĩnh — lớp đang mở đọc từ ERP, sửa bên đó phải hiện ngay.
export const dynamic = "force-dynamic";
const KHOI = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const metadata: Metadata = {
  title: "Đăng ký test xếp lớp",
  description: "Bố mẹ chọn môn, khối và lịch test cho con — trung tâm sẽ liên hệ lại xác nhận.",
};

export default async function DangKyTestPage() {
  const lopList = await getLopTuyenSinh(KHOI);
  return (
    <TrangDangKyTest
      dangKy={
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">BKdemy</p>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Đăng ký test xếp lớp</h1>
          <p className="mt-3 mb-8 text-slate-soft">
            Bố mẹ chọn môn, khối và ca test phù hợp (con đến bất cứ lúc nào trong khung giờ của ca), rồi để lại tên con và số điện thoại. Hệ thống báo luôn thời gian làm bài của từng môn.
          </p>
          <DangKyTestForm />
        </div>
      }
      lopHoc={
        <>
          <section className="bg-paper-dim/60 px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">Lớp đang mở</h2>
              <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-soft">
                Bố mẹ chọn khối của con để xem lịch học, giáo viên và sĩ số từng lớp.
              </p>
              <div className="mt-6">
                <LopCapHocCarousel lopList={lopList} khoiList={KHOI} />
              </div>
            </div>
          </section>
          <PhanLopNoiDung />
        </>
      }
      camNang={<CamNang />}
    />
  );
}
