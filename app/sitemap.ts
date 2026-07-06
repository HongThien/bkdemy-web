import type { MetadataRoute } from "next";
import { CAP_HOC } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bkacademy.edu.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/chuong-trinh",
    "/doi-ngu",
    "/bang-vang",
    "/tra-cuu",
    "/tin-tuc",
    "/tuyen-dung",
    "/lien-he",
  ];

  const capRoutes = CAP_HOC.map((c) => `/chuong-trinh/${c.slug}`);
  const postRoutes = getAllPosts().map((p) => `/tin-tuc/${p.slug}`);

  return [...staticRoutes, ...capRoutes, ...postRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
