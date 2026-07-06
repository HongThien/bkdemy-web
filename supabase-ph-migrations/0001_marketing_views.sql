-- Chạy trên project bkdemy-ph (KHÔNG phải ERP). 3 bảng curate ĐỘC LẬP (không sync
-- từ ERP, nhân viên sửa tay qua Supabase Table Editor) + 3 view public cho web
-- marketing (bkdemy-web) đọc qua anon key.

-- 1) Thông tin lớp tuyển sinh (giá/GV/mô tả/sĩ số tối đa — không có trong sync ERP)
create table if not exists public.lop_tuyen_sinh_info (
  lop_id uuid primary key,
  ten_lop text not null,
  khoi text not null,
  he text not null check (he in ('S','A','B','C')),
  gia_buoi numeric not null default 150000,
  gv_dung_lop text,
  gv_chat_luong text,
  mo_ta text,
  si_so_max int not null default 15,
  dang_tuyen boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Khai giảng (lớp mới, chưa có trong lop_view vì lop_view chỉ theo HS đã ghi danh)
create table if not exists public.khai_giang (
  id uuid primary key default gen_random_uuid(),
  ten_lop text not null,
  cap text,
  ngay_khai_giang date not null,
  ghi_chu text,
  created_at timestamptz not null default now()
);

-- 3) Bảng vàng — model đề cử/duyệt/đồng ý (BKDEMY_WEB_SPEC.md §13.1)
create table if not exists public.thanh_tich_cong_khai (
  id uuid primary key default gen_random_uuid(),
  hoc_sinh_id uuid,
  ten_hoc_sinh_hien_thi text not null,
  thanh_tich text not null,
  khoi text,
  ky_thi text,
  nam int,
  nguon text not null default 'thu_cong' check (nguon in ('auto','thu_cong')),
  trang_thai text not null default 'de_cu' check (trang_thai in ('de_cu','duyet','tu_choi')),
  dong_y boolean not null default false,
  ly_do_de_cu text,
  nguoi_duyet uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_ttck_trangthai on public.thanh_tich_cong_khai (trang_thai, dong_y);

-- RLS bật trên cả 3 bảng gốc, KHÔNG policy cho anon (chỉ đọc qua view bên dưới).
-- Chủ bảng (postgres, sửa qua Table Editor/Studio) tự bypass RLS, không ảnh hưởng thao tác sửa tay.
alter table public.lop_tuyen_sinh_info enable row level security;
alter table public.khai_giang enable row level security;
alter table public.thanh_tich_cong_khai enable row level security;

-- Views công khai — chạy quyền OWNER (security_invoker mặc định off) nên đọc được
-- bảng gốc dù RLS chặn anon trực tiếp.
create or replace view public.public_bang_vang as
  select id, ten_hoc_sinh_hien_thi, thanh_tich, khoi, ky_thi, nam
  from public.thanh_tich_cong_khai
  where trang_thai = 'duyet' and dong_y = true
  order by nam desc nulls last, created_at desc;

create or replace view public.public_khai_giang as
  select id, ten_lop, cap, ngay_khai_giang, ghi_chu
  from public.khai_giang
  where ngay_khai_giang >= current_date
  order by ngay_khai_giang asc;

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
    i.si_so_max
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

grant usage on schema public to anon;
grant select on public.public_bang_vang, public.public_khai_giang, public.v_lop_tuyen_sinh to anon;
