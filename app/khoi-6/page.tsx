import type { Metadata } from "next";
import thcs from "@/content/data/thcs.json";
import { CapHocLanding } from "@/components/CapHocLanding";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 6",
  description: thcs.hero.intro,
};

export default function Khoi6Page() {
  return <CapHocLanding khoiList={["6"]} content={thcs} />;
}
