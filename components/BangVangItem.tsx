import { Card, Badge } from "@/components/ui";

export type BangVangEntry = {
  id: string;
  ten_hoc_sinh_hien_thi: string;
  thanh_tich: string;
  khoi: string | null;
  ky_thi: string | null;
  nam: number | null;
};

export function BangVangItem({ item }: { item: BangVangEntry }) {
  return (
    <Card className="min-w-[240px] shrink-0 snap-start">
      <Badge>{item.khoi ?? "—"}</Badge>
      <p className="mt-3 font-display text-lg font-semibold text-ink">{item.ten_hoc_sinh_hien_thi}</p>
      <p className="mt-1 text-sm text-slate">{item.thanh_tich}</p>
      <p className="mt-3 text-xs text-slate-soft">
        {[item.ky_thi, item.nam].filter(Boolean).join(" · ")}
      </p>
    </Card>
  );
}
