import type { Metadata } from "next";
import { CAREERS } from "@/content/careers";
import { SITE } from "@/lib/site-config";
import { Section, SectionTitle, Card, Button, Badge, TodoContent } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Cơ hội việc làm tại BKdemy — Trợ giảng, Giáo viên Toán.",
};

export default function TuyenDungPage() {
  return (
    <>
      <Section>
        <SectionTitle
          eyebrow="Tuyển dụng"
          title="Gia nhập BKdemy"
          description="Chúng tôi luôn tìm kiếm những người đồng hành bài bản, tận tâm với học sinh."
        />
        <div className="mt-10 space-y-6">
          {CAREERS.map((c) => (
            <Card key={c.slug}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{c.title}</p>
                  <Badge className="mt-2">{c.type}</Badge>
                </div>
                <Button
                  href={SITE.careerApplyUrl || `mailto:${SITE.careerApplyEmail}`}
                  target={SITE.careerApplyUrl ? "_blank" : undefined}
                  variant="secondary"
                >
                  Ứng tuyển
                </Button>
              </div>
              <p className="mt-3 text-sm text-slate-soft">
                <TodoContent>{c.description}</TodoContent>
              </p>
            </Card>
          ))}
        </div>

        {/* FUTURE: 'Gia nhập hệ thống' cho đối tác */}
      </Section>
    </>
  );
}
