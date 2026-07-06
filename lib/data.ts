import { supabasePh, hasLiveSupabase } from "@/lib/supabase";
import type { BangVangEntry } from "@/components/BangVangItem";
import bangVangMock from "@/content/_mock/bangvang.json";
import khaiGiangMock from "@/content/_mock/khaigiang.json";

export type KhaiGiang = {
  id: string;
  ten_lop: string;
  cap: string | null;
  ngay_khai_giang: string;
  ghi_chu: string | null;
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
