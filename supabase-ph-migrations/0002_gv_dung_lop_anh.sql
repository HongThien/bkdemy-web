-- Thêm ảnh GV phụ trách chính vào card lớp tuyển sinh (Thùy yêu cầu 07-07).
alter table public.lop_tuyen_sinh_info add column if not exists gv_dung_lop_anh text;

-- Cập nhật view: thêm cột mới vào CUỐI danh sách select (an toàn cho create or replace view).
create or replace view public.v_lop_tuyen_sinh as
  select
    i.lop_id as id,
    i.ten_lop,
    i.khoi,
    i.he,
    i.mo_ta,
    i.gia_buoi,
    i.gv_dung_lop,
    i.gv_chat_luong,
    coalesce(lich.lich, '') as lich,
    coalesce(ss.si_so_hien_tai, 0) as si_so_hien_tai,
    i.si_so_max,
    i.gv_dung_lop_anh
  from public.lop_tuyen_sinh_info i
  left join (
    select lop_id, count(distinct hoc_sinh_id) as si_so_hien_tai
    from public.lop_view
    group by lop_id
  ) ss on ss.lop_id = i.lop_id
  left join (
    select lop_id,
      string_agg(
        (case thu
           when 2 then 'T2' when 3 then 'T3' when 4 then 'T4' when 5 then 'T5'
           when 6 then 'T6' when 7 then 'T7' when 8 then 'CN' else 'T' || thu
         end) || ' ' || to_char(gio_bat_dau, 'HH24:MI') || '–' || to_char(gio_ket_thuc, 'HH24:MI'),
        ' · ' order by thu
      ) as lich
    from public.tkb_view
    group by lop_id
  ) lich on lich.lop_id = i.lop_id
  where i.dang_tuyen = true;

-- Ảnh GV chính — lấy từ avatar THẬT trong ERP (bucket public "avatars"), chỉ 4 người dạy 5 lớp khối 7.
update public.lop_tuyen_sinh_info set gv_dung_lop_anh = 'https://osrvycilwshkzhljuxef.supabase.co/storage/v1/object/public/avatars/4915b6b5-1851-4377-9dcd-a803576f5b60.jpg' where lop_id = 'c00deede-dfe7-40a7-a6d0-5978fcc3c678'; -- 7A1 Tạ Quốc Cường
update public.lop_tuyen_sinh_info set gv_dung_lop_anh = 'https://osrvycilwshkzhljuxef.supabase.co/storage/v1/object/public/avatars/29e583b4-8bc1-4304-88ae-87f3b0073154.jpg' where lop_id = '98ccd528-e77e-4130-b5a8-0b2568ba5624'; -- 7B1 Phạm Thị Thùy Trang
update public.lop_tuyen_sinh_info set gv_dung_lop_anh = 'https://osrvycilwshkzhljuxef.supabase.co/storage/v1/object/public/avatars/d9b483b9-6d58-44dc-8157-fd950f38bcde.jpg' where lop_id = 'a0ae12d6-6386-468d-8754-a0b2e8d1c92a'; -- 7B2 Nguyễn Linh Uyên
update public.lop_tuyen_sinh_info set gv_dung_lop_anh = 'https://osrvycilwshkzhljuxef.supabase.co/storage/v1/object/public/avatars/4cc7af19-6f4e-4833-9bb1-3c9781a0ec11.png' where lop_id = '743e3488-db69-4512-be8e-738fa0658fdc'; -- 7S1 Đào Xuân Thùy
update public.lop_tuyen_sinh_info set gv_dung_lop_anh = 'https://osrvycilwshkzhljuxef.supabase.co/storage/v1/object/public/avatars/4cc7af19-6f4e-4833-9bb1-3c9781a0ec11.png' where lop_id = 'bb2ad86d-da47-4de3-9d43-75d34dda0a95'; -- 7S2 Đào Xuân Thùy
