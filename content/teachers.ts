// Danh sách GV — sinh từ ERP bằng scripts/web/xuat-cho-web.mjs (repo ERP) vào content/data/teachers.json.
// Chỉ cột gioi_thieu sửa tay (Thùy bổ sung dần). Ảnh trống = ô trống (Thùy 15/10).
import type { Teacher } from "@/components/TeacherCard";
import teachersData from "@/content/data/teachers.json";

export type GiaoVien = {
  slug: string;
  ten: string;
  anh: string;
  mon: string[];
  so_lop: number;
  gioi_thieu: string;
};

export const GIAO_VIEN: GiaoVien[] = (teachersData as Array<Partial<GiaoVien> & { _ghiChu?: string }>)
  .filter((t): t is GiaoVien => typeof t.slug === "string" && typeof t.ten === "string")
  .map((t) => ({ ...t, anh: t.anh ?? "", mon: t.mon ?? [], so_lop: t.so_lop ?? 0, gioi_thieu: t.gioi_thieu ?? "" }));

// Tương thích trang /doi-ngu cũ (đã redirect sang /gioi-thieu).
export const TEACHERS: Teacher[] = GIAO_VIEN.map((t) => ({
  slug: t.slug,
  name: t.ten,
  photo: t.anh || "/avatar-placeholder.svg",
  education: "",
  specialty: t.mon.join(" · "),
  intro: t.gioi_thieu,
}));
