import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Nav } from "@/app/ui/nav";
import { getAllPosts, getPostBySlug, slugify } from "@/app/lib/posts";

export const dynamicParams = true;

// Custom MDX component styling
const mdxComponents = {
  h2: (props: any) => (
    <h2
      className="mt-12 mb-6 text-2xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--foreground)]/10 pb-3"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 mb-4 text-xl font-bold tracking-tight text-[var(--foreground)]"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="mb-6 text-lg leading-8 text-[var(--foreground)]/85 tracking-normal"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc space-y-3 text-lg leading-7 text-[var(--foreground)]/85" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 ml-6 list-decimal space-y-3 text-lg leading-7 text-[var(--foreground)]/85" {...props} />
  ),
  li: (props: any) => <li className="pl-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="my-8 border-l-4 border-[var(--foreground)] bg-[var(--foreground)]/[0.03] px-6 py-4 rounded-r-2xl italic text-lg text-[var(--foreground)]/90"
      {...props}
    />
  ),
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          className="rounded-md bg-[var(--foreground)]/10 px-1.5 py-0.5 font-mono text-sm font-medium text-[var(--foreground)]"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: any) => (
    <div className="my-8 overflow-hidden rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] shadow-sm">
      <pre className="p-5 font-mono text-sm overflow-x-auto leading-relaxed" {...props} />
    </div>
  ),
  hr: () => <hr className="my-12 border-t border-[var(--foreground)]/10" />,
  a: (props: any) => (
    <a
      className="font-medium text-[var(--foreground)] underline decoration-[var(--foreground)]/30 underline-offset-4 transition-colors hover:decoration-[var(--foreground)]"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  img: (props: any) => (
    <span className="my-8 block overflow-hidden rounded-2xl border border-[var(--foreground)]/10">
      <img className="w-full object-cover" {...props} />
    </span>
  ),
};

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
    <div className="relative min-h-screen selection:bg-[var(--foreground)] selection:text-[var(--background)]">
      {/* Optional theme-based background lighting (or remove entirely) */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 bg-[var(--foreground)]/[0.02] blur-3xl" />

      <Nav />

      {/* Main Container */}
      <main className="mx-auto max-w-3xl px-6 pt-10 pb-32">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/60 transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-12 border-b border-[var(--foreground)]/10">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags && post.tags.length > 0 ? (
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--foreground)]/10 px-3 py-1 font-mono text-xs font-semibold text-[var(--foreground)]/80"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))
            ) : (
              <span className="inline-flex items-center rounded-full bg-[var(--foreground)]/10 px-3 py-1 font-mono text-xs font-semibold text-[var(--foreground)]/80">
                {post.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl sm:leading-[1.15] text-[var(--foreground)]">
            {post.title}
          </h1>

          {/* Date Metadata */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground)]/50 pt-2">
            <Calendar className="h-4 w-4 text-[var(--foreground)]/70" />
            <span>{post.date}</span>
          </div>

          {/* Snippet / Subtitle */}
          {post.snippet && (
            <p className="mt-4 text-xl text-[var(--foreground)]/70 leading-relaxed font-normal">
              {post.snippet}
            </p>
          )}
        </header>

        {/* Content Body */}
        <article className="pt-10">
          {post.content ? (
            <MDXRemote source={post.content} components={mdxComponents} />
          ) : (
            <p className="text-sm text-[var(--foreground)]/50">
              No content available for this article.
            </p>
          )}
        </article>
      </main>
    </div>
  );
}