import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
}

export function DropZone({ onFiles }: DropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      onFiles(Array.from(list));
    },
    [onFiles],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={`group cursor-pointer rounded-2xl border-2 border-dashed bg-surface px-8 py-16 text-center transition-all ${
        dragOver
          ? "border-primary bg-primary/5 animate-pulse-glow"
          : "border-border hover:border-primary/50 hover:bg-surface-2"
      }`}
      aria-label="Upload ChatGPT images to remove C2PA watermark"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <Upload className="h-7 w-7" />
      </div>
      <h3 className="font-display text-2xl font-bold text-foreground">
        Drop your ChatGPT images here
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">
        JPEG · PNG · WebP — up to 50 images — Max 50 MB each
      </p>
      <p className="mt-1 text-xs text-muted-foreground/70">
        or click to browse
      </p>
    </div>
  );
}
