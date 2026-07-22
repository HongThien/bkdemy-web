import type { Metadata } from "next";
import tieuHoc from "@/content/data/tieu-hoc.json";
import { CapHocLanding } from "@/components/CapHocLanding";

// Không cache tĩnh — sửa lop_tuyen_sinh_info/ERP phải hiện ngay, không đợi deploy lại.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thông tin học tập khối 4",
  description: tieuHoc.hero.intro,
};

export default function Khoi4Page() {
  return <CapHocLanding khoiList={["4"]} content={tieuHoc} />;
}
