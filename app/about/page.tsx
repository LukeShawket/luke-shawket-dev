import { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/ui/nav";
import { 
  Briefcase, 
  GraduationCap, 
  ArrowUpRight, 
  Sparkles,
  MapPin,
  Cpu,
  FileText,
  Globe,
  Mail
} from "lucide-react";
import { getAboutWebsitePost } from "@/app/lib/posts";

export const metadata: Metadata = {
  title: "About | Luke Shawket",
  description: "Learn more about Luke Shawket, background, technical skills, and experience.",
};

export default async function About() {
  const aboutPost = await getAboutWebsitePost();

  const experience = [
    {
      role: "Business Systems Analyst",
      period: "Current",
      description: "Analyzing business workflows, building data processing tools, and optimizing enterprise system architectures.",
      tags: ["Systems Analysis", "Python", "Data Automation"],
    },
    {
      role: "Data Analyst",
      period: "Prior",
      description: "Cleaned, transformed, and visualized large dataset pipelines to support business decision-making and operational insight.",
      tags: ["SQL", "Pandas", "ETL"],
    },
    {
      role: "Game Developer",
      period: "Prior",
      description: "Contributed to indie mobile game projects, implementing gameplay features and resolving bug backlogs in C#.",
      tags: ["Unity 3D", "C#", "Mobile Dev"],
    },
  ];

  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* Background Accent Glow Effect matching Home */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        {/* HEADER SECTION */}
        <section className="relative pb-12 sm:pb-16">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Background &amp; Profile
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-[1.1]">
            About{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Me
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--foreground)]/70 sm:text-xl leading-relaxed font-medium">
            Hi! I'm Luke Shawket, a Uyghur based in the US. By day, I work as a Business Systems Analyst, 
            spending most of my time working with data, ERP systems, and user workflows. 
            Outside of my day job, I'm still usually surrounded by code, building personal programming projects, 
            tinkering with data and coding for fun.
          </p>
        </section>

        {/* BIO & QUICK FACTS SECTION */}
        <section className="py-10 border-t border-[var(--foreground)]/10">
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Bio Card */}
            <div className="sm:col-span-2 rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-8 backdrop-blur-md">
              <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
              <div className="mt-4 space-y-4 text-[var(--foreground)]/80 leading-relaxed text-base">
                <p>
                  I specialize in enterprise system support and optimization, primarily working with ERP platforms to resolve user issues, querying messy database, building reports, streamline business workflows, and train teams on best practices.
                </p>
                <p>
                  Outside of work, I love experimenting with new tools and tech, building software and games, exploring machine learning and web development.
                </p>
              </div>
            </div>

            {/* Quick Stats / Info Stack */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground)]/60">
                  <MapPin className="h-4 w-4 text-emerald-500" /> Location
                </div>
                <div className="mt-1 font-semibold">Grand Rapids, MI</div>
              </div>

              <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground)]/60">
                  <GraduationCap className="h-4 w-4 text-emerald-500" /> Education
                </div>
                <div className="mt-1 font-semibold">B.S. Public Administration</div>
              </div>

              <div className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--foreground)]/60">
                  <Cpu className="h-4 w-4 text-emerald-500" /> OS / Environment
                </div>
                <div className="mt-1 font-semibold">Arch Linux / Windows Dual-Boot</div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE / CAREER SECTION */}
        <section className="py-12 border-t border-[var(--foreground)]/10">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Briefcase className="h-3.5 w-3.5" /> Career Journey
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Experience
          </h2>

          <div className="mt-8 space-y-4">
            {experience.map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-6 backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold">{item.role}</h3>
                  <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT THIS SITE & RESUME LINKS */}
        <section className="py-12 border-t border-[var(--foreground)]/10 grid gap-6 sm:grid-cols-2">
          {/* Dynamic "About This Website" Card */}
          {aboutPost ? (
            <Link
              href={`/blogs/${aboutPost.slug}`}
              className="group relative flex flex-col justify-between rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Globe className="h-4 w-4" /> SITE ARCHITECTURE
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--foreground)]/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {aboutPost.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed line-clamp-2">
                  {aboutPost.snippet || "Read the write-up on how, why, and when this site was built."}
                </p>
              </div>
              <div className="mt-6 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Read article &rarr;
              </div>
            </Link>
          ) : (
            <div className="rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-7 backdrop-blur-md">
              <span className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Globe className="h-4 w-4" /> SITE ARCHITECTURE
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">About This Website</h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
                Post loading...
              </p>
            </div>
          )}

          {/* Resume Link */}
          <a
            href="/Luke%20Shawket.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-7 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <FileText className="h-4 w-4" /> CURRICULUM VITAE
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--foreground)]/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                View Resume
              </h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
                Download or view my full professional background, skill set, and work experience.
              </p>
            </div>
            <div className="mt-6 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Open PDF &rarr;
            </div>
          </a>
        </section>

        {/* GET IN TOUCH CTA */}
        <section className="mt-4 rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-8 text-center backdrop-blur-md">
          <h2 className="text-2xl font-bold tracking-tight">Let&apos;s Connect</h2>
          <p className="mt-2 text-sm text-[var(--foreground)]/70 max-w-md mx-auto">
            Interested in discussing systems, data automation, or game development projects?
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="mailto:lukeshawket@outlook.com"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600"
            >
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}