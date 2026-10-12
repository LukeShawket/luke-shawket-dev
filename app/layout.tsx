import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/ui/theme";
import { Footer } from "@/app/ui/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lukeshawket.com"),
  title: {
    default: "Luke Shawket | Developer",
    template: "%s | Luke Shawket",
  },
  description: "Personal Website, projects, blogs, and experiments.",
  verification: {
    google: "google6710fb3401ef1e29", // Extracted from your token
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth overflow-x-hidden max-w-full"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen w-full max-w-full overflow-x-hidden font-sans antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)] transition-colors duration-200 flex flex-col justify-between`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex-1 w-full max-w-full overflow-x-hidden">
            {/* pt-20 on mobile gives room for top floating nav; sm:pt-0 leaves desktop layout as-is */}
            <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-0">
              {children}
            </main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}