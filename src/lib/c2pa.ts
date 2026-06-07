// C2PA detection + cleaning logic (client-side only)

const ASCII_MARKERS = [
  "c2pa",
  "C2PA",
  "jumbf",
  "JUMBF",
  "c2ma",
  "contentauthenticity",
  "openai",
];

const JUMBF_HEX = [0x6a, 0x75, 0x6d, 0x62]; // "jumb"

export function detectC2PA(buffer: ArrayBuffer): boolean {
  const bytes = new Uint8Array(buffer);

  // Hex scan for JUMBF box magic
  for (let i = 0; i < bytes.length - 4; i++) {
    if (
      bytes[i] === JUMBF_HEX[0] &&
      bytes[i + 1] === JUMBF_HEX[1] &&
      bytes[i + 2] === JUMBF_HEX[2] &&
      bytes[i + 3] === JUMBF_HEX[3]
    ) {
      return true;
    }
  }

  // ASCII marker scan (decode only first ~256KB to keep it fast on big files)
  const slice = bytes.length > 262144 ? bytes.slice(0, 262144) : bytes;
  try {
    const text = new TextDecoder("ascii", { fatal: false }).decode(slice);
    return ASCII_MARKERS.some((m) => text.includes(m));
  } catch {
    return false;
  }
}

export async function cleanImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("Canvas context unavailable"));
          return;
        }
        ctx.drawImage(img, 0, 0);

        const isJpeg = file.type === "image/jpeg";
        const isWebp = file.type === "image/webp";
        const mimeType = isJpeg ? "image/jpeg" : isWebp ? "image/png" : "image/png";
        const quality = isJpeg ? 0.97 : undefined;

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (!blob) reject(new Error("Failed to export image"));
            else resolve(blob);
          },
          mimeType,
          quality,
        );
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export function cleanedFilename(original: string, blob: Blob): string {
  const dot = original.lastIndexOf(".");
  const base = dot > 0 ? original.slice(0, dot) : original;
  const ext =
    blob.type === "image/jpeg" ? "jpg" : blob.type === "image/webp" ? "webp" : "png";
  return `${base}_cleaned.${ext}`;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_FILES = 50;
export const MAX_FILE_SIZE = 50 * 1024 * 1024;
