import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("mx-auto max-w-6xl px-6 py-16 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={clsx("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-wide text-gold uppercase">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-slate-soft sm:text-lg">{description}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  target,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
  target?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants = {
    primary: "bg-ink text-white hover:bg-ink-dark",
    secondary: "border border-ink/20 text-ink hover:bg-ink/5",
    gold: "bg-gold text-white hover:bg-gold-light",
  };
  return (
    <Link href={href} target={target} className={clsx(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-semibold text-ink sm:text-5xl">{value}</p>
      <p className="mt-2 text-sm text-slate-soft">{label}</p>
    </div>
  );
}

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold",
        className
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/20 bg-paper-dim px-6 py-16 text-center">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      {description && <p className="mt-2 text-sm text-slate-soft">{description}</p>}
    </div>
  );
}

export function TodoContent({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-gold/10 px-1.5 py-0.5 text-xs font-medium text-gold" title="Cần nội dung thật từ vận hành">
      TODO(content): {children}
    </span>
  );
}
