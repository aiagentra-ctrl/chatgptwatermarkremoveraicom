import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMeta, canonical } from "@/lib/seo";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: buildMeta({ title: "Contact — ChatGPT Watermark Remover", description: "Get in touch about the free ChatGPT image watermark remover.", path: "/contact" }),
    links: canonical("/contact"),
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <h1 className="font-display text-4xl font-bold">Contact</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>Bug reports, feedback, partnership inquiries — email us at <strong>hello@example.com</strong>.</p>
          <p>For general help, the <a href="/faq">FAQ</a> covers most questions.</p>
        </div>
      </div>
    </PageShell>
  ),
});
