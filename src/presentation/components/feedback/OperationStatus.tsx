import { useOperations } from "../../../app/hooks/useOperations";
import { ProgressBar } from "../common/ProgressBar";

export function OperationStatus() {
  const { activeOperations } = useOperations();

  if (activeOperations.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 space-y-2 max-w-sm">
      {activeOperations.map((operation) => (
        <div
          key={operation.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
              {operation.type} Operation
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {operation.status}
            </span>
          </div>
          <ProgressBar progress={operation.progress} showLabel />
        </div>
      ))}
    </div>
  );
}
