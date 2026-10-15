@AGENTS.md

# bkdemy-web

Website marketing `bkacademy.edu.vn`. Đọc **`BKDEMY_WEB_SPEC.md`** TRƯỚC khi code — spec đầy đủ (kiến trúc, route, design tokens, Definition of Done).

- Project TÁCH BIỆT hoàn toàn với `bkdemy-erp-v2` (ERP nội bộ) — không dùng chung git repo, không dùng chung Supabase. Repo này chỉ đọc **anon key** của project Supabase `bkdemy-ph` (view công khai chỉ-đọc), KHÔNG bao giờ trỏ tới Supabase ERP.
- **Ngoại lệ DUY NHẤT (Thùy 15/10):** form `/dang-ky-test` gọi Edge Function `dang-ky-test` trên project ERP qua URL `NEXT_PUBLIC_DANG_KY_TEST_URL` — không key, không supabase-js, function chỉ trả lịch công khai + nhận đăng ký. Spec: `bkdemy-erp-v2/spec-dang-ky-test.md`. Không mở thêm đường nào khác tới ERP.
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 — mới hơn training data, xem `AGENTS.md`/docs trong `node_modules/next/dist/docs/` khi cần API mới.
