import { useCurrentDocument, useDocuments } from "../../app/hooks/useDocuments";
import { DocumentList } from "../components/documents/DocumentList";
import { PageGrid } from "../components/pages/PageGrid";
import { Button } from "../components/common/Button";

export function ReorderPage() {
  const { setCurrentDocument } = useDocuments();
  const { currentDocument } = useCurrentDocument();

  const handleSave = () => {
    if (!currentDocument) return;

    // TODO: Implement actual reorder save logic with domain/infrastructure layer
    console.log("Saving reordered pages for document:", currentDocument.id);
    alert(
      "Reorder save operation would be executed here (requires domain layer implementation)",
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Reorder Pages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Drag and drop pages to rearrange them in any order
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Select Document
            </h2>
            <DocumentList
              onSelectDocument={setCurrentDocument}
              selectedDocumentId={currentDocument?.id}
            />
          </div>

          {currentDocument && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Actions
              </h3>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleSave}
                >
                  Save New Order
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  Reset Order
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Drag pages to reorder them</p>
                  <p>• Changes are temporary until saved</p>
                  <p>• Download will create a new PDF with the new order</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Area */}
        <div className="lg:col-span-2">
          {currentDocument ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Pages ({currentDocument.pageCount})
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Drag to reorder
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Note: Drag-and-drop functionality requires additional
                  implementation with a library like react-beautiful-dnd or
                  dnd-kit
                </p>
              </div>
              <PageGrid pages={currentDocument.pages} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg
                  className="mx-auto h-12 w-12 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <p>Select a document to reorder pages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
