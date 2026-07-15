import { getLopTuyenSinh } from "@/lib/data";
import { SITE } from "@/lib/site-config";
import { Section, Card, Button } from "@/components/ui";
import { LopCapHocCarousel } from "@/components/LopCapHocCarousel";

// Tông "đường cong tiến bộ" C < B < A < S — cùng hệ navy/gold/paper, không màu rời rạc.
const HE_STYLE: Record<string, string> = {
  C: "!bg-paper-dim !border-ink/10",
  B: "!bg-ink/[0.06] !border-ink/20",
  A: "!bg-gold/10 !border-gold/30",
  S: "!bg-gold/15 !border-ink !border-2",
};

export type CapHocContent = {
  hero: { eyebrow: string; title: string; intro: string };
  heThong: { he: string; ten: string; mucTieu: string; siSo: string; danhCho: string }[];
  faq: { hoi: string; dap: string }[];
  brochurePdf: string;
  brochureLabel: string;
};

// Template dùng chung cho mọi trang tuyển sinh: /khoi-3..12 (1 khối/link) VÀ
// /tieu-hoc, /thcs, /thpt (nhiều khối gộp, có picker). Route riêng từng khối để share
// link theo đúng lớp con học; content (CBAS/FAQ) share theo nhóm cấp (3 file JSON) —
// sửa 1 file áp dụng cho mọi khối cùng cấp (Thùy chốt).
export async function CapHocLanding({
  khoiList,
  tenCap,
  content,
}: {
  khoiList: string[];
  tenCap?: string;
  content: CapHocContent;
}) {
  const lopList = await getLopTuyenSinh(khoiList);
  const tieuDeLop = khoiList.length === 1 ? `Lớp khối ${khoiList[0]} đang mở` : `Lớp ${tenCap ?? ""} đang mở`;

  return (
    <>
      {/* ① HERO — không đặt CTA đăng ký ở đây: link này gửi cho PH đã trong inbox Zalo,
          không phải PH lạ cần chốt ngay từ đầu trang. CTA để cuối trang (mục ⑤). */}
      <div className="bg-ink text-white">
        <Section className="!py-16 sm:!py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">{content.hero.eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            {content.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">{content.hero.intro}</p>
        </Section>
      </div>

      {/* ② BỐN HỆ NĂNG LỰC */}
      <Section>
        <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
          Bốn hệ năng lực
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-soft">
          Hệ do bài test xếp lớp quyết định, không phải phụ huynh tự chọn.
        </p>
        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {content.heThong.map((h) => (
            <Card
              key={h.he}
              id={`he-${h.he.toLowerCase()}`}
              className={`text-center scroll-mt-24 ${HE_STYLE[h.he] ?? ""}`}
            >
              <p className="font-display text-3xl font-semibold text-ink">{h.he}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold">{h.ten}</p>
              <p className="mt-3 text-sm text-slate-soft">
                Mục tiêu <span className="font-semibold text-ink">{h.mucTieu}</span>
              </p>
              <p className="text-sm text-slate-soft">Sĩ số {h.siSo}</p>
              <p className="mt-3 text-xs text-slate-soft">{h.danhCho}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ③ LỚP ĐANG MỞ — bộ lọc khối rồi mới hiện carousel đúng khối (nhiều khối/1 trang cấp) */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            {tieuDeLop}
          </h2>
          <div className="mt-6">
            <LopCapHocCarousel lopList={lopList} khoiList={khoiList} />
          </div>
        </div>
      </Section>

      {/* ④ FAQ */}
      <Section className="max-w-3xl">
        <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
          Phụ huynh thường hỏi
        </h2>
        <div className="mt-8 space-y-6">
          {content.faq.map((f) => (
            <div key={f.hoi}>
              <p className="font-semibold text-ink">{f.hoi}</p>
              <p className="mt-1 text-sm text-slate-soft">{f.dap}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={content.brochurePdf} variant="secondary" target="_blank">
            {content.brochureLabel}
          </Button>
        </div>
      </Section>

      {/* ⑤ LIÊN HỆ ZALO — CTA cuối trang duy nhất, không form */}
      <Section id="dang-ky" className="scroll-mt-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Đăng ký test xếp lớp</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-soft">
          Nhắn Zalo hoặc gọi hotline để BK xếp lịch test cho con.
        </p>
        <div className="mx-auto mt-6 max-w-sm space-y-3 text-sm text-slate">
          <p>
            Hotline:{" "}
            {SITE.hotline ? (
              <a href={`tel:${SITE.hotline}`} className="font-semibold text-ink hover:text-gold">
                {SITE.hotline}
              </a>
            ) : (
              "—"
            )}
          </p>
          <p>{SITE.address || "—"}</p>
        </div>
        <div className="mt-6">
          <Button href={SITE.zaloUrl} target="_blank" variant="gold">
            Nhắn Zalo
          </Button>
        </div>
      </Section>
    </>
  );
}
