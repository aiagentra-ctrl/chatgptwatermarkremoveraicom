import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Lock, Sparkles, Trash2, Download } from "lucide-react";
import { DropZone } from "./DropZone";
import { ImageCard } from "./ImageCard";
import type { ImageItem } from "./types";
import {
  ACCEPTED_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE,
  cleanImage,
  cleanedFilename,
  detectC2PA,
} from "@/lib/c2pa";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function WatermarkRemoverTool() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const addFiles = useCallback(
    (files: File[]) => {
      const valid: File[] = [];
      let rejected = 0;
      for (const f of files) {
        if (!ACCEPTED_TYPES.includes(f.type)) {
          rejected++;
          continue;
        }
        if (f.size > MAX_FILE_SIZE) {
          rejected++;
          continue;
        }
        valid.push(f);
      }
      if (rejected > 0) {
        toast.error(`${rejected} file${rejected > 1 ? "s" : ""} rejected (unsupported format or too large)`);
      }
      const room = MAX_FILES - items.length;
      const toAdd = valid.slice(0, room);
      if (valid.length > room) {
        toast.error(`Max ${MAX_FILES} images at once. ${valid.length - room} skipped.`);
      }

      const newItems: ImageItem[] = toAdd.map((file) => ({
        id: uid(),
        file,
        previewUrl: URL.createObjectURL(file),
        originalSize: file.size,
        hasWatermark: null,
        status: "scanning",
      }));

      setItems((prev) => [...prev, ...newItems]);

      // Detect in background
      for (const item of newItems) {
        item.file.arrayBuffer().then((buf) => {
          const has = detectC2PA(buf);
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id ? { ...i, hasWatermark: has, status: "ready" } : i,
            ),
          );
        });
      }
    },
    [items.length],
  );

  const cleanAll = useCallback(async () => {
    const toClean = items.filter((i) => i.status === "ready" || i.status === "error");
    if (toClean.length === 0) {
      toast("Nothing to clean.");
      return;
    }
    setProcessing(true);
    setProgress(0);
    let done = 0;

    for (const item of toClean) {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "cleaning" } : i)),
      );
      try {
        const blob = await cleanImage(item.file);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status: "cleaned",
                  cleanedBlob: blob,
                  cleanedSize: blob.size,
                }
              : i,
          ),
        );
      } catch (e) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "error", error: (e as Error).message }
              : i,
          ),
        );
      }
      done++;
      setProgress(Math.round((done / toClean.length) * 100));
    }
    setProcessing(false);
    toast.success(`✅ ${done} image${done > 1 ? "s" : ""} cleaned`);
  }, [items]);

  const downloadItem = useCallback((item: ImageItem) => {
    if (!item.cleanedBlob) return;
    const a = document.createElement("a");
    const url = URL.createObjectURL(item.cleanedBlob);
    a.href = url;
    a.download = cleanedFilename(item.file.name, item.cleanedBlob);
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  const downloadAll = useCallback(async () => {
    const ready = items.filter((i) => i.cleanedBlob);
    if (ready.length === 0) {
      toast("No cleaned images yet. Click 'Clean All' first.");
      return;
    }
    for (const item of ready) {
      downloadItem(item);
      // small delay so browser doesn't block multi-download
      await new Promise((r) => setTimeout(r, 150));
    }
    toast.success(`⬇ ${ready.length} cleaned image${ready.length > 1 ? "s" : ""} downloaded`);
  }, [items, downloadItem]);

  const clearAll = useCallback(() => {
    items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setItems([]);
    setProgress(0);
  }, [items]);

  const watermarkCount = items.filter((i) => i.hasWatermark).length;
  const cleanedCount = items.filter((i) => i.status === "cleaned").length;

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <DropZone onFiles={addFiles} />
      ) : (
        <>
          {/* Bulk action bar */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="font-medium text-foreground">
                  {items.length} image{items.length !== 1 ? "s" : ""} loaded
                </span>
                {watermarkCount > 0 && (
                  <span className="text-danger">
                    {watermarkCount} with C2PA watermark
                  </span>
                )}
                {cleanedCount > 0 && (
                  <span className="text-success">{cleanedCount} cleaned</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={clearAll}
                  disabled={processing}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-background disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </button>
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-background">
                  + Add More
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) addFiles(Array.from(e.target.files));
                      e.target.value = "";
                    }}
                  />
                </label>
                <button
                  onClick={cleanAll}
                  disabled={processing || items.every((i) => i.status === "cleaned")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Clean All
                </button>
                <button
                  onClick={downloadAll}
                  disabled={cleanedCount === 0}
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download All
                </button>
              </div>
            </div>
            {processing && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item) => (
              <ImageCard key={item.id} item={item} onDownload={downloadItem} />
            ))}
          </div>
        </>
      )}

      <p className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5 text-success" />
        All processing happens locally in your browser. Your images never leave your device.
      </p>
    </div>
  );
}
