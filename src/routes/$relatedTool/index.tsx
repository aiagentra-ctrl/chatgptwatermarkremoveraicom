import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { WatermarkRemoverTool } from "@/components/watermark-remover/WatermarkRemoverTool";
import { RELATED_TOOLS, type RelatedTool } from "@/content/related-tools";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const SLUGS = new Set(RELATED_TOOLS.map((t) => t.slug));

export const Route = createFileRoute("/$relatedTool/")({
  beforeLoad: ({ params }) => {
    if (!SLUGS.has(params.relatedTool)) throw notFound();
  },
  loader: ({ params }): RelatedTool => {
    const t = RELATED_TOOLS.find((x) => x.slug === params.relatedTool);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const t = loaderData as RelatedTool;
    const title = `${t.ai} Image Watermark Remover — Free, Browser-Based (2026)`;
    const desc = `Remove watermarks and metadata from ${t.brand} images. Free, 100% client-side. ${t.description.slice(0, 80)}`;
    const path = `/${t.slug}`;
    return {
      meta: buildMeta({ title, description: desc, path }),
      links: canonical(path),
      scripts: [breadcrumbLd([{ name: `${t.ai} Watermark Remover`, path }])],
    };
  },
  component: RelatedToolPage,
});

function RelatedToolPage() {
  const t = Route.useLoaderData() as RelatedTool;
  const path = `/${t.slug}`;
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: `${t.ai} Watermark Remover`, path }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{t.brand}</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          {t.ai} Image Watermark Remover
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.description}</p>

        {t.hasC2PA && (
          <div className="mt-6 rounded-xl border border-success/40 bg-success/5 p-4 text-sm">
            ✅ {t.ai} uses C2PA metadata — <strong>our tool removes it completely</strong>.
            Drop your image below.
          </div>
        )}
        {!t.hasC2PA && (
          <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            ⚠️ {t.ai} does not use C2PA. Our tool will re-encode the image and strip standard
            metadata (EXIF, IPTC, PNG text chunks). Pixel-level watermarks like visible logos or
            SynthID are not removed.
          </div>
        )}

        <div className="mt-10">
          <WatermarkRemoverTool />
        </div>

        <section className="prose prose-invert mt-16 max-w-none">
          <h2>About the {t.brand} watermark</h2>
          <p>{t.longDescription}</p>

          <h2>Looking for the ChatGPT version?</h2>
          <p>
            Our primary tool is built for ChatGPT. See the{" "}
            <Link to="/">ChatGPT Image Watermark Remover</Link> or the full{" "}
            <Link to="/best-chatgpt-image-watermark-removers">comparison</Link>.
          </p>
        </section>

        <CTABanner />
      </div>
    </PageShell>
  );
}
