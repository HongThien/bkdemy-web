import type { Metadata } from "next";
import thcs from "@/content/data/thcs.json";
import { CapHocLanding } from "@/components/CapHocLanding";

// Không cache tĩnh — sửa lop_tuyen_sinh_info/ERP phải hiện ngay, không đợi deploy lại.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thông tin học tập khối 7",
  description: thcs.hero.intro,
};

export default function Khoi7Page() {
  return <CapHocLanding khoiList={["7"]} content={thcs} />;
}
