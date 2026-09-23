"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "subscribed" | "notice">("idle");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;
    setStatus("notice");
  };

  return (
    <div className="mt-8 w-full">
      <form onSubmit={handleSubmit} className="relative flex w-full items-center">
        <input
          type="email"
          placeholder="Subscribe via email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          className="w-full rounded-full border border-[var(--foreground)]/15 bg-[var(--foreground)]/[0.03] pl-5 pr-14 py-3.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--foreground)]/40 focus:bg-transparent focus:outline-none transition-all duration-200"
        />

        {/* Animated Inline Button Indicator */}
        <button
          type="submit"
          disabled={!isValidEmail}
          aria-label="Submit Email Subscription"
          className={`absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
            isValidEmail
              ? "bg-[var(--foreground)] text-[var(--background)] opacity-100 scale-100 cursor-pointer shadow-sm hover:opacity-90 active:scale-95"
              : "bg-[var(--foreground)]/10 text-[var(--foreground)]/30 opacity-0 scale-75 pointer-events-none"
          }`}
        >
          {status === "subscribed" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </form>

      {/* Status Notice Message */}
      {status === "notice" && (
        <p className="mt-2.5 font-mono text-xs text-[var(--foreground)]/70 flex items-center gap-1.5 px-2">
          <span>ℹ️</span> Subscriptions paused while mail server is being built.
        </p>
      )}
    </div>
  );
}