import type { Workspace, AgentType } from "../../types";

export interface WorkspaceCardProps {
  workspace: Workspace;
  onOpen: (id: string) => void;
  onEdit: (workspace: Workspace) => void;
  formatDate: (dateString: string) => string;
  getAgentTypeLabel: (agentType: AgentType) => string;
  logoUrl?: string;
  labels: {
    noWorkspaceFound: string;
    agent: string;
    created: string;
    edit: string;
    open: string;
  };
}

export const WorkspaceCard = ({
  workspace,
  onOpen,
  onEdit,
  formatDate,
  getAgentTypeLabel,
  logoUrl,
  labels,
}: WorkspaceCardProps) => {
  if (!workspace || !workspace.name || !workspace.description) {
    return (
      <div className="card card-side bg-base-100 w-full max-w-2xl">
        <h1>{labels.noWorkspaceFound}</h1>
      </div>
    );
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm w-full max-w-xl">
      {logoUrl && (
        <figure>
          <img className="w-55" src={logoUrl} alt={workspace.name} />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{workspace.name}</h2>
        <p className="line-clamp-2">{workspace.description}</p>

        <div className="stats stats-vertical shadow-sm mb-4">
          {workspace.agentType && (
            <div className="stat">
              <div className="stat-title">{labels.agent}</div>
              <div className="stat-value text-sm">
                {getAgentTypeLabel(workspace.agentType)}
              </div>
            </div>
          )}
          <div className="stat">
            <div className="stat-title">{labels.created}</div>
            <div className="stat-value text-sm">
              {formatDate(workspace.createdAt)}
            </div>
          </div>
        </div>

        <div className="justify-end card-actions">
          <button onClick={() => onEdit(workspace)} className="btn btn-warning">
            {labels.edit}
          </button>
          <button
            onClick={() => onOpen(workspace.id)}
            className="btn btn-primary"
          >
            {labels.open}
          </button>
        </div>
      </div>
    </div>
  );
};
