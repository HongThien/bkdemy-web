import type { Metadata } from "next";
import Link from "next/link";
import { CAP_HOC } from "@/lib/site-config";
import { Section, SectionTitle, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chương trình học",
  description: "5 cấp học tại BKdemy — từ Tiểu học tới THPT, mỗi cấp một lộ trình riêng.",
};

export default function ChuongTrinhPage() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Chương trình"
        title="Chương trình học theo từng cấp"
        description="Mỗi cấp học có mục tiêu, lộ trình và độ khó riêng — phù hợp với giai đoạn phát triển của con."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CAP_HOC.map((c) => (
          <Link key={c.slug} href={`/chuong-trinh/${c.slug}`}>
            <Card className="h-full hover:border-gold/40">
              <p className="font-display text-xl font-semibold text-ink">{c.ten}</p>
              <p className="mt-2 text-sm text-slate-soft">{c.moTa}</p>
              <p className="mt-4 text-sm font-semibold text-ink">Xem chi tiết →</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
