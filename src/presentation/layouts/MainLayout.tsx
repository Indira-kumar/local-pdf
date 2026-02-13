import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToastContainer } from "../components/feedback/Toast";
import { OperationStatus } from "../components/feedback/OperationStatus";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      <Footer />

      {/* Global UI Elements */}
      <ToastContainer />
      <OperationStatus />
    </div>
  );
}
