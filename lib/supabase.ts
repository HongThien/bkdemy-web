import { createClient } from "@supabase/supabase-js";

// Client ANON, CHỈ ĐỌC — trỏ tới project `bkdemy-ph` (KHÔNG PHẢI Supabase ERP).
// Chỉ được SELECT 2 view công khai: public_bang_vang, public_khai_giang (xem BKDEMY_WEB_SPEC.md §7/§13).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabasePh = url && anonKey ? createClient(url, anonKey) : null;

export const hasLiveSupabase = Boolean(supabasePh);
