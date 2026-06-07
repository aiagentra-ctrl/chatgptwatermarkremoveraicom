export type ImageStatus = "scanning" | "ready" | "cleaning" | "cleaned" | "error";

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
  hasWatermark: boolean | null;
  status: ImageStatus;
  cleanedBlob?: Blob;
  cleanedSize?: number;
  error?: string;
}
