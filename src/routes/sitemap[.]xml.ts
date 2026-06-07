import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { COMPETITORS } from "@/content/comparisons";
import { RELATED_TOOLS } from "@/content/related-tools";
import { BLOG_POSTS } from "@/content/blog";

const BASE_URL = "https://chatgptwatermarkremoverai.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/detect",
          "/verify",
          "/chatgpt-text-watermark-remover",
          "/what-is-c2pa-metadata",
          "/how-to-remove-chatgpt-image-watermark",
          "/chatgpt-image-watermark-explained",
          "/c2pa-vs-visible-watermark",
          "/best-chatgpt-image-watermark-removers",
          "/tools",
          ...COMPETITORS.map((c) => `/chatgpt-watermark-remover-vs-${c.slug}`),
          ...RELATED_TOOLS.map((t) => `/${t.slug}`),
          "/blog",
          ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
          "/about",
          "/faq",
          "/privacy",
          "/terms",
          "/cookie-policy",
          "/contact",
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
