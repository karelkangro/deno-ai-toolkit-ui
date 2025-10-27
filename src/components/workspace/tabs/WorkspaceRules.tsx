export interface WorkspaceRulesProps {
  onAddRule?: () => void;
  labels?: {
    workspaceRules?: string;
    manageRules?: string;
    addRule?: string;
    rulesComingSoon?: string;
    configureRules?: string;
  };
}

export const WorkspaceRules = ({
  onAddRule,
  labels = {},
}: WorkspaceRulesProps) => {
  const defaultLabels = {
    workspaceRules: "Workspace Rules",
    manageRules: "Manage rules and policies for this workspace",
    addRule: "Add Rule",
    rulesComingSoon: "Rules management coming soon",
    configureRules: "Configure workspace rules and policies here",
    ...labels,
  };

  const handleAddRule = () => {
    if (onAddRule) {
      onAddRule();
    }
    // Add rule functionality not implemented yet
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {defaultLabels.workspaceRules}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {defaultLabels.manageRules}
          </p>
        </div>
        <button
          onClick={handleAddRule}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {defaultLabels.addRule}
        </button>
      </div>

      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p className="text-gray-600 font-medium">
          {defaultLabels.rulesComingSoon}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {defaultLabels.configureRules}
        </p>
      </div>
    </div>
  );
};
