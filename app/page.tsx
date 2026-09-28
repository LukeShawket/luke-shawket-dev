import Link from "next/link";
import { Nav } from "@/app/ui/nav";
import { ArrowUpRight, Star, GitFork, Tag, Terminal } from "lucide-react";
import { getLatestPosts } from "@/app/lib/posts";
import { getLatestProjects } from "@/app/lib/projects";
import Subscribe from "@/app/ui/subscribe";

export const dynamic = "force-dynamic";

export default async function Home() {
  const latestBlogs = await getLatestPosts(2);
  const latestProjects = await getLatestProjects(6);

  return (
    <div className="relative min-h-screen selection:bg-[var(--foreground)] selection:text-[var(--background)]">
      <Nav />

      <main className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        {/* HERO SECTION */}
        <section className="relative flex flex-col justify-center pb-12 sm:pb-16 border-b border-[var(--foreground)]/15">
          {/* Main Title */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-[var(--foreground)]">
            Luke Shawket
          </h1>

          {/* Editorial Paragraphs using Default Sans Font */}
          <div className="mt-6 w-full text-lg sm:text-xl text-[var(--foreground)]/80 leading-relaxed space-y-4">
            <p>
              Welcome to my website!
              This is where I write and share my projects.
            </p>
            <p>
              I'm a data professional with an interest in data, machine learning and general programming.{" "}
              <Link
                href="/about"
                className="underline decoration-[var(--foreground)]/30 underline-offset-4 hover:decoration-[var(--foreground)] transition-colors"
              >
                Read more about me.
              </Link>
            </p>
          </div>

          {/* Key Highlights */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[var(--foreground)]/60">
            <span>• Business Systems Analyst</span>
            <span>• Python, SQL, C#, Jave Script, C++ &amp; HTML, CSS</span>
            <span>• B.S. Public Administration</span>
          </div>

          {/* Full-Width Subscribe Component */}
          <Subscribe />
        </section>

        {/* LATEST BLOGS SECTION (VERTICAL STACK) */}
        <section className="py-12 border-b border-[var(--foreground)]/15">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-[var(--foreground)]">
                Recent Blog Posts
              </h2>
            </div>
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-[var(--foreground)] underline underline-offset-4 hover:opacity-70"
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
                  className="group block rounded-2xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/[0.02] p-6 transition-all duration-200 hover:border-[var(--foreground)]/40 hover:bg-[var(--foreground)]/[0.05]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {blog.tags && blog.tags.length > 0 ? (
                        blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-[var(--foreground)]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--foreground)]/80"
                          >
                            <Tag className="h-2.5 w-2.5" />{tag}
                          </span>
                        ))
                      ) : (
                        <span className="font-mono text-xs font-semibold text-[var(--foreground)]/70">
                          {blog.category}
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-xs text-[var(--foreground)]/50">
                      <time>{blog.date}</time>
                    </div>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold text-[var(--foreground)] transition-colors group-hover:underline">
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

        {/* LATEST PROJECTS SECTION (VERTICAL STACK MATCHING POSTS) */}
        <section className="py-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-[var(--foreground)]">
                Latest Repositories
              </h2>
            </div>
            <a
              href="https://github.com/LukeShawket"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-[var(--foreground)] underline underline-offset-4 hover:opacity-70"
            >
              <span>View all</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-8 space-y-4">
            {latestProjects.length === 0 ? (
              <p className="text-sm text-[var(--foreground)]/50">
                No repositories found.
              </p>
            ) : (
              latestProjects.slice(0, 2).map((project) => (
                <a
                  key={project.slug}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/[0.02] p-6 transition-all duration-200 hover:border-[var(--foreground)]/40 hover:bg-[var(--foreground)]/[0.05]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--foreground)]/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--foreground)]/80 w-fit">
                      <Terminal className="h-3 w-3" />
                      {project.category}
                    </span>

                    <div className="flex items-center gap-4 font-mono text-xs text-[var(--foreground)]/50">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {project.forks}
                      </span>
                      <span>{project.language}</span>
                    </div>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold text-[var(--foreground)] transition-colors group-hover:underline">
                    {project.title}
                  </h3>

                  {project.description && (
                    <p className="mt-1.5 text-sm text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </a>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}