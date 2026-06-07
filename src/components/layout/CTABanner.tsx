import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function CTABanner({
  title = "Ready to remove your ChatGPT watermark?",
  subtitle = "100% free · no login · images never leave your browser",
  cta = "Open the Free Tool →",
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
}) {
  return (
    <section className="my-16 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-surface to-background p-8 text-center md:p-12">
      <h2 className="font-display text-2xl font-bold md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">{subtitle}</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px"
      >
        <Sparkles className="h-4 w-4" /> {cta}
      </Link>
    </section>
  );
}
