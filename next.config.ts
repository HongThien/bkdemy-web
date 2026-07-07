import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Avatar GV thật — bucket public "avatars" trên Supabase của ERP (chỉ ảnh, không kết nối data/key ERP).
      { protocol: "https", hostname: "osrvycilwshkzhljuxef.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
