import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const TITLE = "About — ChatGPT Watermark Remover";
const DESCRIPTION = "Why we built the only specialist ChatGPT image watermark remover: free, private, browser-only.";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: "/about" }),
    links: canonical("/about"),
    scripts: [breadcrumbLd([{ name: "About", path: "/about" }])],
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
        <h1 className="font-display text-4xl font-bold md:text-5xl">About this tool</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>
            ChatGPT Watermark Remover is a single-purpose tool built by privacy-focused
            engineers who were tired of every "AI watermark remover" requiring a login,
            uploading their images, or being a 362-tool directory pretending to be a specialist.
          </p>
          <p>
            We do one thing: remove the invisible C2PA / JUMBF metadata that OpenAI embeds in
            every ChatGPT image. We do it entirely in your browser. We do it for free, with no
            ads, no accounts, no tracking.
          </p>
          <h2>Our principles</h2>
          <ul>
            <li><strong>Privacy by architecture</strong> — your images literally cannot leave your browser because the tool has no server.</li>
            <li><strong>No friction</strong> — no login, no email gate, no daily limit.</li>
            <li><strong>Specialist over generalist</strong> — one job, done perfectly.</li>
            <li><strong>Free forever</strong> — there is no premium tier.</li>
          </ul>
        </div>
        <CTABanner />
      </div>
    </PageShell>
  ),
});
