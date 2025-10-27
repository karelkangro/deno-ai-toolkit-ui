import { createContext, useContext, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWorkspaceClient, type WorkspaceClient } from '../api';
import type { WorkspaceUIConfig } from '../types';

interface WorkspaceContextValue {
  client: WorkspaceClient;
  config: WorkspaceUIConfig;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

// Default Query Client for React Query
const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export interface WorkspaceProviderProps {
  children: ReactNode;
  config: WorkspaceUIConfig;
  queryClient?: QueryClient;
}

/**
 * WorkspaceProvider - Provides workspace API client and configuration to all child components
 *
 * @example
 * ```tsx
 * <WorkspaceProvider
 *   config={{
 *     api: {
 *       baseUrl: 'https://api.example.com',
 *       endpoints: {
 *         workspaces: '/api/workspaces',
 *         workspaceData: '/api/workspace-data'
 *       }
 *     }
 *   }}
 * >
 *   <YourApp />
 * </WorkspaceProvider>
 * ```
 */
export function WorkspaceProvider({
  children,
  config,
  queryClient = defaultQueryClient,
}: WorkspaceProviderProps) {
  const client = createWorkspaceClient(config.api);

  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceContext.Provider value={{ client, config }}>
        {children}
      </WorkspaceContext.Provider>
    </QueryClientProvider>
  );
}

/**
 * Hook to access the workspace API client
 * @throws {Error} If used outside of WorkspaceProvider
 */
export function useWorkspaceClient(): WorkspaceClient {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceClient must be used within WorkspaceProvider');
  }
  return context.client;
}

/**
 * Hook to access the workspace configuration
 * @throws {Error} If used outside of WorkspaceProvider
 */
export function useWorkspaceConfig(): WorkspaceUIConfig {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceConfig must be used within WorkspaceProvider');
  }
  return context.config;
}
