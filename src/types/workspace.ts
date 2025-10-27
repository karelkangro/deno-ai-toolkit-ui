/**
 * Workspace types for Deno AI Toolkit Admin UI
 * These types match the backend Deno AI Toolkit workspace types
 */

export interface Workspace {
  id: string;
  name: string;
  description: string;
  agentType?: AgentType;
  createdAt: string;
  updatedAt: string;
  documentCount: number;
  embeddedCount: number;
  schema?: RuleSchema;
  metadata?: Record<string, unknown>;
}

export interface DocumentMetadata {
  originalPath?: string;
  pageCount?: number;
  language?: string;
  author?: string;
  tags?: string[];
  processingDuration?: number;
  chunkCount?: number;
  [key: string]: string | number | string[] | undefined;
}

export interface Document {
  id: string;
  workspaceId: string;
  name: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  status: DocumentStatus;
  uploadedAt: string;
  embeddedAt?: string;
  metadata?: DocumentMetadata;
}

export interface WorkspaceRule {
  id: string;
  workspaceId: string;
  schemaId?: string;
  name: string;
  content: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  enabled: boolean;
  keywords: string[];
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  metadata?: Record<string, unknown>;
}

export interface RuleField {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object" | "enum";
  required: boolean;
  defaultValue?: unknown;
  description?: string;
  enumValues?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
  };
}

export interface RuleSchema {
  id: string;
  workspaceId: string;
  schemaName: string;
  schemaVersion: string;
  description?: string;
  fields: RuleField[];
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export type AgentType =
  | "architecture"
  | "structural"
  | "electrical"
  | "hvac"
  | "plumbing"
  | "interior"
  | "projectManagement"
  | "ecommerce"
  | "general";

export type DocumentStatus = "uploaded" | "processing" | "embedded" | "error";

export interface CreateWorkspaceRequest {
  name: string;
  description: string;
  agentType?: AgentType;
  metadata?: Record<string, unknown>;
}

export interface UpdateWorkspaceRequest {
  id: string;
  name?: string;
  description?: string;
  agentType?: AgentType;
  metadata?: Record<string, unknown>;
}

export interface WorkspaceStatsData {
  totalDocuments: number;
  uploadedDocuments: number;
  embeddedDocuments: number;
  processingDocuments: number;
  errorDocuments: number;
  totalSize: number;
  totalRules?: number;
  totalSchemas?: number;
}

export interface KnowledgeBaseFile {
  id: string;
  workspaceId: string;
  name: string;
  originalName: string;
  storageKey: string;
  size: number;
  type: string;
  status: DocumentStatus;
  uploadedAt: string;
  embeddedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success?: boolean;
  message?: string;
}

// E-commerce specific types
export interface SurveyQuestion {
  id: string;
  workspaceId: string;
  question: string;
  type: "text" | "multiple_choice" | "rating" | "boolean";
  options?: string[];
  required: boolean;
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductMetadata {
  brand?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags?: string[];
  supplier?: string;
  manufacturerSKU?: string;
  featured?: boolean;
  [key: string]: unknown;
}

export interface Product {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
  status: "active" | "inactive" | "draft";
  images: string[];
  metadata?: ProductMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface EcommerceStats {
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  totalSurveyQuestions: number;
  totalCategories: number;
}

// Embedding status types
export interface EmbeddingStatus {
  uploaded: KnowledgeBaseFile[];
  embedded: KnowledgeBaseFile[];
  processing: KnowledgeBaseFile[];
  error: KnowledgeBaseFile[];
  counts: {
    uploaded: number;
    embedded: number;
    processing: number;
    error: number;
    total: number;
  };
}
