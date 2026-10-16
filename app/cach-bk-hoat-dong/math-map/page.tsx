import type { Metadata } from "next";
import { Section, Card } from "@/components/ui";
import { PageHero, MucTitle, AnhCho } from "@/components/PageHero";
import { CumNav } from "@/components/CumNav";
import { TrangThai3, MathMapTomTat } from "@/components/MathMapTomTat";

export const metadata: Metadata = {
  title: "BK Math Map",
  description: "Bản đồ năng lực Toán học cá nhân của từng học sinh BK Academy — phụ huynh biết con mạnh ở đâu, cần cải thiện gì.",
};

const VI_SAO = [
  "Điểm chỉ cho biết kết quả cuối cùng — không thấy con hiểu sâu hay còn lỗ hổng ở đâu.",
  "Cùng một điểm số, hai em có thể mạnh và yếu ở những phần hoàn toàn khác nhau.",
  "Điểm không chỉ ra con cần bổ sung chính xác phần kiến thức nào.",
];
const BA_BUOC = [
  { ten: "Chia nhỏ kiến thức", moTa: "Chương trình Toán được phân tích thành các dạng bài cụ thể." },
  { ten: "Ghi nhận quá trình học tập", moTa: "Theo dõi kết quả qua BTVN, Exit Test và Monthly Test." },
  { ten: "Phân tích năng lực", moTa: "Xác định mức độ đạt được của từng dạng bài để xây dựng lộ trình phù hợp." },
];
const TRANG_THAI = [
  { ten: "Đạt", moTa: "Con đã nắm vững kiến thức và kỹ năng.", mau: "bg-[#2E9E6B]" },
  { ten: "Cần luyện thêm", moTa: "Con đã hiểu cách làm nhưng còn vướng lỗi tính toán hoặc trình bày.", mau: "bg-[#E0A020]" },
  { ten: "Yếu", moTa: "Con chưa nắm chắc nền tảng và cần được giáo viên hỗ trợ.", mau: "bg-[#D9534F]" },
];
const GIA_TRI = [
  { ten: "Học đúng trọng tâm", moTa: "Con không phải học lan man, chỉ tập trung vào phần còn yếu." },
  { ten: "Minh bạch tiến bộ", moTa: "Phụ huynh theo dõi được sự tiến bộ của con theo từng giai đoạn." },
  { ten: "Lộ trình cá nhân hóa", moTa: "Giáo viên điều chỉnh hướng học sát với năng lực thực tế." },
];

export default function MathMapPage() {
  return (
    <>
      <CumNav dangO="math-map" />
      <PageHero
        eyebrow="Cách BK dạy · 3/3"
        title="BK Math Map"
        intro="Bản đồ năng lực Toán học cá nhân của từng học sinh. Phụ huynh biết chính xác: con đang mạnh ở đâu, cần cải thiện gì, nên tập trung vào phần kiến thức nào."
      />
      <Section>
        <MucTitle eyebrow="Vì sao điểm số chưa đủ" title="Điểm số cho biết kết quả. BK Math Map giúp hiểu nguyên nhân." />
        <ol className="mt-6 space-y-3">
          {VI_SAO.map((v, i) => (
            <li key={v} className="flex gap-3 text-[15px] text-slate">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">{i + 1}</span>
              {v}
            </li>
          ))}
        </ol>
      </Section>
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Hệ thống 3 bước của BK" title="Chia nhỏ → Ghi nhận → Phân tích" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {BA_BUOC.map((b, i) => (
              <Card key={b.ten}>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">Bước {i + 1}</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">{b.ten}</p>
                <p className="mt-2 text-sm text-slate-soft">{b.moTa}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <MucTitle eyebrow="Cách đọc bản đồ năng lực của con" title="Ba trạng thái" />
        <div className="mt-6 max-w-2xl space-y-3">
          <TrangThai3 />
          <ul className="space-y-2">
            {TRANG_THAI.map((t) => (
              <li key={t.ten} className="flex gap-3 text-sm">
                <span className={`mt-1 h-3 w-3 flex-none rounded-full ${t.mau}`} />
                <span>
                  <span className="font-semibold text-ink">{t.ten}</span> — <span className="text-slate-soft">{t.moTa}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Báo cáo minh hoạ</p>
          <div className="mt-3">
            <MathMapTomTat />
          </div>
          <AnhCho ma="D3" moTa="ảnh chụp báo cáo tháng thật trên app PH (ẩn tên)" className="mt-4 !min-h-48" />
        </div>
      </Section>
      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle eyebrow="Giá trị phụ huynh và học sinh nhận được" title="Không để con học lại những điều đã biết. Không bỏ sót những lỗ hổng chưa được phát hiện." />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {GIA_TRI.map((g) => (
              <Card key={g.ten}>
                <p className="font-display text-lg font-semibold text-ink">{g.ten}</p>
                <p className="mt-2 text-sm text-slate-soft">{g.moTa}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
