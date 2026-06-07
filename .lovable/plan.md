
# Multi-Page SEO Ecosystem Build Plan

Build a 32-route specialist site around the existing tool, all linking back to `/`. Reuses the current `WatermarkRemoverTool`, `Header`/`Footer`, and design system — replaces Header/Footer with the spec's announcement bar, mega-dropdown nav, and 7-column footer that appear on every page.

## Architecture

- **Routing**: TanStack file-based under `src/routes/`. Use folder-style for slugs with dashes (e.g. `src/routes/what-is-c2pa-metadata/index.tsx` → `/what-is-c2pa-metadata/`).
- **Shared shell**: `Header` and `Footer` components rewritten to spec; wrapped via a new `<PageShell>` used by every leaf route.
- **Per-route SEO**: every route exports `head()` with unique title, description, og:*, canonical (leaf-only, relative path), and JSON-LD where relevant (`WebApplication`, `HowTo`, `FAQPage`, `Article`, `BreadcrumbList`, `AggregateRating`, `ItemList` for comparisons).
- **Sitemap**: migrate `public/sitemap.xml` → dynamic `src/routes/sitemap[.]xml.ts` listing all 32 URLs.
- **Content components**: shared `ComparisonTable`, `FeatureCheck`, `FAQAccordion`, `CTABanner`, `Breadcrumbs`, `ArticleLayout` so each page is fast to author and consistent.

## Pages to create (32)

### Tier 1 — Money page
- `/` — keep existing tool; refresh copy + meta to match new positioning.

### Tier 2 — Supporting tools (3)
- `/detect/` — Detector (reuses scanner, shows "Clean / Watermarked" only, no cleaning).
- `/chatgpt-text-watermark-remover/` — text tool (strips zero-width chars from pasted text).
- `/verify/` — re-scan a cleaned image to confirm zero C2PA bytes.

### Tier 3 — Deep content (4)
- `/what-is-c2pa-metadata/`
- `/how-to-remove-chatgpt-image-watermark/` (HowTo schema)
- `/chatgpt-image-watermark-explained/`
- `/c2pa-vs-visible-watermark/`

### Tier 4 — Comparison/weapon pages (4)
- `/best-chatgpt-image-watermark-removers/` (ItemList schema)
- `/chatgpt-watermark-remover-vs-gptcleanup/`
- `/chatgpt-watermark-remover-vs-aiwatermarkremover/`
- `/chatgpt-watermark-remover-vs-gptwatermark/`

### Tier 5 — Related AI tools (6)
- `/gemini-image-watermark-remover/`, `/dalle-...`, `/sora-...`, `/midjourney-...`, `/grok-...`, `/stable-diffusion-watermark-remover/` — each explains the difference vs ChatGPT C2PA, embeds the tool where applicable, and funnels to `/`.

### Tier 6 — Blog (8)
- `/blog/` hub + 7 posts listed in the brief. Article schema on each.

### Tier 7 — Utility/trust (6)
- `/about/`, `/privacy/`, `/terms/`, `/cookie-policy/`, `/contact/`, `/faq/` (master FAQPage schema, ~30 Q&As).

## Shared components to add

```
src/components/layout/
  PageShell.tsx          # wraps Header + main + Footer
  Header.tsx             # rewrite: announcement bar, logo, mega dropdown, mobile menu
  Footer.tsx             # rewrite: CTA banner, comparison strip, 7-col grid, legal row
  Breadcrumbs.tsx
  CTABanner.tsx
src/components/content/
  ComparisonTable.tsx    # us-vs-them feature grid
  FeatureCheck.tsx       # ✓/✗ rows with tooltip
  FAQAccordion.tsx       # reused across pages
  ArticleLayout.tsx      # prose container + TOC for blog/guides
src/components/tools/
  DetectorTool.tsx       # detect-only variant
  VerifyTool.tsx         # re-scan variant
  TextWatermarkTool.tsx  # zero-width char stripper
src/lib/seo.ts           # helpers: buildMeta(), buildBreadcrumbLd(), buildArticleLd()
src/content/comparisons.ts  # competitor data (name, url, weaknesses, feature matrix)
src/content/related-tools.ts # Gemini/DALL-E/etc. metadata
src/content/blog.ts      # post list (slug, title, excerpt, body MDX-as-TSX)
```

## SEO implementation (per project conventions)

- **Per-route `head()`** with title, description, keywords, og:title/description/url (relative), twitter:*, canonical leaf-only.
- **JSON-LD**: stack as needed — every page gets `BreadcrumbList`; `/` keeps `WebApplication` + `HowTo` + `FAQPage`; comparison pages add `ItemList`; blog posts add `Article`; `/faq/` adds full `FAQPage`.
- **Sitemap**: dynamic `sitemap.xml` route enumerating all 32 paths with `BASE_URL=""` placeholder.
- **robots.txt**: keep `Allow: /`.
- **Internal linking**: footer (always) + contextual in-content links using keyword anchors back to `/`.
- **Semantic HTML**: one H1 per page, H2/H3 carrying secondary keywords.

## Header & Footer (rewrite to spec)

- Announcement bar with trust strip + CTA link to `/`.
- Sticky header, blurred bg, logo "ChatGPT Watermark Remover" + FREE badge, primary links (Tool, How It Works, Vs Competitors, Blog), mega-dropdown "More Tools" with 4 columns (Detect & Verify / Other AI Tools / Learn / Featured card), header CTA button, mobile hamburger + sheet menu.
- Footer: pre-footer CTA banner, comparison-strip pills, 5-column main grid (Brand+trust+rating, Main Tool links, Other AI Tools, Comparisons + Popular Searches, Learn + Latest Blog), legal row (Privacy/Terms/Cookies/Contact + © + disclaimer).
- Use existing dark theme tokens; add small green announcement-bar token.

## Tool reuse

- `WatermarkRemoverTool` stays for `/`.
- `DetectorTool` reuses `detectC2PA` from `src/lib/c2pa.ts` but skips `cleanImage`.
- `VerifyTool` reuses `detectC2PA` and reports "✓ Clean" or "✗ Still has C2PA".
- `TextWatermarkTool` strips zero-width chars (`\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF`) — pure JS.

## Out of scope (this build)

- Real `og-image.png` (skip until asset provided).
- AdSense / affiliate.
- Writing all 8 long-form blog posts at full ~1500-word length — each post will ship with ~600-800 words of real content + correct schema; we can expand specific posts on request.
- Per-page MDX pipeline — content authored as TSX in `src/content/`.

## Build order

1. Shared layout (Header, Footer, PageShell, CTABanner, Breadcrumbs).
2. Shared content components (ComparisonTable, FeatureCheck, FAQAccordion, ArticleLayout) + content data files.
3. Update `/` to use new shell + refreshed copy.
4. Tier 2 tools (Detect, Verify, Text).
5. Tier 3 deep content pages.
6. Tier 4 comparison pages.
7. Tier 5 related-tool pages (templated).
8. Tier 6 blog hub + posts.
9. Tier 7 utility/trust pages.
10. Dynamic sitemap route + remove static `public/sitemap.xml`.

Ready to build on approval — this is a large batch (~40 files); I'll execute it in parallel passes per tier.
