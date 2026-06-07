import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-foreground">Home</Link>
        </li>
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 opacity-50" />
            {i === items.length - 1 ? (
              <span className="text-foreground">{it.name}</span>
            ) : (
              <Link to={it.path} className="hover:text-foreground">{it.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
