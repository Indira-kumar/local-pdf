import type { PDFPage } from "../../../shared/types/common";
import { usePageSelection } from "../../../app/hooks/useSelection";

interface PageThumbnailProps {
  page: PDFPage;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export function PageThumbnail({
  page,
  size = "medium",
  onClick,
}: PageThumbnailProps) {
  const { isSelected, toggle } = usePageSelection(page.id);

  const sizes = {
    small: "w-32 h-40",
    medium: "w-40 h-48",
    large: "w-48 h-60",
  };

  return (
    <div
      className={`
        relative border rounded-lg overflow-hidden cursor-pointer transition-all
        ${
          isSelected
            ? "border-blue-500 ring-2 ring-blue-500"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }
        ${sizes[size]}
      `}
      onClick={onClick || toggle}
    >
      {/* Thumbnail */}
      <div
        className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        style={{ transform: `rotate(${page.rotation}deg)` }}
      >
        {page.thumbnailUrl ? (
          <img
            src={page.thumbnailUrl}
            alt={`Page ${page.pageNumber}`}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <svg
            className="w-12 h-12 text-gray-400"
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
        )}
      </div>

      {/* Page number badge */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        {page.pageNumber}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
