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

interface SliderStyle {
  left: number;
  width: number;
  top: number;
  height: number;
  opacity: number;
  isInitial: boolean;
  isVertical: boolean;
}

// Module-level cache: survives Next.js page re-renders/mounts
let globalLastNavRect: { left: number; width: number; top: number; height: number; isVertical: boolean } | null = null;

export function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: FilledHome, label: 'Home' },
    { name: 'Blogs', href: '/blogs', icon: FilledBlog, label: 'Blogs' },
    { name: 'About', href: '/about', icon: FilledUser, label: 'About' },
  ];

  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [sliderStyle, setSliderStyle] = useState<SliderStyle>(() => {
    if (globalLastNavRect) {
      return {
        ...globalLastNavRect,
        opacity: 1,
        isInitial: false,
      };
    }
    return { left: 0, width: 0, top: 0, height: 0, opacity: 0, isInitial: true, isVertical: false };
  });

  useLayoutEffect(() => {
    const updatePosition = () => {
      const isVertical = window.innerWidth >= 640; // sm breakpoint in Tailwind (640px)

      const activeIndex = navLinks.findIndex((link) =>
        link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
      );

      if (activeIndex !== -1 && navRefs.current[activeIndex]) {
        const activeEl = navRefs.current[activeIndex];
        if (activeEl) {
          const targetLeft = activeEl.offsetLeft;
          const targetWidth = activeEl.offsetWidth;
          const targetTop = activeEl.offsetTop;
          const targetHeight = activeEl.offsetHeight;

          requestAnimationFrame(() => {
            setSliderStyle({
              left: targetLeft,
              width: targetWidth,
              top: targetTop,
              height: targetHeight,
              opacity: 1,
              isInitial: false,
              isVertical,
            });
          });

          globalLastNavRect = {
            left: targetLeft,
            width: targetWidth,
            top: targetTop,
            height: targetHeight,
            isVertical,
          };
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [pathname]);

  return (
    // Container: Floating Top on Mobile, Floating Left on Desktop (sm)
    <aside className="fixed top-4 left-1/2 -translate-x-1/2 z-50 sm:top-1/2 sm:left-24 sm:translate-x-0 sm:-translate-y-1/2">
      {/* Floating Capsule Bar with higher transparency */}
      <div className="relative flex flex-row sm:flex-col items-center gap-2 rounded-full border border-[var(--foreground)]/10 bg-[var(--background)]/30 p-1.5 sm:p-2 shadow-lg backdrop-blur-md">
        <nav className="relative flex flex-row sm:flex-col items-center gap-1 sm:gap-1.5" aria-label="Main Navigation">
          {/* Responsive Directional Sliding Pill */}
          <span
            className={`absolute rounded-full bg-[var(--foreground)] ${
              sliderStyle.isInitial
                ? 'transition-none'
                : 'transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]'
            }`}
            style={{
              ...(sliderStyle.isVertical
                ? {
                    top: `${sliderStyle.top}px`,
                    height: `${sliderStyle.height}px`,
                    left: 0,
                    right: 0,
                    width: 'auto',
                  }
                : {
                    left: `${sliderStyle.left}px`,
                    width: `${sliderStyle.width}px`,
                    top: 0,
                    bottom: 0,
                    height: 'auto',
                  }),
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
                className={`relative z-10 flex h-10 w-12 sm:h-12 sm:w-12 items-center justify-center rounded-full transition-colors duration-300 ${
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

        {/* Divider line rotates on breakpoint */}
        <div className="h-5 w-[1px] sm:h-[1px] sm:w-5 bg-[var(--foreground)]/20 my-0 sm:my-0.5 mx-0.5 sm:mx-0" />

        <div className="p-0.5 text-[var(--foreground)]/70 hover:text-[var(--foreground)]">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}