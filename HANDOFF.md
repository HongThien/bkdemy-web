# HANDOFF — bkdemy-web (site marketing bkacademy.edu.vn)

> Đọc file này trước khi làm tiếp. Project MỚI (bắt đầu 2026-07-07), tách biệt hoàn toàn
> khỏi `bkdemy-erp-v2` — xem `CLAUDE.md` + `BKDEMY_WEB_SPEC.md` + `SPEC-tuyen-sinh-khoi-7.md`
> (file spec khối 7 hiện chỉ có ở `C:\Users\Admin\Downloads\SPEC-tuyen-sinh-khoi-7.md`,
> CHƯA copy vào repo — nên copy vào để không mất khi đổi máy).

---

## ① Trạng thái hiện tại

### Kiến trúc
- Next.js 16 (App Router) + Tailwind v4 + TypeScript. Design token riêng (navy/gold/paper), signature "đường cong tiến bộ" — KHÔNG dùng gu scifi-HUD của ERP.
- **Tách biệt tuyệt đối khỏi Supabase ERP** — chỉ đọc project Supabase **`bkdemy-ph`** (của Hải, ban đầu dựng cho cổng phụ huynh/Expo app, sync 1 chiều từ ERP: `hoc_sinh/phu_huynh/lop_view/tkb_view/diem_view/buoi_view`).
- Nội dung editable tách `content/data/*.json` (site/programs/teachers/careers/gioi-thieu/khoi7) — chuẩn bị sẵn cho Decap CMS (git-based, miễn phí) sau này khi nhân sự cần tự viết bài; KHÔNG dựng UI `/admin` trong lượt này (cần Thùy tạo GitHub OAuth App trước).
- Data layer `lib/data.ts`: mỗi hàm có nhánh mock (`content/_mock/*.json`) / live (Supabase `bkdemy-ph`), chọn qua `NEXT_PUBLIC_USE_MOCK`. Hiện **đã bật live** (`.env.local` + Vercel production đều `NEXT_PUBLIC_USE_MOCK=false`).

### Đã build
- **9 trang chính** theo `BKDEMY_WEB_SPEC.md`: `/` `/chuong-trinh`(+5 cấp) `/doi-ngu` `/bang-vang` `/tra-cuu` `/gioi-thieu` `/tuyen-dung` `/lien-he` `/tin-tuc`(+MDX).
- **`/khoi-7`** theo `SPEC-tuyen-sinh-khoi-7.md` — landing tuyển sinh riêng, 5 section cuộn dọc (Hero → 4 hệ năng lực → Lớp đang mở (carousel ngang) → FAQ → Liên hệ). KHÔNG dùng route `[khoi]` động (quyết định chốt — copy tay khi làm khối khác).
- Nội dung thật đã điền: địa chỉ/hotline/triết lý (từ `BK-Brochure-2026-2027.pdf` trong `public/brochure/`), số HS đang học (326, query thật từ ERP lúc build), **5 lớp khối 7 THẬT** (7A1/7B1/7B2/7S1/7S2) với giá/GV-chính/hệ/sĩ-số-tối-đa lấy thật từ ERP (`muc_hoc_phi`+`phan_cong_lop`), sĩ số hiện tại + lịch học **tính LIVE** từ `lop_view`/`tkb_view` (không nhập tay).
- Deploy: **https://bkdemy-web.vercel.app** (Vercel project `hongthiens-projects-be2657fd/bkdemy-web`). Domain thật `bkacademy.edu.vn` CHƯA gắn (brochure ghi `.vn` là SAI/cũ — Thùy xác nhận `.edu.vn` mới đúng).

