import Link from "next/link";
import { getBangVang } from "@/lib/data";
import { CAP_HOC, CTA_TRA_CUU } from "@/lib/site-config";
import { Section, SectionTitle, Card, Button, Stat, TodoContent } from "@/components/ui";
import { ProgressCurve } from "@/components/ProgressCurve";
import { BangVangItem } from "@/components/BangVangItem";

export default async function Home() {
  const bangVang = (await getBangVang()).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <ProgressCurve className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold-light">
              Hệ thống dạy Toán bài bản
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Lộ trình rõ ràng. Tiến bộ nhìn thấy được.
            </h1>
            <p className="mt-5 text-lg text-white/85">
              BKdemy đồng hành cùng con từ Tiểu học tới THPT — mỗi buổi học, mỗi bài kiểm tra
              đều được theo dõi bằng dữ liệu, để phụ huynh luôn biết con đang ở đâu.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/chuong-trinh" variant="gold">
                Xem chương trình
              </Button>
              <Button href={CTA_TRA_CUU.href} variant="secondary" className="border-white/30 text-white hover:bg-white/10">
                {CTA_TRA_CUU.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CON SỐ THẬT */}
      <Section className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <Stat value={<TodoContentInline />} label="Học sinh đang theo học" />
        <Stat value={<TodoContentInline />} label="Năm hoạt động" />
        <Stat value={<TodoContentInline />} label="Tỉ lệ đạt nguyện vọng" />
      </Section>

      {/* 4 KHỐI CHƯƠNG TRÌNH */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Chương trình"
            title="Đồng hành theo từng cấp học"
            description="Mỗi cấp một lộ trình riêng, bám sát mục tiêu và độ khó phù hợp."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CAP_HOC.map((c) => (
              <Link key={c.slug} href={`/chuong-trinh/${c.slug}`}>
                <Card className="h-full hover:border-gold/40">
                  <p className="font-display text-lg font-semibold text-ink">{c.ten}</p>
                  <p className="mt-2 text-sm text-slate-soft">{c.moTa}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* VÌ SAO BKDEMY */}
      <Section>
        <SectionTitle title="Vì sao phụ huynh chọn BKdemy" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Lộ trình rõ ràng",
              desc: "Chương trình theo cấp học, mục tiêu cụ thể cho từng giai đoạn — không học tràn lan.",
            },
            {
              title: "Minh bạch bằng dữ liệu",
              desc: "Kết quả học, chuyên cần, tiến bộ của con — phụ huynh xem được bất cứ lúc nào.",
            },
            {
              title: "Theo sát từng con",
              desc: "Mỗi học sinh được đo tiến bộ theo từng dạng bài, không chỉ theo điểm số chung chung.",
            },
            {
              title: "Đội ngũ bài bản",
              desc: "Giáo viên được đào tạo và giám sát chất lượng giảng dạy thường xuyên.",
            },
          ].map((f) => (
            <Card key={f.title}>
              <p className="font-display text-lg font-semibold text-ink">{f.title}</p>
              <p className="mt-2 text-sm text-slate-soft">{f.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* BẢNG VÀNG PREVIEW */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle eyebrow="Bảng vàng" title="Thành tích học sinh" />
            <Link href="/bang-vang" className="hidden shrink-0 text-sm font-semibold text-ink hover:text-gold sm:block">
              Xem tất cả →
            </Link>
          </div>
          <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4">
            {bangVang.map((item) => (
              <BangVangItem key={item.id} item={item} />
            ))}
          </div>
          <Link href="/bang-vang" className="mt-4 block text-sm font-semibold text-ink hover:text-gold sm:hidden">
            Xem tất cả →
          </Link>
        </div>
      </Section>

      {/* DẢI TRA CỨU */}
      <Section className="text-center">
        <SectionTitle center title="Theo dõi kết quả học của con" description="Xem điểm, chuyên cần và tiến bộ của con bất cứ lúc nào." />
        <div className="mt-6">
          <Button href={CTA_TRA_CUU.href} variant="gold">
            {CTA_TRA_CUU.label}
          </Button>
        </div>
      </Section>
    </>
  );
}

function TodoContentInline() {
  return <TodoContent>số liệu</TodoContent>;
}
