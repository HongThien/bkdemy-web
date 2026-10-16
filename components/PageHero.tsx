import type { ReactNode } from "react";

// Dải navy đầu mọi trang nấc 2/3 — eyebrow vàng nhạt + tiêu đề serif + 1 đoạn dẫn.
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
        {intro && <div className="mt-4 max-w-3xl text-[15px] leading-relaxed text-white/88 sm:text-base">{intro}</div>}
        {children}
      </div>
    </div>
  );
}

// Tiêu đề mục trong trang cuộn (nấc 2): số thứ tự + eyebrow + tiêu đề.
export function MucTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      {description && <div className="mt-3 text-[15px] leading-relaxed text-slate-soft">{description}</div>}
    </div>
  );
}

// Khối "Đọc chi tiết →"
export function DocThem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="mt-5 inline-flex items-center gap-1 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

// Nhóm thống kê 3 ô (dùng chung trang chủ / giới thiệu / vinh danh)
export function StatRow({ items, dark = false }: { items: { value: ReactNode; label: string }[]; dark?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((s) => (
        <div
          key={s.label}
          className={
            dark
              ? "rounded-2xl border border-white/15 bg-white/10 px-2 py-4 text-center"
              : "rounded-2xl border border-ink/10 bg-white px-2 py-4 text-center"
          }
        >
          <p className={`font-display text-2xl font-semibold sm:text-3xl ${dark ? "text-white" : "text-ink"}`}>{s.value}</p>
          <p className={`mt-1 text-[11px] leading-tight sm:text-xs ${dark ? "text-white/75" : "text-slate-soft"}`}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// Ô ảnh chưa có — mã theo design/yeu-cau-anh-web.md. Xoá khi có ảnh thật.
export function AnhCho({ ma, moTa, className = "" }: { ma: string; moTa: string; className?: string }) {
  return (
    <div
      className={`flex min-h-32 items-center justify-center rounded-2xl border-2 border-dashed border-gold/50 bg-gold/5 p-4 text-center text-xs text-gold ${className}`}
    >
      {ma} · {moTa}
    </div>
  );
}
