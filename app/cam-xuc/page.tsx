import type { Metadata } from "next";
import Link from "next/link";
import vinhDanh from "@/content/data/vinh-danh.json";
import { Section, Card } from "@/components/ui";
import { PageHero, MucTitle, DocThem, StatRow, AnhCho } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Nuôi dưỡng cảm xúc",
  description: "Ở BK, con học tốt khi con thấy mình được hiểu: đúng môi trường, không khí lớp học thoải mái, tạo động lực, vinh danh mỗi tháng, sự kiện vui chơi.",
};

function thangNhan(ym: string) {
  const [y, m] = ym.split("-");
  return `${Number(m)}/${y}`;
}

export default function CamXucPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuôi dưỡng cảm xúc"
        title="Con học tốt khi con thấy mình được hiểu"
        intro="BK chú trọng xây dựng nền tảng kiến thức, nuôi dưỡng cảm xúc và hình thành nhân cách. Ở BK, một học sinh dám đặt câu hỏi, tự tin trình bày suy nghĩ hay kiên trì thử lại sau một lần làm sai — đó cũng là tiến bộ."
      />
      <AnhCho ma="H1" moTa="lớp học vui, GV ngồi cùng bàn HS" className="mx-auto mt-6 max-w-6xl !min-h-40 sm:mx-6 lg:mx-auto" />

      <Section>
        <MucTitle
          eyebrow="1 · Đúng môi trường"
          title="Được đặt vào lớp phù hợp với mình"
          description="Con không phải gồng theo bạn giỏi hơn, cũng không phải chờ bạn chậm hơn. Phân lớp theo 4 mức năng lực để mỗi em học đúng sức mình; đủ điều kiện thì thử lớp cao hơn 2 tuần, chưa sẵn sàng thì quay lại mà không ai trách. Vào lớp C không có nghĩa là con kém."
        />
        <DocThem href="/cach-bk-hoat-dong/phan-lop">Xem hệ thống phân lớp</DocThem>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none">
        <div className="mx-auto max-w-6xl">
          <MucTitle
            eyebrow="2 · Không khí lớp học"
            title="Thoải mái, không xa cách thầy cô"
            description={
              <>
                Lớp tối đa 15 em, thầy cô biết tên và biết tính từng con. Con được hỏi khi chưa hiểu, được nói khi không đồng ý, được sai mà không bị chê. Nhận
                xét sau mỗi buổi gửi phụ huynh có phần <b className="text-ink">thái độ học tập</b> bên cạnh kiến thức — BK nhìn con như một người đang lớn,
                không chỉ là một điểm số.
              </>
            }
          />
          <AnhCho ma="H2" moTa="GV/TA cúi xuống hướng dẫn 1 em, cả hai cười" className="mt-6 !min-h-40" />
        </div>
      </Section>

      <Section>
        <MucTitle
          eyebrow="3 · Tạo động lực"
          title="Học có thưởng, nỗ lực được nhìn thấy"
          description="Trên lớp: trò chơi đội trên màn hình TV cuối buổi, bảng xếp hạng buổi học. Về nhà: app Học sinh tính điểm cho mỗi lượt luyện thật, có nhiệm vụ mỗi ngày và xếp hạng theo lớp. Con được khen vì cố gắng hôm nay, không phải chờ đến kỳ thi."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <AnhCho ma="H3" moTa="cả lớp chơi game đội trên TV" className="!min-h-40" />
          <AnhCho ma="H4" moTa="màn hình app HS: nhiệm vụ, điểm" className="!min-h-40" />
        </div>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none" id="vinh-danh">
        <div className="mx-auto max-w-6xl">
          <MucTitle
            eyebrow="4 · Vinh danh mỗi tháng"
            title="Không chỉ khen điểm cao"
            description={
              <>
                Sau bài kiểm tra tháng, mỗi lớp trao ba loại giải: <b className="text-ink">Xuất sắc</b> cho kết quả, <b className="text-ink">Tiến bộ</b> cho
                em vượt lên chính mình, <b className="text-ink">Chăm chỉ</b> cho em bền bỉ mỗi ngày.
              </>
            }
          />
          <div className="mt-6 max-w-xl">
            <StatRow
              items={[
                { value: String(vinhDanh.tong.xuat_sac), label: "★ Xuất sắc" },
                { value: String(vinhDanh.tong.tien_bo), label: "▲ Tiến bộ" },
                { value: String(vinhDanh.tong.cham_chi), label: "✎ Chăm chỉ" },
              ]}
            />
            <p className="mt-2 text-xs text-slate-soft">
              Tháng {thangNhan(vinhDanh.thang)} · {vinhDanh.so_hs} em · {vinhDanh.so_lop} lớp
            </p>
          </div>
          <AnhCho ma="B4" moTa="buổi trao giải tháng" className="mt-6 !min-h-40" />
          <DocThem href="/cam-xuc/vinh-danh">Xem bảng vinh danh tháng</DocThem>
        </div>
      </Section>

      <Section>
        <MucTitle
          eyebrow="5 · Sự kiện vui chơi"
          title="Có những ngày chỉ để vui"
          description="Trung thu vừa rồi cả BK chơi hội trại trong lớp: đố vui trên TV, đội chơi, quà. Mỗi năm vài dịp như vậy để con nhớ BK không chỉ là nơi làm bài."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <AnhCho ma="H5" moTa="Trung thu 2026" className="!min-h-40" />
          <AnhCho ma="H6" moTa="sự kiện khác" className="!min-h-40" />
        </div>
      </Section>

      <Section className="bg-paper-dim/60 !max-w-none !py-10">
        <Card className="mx-auto max-w-6xl !border-gold/40">
          <p className="font-display text-lg font-semibold text-ink">Muốn con được học trong môi trường như vậy?</p>
          <p className="mt-1 text-sm text-slate-soft">Đăng ký test đầu vào miễn phí, BK tư vấn xếp lớp.</p>
          <Link href="/dang-ky" className="mt-3 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-dark">
            Đăng ký học tại BK →
          </Link>
        </Card>
      </Section>
    </>
  );
}
