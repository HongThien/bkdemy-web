// Danh sách GV — nội dung thật do vận hành cung cấp, sửa trong content/data/teachers.json
// (không sửa file này), chuẩn bị sẵn cho Decap CMS sau này.
import type { Teacher } from "@/components/TeacherCard";
import teachersData from "@/content/data/teachers.json";

export const TEACHERS: Teacher[] = teachersData;
