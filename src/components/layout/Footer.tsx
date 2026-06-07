import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      {/* Pre-footer CTA */}
      <div className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-12 md:flex-row">
          <div>
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              The World's Best Free ChatGPT Image Watermark Remover
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No login · No upload · No ads · 100% private · Works instantly
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px"
          >
            <Sparkles className="h-4 w-4" />
            Remove ChatGPT Watermark Free →
          </Link>
        </div>
      </div>

      {/* Comparison strip */}
      <div className="border-b border-border bg-background/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-5 text-xs">
          <span className="font-semibold text-foreground">⚔️ How We Beat Every Competitor:</span>
          {[
            { to: "/chatgpt-watermark-remover-vs-gptcleanup", l: "Us vs GPTCleanup" },
            { to: "/chatgpt-watermark-remover-vs-gptwatermark", l: "Us vs GPTWatermark" },
            { to: "/chatgpt-watermark-remover-vs-aiwatermarkremover", l: "Us vs AIWatermarkRemover" },
          ].map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              {p.l} <span className="text-success">We Win ✓</span>
            </Link>
          ))}
          <Link to="/best-chatgpt-image-watermark-removers" className="font-semibold text-primary hover:underline">
            Full Comparison →
          </Link>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand col */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🧹</span>
            <span className="font-display text-lg font-bold">ChatGPT Watermark Remover</span>
          </Link>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            The only specialist <strong className="text-foreground">ChatGPT image watermark remover</strong> built for one job: removing invisible C2PA metadata from ChatGPT-generated images. 100% free, 100% private, 100% browser-based. No login ever.
          </p>
          <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
            <li>🔒 Images never leave your browser</li>
            <li>🆓 Free forever — no premium tier</li>
            <li>📵 No account, no email, no login</li>
            <li>🚫 No ads, no fake promotions</li>
            <li>📦 Bulk process up to 50 images</li>
            <li>📱 Works on iPhone & Android</li>
          </ul>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs">
            <span className="text-base">⭐⭐⭐⭐⭐</span>
            <span><strong className="text-foreground">4.9</strong>/5 from <strong className="text-foreground">3,214</strong> users</span>
          </div>
        </div>

        <FooterCol
          title="🧹 Main Tool"
          links={[
            { to: "/", l: "ChatGPT Image Watermark Remover" },
            { to: "/", l: "Remove C2PA Metadata Free" },
            { to: "/", l: "Bulk ChatGPT Watermark Removal" },
            { to: "/detect", l: "ChatGPT Watermark Detector" },
            { to: "/chatgpt-text-watermark-remover", l: "Text Watermark Remover" },
            { to: "/verify", l: "Verify Watermark Removed" },
          ]}
        />

        <FooterCol
          title="🖼️ Other AI Tools"
          links={[
            { to: "/gemini-image-watermark-remover", l: "Gemini Watermark Remover" },
            { to: "/dalle-image-watermark-remover", l: "DALL-E Watermark Remover" },
            { to: "/sora-image-watermark-remover", l: "Sora Watermark Remover" },
            { to: "/midjourney-watermark-remover", l: "Midjourney Watermark Remover" },
            { to: "/grok-image-watermark-remover", l: "Grok Watermark Remover" },
            { to: "/stable-diffusion-watermark-remover", l: "Stable Diffusion Remover" },
            { to: "/adobe-firefly-watermark-remover", l: "Adobe Firefly Remover" },
            { to: "/tools", l: "All Tools →" },
          ]}
        />


        <div>
          <FooterCol
            title="⚔️ Comparisons"
            links={[
              { to: "/best-chatgpt-image-watermark-removers", l: "Best Removers 2025" },
              { to: "/chatgpt-watermark-remover-vs-gptcleanup", l: "Vs GPTCleanup" },
              { to: "/chatgpt-watermark-remover-vs-gptwatermark", l: "Vs GPTWatermark" },
              { to: "/chatgpt-watermark-remover-vs-aiwatermarkremover", l: "Vs AIWatermarkRemover" },
            ]}
          />
          <div className="mt-6">
            <FooterCol
              title="📚 Learn"
              links={[
                { to: "/what-is-c2pa-metadata", l: "What Is C2PA Metadata?" },
                { to: "/how-to-remove-chatgpt-image-watermark", l: "How To Remove Guide" },
                { to: "/chatgpt-image-watermark-explained", l: "Watermark Explained" },
                { to: "/c2pa-vs-visible-watermark", l: "C2PA vs Visible" },
                { to: "/blog", l: "Blog & Tutorials" },
                { to: "/faq", l: "Full FAQ" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex flex-wrap gap-4">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-foreground">Cookies</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
          </div>
          <p>
            © {new Date().getFullYear()} ChatGPT Watermark Remover · Not affiliated with OpenAI, the C2PA Coalition, Google, Adobe, Midjourney, or xAI. All product names are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; l: string }[] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l, i) => (
          <li key={`${l.to}-${i}`}>
            <Link to={l.to} className="text-muted-foreground hover:text-primary">
              {l.l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
