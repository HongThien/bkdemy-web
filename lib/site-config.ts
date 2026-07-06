// Cấu hình chung: nav + loader nội dung editable (content/data/*.json).
// Nội dung thật do nhân sự/marketing cung cấp (xem BKDEMY_WEB_SPEC.md §10) — sửa
// trực tiếp trong content/data/site.json (không sửa file này), chuẩn bị sẵn cho
// Decap CMS sau này (JSON thuần, không type/logic).
import siteData from "@/content/data/site.json";
import programsData from "@/content/data/programs.json";

// Khe mở rộng tương lai (spec §8): /nhuong-quyen chưa có trang — thêm 1 dòng vào
// mảng này khi trang đó được build, router tự nhận, không cần đổi cấu trúc.
export const NAV_LINKS = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/chuong-trinh", label: "Chương trình" },
  { href: "/doi-ngu", label: "Đội ngũ" },
  { href: "/bang-vang", label: "Bảng vàng" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/tuyen-dung", label: "Tuyển dụng" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const CTA_TRA_CUU = { href: "/tra-cuu", label: "Tra cứu kết quả" } as const;

export type HomeStat = { value: string; label: string };

export const SITE = {
  name: "BKdemy",
  domain: "bkacademy.edu.vn",
  // Hạ tầng/deploy (KHÔNG phải nội dung — giữ ở env, không đưa vào content/data).
  phPortalUrl: process.env.NEXT_PUBLIC_PH_PORTAL_URL || "https://ph.bkacademy.edu.vn",
  hocUrl: process.env.NEXT_PUBLIC_HOC_URL || "https://hoc.bkacademy.edu.vn",
  // Nội dung editable — nguồn DUY NHẤT là content/data/site.json.
  address: siteData.address,
  hotline: siteData.hotline,
  zaloUrl: siteData.zaloUrl,
  workingHours: siteData.workingHours,
  mapEmbedSrc: siteData.mapEmbedSrc,
  careerApplyUrl: siteData.careerApplyUrl,
  careerApplyEmail: siteData.careerApplyEmail,
  homeStats: siteData.homeStats as HomeStat[],
};

export type CapHoc = {
  slug: string;
  ten: string;
  moTa: string;
  // Nội dung chi tiết CHƯA có bản thật (spec §10) — giữ TODO(content), không tự bịa marketing copy.
  mucTieu: string;
  doiTuong: string;
  noiDung: string[];
};

export const CAP_HOC: CapHoc[] = programsData;

export function getCapHoc(slug: string): CapHoc | undefined {
  return CAP_HOC.find((c) => c.slug === slug);
}
