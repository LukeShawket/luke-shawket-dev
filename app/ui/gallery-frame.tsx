"use client";

import React, { useState, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export interface FrameItem {
  id: string;
  title: string;
  image: string;
  description: string;
  tag?: string;
}

interface GalleryFrameProps {
  title: string;
  subtitle?: string;
  items: FrameItem[];
}

export default function GalleryFrame({ title, subtitle, items }: GalleryFrameProps) {
  const [selectedImage, setSelectedImage] = useState<FrameItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll function for Left and Right controls
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10 border-t border-[var(--foreground)]/10">
      {/* Section Header with Left/Right Scroll Controls */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            {subtitle || "Vault Section"}
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
        </div>

        {/* Scroll Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 text-[var(--foreground)] backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 text-[var(--foreground)] backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative flex-none w-64 sm:w-72 snap-start rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 cursor-pointer"
          >
            {/* Image Thumbnail with Slight Hover Scale */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/20 mb-3">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="h-5 w-5 text-white drop-shadow-md" />
              </div>
            </div>

            {/* Item Meta */}
            {item.tag && (
              <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                #{item.tag}
              </span>
            )}
            <h3 className="text-base font-bold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-[var(--foreground)]/70 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Centered Modal Overlay (Opens on Click, Closes on Click) */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevents modal body clicks from closing
            className="relative max-w-3xl w-full rounded-3xl border border-emerald-500/40 bg-[var(--background)] p-6 shadow-2xl transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95 cursor-default"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 rounded-full bg-[var(--foreground)]/10 p-2 text-[var(--foreground)] hover:bg-[var(--foreground)]/20 transition-colors z-10"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Expanded Image View */}
            <div className="overflow-hidden rounded-2xl bg-black/30 max-h-[60vh] flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[60vh] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Content Details */}
            <div className="mt-4 text-center sm:text-left">
              {selectedImage.tag && (
                <span className="inline-block rounded-md bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                  #{selectedImage.tag}
                </span>
              )}
              <h3 className="text-2xl font-bold tracking-tight">
                {selectedImage.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/80 leading-relaxed max-w-2xl">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}