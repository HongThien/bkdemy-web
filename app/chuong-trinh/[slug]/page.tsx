import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAP_HOC, getCapHoc } from "@/lib/site-config";
import { getKhaiGiang } from "@/lib/data";
import { Section, Card, Button, TodoContent } from "@/components/ui";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CAP_HOC.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cap = getCapHoc(slug);
  if (!cap) return {};
  return {
    title: cap.ten,
    description: cap.moTa,
  };
}

export default async function CapHocPage({ params }: Props) {
  const { slug } = await params;
  const cap = getCapHoc(slug);
  if (!cap) notFound();

  const khaiGiang = (await getKhaiGiang()).filter((k) => k.cap === slug);

  return (
    <>
      <div className="bg-ink text-white">
        <Section className="!py-14 sm:!py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">Chương trình</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{cap.ten}</h1>
          <p className="mt-3 max-w-2xl text-white/85">{cap.moTa}</p>
        </Section>
      </div>

      <Section className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Mục tiêu</h2>
            <p className="mt-2 text-sm text-slate-soft">
              <TodoContent>{cap.mucTieu}</TodoContent>
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Đối tượng</h2>
            <p className="mt-2 text-sm text-slate-soft">
              <TodoContent>{cap.doiTuong}</TodoContent>
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Lộ trình / nội dung chính</h2>
            <ul className="mt-2 space-y-2">
              {cap.noiDung.map((n, i) => (
                <li key={i} className="text-sm text-slate-soft">
                  <TodoContent>{n}</TodoContent>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Card>
            <h2 className="font-display text-lg font-semibold text-ink">Lịch khai giảng</h2>
            {khaiGiang.length === 0 ? (
              <p className="mt-3 text-sm text-slate-soft">Liên hệ để biết lịch khai giảng gần nhất.</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {khaiGiang.map((k) => (
                  <li key={k.id} className="border-b border-ink/10 pb-3 last:border-0">
                    <p className="text-sm font-semibold text-ink">{k.ten_lop}</p>
                    <p className="text-xs text-slate-soft">
                      Khai giảng: {new Date(k.ngay_khai_giang).toLocaleDateString("vi-VN")}
                    </p>
                    {k.ghi_chu && <p className="text-xs text-slate-soft">{k.ghi_chu}</p>}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5">
              <Button href="/lien-he" className="w-full">
                Liên hệ tư vấn
              </Button>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
