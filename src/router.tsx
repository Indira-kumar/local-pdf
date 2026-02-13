import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./presentation/layouts/MainLayout";
import { ErrorBoundary } from "./presentation/components/feedback/ErrorBoundary";
import { HomePage } from "./presentation/pages/HomePage";
import { MergePage } from "./presentation/pages/MergePage";
import { SplitPage } from "./presentation/pages/SplitPage";
import { RotatePage } from "./presentation/pages/RotatePage";
import { ReorderPage } from "./presentation/pages/ReorderPage";
import { WatermarkPage } from "./presentation/pages/WatermarkPage";
import { ROUTES } from "./shared/constants/ui.constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </ErrorBoundary>
    ),
    errorElement: (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              404 - Page Not Found
            </h1>
            <a href="/" className="text-blue-600 hover:underline">
              Go back home
            </a>
          </div>
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: ROUTES.MERGE,
    element: (
      <ErrorBoundary>
        <MainLayout>
          <MergePage />
        </MainLayout>
      </ErrorBoundary>
    ),
  },
  {
    path: ROUTES.SPLIT,
    element: (
      <ErrorBoundary>
        <MainLayout>
          <SplitPage />
        </MainLayout>
      </ErrorBoundary>
    ),
  },
  {
    path: ROUTES.ROTATE,
    element: (
      <ErrorBoundary>
        <MainLayout>
          <RotatePage />
        </MainLayout>
      </ErrorBoundary>
    ),
  },
  {
    path: ROUTES.REORDER,
    element: (
      <ErrorBoundary>
        <MainLayout>
          <ReorderPage />
        </MainLayout>
      </ErrorBoundary>
    ),
  },
  {
    path: ROUTES.WATERMARK,
    element: (
      <ErrorBoundary>
        <MainLayout>
          <WatermarkPage />
        </MainLayout>
      </ErrorBoundary>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
