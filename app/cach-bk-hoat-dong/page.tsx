import type { Metadata } from "next";
import Link from "next/link";
import thcs from "@/content/data/thcs.json";
import phanLop from "@/content/data/phan-lop.json";
import { SITE } from "@/lib/site-config";
import { Section, Card, Button } from "@/components/ui";
import { PageHero, MucTitle, DocThem, AnhCho } from "@/components/PageHero";
import { MathMapTomTat } from "@/components/MathMapTomTat";

export const metadata: Metadata = {
  title: "Cách BK hoạt động",
  description: "Phân lớp theo năng lực, các hoạt động học tập, BK Math Map, hai ứng dụng và cam kết hai phía.",
};

const HE_STYLE: Record<string, string> = { C: "bg-ink", B: "bg-ink", A: "bg-ink", S: "bg-gold" };

// Cây hoạt động học tập — đúng 3 nhánh Thùy chốt 16/10
const HOAT_DONG = [
  {
    ten: "Học chính",
    moTa: "nơi các con được truyền đạt kiến thức",
    con: [
      { ten: "Test cuối giờ", moTa: "đánh giá buổi học chính của con có hiệu quả không" },
      { ten: "Bài tập về nhà", moTa: "con thực hành kiến thức đã học" },
    ],
  },
  {
    ten: "Học bổ trợ",
    moTa: "nơi các con được bổ trợ kiến thức",
    con: [
      { ten: "Bổ trợ bù", moTa: "khi con nghỉ học" },
      { ten: "Bổ trợ yếu", moTa: "khi con có kiến thức chưa đạt" },
      { ten: "Bổ trợ đuổi", moTa: "khi con vào lớp chậm" },
      { ten: "Bổ trợ ôn thi", moTa: "để chuẩn bị cho các kỳ thi" },
    ],
  },
  {
    ten: "Kiểm tra khảo sát tháng",
    moTa: "hoạt động đánh giá quan trọng nhất: việc học của con có hiệu quả không",
    con: [],
  },
];

