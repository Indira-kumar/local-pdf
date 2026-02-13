import { useAppStore } from "../store";
import { selectSelectedPages, selectIsPageSelected } from "../store/selectors";
import { useShallow } from "zustand/react/shallow";

export function useSelection() {
  const selection = useAppStore((state) => state.selection);
  const selectedPages = useAppStore(useShallow(selectSelectedPages));
  const setSelection = useAppStore((state) => state.setSelection);
  const togglePageSelection = useAppStore((state) => state.togglePageSelection);
  const clearSelection = useAppStore((state) => state.clearSelection);

  return {
    selection,
    selectedPages,
    selectedPageIds: Array.from(selection.selectedPageIds),
    setSelection,
    togglePageSelection,
    clearSelection,
    hasSelection: selection.selectedPageIds.size > 0,
  };
}

export function usePageSelection(pageId: string) {
  const isSelected = useAppStore((state) =>
    selectIsPageSelected(state, pageId),
  );
  const togglePageSelection = useAppStore((state) => state.togglePageSelection);

  return {
    isSelected,
    toggle: () => togglePageSelection(pageId),
  };
}
