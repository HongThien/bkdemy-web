import type { Metadata } from "next";
import tieuHoc from "@/content/data/tieu-hoc.json";
import { CapHocLanding } from "@/components/CapHocLanding";

// Không cache tĩnh — sửa lop_tuyen_sinh_info/ERP phải hiện ngay, không đợi deploy lại.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán Tiểu học",
  description: tieuHoc.hero.intro,
};

export default function TieuHocPage() {
  return <CapHocLanding khoiList={["3", "4", "5"]} tenCap="Tiểu học" content={tieuHoc} />;
}
