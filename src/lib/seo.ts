// SEO helpers
export const SITE_NAME = "ChatGPT Watermark Remover";
export const SITE_URL = "https://chatgptwatermarkremoverai.com";

const abs = (path: string) => {
  if (!path) return SITE_URL + "/";
  if (path.startsWith("http")) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
};

export function buildMeta(opts: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const { title, description, path, type = "website" } = opts;
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { property: "og:title", content: title },
    { property: "og:description", content: title ? description : description },
    { property: "og:url", content: abs(path) },
    { property: "og:type", content: type },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

export function canonical(path: string) {
  return [{ rel: "canonical", href: abs(path) }];
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: abs(it.path),
      })),
    }),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }),
  };
}

export function articleLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: opts.headline,
      description: opts.description,
      datePublished: opts.datePublished,
      dateModified: opts.datePublished,
      mainEntityOfPage: abs(opts.path),
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME },
    }),
  };
}

export function howToLd(opts: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: opts.name,
      description: opts.description,
      totalTime: opts.totalTime ?? "PT1M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
      step: opts.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    }),
  };
}
