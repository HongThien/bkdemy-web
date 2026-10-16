import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Avatar GV thật — bucket public "avatars" trên Supabase của ERP (chỉ ảnh, không kết nối data/key ERP).
      { protocol: "https", hostname: "osrvycilwshkzhljuxef.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  // Cây web 3 nấc (15/10/2026) thay các route cũ — giữ file cũ, chỉ chuyển hướng (chưa xoá: luật xoá CLAUDE.md).
  async redirects() {
    return [
      { source: "/doi-ngu", destination: "/gioi-thieu", permanent: true },
      { source: "/lien-he", destination: "/gioi-thieu", permanent: true },
      { source: "/bang-vang", destination: "/cam-xuc/vinh-danh", permanent: true },
      { source: "/tra-cuu", destination: "/cach-bk-hoat-dong", permanent: true },
      { source: "/chuong-trinh", destination: "/dang-ky", permanent: true },
      { source: "/chuong-trinh/:slug", destination: "/dang-ky", permanent: true },
    ];
  },
};

export default nextConfig;
