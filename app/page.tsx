import Link from "next/link";
import { Nav } from "@/app/ui/nav";
import { Coffee, ArrowUpRight, Terminal, Sparkles, Star, GitFork, Tag } from "lucide-react";
import { getLatestPosts } from "@/app/lib/posts";
import { getLatestProjects } from "@/app/lib/projects";
import Subscribe from "./ui/subscribe";
import GalleryFrame from "./ui/gallery-frame";
import { fetchLatestGalleryItems } from "@/app/lib/fetch-images";

// Force dynamic rendering to ensure fresh media archive updates
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch latest blogs, GitHub projects, and gallery items dynamically
  const latestBlogs = await getLatestPosts(2);
  const latestProjects = await getLatestProjects(2);
  const latestImages = await fetchLatestGalleryItems(6);

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* Background Accent Glow Effect */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        {/* HERO SECTION */}
        <section className="relative flex flex-col justify-center pb-16 sm:pb-20">
          {/* Status Badge */}
          <div className="mb-6 flex items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <Coffee className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span></span>
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-7xl leading-[1.1]">
            Hi, I&apos;m{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Luke Shawket
            </span>
            .
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-[var(--foreground)]/70 sm:text-xl leading-relaxed">
            Welcome to my website!<br />
            This is where I write and share my projects.<br />
            I'm a data professional with an interest in data, machine learning and general programming.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:lukeshawket@outlook.com"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center rounded-full border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] backdrop-blur-sm transition-all hover:bg-[var(--foreground)]/10"
            >
              Read Blog Posts
            </Link>
          </div>
        </section>

        {/* Subscribe Section right under Hero */}
        <Subscribe />

        {/* LATEST BLOGS SECTION */}
        <section className="py-12 border-t border-[var(--foreground)]/10">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Notes &amp; Insights
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Latest Blog Posts
              </h2>
            </div>
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
            >
              <span>Read all</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            {latestBlogs.length === 0 ? (
              <p className="text-sm text-[var(--foreground)]/50">
                No articles published yet.
              </p>
            ) : (
              latestBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="group block rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-6 backdrop-blur-md transition-all duration-200 hover:border-emerald-500/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {blog.tags && blog.tags.length > 0 ? (
                        blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
                          >
                            <Tag className="h-2.5 w-2.5" />#{tag}
                          </span>
                        ))
                      ) : (
                        <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {blog.category}
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-xs text-[var(--foreground)]/50">
                      <time>{blog.date}</time>
                    </div>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {blog.title}
                  </h3>
                  
                  {blog.snippet && (
                    <p className="mt-1.5 text-sm text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                      {blog.snippet}
                    </p>
                  )}
                </Link>
              ))
            )}
          </div>
        </section>

        {/* LATEST PROJECTS SECTION */}
        <section className="py-12 border-t border-[var(--foreground)]/10">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Terminal className="h-3.5 w-3.5" />
                CODE
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Latest Repositories
              </h2>
            </div>
            <a
              href="https://github.com/LukeShawket"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
            >
              <span>View all</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {latestProjects.length === 0 ? (
              <p className="text-sm text-[var(--foreground)]/50 sm:col-span-2">
                No repositories found.
              </p>
            ) : (
              latestProjects.map((project) => (
                <a
                  key={project.slug}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {project.category}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[var(--foreground)]/40 opacity-0 transition-all group-hover:opacity-100 group-hover:text-emerald-500" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold tracking-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-4 font-mono text-xs text-[var(--foreground)]/50">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      {project.forks}
                    </span>
                    <span className="ml-auto">{project.language}</span>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>

        {/* GALLERY FRAME ARCHIVE SECTION (Replaces Playground) */}
        {latestImages.length > 0 && (
          <GalleryFrame
            title="Latest Image Archive"
            subtitle="Media Vault"
            items={latestImages}
          />
        )}
      </main>
    </div>
  );
}