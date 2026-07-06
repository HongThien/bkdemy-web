import type { Metadata } from "next";
import Link from "next/link";
import khoi7 from "@/content/data/khoi7.json";
import { getLopKhoi7, type LopTuyenSinh } from "@/lib/data";
import { SITE } from "@/lib/site-config";
import { Section, Card, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tuyển sinh Toán khối 7",
  description: khoi7.hero.intro,
};

function choTrong(hs: LopTuyenSinh) {
  const conLai = hs.si_so_max - hs.si_so_hien_tai;
  if (conLai <= 0) return { text: "Đã đủ sĩ số", cls: "bg-slate-100 text-slate-500 border-slate-200" };
  if (conLai <= 5) return { text: `Còn ${conLai} chỗ`, cls: "bg-orange-50 text-orange-700 border-orange-200" };
  return { text: "Đang tuyển sinh", cls: "bg-ink/5 text-ink border-ink/10" };
}

export default async function Khoi7Page() {
  const lopList = await getLopKhoi7();

  return (
    <>
      {/* ① HERO */}
      <div className="bg-ink text-white">
        <Section className="!py-16 sm:!py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-light">{khoi7.hero.eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            {khoi7.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/85">{khoi7.hero.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="#dang-ky" variant="gold">
              Đăng ký test xếp lớp
            </Button>
            <Button
              href={SITE.zaloUrl}
              target="_blank"
              variant="secondary"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Nhắn Zalo
            </Button>
          </div>
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
          {khoi7.heThong.map((h) => (
            <Card key={h.he} id={`he-${h.he.toLowerCase()}`} className="text-center scroll-mt-24">
              <p className="font-display text-3xl font-semibold text-ink">{h.he}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold">{h.ten}</p>
              <p className="mt-3 text-sm text-slate-soft">
                Mục tiêu <span className="font-semibold text-ink">{h.mucTieu}</span> · Sĩ số {h.siSo}
              </p>
              <p className="mt-3 text-xs text-slate-soft">{h.danhCho}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ③ LỚP KHỐI 7 ĐANG MỞ */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
            Lớp khối 7 đang mở
          </h2>
          {lopList.length === 0 ? (
            <p className="mx-auto mt-6 max-w-md text-center text-sm text-slate-soft">
              Khối 7 đang mở lớp mới —{" "}
              <Link href="#dang-ky" className="font-semibold text-ink hover:text-gold">
                để lại thông tin bên dưới
              </Link>{" "}
              để BK xếp lịch test.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lopList.map((lop) => {
                const trangThai = choTrong(lop);
                return (
                  <Card key={lop.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-semibold text-ink">{lop.ten_lop}</p>
                        <Link
                          href={`#he-${lop.he.toLowerCase()}`}
                          className="text-xs font-semibold uppercase tracking-wide text-gold hover:underline"
                        >
                          Hệ {lop.he}
                        </Link>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${trangThai.cls}`}>
                        {trangThai.text}
                      </span>
                    </div>
                    {lop.mo_ta && <p className="mt-3 text-sm text-slate-soft">{lop.mo_ta}</p>}
                    <div className="mt-4 space-y-1.5 border-t border-ink/10 pt-3 text-xs text-slate-soft">
                      {lop.lich && <p>📅 {lop.lich}</p>}
                      {lop.gv_dung_lop && <p>👤 GV: {lop.gv_dung_lop}</p>}
                      {lop.gv_chat_luong && <p>✓ Chất lượng: {lop.gv_chat_luong}</p>}
                      <p className="font-semibold text-ink">{lop.gia_buoi.toLocaleString("vi-VN")}đ/buổi</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Section>

      {/* ④ FAQ */}
      <Section className="max-w-3xl">
        <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">
          Phụ huynh thường hỏi
        </h2>
        <div className="mt-8 space-y-6">
          {khoi7.faq.map((f) => (
            <div key={f.hoi}>
              <p className="font-semibold text-ink">{f.hoi}</p>
              <p className="mt-1 text-sm text-slate-soft">{f.dap}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={khoi7.brochurePdf} variant="secondary" target="_blank">
            {khoi7.brochureLabel}
          </Button>
        </div>
      </Section>

      {/* ⑤ ĐĂNG KÝ / LIÊN HỆ */}
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
