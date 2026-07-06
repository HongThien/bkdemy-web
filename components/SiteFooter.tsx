import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site-config";
import { TodoContent } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">{SITE.name}</p>
            <p className="mt-3 text-sm text-white/70">
              Hệ thống dạy Toán bài bản — lộ trình rõ ràng, theo sát từng học sinh bằng dữ liệu.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Liên kết</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Liên hệ</p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>
                <TodoContent>địa chỉ cơ sở</TodoContent>
              </li>
              <li>
                Hotline:{" "}
                {SITE.hotline.startsWith("TODO") ? (
                  <TodoContent>hotline</TodoContent>
                ) : (
                  <a href={`tel:${SITE.hotline}`} className="hover:text-white">
                    {SITE.hotline}
                  </a>
                )}
              </li>
              <li>
                <a href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Nhắn Zalo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.name}. Bản quyền thuộc {SITE.domain}.
        </div>
      </div>
    </footer>
  );
}
