"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { BlogPost } from "@/app/lib/posts";

interface BlogFeedProps {
  posts: BlogPost[];
}

export function BlogFeed({ posts }: BlogFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".blog-card-item");
    const containerCenter =
      container.getBoundingClientRect().top + container.clientHeight / 2;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distanceFromCenter = Math.abs(containerCenter - itemCenter);
      const maxDistance = container.clientHeight / 2;

      const scale = Math.max(
        0.92,
        1 - Math.pow(distanceFromCenter / maxDistance, 1.5) * 0.08
      );
      const opacity = Math.max(
        0.4,
        1 - Math.pow(distanceFromCenter / maxDistance, 2) * 0.6
      );

      item.style.transform = `scale(${scale})`;
      item.style.opacity = `${opacity}`;
    });
  };

  useEffect(() => {
    handleScroll();
    
    // Recalculate transforms on window resize to prevent layout collapse
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [posts]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="max-h-[560px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden divide-y divide-[var(--foreground)]/10 border-t border-b border-[var(--foreground)]/10 py-2"
      style={{ scrollBehavior: "smooth" }}
    >
      {posts.map((post, idx) => (
        <div
          key={`${post.slug}-${idx}`}
          className="blog-card-item py-5 px-2 transition-all duration-200 ease-out origin-center flex flex-col justify-center"
        >
          <Link
            href={`/blogs/${post.slug}`}
            className="group block transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              {/* Category / Tags Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </span>
              </div>
            </div>

            <h3 className="mt-2 text-xl font-bold tracking-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 flex items-center justify-between">
              <span>{post.title}</span>
              <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-emerald-500" />
            </h3>

            {post.snippet && (
              <p className="mt-1.5 text-sm text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                {post.snippet}
              </p>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}