# HANDOFF — bkdemy-web (site marketing bkacademy.edu.vn)

> Đọc file này trước khi làm tiếp — **mục ③ là bản mới nhất (15/10/2026), ① và ② mô tả bản code đang chạy (07/2026) sẽ được dựng lại theo ③**. Project MỚI (bắt đầu 2026-07-07), tách biệt hoàn toàn
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

## ③ Trạng thái & việc tiếp theo (cập nhật 15/10/2026 — sau phiên thiết kế lại với Thùy)

### Quyết định thiết kế đã chốt 15/10 (nguồn: phiên chat, Thùy chốt từng điểm)
- **Web dành cho người MỚI** (PH tiềm năng, referral). KHÔNG làm vùng riêng cho PH đang học — họ dùng app PH/HS.
- **3 nấc:** nấc 1 = trang chủ **chỉ ô** (như ERP), không bài viết · nấc 2 = trang **cuộn** theo mục, mỗi mục có "Đọc chi tiết →" · nấc 3 = trang chi tiết. KHÔNG làm 2 tầng ô (PH phải chọn rồi quay lại chọn — bất tiện).
- **Tầng 1 = 5 ô:** Giới thiệu về BK · Cách BK hoạt động · Nuôi dưỡng cảm xúc · Đăng ký học tại BK · Tài liệu ôn tập (ô ngang dưới cùng). Trên lưới: logo + tagline "Cùng con, đi xa hơn" + 1 dòng "CLB Toán học và Khoa học BK Academy" + 3 con số. Dưới lưới: nút **Chat Zalo** (zalo cá nhân Thùy `zalo.me/0963209309`), SĐT ghi nhỏ. Ô chỉ icon + tên, không dòng phụ.
- **Tên gọi:** "CLB Toán học và Khoa học BK Academy" (không "trung tâm Toán", không "BKdemy" trên web). Logo 4 màu của cẩm nang. **Thùy = thầy** (xưng "thầy Đào Xuân Thùy").
- **Bỏ Zalo OA**, chỉ Zalo cá nhân + hotline 0963 209 309. Giờ 10:00–21:00 hằng ngày. Địa chỉ 1 bản: Số 17, Lô A10, KĐT Geleximco, Lê Trọng Tấn, An Khánh, Hoài Đức, Hà Nội. Tuyển dụng: để sau.
- **Giới thiệu về BK:** ① đoạn Thùy viết (hệ thống trung tâm, lớp nhỏ, kiến thức + cảm xúc + nhân cách, dữ liệu, hướng AI & khoa học) + 3 số · ② Thầy Đào Xuân Thùy: ảnh + đúng 3 chức danh (Cựu thủ khoa khối chuyên Toán ĐH KHTN ĐHQGHN · Giám đốc Sư phạm Công ty STUDYNOW · Kinh nghiệm 13 năm giảng dạy môn Toán), KHÔNG chú thích thêm, nút đọc bài đầy đủ (bài 7 đoạn Thùy viết, màn nấc 3 riêng) · ③ Giáo viên & trợ giảng — mở bằng **4 môn Toán · Ngữ văn · Tiếng Anh · KHTN**, avatar lấy từ ERP, không có → ô trống · ④ Cơ sở + bản đồ. Mục "Toán là trục chính" đã bỏ; Vinh danh KHÔNG ở trang này.
- **Nuôi dưỡng cảm xúc** (ô riêng vì là trụ 2 của định vị): 4 ý Thùy — phân lớp đúng môi trường · không khí lớp học thoải mái, không xa cách thầy cô · gamification (trên lớp + app HS) · sự kiện vui chơi (Trung thu) — cộng **Vinh danh tháng** (3 loại giải, số tháng 9: 41 · 17 · 2) đặt ở đây.
- **Cách BK hoạt động:** phân lớp · một buổi học diễn ra thế nào · BK Math Map · bổ trợ 5 hình thức · ôn thi · 2 app · cam kết 2 phía + tải cẩm nang. Nấc 3: Phân lớp (brochure) · Bổ trợ · Math Map (từ cẩm nang PH 2026, 18 trang, file ở Downloads).
- **Đăng ký học:** 3 bước (đăng ký → test đầu vào miễn phí → xếp lớp) · lớp đang mở theo cấp/khối (live) · học phí & ưu đãi (150k/buổi, học liệu 30k, bổ trợ miễn phí, −5/−10/−5%, giới thiệu PH mới 500k) · form đăng ký test (ghi lead) · FAQ.
- **Tài liệu = mũi nhọn SEO.** Chỉ đề thi + đề cương (tài liệu BK giữ lại; kho câu nội bộ không public). Mỗi đề = 1 trang HTML riêng (text đề + đáp án free + "Nhận lời giải chi tiết qua Zalo" = form lead) + trang khối-môn + hub. Tiêu đề = loại + kỳ + môn + khối + trường + năm + "có đáp án"; **ghi tên trường thật**. Sinh tĩnh theo lô từ Kho đề thi ERP (1 lô = 1 commit), Thùy duyệt lô ở phiên chat (tạm), sau này trên web. **Lô đầu = Toán 8** (39 đề GK1 + 4 đề cương). Lead (lời giải, test đầu vào, gọi lại) → 1 bảng trong ERP qua role chỉ INSERT, **Thùy nhận** và gửi file qua Zalo.
- **Bảng vàng = giải tháng** trong ERP (`giai_thuong`, đọc bằng service role — `claude_build` thấy 0 dòng). Tên hiện đầy đủ, KHÔNG ảnh HS. Lên web sau khi tháng được "công bố" (tháng 9 chưa bấm).
- **Ảnh:** `design/yeu-cau-anh-web.md` — mã A1…H6; Thùy chụp/chọn 11 bắt buộc (B2 B3 B4 B5 D1 D2a D2b E1 H1 H3 H5) + 5 nên có; avatar GV/TA, ảnh app, bìa đề: t tự lo. Trong mockup, khung gạch vàng = chỗ đặt ảnh.

