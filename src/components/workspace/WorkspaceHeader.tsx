import { useNavigate } from "react-router-dom";

export interface Workspace {
  id: string;
  name: string;
  description: string;
  agentType: string;
  createdAt: string;
  updatedAt: string;
  documentCount?: number;
}

export interface WorkspaceHeaderProps {
  workspace: Workspace;
  agentTypeLabels?: Record<string, string>;
  backUrl?: string;
  backButtonTitle: string;
}

export const WorkspaceHeader = ({
  workspace,
  agentTypeLabels = {},
  backUrl = "/admin/workspaces",
  backButtonTitle,
}: WorkspaceHeaderProps) => {
  const navigate = useNavigate();

  const formatAgentType = (agentType: string) => {
    return agentTypeLabels[agentType] || agentType;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(backUrl)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={backButtonTitle}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {workspace.name}
            </h1>
            <p className="text-gray-500 mt-1">{workspace.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {formatAgentType(workspace.agentType)}
          </span>
        </div>
      </div>
    </div>
  );
};
