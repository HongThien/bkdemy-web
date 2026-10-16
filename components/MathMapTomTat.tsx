// Khối minh hoạ Math Map: 3 trạng thái + ví dụ báo cáo (số minh hoạ từ cẩm nang PH 2026 trang 17).
export function TrangThai3() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="rounded-xl bg-[#2E9E6B] px-2 py-2 text-center text-xs font-semibold text-white">● Đạt</span>
      <span className="rounded-xl bg-[#E0A020] px-2 py-2 text-center text-xs font-semibold text-white">● Cần luyện thêm</span>
      <span className="rounded-xl bg-[#D9534F] px-2 py-2 text-center text-xs font-semibold text-white">● Yếu</span>
    </div>
  );
}

function Thanh({ ten, pct }: { ten: string; pct: number }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="w-28 text-slate-soft">{ten}</span>
      <span className="h-2 flex-1 overflow-hidden rounded-full bg-paper-dim">
        <span className="block h-full rounded-full bg-ink" style={{ width: `${pct}%` }} />
      </span>
      <span className="w-9 text-right font-semibold text-ink">{pct}%</span>
    </div>
  );
}

export function MathMapTomTat() {
  return (
    <div className="space-y-3">
      <TrangThai3 />
      <div className="rounded-2xl border border-ink/10 bg-white p-4">
        <div className="flex items-center gap-5">
          <div>
            <p className="font-display text-3xl font-semibold text-ink">66%</p>
            <p className="text-xs text-slate-soft">bản đồ đã hoàn thành</p>
          </div>
          <div className="flex-1 space-y-2">
            <Thanh ten="Đại số cơ bản" pct={79} />
            <Thanh ten="Đại số nâng cao" pct={43} />
            <Thanh ten="Hình học" pct={43} />
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-soft">22 dạng đạt · 10 cần luyện thêm · 9 yếu — ví dụ báo cáo tháng của một học sinh lớp 11.</p>
      </div>
    </div>
  );
}
