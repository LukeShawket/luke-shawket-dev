"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, X } from "lucide-react";
import { BlogPost } from "@/app/lib/posts";

interface BlogFeedProps {
  posts: BlogPost[];
}

export function BlogFeed({ posts }: BlogFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  // Extract available years
  const availableYears = useMemo(() => {
    const years = new Set<string>();
    posts.forEach((post) => {
      if (post.date) {
        const year = new Date(post.date).getFullYear().toString();
        if (!isNaN(Number(year))) years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [posts]);

  // Extract available tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const postYear = post.date ? new Date(post.date).getFullYear().toString() : null;
      const matchesYear = selectedYear === "ALL" || postYear === selectedYear;
      const matchesTag = selectedTag === "ALL" || post.tags?.includes(selectedTag);
      return matchesYear && matchesTag;
    });
  }, [posts, selectedYear, selectedTag]);

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
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [filteredPosts]);

  const hasActiveFilter = selectedYear !== "ALL" || selectedTag !== "ALL";

  return (
    <div className="space-y-3">
      {/* Subtle Top Controls Bar */}
      <div className="flex items-center justify-between font-mono text-xs text-[var(--foreground)]/50 px-1 pb-1">
        <span className="uppercase tracking-wider">
          All Articles ({filteredPosts.length})
        </span>

        {/* Filters Top-Right Corner */}
        <div className="flex items-center gap-2">
          {hasActiveFilter && (
            <button
              onClick={() => {
                setSelectedYear("ALL");
                setSelectedTag("ALL");
              }}
              className="inline-flex items-center gap-1 text-[var(--foreground)] hover:opacity-70 transition-opacity mr-1 cursor-pointer"
              title="Clear filters"
            >
              <X className="h-3 w-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Year Dropdown */}
          {availableYears.length > 0 && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-lg border border-[var(--foreground)]/15 bg-[var(--background)] px-2 py-1 text-xs text-[var(--foreground)]/80 focus:border-[var(--foreground)]/40 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Year: All</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}

          {/* Tag Dropdown */}
          {availableTags.length > 0 && (
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="rounded-lg border border-[var(--foreground)]/15 bg-[var(--background)] px-2 py-1 text-xs text-[var(--foreground)]/80 focus:border-[var(--foreground)]/40 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Tag: All</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Scrollable Feed Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="max-h-[560px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden divide-y divide-[var(--foreground)]/10 border-t border-b border-[var(--foreground)]/15 py-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-[var(--foreground)]/50">
            No articles found matching criteria.
          </div>
        ) : (
          filteredPosts.map((post, idx) => (
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
                          className="inline-flex items-center rounded-md bg-[var(--foreground)]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--foreground)]/80"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-xs font-semibold text-[var(--foreground)]/70">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Date Metadata */}
                  <div className="flex items-center gap-3 font-mono text-xs text-[var(--foreground)]/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                </div>

                <h3 className="mt-2 text-xl font-bold tracking-tight text-[var(--foreground)] group-hover:underline flex items-center justify-between">
                  <span>{post.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--foreground)]" />
                </h3>

                {post.snippet && (
                  <p className="mt-1.5 text-sm text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                    {post.snippet}
                  </p>
                )}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}