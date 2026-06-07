import { CheckCircle2, Download, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import type { ImageItem } from "./types";
import { cleanedFilename, formatBytes } from "@/lib/c2pa";

interface ImageCardProps {
  item: ImageItem;
  onDownload: (item: ImageItem) => void;
}

export function ImageCard({ item, onDownload }: ImageCardProps) {
  const saved =
    item.cleanedSize !== undefined ? item.originalSize - item.cleanedSize : 0;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border/70">
      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={item.previewUrl}
          alt={`Preview of ${item.file.name}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Detection badge */}
        <div className="absolute left-2 top-2 animate-slide-in">
          {item.hasWatermark === null ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2 py-1 text-xs backdrop-blur">
              <Loader2 className="h-3 w-3 animate-spin" />
              Scanning…
            </span>
          ) : item.hasWatermark ? (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-danger/30 bg-danger/15 px-2 py-1 text-xs font-medium text-danger backdrop-blur">
              <ShieldAlert className="h-3 w-3" />
              C2PA Found
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/15 px-2 py-1 text-xs font-medium text-success backdrop-blur">
              <ShieldCheck className="h-3 w-3" />
              Clean
            </span>
          )}
        </div>

        {/* Cleaned overlay */}
        {item.status === "cleaned" && (
          <div className="absolute right-2 top-2 animate-slide-in">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/15 px-2 py-1 text-xs font-medium text-success backdrop-blur">
              <CheckCircle2 className="h-3 w-3" />
              Cleaned
            </span>
          </div>
        )}

        {item.status === "cleaning" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>
        )}
      </div>

      <div className="space-y-2 p-3">
        <p className="truncate text-sm font-medium text-foreground" title={item.file.name}>
          {item.file.name}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono-tabular">
            {formatBytes(item.cleanedSize ?? item.originalSize)}
          </span>
          {saved > 0 && (
            <span className="font-mono-tabular text-success">
              −{formatBytes(saved)}
            </span>
          )}
        </div>

        {item.status === "cleaned" && item.cleanedBlob && (
          <button
            onClick={() => onDownload(item)}
            className="mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 hover:-translate-y-px"
            aria-label={`Download cleaned ${cleanedFilename(item.file.name, item.cleanedBlob)}`}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        )}

        {item.status === "error" && (
          <p className="text-xs text-danger">{item.error || "Failed"}</p>
        )}
      </div>
    </div>
  );
}
