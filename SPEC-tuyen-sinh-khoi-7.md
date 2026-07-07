# SPEC — Trang tuyển sinh Toán khối 7 (bkacademy.vn/khoi-7)

> Bàn giao cho Claude Code. Đọc hết mục 1–2 trước khi viết dòng code nào — ranh giới data là phần quan trọng nhất, sai chỗ này là sai kiến trúc.

---

## 0. Mục tiêu & phạm vi

- **Là gì:** landing tuyển sinh public cho Toán khối 7, năm học 2026–2027. Không login.
- **Vai trò:** kênh chốt chính vẫn là inbox Zalo. Web = chỗ phụ huynh (PH) đọc thông tin + form hứng lead cho PH ngại nhắn. Web **không thay** inbox.
- **Ship khối 7 trước.** Khối khác về sau: **copy nguyên trang khối 7, sửa nội dung tĩnh**. KHÔNG tham số hóa, KHÔNG dựng route động `[khoi]` đọc config chung, KHÔNG template hóa. Mỗi khối một trang độc lập, viết tay. (Quyết định đã chốt: với 7 khối gần như không đổi cả năm, copy-paste đơn giản và an toàn hơn trừu tượng hóa.)

**KHÔNG làm trong sprint này** (scope guard — đừng phình):
- Web hóa brochure thành trang tầng 2 (bản đầu chỉ link PDF).
- Tài liệu học tập / video bài giảng / phần nghiên cứu hoạt động.
- Bất kỳ auth nào, bất kỳ dữ liệu cá nhân học sinh nào (điểm, điểm danh).
- Bảng học phí trọn gói (gửi file sau khi đăng ký, không lên web).

---

## 1. Kiến trúc data — RANH GIỚI CỨNG

1. **Nguồn động duy nhất là project Supabase `bkdemy-ph` (DB-sync).** Web **TUYỆT ĐỐI không kết nối ERP gốc**. Không import key ERP, không query ERP, không một dòng nào chạm ERP. ERP là nơi nghiệp vụ chạy; DB-sync là tấm gương một chiều chiếu phần công khai ra ngoài.

2. **Web chỉ ĐỌC.** Đọc qua **view read-only đã lọc field an toàn** trong `bkdemy-ph`. Không đọc thẳng bảng gốc kể cả trong DB-sync — đọc qua view để cố định đúng cột được phép lộ.

3. **Ghi (form đăng ký) đi qua Edge Function**, không cho web INSERT thẳng vào DB. → Đọc qua view, ghi qua function. Không có ngoại lệ.

4. **Dữ liệu nhạy cảm không bao giờ rời ERP.** Lọc ở **khâu sync** (chỉ đẩy field sạch sang `bkdemy-ph`), không phải "sang hết rồi web giấu". Field cấm lộ ra web: SĐT giáo viên, lương, ghi chú nội bộ, mọi thông tin cá nhân HS/PH.

---

## 2. Tĩnh vs Động — phân định từng field

| Nhóm | Field | Nguồn | Ghi chú |
|---|---|---|---|
| **Tĩnh** | Hero, mô tả 4 hệ (C/B/A/S), cơ chế test xếp lớp, FAQ | Hardcode thẳng trong trang | Không gắn với lớp cụ thể nào → gõ tay trong code |
| **Động** | Tên lớp (vd `7S1`) | DB | |
| **Động** | Hệ của lớp (`S`/`A`/`B`/`C`) | DB | Chỉ là nhãn, nối lên section 4 hệ — KHÔNG in lại mô tả hệ trong card |
| **Động** | Mô tả riêng của lớp | DB | 7S1 ≠ 7S2 dù cùng hệ. Có thể null → ẩn dòng, không vỡ layout |
| **Động** | Giá buổi chính | DB | Thuộc tính lớp, đã có sẵn để tính học phí. Chỉ hiện **giá/buổi**, không hiện học phí trọn gói |
| **Động** | GV đứng lớp (tên, ảnh nếu có) | DB | KHÔNG lộ SĐT |
| **Động** | GV phụ trách chất lượng (tên) | DB | |
| **Động** | Lịch học | DB (`tkb`) | Format `T4 18:00–19:30 · CN 10:30–12:00` |
| **Động** | Sĩ số hiện tại, sĩ số max | DB | Sĩ số hiện tại phải **derive** (COUNT HS active), KHÔNG cột nhập tay. Hiển thị theo quy tắc mục 6 |

