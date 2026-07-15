import type { Metadata } from "next";
import thcs from "@/content/data/thcs.json";
import { CapHocLanding } from "@/components/CapHocLanding";

// Không cache tĩnh — sửa lop_tuyen_sinh_info/ERP phải hiện ngay, không đợi deploy lại.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 9",
  description: thcs.hero.intro,
};

export default function Khoi9Page() {
  return <CapHocLanding khoiList={["9"]} content={thcs} />;
}
