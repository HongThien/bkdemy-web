import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Section, SectionTitle, Card, EmptyState } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Tin tức và bài viết từ BKdemy.",
};

export default function TinTucPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <SectionTitle eyebrow="Tin tức" title="Bài viết mới" />
      <div className="mt-10">
        {posts.length === 0 ? (
          <EmptyState title="Chưa có bài viết nào" description="Nội dung sẽ sớm được cập nhật." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/tin-tuc/${p.slug}`}>
                <Card className="h-full hover:border-gold/40">
                  {p.date && <p className="text-xs text-slate-soft">{p.date}</p>}
                  <p className="mt-2 font-display text-lg font-semibold text-ink">{p.title}</p>
                  {p.excerpt && <p className="mt-2 text-sm text-slate-soft">{p.excerpt}</p>}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
