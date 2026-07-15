import type { Metadata } from "next";
import thpt from "@/content/data/thpt.json";
import { CapHocLanding } from "@/components/CapHocLanding";

// Không cache tĩnh — sửa lop_tuyen_sinh_info/ERP phải hiện ngay, không đợi deploy lại.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 12",
  description: thpt.hero.intro,
};

export default function Khoi12Page() {
  return <CapHocLanding khoiList={["12"]} content={thpt} />;
}
