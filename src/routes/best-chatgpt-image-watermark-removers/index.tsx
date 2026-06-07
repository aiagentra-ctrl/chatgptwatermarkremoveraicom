import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { COMPETITORS } from "@/content/comparisons";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const TITLE = "Best ChatGPT Image Watermark Removers Compared (2026)";
const DESCRIPTION =
  "Every public ChatGPT watermark remover tested side-by-side. Privacy, accuracy, login requirements, schema markup — see the full feature matrix.";
const PATH = "/best-chatgpt-image-watermark-removers";

export const Route = createFileRoute("/best-chatgpt-image-watermark-removers/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: PATH }),
    links: canonical(PATH),
    scripts: [
      breadcrumbLd([{ name: "Best Removers 2026", path: PATH }]),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ChatGPT Watermark Remover (this site)", url: "/" },
            ...COMPETITORS.map((c, i) => ({
              "@type": "ListItem",
              position: i + 2,
              name: c.competitor,
              url: `/chatgpt-watermark-remover-vs-${c.slug}`,
            })),
          ],
        }),
      },
    ],
  }),
  component: BestPage,
});

function BestPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Best Removers 2026", path: PATH }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Comparison</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          The Best ChatGPT Image Watermark Removers (2026)
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          We tested every tool that claims to remove ChatGPT watermarks. Most of them are
          not what they look like. Here is the honest breakdown.
        </p>

        <div className="mt-10 space-y-4">
          {[
            { name: "ChatGPT Watermark Remover (this site)", note: "Free · No login · 100% client-side · Specialist", grade: "A+" },
            { name: "GPTCleanup.com", note: "Works, but requires account login. Generalist directory.", grade: "B" },
            { name: "AIWatermarkRemover.online", note: "Embeds a Hugging Face iframe — uploads your image to a server.", grade: "C" },
            { name: "GPTWatermark.com", note: "Text watermarks only — does not handle images at all.", grade: "D" },
          ].map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5"
            >
              <div>
                <h3 className="font-display text-lg font-bold">{r.name}</h3>
                <p className="text-sm text-muted-foreground">{r.note}</p>
              </div>
              <span
                className={`rounded-md px-3 py-1.5 text-sm font-bold ${
                  r.grade === "A+" ? "bg-success text-success-foreground" : "bg-surface-2"
                }`}
              >
                {r.grade}
              </span>
            </div>
          ))}
        </div>

        {COMPETITORS.map((c) => (
          <section key={c.slug} className="mt-16">
            <h2 className="font-display text-2xl font-bold">
              Us vs {c.competitor}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
            <ComparisonTable
              us={{ name: "ChatGPT Watermark Remover", tagline: "Specialist · Free · No login" }}
              them={{ name: c.competitor, tagline: c.tagline }}
              rows={c.rows.slice(0, 6)}
            />
            <Link
              to={`/chatgpt-watermark-remover-vs-${c.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Read the full {c.competitor} breakdown →
            </Link>
          </section>
        ))}

        <CTABanner />
      </div>
    </PageShell>
  );
}
