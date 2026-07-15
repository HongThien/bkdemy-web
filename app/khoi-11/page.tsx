import type { Metadata } from "next";
import thpt from "@/content/data/thpt.json";
import { CapHocLanding } from "@/components/CapHocLanding";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 11",
  description: thpt.hero.intro,
};

export default function Khoi11Page() {
  return <CapHocLanding khoiList={["11"]} content={thpt} />;
}
