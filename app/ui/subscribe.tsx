"use client";

import { useState } from "react";
import { Mail, Wrench, ArrowRight } from "lucide-react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "notice">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("notice");
  };

  return (
    <section className="py-10 my-8 rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-8 backdrop-blur-md relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        {/* Category Label + Under Construction Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Mail className="h-3.5 w-3.5" />
            UPDATES
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Wrench className="h-3 w-3" />
            WIP / Self-Hosting Soon
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
          Get notified on new posts
        </h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
          Subscribe to get occasional updates on new posts. 
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-2xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/5 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer shrink-0"
          >
            <span>Subscribe</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Dynamic Notice when they try to click */}
        {status === "notice" && (
          <p className="mt-3 font-mono text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <span>ℹ️</span> Subscriptions are paused while homelab mail server is being built. Check back soon!
          </p>
        )}
      </div>
    </section>
  );
}