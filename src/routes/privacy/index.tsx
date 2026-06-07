import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildMeta, canonical } from "@/lib/seo";

export const Route = createFileRoute("/privacy/")({
  head: () => ({
    meta: buildMeta({ title: "Privacy Policy — ChatGPT Watermark Remover", description: "We collect nothing. Your images never leave your browser. This is the entire privacy policy.", path: "/privacy" }),
    links: canonical("/privacy"),
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p><strong>Short version:</strong> we collect nothing. Your images never leave your browser.</p>
          <h2>What we collect</h2>
          <p>Nothing. The tool is 100% client-side. There is no server that receives your files, no analytics on file contents, no account system.</p>
          <h2>Cookies</h2>
          <p>We do not set any tracking cookies. The browser may use local storage for UI preferences only.</p>
          <h2>Third parties</h2>
          <p>Google Fonts is loaded from <code>fonts.googleapis.com</code> — Google may log standard request metadata (IP, user-agent). No other third parties.</p>
          <h2>Contact</h2>
          <p>Questions? Use the <a href="/contact">contact page</a>.</p>
        </div>
      </div>
    </PageShell>
  ),
});
