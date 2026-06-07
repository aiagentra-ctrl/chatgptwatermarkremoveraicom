import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { BLOG_POSTS } from "@/content/blog";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

const TITLE = "Blog — ChatGPT Watermark Remover Guides & Tutorials";
const DESCRIPTION = "Deep guides on C2PA metadata, ChatGPT watermarks, removal techniques, and the legal landscape. Updated regularly.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: "/blog" }),
    links: canonical("/blog"),
    scripts: [breadcrumbLd([{ name: "Blog", path: "/blog" }])],
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Blog</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Guides & Tutorials</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Long-form guides on ChatGPT watermarks, C2PA metadata, and the tools to remove them.
        </p>
        <div className="mt-10 space-y-4">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
            >
              <h2 className="font-display text-xl font-bold">{p.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{p.date} · {p.readingTime}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
        <CTABanner />
      </div>
    </PageShell>
  ),
});
