import { SITE } from "@/lib/site-config";

// Nút nổi: chỉ Zalo (Thùy 15/10 — bỏ nút gọi, SĐT đã ở chân trang).
export function FloatingContact() {
  return (
    <a
      href={SITE.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo với BK"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="text-xs font-bold tracking-wide">Zalo</span>
    </a>
  );
}
