import { useState } from "react";
import { useCurrentDocument, useDocuments } from "../../app/hooks/useDocuments";
import { useSelection } from "../../app/hooks/useSelection";
import { DocumentList } from "../components/documents/DocumentList";
import { PageGrid } from "../components/pages/PageGrid";
import { Button } from "../components/common/Button";

export function RotatePage() {
  const { setCurrentDocument } = useDocuments();
  const { currentDocument } = useCurrentDocument();
  const { selectedPages, clearSelection } = useSelection();
  const [rotationDegree, setRotationDegree] = useState<90 | 180 | 270>(90);

  const handleRotate = () => {
    if (selectedPages.length === 0) {
      alert("Please select at least one page to rotate");
      return;
    }

    // TODO: Implement actual rotation logic with domain/infrastructure layer
    console.log(
      "Rotating pages:",
      selectedPages.map((p) => p.id),
      "by",
      rotationDegree,
      "degrees",
    );
    alert(
      "Rotation operation would be executed here (requires domain layer implementation)",
    );
  };

  const handleRotateAll = () => {
    if (!currentDocument) return;

    // TODO: Implement rotate all pages
    console.log("Rotating all pages by", rotationDegree, "degrees");
    alert(
      "Rotate all operation would be executed here (requires domain layer implementation)",
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Rotate Pages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Rotate pages to the correct orientation
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
                Rotation Controls
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rotation Angle
                </label>
                <div className="flex gap-2">
                  {[90, 180, 270].map((degree) => (
                    <button
                      key={degree}
                      onClick={() =>
                        setRotationDegree(degree as 90 | 180 | 270)
                      }
                      className={`
                        flex-1 px-4 py-2 rounded-lg border transition-colors
                        ${
                          rotationDegree === degree
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500"
                        }
                      `}
                    >
                      {degree}°
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedPages.length} page(s) selected
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleRotate}
                  disabled={selectedPages.length === 0}
                >
                  Rotate Selected
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleRotateAll}
                >
                  Rotate All Pages
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={clearSelection}
                  disabled={selectedPages.length === 0}
                >
                  Clear Selection
                </Button>
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
                  Click pages to select them for rotation
                </div>
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <p>Select a document to rotate pages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
