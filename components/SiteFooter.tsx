import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">{SITE.name}</p>
            <p className="mt-1 text-sm text-white/80">{SITE.subtitle}</p>
            <p className="mt-3 text-sm italic text-white/60">{SITE.tagline}</p>
          </div>
          <div>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2 text-sm text-white/80">
            <p>{SITE.address}</p>
            <p>
              Hotline{" "}
              <a href={`tel:${SITE.hotline.replace(/\s/g, "")}`} className="font-semibold text-white hover:text-gold-light">
                {SITE.hotline}
              </a>
            </p>
            <p>{SITE.workingHours}</p>
            <p>
              <a href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Chat Zalo với BK
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
        </div>
      </div>
    </footer>
  );
}
