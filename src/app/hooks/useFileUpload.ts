import { useCallback, useState } from "react";
import type { PDFDocument as PDFDocType } from "../../shared/types/common";
import { PDF_CONSTANTS } from "../../shared/constants/pdf.constants";
import { useAppStore } from "../store";

interface UseFileUploadOptions {
  onSuccess?: (document: PDFDocType) => void;
  onError?: (error: Error) => void;
  maxFileSize?: number;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const addDocument = useAppStore((state) => state.addDocument);
  const addNotification = useAppStore((state) => state.addNotification);

  const maxFileSize = options.maxFileSize || PDF_CONSTANTS.MAX_FILE_SIZE;

  const validateFile = (file: File): Error | null => {
    const allowedTypes = PDF_CONSTANTS.ALLOWED_MIME_TYPES as readonly string[];
    if (!allowedTypes.includes(file.type)) {
      return new Error("Invalid file type. Only PDF files are allowed.");
    }

    if (file.size > maxFileSize) {
      return new Error(
        `File size exceeds ${maxFileSize / (1024 * 1024)}MB limit.`,
      );
    }

    return null;
  };

  const uploadFile = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      try {
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          throw validationError;
        }

        // Simulate progress
        setUploadProgress(30);

        // Read file as array buffer (would be used for PDF parsing)
        await file.arrayBuffer();
        setUploadProgress(60);

        // Create document object (actual PDF parsing would happen in domain layer)
        const document: PDFDocType = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          createdAt: new Date(),
          modifiedAt: new Date(),
          pageCount: 0, // Would be calculated from PDF
          pages: [], // Would be extracted from PDF
          blob: file,
          storedInCache: false,
        };

        setUploadProgress(90);

        // Add to store
        addDocument(document);

        setUploadProgress(100);

        addNotification({
          type: "success",
          message: `${file.name} uploaded successfully`,
          duration: 3000,
        });

        options.onSuccess?.(document);

        return document;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Upload failed");
        setError(error);

        addNotification({
          type: "error",
          message: error.message,
          duration: 5000,
        });

        options.onError?.(error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [addDocument, addNotification, maxFileSize, options],
  );

  const uploadFiles = useCallback(
    async (files: File[] | FileList) => {
      const fileArray = Array.from(files);
      const results = await Promise.allSettled(fileArray.map(uploadFile));

      const successful = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      if (failed > 0) {
        addNotification({
          type: "warning",
          message: `${successful} file(s) uploaded, ${failed} failed`,
          duration: 4000,
        });
      }

      return results;
    },
    [uploadFile, addNotification],
  );

  return {
    uploadFile,
    uploadFiles,
    isUploading,
    uploadProgress,
    error,
  };
}
