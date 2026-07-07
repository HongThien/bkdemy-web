import { supabasePh, hasLiveSupabase } from "@/lib/supabase";
import type { BangVangEntry } from "@/components/BangVangItem";
import bangVangMock from "@/content/_mock/bangvang.json";
import khaiGiangMock from "@/content/_mock/khaigiang.json";
import lopKhoi7Mock from "@/content/_mock/lop-khoi7.json";

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

// Trang /khoi-7 (SPEC-tuyen-sinh-khoi-7.md §2/§3) — đọc view `v_lop_tuyen_sinh`
// trong bkdemy-ph (CHƯA tồn tại lúc viết hàm này). Mock cho tới khi có view thật —
// tự chuyển sang live ngay khi credential + view sẵn sàng, không cần sửa code.
export async function getLopKhoi7(): Promise<LopTuyenSinh[]> {
  if (useMock || !supabasePh) {
    return lopKhoi7Mock as LopTuyenSinh[];
  }
  const { data, error } = await supabasePh
    .from("v_lop_tuyen_sinh")
    .select("id, ten_lop, he, mo_ta, gia_buoi, gv_dung_lop, gv_dung_lop_anh, gv_chat_luong, lich, si_so_hien_tai, si_so_max")
    .eq("khoi", "7")
    .order("ten_lop", { ascending: true });
  if (error) {
    console.error("getLopKhoi7 error", error.message);
    return [];
  }
  return data ?? [];
}
