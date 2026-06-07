import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMeta, canonical } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy/")({
  head: () => ({
    meta: buildMeta({ title: "Cookie Policy — ChatGPT Watermark Remover", description: "We do not use tracking cookies.", path: "/cookie-policy" }),
    links: canonical("/cookie-policy"),
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Cookies", path: "/cookie-policy" }]} />
        <h1 className="font-display text-4xl font-bold">Cookie Policy</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>We do not set any tracking cookies. The browser may persist local UI preferences via <code>localStorage</code>; these never leave your device.</p>
        </div>
      </div>
    </PageShell>
  ),
});
