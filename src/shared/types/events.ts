import { PDFDocument, PDFPage, PDFOperation } from "./common";

export interface DocumentUploadedEvent {
  document: PDFDocument;
}

export interface PageSelectionChangedEvent {
  documentId: string;
  selectedPageIds: string[];
}

export interface OperationStartedEvent {
  operation: PDFOperation;
}

export interface OperationCompletedEvent {
  operation: PDFOperation;
  result?: any;
}

export interface OperationFailedEvent {
  operation: PDFOperation;
  error: Error;
}

export interface PageReorderedEvent {
  documentId: string;
  oldIndex: number;
  newIndex: number;
}

export interface PageRotatedEvent {
  pageId: string;
  degrees: 90 | 180 | 270;
}
