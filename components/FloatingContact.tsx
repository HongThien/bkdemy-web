import { SITE } from "@/lib/site-config";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={SITE.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn Zalo"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-sky text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="text-xs font-bold">Zalo</span>
      </a>
      <a
        href={SITE.hotline.startsWith("TODO") ? "/lien-he" : `tel:${SITE.hotline}`}
        aria-label="Gọi hotline"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19.5c0 .6-.4 1-1 1C10.6 20.5 3.5 13.4 3.5 4.9c0-.6.4-1 1-1H7.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
