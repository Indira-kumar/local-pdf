export const PDF_CONSTANTS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_MIME_TYPES: ["application/pdf"],
  MAX_PAGES_PER_DOCUMENT: 1000,
  THUMBNAIL_WIDTH: 200,
  THUMBNAIL_HEIGHT: 250,
  CHUNK_SIZE: 10, // Pages to process at once
  WORKER_POOL_SIZE: 2,
  CACHE_MAX_SIZE: 50, // Max thumbnails in cache
} as const;

export const ROTATION_DEGREES = [90, 180, 270] as const;

export const SPLIT_STRATEGIES = {
  BY_PAGE: "byPage",
  BY_RANGE: "byRange",
  BY_SIZE: "bySize",
} as const;

export const WATERMARK_POSITIONS = {
  CENTER: "center",
  TOP_LEFT: "topLeft",
  TOP_RIGHT: "topRight",
  BOTTOM_LEFT: "bottomLeft",
  BOTTOM_RIGHT: "bottomRight",
} as const;
