import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Section } from "@/components/ui";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section className="max-w-3xl">
      {post.date && <p className="text-sm text-slate-soft">{post.date}</p>}
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{post.title}</h1>
      <div className="prose prose-slate mt-8 max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </Section>
  );
}
