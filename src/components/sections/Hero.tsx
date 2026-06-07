import { ArrowDown, Lock, Zap, Gift } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.35) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-20 text-center md:pt-28">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
          Removes invisible C2PA metadata embedded by OpenAI
        </div>

        <h1
          className="animate-fade-up mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl"
          style={{ animationDelay: "60ms" }}
        >
          ChatGPT Image
          <br />
          <span className="text-primary">Watermark Remover</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          Strip invisible C2PA watermark metadata from ChatGPT-generated images in
          seconds. Free, instant, and 100% private — every byte stays in your browser.
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "180ms" }}
        >
          <a
            href="#tool"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-0.5"
          >
            Remove Watermark Now
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            How it works
          </a>
        </div>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
          style={{ animationDelay: "240ms" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-success" /> 100% Private
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-success" /> Instant
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Gift className="h-3.5 w-3.5 text-success" /> Free Forever
          </span>
          <span className="inline-flex items-center gap-1.5">
            ⚙️ No signup
          </span>
        </div>
      </div>
    </section>
  );
}
