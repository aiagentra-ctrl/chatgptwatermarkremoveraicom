import type { ReactNode } from "react";
import { Breadcrumbs } from "../layout/Breadcrumbs";
import { CTABanner } from "../layout/CTABanner";

export function ArticleLayout({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  children,
  meta,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs: { name: string; path: string }[];
  meta?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Breadcrumbs items={breadcrumbs} />
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
      {meta && <p className="mt-3 text-xs text-muted-foreground">{meta}</p>}
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
      )}
      <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-2xl prose-h2:font-bold prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:text-muted-foreground prose-li:my-1 prose-code:rounded prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-code:before:content-none prose-code:after:content-none">
        {children}
      </div>
      <CTABanner />
    </article>
  );
}
