import Link from "next/link";
import clsx from "clsx";
import { SITE, HOME_STATS } from "@/lib/site-config";
import { StatRow } from "@/components/PageHero";
import { ZaloButton, DongLienHe } from "@/components/ZaloButton";

// Trang chủ = NẤC 1: chỉ ô, không bài viết (Thùy chốt 15/10). Web dành cho người MỚI.
const O = [
  { href: "/gioi-thieu", ten: "Giới thiệu về BK", icon: "🏫", bg: "bg-[#EEF3F9]", ic: "bg-[#D7E3F1]" },
  { href: "/cach-bk-hoat-dong", ten: "Cách BK hoạt động", icon: "🧭", bg: "bg-[#FBF3E4]", ic: "bg-[#F3E2BE]" },
  { href: "/cam-xuc", ten: "Nuôi dưỡng cảm xúc", icon: "💛", bg: "bg-[#FDEEEE]", ic: "bg-[#F6D3D3]" },
  { href: "/dang-ky", ten: "Đăng ký học tại BK", icon: "📝", bg: "bg-[#EAF5EE]", ic: "bg-[#CFE8D8]" },
  { href: "/tai-lieu", ten: "Tài liệu ôn tập", icon: "📚", bg: "bg-[#F5EEF7]", ic: "bg-[#E5D6EA]", rong: true },
];

export default function Home() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-6 py-9 sm:py-12 lg:grid lg:grid-cols-[1fr_440px] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">{SITE.tagline}</p>
            <h1 className="mt-2 font-display text-[26px] font-semibold leading-tight sm:text-4xl">
              {SITE.subtitle} {SITE.name}
            </h1>
          </div>
          <div className="mt-6 lg:mt-0">
            <StatRow dark items={HOME_STATS} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-6 sm:py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {O.map((o) => (
            <Link
              key={o.href}
              href={o.href}
              className={clsx(
                "relative flex items-center justify-center rounded-3xl border border-ink/10 p-4 text-center transition-shadow hover:shadow-md",
                o.bg,
                o.rong ? "col-span-2 flex-row gap-4 py-5 lg:col-span-1 lg:aspect-square lg:flex-col lg:gap-0" : "aspect-square flex-col"
              )}
            >
              <span className={clsx("flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-3xl", o.ic, !o.rong && "mb-3", o.rong && "lg:mb-3")}>
                {o.icon}
              </span>
              <span className="font-display text-[17px] font-semibold leading-tight text-ink">{o.ten}</span>
              <span className="absolute bottom-3 right-4 text-lg text-gold" aria-hidden="true">
                ›
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <ZaloButton className="w-full" />
          <DongLienHe className="mt-3 text-center" />
        </div>
      </section>
    </>
  );
}
