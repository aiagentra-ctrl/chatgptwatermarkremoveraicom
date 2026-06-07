import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TextWatermarkTool } from "@/components/tools/TextWatermarkTool";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const TITLE = "ChatGPT Text Watermark Remover — Strip Invisible Characters Free";
const DESCRIPTION =
  "Remove invisible zero-width Unicode characters that ChatGPT and other AI systems embed in generated text. Free, browser-based, instant.";

export const Route = createFileRoute("/chatgpt-text-watermark-remover/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: "/chatgpt-text-watermark-remover" }),
    links: canonical("/chatgpt-text-watermark-remover"),
    scripts: [breadcrumbLd([{ name: "Text Watermark Remover", path: "/chatgpt-text-watermark-remover" }])],
  }),
  component: TextWatermarkPage,
});

function TextWatermarkPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Text Watermark Remover", path: "/chatgpt-text-watermark-remover" }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Text Tool</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          ChatGPT Text Watermark Remover
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Some AI systems hide statistical or zero-width Unicode markers inside generated
          text. Paste your text below to detect and strip every invisible character
          instantly — locally, in your browser.
        </p>
        <div className="mt-10">
          <TextWatermarkTool />
        </div>

        <section className="prose prose-invert mt-16 max-w-none">
          <h2>What this tool removes</h2>
          <p>It strips all zero-width and bidi control characters in the Unicode ranges:</p>
          <ul>
            <li><code>U+200B</code> – <code>U+200F</code> (zero-width space, joiner, non-joiner, marks)</li>
            <li><code>U+202A</code> – <code>U+202E</code> (bidirectional overrides)</li>
            <li><code>U+2060</code> – <code>U+206F</code> (word joiner, invisible separators)</li>
            <li><code>U+FEFF</code> (zero-width no-break space / BOM)</li>
          </ul>
        </section>

        <CTABanner title="Need to clean ChatGPT images too?" cta="Open the Image Remover →" />
      </div>
    </PageShell>
  );
}
