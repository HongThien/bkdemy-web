import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import gioiThieu from "@/content/data/gioi-thieu.json";
import thayThuy from "@/content/data/thay-thuy.json";
import { GIAO_VIEN } from "@/content/teachers";
import { SITE, THONG_KE } from "@/lib/site-config";
import { Section } from "@/components/ui";
import { PageHero, MucTitle, DocThem, StatRow, AnhCho } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Giới thiệu về BK",
  description: gioiThieu.cauChuyen,
};

function AvatarGV({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-ink/10 bg-paper-dim">
      {src && <Image src={src} alt={alt} width={80} height={80} className="h-full w-full object-cover" />}
    </div>
  );
}

export default function GioiThieuPage() {
  const theoMon = gioiThieu.monThuTu
    .map((mon) => ({ mon, gv: GIAO_VIEN.filter((g) => g.mon.includes(mon)) }))
    .filter((x) => x.gv.length > 0);
  const khac = GIAO_VIEN.filter((g) => !g.mon.some((m) => gioiThieu.monThuTu.includes(m)));

  return (
    <>
      <PageHero eyebrow="Giới thiệu" title="BK Academy là ai" intro={gioiThieu.cauChuyen} />
      <AnhCho ma="B1" moTa="toàn cảnh cơ sở hoặc lớp học, thấy logo BK" className="mx-auto mt-6 max-w-6xl !min-h-40 sm:mx-6 lg:mx-auto" />

      <Section className="!py-8">
        <StatRow
          items={[
            { value: `${Math.floor(THONG_KE.hoc_sinh / 10) * 10}+`, label: "học sinh đang học" },
            { value: String(THONG_KE.giao_vien), label: "giáo viên đứng lớp" },
            { value: String(THONG_KE.tro_giang), label: "trợ giảng" },
          ]}
        />
      </Section>

      {/* ② Người sáng lập — đúng 3 chức danh, không chú thích (Thùy 15/10) */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Người sáng lập" title={thayThuy.ten} />
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="h-28 w-28 flex-none overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <Image src={thayThuy.anh} alt={thayThuy.ten} width={112} height={112} className="h-full w-full object-cover" />
            </div>
            <div>
              <ul className="space-y-2">
                {thayThuy.chucDanh.map((c) => (
                  <li key={c} className="flex gap-2 text-[15px] text-slate">
                    <span className="mt-1.5 text-gold">•</span>
                    {c}
                  </li>
                ))}
              </ul>
              <DocThem href="/gioi-thieu/thay-dao-xuan-thuy">Đọc bài đầy đủ về thầy Thùy</DocThem>
            </div>
          </div>
        </div>
      </Section>

      {/* ③ Giáo viên & trợ giảng — chỉ header, bên trong là từng người (Thùy 16/10) */}
      <Section>
        <MucTitle eyebrow="Giáo viên & trợ giảng" title={gioiThieu.giaoVienHeader} />
        <AnhCho ma="B3" moTa="ảnh tập thể giáo viên + trợ giảng" className="mt-6 !min-h-40" />
        <div className="mt-8 space-y-10">
          {[...theoMon, ...(khac.length ? [{ mon: "Khác", gv: khac }] : [])].map(({ mon, gv }) => (
            <div key={mon}>
              <h3 className="font-display text-xl font-semibold text-ink">{mon}</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {gv.map((g) => (
                  <div key={g.slug} className="rounded-2xl border border-ink/10 bg-white p-4 text-center">
                    <AvatarGV src={g.anh} alt={g.ten} />
                    <p className="mt-3 font-display text-[15px] font-semibold text-ink">{g.ten}</p>
                    <p className="mt-0.5 text-xs font-semibold text-gold">{g.mon.join(" · ")}</p>
                    {g.gioi_thieu && <p className="mt-2 text-xs leading-relaxed text-slate-soft">{g.gioi_thieu}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ④ Cơ sở */}
      <Section className="bg-paper-dim/60 !max-w-none" id="co-so">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Cơ sở" title="Số 17, Lô A10, KĐT Geleximco" description={`${SITE.address} · mở cửa ${SITE.workingHours}`} />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <AnhCho ma="B5" moTa="mặt tiền cơ sở có biển BK Academy" className="!min-h-56" />
            <div className="min-h-56 overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <iframe
                title="Bản đồ BK Academy"
                src={SITE.mapEmbedSrc}
                className="h-full min-h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-soft">
            Muốn biết con hợp lớp nào?{" "}
            <Link href="/dang-ky" className="font-semibold text-ink hover:text-gold">
              Đăng ký test đầu vào miễn phí →
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