### Hạ tầng DB đã tạo (bkdemy-ph, project Supabase riêng — xem `supabase-ph-migrations/`)
- `lop_tuyen_sinh_info` / `khai_giang` / `thanh_tich_cong_khai` — 3 bảng curate tay (KHÔNG sync từ ERP), nhân viên sửa qua Supabase Table Editor. `khai_giang`+`thanh_tich_cong_khai` **đang TRỐNG** (chưa ai điền — đúng luật thiếu-data=không-dòng, web tự hiện rỗng gọn gàng).
- 3 view public: `public_bang_vang` / `public_khai_giang` / `v_lop_tuyen_sinh` (đã cấp SELECT cho `anon`).
- **CHƯA CHẠY**: migration `0002_gv_dung_lop_anh.sql` (thêm cột ảnh GV chính vào `lop_tuyen_sinh_info` + update view) — SQL đã viết sẵn trong repo, cần Thùy paste vào SQL Editor của `bkdemy-ph`.

### Hạ tầng DB đã tạo (ERP `bkdemy-erp-v2`, project Supabase RIÊNG — khác bkdemy-ph)
- Migration `0087_web_lead_writer_role.sql` (đã chạy, đã verify) — role `web_lead_writer`: **CHỈ** `INSERT` trên bảng `ung_vien`, không đọc/sửa/xoá được gì khác (kể cả SELECT chính bảng đó). Mục đích: cho phép form đăng ký ở `/khoi-7` ghi lead thẳng vào ERP mà không cần cầm credential toàn quyền.
- **CHƯA XONG**: `alter role web_lead_writer with password '...'` — đã đưa Thùy câu lệnh (mật khẩu generate ngẫu nhiên), **chưa xác nhận đã chạy**. Sau khi chạy: nối connection string vào `bkdemy-web` (server-side env, KHÔNG `NEXT_PUBLIC_*`) rồi build API route (`app/api/dang-ky-test/route.ts`) + form thật ở section ⑤ trang `/khoi-7` (spec §7: 3 field Tên con/Lớp đang học/SĐT PH → insert `ung_vien` với `level='L5'`, `nguon='web'`).

### Git — ⚠ QUAN TRỌNG, khác V2
- Repo **CHỈ TỒN TẠI LOCAL**, **CHƯA CÓ remote GitHub nào** (khác `bkdemy-erp-v2` đã có `origin` trỏ `github.com/HongThien/bkdemy-erp-v2`).
- **Máy khác KHÔNG `git pull` được** cho tới khi tạo repo GitHub trống rồi push lên. Cần Thùy tạo repo (github.com/new, KHÔNG tick "Initialize with README") rồi đưa URL cho Claude Code để `git remote add origin <url> && git push -u origin master`.
- `.env.local` **không nằm trong git** (gitignored, đúng quy tắc). Sang máy mới PHẢI tự tạo lại file này — biến cần: `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` (project `bkdemy-ph`, lấy ở Supabase dashboard → Settings → API), `BKDEMY_PH_DATABASE_URL` (Settings → Database → connection pooling, KHÔNG dùng direct connection vì máy có thể không resolve IPv6), `NEXT_PUBLIC_USE_MOCK=false`. Xem `.env.example` để biết đủ tên biến (không có giá trị thật).

---

## ② Bài học / quyết định (đừng đạp lại)

