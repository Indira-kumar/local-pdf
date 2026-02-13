import { useAppStore } from "../store";
import {
  selectAllDocuments,
  selectDocumentById,
  selectSortedDocuments,
} from "../store/selectors";
import { useShallow } from "zustand/react/shallow";

export function useDocuments() {
  const documents = useAppStore(useShallow(selectAllDocuments));
  const sortedDocuments = useAppStore(useShallow(selectSortedDocuments));
  const addDocument = useAppStore((state) => state.addDocument);
  const removeDocument = useAppStore((state) => state.removeDocument);
  const updateDocument = useAppStore((state) => state.updateDocument);
  const clearDocuments = useAppStore((state) => state.clearDocuments);
  const setCurrentDocument = useAppStore((state) => state.setCurrentDocument);

  return {
    documents,
    sortedDocuments,
    addDocument,
    removeDocument,
    updateDocument,
    clearDocuments,
    setCurrentDocument,
  };
}

export function useDocument(id: string) {
  const document = useAppStore((state) => selectDocumentById(state, id));
  const updateDocument = useAppStore((state) => state.updateDocument);
  const updatePage = useAppStore((state) => state.updatePage);

  return {
    document,
    updateDocument: (updates: any) => updateDocument(id, updates),
    updatePage: (pageId: string, updates: any) =>
      updatePage(id, pageId, updates),
  };
}

export function useCurrentDocument() {
  const currentDocumentId = useAppStore((state) => state.currentDocumentId);
  const document = useAppStore((state) =>
    currentDocumentId
      ? selectDocumentById(state, currentDocumentId)
      : undefined,
  );
  const setCurrentDocument = useAppStore((state) => state.setCurrentDocument);

  return {
    currentDocument: document,
    currentDocumentId,
    setCurrentDocument,
  };
}
