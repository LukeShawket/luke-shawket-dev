'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/app/ui/theme-toggle';

function FilledHome({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.47 2.47a.75.75 0 0 1 1.06 0l9 9a.75.75 0 0 1-1.06 1.06l-.97-.97V21a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H4.5A.75.75 0 0 1 3.75 21V11.56l-.97.97a.75.75 0 0 1-1.06-1.06l9-9Z" />
    </svg>
  );
}

function FilledBlog({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.25 3v17.25c0 .414-.336.75-.75.75H4.5A2.25 2.25 0 0 1 2.25 18.75V5.25A2.25 2.25 0 0 1 4.5 3h6.75Z" />
      <path d="M12.75 3v17.25c0 .414.336.75.75.75h6c1.243 0 2.25-1.007 2.25-2.25V5.25A2.25 2.25 0 0 0 19.5 3h-6.75Z" />
    </svg>
  );
}

function FilledUser({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.6-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
  );
}

// Module-level cache: survives Next.js page re-renders/mounts!
let globalLastNavRect: { left: number; width: number } | null = null;

export function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: FilledHome, label: 'Home' },
    { name: 'Blogs', href: '/blogs', icon: FilledBlog, label: 'Blogs' },
    { name: 'About', href: '/about', icon: FilledUser, label: 'About' },
  ];

  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Initialize with the cached previous position if it exists
  const [sliderStyle, setSliderStyle] = useState(() => {
    if (globalLastNavRect) {
      return {
        left: globalLastNavRect.left,
        width: globalLastNavRect.width,
        opacity: 1,
        isInitial: false,
      };
    }
    return { left: 0, width: 0, opacity: 0, isInitial: true };
  });

  useLayoutEffect(() => {
    const activeIndex = navLinks.findIndex((link) =>
      link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
    );

    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const activeEl = navRefs.current[activeIndex];
      if (activeEl) {
        const targetLeft = activeEl.offsetLeft;
        const targetWidth = activeEl.offsetWidth;

        // Trigger animation from previous position to target position
        requestAnimationFrame(() => {
          setSliderStyle({
            left: targetLeft,
            width: targetWidth,
            opacity: 1,
            isInitial: false,
          });
        });

        // Save target rect in module memory for the next page transition
        globalLastNavRect = { left: targetLeft, width: targetWidth };
      }
    }
  }, [pathname]);

  return (
    <header className="sticky top-6 z-50 flex justify-center px-4">
      <div className="relative flex items-center gap-2 py-1">
        <nav className="relative flex items-center gap-1 sm:gap-1.5" aria-label="Main Navigation">
          {/* Directional Sliding Pill */}
          <span
            className={`absolute top-0 bottom-0 rounded-full bg-[var(--foreground)] ${
              sliderStyle.isInitial
                ? 'transition-none'
                : 'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]'
            }`}
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              opacity: sliderStyle.opacity,
            }}
          />

          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                href={link.href}
                aria-label={link.label}
                aria-current={isActive ? 'page' : undefined}
                className={`relative z-10 flex h-10 w-12 sm:w-14 items-center justify-center rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'text-[var(--background)]'
                    : 'text-[var(--foreground)]/50 hover:text-[var(--foreground)]'
                }`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${isActive ? 'scale-105' : 'hover:scale-105'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="h-5 w-[1px] bg-[var(--foreground)]/20 mx-0.5" />

        <div className="p-0.5 text-[var(--foreground)]/70 hover:text-[var(--foreground)]">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}