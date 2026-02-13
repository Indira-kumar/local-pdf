import type { StateCreator } from "zustand";
import type { PDFDocument, PDFPage } from "../../shared/types/common";

export interface DocumentState {
  documents: Map<string, PDFDocument>;
  currentDocumentId: string | null;
}

export interface DocumentActions {
  addDocument: (document: PDFDocument) => void;
  removeDocument: (id: string) => void;
  updateDocument: (id: string, updates: Partial<PDFDocument>) => void;
  setCurrentDocument: (id: string | null) => void;
  updatePage: (
    documentId: string,
    pageId: string,
    updates: Partial<PDFPage>,
  ) => void;
  clearDocuments: () => void;
}

export type DocumentSlice = DocumentState & DocumentActions;

export const createDocumentSlice: StateCreator<DocumentSlice> = (set) => ({
  documents: new Map(),
  currentDocumentId: null,

  addDocument: (document) =>
    set((state) => {
      const newDocuments = new Map(state.documents);
      newDocuments.set(document.id, document);
      return { documents: newDocuments };
    }),

  removeDocument: (id) =>
    set((state) => {
      const newDocuments = new Map(state.documents);
      newDocuments.delete(id);
      return {
        documents: newDocuments,
        currentDocumentId:
          state.currentDocumentId === id ? null : state.currentDocumentId,
      };
    }),

  updateDocument: (id, updates) =>
    set((state) => {
      const document = state.documents.get(id);
      if (!document) return state;

      const newDocuments = new Map(state.documents);
      newDocuments.set(id, { ...document, ...updates, modifiedAt: new Date() });
      return { documents: newDocuments };
    }),

  setCurrentDocument: (id) => set({ currentDocumentId: id }),

  updatePage: (documentId, pageId, updates) =>
    set((state) => {
      const document = state.documents.get(documentId);
      if (!document) return state;

      const updatedPages = document.pages.map((page) =>
        page.id === pageId ? { ...page, ...updates } : page,
      );

      const newDocuments = new Map(state.documents);
      newDocuments.set(documentId, {
        ...document,
        pages: updatedPages,
        modifiedAt: new Date(),
      });

      return { documents: newDocuments };
    }),

  clearDocuments: () => set({ documents: new Map(), currentDocumentId: null }),
});
