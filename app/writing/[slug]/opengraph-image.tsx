import { allPosts, formatDate } from "@/data/posts";
import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Post by Ruchir Jadhav";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  return ogCard({
    eyebrow: "Writing",
    title: post?.title ?? "Writing",
    footer: post ? formatDate(post.date) : undefined,
  });
}
