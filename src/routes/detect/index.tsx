import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { DetectorTool } from "@/components/tools/DetectorTool";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const TITLE = "ChatGPT Watermark Detector — Free C2PA Scanner (No Upload)";
const DESCRIPTION =
  "Free ChatGPT watermark detector. Drop any image and instantly see if it contains C2PA / JUMBF metadata identifying it as ChatGPT-generated. 100% browser-based.";

export const Route = createFileRoute("/detect/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: "/detect" }),
    links: canonical("/detect"),
    scripts: [breadcrumbLd([{ name: "Detector", path: "/detect" }])],
  }),
  component: DetectPage,
});

function DetectPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Detector", path: "/detect" }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Detector</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          ChatGPT Watermark Detector
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Scan any image for invisible C2PA / JUMBF metadata. Find out instantly whether
          it came from ChatGPT, DALL-E, or Sora. Nothing uploaded — all detection happens
          in your browser.
        </p>

        <div className="mt-10">
          <DetectorTool />
        </div>

        <section className="prose prose-invert mt-16 max-w-none prose-h2:font-display">
          <h2>What this detector finds</h2>
          <p>
            ChatGPT, DALL-E and Sora all embed a JUMBF box containing C2PA Content
            Credentials. The detector reads your file as raw bytes and looks for:
          </p>
          <ul>
            <li>JUMBF magic bytes <code>6A 75 6D 62</code></li>
            <li>ASCII markers: <code>c2pa</code>, <code>jumbf</code>, <code>contentauthenticity</code>, <code>openai</code></li>
          </ul>
          <p>
            A red badge means C2PA was found. Found one?{" "}
            <Link to="/" className="font-semibold text-primary">Strip it with the free remover →</Link>
          </p>
        </section>

        <CTABanner title="Want to remove it, not just detect it?" cta="Open the Remover →" />
      </div>
    </PageShell>
  );
}
