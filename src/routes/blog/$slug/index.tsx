import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ArticleLayout } from "@/components/content/ArticleLayout";
import { getPost, type BlogPost } from "@/content/blog";
import { buildMeta, canonical, breadcrumbLd, articleLd } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug/")({
  loader: ({ params }): BlogPost => {
    const p = getPost(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const p = loaderData as BlogPost;
    const path = `/blog/${p.slug}`;
    return {
      meta: buildMeta({ title: p.title, description: p.excerpt, path, type: "article" }),
      links: canonical(path),
      scripts: [
        breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: p.title, path }]),
        articleLd({ headline: p.title, description: p.excerpt, path, datePublished: p.date }),
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const p = Route.useLoaderData() as BlogPost;
  const Body = p.body;
  return (
    <PageShell>
      <ArticleLayout
        eyebrow="Blog"
        title={p.title}
        intro={p.excerpt}
        meta={`${p.date} · ${p.readingTime}`}
        breadcrumbs={[{ name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }]}
      >
        <Body />
      </ArticleLayout>
    </PageShell>
  );
}
