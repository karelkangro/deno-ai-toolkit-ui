export interface RuleSchema {
  schemaName: string;
  description: string;
  schemaVersion: string;
  fields: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
    enumValues?: string[];
  }>;
}

export interface WorkspaceSetupProps {
  schemaData?: RuleSchema;
  rulesCount?: number;
  filesCount?: number;
  embeddedCount?: number;
  onTabChange?: (tab: string) => void;
  labels?: {
    title?: string;
    description?: string;
    filesStep?: string;
    embeddingsStep?: string;
    filesTitle?: string;
    filesComplete?: string;
    filesIncomplete?: string;
    filesView?: string;
    filesUpload?: string;
    embeddingsTitle?: string;
    embeddingsComplete?: string;
    embeddingsIncomplete?: string;
    embeddingsRequiresFiles?: string;
    embeddingsView?: string;
    embeddingsProcess?: string;
    embeddingsLocked?: string;
    readyTitle?: string;
    readyDescription?: string;
  };
}

export const WorkspaceSetup = ({
  filesCount = 0,
  embeddedCount = 0,
  onTabChange,
  labels = {},
}: WorkspaceSetupProps) => {
  const defaultLabels = {
    title: "Workspace Setup",
    description: "Complete these steps to set up your workspace",
    filesStep: "Files",
    embeddingsStep: "Embeddings",
    filesTitle: "Upload Files",
    filesComplete: "Files uploaded",
    filesIncomplete: "No files uploaded",
    filesView: "View",
    filesUpload: "Upload",
    embeddingsTitle: "Process Embeddings",
    embeddingsComplete: "Embeddings processed",
    embeddingsIncomplete: "Embeddings pending",
    embeddingsRequiresFiles: "Upload files first",
    embeddingsView: "View",
    embeddingsProcess: "Process",
    embeddingsLocked: "Locked",
    readyTitle: "Workspace Ready",
    readyDescription: "Your workspace is fully configured and ready to use",
    ...labels,
  };

  // Determine step statuses
  const hasFiles = filesCount > 0;
  const hasEmbeddings = embeddedCount > 0;

  // Calculate completion status
  const isFilesComplete = hasFiles;
  const isEmbeddingsComplete = hasEmbeddings;

  const isWorkspaceReady = isFilesComplete && isEmbeddingsComplete;

  // Button click handlers
  const handleFilesClick = () => {
    onTabChange?.("files");
  };

  const handleEmbeddingsClick = () => {
    onTabChange?.("embeddings");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {defaultLabels.title}
        </h2>
        <p className="text-gray-600">{defaultLabels.description}</p>
      </div>

      <div className="mb-6">
        <ul className="steps steps-vertical lg:steps-horizontal">
          <li
            className={`step ${isFilesComplete ? "step-primary" : "step-neutral"}`}
          >
            {defaultLabels.filesStep}
          </li>
          <li
            className={`step ${isEmbeddingsComplete ? "step-primary" : isFilesComplete ? "step-neutral" : "step-disabled"}`}
          >
            {defaultLabels.embeddingsStep}
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Files Card */}
        <div className="card bg-base-100 border">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isFilesComplete
                      ? "bg-success text-success-content"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  {isFilesComplete ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-sm">
                    {defaultLabels.filesTitle}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isFilesComplete
                      ? `${filesCount} ${defaultLabels.filesComplete}`
                      : defaultLabels.filesIncomplete}
                  </p>
                </div>
              </div>
              <button
                onClick={handleFilesClick}
                className={`btn btn-sm ${isFilesComplete ? "btn-outline" : "btn-primary"}`}
              >
                {isFilesComplete
                  ? defaultLabels.filesView
                  : defaultLabels.filesUpload}
              </button>
            </div>
          </div>
        </div>

        {/* Embeddings Card */}
        <div className="card bg-base-100 border">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isEmbeddingsComplete
                      ? "bg-success text-success-content"
                      : hasFiles
                        ? "bg-base-200 text-base-content"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isEmbeddingsComplete ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-sm">
                    {defaultLabels.embeddingsTitle}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isEmbeddingsComplete
                      ? `${embeddedCount} ${defaultLabels.embeddingsComplete}`
                      : hasFiles
                        ? defaultLabels.embeddingsIncomplete
                        : defaultLabels.embeddingsRequiresFiles}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEmbeddingsClick}
                disabled={!hasFiles}
                className={`btn btn-sm ${!hasFiles ? "btn-disabled" : isEmbeddingsComplete ? "btn-outline" : "btn-primary"}`}
              >
                {!hasFiles
                  ? defaultLabels.embeddingsLocked
                  : isEmbeddingsComplete
                    ? defaultLabels.embeddingsView
                    : defaultLabels.embeddingsProcess}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isWorkspaceReady && (
        <div className="mt-6 p-4 bg-success text-success-content rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold">{defaultLabels.readyTitle}</h3>
              <p className="text-sm opacity-90">
                {defaultLabels.readyDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
