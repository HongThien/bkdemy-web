import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CumNav } from "@/components/CumNav";
import { PhanLopNoiDung } from "@/components/PhanLopNoiDung";

export const metadata: Metadata = {
  title: "Hệ thống phân lớp",
  description: "Bốn mức độ C/B/A/S, cơ chế bổ trợ, lộ trình chuyển lớp và 11 câu hỏi phụ huynh thường gặp — năm học 2026–2027.",
};

export default function PhanLopPage() {
  return (
    <>
      <CumNav dangO="phan-lop" />
      <PageHero
        eyebrow="Cách BK dạy · 1/3"
        title="Hệ thống phân lớp"
        intro={
          <>
            <em>Đúng người — Đúng lớp — Đúng lộ trình.</em> Mỗi học sinh có tốc độ tiếp thu, nền tảng và mục tiêu khác nhau. Một lớp chung mọi trình độ không
            giúp được cả em đang cần củng cố cơ bản lẫn em sẵn sàng chinh phục bài nâng cao. Vì vậy BK chia lớp theo bốn mức độ, mỗi mức được thiết kế nội
            dung và mục tiêu phù hợp với một nhóm học sinh cụ thể.
          </>
        }
      />
      <PhanLopNoiDung />
    </>
  );
}
