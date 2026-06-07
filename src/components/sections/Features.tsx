import { Lock, Zap, Layers, Image as ImageIcon, WifiOff, Gauge } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "100% client-side",
    desc: "Your images never leave the browser. Zero uploads, zero servers, zero logs.",
  },
  {
    icon: Layers,
    title: "Bulk processing",
    desc: "Clean up to 50 ChatGPT images in a single session — perfect for content batches.",
  },
  {
    icon: ImageIcon,
    title: "All major formats",
    desc: "Works with JPEG, PNG, and WebP — the formats ChatGPT and Sora use today.",
  },
  {
    icon: Gauge,
    title: "Pixel-perfect quality",
    desc: "Re-encoded at 97% JPEG quality or lossless PNG. Only metadata is removed.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    desc: "After the first page load, the tool keeps running with no internet connection.",
  },
  {
    icon: Zap,
    title: "Instant detection",
    desc: "C2PA / JUMBF markers are detected in milliseconds with a transparent badge per image.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            The fastest, safest C2PA remover
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
