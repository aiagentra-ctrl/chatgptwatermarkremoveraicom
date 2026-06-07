import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { DropZone } from "@/components/watermark-remover/DropZone";
import { ACCEPTED_TYPES, MAX_FILES, MAX_FILE_SIZE, detectC2PA, formatBytes } from "@/lib/c2pa";

interface DetectItem {
  id: string;
  file: File;
  previewUrl: string;
  hasWatermark: boolean | null;
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function DetectorTool({ ctaLabel = "Detect C2PA Watermarks" }: { ctaLabel?: string }) {
  const [items, setItems] = useState<DetectItem[]>([]);

  const addFiles = useCallback(
    (files: File[]) => {
      const valid = files.filter(
        (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE,
      );
      if (valid.length < files.length) toast.error(`${files.length - valid.length} file(s) rejected`);
      const room = MAX_FILES - items.length;
      const toAdd = valid.slice(0, room);

      const next: DetectItem[] = toAdd.map((f) => ({
        id: uid(),
        file: f,
        previewUrl: URL.createObjectURL(f),
        hasWatermark: null,
      }));
      setItems((p) => [...p, ...next]);

      for (const it of next) {
        it.file.arrayBuffer().then((buf) => {
          const has = detectC2PA(buf);
          setItems((prev) => prev.map((i) => (i.id === it.id ? { ...i, hasWatermark: has } : i)));
        });
      }
    },
    [items.length],
  );

  const clearAll = useCallback(() => {
    items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setItems([]);
  }, [items]);

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <DropZone onFiles={addFiles} />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm">
              <strong>{items.length}</strong> scanned ·{" "}
              <span className="text-danger">{items.filter((i) => i.hasWatermark).length} watermarked</span> ·{" "}
              <span className="text-success">{items.filter((i) => i.hasWatermark === false).length} clean</span>
            </p>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-2 text-xs font-medium hover:bg-background"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {items.map((it) => (
              <div key={it.id} className="overflow-hidden rounded-lg border border-border bg-surface">
                <div className="relative aspect-square bg-background">
                  <img src={it.previewUrl} alt="" className="h-full w-full object-cover" />
                  {it.hasWatermark !== null && (
                    <span
                      className={`absolute left-2 top-2 rounded px-2 py-1 text-[10px] font-bold ${
                        it.hasWatermark
                          ? "bg-danger text-danger-foreground"
                          : "bg-success text-success-foreground"
                      }`}
                    >
                      {it.hasWatermark ? "🚨 C2PA FOUND" : "✓ CLEAN"}
                    </span>
                  )}
                </div>
                <div className="p-2 text-[11px] text-muted-foreground">
                  <p className="truncate" title={it.file.name}>{it.file.name}</p>
                  <p className="font-mono-tabular">{formatBytes(it.file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <p className="text-center text-xs text-muted-foreground">
        🔒 {ctaLabel} runs 100% locally. No upload.
      </p>
    </div>
  );
}
