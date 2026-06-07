import { Check, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface ComparisonRow {
  feature: string;
  us: boolean | string;
  them: boolean | string;
}

export interface ComparisonProduct {
  name: string;
  url?: string;
  tagline?: string;
}

export function ComparisonTable({
  us,
  them,
  rows,
}: {
  us: ComparisonProduct;
  them: ComparisonProduct;
  rows: ComparisonRow[];
}) {
  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-border bg-surface-2">
        <div className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Feature</div>
        <div className="border-l border-border p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-success">⭐ {us.name}</div>
          {us.tagline && <div className="text-xs text-muted-foreground">{us.tagline}</div>}
        </div>
        <div className="border-l border-border p-4">
          <div className="text-sm font-bold text-foreground">{them.name}</div>
          {them.tagline && <div className="text-xs text-muted-foreground">{them.tagline}</div>}
        </div>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-border last:border-b-0 hover:bg-background/40"
        >
          <div className="p-4 text-sm font-medium text-foreground">{r.feature}</div>
          <Cell value={r.us} positive />
          <Cell value={r.them} />
        </div>
      ))}
      <div className="border-t border-border bg-surface-2 p-4 text-center">
        <Link to="/" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90">
          Use {us.name} Free →
        </Link>
      </div>
    </div>
  );
}

function Cell({ value, positive }: { value: boolean | string; positive?: boolean }) {
  if (typeof value === "string") {
    return (
      <div className={`border-l border-border p-4 text-sm ${positive ? "text-success" : "text-muted-foreground"}`}>
        {value}
      </div>
    );
  }
  return (
    <div className="border-l border-border p-4">
      {value ? (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
          <Check className="h-4 w-4" /> Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-danger">
          <X className="h-4 w-4" /> No
        </span>
      )}
    </div>
  );
}