export default function CachBkHoatDongPage() {
  return (
    <>
      <PageHero
        eyebrow="Cách BK hoạt động"
        title="Đúng người — Đúng lớp — Đúng lộ trình"
        intro="Từ lúc con vào BK tới từng buổi học, từng bài kiểm tra: mọi thứ được thiết kế để con học đúng sức mình và phụ huynh luôn biết con đang ở đâu."
      />
      <AnhCho ma="D1" moTa="lớp nhỏ ≤ 15 em, GV gần HS" className="mx-auto mt-6 max-w-6xl !min-h-40 sm:mx-6 lg:mx-auto" />

      {/* 1 · Phân lớp */}
      <Section>
        <MucTitle eyebrow="1 · Phân lớp theo năng lực" title="Bốn mức độ — một lộ trình" />
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {thcs.heThong.map((h) => (
            <Card key={h.he} className="flex gap-3 !p-4">
              <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl font-display text-2xl font-semibold text-white ${HE_STYLE[h.he]}`}>
                {h.he}
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-ink">{h.mucTieu}</p>
                <p className="text-xs text-slate-soft">
                  {h.ten} · {h.siSo}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-slate-soft">
          Chuyển lớp linh hoạt giữa năm: đủ điều kiện thì học thử lớp cao hơn 2 tuần, hai bên cùng đồng thuận mới chuyển. Học phí 4 mức bằng nhau.
        </p>
        <DocThem href="/cach-bk-hoat-dong/phan-lop">Đọc chi tiết hệ thống phân lớp</DocThem>
      </Section>

      {/* 2 · Các hoạt động học tập */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="2 · Các hoạt động học tập ở BK" title="Học chính · Học bổ trợ · Kiểm tra khảo sát tháng" />
          <div className="mt-6 max-w-3xl rounded-2xl border border-ink/10 bg-white px-5 py-2">
            {HOAT_DONG.map((h, i) => (
              <div key={h.ten} className={i < HOAT_DONG.length - 1 ? "border-b border-ink/10 py-4" : "py-4"}>
                <p className="font-display text-lg font-semibold text-ink">{h.ten}</p>
                <p className="text-sm text-slate-soft">{h.moTa}</p>
                {h.con.length > 0 && (
                  <ul className="mt-3 space-y-2 border-l-2 border-gold pl-4">
                    {h.con.map((c) => (
                      <li key={c.ten} className="text-sm">
                        <span className="font-semibold text-ink">{c.ten}</span>
                        <span className="text-slate-soft"> — {c.moTa}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <AnhCho ma="D2a" moTa="GV giảng ở bảng, HS ghi chép" />
            <AnhCho ma="D2b" moTa="HS làm bài cuối buổi" />
          </div>
          <DocThem href="/cach-bk-hoat-dong/bo-tro">Đọc chi tiết 5 hình thức bổ trợ</DocThem>
        </div>
      </Section>

      {/* 3 · Math Map */}
      <Section>
        <MucTitle
          eyebrow="3 · BK Math Map"
          title="Điểm số cho biết kết quả. Math Map cho biết nguyên nhân."
          description="Chương trình chia nhỏ thành từng dạng bài. Mỗi bài tập về nhà, bài cuối buổi, bài kiểm tra tháng ghi nhận con đạt hay chưa ở từng dạng — thành bản đồ năng lực của riêng con."
        />
        <div className="mt-6 max-w-2xl">
          <MathMapTomTat />
        </div>
        <DocThem href="/cach-bk-hoat-dong/math-map">Đọc chi tiết BK Math Map</DocThem>
      </Section>

      {/* 4 · Hai ứng dụng */}
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="4 · Hai ứng dụng" title="Phụ huynh theo dõi, học sinh tự luyện" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="font-display text-lg font-semibold text-ink">📱 App Phụ huynh</p>
              <p className="mt-2 text-sm text-slate-soft">
                Nhận xét sau mỗi buổi · điểm kiểm tra tháng · chuyên cần · thời khoá biểu · nộp ảnh bài tập về nhà · học phí.
              </p>
              <AnhCho ma="D5a" moTa="màn hình chính app PH" className="mt-4 !min-h-28" />
            </Card>
            <Card>
              <p className="font-display text-lg font-semibold text-ink">🎮 App Học sinh</p>
              <p className="mt-2 text-sm text-slate-soft">
                Làm bài trên lớp và ở nhà · tự luyện đúng dạng còn yếu · xem tiến bộ · nhiệm vụ và xếp hạng. Đăng nhập bằng mã học sinh của con.
              </p>
              <AnhCho ma="D5b" moTa="màn hình chính app HS" className="mt-4 !min-h-28" />
            </Card>
          </div>
        </div>
      </Section>

      {/* 5 · Cam kết hai phía */}
      <Section>
        <MucTitle eyebrow="5 · Cam kết hai phía" title="Hệ thống chỉ hiệu quả khi BK và gia đình cùng đồng hành" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="font-display text-lg font-semibold text-ink">Trách nhiệm của BK Academy</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-soft">
              {phanLop.camKet.bk.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-gold">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="font-display text-lg font-semibold text-ink">Cam kết từ gia đình</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-soft">
              {phanLop.camKet.giaDinh.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-gold">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={SITE.phanLopPdf} variant="secondary" target="_blank">
            ⬇ Hệ thống phân lớp (PDF)
          </Button>
          {SITE.camNangPdf && (
            <Button href={SITE.camNangPdf} variant="secondary" target="_blank">
              ⬇ Cẩm nang đồng hành (PDF)
            </Button>
          )}
        </div>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none !py-10">
        <Card className="mx-auto max-w-6xl !border-gold/40">
          <p className="font-display text-lg font-semibold text-ink">Muốn biết con hợp lớp nào?</p>
          <p className="mt-1 text-sm text-slate-soft">Đăng ký test đầu vào miễn phí, BK tư vấn xếp lớp.</p>
          <Link href="/dang-ky" className="mt-3 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-dark">
            Đăng ký học tại BK →
          </Link>
        </Card>
      </Section>
    </>
  );
}
