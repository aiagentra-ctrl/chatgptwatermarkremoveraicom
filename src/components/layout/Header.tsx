import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

const otherTools = [
  { href: "/gemini-image-watermark-remover", label: "Gemini Watermark Remover" },
  { href: "/dalle-image-watermark-remover", label: "DALL-E Watermark Remover" },
  { href: "/sora-image-watermark-remover", label: "Sora Watermark Remover" },
  { href: "/midjourney-watermark-remover", label: "Midjourney Watermark Remover" },
  { href: "/grok-image-watermark-remover", label: "Grok Watermark Remover" },
  { href: "/stable-diffusion-watermark-remover", label: "Stable Diffusion Watermark Remover" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="border-b border-success/20 bg-success/10 text-center text-[11px] font-medium text-success md:text-xs">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2">
          <span>🆓 100% Free</span>
          <span className="opacity-50">·</span>
          <span>🔒 No Upload Ever</span>
          <span className="opacity-50">·</span>
          <span className="hidden sm:inline">⚡ Instant · 📦 Bulk 50</span>
          <span className="hidden sm:inline opacity-50">·</span>
          <Link to="/" className="font-semibold underline-offset-2 hover:underline">
            Remove Your ChatGPT Watermark Now →
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-lg">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xl text-primary-foreground">
              🧹
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-tight md:text-base">
                ChatGPT Watermark
              </span>
              <span className="font-display text-sm font-bold tracking-tight md:text-base">
                Remover <span className="ml-1 rounded bg-success/20 px-1.5 py-0.5 align-middle text-[9px] font-bold text-success">FREE</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 text-sm lg:flex">
            <li>
              <Link to="/" className="rounded-md px-3 py-2 font-medium text-foreground hover:bg-surface">
                🧹 The Tool
              </Link>
            </li>
            <li>
              <Link to="/how-to-remove-chatgpt-image-watermark" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-surface hover:text-foreground">
                📖 How It Works
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-md px-3 py-2 text-muted-foreground hover:bg-surface hover:text-foreground">
                ⚡ More Tools <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {dropOpen && (
                <div className="absolute right-0 top-full mt-1 grid w-[680px] grid-cols-3 gap-5 rounded-xl border border-border bg-surface p-5 shadow-2xl">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">🔍 Detect & Verify</p>
                    <ul className="space-y-1.5 text-sm">
                      <li><Link to="/detect" className="block rounded px-2 py-1 hover:bg-background hover:text-primary">ChatGPT Watermark Detector</Link></li>
                      <li><Link to="/verify" className="block rounded px-2 py-1 hover:bg-background hover:text-primary">Verify Watermark Removed</Link></li>
                      <li><Link to="/chatgpt-text-watermark-remover" className="block rounded px-2 py-1 hover:bg-background hover:text-primary">Text Watermark Remover</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">🖼️ Other AI Tools</p>
                    <ul className="space-y-1.5 text-sm">
                      {otherTools.map((t) => (
                        <li key={t.href}><Link to={t.href} className="block rounded px-2 py-1 hover:bg-background hover:text-primary">{t.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-primary/40 bg-primary/5 p-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">⭐ Specialist Tool</p>
                    <h4 className="mb-1.5 font-display text-sm font-bold">ChatGPT Image Watermark Remover</h4>
                    <p className="mb-3 text-xs text-muted-foreground">The only tool built exclusively for ChatGPT C2PA removal. Free. Private. No login.</p>
                    <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                      Use Free Tool →
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link to="/best-chatgpt-image-watermark-removers" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-surface hover:text-foreground">
                ⚔️ Vs Competitors
              </Link>
            </li>
            <li>
              <Link to="/blog" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-surface hover:text-foreground">
                📝 Blog
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px md:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" /> Remove Free
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md border border-border bg-surface p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="border-t border-border bg-surface lg:hidden">
            <ul className="mx-auto max-w-7xl space-y-1 px-4 py-3 text-sm">
              {[
                { to: "/", l: "🧹 ChatGPT Image Watermark Remover" },
                { to: "/detect", l: "🔍 Watermark Detector" },
                { to: "/verify", l: "✅ Verify Removed" },
                { to: "/chatgpt-text-watermark-remover", l: "📝 Text Watermark Remover" },
                { to: "/how-to-remove-chatgpt-image-watermark", l: "📖 How It Works" },
                { to: "/what-is-c2pa-metadata", l: "🧠 What Is C2PA?" },
                { to: "/best-chatgpt-image-watermark-removers", l: "⚔️ Vs Competitors" },
                { to: "/blog", l: "📰 Blog" },
                { to: "/faq", l: "❓ FAQ" },
                { to: "/about", l: "ℹ️ About" },
              ].map((i) => (
                <li key={i.to}>
                  <Link to={i.to} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 hover:bg-background">
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
