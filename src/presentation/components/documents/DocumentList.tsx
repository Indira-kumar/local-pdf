import { useDocuments } from "../../../app/hooks/useDocuments";
import { FileCard } from "./FileCard";

interface DocumentListProps {
  onSelectDocument?: (id: string) => void;
  selectedDocumentId?: string;
}

export function DocumentList({
  onSelectDocument,
  selectedDocumentId,
}: DocumentListProps) {
  const { sortedDocuments, removeDocument } = useDocuments();

  if (sortedDocuments.length === 0) {
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
          No documents uploaded yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedDocuments.map((doc) => (
        <FileCard
          key={doc.id}
          document={doc}
          onRemove={removeDocument}
          onSelect={onSelectDocument}
          isSelected={doc.id === selectedDocumentId}
        />
      ))}
    </div>
  );
}
