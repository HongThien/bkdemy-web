import type { Metadata } from "next";
import thcs from "@/content/data/thcs.json";
import { CapHocLanding } from "@/components/CapHocLanding";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán THCS",
  description: thcs.hero.intro,
};

export default function ThcsPage() {
  return <CapHocLanding khoiList={["6", "7", "8", "9"]} tenCap="THCS" content={thcs} />;
}
