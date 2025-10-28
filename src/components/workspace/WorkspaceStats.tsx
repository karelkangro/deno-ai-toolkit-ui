export interface Workspace {
  id: string;
  name: string;
  description: string;
  agentType: string;
  createdAt: string;
  updatedAt: string;
  documentCount?: number;
}

export interface KnowledgeBaseFile {
  id: string;
  name: string;
  status: "uploaded" | "embedded" | "available";
  size: number;
  createdAt?: string;
  embeddedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface WorkspaceStatsProps {
  workspace: Workspace;
  knowledgeBaseFiles: KnowledgeBaseFile[];
  labels: {
    totalFiles: string;
    uploaded: string;
    embedded: string;
    documents: string;
    total: string;
    inWorkspace: string;
    embeddings: string;
    vectorDatabase: string;
    ready: string;
  };
}

export const WorkspaceStats = ({
  workspace,
  knowledgeBaseFiles,
  labels,
}: WorkspaceStatsProps) => {
  const embeddedCount = knowledgeBaseFiles.filter(
    (f) => f.status === "embedded",
  ).length;
  const uploadedCount = knowledgeBaseFiles.filter(
    (f) => f.status === "uploaded",
  ).length;

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {labels.totalFiles}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {knowledgeBaseFiles.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-600">
            {uploadedCount} {labels.uploaded}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-green-600 font-medium">
            {embeddedCount} {labels.embedded}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {labels.documents}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {workspace.documentCount || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-600 font-medium">
            {workspace.documentCount || 0} {labels.total}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">{labels.inWorkspace}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {labels.embeddings}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {embeddedCount}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-gray-600">{labels.vectorDatabase}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-green-600 font-medium">{labels.ready}</span>
        </div>
      </div>
    </div>
  );
};
