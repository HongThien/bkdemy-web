import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingContact } from "@/components/FloatingContact";
import { SITE } from "@/lib/site-config";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: "variable",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bkacademy.edu.vn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — ${SITE.subtitle}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "BK Academy — CLB Toán học và Khoa học tại Geleximco, An Khánh: lớp nhỏ, phân lớp theo năng lực, theo dõi tiến bộ từng học sinh bằng dữ liệu.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.name,
  alternateName: SITE.subtitle,
  url: siteUrl,
  telephone: SITE.hotline.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Số 17, Lô A10, KĐT Geleximco, Lê Trọng Tấn",
    addressLocality: "An Khánh, Hoài Đức",
    addressRegion: "Hà Nội",
    addressCountry: "VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingContact />
      </body>
    </html>
  );
}
