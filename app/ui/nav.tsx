// components/nav.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/app/ui/theme-toggle'

export function Nav() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="flex items-center justify-between rounded-full border border-[var(--foreground)]/10 bg-[var(--background)]/70 px-6 py-3 shadow-lg shadow-black/5 backdrop-blur-md transition-colors duration-200">
        {/* Brand Logo with globe.svg */}
        <Link href="/" className="group relative flex items-center justify-center overflow-hidden rounded-full p-0.5 border-2 border-emerald-500/70 transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-[0_0_12px_#10b981]">
          <Image
            src="/luke.png"
            alt="Luke Shawket profile picture"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Sweeping Light Ray / Scanline */}
          <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent transition-transform duration-500 group-hover:translate-y-full" />
        </Link>

        {/* Main Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[var(--foreground)]/70 transition-all hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)]"
            >
              {link.name}
            </Link>
          ))}

          {/* Vertical Divider */}
          <div className="mx-1 h-4 w-[1px] bg-[var(--foreground)]/15" />

          {/* Theme Toggle */}
          <div className="pl-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}