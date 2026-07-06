import type { Metadata } from "next";
import { getBangVang } from "@/lib/data";
import { Section, SectionTitle } from "@/components/ui";
import { BangVangFilter } from "@/components/BangVangFilter";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bảng vàng",
  description: "Thành tích học sinh BKdemy qua các kỳ thi.",
};

export default async function BangVangPage() {
  const items = await getBangVang();

  return (
    <Section>
      <SectionTitle eyebrow="Bảng vàng" title="Thành tích học sinh" description="Vinh danh những nỗ lực và tiến bộ của học sinh BKdemy." />
      <div className="mt-8">
        <BangVangFilter items={items} />
      </div>
    </Section>
  );
}
