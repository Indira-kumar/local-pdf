import type { PDFPage } from "../../../shared/types/common";
import { PageThumbnail } from "./PageThumbnail";

interface PageGridProps {
  pages: PDFPage[];
  thumbnailSize?: "small" | "medium" | "large";
}

export function PageGrid({ pages, thumbnailSize = "medium" }: PageGridProps) {
  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          No pages to display
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pages.map((page) => (
        <PageThumbnail key={page.id} page={page} size={thumbnailSize} />
      ))}
    </div>
  );
}
