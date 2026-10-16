import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import thayThuy from "@/content/data/thay-thuy.json";
import { Section, Card } from "@/components/ui";
import { AnhCho } from "@/components/PageHero";

export const metadata: Metadata = {
  title: thayThuy.ten,
  description: thayThuy.doan[0],
};

export default function ThayThuyPage() {
  return (
    <Section className="max-w-3xl">
      <p className="text-xs text-slate-soft">
        <Link href="/gioi-thieu" className="hover:text-ink">
          Giới thiệu
        </Link>{" "}
        › Người sáng lập
      </p>
      <div className="mt-4 flex items-center gap-5">
        <div className="h-24 w-24 flex-none overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <Image src={thayThuy.anh} alt={thayThuy.ten} width={96} height={96} className="h-full w-full object-cover" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{thayThuy.ten}</h1>
      </div>
      <ul className="mt-5 space-y-1.5">
        {thayThuy.chucDanh.map((c) => (
          <li key={c} className="flex gap-2 text-[15px] text-slate">
            <span className="mt-1.5 text-gold">•</span>
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-slate">
        {thayThuy.doan.map((p, i) => (
          <div key={i} className="space-y-5">
            <p>{p}</p>
            {i === 1 && (
              <>
                <AnhCho ma="C1" moTa="thầy đang đứng lớp, HS phía trước" className="!min-h-48" />
                <Card className="!bg-[#eef3f8] !border-0">
                  <p className="font-display text-lg italic text-ink">&ldquo;{thayThuy.trich}&rdquo;</p>
                </Card>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="font-display text-lg font-semibold text-ink">Cách BK hoạt động</p>
          <p className="mt-1 text-sm text-slate-soft">Phân lớp, Math Map, bổ trợ</p>
          <Link href="/cach-bk-hoat-dong" className="mt-3 inline-block text-sm font-semibold text-ink hover:text-gold">
            Xem →
          </Link>
        </Card>
        <Card>
          <p className="font-display text-lg font-semibold text-ink">Đội ngũ giáo viên</p>
          <p className="mt-1 text-sm text-slate-soft">Hệ thống giáo viên Trẻ trung và Tâm lý</p>
          <Link href="/gioi-thieu#giao-vien" className="mt-3 inline-block text-sm font-semibold text-ink hover:text-gold">
            Xem →
          </Link>
        </Card>
      </div>
    </Section>
  );
}
