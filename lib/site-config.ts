// Cấu hình chung: nav, link ngoài, thông tin liên hệ.
// TODO(content): thay placeholder bằng giá trị thật khi vận hành cung cấp (xem BKDEMY_WEB_SPEC.md §10).

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

export const SITE = {
  name: "BKdemy",
  domain: "bkacademy.edu.vn",
  hotline: process.env.NEXT_PUBLIC_HOTLINE || "TODO(content): số hotline",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me",
  phPortalUrl: process.env.NEXT_PUBLIC_PH_PORTAL_URL || "https://ph.bkacademy.edu.vn",
  hocUrl: process.env.NEXT_PUBLIC_HOC_URL || "https://hoc.bkacademy.edu.vn",
  address: "TODO(content): địa chỉ cơ sở 1",
  mapEmbedSrc: process.env.NEXT_PUBLIC_MAP_EMBED_SRC || "",
  careerApplyUrl: process.env.NEXT_PUBLIC_CAREER_FORM_URL || "",
  careerApplyEmail: process.env.NEXT_PUBLIC_CAREER_EMAIL || "tuyendung@bkacademy.edu.vn",
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

export const CAP_HOC: CapHoc[] = [
  {
    slug: "tieu-hoc",
    ten: "Tiểu học",
    moTa: "Xây nền tư duy Toán từ sớm, học mà chơi, chắc gốc.",
    mucTieu: "TODO(content): mục tiêu cụ thể của chương trình Tiểu học",
    doiTuong: "TODO(content): đối tượng học sinh phù hợp",
    noiDung: ["TODO(content): nội dung/lộ trình chính 1", "TODO(content): nội dung/lộ trình chính 2"],
  },
  {
    slug: "vao-6",
    ten: "Ôn thi vào 6",
    moTa: "Luyện thi vào lớp 6 trường chuyên/chất lượng cao.",
    mucTieu: "TODO(content): mục tiêu cụ thể của chương trình Ôn thi vào 6",
    doiTuong: "TODO(content): đối tượng học sinh phù hợp",
    noiDung: ["TODO(content): nội dung/lộ trình chính 1", "TODO(content): nội dung/lộ trình chính 2"],
  },
  {
    slug: "thcs",
    ten: "THCS",
    moTa: "Củng cố nền tảng, bứt tốc theo từng dạng bài.",
    mucTieu: "TODO(content): mục tiêu cụ thể của chương trình THCS",
    doiTuong: "TODO(content): đối tượng học sinh phù hợp",
    noiDung: ["TODO(content): nội dung/lộ trình chính 1", "TODO(content): nội dung/lộ trình chính 2"],
  },
  {
    slug: "vao-10",
    ten: "Ôn thi vào 10",
    moTa: "Lộ trình tăng tốc bám sát cấu trúc đề thi vào 10.",
    mucTieu: "TODO(content): mục tiêu cụ thể của chương trình Ôn thi vào 10",
    doiTuong: "TODO(content): đối tượng học sinh phù hợp",
    noiDung: ["TODO(content): nội dung/lộ trình chính 1", "TODO(content): nội dung/lộ trình chính 2"],
  },
  {
    slug: "thpt",
    ten: "THPT",
    moTa: "Ôn luyện theo mục tiêu thi tốt nghiệp & xét tuyển đại học.",
    mucTieu: "TODO(content): mục tiêu cụ thể của chương trình THPT",
    doiTuong: "TODO(content): đối tượng học sinh phù hợp",
    noiDung: ["TODO(content): nội dung/lộ trình chính 1", "TODO(content): nội dung/lộ trình chính 2"],
  },
];

export function getCapHoc(slug: string): CapHoc | undefined {
  return CAP_HOC.find((c) => c.slug === slug);
}
