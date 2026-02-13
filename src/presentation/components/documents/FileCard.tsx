import type { PDFDocument } from "../../../shared/types/common";
import { formatFileSize, formatDate } from "../../../shared/utils/formatters";
import { Button } from "../common/Button";

interface FileCardProps {
  document: PDFDocument;
  onRemove?: (id: string) => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export function FileCard({
  document,
  onRemove,
  onSelect,
  isSelected,
}: FileCardProps) {
  return (
    <div
      className={`
        border rounded-lg p-4 transition-all cursor-pointer
        ${
          isSelected
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }
      `}
      onClick={() => onSelect?.(document.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-8 h-8 text-red-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {document.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(document.size)} • {document.pageCount} pages
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(document.createdAt)}
          </p>
        </div>

        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(document.id);
            }}
            className="ml-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}
