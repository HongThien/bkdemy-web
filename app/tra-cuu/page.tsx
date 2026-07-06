import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";
import { Section, SectionTitle, Card, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tra cứu kết quả",
  description: "Phụ huynh theo dõi kết quả học tập của con, học sinh vào làm bài ET online.",
};

export default function TraCuuPage() {
  return (
    <Section>
      <SectionTitle
        center
        eyebrow="Tra cứu"
        title="Theo dõi & làm bài"
        description="Chọn đúng cổng dành cho bạn — mỗi cổng có tài khoản đăng nhập riêng."
      />
      <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
        <Card className="flex flex-col">
          <p className="font-display text-xl font-semibold text-ink">Phụ huynh</p>
          <p className="mt-2 flex-1 text-sm text-slate-soft">
            Theo dõi con: kết quả học, điểm, chuyên cần, thời khóa biểu.
          </p>
          <Button href={SITE.phPortalUrl} target="_blank" className="mt-5">
            Vào cổng phụ huynh
          </Button>
        </Card>

        <Card className="flex flex-col">
          <p className="font-display text-xl font-semibold text-ink">Học sinh</p>
          <p className="mt-2 flex-1 text-sm text-slate-soft">
            Vào làm bài (ET online), xem tiến bộ của bản thân.
          </p>
          <Button href={SITE.hocUrl} target="_blank" variant="gold" className="mt-5">
            Vào làm bài
          </Button>
        </Card>
      </div>
    </Section>
  );
}
