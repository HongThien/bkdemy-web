-- Bước 3/4 của kế hoạch "GV/học phí live từ ERP qua postgres_fdw" (đã tạo server +
-- foreign table erp_nhan_su/erp_phan_cong_lop/erp_muc_hoc_phi/erp_lop ở Bước 1+2, chạy
-- trong project bkdemy-ph). File này sửa lại v_lop_tuyen_sinh để join vào foreign table
-- thay vì đọc cột tĩnh gv_dung_lop/gv_dung_lop_anh/gia_buoi trong lop_tuyen_sinh_info.
--
-- COALESCE về cột tĩnh cũ làm fallback — nếu FDW lỗi/rỗng, trang vẫn hiện data cũ thay
-- vì trắng trơn. Sau khi verify chạy ổn, có thể dọn cột tĩnh (không bắt buộc ngay).
--
-- Tiện thể sửa luôn bug "lịch học lặp" (dedupe theo thứ+giờ TRƯỚC khi string_agg,
-- thay vì group thẳng theo lop_id như 0002) — đang có patch tạm ở code (lib/data.ts
-- dedupeLich), migration này sửa tận gốc nên patch code kia thành thừa nhưng vô hại,
-- không cần gỡ ngay.

create or replace view public.v_lop_tuyen_sinh as
  select
    i.lop_id as id,
    i.ten_lop,
    i.khoi,
    i.he,
    i.mo_ta,
    coalesce(mhp.don_gia_buoi, i.gia_buoi) as gia_buoi,
    coalesce(gv.ho_ten, i.gv_dung_lop) as gv_dung_lop,
    i.gv_chat_luong,
    coalesce(lich.lich, '') as lich,
    coalesce(ss.si_so_hien_tai, 0) as si_so_hien_tai,
    i.si_so_max,
    coalesce(gv.anh_url, i.gv_dung_lop_anh) as gv_dung_lop_anh
  from public.lop_tuyen_sinh_info i
  left join public.erp_lop el on el.id = i.lop_id
  left join public.erp_muc_hoc_phi mhp on mhp.id = el.muc_hoc_phi_id
  left join public.erp_phan_cong_lop pcl on pcl.lop_id = i.lop_id and pcl.la_chinh = true
  left join public.erp_nhan_su gv on gv.id = pcl.nhan_su_id
  left join (
    select lop_id, count(distinct hoc_sinh_id) as si_so_hien_tai
    from public.lop_view
    group by lop_id
  ) ss on ss.lop_id = i.lop_id
  left join (
    select lop_id, string_agg(slot, ' · ' order by thu, gio_bat_dau) as lich
    from (
      select distinct lop_id, thu, gio_bat_dau, gio_ket_thuc,
        (case thu
           when 2 then 'T2' when 3 then 'T3' when 4 then 'T4' when 5 then 'T5'
           when 6 then 'T6' when 7 then 'T7' when 8 then 'CN' else 'T' || thu
         end) || ' ' || to_char(gio_bat_dau, 'HH24:MI') || '–' || to_char(gio_ket_thuc, 'HH24:MI') as slot
      from public.tkb_view
    ) d
    group by lop_id
  ) lich on lich.lop_id = i.lop_id
  where i.dang_tuyen = true;
