import type {
  Workspace,
  Document,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  WorkspaceStatsData,
  KnowledgeBaseFile,
  ApiResponse,
  ApiConfig,
  EmbeddingStatus
} from '../types';

/**
 * Creates a configurable workspace API client
 * @param config API configuration
 * @returns Workspace API client methods
 */
export function createWorkspaceClient(config: ApiConfig) {
  const { baseUrl, endpoints, headers = {}, timeout = 30000 } = config;

  const defaultEndpoints = {
    workspaces: '/api/workspaces',
    workspaceData: '/api/workspace-data',
    embeddings: '/api/embeddings',
    ...endpoints
  };

  const getApiUrl = (endpoint: string) => `${baseUrl}${endpoint}`;

  const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...headers,
          ...options.headers
        }
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  };

  return {
    // Workspace CRUD operations
    async getWorkspaces(): Promise<Workspace[]> {
      const response = await fetchWithTimeout(getApiUrl(defaultEndpoints.workspaces));
      const data = await handleResponse<{ workspaces?: Workspace[] } | Workspace[]>(response);
      return Array.isArray(data) ? data : (data.workspaces || []);
    },

    async getWorkspace(id: string): Promise<Workspace> {
      const response = await fetchWithTimeout(getApiUrl(`${defaultEndpoints.workspaces}?id=${id}`));
      const data = await handleResponse<{ workspace?: Workspace } | Workspace>(response);
      if ('workspace' in data && data.workspace) {
        return data.workspace;
      }
      return data as Workspace;
    },

    async createWorkspace(data: CreateWorkspaceRequest): Promise<Workspace> {
      const response = await fetchWithTimeout(getApiUrl(defaultEndpoints.workspaces), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await handleResponse<{ workspace?: Workspace } | Workspace>(response);
      if ('workspace' in result && result.workspace) {
        return result.workspace;
      }
      return result as Workspace;
    },

    async updateWorkspace(id: string, data: UpdateWorkspaceRequest): Promise<Workspace> {
      const response = await fetchWithTimeout(getApiUrl(`${defaultEndpoints.workspaces}?id=${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await handleResponse<{ workspace?: Workspace } | Workspace>(response);
      if ('workspace' in result && result.workspace) {
        return result.workspace;
      }
      return result as Workspace;
    },

    async deleteWorkspace(id: string): Promise<void> {
      const response = await fetchWithTimeout(getApiUrl(`${defaultEndpoints.workspaces}?id=${id}`), {
        method: 'DELETE',
      });
      await handleResponse<{ success: boolean }>(response);
    },

    // Document operations
    async getWorkspaceDocuments(workspaceId: string): Promise<Document[]> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=documents`)
      );
      const data = await handleResponse<{ documents?: Document[] } | Document[]>(response);
      return Array.isArray(data) ? data : (data.documents || []);
    },

    async getKnowledgeBaseFiles(workspaceId: string): Promise<KnowledgeBaseFile[]> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=knowledge-base`)
      );
      const data = await handleResponse<{ documents?: KnowledgeBaseFile[] } | KnowledgeBaseFile[]>(response);
      return Array.isArray(data) ? data : (data.documents || []);
    },

    async uploadDocument(workspaceId: string, file: File): Promise<Document> {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=upload`),
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await handleResponse<{ document?: Document } | Document>(response);
      if ('document' in data && data.document) {
        return data.document;
      }
      return data as Document;
    },

    async embedDocument(workspaceId: string, documentId: string): Promise<Document> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=embed`),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ documentId }),
        }
      );
      const data = await handleResponse<{ document?: Document } | Document>(response);
      if ('document' in data && data.document) {
        return data.document;
      }
      return data as Document;
    },

    async deleteDocument(workspaceId: string, documentId: string): Promise<void> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=document&documentId=${documentId}`),
        {
          method: 'DELETE',
        }
      );
      await handleResponse<{ success: boolean }>(response);
    },

    // Stats operations
    async getWorkspaceStats(workspaceId: string): Promise<WorkspaceStatsData> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=stats`)
      );
      return handleResponse<WorkspaceStatsData>(response);
    },

    // Embedding operations
    async getEmbedStatus(workspaceId: string): Promise<EmbeddingStatus> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=embed-status`)
      );
      return handleResponse<EmbeddingStatus>(response);
    },

    async removeEmbedding(workspaceId: string, documentId: string): Promise<void> {
      const response = await fetchWithTimeout(
        getApiUrl(`${defaultEndpoints.workspaceData}?workspaceId=${workspaceId}&action=remove-embedding&documentId=${documentId}`),
        {
          method: 'DELETE',
        }
      );
      await handleResponse<{ success: boolean }>(response);
    }
  };
}

export type WorkspaceClient = ReturnType<typeof createWorkspaceClient>;
