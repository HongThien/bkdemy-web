import type { Metadata } from "next";
import thpt from "@/content/data/thpt.json";
import { CapHocLanding } from "@/components/CapHocLanding";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán THPT",
  description: thpt.hero.intro,
};

export default function ThptPage() {
  return <CapHocLanding khoiList={["10", "11", "12"]} tenCap="THPT" content={thpt} />;
}
