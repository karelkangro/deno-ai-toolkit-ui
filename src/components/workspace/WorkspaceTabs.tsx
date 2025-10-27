export type ActiveTab =
  | "overview"
  | "files"
  | "embeddings"
  | "rules"
  | "schema";

export interface WorkspaceTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  knowledgeBaseFilesCount: number;
  embeddedCount: number;
  labels?: {
    documents?: string;
    embeddings?: string;
    rules?: string;
    schema?: string;
    overview?: string;
  };
}

export const WorkspaceTabs = ({
  activeTab,
  onTabChange,
  knowledgeBaseFilesCount,
  embeddedCount,
  labels = {},
}: WorkspaceTabsProps) => {
  const defaultLabels = {
    documents: "Documents",
    embeddings: "Embeddings",
    rules: "Rules",
    schema: "Schema",
    overview: "Overview",
    ...labels,
  };

  return (
    <div role="tablist" className="tabs tabs-lifted tabs-lg">
      <label
        className={`tab ${activeTab === "files" ? "tab-active text-primary [--tab-bg:orange] [--tab-border-color:red]" : ""}`}
        onClick={() => onTabChange("files")}
      >
        <input
          type="radio"
          name="workspace_tabs"
          checked={activeTab === "files"}
          onChange={() => {}}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 me-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        {defaultLabels.documents} ({knowledgeBaseFilesCount})
      </label>
      <label
        className={`tab ${activeTab === "embeddings" ? "tab-active text-primary [--tab-bg:orange] [--tab-border-color:red]" : ""}`}
        onClick={() => onTabChange("embeddings")}
      >
        <input
          type="radio"
          name="workspace_tabs"
          checked={activeTab === "embeddings"}
          onChange={() => {}}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 me-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
        {defaultLabels.embeddings} ({embeddedCount})
      </label>
    </div>
  );
};
