import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Nav } from "@/app/ui/nav";
import { getAllPosts, getPostBySlug, slugify } from "@/app/lib/posts";

export const dynamicParams = true;

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const cleanSlug = slugify(resolvedParams.slug);
  const post = await getPostBySlug(cleanSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <Nav />

      <main className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline mb-8 transition-all"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        <header className="space-y-6 border-b border-[var(--foreground)]/10 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags && post.tags.length > 0 ? (
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  <Tag className="h-3 w-3" />#{tag}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {post.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 font-mono text-xs text-[var(--foreground)]/60">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-emerald-500" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-500" />
              {post.readTime}
            </span>
          </div>

          {post.snippet && (
            <p className="text-lg text-[var(--foreground)]/80 leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1">
              {post.snippet}
            </p>
          )}
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none pt-10 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-pre:border prose-pre:border-[var(--foreground)]/10 prose-pre:bg-[var(--foreground)]/5">
          {post.content ? (
            <MDXRemote source={post.content} />
          ) : (
            <p className="text-gray-500">No content available for this article.</p>
          )}
        </article>
      </main>
    </div>
  );
}