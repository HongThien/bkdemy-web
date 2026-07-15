import type { Metadata } from "next";
import tieuHoc from "@/content/data/tieu-hoc.json";
import { CapHocLanding } from "@/components/CapHocLanding";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 3",
  description: tieuHoc.hero.intro,
};

export default function Khoi3Page() {
  return <CapHocLanding khoiList={["3"]} content={tieuHoc} />;
}
