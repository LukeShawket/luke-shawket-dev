// components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? 'light' : 'dark';

    // Native CSS View Transition API check
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // Trigger smooth root layout transition
      document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--foreground)]/70 transition-all hover:bg-[var(--foreground)]/10 hover:text-[var(--foreground)] active:scale-90"
      aria-label="Toggle theme"
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`absolute h-4 w-4 transition-all duration-500 ease-out ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute h-4 w-4 transition-all duration-500 ease-out ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </div>
    </button>
  );
}