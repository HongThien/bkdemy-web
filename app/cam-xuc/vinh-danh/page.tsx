import type { Metadata } from "next";
import Link from "next/link";
import vinhDanh from "@/content/data/vinh-danh.json";
import { Section } from "@/components/ui";
import { PageHero, StatRow } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Vinh danh học sinh",
  description: "Bảng vinh danh học sinh BK Academy theo tháng: Xuất sắc, Tiến bộ, Chăm chỉ.",
};

const LOAI: Record<string, { nhan: string; lop: string }> = {
  xuat_sac: { nhan: "★ Xuất sắc", lop: "bg-[#e4f3ea] text-[#2E7D4F]" },
  tien_bo: { nhan: "▲ Tiến bộ", lop: "bg-[#fff1d6] text-[#8a5a00]" },
  cham_chi: { nhan: "✎ Chăm chỉ", lop: "bg-paper-dim text-ink" },
};

function thangNhan(ym: string) {
  const [y, m] = ym.split("-");
  return `${Number(m)}/${y}`;
}

export default function VinhDanhPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuôi dưỡng cảm xúc · Vinh danh"
        title={`Vinh danh tháng ${thangNhan(vinhDanh.thang)}`}
        intro="Mỗi tháng, sau bài kiểm tra tháng, giáo viên từng lớp chọn và trung tâm duyệt các em Xuất sắc · Tiến bộ · Chăm chỉ."
      />
      <Section className="!py-8">
        <div className="max-w-xl">
          <StatRow
            items={[
              { value: String(vinhDanh.tong.xuat_sac), label: "★ Xuất sắc" },
              { value: String(vinhDanh.tong.tien_bo), label: "▲ Tiến bộ" },
              { value: String(vinhDanh.tong.cham_chi), label: "✎ Chăm chỉ" },
            ]}
          />
        </div>
      </Section>
      <Section className="!pt-0 space-y-8">
        {vinhDanh.khoi.map((k) => (
          <div key={k.khoi}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gold">
              Khối {k.khoi} · {k.lop.reduce((n, l) => n + l.giai.length, 0)} em
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {k.lop.map((l) => (
                <div key={l.ten_lop} className="rounded-2xl border border-ink/10 bg-white p-4">
                  <p className="font-display text-lg font-semibold text-ink">
                    {l.ten_lop} <span className="text-xs font-normal text-slate-soft">· {l.mon}</span>
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {l.giai.map((g) => (
                      <li key={g.ho_ten + g.loai} className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-slate">{g.ho_ten}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${LOAI[g.loai]?.lop ?? ""}`}>{LOAI[g.loai]?.nhan ?? g.loai}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-sm text-slate-soft">
          <Link href="/cam-xuc" className="font-semibold text-ink hover:text-gold">
            ← Nuôi dưỡng cảm xúc ở BK
          </Link>
        </p>
      </Section>
    </>
  );
}
