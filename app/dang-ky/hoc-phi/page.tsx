import type { Metadata } from "next";
import hocPhi from "@/content/data/hoc-phi.json";
import { Section, Card } from "@/components/ui";
import { PageHero, MucTitle } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Học phí & ưu đãi",
  description: "Các khoản thu, chính sách ưu đãi, chương trình giới thiệu phụ huynh mới, chu kỳ thanh toán và câu hỏi thường gặp về học phí tại BK Academy.",
};

export default function HocPhiPage() {
  return (
    <>
      <PageHero
        eyebrow="Đăng ký học · Học phí"
        title="Rõ ràng, minh bạch, tiện lợi"
        intro="Mọi khoản thu, cách tính và ưu đãi đều công khai từ đầu để gia đình chủ động kế hoạch tài chính cho con."
      />
      <Section>
        <MucTitle eyebrow="Các khoản thu" title="Học phí tính theo số buổi học thực tế" />
        <ul className="mt-6 max-w-3xl divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white px-5">
          {hocPhi.khoanThu.map((k) => (
            <li key={k.ten} className="flex items-start justify-between gap-4 py-4">
              <div>
                <p className="font-semibold text-ink">{k.ten}</p>
                <p className="mt-0.5 text-sm text-slate-soft">{k.moTa}</p>
              </div>
              <span className={`flex-none font-display text-lg font-semibold ${k.gia === "Miễn phí" ? "text-[#2E7D4F]" : "text-ink"}`}>{k.gia}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl rounded-xl bg-paper-dim px-4 py-3 text-sm text-slate-soft">{hocPhi.phatSinh}</p>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Ưu đãi học phí" title="Học nhiều hơn, tiết kiệm hơn" description={hocPhi.uuDaiGhiChu} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {hocPhi.uuDai.map((u) => (
              <Card key={u.dieuKien} className="text-center">
                <p className="font-display text-3xl font-semibold text-gold">{u.muc}</p>
                <p className="mt-1 text-sm text-slate-soft">{u.dieuKien}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {hocPhi.hienGioiThieu && (
        <Section>
          <MucTitle eyebrow="Giới thiệu phụ huynh mới" title="Cùng BK lan toả giá trị" description={hocPhi.gioiThieuGhiChu} />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {hocPhi.gioiThieu.map((g) => (
              <Card key={g.ai} className="text-center">
                <p className="font-display text-2xl font-semibold text-gold">{g.muc}</p>
                <p className="mt-1 text-sm text-slate-soft">{g.ai}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Chu kỳ tính & thanh toán" title="Hằng tháng, bốn bước" />
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hocPhi.chuKy.map((c, i) => (
              <li key={c.ten} className="rounded-2xl border border-ink/10 bg-white p-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">{i + 1}</span>
                <p className="mt-2 font-semibold text-ink">{c.ten}</p>
                <p className="mt-1 text-sm text-slate-soft">{c.moTa}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <MucTitle eyebrow="Phụ huynh hay hỏi" title="Về học phí" />
        <div className="mt-4 max-w-3xl divide-y divide-ink/10">
          {hocPhi.faq.map((f, i) => (
            <details key={f.hoi} className="py-4" open={i === 0}>
              <summary className="cursor-pointer list-none font-semibold text-ink">
                <span className="mr-2 text-gold">{String(i + 1).padStart(2, "0")}</span>
                {f.hoi}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-soft">{f.dap}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
