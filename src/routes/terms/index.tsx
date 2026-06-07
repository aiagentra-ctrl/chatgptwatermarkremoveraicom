import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMeta, canonical } from "@/lib/seo";

export const Route = createFileRoute("/terms/")({
  head: () => ({
    meta: buildMeta({ title: "Terms of Use — ChatGPT Watermark Remover", description: "Terms of use for the free ChatGPT image watermark remover.", path: "/terms" }),
    links: canonical("/terms"),
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />
        <h1 className="font-display text-4xl font-bold">Terms of Use</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>This tool is provided free of charge, as-is, with no warranties. By using it you agree to use it for lawful purposes and on images you own or have the right to modify.</p>
          <h2>No affiliation</h2>
          <p>This site is not affiliated with OpenAI, the C2PA Coalition, Adobe, Google, Midjourney, xAI or Stability AI. All product names are trademarks of their respective owners.</p>
          <h2>Liability</h2>
          <p>We are not liable for any consequences of using cleaned images. You retain full responsibility for compliance with platform rules and applicable law.</p>
        </div>
      </div>
    </PageShell>
  ),
});
