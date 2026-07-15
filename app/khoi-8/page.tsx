import type { Metadata } from "next";
import thcs from "@/content/data/thcs.json";
import { CapHocLanding } from "@/components/CapHocLanding";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 8",
  description: thcs.hero.intro,
};

export default function Khoi8Page() {
  return <CapHocLanding khoiList={["8"]} content={thcs} />;
}
