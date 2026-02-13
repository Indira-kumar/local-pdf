import { useState } from "react";
import { useDocuments } from "../../app/hooks/useDocuments";
import { UploadZone } from "../components/documents/UploadZone";
import { DocumentList } from "../components/documents/DocumentList";
import { Button } from "../components/common/Button";

export function MergePage() {
  const { sortedDocuments, clearDocuments } = useDocuments();
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  const handleSelectDocument = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id],
    );
  };

  const handleMerge = async () => {
    if (selectedDocIds.length < 2) {
      alert("Please select at least 2 documents to merge");
      return;
    }

    // TODO: Implement actual merge logic with domain/infrastructure layer
    console.log("Merging documents:", selectedDocIds);
    alert(
      "Merge operation would be executed here (requires domain layer implementation)",
    );
  };

  const handleSelectAll = () => {
    setSelectedDocIds(sortedDocuments.map((doc) => doc.id));
  };

  const handleClearSelection = () => {
    setSelectedDocIds([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Merge PDFs
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Combine multiple PDF files into a single document
        </p>
      </div>

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto">
        <UploadZone />
      </div>

      {/* Document List */}
      {sortedDocuments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Uploaded Documents ({sortedDocuments.length})
            </h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearSelection}
              >
                Clear Selection
              </Button>
              <Button variant="secondary" size="sm" onClick={clearDocuments}>
                Clear All
              </Button>
            </div>
          </div>

          <DocumentList
            onSelectDocument={handleSelectDocument}
            selectedDocumentId={selectedDocIds[0]}
          />

          {/* Action Bar */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDocIds.length} document(s) selected
              </div>
              <Button
                variant="primary"
                onClick={handleMerge}
                disabled={selectedDocIds.length < 2}
              >
                Merge Selected Documents
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
