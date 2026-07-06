import type { Metadata } from "next";
import { Section, Card, Button, TodoContent } from "@/components/ui";
import gioiThieu from "@/content/data/gioi-thieu.json";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Câu chuyện và triết lý dạy học của BKdemy.",
};

export default function GioiThieuPage() {
  return (
    <>
      <div className="bg-ink text-white">
        <Section className="!py-14 sm:!py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">Giới thiệu</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Về BKdemy</h1>
        </Section>
      </div>

      <Section className="space-y-10">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Câu chuyện của chúng tôi</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-soft">
            {gioiThieu.cauChuyen || <TodoContent>câu chuyện thành lập / lý do ra đời BKdemy</TodoContent>}
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Triết lý dạy học</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-soft">
            {gioiThieu.trietLy || <TodoContent>triết lý dạy học, diễn giải cho phụ huynh dễ hiểu</TodoContent>}
          </p>
          {gioiThieu.brochurePdf && (
            <Button href={gioiThieu.brochurePdf} variant="secondary" className="mt-4" target="_blank">
              {gioiThieu.brochureLabel}
            </Button>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Cam kết</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {gioiThieu.camKet.map((c) => (
              <Card key={c.tieuDe}>
                <p className="font-semibold text-ink">{c.tieuDe}</p>
                <p className="mt-2 text-sm text-slate-soft">{c.moTa}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FUTURE: mảng Hệ thống/Đối tác nhượng quyền */}
      </Section>
    </>
  );
}
