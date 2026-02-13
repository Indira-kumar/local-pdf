export const UI_CONSTANTS = {
  DEFAULT_NOTIFICATION_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
  THUMBNAIL_SIZES: {
    small: 150,
    medium: 200,
    large: 250,
  },
  ANIMATION_DURATION: 200,
} as const;

export const ROUTES = {
  HOME: "/",
  MERGE: "/merge",
  SPLIT: "/split",
  ROTATE: "/rotate",
  REORDER: "/reorder",
  WATERMARK: "/watermark",
} as const;

export const THEME_STORAGE_KEY = "pdf-tool-theme";
