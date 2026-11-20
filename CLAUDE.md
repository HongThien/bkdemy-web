@AGENTS.md

# bkdemy-web

Website marketing `bkacademy.edu.vn`. Đọc **`BKDEMY_WEB_SPEC.md`** TRƯỚC khi code — spec đầy đủ (kiến trúc, route, design tokens, Definition of Done).

- Project TÁCH BIỆT hoàn toàn với `bkdemy-erp-v2` (ERP nội bộ) — không dùng chung git repo, không dùng chung Supabase. Repo này chỉ đọc **anon key** của project Supabase `bkdemy-ph` (view công khai chỉ-đọc), KHÔNG bao giờ trỏ tới Supabase ERP.
- **Ngoại lệ DUY NHẤT (Thùy 15/10):** form `/dang-ky-test` gọi Edge Function `dang-ky-test` trên project ERP qua URL `NEXT_PUBLIC_DANG_KY_TEST_URL` — không key, không supabase-js, function chỉ trả lịch công khai + nhận đăng ký. Spec: `bkdemy-erp-v2/spec-dang-ky-test.md`. Không mở thêm đường nào khác tới ERP.
- **Trang `/dang-ky-test` có 3 tab (20/11):** Đăng ký test · Phân lớp · Cẩm nang BK — khung `components/dang-ky-test/TrangDangKyTest.tsx`, mở thẳng tab bằng `#phan-lop` / `#cam-nang`; tab thứ 4 (feedback PH) khai sẵn, đang ẩn chờ nội dung. Tab Phân lớp dùng chung `components/PhanLopNoiDung.tsx` với `/cach-bk-hoat-dong/phan-lop`. Ảnh cẩm nang ở `public/cam-nang/` xuất từ PDF cẩm nang PH 2026, ĐÃ BỎ trang có mật khẩu mặc định Cổng PH — KHÔNG đưa file PDF gốc lên web.
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 — mới hơn training data, xem `AGENTS.md`/docs trong `node_modules/next/dist/docs/` khi cần API mới.