**Card lớp = ghép 3 tầng:** nhãn hệ (nối section 4 hệ) + mô tả riêng lớp (DB) + vận hành GV/lịch/giá/chỗ (DB). Card **không lặp lại** mô tả hệ — PH muốn hiểu hệ thì có anchor nhảy lên section 4 hệ.

---

## 3. Chuẩn bị data layer (tiền đề — làm trước frontend)

**Verify schema thật trước, không đoán tên cột.** Kiểm tra `bkdemy-ph` đã có đủ field ở mục 2 chưa:
- Nếu bảng `lop`/`tkb` trong `bkdemy-ph` **thiếu** field (mô tả riêng lớp, giá buổi, tên 2 GV, trạng thái tuyển sinh) → mở rộng luồng sync để đẩy thêm **field sạch** này từ ERP sang. Không đẩy field nhạy cảm.
- Sĩ số hiện tại: tính bằng COUNT từ bảng ghi danh, đóng gói trong view (đừng bắt frontend tự đếm).

**Tạo view read-only** (vd `v_lop_tuyen_sinh`) join sẵn: lớp + hệ + mô tả + giá + 2 GV + lịch + sĩ số hiện tại + max, lọc chỉ lớp đang tuyển sinh. Frontend query đúng view này, filter theo khối. Nhớ `.limit(10000)`.

**Tạo Edge Function nhận form** (mục 7).

---

## 4. Stack

- **Next.js (App Router).** Nội dung tĩnh (hero, 4 hệ, FAQ) render sẵn (SSG) — nhẹ, tải nhanh, sẵn sàng cho SEO về sau (ưu tiên thấp nhưng free nếu chọn đúng từ đầu). Block danh sách lớp fetch **runtime** (server component `revalidate` ngắn, hoặc client fetch) để chỗ trống luôn tươi — KHÔNG build-time, không sẽ bị cũ.
- **Supabase JS client** trỏ `bkdemy-ph` (anon key, RLS cho phép đọc view public, chặn mọi thứ khác).
- **Mobile-first.** PH ~100% xem điện thoại. "Mượt" = tải nhanh + đọc rõ trên màn nhỏ + cuộn êm, KHÔNG phải nhồi animation (animation nặng làm chậm, phản tác dụng). Quality floor: responsive, focus bàn phím, `prefers-reduced-motion`.
- Brand: navy `#1E3A5F`, Be Vietnam Pro, nền trắng. (Đây là parent-facing — KHÔNG dùng scifi HUD của ERP.)

---

## 5. Cấu trúc trang `/khoi-7` — theo đúng thứ tự output cuối

Một trang cuộn dọc, 5 section:

**① Hero** *(tĩnh)* — eyebrow "Tuyển sinh Toán khối 7 · 2026–2027", tiêu đề triết lý, 1 câu dẫn, 2 nút CTA: `[Đăng ký test xếp lớp]` (cuộn tới ⑤) + `[Nhắn Zalo]` (link OA).

**② Bốn hệ năng lực** *(tĩnh)* — bảng 4 dòng C/B/A/S: cột *dành cho con nào / mục tiêu điểm / sĩ số*. Số kéo chuẩn từ brochure: **C 7+ (4–7 hs) · B 8+ (5–10) · A 9+ (10–15) · S 9.5+ (10–15)**. Câu chốt: hệ do bài test quyết định, không phải PH chọn. Mỗi hệ có `id` anchor (`#he-s`…) để card lớp nhảy tới.

