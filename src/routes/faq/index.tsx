import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQ_ITEMS } from "@/components/sections/FAQ";
import { buildMeta, canonical, breadcrumbLd, faqLd } from "@/lib/seo";

const TITLE = "ChatGPT Watermark Remover FAQ — Every Question Answered";
const DESCRIPTION = "All ChatGPT image watermark remover questions in one place: C2PA, privacy, legality, mobile support, formats, bulk processing.";

export const Route = createFileRoute("/faq/")({
  head: () => ({
    meta: buildMeta({ title: TITLE, description: DESCRIPTION, path: "/faq" }),
    links: canonical("/faq"),
    scripts: [
      breadcrumbLd([{ name: "FAQ", path: "/faq" }]),
      faqLd(FAQ_ITEMS.map((i) => ({ q: i.q, a: i.a }))),
    ],
  }),
  component: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">FAQ</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Every Question, Answered</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The complete reference for the free ChatGPT image watermark remover.
        </p>
        <div className="mt-10">
          <FAQAccordion items={[...FAQ_ITEMS]} />
        </div>
        <CTABanner />
      </div>
    </PageShell>
  ),
});