### Sản phẩm của phiên
- `design/mockup-web-2026-10.html` — **bản 3.7**, 18 màn (nấc 1 · 5 trang nấc 2 · 12 màn nấc 3), nút đổi bản máy tính. Cách xem: mở file, hoặc `npx serve -l 3106 design` (Browser pane không chụp được file://).
- `design/yeu-cau-anh-web.md` — phiếu ảnh.
- Nội dung JSON điền 13/10 (`content/data/*`, bài MDX) vẫn trên vercel.app, sẽ được dựng lại theo cấu trúc mới; giữ làm nguồn text.

### Còn chờ Thùy
1. Học phí 150k/buổi hiện công khai trên card lớp? (đang hiện)
2. Chương trình giới thiệu PH mới 500k có lên web không? (t đề xuất có)
3. Câu chữ 5 mục trang Cảm xúc (t nháp từ 4 ý của Thùy) · 3–4 dòng còn lại nếu muốn ở Giới thiệu.
4. Ảnh theo phiếu.

### Việc tiếp theo (thứ tự)
1. Viết `SPEC-web-v2.md` trong repo này từ mục ③ + mockup 3.7 (cây 3 nấc, thông tin từng màn, nguồn dữ liệu, luật lead, luật Tài liệu, luật vinh danh).
2. **Tài liệu lô Toán 8**: script sinh trang đề + PDF đề/đáp án (+ PDF lời giải ẩn) từ Kho đề thi ERP → `content/tai-lieu/…` → trang `/tai-lieu`, `/tai-lieu/toan-8`, `/tai-lieu/<slug>` + form lead. Cần: bảng lead ERP + mở rộng role `web_lead_writer` (Thùy chạy SQL).
3. Dựng lại shell theo mockup: trang chủ 5 ô → 5 trang nấc 2 → nấc 3 (tái dùng `/tieu-hoc /thcs /thpt /khoi-N` cho lớp đang mở; bỏ `/chuong-trinh/*` tĩnh, `/tra-cuu`, `/tuyen-dung`, `/lien-he` riêng).
4. Vinh danh tháng: sync `giai_thuong` đã công bố → `thanh_tich_cong_khai` (bkdemy-ph) theo lô.
5. Gỡ `proxy.ts` khi Thùy duyệt bản dựng thật. Kiểm Vercel env `NEXT_PUBLIC_HOC_URL` (phải là `hs.`).

**Máy này (WBPC):** `.env.local` đã tạo 13/10 (anon key bkdemy-ph copy từ `../bkdemy-ph-app/.env.local`). Cache `.next` cũ làm `next dev` 500 — `npm run build` rồi `npx next start -p 3105`. Push master = Vercel tự deploy (~60 s).

## Khởi động ở máy MỚI
1. `git clone <url-sau-khi-push>` (hoặc copy thư mục nếu chưa kịp push).
2. Tự tạo `.env.local` (xem `.env.example` cho tên biến, lấy giá trị thật ở Supabase dashboard project `bkdemy-ph` — Settings→API cho URL/anon key, Settings→Database→Connection pooling cho `BKDEMY_PH_DATABASE_URL`).
3. `npm install` → `npm run dev` → `http://localhost:3000`.
4. Đọc mục ③ ở trên để biết việc đang dở.
