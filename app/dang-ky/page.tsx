import type { Metadata } from "next";
import Link from "next/link";
import hocPhi from "@/content/data/hoc-phi.json";
import { getLopTuyenSinh } from "@/lib/data";
import { SITE } from "@/lib/site-config";
import { Section, Card, Button } from "@/components/ui";
import { PageHero, MucTitle, DocThem, AnhCho } from "@/components/PageHero";
import { LopCapHocCarousel } from "@/components/LopCapHocCarousel";
import { ZaloButton } from "@/components/ZaloButton";

// Lớp đang mở đọc live từ bkdemy-ph — không cache tĩnh.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Đăng ký học tại BK",
  description: "Ba bước để con vào đúng lớp: đăng ký, test đầu vào miễn phí, xếp lớp theo hệ. Lớp đang mở, học phí và ưu đãi.",
};

const BUOC = [
  { ten: "Đăng ký", moTa: "điền form đăng ký test online, hoặc nhắn Zalo / gọi hotline" },
  { ten: "Test đầu vào miễn phí", moTa: "tại trung tâm, BK chấm và trao đổi với phụ huynh" },
  { ten: "Xếp lớp theo hệ", moTa: "C/B/A/S đúng sức con, bắt đầu học; lệch tiến độ thì có bổ trợ đuổi" },
];
const KHOI = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const CAP = [
  { ten: "Tiểu học", href: "/tieu-hoc" },
  { ten: "THCS", href: "/thcs" },
  { ten: "THPT", href: "/thpt" },
];
const FAQ = [
  { hoi: "Test đầu vào có khó không, có mất phí không?", dap: "Miễn phí. Đề theo đúng khối con đang học, mục đích là biết con mạnh yếu ở đâu để xếp đúng lớp, không phải để loại." },
  { hoi: "Con vào giữa năm có học kịp không?", dap: "Được. Nếu lớp đã học trước một phần, BK xếp 2–4 buổi bổ trợ đuổi (nhóm 1–1 hoặc 1–2) để con theo kịp các bạn." },
  { hoi: "Xếp vào lớp C có nghĩa là con kém?", dap: "Không. Lớp C dành cho học sinh có nền tảng còn lỗ hổng, là mức có cường độ chăm sóc cao nhất tại BK: sĩ số nhỏ nhất, có buổi bổ trợ định kỳ riêng." },
];

export default async function DangKyPage() {
  const lopList = await getLopTuyenSinh(KHOI);

  return (
    <>
      <PageHero
        eyebrow="Đăng ký học · 2026–2027"
        title="Ba bước để con vào đúng lớp"
        intro="Mọi học sinh mới đều làm bài test đầu vào miễn phí để BK biết con đang ở đâu và xếp đúng hệ."
      />
      <Section className="!py-8">
        <ol className="grid gap-3 sm:grid-cols-3">
          {BUOC.map((b, i) => (
            <li key={b.ten} className="flex gap-3 rounded-2xl border border-ink/10 bg-white p-4">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink font-semibold text-white">{i + 1}</span>
              <div>
                <p className="font-semibold text-ink">{b.ten}</p>
                <p className="mt-0.5 text-sm text-slate-soft">{b.moTa}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href="/dang-ky-test" variant="gold">
            Đăng ký test đầu vào
          </Button>
          <ZaloButton />
        </div>
        <AnhCho ma="E1" moTa="HS làm test đầu vào / PH tư vấn ở bàn tiếp đón" className="mt-6 !min-h-40" />
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Lớp đang mở" title="Chọn khối của con" description="Lịch học, sĩ số và giáo viên đứng lớp lấy sống từ hệ thống của BK." />
          <div className="mt-4 flex flex-wrap gap-2">
            {CAP.map((c) => (
              <Link key={c.href} href={c.href} className="rounded-full border border-ink/20 bg-white px-4 py-1.5 text-sm font-semibold text-ink hover:bg-ink/5">
                {c.ten} →
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <LopCapHocCarousel lopList={lopList} khoiList={KHOI} />
          </div>
        </div>
      </Section>

      <Section>
        <MucTitle eyebrow="Học phí & ưu đãi" title="Rõ ràng từ đầu" />
        <ul className="mt-6 max-w-2xl divide-y divide-ink/10">
          {hocPhi.khoanThu.map((k) => (
            <li key={k.ten} className="flex items-baseline justify-between gap-4 py-3 text-sm">
              <span className="text-slate">{k.ten}</span>
              <span className={`flex-none font-display text-base font-semibold ${k.gia === "Miễn phí" ? "text-[#2E7D4F]" : "text-ink"}`}>{k.gia}</span>
            </li>
          ))}
          <li className="flex items-baseline justify-between gap-4 py-3 text-sm">
            <span className="text-slate">Ưu đãi 2–3 môn / 4 môn / anh chị em</span>
            <span className="flex-none font-display text-base font-semibold text-ink">−5% · −10% · −5%</span>
          </li>
        </ul>
        <DocThem href="/dang-ky/hoc-phi">Đọc chi tiết học phí, ưu đãi, chu kỳ thanh toán</DocThem>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Hỏi nhanh" title="Trước khi đăng ký" />
          <div className="mt-4 divide-y divide-ink/10">
            {FAQ.map((f, i) => (
              <details key={f.hoi} className="py-3" open={i === 0}>
                <summary className="cursor-pointer list-none font-semibold text-ink">{f.hoi}</summary>
                <p className="mt-2 text-sm text-slate-soft">{f.dap}</p>
              </details>
            ))}
          </div>
          <Card className="mt-6 !border-gold/40">
            <p className="font-display text-lg font-semibold text-ink">Sẵn sàng?</p>
            <p className="mt-1 text-sm text-slate-soft">
              Đăng ký test online, hoặc gọi {SITE.hotline} ({SITE.workingHours}).
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button href="/dang-ky-test" variant="gold">
                Đăng ký test đầu vào
              </Button>
              <Button href={SITE.zaloUrl} variant="secondary" target="_blank">
                Nhắn Zalo
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
