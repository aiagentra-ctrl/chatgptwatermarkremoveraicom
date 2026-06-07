import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight">
                WatermarkOut
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              The free, private chatgpt watermark remover. 100% client-side. No accounts,
              no uploads, no tracking.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#tool" className="hover:text-foreground">Tool</a>
            <a href="#how-it-works" className="hover:text-foreground">How it works</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} WatermarkOut · Not affiliated with OpenAI or the
          C2PA Coalition. ChatGPT and Sora are trademarks of OpenAI.
        </div>
      </div>
    </footer>
  );
}
