import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";
import { Section, SectionTitle, Card, TodoContent } from "@/components/ui";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Thông tin liên hệ, địa chỉ và bản đồ BKdemy.",
};

export default function LienHePage() {
  return (
    <Section className="grid gap-10 lg:grid-cols-2">
      <div>
        <SectionTitle eyebrow="Liên hệ" title="Nói chuyện với BKdemy" />
        <div className="mt-8 space-y-5 text-sm text-slate">
          <div>
            <p className="font-semibold text-ink">Địa chỉ</p>
            <p className="mt-1 text-slate-soft">{SITE.address || <TodoContent>địa chỉ cơ sở</TodoContent>}</p>
          </div>
          <div>
            <p className="font-semibold text-ink">Hotline</p>
            <p className="mt-1 text-slate-soft">
              {SITE.hotline ? (
                <a href={`tel:${SITE.hotline}`} className="hover:text-ink">
                  {SITE.hotline}
                </a>
              ) : (
                <TodoContent>số hotline</TodoContent>
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink">Zalo</p>
            <a href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-slate-soft hover:text-ink">
              {SITE.zaloUrl}
            </a>
          </div>
          <div>
            <p className="font-semibold text-ink">Giờ làm việc</p>
            <p className="mt-1 text-slate-soft">
              {SITE.workingHours || <TodoContent>giờ làm việc các ngày trong tuần</TodoContent>}
            </p>
          </div>
        </div>
      </div>

      <Card className="flex min-h-[320px] items-center justify-center overflow-hidden !p-0">
        {SITE.mapEmbedSrc ? (
          <iframe
            title="Bản đồ BKdemy"
            src={SITE.mapEmbedSrc}
            className="h-full min-h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <p className="p-6 text-center text-sm text-slate-soft">
            <TodoContent>toạ độ/link bản đồ cơ sở — sẽ nhúng Google Maps khi có</TodoContent>
          </p>
        )}
      </Card>
    </Section>
  );
}
