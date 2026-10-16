// Cấu hình chung: nav + loader nội dung editable (content/data/*.json).
// Cây web 3 nấc (Thùy chốt 15/10/2026): nấc 1 = trang chủ 5 ô · nấc 2 = 5 trang cuộn · nấc 3 = chi tiết.
import siteData from "@/content/data/site.json";
import programsData from "@/content/data/programs.json";
import thongKe from "@/content/data/thong-ke.json";

export const NAV_LINKS = [
  { href: "/gioi-thieu", label: "Giới thiệu về BK", ngan: "Giới thiệu" },
  { href: "/cach-bk-hoat-dong", label: "Cách BK hoạt động", ngan: "Cách BK hoạt động" },
  { href: "/cam-xuc", label: "Nuôi dưỡng cảm xúc", ngan: "Nuôi dưỡng cảm xúc" },
  { href: "/dang-ky", label: "Đăng ký học tại BK", ngan: "Đăng ký học" },
  { href: "/tai-lieu", label: "Tài liệu ôn tập", ngan: "Tài liệu" },
] as const;

export const SITE = {
  name: siteData.name,
  subtitle: siteData.subtitle,
  tagline: siteData.tagline,
  domain: "bkacademy.edu.vn",
  // Hạ tầng/deploy — giữ ở env, không đưa vào content/data.
  phPortalUrl: process.env.NEXT_PUBLIC_PH_PORTAL_URL || "https://ph.bkacademy.edu.vn",
  hocUrl: process.env.NEXT_PUBLIC_HOC_URL || "https://hs.bkacademy.edu.vn",
  address: siteData.address,
  hotline: siteData.hotline,
  zaloUrl: siteData.zaloUrl,
  workingHours: siteData.workingHours,
  mapEmbedSrc: siteData.mapEmbedSrc,
  careerApplyUrl: siteData.careerApplyUrl,
  careerApplyEmail: siteData.careerApplyEmail,
  camNangPdf: siteData.camNangPdf,
  phanLopPdf: siteData.phanLopPdf,
};

// Số liệu sinh từ ERP (scripts/web/xuat-cho-web.mjs) — không gõ tay.
export const THONG_KE = thongKe;

export type HomeStat = { value: string; label: string };
export const HOME_STATS: HomeStat[] = [
  { value: `${Math.floor(thongKe.hoc_sinh / 10) * 10}+`, label: "học sinh đang theo học" },
  { value: String(thongKe.lop), label: "lớp đang mở, lớp 3 → 12" },
  { value: `≤ ${thongKe.si_so_toi_da}`, label: "học sinh mỗi lớp" },
];

// Giữ cho các trang /chuong-trinh/* cũ (sẽ gỡ sau khi cây mới lên domain thật).
export type CapHoc = {
  slug: string;
  ten: string;
  moTa: string;
  mucTieu: string;
  doiTuong: string;
  noiDung: string[];
};
export const CAP_HOC: CapHoc[] = programsData.map(({ slug, ten, moTa, mucTieu, doiTuong, noiDung }) => ({ slug, ten, moTa, mucTieu, doiTuong, noiDung }));
export function getCapHoc(slug: string): CapHoc | undefined {
  return CAP_HOC.find((c) => c.slug === slug);
}