- **Nội dung web = mobile-scroll, GIỮ NGẮN** (Thùy chốt) — chi tiết sâu (bảng phân lớp S/A/B/C đầy đủ, học phí bổ trợ...) đẩy ra file PDF brochure gốc (`public/brochure/`), không nhồi vào trang cuộn.
- **CTA đăng ký/liên hệ đặt CUỐI trang, không đặt ở Hero** — các landing tuyển sinh này gửi cho PH ĐÃ trong inbox Zalo (không phải cold traffic lạ cần chốt ngay), nên không cần CTA mạnh ngay đầu trang.
- **Ghi dữ liệu vào ERP từ web = PHẢI qua role SCOPED riêng** (chỉ đúng 1 quyền cần, vd `INSERT` 1 bảng) — KHÔNG bao giờ nhét credential toàn quyền (`postgres` superuser / `claude_build`) vào Vercel của app public-facing. Nếu leak, role scoped chỉ bị lạm dụng đúng phạm vi đã cấp.
- **`sĩ số tối đa` là con số CHÍNH SÁCH tự đặt, không phải data derive được** — Thùy chốt chuẩn mực: mặc định 15, hệ B=12, hệ C=10 (không theo đúng brochure cũ 4-7/5-10/10-15).
- **Dữ liệu "trông như đã sync nhưng thực ra không có"**: `lop_view`/`tkb_view` (bkdemy-ph) chỉ có sĩ số/lịch — giá/GV/mô tả/sĩ-số-tối-đa KHÔNG có ở đâu trong sync, phải curate riêng ở bảng mới (`lop_tuyen_sinh_info`). Nhưng giá + GV chính THẬT SỰ CÓ SẴN trong ERP (`muc_hoc_phi`/`phan_cong_lop`) — chỉ là chưa được Hải sync sang, nên tra thẳng ERP (đọc-only) để lấy số thật thay vì đoán/để trống.
- **Mọi thao tác ghi/tạo schema trên DB chia sẻ (bkdemy-ph của Hải, hay ERP) đều cần Thùy xác nhận rõ ràng SQL cụ thể trước khi chạy** — kể cả khi đã duyệt hướng chung ("ok" không tính là duyệt nội dung SQL). Claude Code chỉ có quyền `SELECT` trên ERP theo mặc định (`claude_build`/`claude_ro`), không có quyền `CREATE ROLE`/`ALTER ROLE` — các việc đó Thùy phải tự chạy qua Supabase SQL Editor.
- Có 1 commit git lạ (`bcd5d71 "LD"`, tác giả trùng git identity máy này) xuất hiện giữa phiên làm việc — nội dung đúng là 1 thay đổi Claude đã làm (sĩ số 4-7→tối đa 10...), nhưng KHÔNG rõ do lệnh commit nào tạo ra (không phải Claude chủ động chạy `git commit` lúc đó). Chưa điều tra kỹ — nếu thấy lặp lại, đáng nghi ngờ 1 tool/extension nào đó tự commit.

---

## ③ Việc cần làm tiếp (theo thứ tự ưu tiên)

1. **Tạo repo GitHub + push** — để làm được ở máy khác (xem mục Git ở trên).
2. **Chạy `alter role web_lead_writer with password '...'`** trên SQL Editor ERP (câu lệnh đã đưa Thùy trong chat, chưa xác nhận đã chạy).
3. **Build API route + form thật** cho `/khoi-7` section ⑤ (Tên con/Lớp đang học/SĐT PH → `ung_vien`, `nguon='web'`) — sau khi có credential ở bước 2.
4. **Chạy migration `0002_gv_dung_lop_anh.sql`** trên SQL Editor `bkdemy-ph` (đã viết sẵn trong `supabase-ph-migrations/`, kèm URL avatar thật 4 GV).
5. **Điền bảng vàng + khai giảng** — qua Supabase Table Editor của `bkdemy-ph` (bảng `thanh_tich_cong_khai`/`khai_giang`), khi Thùy có nội dung.
6. Nội dung còn thiếu (không chặn ai, điền dần): câu chuyện thành lập BKdemy, năm hoạt động, tỉ lệ đạt nguyện vọng, danh sách GV đầy đủ cho `/doi-ngu`, mô tả riêng từng lớp khối 7 (Thùy tự viết).
7. Domain thật `bkacademy.edu.vn` — gắn vào Vercel khi nội dung sẵn sàng lên thật (chưa làm).

---

## Khởi động ở máy MỚI
1. `git clone <url-sau-khi-push>` (hoặc copy thư mục nếu chưa kịp push).
2. Tự tạo `.env.local` (xem `.env.example` cho tên biến, lấy giá trị thật ở Supabase dashboard project `bkdemy-ph` — Settings→API cho URL/anon key, Settings→Database→Connection pooling cho `BKDEMY_PH_DATABASE_URL`).
3. `npm install` → `npm run dev` → `http://localhost:3000`.
4. Đọc mục ③ ở trên để biết việc đang dở.
