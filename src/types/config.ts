/**
 * Configuration types for the Deno AI Toolkit UI
 */

export interface ApiConfig {
  baseUrl: string;
  endpoints?: {
    workspaces?: string;
    workspaceData?: string;
    embeddings?: string;
  };
  headers?: Record<string, string>;
  timeout?: number;
}

export interface UIConfig {
  theme?: "light" | "dark" | "auto";
  locale?: string;
  dateFormat?: string;
  translations?: Record<string, Record<string, string>>;
}

export interface WorkspaceUIConfig {
  api: ApiConfig;
  ui?: UIConfig;
  features?: {
    enableFileUpload?: boolean;
    enableEmbeddings?: boolean;
    enableRules?: boolean;
    enableSchema?: boolean;
    maxFileSize?: number;
    allowedFileTypes?: string[];
  };
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: "",
  endpoints: {
    workspaces: "/api/workspaces",
    workspaceData: "/api/workspace-data",
    embeddings: "/api/embeddings",
  },
  timeout: 30000,
};

export const DEFAULT_UI_CONFIG: UIConfig = {
  theme: "auto",
  locale: "en",
  dateFormat: "yyyy-MM-dd",
};

export const DEFAULT_FEATURES = {
  enableFileUpload: true,
  enableEmbeddings: true,
  enableRules: true,
  enableSchema: true,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedFileTypes: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
  ],
};
