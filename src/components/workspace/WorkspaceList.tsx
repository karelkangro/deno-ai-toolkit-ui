import type { Workspace, AgentType } from "../../types";
import { WorkspaceCard } from "./WorkspaceCard";
import { WorkspaceCardSkeleton } from "./WorkspaceCardSkeleton";

export interface WorkspaceListProps {
  workspaces: Workspace[];
  onOpen: (id: string) => void;
  onDelete: (workspace: Workspace) => void;
  onEdit: (workspace: Workspace) => void;
  formatDate: (dateString: string) => string;
  getAgentTypeLabel: (agentType: AgentType) => string;
  isCreating?: boolean;
  logoUrl?: string;
  emptyMessage?: string;
}

export const WorkspaceList = ({
  workspaces,
  onOpen,
  onEdit,
  formatDate,
  getAgentTypeLabel,
  isCreating = false,
  logoUrl,
  emptyMessage = "No workspaces found",
}: WorkspaceListProps) => {
  if (workspaces.length === 0 && !isCreating) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 list-none">
      {workspaces.map((workspace) => (
        <li key={workspace.id}>
          <WorkspaceCard
            workspace={workspace}
            onOpen={onOpen}
            onEdit={onEdit}
            formatDate={formatDate}
            getAgentTypeLabel={getAgentTypeLabel}
            logoUrl={logoUrl}
          />
        </li>
      ))}
      {isCreating && (
        <li>
          <WorkspaceCardSkeleton />
        </li>
      )}
    </ul>
  );
};
