export interface CompetitorComparison {
  slug: string;
  competitor: string;
  competitorUrl: string;
  tagline: string;
  weaknesses: string[];
  rows: { feature: string; us: boolean | string; them: boolean | string }[];
}

export const COMPETITORS: CompetitorComparison[] = [
  {
    slug: "gptcleanup",
    competitor: "GPTCleanup.com",
    competitorUrl: "gptcleanup.com",
    tagline: "Generalist AI tools directory",
    weaknesses: [
      "Requires account login before you can use the tool",
      "Page content is thin — no real guide, no HowTo schema",
      "362 tools fighting for attention in the sidebar",
      "No comparison content, no aggregate rating",
      "Generalist focus — not built specifically for ChatGPT C2PA",
    ],
    rows: [
      { feature: "100% free", us: true, them: true },
      { feature: "No login required", us: true, them: false },
      { feature: "Images stay in browser (no upload)", us: true, them: "Server-side processing" },
      { feature: "Bulk processing (up to 50)", us: true, them: false },
      { feature: "Specialist (1 tool, done right)", us: true, them: "362 tools, all generic" },
      { feature: "Real C2PA JUMBF binary detection", us: true, them: "Unclear" },
      { feature: "Works offline after load", us: true, them: false },
      { feature: "Free educational content & guides", us: true, them: false },
      { feature: "FAQPage + HowTo + WebApplication schema", us: true, them: "FAQ only" },
    ],
  },
  {
    slug: "gptwatermark",
    competitor: "GPTWatermark.com",
    competitorUrl: "gptwatermark.com",
    tagline: "Text watermark only",
    weaknesses: [
      "Only removes TEXT watermarks — not images at all",
      "Completely wrong product for 'image watermark remover' searches",
      "Zero schema markup",
      "No blog, no guides, no documentation",
      "Short exact-match-style domain is its only SEO asset",
    ],
    rows: [
      { feature: "Removes ChatGPT image watermarks", us: true, them: false },
      { feature: "Removes ChatGPT text watermarks", us: "Yes — separate tool", them: true },
      { feature: "C2PA metadata detection", us: true, them: false },
      { feature: "Bulk image processing", us: true, them: false },
      { feature: "FAQ + HowTo schema", us: true, them: false },
      { feature: "Educational guides", us: true, them: false },
      { feature: "Multi-page SEO ecosystem", us: true, them: false },
    ],
  },
  {
    slug: "aiwatermarkremover",
    competitor: "AIWatermarkRemover.online",
    competitorUrl: "aiwatermarkremover.online",
    tagline: "AI inpainting via Hugging Face iframe",
    weaknesses: [
      "Embeds an external Hugging Face iframe — your images ARE uploaded to a server",
      "Uses AI inpainting to paint over visible marks — wrong tool for C2PA metadata",
      "Iframe breaks on most mobile browsers",
      "Zero schema markup",
      "No blog, no guides, no real comparison content",
    ],
    rows: [
      { feature: "Images stay in browser (no upload)", us: true, them: false },
      { feature: "Real C2PA metadata removal", us: true, them: "Wrong tech — AI inpainting" },
      { feature: "Mobile-friendly", us: true, them: "Iframe breaks on mobile" },
      { feature: "No login required", us: true, them: true },
      { feature: "Bulk processing (up to 50)", us: true, them: false },
      { feature: "Works offline", us: true, them: false },
      { feature: "Schema markup", us: "WebApp + HowTo + FAQ", them: "None" },
      { feature: "Specialist for ChatGPT C2PA", us: true, them: false },
    ],
  },
];
