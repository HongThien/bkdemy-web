@AGENTS.md

# bkdemy-web

Website marketing `bkacademy.edu.vn`. Đọc **`BKDEMY_WEB_SPEC.md`** TRƯỚC khi code — spec đầy đủ (kiến trúc, route, design tokens, Definition of Done).

- Project TÁCH BIỆT hoàn toàn với `bkdemy-erp-v2` (ERP nội bộ) — không dùng chung git repo, không dùng chung Supabase. Repo này chỉ đọc **anon key** của project Supabase `bkdemy-ph` (view công khai chỉ-đọc), KHÔNG bao giờ trỏ tới Supabase ERP.
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 — mới hơn training data, xem `AGENTS.md`/docs trong `node_modules/next/dist/docs/` khi cần API mới.
