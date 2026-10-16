import type { Metadata } from "next";
import Link from "next/link";
import boTro from "@/content/data/bo-tro.json";
import { Section, Card } from "@/components/ui";
import { PageHero, AnhCho } from "@/components/PageHero";
import { CumNav } from "@/components/CumNav";

export const metadata: Metadata = {
  title: "Bổ trợ học tập",
  description: "Năm hình thức hỗ trợ học tập tại BK: bổ trợ bù, bổ trợ yếu, bổ trợ đuổi, bổ trợ ôn thi và tự luyện trên app.",
};

export default function BoTroPage() {
  return (
    <>
      <CumNav dangO="bo-tro" />
      <PageHero
        eyebrow="Cách BK dạy · 2/3"
        title="Bổ trợ học tập"
        intro="Năm hình thức hỗ trợ để con không bị bỏ lại phía sau — phần lớn là miễn phí, nằm trong quyền lợi của học sinh."
      />
      <Section className="space-y-6">
        {boTro.hinhThuc.map((h, i) => (
          <Card key={h.ten}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-xl font-semibold text-ink">
                <span className="mr-2 text-gold">0{i + 1}</span>
                {h.ten} <span className="text-sm font-normal text-slate-soft">— {h.khi}</span>
              </p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${h.phi === "Miễn phí" ? "bg-[#e4f3ea] text-[#2E7D4F]" : "bg-paper-dim text-ink"}`}>{h.phi}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-soft">{h.moTa}</p>
            <ol className="mt-3 space-y-2">
              {h.buoc.map((b, j) => (
                <li key={b} className="flex gap-3 text-sm text-slate">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">{j + 1}</span>
                  {b}
                </li>
              ))}
            </ol>
            {i === 1 && <AnhCho ma="D4a" moTa="TA kèm 1–2 em" className="mt-4 !min-h-36" />}
          </Card>
        ))}
      </Section>
      <Section className="bg-paper-dim/60 !max-w-none !py-10">
        <Card className="mx-auto max-w-6xl !border-gold/40">
          <p className="font-display text-lg font-semibold text-ink">Con đang hổng kiến thức?</p>
          <p className="mt-1 text-sm text-slate-soft">Làm bài test đầu vào miễn phí, BK chỉ rõ con cần bổ trợ phần nào.</p>
          <Link href="/dang-ky-test" className="mt-3 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-dark">
            Đăng ký test đầu vào →
          </Link>
        </Card>
      </Section>
    </>
  );
}
