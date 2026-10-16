import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bkacademy.edu.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/gioi-thieu/thay-dao-xuan-thuy",
    "/cach-bk-hoat-dong",
    "/cach-bk-hoat-dong/phan-lop",
    "/cach-bk-hoat-dong/bo-tro",
    "/cach-bk-hoat-dong/math-map",
    "/cam-xuc",
    "/cam-xuc/vinh-danh",
    "/dang-ky",
    "/dang-ky/hoc-phi",
    "/dang-ky-test",
    "/tai-lieu",
    "/tieu-hoc",
    "/thcs",
    "/thpt",
    ...["3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((k) => `/khoi-${k}`),
    "/tin-tuc",
  ];
  const postRoutes = getAllPosts().map((p) => `/tin-tuc/${p.slug}`);

  return [...staticRoutes, ...postRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
