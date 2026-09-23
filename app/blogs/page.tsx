import Link from "next/link";
import { Nav } from "@/app/ui/nav";
import { Sparkles, ArrowUpRight, Calendar } from "lucide-react";
import { getAllPosts } from "@/app/lib/posts";
import { BlogFeed } from "@/app/ui/blog-feed";

export default async function BlogsPage() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="relative min-h-screen selection:bg-[var(--foreground)] selection:text-[var(--background)]">
        <Nav />
        <main className="mx-auto max-w-4xl px-6 pt-16">
          <h1 className="text-3xl font-extrabold text-[var(--foreground)]">No posts found.</h1>
        </main>
      </div>
    );
  }

  // Always select the most recent post as the Latest Post
  const latestPost = posts[0];
  const regularPosts = posts.filter((post) => post.slug !== latestPost.slug);

  return (
    <div className="relative min-h-screen selection:bg-[var(--foreground)] selection:text-[var(--background)]">
      <Nav />

      <main className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        {/* Header Section */}
        <section className="space-y-4 border-b border-[var(--foreground)]/15 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-[var(--foreground)]">
            Blogs &amp; Thoughts
          </h1>
          <p className="max-w-2xl text-lg text-[var(--foreground)]/70">
            Long-form writing on code, technology, and everything in between.
          </p>
        </section>

        {/* Latest Post Hero Card */}
        {latestPost && (
          <section className="mt-12">
            <Link
              href={`/blogs/${latestPost.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/[0.02] p-8 transition-all duration-200 hover:border-[var(--foreground)]/40 hover:bg-[var(--foreground)]/[0.05]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Badge: Latest Post */}
                <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--foreground)]/15 bg-[var(--foreground)]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/80">
                  Latest Post
                </span>

                <div className="flex items-center gap-3 font-mono text-xs text-[var(--foreground)]/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {latestPost.date}
                  </span>
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl text-[var(--foreground)] transition-colors group-hover:underline">
                {latestPost.title}
              </h2>

              <p className="mt-3 max-w-3xl text-base text-[var(--foreground)]/70 leading-relaxed">
                {latestPost.snippet}
              </p>

              {/* Tags from Metadata */}
              {latestPost.tags && latestPost.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {latestPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-[var(--foreground)]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--foreground)]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-[var(--foreground)] underline underline-offset-4 group-hover:opacity-70">
                Read full article
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </section>
        )}

        {/* Articles Feed */}
        <section className="mt-12 space-y-4">
          <BlogFeed posts={regularPosts.length > 0 ? regularPosts : posts} />
        </section>
      </main>
    </div>
  );
}