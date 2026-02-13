import type { StateCreator } from "zustand";
import type { PDFOperation } from "../../shared/types/common";

export interface OperationState {
  operations: PDFOperation[];
  operationQueue: string[];
}

export interface OperationActions {
  addOperation: (operation: PDFOperation) => void;
  updateOperation: (id: string, updates: Partial<PDFOperation>) => void;
  removeOperation: (id: string) => void;
  clearOperations: () => void;
  enqueueOperation: (operationId: string) => void;
  dequeueOperation: () => string | undefined;
}

export type OperationSlice = OperationState & OperationActions;

export const createOperationSlice: StateCreator<OperationSlice> = (
  set,
  get,
) => ({
  operations: [],
  operationQueue: [],

  addOperation: (operation) =>
    set((state) => ({
      operations: [...state.operations, operation],
    })),

  updateOperation: (id, updates) =>
    set((state) => ({
      operations: state.operations.map((op) =>
        op.id === id ? { ...op, ...updates } : op,
      ),
    })),

  removeOperation: (id) =>
    set((state) => ({
      operations: state.operations.filter((op) => op.id !== id),
      operationQueue: state.operationQueue.filter((opId) => opId !== id),
    })),

  clearOperations: () => set({ operations: [], operationQueue: [] }),

  enqueueOperation: (operationId) =>
    set((state) => ({
      operationQueue: [...state.operationQueue, operationId],
    })),

  dequeueOperation: () => {
    const { operationQueue } = get();
    if (operationQueue.length === 0) return undefined;

    const [first, ...rest] = operationQueue;
    set({ operationQueue: rest });
    return first;
  },
});
