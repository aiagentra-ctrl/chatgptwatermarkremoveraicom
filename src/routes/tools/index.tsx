import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { RELATED_TOOLS } from "@/content/related-tools";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const PATH = "/tools";
const TITLE = "All AI Watermark Removal Tools — ChatGPT, Gemini, DALL-E, Sora & More";
const DESC =
  "Browse every free, browser-based AI watermark remover in our toolkit. Specialist tools for ChatGPT, Gemini, DALL-E, Sora, Midjourney, Stable Diffusion, Adobe Firefly and Grok.";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESC, path: PATH }),
    links: canonical(PATH),
    scripts: [
      breadcrumbLd([{ name: "All Tools", path: PATH }]),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "AI Watermark Removal Tools",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ChatGPT Image Watermark Remover", url: "https://chatgptwatermarkremoverai.com/" },
            { "@type": "ListItem", position: 2, name: "ChatGPT Watermark Detector", url: "https://chatgptwatermarkremoverai.com/detect" },
            { "@type": "ListItem", position: 3, name: "Verify Watermark Removed", url: "https://chatgptwatermarkremoverai.com/verify" },
            { "@type": "ListItem", position: 4, name: "ChatGPT Text Watermark Remover", url: "https://chatgptwatermarkremoverai.com/chatgpt-text-watermark-remover" },
            ...RELATED_TOOLS.map((t, i) => ({
              "@type": "ListItem",
              position: 5 + i,
              name: `${t.ai} Watermark Remover`,
              url: `https://chatgptwatermarkremoverai.com/${t.slug}`,
            })),
          ],
        }),
      },
    ],
  }),
  component: ToolsHub,
});

const CORE = [
  {
    to: "/",
    title: "ChatGPT Image Watermark Remover",
    desc: "The main tool. Strip invisible C2PA metadata from any ChatGPT image in seconds, entirely in your browser.",
  },
  {
    to: "/detect",
    title: "ChatGPT Watermark Detector",
    desc: "Read-only scan. Check whether an image contains a C2PA JUMBF block without modifying the file.",
  },
  {
    to: "/verify",
    title: "Verify Watermark Removed",
    desc: "Confirm a cleaned image is fully metadata-free before you publish or share it.",
  },
  {
    to: "/chatgpt-text-watermark-remover",
    title: "ChatGPT Text Watermark Remover",
    desc: "Strip hidden Unicode and zero-width characters from ChatGPT-generated text.",
  },
] as const;

function ToolsHub() {
  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "All Tools", path: PATH }]} />
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          All AI Watermark Removal Tools
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          The full toolkit. Every tool here is free, browser-based, and requires no
          account. Start with the main{" "}
          <Link to="/" className="text-primary underline">
            chatgpt image watermark remover
          </Link>{" "}
          or jump to a specialist tool below.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold">Core Tools</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {CORE.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="block rounded-xl border border-border bg-surface/40 p-5 transition hover:border-primary/50"
            >
              <h3 className="font-display text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold">Other AI Generators</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Specialist pages for every major AI image generator. Each explains the exact
          watermark format used and what our tool can and cannot remove.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {RELATED_TOOLS.map((t) => (
            <Link
              key={t.slug}
              to={`/${t.slug}` as "/$relatedTool"}
              className="block rounded-xl border border-border bg-surface/40 p-5 transition hover:border-primary/50"
            >
              <h3 className="font-display text-lg font-bold">{t.ai} Watermark Remover</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-primary">
                {t.watermarkType}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-surface/40 p-6">
          <h2 className="font-display text-xl font-bold">Why a Specialist Toolkit?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Generic AI directories list hundreds of unrelated utilities. Our toolkit is
            built around one job — removing AI watermarks — and the flagship{" "}
            <Link to="/" className="text-primary underline">
              chatgpt image watermark remover
            </Link>{" "}
            is the deepest implementation of C2PA stripping on the web. Compare it
            against alternatives in our{" "}
            <Link to="/best-chatgpt-image-watermark-removers" className="text-primary underline">
              best removers roundup
            </Link>{" "}
            or read{" "}
            <Link to="/what-is-c2pa-metadata" className="text-primary underline">
              what C2PA metadata actually is
            </Link>
            .
          </p>
        </div>

        <CTABanner />
      </div>
    </PageShell>
  );
}
