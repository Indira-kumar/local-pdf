import { useState } from "react";
import { useCurrentDocument, useDocuments } from "../../app/hooks/useDocuments";
import { useSelection } from "../../app/hooks/useSelection";
import { DocumentList } from "../components/documents/DocumentList";
import { PageGrid } from "../components/pages/PageGrid";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

type WatermarkPosition =
  | "center"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export function WatermarkPage() {
  const { setCurrentDocument } = useDocuments();
  const { currentDocument } = useCurrentDocument();
  const { selectedPages, clearSelection } = useSelection();

  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#000000");
  const [position, setPosition] = useState<WatermarkPosition>("center");
  const [rotation, setRotation] = useState(-45);

  const handleApplyWatermark = () => {
    if (!currentDocument) {
      alert("Please select a document");
      return;
    }

    const targetPages =
      selectedPages.length > 0 ? selectedPages : currentDocument.pages;

    // TODO: Implement actual watermark logic with domain/infrastructure layer
    console.log("Applying watermark to", targetPages.length, "pages:", {
      text: watermarkText,
      opacity,
      fontSize,
      color,
      position,
      rotation,
    });
    alert(
      "Watermark operation would be executed here (requires domain layer implementation)",
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Add Watermark
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add text watermarks to your PDF pages
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
                Watermark Settings
              </h3>

              <Input
                label="Text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Opacity: {opacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "topLeft", label: "Top Left" },
                    { value: "center", label: "Center" },
                    { value: "topRight", label: "Top Right" },
                    { value: "bottomLeft", label: "Bottom Left" },
                    { value: "bottomRight", label: "Bottom Right" },
                  ].map((pos) => (
                    <button
                      key={pos.value}
                      onClick={() =>
                        setPosition(pos.value as WatermarkPosition)
                      }
                      className={`
                        px-2 py-1 text-xs rounded border transition-colors
                        ${
                          position === pos.value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500"
                        }
                      `}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rotation: {rotation}°
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedPages.length > 0
                    ? `Apply to ${selectedPages.length} selected page(s)`
                    : "Apply to all pages"}
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleApplyWatermark}
                >
                  Apply Watermark
                </Button>

                {selectedPages.length > 0 && (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={clearSelection}
                  >
                    Clear Selection
                  </Button>
                )}
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
                  {selectedPages.length > 0
                    ? "Click pages to select/deselect"
                    : "Watermark will apply to all pages"}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Preview
                </h3>
                <div className="relative h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span
                    style={{
                      opacity: opacity / 100,
                      fontSize: `${fontSize}px`,
                      color: color,
                      transform: `rotate(${rotation}deg)`,
                    }}
                    className="font-bold select-none"
                  >
                    {watermarkText || "Preview"}
                  </span>
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
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <p>Select a document to add watermark</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
