import { useAppStore } from "../store";
import {
  selectActiveOperations,
  selectCompletedOperations,
  selectFailedOperations,
} from "../store/selectors";
import { useShallow } from "zustand/react/shallow";

export function useOperations() {
  const operations = useAppStore(useShallow((state) => state.operations));
  const activeOperations = useAppStore(useShallow(selectActiveOperations));
  const completedOperations = useAppStore(
    useShallow(selectCompletedOperations),
  );
  const failedOperations = useAppStore(useShallow(selectFailedOperations));
  const addOperation = useAppStore((state) => state.addOperation);
  const updateOperation = useAppStore((state) => state.updateOperation);
  const removeOperation = useAppStore((state) => state.removeOperation);
  const clearOperations = useAppStore((state) => state.clearOperations);

  return {
    operations,
    activeOperations,
    completedOperations,
    failedOperations,
    addOperation,
    updateOperation,
    removeOperation,
    clearOperations,
  };
}

export function useOperationQueue() {
  const operationQueue = useAppStore((state) => state.operationQueue);
  const enqueueOperation = useAppStore((state) => state.enqueueOperation);
  const dequeueOperation = useAppStore((state) => state.dequeueOperation);

  return {
    operationQueue,
    enqueueOperation,
    dequeueOperation,
  };
}
