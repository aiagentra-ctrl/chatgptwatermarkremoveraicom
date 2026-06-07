import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { VerifyTool } from "@/components/tools/VerifyTool";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const TITLE = "Verify C2PA Watermark Removed — Free ChatGPT Image Checker";
const DESCRIPTION =
  "Confirm your cleaned ChatGPT image carries zero C2PA metadata. Free browser-based verifier — drop the file in and get an instant ✓ Clean or 🚨 Found result.";

export const Route = createFileRoute("/verify/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: "/verify" }),
    links: canonical("/verify"),
    scripts: [breadcrumbLd([{ name: "Verify", path: "/verify" }])],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Verify", path: "/verify" }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Verify</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Verify the C2PA Watermark Was Removed
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Already cleaned an image with our <Link to="/" className="text-primary">remover</Link>?
          Drop it here and we'll re-scan to prove zero C2PA bytes remain.
        </p>
        <div className="mt-10">
          <VerifyTool />
        </div>
        <CTABanner title="Need to clean another batch?" cta="Open the Remover →" />
      </div>
    </PageShell>
  );
}
