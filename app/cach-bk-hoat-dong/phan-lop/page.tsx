import type { Metadata } from "next";
import phanLop from "@/content/data/phan-lop.json";
import { SITE } from "@/lib/site-config";
import { Section, Card, Button } from "@/components/ui";
import { PageHero, MucTitle } from "@/components/PageHero";
import { CumNav } from "@/components/CumNav";

export const metadata: Metadata = {
  title: "Hệ thống phân lớp",
  description: "Bốn mức độ C/B/A/S, cơ chế bổ trợ, lộ trình chuyển lớp và 11 câu hỏi phụ huynh thường gặp — năm học 2026–2027.",
};

export default function PhanLopPage() {
  return (
    <>
      <CumNav dangO="phan-lop" />
      <PageHero
        eyebrow="Cách BK dạy · 1/3"
        title="Hệ thống phân lớp"
        intro={
          <>
            <em>Đúng người — Đúng lớp — Đúng lộ trình.</em> Mỗi học sinh có tốc độ tiếp thu, nền tảng và mục tiêu khác nhau. Một lớp chung mọi trình độ không
            giúp được cả em đang cần củng cố cơ bản lẫn em sẵn sàng chinh phục bài nâng cao. Vì vậy BK chia lớp theo bốn mức độ, mỗi mức được thiết kế nội
            dung và mục tiêu phù hợp với một nhóm học sinh cụ thể.
          </>
        }
      />

      <Section>
        <MucTitle eyebrow="Tổng quan" title="Bốn mức độ — một lộ trình" />
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-ink text-left text-white">
              <tr>
                <th className="px-3 py-2 font-semibold">Mức</th>
                <th className="px-3 py-2 font-semibold">Mục tiêu</th>
                <th className="px-3 py-2 font-semibold">Nâng cao</th>
                <th className="px-3 py-2 font-semibold">Sĩ số</th>
                <th className="px-3 py-2 font-semibold">Bổ trợ</th>
              </tr>
            </thead>
            <tbody>
              {phanLop.muc.map((m) => (
                <tr key={m.he} className="border-t border-ink/10">
                  <td className="px-3 py-2">
                    <span className="font-display text-xl font-semibold text-ink">{m.he}</span>
                    <span className="ml-2 text-xs text-slate-soft">{m.ten}</span>
                  </td>
                  <td className="px-3 py-2 font-semibold text-gold">{m.mucTieu}</td>
                  <td className="px-3 py-2">{m.nangCao}</td>
                  <td className="px-3 py-2">{m.siSo}</td>
                  <td className="px-3 py-2">{m.boTro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 rounded-xl bg-paper-dim px-4 py-3 text-sm text-slate-soft">
          Học phí buổi học chính của cả 4 mức bằng nhau. Khác biệt duy nhất: buổi bổ trợ định kỳ Lớp C (75.000 đ, bằng 50% buổi chính), tự động bao gồm khi
          đăng ký Lớp C.
        </p>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl space-y-8">
          <MucTitle eyebrow="Mô tả lớp" title="Từng mức một" />
          {phanLop.muc.map((m) => (
            <Card key={m.he} id={`lop-${m.he.toLowerCase()}`} className="scroll-mt-24">
              <div className="flex gap-4">
                <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl font-display text-3xl font-semibold text-white ${m.he === "S" ? "bg-gold" : "bg-ink"}`}>
                  {m.he}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold text-ink">
                    Lớp {m.he} · {m.ten} · mục tiêu {m.mucTieu}
                  </p>
                  <p className="mt-1 text-sm italic text-slate-soft">{m.moTa}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">Học sinh phù hợp</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-soft">
                    {m.phuHop.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-gold">•</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold">Điều kiện vào lớp</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-soft">
                    {m.dieuKien.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-gold">•</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">Cách BK đồng hành</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-soft">
                    {m.dongHanh.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-gold">•</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-xl bg-[#eef3f8] px-4 py-3 text-sm italic text-ink">{m.luuY}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <MucTitle eyebrow="Hệ thống hỗ trợ" title="Cơ chế bổ trợ" description="Bên cạnh các buổi học chính, BK duy trì hệ thống bổ trợ để mọi học sinh đều được hỗ trợ kịp thời khi cần." />
        <ul className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
          {phanLop.boTro.map((b) => (
            <li key={b.ten} className="flex items-start justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-semibold text-ink">{b.ten}</p>
                <p className="mt-0.5 text-sm text-slate-soft">{b.moTa}</p>
              </div>
              <span className={`flex-none rounded-full px-3 py-1 text-xs font-semibold ${b.phi === "Miễn phí" ? "bg-[#e4f3ea] text-[#2E7D4F]" : "bg-paper-dim text-ink"}`}>
                {b.phi}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-xl bg-[#eef3f8] px-4 py-3 text-sm text-ink">
          BK cam kết duy trì các buổi bổ trợ miễn phí như một phần quyền lợi của học sinh — không thu thêm phí khi học sinh cần được hỗ trợ vá kiến thức hay ôn thi.
        </p>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle
            eyebrow="Cơ chế chuyển lớp"
            title="Lộ trình thăng tiến"
            description="BK đánh giá học sinh thường xuyên để mỗi em luôn ở đúng lớp. Việc chuyển lớp giữa năm là cơ chế quan trọng — không có học sinh nào bị &quot;đóng khung&quot; ở một mức cố định."
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="font-semibold text-ink">Ba yếu tố song song — không yếu tố nào riêng lẻ quyết định</p>
              <ul className="mt-3 space-y-3">
                {phanLop.tieuChiChuyen.map((t, i) => (
                  <li key={t.ten} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">{i + 1}</span>
                    <span>
                      <span className="font-semibold text-ink">{t.ten}</span> — <span className="text-slate-soft">{t.moTa}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-ink">Cơ chế &quot;thử đệm 2 tuần&quot; khi chuyển lên</p>
              <ol className="mt-3 space-y-3">
                {phanLop.thuDem.map((b, i) => (
                  <li key={b} className="flex gap-3 text-sm text-slate-soft">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold text-xs font-semibold text-white">{i + 1}</span>
                    {b}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Card className="mt-6">
            <p className="font-semibold text-ink">Chuyển xuống lớp thấp hơn</p>
            <p className="mt-1 text-sm text-slate-soft">{phanLop.chuyenXuong}</p>
          </Card>
        </div>
      </Section>

      <Section>
        <MucTitle eyebrow="Hỏi đáp thường gặp" title="Quý phụ huynh thường hỏi" />
        <div className="mt-6 divide-y divide-ink/10">
          {phanLop.faq.map((f, i) => (
            <details key={f.hoi} className="group py-4" open={i === 0}>
              <summary className="cursor-pointer list-none font-semibold text-ink">
                <span className="mr-2 text-gold">{String(i + 1).padStart(2, "0")}</span>
                {f.hoi}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-soft">{f.dap}</p>
            </details>
          ))}
        </div>
        <Button href={SITE.phanLopPdf} variant="secondary" target="_blank" className="mt-6">
          ⬇ Tải tài liệu đầy đủ (PDF, 13 trang)
        </Button>
      </Section>
    </>
  );
}
