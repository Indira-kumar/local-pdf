import { useState } from "react";
import { useCurrentDocument } from "../../app/hooks/useDocuments";
import { DocumentList } from "../components/documents/DocumentList";
import { PageGrid } from "../components/pages/PageGrid";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

type SplitStrategy = "byPage" | "byRange" | "bySize";

export function SplitPage() {
  const { currentDocument, setCurrentDocument } = useCurrentDocument();
  const [strategy, setStrategy] = useState<SplitStrategy>("byPage");
  const [rangeInput, setRangeInput] = useState("1-5, 10-15");
  const [pageSize, setPageSize] = useState("5");

  const handleSplit = () => {
    if (!currentDocument) {
      alert("Please select a document to split");
      return;
    }

    // TODO: Implement actual split logic with domain/infrastructure layer
    console.log(
      "Splitting document:",
      currentDocument.id,
      "Strategy:",
      strategy,
    );
    alert(
      "Split operation would be executed here (requires domain layer implementation)",
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Split PDF
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Extract specific pages or split into multiple files
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Document List & Controls */}
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
                Split Strategy
              </h3>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="strategy"
                    value="byPage"
                    checked={strategy === "byPage"}
                    onChange={(e) =>
                      setStrategy(e.target.value as SplitStrategy)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    One file per page
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="strategy"
                    value="byRange"
                    checked={strategy === "byRange"}
                    onChange={(e) =>
                      setStrategy(e.target.value as SplitStrategy)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    By page range
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="strategy"
                    value="bySize"
                    checked={strategy === "bySize"}
                    onChange={(e) =>
                      setStrategy(e.target.value as SplitStrategy)
                    }
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    By number of pages
                  </span>
                </label>
              </div>

              {strategy === "byRange" && (
                <Input
                  label="Page Ranges"
                  placeholder="e.g., 1-5, 10-15, 20"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  helperText="Separate ranges with commas"
                />
              )}

              {strategy === "bySize" && (
                <Input
                  label="Pages per file"
                  type="number"
                  min="1"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                />
              )}

              <Button
                variant="primary"
                className="w-full"
                onClick={handleSplit}
              >
                Split Document
              </Button>
            </div>
          )}
        </div>

        {/* Main Area - Page Preview */}
        <div className="lg:col-span-2">
          {currentDocument ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Pages ({currentDocument.pageCount})
              </h2>
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Select a document to view pages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
