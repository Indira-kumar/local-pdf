import type { StateCreator } from "zustand";
import type {
  SelectionState,
  ViewState,
  ModalState,
  Notification,
} from "../../shared/types/common";

export interface UIState {
  selection: SelectionState;
  view: ViewState;
  modal: ModalState;
  notifications: Notification[];
}

export interface UIActions {
  setSelection: (documentId: string, pageIds: string[]) => void;
  togglePageSelection: (pageId: string) => void;
  clearSelection: () => void;
  setViewMode: (mode: "grid" | "list") => void;
  setThumbnailSize: (size: "small" | "medium" | "large") => void;
  setSortBy: (sortBy: "name" | "date" | "size") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  openModal: (type: ModalState["type"], data?: any) => void;
  closeModal: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt">,
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export type UISlice = UIState & UIActions;

export const createUISlice: StateCreator<UISlice> = (set) => ({
  selection: {
    documentId: null,
    selectedPageIds: new Set(),
    selectionMode: "single",
  },
  view: {
    viewMode: "grid",
    thumbnailSize: "medium",
    sortBy: "name",
    sortOrder: "asc",
  },
  modal: {
    isOpen: false,
    type: null,
  },
  notifications: [],

  setSelection: (documentId, pageIds) =>
    set({
      selection: {
        documentId,
        selectedPageIds: new Set(pageIds),
        selectionMode: pageIds.length > 1 ? "multiple" : "single",
      },
    }),

  togglePageSelection: (pageId) =>
    set((state) => {
      const newSelectedPageIds = new Set(state.selection.selectedPageIds);
      if (newSelectedPageIds.has(pageId)) {
        newSelectedPageIds.delete(pageId);
      } else {
        newSelectedPageIds.add(pageId);
      }

      return {
        selection: {
          ...state.selection,
          selectedPageIds: newSelectedPageIds,
          selectionMode: newSelectedPageIds.size > 1 ? "multiple" : "single",
        },
      };
    }),

  clearSelection: () =>
    set({
      selection: {
        documentId: null,
        selectedPageIds: new Set(),
        selectionMode: "single",
      },
    }),

  setViewMode: (mode) =>
    set((state) => ({
      view: { ...state.view, viewMode: mode },
    })),

  setThumbnailSize: (size) =>
    set((state) => ({
      view: { ...state.view, thumbnailSize: size },
    })),

  setSortBy: (sortBy) =>
    set((state) => ({
      view: { ...state.view, sortBy },
    })),

  setSortOrder: (order) =>
    set((state) => ({
      view: { ...state.view, sortOrder: order },
    })),

  openModal: (type, data) =>
    set({
      modal: { isOpen: true, type, data },
    }),

  closeModal: () =>
    set({
      modal: { isOpen: false, type: null, data: undefined },
    }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: `notification-${Date.now()}-${Math.random()}`,
          createdAt: new Date(),
        },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
});
