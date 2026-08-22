"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call (replace with your actual newsletter endpoint / ConvertKit / Resend / etc.)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-10 my-8 rounded-3xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/5 p-8 backdrop-blur-md relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        {/* Category Label */}
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Mail className="h-3.5 w-3.5" />
          UPDATES
        </div>

        {/* Heading & Subtitle */}
        <h3 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
          Get notified on new posts
        </h3>
        <p className="mt-2 text-sm text-[var(--foreground)]/70 leading-relaxed">
          Subscribe to get occasional updates on new posts.
        </p>

        {/* Subscription Form */}
        {status === "success" ? (
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>You&apos;re not subscribed! THis feature is work in progress.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 rounded-2xl border border-[var(--foreground)]/15 bg-[var(--foreground)]/5 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 text-sm transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}