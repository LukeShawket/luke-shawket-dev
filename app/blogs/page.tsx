import Link from "next/link";
import { Nav } from "@/app/ui/nav";
import { Sparkles, ArrowUpRight, Calendar, Tag } from "lucide-react";
import { getAllPosts } from "@/app/lib/posts";
import { BlogFeed } from "@/app/ui/blog-feed";

export default async function BlogsPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="relative min-h-screen">
        <Nav />
        <main className="mx-auto max-w-5xl px-6 pt-16">
          <h1 className="text-3xl font-bold">No posts found.</h1>
        </main>
      </div>
    );
  }

  // Always select the most recent post as the Latest Post
  const latestPost = posts[0];
  const regularPosts = posts.filter((post) => post.slug !== latestPost.slug);

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        {/* Header Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Writings
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Blogs & Thoughts
          </h1>
          <p className="max-w-2xl text-lg text-[var(--foreground)]/70">
            I share my thoughts and projects here, while working on my writing skills in English along the way.
          </p>
        </section>

        {/* Latest Post Hero Card */}
        {latestPost && (
          <section className="mt-12">
            <Link
              href={`/blogs/${latestPost.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Badge: Latest Post */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-3 w-3" />
                  Latest Post
                </span>

                <div className="flex items-center gap-3 font-mono text-xs text-[var(--foreground)]/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {latestPost.date}
                  </span>
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
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
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      <Tag className="h-2.5 w-2.5" />#{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Read full article
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </section>
        )}

        {/* Articles Feed */}
        <section className="mt-16 space-y-4">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/50">
            All Articles ({regularPosts.length})
          </h2>

          <BlogFeed posts={regularPosts.length > 0 ? regularPosts : posts} />
        </section>
      </main>
    </div>
  );
}