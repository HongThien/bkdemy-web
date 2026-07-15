import { supabasePh, hasLiveSupabase } from "@/lib/supabase";
import type { BangVangEntry } from "@/components/BangVangItem";
import bangVangMock from "@/content/_mock/bangvang.json";
import khaiGiangMock from "@/content/_mock/khaigiang.json";
import lopTuyenSinhMock from "@/content/_mock/lop-tuyen-sinh.json";

export type KhaiGiang = {
  id: string;
  ten_lop: string;
  cap: string | null;
  ngay_khai_giang: string;
  ghi_chu: string | null;
};

export type LopTuyenSinh = {
  id: string;
  ten_lop: string;
  khoi: string;
  he: "S" | "A" | "B" | "C";
  mo_ta: string | null;
  gia_buoi: number;
  gv_dung_lop: string | null;
  gv_dung_lop_anh: string | null;
  gv_chat_luong: string | null;
  lich: string | null;
  si_so_hien_tai: number;
  si_so_max: number;
};

// Đổi mock ↔ live CHỈ ở đây (spec §7). Luôn rơi về mock nếu chưa có credential
// live thật (an toàn cho build/dev khi bkdemy-ph chưa cấp URL/anon key).
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true" || !hasLiveSupabase;

export async function getBangVang(): Promise<BangVangEntry[]> {
  if (useMock || !supabasePh) {
    return bangVangMock as BangVangEntry[];
  }
  const { data, error } = await supabasePh
    .from("public_bang_vang")
    .select("id, ten_hoc_sinh_hien_thi, thanh_tich, khoi, ky_thi, nam")
    .order("nam", { ascending: false });
  if (error) {
    console.error("getBangVang error", error.message);
    return [];
  }
  return data ?? [];
}

export async function getKhaiGiang(): Promise<KhaiGiang[]> {
  if (useMock || !supabasePh) {
    return khaiGiangMock as KhaiGiang[];
  }
  const { data, error } = await supabasePh
    .from("public_khai_giang")
    .select("id, ten_lop, cap, ngay_khai_giang, ghi_chu")
    .order("ngay_khai_giang", { ascending: true });
  if (error) {
    console.error("getKhaiGiang error", error.message);
    return [];
  }
  return data ?? [];
}

// v_lop_tuyen_sinh (migration 0002) string_agg lịch học group theo lop_id, không
// dedupe theo (thứ, giờ) — vì tkb_view lưu 1 dòng/buổi học thực tế (theo ngày), không
// phải 1 dòng/khung giờ cố định trong tuần, nên cùng 1 khung giờ lặp lại theo số buổi
// đã sync. Dedupe ở đây (không đụng schema) cho tới khi có migration sửa tận view.
function dedupeLich(lich: string | null): string | null {
  if (!lich) return lich;
  const parts = lich.split(" · ").filter(Boolean);
  return Array.from(new Set(parts)).join(" · ");
}

// Thứ tự hiển thị theo bậc (Thùy chốt): S > A > B > C, trong mỗi hệ xếp theo số lớp tăng dần.
// Khối tăng dần trước tiên (chỉ có ý nghĩa khi 1 trang gộp nhiều khối — /tieu-hoc, /thcs, /thpt).
const HE_ORDER: Record<string, number> = { S: 0, A: 1, B: 2, C: 3 };
function sapXepLop(list: LopTuyenSinh[]): LopTuyenSinh[] {
  return [...list].sort((a, b) => {
    const khoiDiff = Number(a.khoi) - Number(b.khoi);
    if (khoiDiff !== 0) return khoiDiff;
    const heDiff = (HE_ORDER[a.he] ?? 99) - (HE_ORDER[b.he] ?? 99);
    if (heDiff !== 0) return heDiff;
    return a.ten_lop.localeCompare(b.ten_lop, "vi", { numeric: true });
  });
}

// Trang /khoi-7, /tieu-hoc, /thcs, /thpt (SPEC-tuyen-sinh-khoi-7.md §2/§3 + SPEC-khoi7-revamp)
// — đọc view `v_lop_tuyen_sinh` trong bkdemy-ph, lọc theo danh sách khối truyền vào.
// Mock cho tới khi có view thật — tự chuyển sang live ngay khi credential + view sẵn sàng.
export async function getLopTuyenSinh(khoiList: string[]): Promise<LopTuyenSinh[]> {
  if (useMock || !supabasePh) {
    return sapXepLop((lopTuyenSinhMock as LopTuyenSinh[]).filter((lop) => khoiList.includes(lop.khoi)));
  }
  const { data, error } = await supabasePh
    .from("v_lop_tuyen_sinh")
    .select("id, ten_lop, khoi, he, mo_ta, gia_buoi, gv_dung_lop, gv_dung_lop_anh, gv_chat_luong, lich, si_so_hien_tai, si_so_max")
    .in("khoi", khoiList)
    .order("ten_lop", { ascending: true });
  if (error) {
    console.error("getLopTuyenSinh error", error.message);
    return [];
  }
  return sapXepLop((data ?? []).map((lop) => ({ ...lop, lich: dedupeLich(lop.lich) })));
}

export async function getLopKhoi7(): Promise<LopTuyenSinh[]> {
  return getLopTuyenSinh(["7"]);
}
