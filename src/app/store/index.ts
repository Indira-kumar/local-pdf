import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DocumentSlice, createDocumentSlice } from "./documentSlice";
import { OperationSlice, createOperationSlice } from "./operationSlice";
import { UISlice, createUISlice } from "./uiSlice";

export type AppState = DocumentSlice & OperationSlice & UISlice;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...args) => ({
        ...createDocumentSlice(...args),
        ...createOperationSlice(...args),
        ...createUISlice(...args),
      }),
      {
        name: "pdf-tool-storage",
        partialize: (state) => ({
          view: state.view,
        }),
      },
    ),
  ),
);
