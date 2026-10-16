import type { Metadata } from "next";
import Link from "next/link";
import danhSach from "@/content/data/tai-lieu-danh-sach.json";
import { Section, Card } from "@/components/ui";
import { PageHero, MucTitle } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Tài liệu ôn tập — đề thi, đề cương có đáp án",
  description: "Đề thi giữa kì, cuối kì, đề cương ôn tập Toán 6–9 của các trường ở Hà Nội — miễn phí, có đáp án do giáo viên BK Academy soát.",
};

const KIEU: Record<string, string> = { de_thi: "Đề thi", de_cuong: "Đề cương" };

export default function TaiLieuPage() {
  const theoKhoi = ["6", "7", "8", "9"].map((k) => ({ khoi: k, de: danhSach.de.filter((d) => d.khoi === k) })).filter((x) => x.de.length);

  return (
    <>
      <PageHero
        eyebrow="Tài liệu"
        title="Đề thi, đề cương miễn phí — có đáp án"
        intro="Đề thật từ các trường ở Hà Nội, đáp án đã được giáo viên BK soát. Lời giải chi tiết gửi qua Zalo khi đăng ký."
      />
      <Section className="!py-8">
        <div className="flex flex-wrap gap-2">
          {["Tất cả", "Toán 6", "Toán 7", "Toán 8", "Toán 9", "Vào 10"].map((t, i) => (
            <span key={t} className={`rounded-full border px-3 py-1 text-sm ${i === 0 ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink"}`}>
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm text-slate">
          Trang từng đề (nội dung đề, đáp án, tải PDF) đang được đưa lên theo lô — lô đầu tiên là Toán 8. Danh sách dưới đây là các đề đã có trong kho của BK.
        </p>
      </Section>
      <Section className="!pt-0 space-y-10">
        {theoKhoi.map(({ khoi, de }) => (
          <div key={khoi}>
            <MucTitle eyebrow={`Toán ${khoi}`} title={`${de.length} đề`} />
            <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
              {de.map((d) => (
                <li key={d.ten} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{d.ten}</p>
                    <p className="mt-0.5 text-xs text-slate-soft">
                      {KIEU[d.kieu] ?? d.kieu}
                      {d.nam ? ` · ${d.nam}` : ""}
                      {d.so_cau ? ` · ${d.so_cau} câu` : ""}
                    </p>
                  </div>
                  <span className="flex-none rounded-full bg-paper-dim px-2 py-0.5 text-[11px] font-semibold text-slate-soft">sắp có</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Card className="!border-gold/40">
          <p className="font-display text-lg font-semibold text-ink">Con đang ôn thi giữa kì?</p>
          <p className="mt-1 text-sm text-slate-soft">BK có lớp theo đúng sức con, sĩ số nhỏ, bổ trợ miễn phí khi hổng kiến thức.</p>
          <Link href="/dang-ky" className="mt-3 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-dark">
            Xem lớp đang mở →
          </Link>
        </Card>
      </Section>
    </>
  );
}
