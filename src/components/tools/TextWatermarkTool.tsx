import { useMemo, useState } from "react";
import { Copy, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Zero-width + bidi control characters commonly used as text watermarks
const STRIP_REGEX = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u180E]/g;

export function TextWatermarkTool() {
  const [input, setInput] = useState("");

  const cleaned = useMemo(() => input.replace(STRIP_REGEX, ""), [input]);
  const removed = input.length - cleaned.length;
  const hidden = useMemo(() => (input.match(STRIP_REGEX) || []).length, [input]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Paste ChatGPT text here
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Paste any text from ChatGPT to detect and strip invisible zero-width watermarks…"
          className="w-full resize-y rounded-xl border border-border bg-surface p-4 font-mono text-sm focus:border-primary focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{input.length}</strong> chars ·{" "}
            <span className={hidden > 0 ? "font-bold text-danger" : "text-success"}>
              {hidden > 0 ? `🚨 ${hidden} invisible character${hidden > 1 ? "s" : ""} found` : "✓ No hidden chars"}
            </span>
          </span>
          <button
            onClick={() => setInput("")}
            className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 hover:bg-surface"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-success">
            Cleaned text ({removed} char{removed === 1 ? "" : "s"} removed)
          </label>
          <button
            disabled={!cleaned}
            onClick={() => {
              navigator.clipboard.writeText(cleaned);
              toast.success("Copied to clipboard");
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Copy className="h-3 w-3" /> Copy Clean Text
          </button>
        </div>
        <pre className="min-h-[120px] whitespace-pre-wrap rounded-xl border border-success/30 bg-success/5 p-4 font-mono text-sm">
          {cleaned || <span className="text-muted-foreground">Cleaned output appears here…</span>}
        </pre>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Sparkles className="h-3 w-3 text-success" /> All processing happens in your browser — nothing is sent anywhere.
      </p>
    </div>
  );
}
