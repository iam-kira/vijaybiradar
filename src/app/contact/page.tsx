"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryPageShell } from "@/components/shared/StoryPageShell";
import { getStoryTheme } from "@/lib/storyThemes";
import { useSound } from "@/hooks/useSound";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const theme = getStoryTheme("contact");
  const { playSfx, mode } = useSound();

  const handleFocus = () => {
    if (mode === "cinematic") playSfx("keyboardType");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: Replace YOUR_FORM_ID with your Formspree form ID
    // Sign up at https://formspree.io and create a form to get the ID
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <StoryPageShell theme={theme} className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          title="The Call"
          subtitle="Every great journey begins with a conversation."
          accent="blue"
        />

        <div className="mb-10 rounded-3xl border border-accent-gold/25 bg-gradient-to-br from-accent-gold/10 via-transparent to-accent-purple/10 p-8 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-accent-gold">Chapter 12 · The Call</p>
          <h3 className="font-display text-3xl text-white md:text-5xl">
            If the mission matters, the next step should begin with a conversation.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="mailto:vijaybiradar.work@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all text-sm"
          >
            📧 Email
          </a>
          <a
            href="https://www.linkedin.com/in/vijay-biradar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all text-sm"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/iam-kira"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all text-sm"
          >
            🐙 GitHub
          </a>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="card-base p-8 space-y-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {status === "sent" ? (
            <div className="text-center py-8">
              <p className="text-2xl mb-3">✅</p>
              <p className="text-text-primary font-semibold">Message sent!</p>
              <p className="text-text-muted text-sm mt-1">I&apos;ll get back to you soon.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 text-xs text-accent-blue underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={handleFocus}
                  placeholder="Your name"
                  className="w-full bg-bg-overlay border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue/40 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={handleFocus}
                  placeholder="your@email.com"
                  className="w-full bg-bg-overlay border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue/40 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={handleFocus}
                  placeholder="What would you like to discuss?"
                  className="w-full bg-bg-overlay border border-white/10 rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-blue/40 focus:outline-none transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-accent-red font-mono">
                  Something went wrong. Please try again or email directly.
                </p>
              )}

              <p className="text-[10px] text-text-muted font-mono">
                Note: Wire up Formspree by replacing YOUR_FORM_ID in the source code.
              </p>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold text-sm hover:shadow-glow-blue transition-all disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>
            </>
          )}
        </motion.form>
      </div>
    </StoryPageShell>
  );
}
