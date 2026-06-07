import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { COMPETITORS } from "@/content/comparisons";
import { buildMeta, canonical, breadcrumbLd } from "@/lib/seo";

export const Route = createFileRoute("/chatgpt-watermark-remover-vs-$slug/")({
  loader: ({ params }) => {
    const c = COMPETITORS.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `ChatGPT Watermark Remover vs ${loaderData.competitor} (2026)`;
    const desc = `Side-by-side comparison of ChatGPT Watermark Remover and ${loaderData.competitor}. Privacy, accuracy, login requirements — see who wins on every feature.`;
    const path = `/chatgpt-watermark-remover-vs-${loaderData.slug}`;
    return {
      meta: buildMeta({ title, description: desc, path }),
      links: canonical(path),
      scripts: [breadcrumbLd([
        { name: "Comparisons", path: "/best-chatgpt-image-watermark-removers" },
        { name: `Vs ${loaderData.competitor}`, path },
      ])],
    };
  },
  component: VsPage,
});

function VsPage() {
  const c = Route.useLoaderData();
  const path = `/chatgpt-watermark-remover-vs-${c.slug}`;
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[
          { name: "Comparisons", path: "/best-chatgpt-image-watermark-removers" },
          { name: `Vs ${c.competitor}`, path },
        ]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Comparison</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          ChatGPT Watermark Remover vs {c.competitor}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The honest, feature-by-feature breakdown. {c.competitor} is a {c.tagline.toLowerCase()};
          we are a specialist built for one job.
        </p>

        <ComparisonTable
          us={{ name: "ChatGPT Watermark Remover", tagline: "Specialist · Free · No login" }}
          them={{ name: c.competitor, tagline: c.tagline }}
          rows={c.rows}
        />

        <section className="prose prose-invert mt-12 max-w-none">
          <h2>Where {c.competitor} falls short</h2>
          <ul>
            {c.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
          </ul>

          <h2>Where we win</h2>
          <ul>
            <li>100% client-side — your images never leave the browser</li>
            <li>No login, no email, no account ever</li>
            <li>Bulk processing up to 50 images</li>
            <li>Real C2PA JUMBF binary detection</li>
            <li>Full schema markup (WebApplication + HowTo + FAQPage)</li>
            <li>Free educational content, blog and guides</li>
          </ul>

          <p>
            See the <Link to="/best-chatgpt-image-watermark-removers">full market comparison</Link> for every tool ranked side-by-side.
          </p>
        </section>

        <CTABanner cta={`Use the free remover (instead of ${c.competitor}) →`} />
      </div>
    </PageShell>
  );
}
