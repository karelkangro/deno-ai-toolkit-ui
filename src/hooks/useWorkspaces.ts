import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useWorkspaceClient } from "../context";
import type { CreateWorkspaceRequest, UpdateWorkspaceRequest } from "../types";

const QUERY_KEYS = {
  WORKSPACES: ["workspaces"],
  WORKSPACE: (id: string) => ["workspace", id],
  WORKSPACE_DOCUMENTS: (id: string) => ["workspace", id, "documents"],
  WORKSPACE_STATS: (id: string) => ["workspace", id, "stats"],
  WORKSPACE_RULES: (id: string) => ["workspace", id, "rules"],
  WORKSPACE_PRODUCTS: (id: string) => ["workspace", id, "products"],
  WORKSPACE_SURVEYS: (id: string) => ["workspace", id, "surveys"],
  WORKSPACE_EMBED_STATUS: (id: string) => ["workspace", id, "embed-status"],
  WORKSPACE_KNOWLEDGE_BASE: (id: string) => ["workspace", id, "knowledge-base"],
} as const;

export const useWorkspaces = () => {
  const queryClient = useQueryClient();
  const client = useWorkspaceClient();

  const {
    data: workspaces = [],
    isLoading: loading,
    error,
    refetch: loadWorkspaces,
  } = useQuery({
    queryKey: QUERY_KEYS.WORKSPACES,
    queryFn: () => client.getWorkspaces(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateWorkspaceRequest) => client.createWorkspace(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACES }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateWorkspaceRequest) =>
      client.updateWorkspace(data.id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACES }),
  });

  const deleteMutation = useMutation({
    mutationFn: (workspaceId: string) => client.deleteWorkspace(workspaceId),
    onSuccess: (_, workspaceId) => {
      // Optimistically update the workspaces list
      queryClient.setQueryData(QUERY_KEYS.WORKSPACES, (oldData: unknown) => {
        if (!Array.isArray(oldData)) return oldData;
        return oldData.filter((workspace) => workspace.id !== workspaceId);
      });

      // Remove all queries related to this workspace
      queryClient.removeQueries({
        queryKey: ["workspace", workspaceId],
        exact: false,
      });

      // Invalidate the workspaces list to ensure consistency
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSPACES });
    },
  });

  return {
    workspaces,
    loading,
    error: error?.message ?? null,
    loadWorkspaces,
    createWorkspace: createMutation.mutateAsync,
    deleteWorkspace: deleteMutation.mutateAsync,
    updateWorkspace: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
