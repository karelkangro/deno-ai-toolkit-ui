export interface Workspace {
  id: string;
  name: string;
  description: string;
  agentType: string;
  createdAt: string;
  updatedAt: string;
  documentCount?: number;
}

export interface WorkspaceOverviewProps {
  workspace: Workspace;
  agentTypeLabels?: Record<string, string>;
  labels: {
    workspaceInformation: string;
    agentType: string;
    created: string;
    lastUpdated: string;
  };
}

export const WorkspaceOverview = ({
  workspace,
  agentTypeLabels = {},
  labels,
}: WorkspaceOverviewProps) => {
  const formatAgentType = (agentType: string) => {
    return agentTypeLabels[agentType] || agentType;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {labels.workspaceInformation}
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">{labels.agentType}</span>
            <span className="text-sm font-medium text-gray-900">
              {formatAgentType(workspace.agentType)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">{labels.created}</span>
            <span className="text-sm font-medium text-gray-900">
              {new Date(workspace.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">{labels.lastUpdated}</span>
            <span className="text-sm font-medium text-gray-900">
              {new Date(workspace.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
