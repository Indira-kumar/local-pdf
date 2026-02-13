import type { AppState } from "./index";
import type { PDFDocument } from "../../shared/types/common";
import { sortBy } from "../../shared/utils/arrayHelpers";

// Document Selectors
export const selectAllDocuments = (state: AppState): PDFDocument[] => {
  return Array.from(state.documents.values());
};

export const selectDocumentById = (
  state: AppState,
  id: string,
): PDFDocument | undefined => {
  return state.documents.get(id);
};

export const selectCurrentDocument = (
  state: AppState,
): PDFDocument | undefined => {
  if (!state.currentDocumentId) return undefined;
  return state.documents.get(state.currentDocumentId);
};

export const selectSortedDocuments = (state: AppState): PDFDocument[] => {
  const documents = selectAllDocuments(state);
  const { sortBy: sortKey, sortOrder } = state.view;

  return sortBy(documents, sortKey as keyof PDFDocument, sortOrder);
};

// Operation Selectors
export const selectActiveOperations = (state: AppState) => {
  return state.operations.filter(
    (op) => op.status === "processing" || op.status === "pending",
  );
};

export const selectCompletedOperations = (state: AppState) => {
  return state.operations.filter((op) => op.status === "completed");
};

export const selectFailedOperations = (state: AppState) => {
  return state.operations.filter((op) => op.status === "failed");
};

// UI Selectors
export const selectSelectedPages = (state: AppState) => {
  const { documentId, selectedPageIds } = state.selection;
  if (!documentId) return [];

  const document = state.documents.get(documentId);
  if (!document) return [];

  return document.pages.filter((page) => selectedPageIds.has(page.id));
};

export const selectIsPageSelected = (
  state: AppState,
  pageId: string,
): boolean => {
  return state.selection.selectedPageIds.has(pageId);
};

export const selectNotifications = (state: AppState) => {
  return state.notifications;
};
