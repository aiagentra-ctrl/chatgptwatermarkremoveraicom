import { Upload, Search, Download } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Upload your ChatGPT images",
    desc: "Drag and drop or click to select JPEG, PNG, or WebP images. Process up to 50 at once.",
  },
  {
    n: "02",
    icon: Search,
    title: "Detect C2PA watermarks",
    desc: "We scan each file's raw bytes for C2PA / JUMBF metadata markers and flag every watermarked image — instantly, locally.",
  },
  {
    n: "03",
    icon: Download,
    title: "Clean & download",
    desc: "Hit Clean All. Each image is re-encoded via Canvas to strip every byte of metadata while preserving full visual quality.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          How it works
        </p>
        <h2 className="font-display text-4xl font-bold md:text-5xl">
          Remove ChatGPT watermarks in 3 steps
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          The entire process runs in your browser. No upload, no waiting, no account.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-primary/40"
          >
            <span className="font-mono-tabular text-xs text-muted-foreground">
              {s.n}
            </span>
            <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
