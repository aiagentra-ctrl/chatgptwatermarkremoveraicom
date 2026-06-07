import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { buildMeta, canonical, breadcrumbLd, articleLd } from "@/lib/seo";

const TITLE = "C2PA vs Visible Watermark — What's the Difference?";
const DESCRIPTION =
  "C2PA is invisible metadata. The 'CR' corner badge is pixel-level branding. They're completely different watermarks — here's how to remove each.";
const PATH = "/c2pa-vs-visible-watermark";

export const Route = createFileRoute("/c2pa-vs-visible-watermark/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" }),
    links: canonical(PATH),
    scripts: [
      breadcrumbLd([{ name: "C2PA vs Visible Watermark", path: PATH }]),
      articleLd({ headline: TITLE, description: DESCRIPTION, path: PATH, datePublished: "2026-03-22" }),
    ],
  }),
  component: () => (
    <PageShell>
      <ArticleLayout
        eyebrow="Compare"
        title="C2PA vs Visible Watermark"
        intro="Two completely different things, often confused. One you can see; the other is invisible. Both need different tools."
        breadcrumbs={[{ name: "C2PA vs Visible", path: PATH }]}
      >
        <h2>The short version</h2>
        <ul>
          <li><strong>C2PA</strong> = invisible metadata. Removed with our free tool in 1 click.</li>
          <li><strong>Visible CR badge / corner mark</strong> = pixel-level branding. Requires Photoshop, GIMP, or AI inpainting to remove from pixels.</li>
        </ul>

        <h2>C2PA in detail</h2>
        <p>
          A JUMBF box appended to the image bytes containing a signed manifest. Invisible to
          humans, instantly readable by any C2PA verifier. Removing it does not change a single
          pixel. <a href="/">Use our tool</a> — done in 1 second.
        </p>

        <h2>Visible watermarks in detail</h2>
        <p>
          When a service overlays a logo, semi-transparent badge or "CR" symbol on the image
          before delivering it, that mark is rendered into pixels. There is no metadata to
          strip; the pixels themselves carry the brand. To remove it you need:
        </p>
        <ul>
          <li>Photoshop's Content-Aware Fill</li>
          <li>GIMP's Resynthesizer plugin</li>
          <li>An AI inpainting tool (LaMa, SDXL inpaint)</li>
        </ul>
        <p>
          ChatGPT's main output today does <em>not</em> include a visible mark — the C2PA
          metadata is the entire watermark. Sora videos and some Adobe Firefly exports do add a
          visible badge.
        </p>

        <h2>Pick the right tool</h2>
        <ul>
          <li>Invisible C2PA → <a href="/">ChatGPT Image Watermark Remover</a></li>
          <li>Visible badge → Photoshop / GIMP / inpainting</li>
          <li>Not sure which? → <a href="/detect">Run the detector first</a></li>
        </ul>
      </ArticleLayout>
    </PageShell>
  ),
});