**③ Lớp khối 7 đang mở** *(động — từ view, filter khối 7)* — grid card. Mỗi card: tên lớp · nhãn hệ (link anchor lên ②) · mô tả riêng (ẩn nếu null) · lịch · GV đứng lớp + GV chất lượng · giá/buổi · trạng thái chỗ (mục 6). Empty state (chưa có lớp mở): 1 dòng "Khối 7 đang mở lớp mới — để lại thông tin bên dưới để BK xếp lịch test" + cuộn tới ⑤.

**④ FAQ** *(tĩnh)* — các câu chắt từ brochure (hệ C có phải kém, chênh giá giữa hệ, khi nào chuyển hệ — gồm cơ chế thử đệm 2 tuần, học không theo kịp thì sao). Cuối section: nút `Xem đầy đủ tài liệu Hệ thống phân lớp →` mở **PDF brochure** (host tĩnh).

**⑤ Đăng ký test xếp lớp** *(form + liên hệ)* — form 3 field (mục 7) + Zalo OA + hotline 0963 209 309 + địa chỉ.

*(Không có section học phí riêng — giá đã nằm trong card lớp ③.)*

---

## 6. Quy tắc hiển thị chỗ trống

`con_lai = si_so_max - si_so_hien_tai`

- `con_lai <= 5` → **"Còn {con_lai} chỗ"** (màu cam, tạo urgency)
- `con_lai > 5` → **"Đang tuyển sinh"** (neutral — không lộ lớp còn vắng)
- `con_lai <= 0` → **"Đã đủ sĩ số"** (xám, không cho là nút CTA)

Con số này chỉ dùng cho **bản web** (đọc động, luôn đúng). Không áp cho bản PDF/ảnh gửi tay.

---

## 7. Form đăng ký

- **Field:** Tên con · Lớp đang học · SĐT phụ huynh. (Validate SĐT VN.)
- **Không dùng `<form>` submit thuần** — handler `onClick`, gọi Edge Function.
- **Luồng:** web → Edge Function → INSERT vào **luồng tuyển sinh sẵn có trong ERP** (verify tên bảng, KHÔNG tạo bảng mới) với `nguon = 'web'`. Edge Function giữ service role key server-side; đây là chiều ghi hợp lệ (web gọi function, function chạm DB — không phải web chọc thẳng).
- Lead web **phải vào cùng pipeline** với lead nhân sự nhập tay, để không trôi. Nhãn `nguon='web'` để đo hiệu quả marketing.
- Sau gửi: state thành công rõ ràng ("BK đã nhận thông tin, sẽ liên hệ xếp lịch test"). Lỗi: báo cụ thể + cho thử lại, không nuốt lỗi.

---

## 8. Bảo mật / ràng buộc bắt buộc

- Web **chỉ** có anon key của `bkdemy-ph`. Không service role ở client. Không key ERP ở bất kỳ đâu trong web.
- RLS `bkdemy-ph`: view public cho đọc; mọi bảng khác chặn. (Sprint này chưa có bảng cá nhân, nhưng khi thêm về sau: bảng cá nhân bật RLS chặt theo tài khoản — cắm sẵn tư duy này.)
- View chỉ chứa field ở mục 2. Double-check không lọt SĐT GV / ghi chú nội bộ / field cá nhân.

---

## 9. Bàn giao

Theo convention 3 file: cập nhật `HANDOFF.md` (trạng thái, việc tiếp theo), `DEVLOG.md` (quyết định đã chốt trong spec này), `CLAUDE.md` (ranh giới ERP-không-chọc-web + đọc-qua-view-ghi-qua-function, để session sau không phá).

**Ưu tiên dựng:** mục 3 (data layer) → ② + ④ tĩnh → ③ động → ⑤ form. Ship được trang khối 7 chạy thật rồi mới nhân bản khối khác.
