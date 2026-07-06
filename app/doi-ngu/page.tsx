import type { Metadata } from "next";
import { TEACHERS } from "@/content/teachers";
import { Section, SectionTitle } from "@/components/ui";
import { TeacherCard } from "@/components/TeacherCard";

export const metadata: Metadata = {
  title: "Đội ngũ giáo viên",
  description: "Đội ngũ giáo viên BKdemy — được đào tạo bài bản, đồng hành cùng học sinh.",
};

export default function DoiNguPage() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Đội ngũ"
        title="Giáo viên BKdemy"
        description="Được đào tạo bài bản, giám sát chất lượng giảng dạy thường xuyên."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEACHERS.map((t) => (
          <TeacherCard key={t.slug} teacher={t} />
        ))}
      </div>
    </Section>
  );
}
