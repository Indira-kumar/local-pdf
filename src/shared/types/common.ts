// Core PDF Document Model
export interface PDFDocument {
  id: string;
  name: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  pageCount: number;
  pages: PDFPage[];
  blob: Blob;
  storedInCache: boolean;
}

export interface PDFPage {
  id: string;
  documentId: string;
  pageNumber: number;
  rotation: 0 | 90 | 180 | 270;
  width: number;
  height: number;
  thumbnailUrl?: string;
  selected: boolean;
}

// Operation Models
export interface PDFOperation {
  id: string;
  type: "merge" | "split" | "rotate" | "reorder" | "watermark";
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface MergeOperation extends PDFOperation {
  type: "merge";
  sourceDocuments: string[];
  outputName: string;
}

export interface SplitOperation extends PDFOperation {
  type: "split";
  sourceDocument: string;
  strategy: "byPage" | "byRange" | "bySize";
  ranges?: PageRange[];
}

export interface PageRange {
  start: number;
  end: number;
  outputName: string;
}

export interface RotateOperation extends PDFOperation {
  type: "rotate";
  documentId: string;
  pageIds: string[];
  degrees: 90 | 180 | 270;
}

export interface ReorderOperation extends PDFOperation {
  type: "reorder";
  documentId: string;
  newPageOrder: string[];
}

export interface WatermarkOperation extends PDFOperation {
  type: "watermark";
  documentId: string;
  config: WatermarkConfig;
  pageIds?: string[];
}

export interface WatermarkConfig {
  text: string;
  opacity: number;
  fontSize: number;
  color: string;
  position: "center" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  rotation: number;
}

// UI State Models
export interface SelectionState {
  documentId: string | null;
  selectedPageIds: Set<string>;
  selectionMode: "single" | "multiple" | "range";
}

export interface ViewState {
  viewMode: "grid" | "list";
  thumbnailSize: "small" | "medium" | "large";
  sortBy: "name" | "date" | "size";
  sortOrder: "asc" | "desc";
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  createdAt: Date;
}

export interface ModalState {
  isOpen: boolean;
  type: "upload" | "merge" | "split" | "watermark" | null;
  data?: any;
}

export type ThemeMode = "light" | "dark" | "system";
