import { useCallback, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { detectC2PA, formatBytes } from "@/lib/c2pa";

interface Result {
  name: string;
  size: number;
  clean: boolean;
}

export function VerifyTool() {
  const [results, setResults] = useState<Result[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(async (files: File[]) => {
    const out: Result[] = [];
    for (const f of files) {
      const buf = await f.arrayBuffer();
      out.push({ name: f.name, size: f.size, clean: !detectC2PA(buf) });
    }
    setResults((prev) => [...prev, ...out]);
  }, []);

  return (
    <div className="space-y-6">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(Array.from(e.dataTransfer.files));
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-surface p-12 text-center transition-all ${
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
        }`}
      >
        <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="font-display text-lg font-bold">Drop a cleaned image here to verify</p>
        <p className="mt-1 text-sm text-muted-foreground">We re-scan for any remaining C2PA metadata</p>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(Array.from(e.target.files));
            e.target.value = "";
          }}
        />
      </label>

      {results.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-3 border-b border-border p-4 last:border-b-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground font-mono-tabular">{formatBytes(r.size)}</p>
              </div>
              <span
                className={`shrink-0 rounded px-3 py-1.5 text-xs font-bold ${
                  r.clean ? "bg-success text-success-foreground" : "bg-danger text-danger-foreground"
                }`}
              >
                {r.clean ? "✓ VERIFIED CLEAN" : "🚨 STILL HAS C2PA"}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Need to remove the watermark instead?{" "}
        <Link to="/" className="font-semibold text-primary hover:underline">
          Open the free remover →
        </Link>
      </p>
    </div>
  );
}
