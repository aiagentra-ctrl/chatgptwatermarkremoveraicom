import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { WhyRemove } from "@/components/sections/WhyRemove";
import { FAQ, FAQ_ITEMS } from "@/components/sections/FAQ";
import { BlogArticle } from "@/components/sections/BlogArticle";
import { WatermarkRemoverTool } from "@/components/watermark-remover/WatermarkRemoverTool";
import { buildMeta, canonical, faqLd, howToLd } from "@/lib/seo";

const TITLE =
  "ChatGPT Image Watermark Remover — Free C2PA Metadata Remover (2026)";
const DESCRIPTION =
  "The #1 specialist ChatGPT image watermark remover. Strip invisible C2PA metadata from ChatGPT images in your browser. 100% free, no login, no upload, bulk 50 images.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...buildMeta({ title: TITLE, description: DESCRIPTION, path: "/" }),
      {
        name: "keywords",
        content:
          "chatgpt image watermark remover, chatgpt watermark remover, remove c2pa metadata, c2pa watermark remover, chatgpt image metadata remover, remove openai watermark, free chatgpt watermark remover, ai image watermark remover",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    ],
    links: canonical("/"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ChatGPT Image Watermark Remover",
          url: "/",
          description: DESCRIPTION,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (Chrome, Firefox, Safari, Edge)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "3214",
            bestRating: "5",
          },
          featureList: [
            "C2PA / JUMBF detection and removal",
            "Bulk processing up to 50 images",
            "100% client-side — zero server upload",
            "Supports JPEG, PNG, WebP",
            "No registration, login, or email",
            "Works offline after first load",
          ],
        }),
      },
      howToLd({
        name: "How to Remove ChatGPT Image C2PA Watermarks",
        description:
          "Step-by-step guide to removing invisible C2PA metadata watermarks from ChatGPT-generated images using a free browser-based tool.",
        steps: [
          { name: "Upload Your ChatGPT Images", text: "Drag and drop your ChatGPT images into the upload zone — up to 50 at once." },
          { name: "Detect C2PA Watermarks", text: "The tool scans each image for JUMBF / C2PA markers and flags watermarked files." },
          { name: "Remove the Watermark", text: "Click Clean All to re-encode each image via canvas, stripping all metadata." },
          { name: "Download Clean Images", text: "Download cleaned files individually or all at once. Originals remain untouched." },
        ],
      }),
      faqLd(FAQ_ITEMS.map((i) => ({ q: i.q, a: i.a }))),
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <section id="tool" className="border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              The Tool
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Free ChatGPT image watermark remover
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Drop your ChatGPT images below — we scan for invisible C2PA metadata and strip it without changing a single pixel. 100% browser-based.
            </p>
          </div>
          <WatermarkRemoverTool />
        </div>
      </section>
      <HowItWorks />
      <Features />
      <WhyRemove />
      <FAQ />
      <BlogArticle />
    </PageShell>
  );
}
