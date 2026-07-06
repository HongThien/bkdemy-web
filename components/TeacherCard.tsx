import Image from "next/image";
import { Card, TodoContent } from "@/components/ui";

export type Teacher = {
  slug: string;
  name: string;
  photo: string;
  education: string;
  specialty: string;
  intro: string;
};

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-paper-dim">
        <Image src={teacher.photo} alt={teacher.name || "Ảnh giáo viên"} fill sizes="112px" className="object-cover" />
      </div>
      <p className="mt-4 font-display text-lg font-semibold text-ink">
        {teacher.name || <TodoContent>tên giáo viên</TodoContent>}
      </p>
      <p className="mt-1 text-sm font-medium text-gold">
        {teacher.specialty || <TodoContent>chuyên môn</TodoContent>}
      </p>
      <p className="mt-1 text-xs text-slate-soft">
        {teacher.education || <TodoContent>học vấn</TodoContent>}
      </p>
      <p className="mt-3 text-sm text-slate">{teacher.intro || <TodoContent>giới thiệu ngắn</TodoContent>}</p>
    </Card>
  );
}
