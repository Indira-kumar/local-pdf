import { useCallback } from "react";
import { useFileUpload } from "../../../app/hooks/useFileUpload";

interface UploadZoneProps {
  onUpload?: () => void;
  maxSize?: number;
}

export function UploadZone({ onUpload, maxSize }: UploadZoneProps) {
  const { uploadFiles, isUploading, uploadProgress } = useFileUpload({
    maxFileSize: maxSize,
    onSuccess: () => onUpload?.(),
  });

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadFiles(files);
      }
    },
    [uploadFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        uploadFiles(files);
      }
    },
    [uploadFiles],
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
    >
      {isUploading ? (
        <div className="space-y-4">
          <svg
            className="mx-auto h-12 w-12 text-blue-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Uploading... {uploadProgress}%
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Drag and drop PDF files here, or{" "}
            <label className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              browse
              <input
                type="file"
                className="hidden"
                accept="application/pdf"
                multiple
                onChange={handleFileInput}
              />
            </label>
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            PDF files up to {maxSize ? `${maxSize / (1024 * 1024)}MB` : "100MB"}
          </p>
        </>
      )}
    </div>
  );
}
