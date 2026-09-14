// components/footer.tsx
import Link from "next/link";
import Image from "next/image";

export function Footer() {

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/LukeShawket",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/lukeshawket",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
        </svg>
      ),
    },
    {
      name: "itch.io",
      href: "https://pixelluke.itch.io/",
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.208 2.5a.708.708 0 0 0-.708.708v.025c0 .324.223.606.539.683l.89.215v15.738a.708.708 0 0 0 .708.708h14.722a.708.708 0 0 0 .708-.708V4.131l.89-.215a.708.708 0 0 0 .539-.683v-.025a.708.708 0 0 0-.708-.708H3.208zm3.208 4.25h11.168v11.168H6.416V6.75zm1.884 2.12a.708.708 0 0 0-.708.708v2.834a.708.708 0 0 0 1.416 0V9.578a.708.708 0 0 0-.708-.708zm7.4 0a.708.708 0 0 0-.708.708v2.834a.708.708 0 0 0 1.416 0V9.578a.708.708 0 0 0-.708-.708z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="mx-auto max-w-5xl px-6 py-12 border-t border-[var(--foreground)]/10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2">
          <Link href="/" className="group relative flex items-center justify-center overflow-hidden rounded-full p-0.5 border-2 border-emerald-500/70 transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-[0_0_12px_#10b981]">
            <Image
              src="/profile.ico"
              alt="Luke Shawket profile picture"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Sweeping Light Ray / Scanline */}
            <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent transition-transform duration-500 group-hover:translate-y-full" />
          </Link>
          <span className="text-[var(--foreground)]/30">•</span>
          <p className="font-mono text-xs text-[var(--foreground)]/50">
            © {new Date().getFullYear()} Luke Shawket
          </p>
        </div>

        <span className="hidden sm:inline text-[var(--foreground)]/30">•</span>

        {/* Social Links with Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="flex items-center gap-1.5 rounded-lg p-2 text-[var(--foreground)]/60 transition-colors hover:bg-[var(--foreground)]/5 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {social.icon}
              <span className="font-mono text-xs font-medium">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}