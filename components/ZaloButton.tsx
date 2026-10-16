import { SITE } from "@/lib/site-config";

// Nút "Chat Zalo với BK" — Thùy 15/10: thay cho số điện thoại; SĐT ghi nhỏ bên dưới.
export function ZaloButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 rounded-2xl bg-[#0068FF] px-5 py-3 text-white shadow-md transition-transform hover:scale-[1.01] ${className}`}
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white text-xs font-bold text-[#0068FF]">
        Zalo
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[15px] font-semibold">Chat Zalo với BK</span>
        <span className="block text-xs opacity-85">trả lời {SITE.workingHours}</span>
      </span>
    </a>
  );
}

export function DongLienHe({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-slate-soft ${className}`}>
      Hotline{" "}
      <a href={`tel:${SITE.hotline.replace(/\s/g, "")}`} className="font-semibold text-ink">
        {SITE.hotline}
      </a>{" "}
      · {SITE.address}
    </p>
  );
}
