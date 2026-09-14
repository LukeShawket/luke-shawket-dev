// components/nav.tsx
import Link from 'next/link';
import { ThemeToggle } from '@/app/ui/theme-toggle'; // Ensure this path is correct
import { VisualAnchor } from '@/app/ui/logo';

export function Nav() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
  ];

  return (
    // Keep original container spacing and max-width
    <header className="sticky top-4 z-50 mx-auto max-w-5xl px-4 sm:px-6">
      {/* 
        Restored wide container: border, rounded, blur.
        Using justify-between to anchor Left and Right.
      */}
      <div className="flex items-center justify-between gap-3 rounded-full border border-[var(--foreground)]/10 bg-[var(--background)]/70 px-4 sm:px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-md transition-colors duration-200">
        
        {/* === LEFT SIDE === */}
        {/* Replaced profile picture with the geometric abstract graphic */}
        <Link href="/" className="group relative block rounded-full transition-transform hover:scale-105 active:scale-95" aria-label="Home">
          <VisualAnchor />
        </Link>

        {/* === RIGHT SIDE (Nav + Toggle) === */}
        {/* We use flex-1 and justify-center here on the nav container 
            to pull the navigation links inward toward the center of the total bar. */}
        <div className="flex flex-1 items-center justify-center gap-1 sm:gap-4">
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[var(--foreground)]/70 transition-all hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] active:bg-[var(--foreground)]/10 sm:px-4"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* === EXTREME RIGHT === */}
        <div className="flex items-center gap-2">
          {/* Vertical Divider */}
          <div className="h-5 w-[1px] bg-[var(--foreground)]/15" />

          {/* Theme Toggle - Now grouped on the far right */}
          <div className="p-0.5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}