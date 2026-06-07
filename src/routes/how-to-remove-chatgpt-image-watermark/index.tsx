import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { buildMeta, canonical, breadcrumbLd, howToLd } from "@/lib/seo";

const TITLE = "How to Remove ChatGPT Image Watermarks — Full Step-by-Step Guide";
const DESCRIPTION =
  "Complete tutorial for removing the invisible C2PA watermark from ChatGPT images. Free, no login, works on desktop and mobile.";
const PATH = "/how-to-remove-chatgpt-image-watermark";

export const Route = createFileRoute("/how-to-remove-chatgpt-image-watermark/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" }),
    links: canonical(PATH),
    scripts: [
      breadcrumbLd([{ name: "How to Remove ChatGPT Watermark", path: PATH }]),
      howToLd({
        name: "How to Remove the ChatGPT Image Watermark",
        description: DESCRIPTION,
        steps: [
          { name: "Open the free tool", text: "Visit the ChatGPT Image Watermark Remover — no login required." },
          { name: "Drop your image", text: "Drag and drop one or up to 50 images at once into the drop zone." },
          { name: "Detect", text: "The tool reads the bytes locally and flags C2PA-watermarked images with a red badge." },
          { name: "Clean", text: "Click Clean All. Each image is re-encoded through the Canvas API; all metadata is dropped." },
          { name: "Download", text: "Download cleaned images one by one or all at once." },
          { name: "Verify (optional)", text: "Drop the cleaned image into the Verify tool to confirm zero C2PA bytes remain." },
        ],
      }),
    ],
  }),
  component: () => (
    <PageShell>
      <ArticleLayout
        eyebrow="Tutorial"
        title="How to Remove ChatGPT Image Watermarks"
        intro="A complete, no-nonsense walkthrough that takes about 30 seconds. Works on iPhone, Android, Mac, Windows and Linux — all you need is a browser."
        breadcrumbs={[{ name: "How to Remove", path: PATH }]}
      >
        <h2>What you'll need</h2>
        <ul>
          <li>A modern browser (Chrome, Safari, Firefox, Edge)</li>
          <li>One or more ChatGPT-generated images</li>
          <li>About 30 seconds</li>
        </ul>

        <h2>Step 1 — Open the tool</h2>
        <p>
          Open the <a href="/">free ChatGPT image watermark remover</a>. There is no signup, no
          email field, no download. The page loads, the tool is ready.
        </p>

        <h2>Step 2 — Drop your image(s)</h2>
        <p>
          Drag your ChatGPT image straight from your downloads folder, or tap the drop zone to
          browse. You can drop up to <strong>50 images</strong> at once. The tool accepts JPEG,
          PNG and WebP.
        </p>

        <h2>Step 3 — Detection happens automatically</h2>
        <p>
          The moment a file lands, the tool reads it as raw bytes and scans for the JUMBF magic
          (<code>6A 75 6D 62</code>) plus ASCII markers like <code>c2pa</code> and
          <code>contentauthenticity</code>. A red <strong>C2PA Found</strong> badge appears on
          any image carrying the OpenAI provenance signature.
        </p>

        <h2>Step 4 — Click "Clean All"</h2>
        <p>
          Each flagged image is drawn to an HTML5 <code>&lt;canvas&gt;</code> at its native
          resolution, then exported back out as a new file. Canvas does not preserve metadata,
          so the new file has zero JUMBF, zero EXIF, zero IPTC, zero XMP. Pixels are identical.
        </p>

        <h2>Step 5 — Download</h2>
        <p>
          Click the per-image Download button or "Download All" to grab the entire batch.
          Filenames get a <code>_cleaned</code> suffix so you never overwrite the original.
        </p>

        <h2>Step 6 — Verify (optional but recommended)</h2>
        <p>
          Drop a cleaned file into the <a href="/verify">verify tool</a> and confirm the green
          ✓ Verified Clean badge. For extra paranoia, cross-check with{" "}
          <a href="https://contentcredentials.org/verify" rel="nofollow noopener" target="_blank">
            contentcredentials.org/verify
          </a>
          — Adobe's reference C2PA reader should report "No Content Credentials found".
        </p>

        <h2>Does it work on mobile?</h2>
        <p>
          Yes. The whole tool runs in mobile Safari and Chrome — no app store required. Tap
          the drop zone → Photo Library → pick your image → Clean → Download.
        </p>

        <h2>Will the image quality change?</h2>
        <p>
          For JPEG, we re-encode at 0.97 quality (visually identical, ~1–3% file size reduction
          on average). For PNG and WebP-as-PNG, the re-encode is lossless. No visible
          difference.
        </p>
      </ArticleLayout>
    </PageShell>
  ),
});
