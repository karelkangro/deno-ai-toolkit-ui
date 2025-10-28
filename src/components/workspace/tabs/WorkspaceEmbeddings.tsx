import { useState } from "react";

export interface KnowledgeBaseFile {
  id: string;
  name: string;
  status: "uploaded" | "embedded" | "available";
  size: number;
  createdAt?: string;
  embeddedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface EmbedStatus {
  embedded: KnowledgeBaseFile[];
  counts: {
    embedded: number;
    total: number;
  };
}

export interface WorkspaceEmbeddingsProps {
  workspaceId: string;
  embedStatus?: EmbedStatus;
  isLoading?: boolean;
  onRefresh?: () => void;
  onRemoveEmbedding?: (fileId: string) => Promise<void>;
  isRemoving?: boolean;
  labels: {
    title: string;
    description: string;
    refresh: string;
    noEmbeddedFiles: string;
    uploadAndEmbed: string;
    embedded: string;
    removeEmbedding: string;
    confirmRemove: string;
    cancel: string;
    delete: string;
    vectors: string;
  };
}

export const WorkspaceEmbeddings = ({
  embedStatus,
  isLoading = false,
  onRefresh,
  onRemoveEmbedding,
  isRemoving = false,
  labels,
}: WorkspaceEmbeddingsProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<KnowledgeBaseFile | null>(
    null,
  );

  const embeddedFiles = embedStatus?.embedded || [];
  const counts = embedStatus?.counts || { embedded: 0, total: 0 };

  const handleRemoveEmbedding = (file: KnowledgeBaseFile) => {
    setFileToDelete(file);
    setDeleteModalOpen(true);
  };

  const confirmRemoveEmbedding = async () => {
    if (!fileToDelete || !onRemoveEmbedding) return;

    try {
      await onRemoveEmbedding(fileToDelete.id);
      setDeleteModalOpen(false);
      setFileToDelete(null);
    } catch (error) {
      console.error("Failed to remove embedding:", error);
      setDeleteModalOpen(false);
      setFileToDelete(null);
    }
  };

  const cancelRemoveEmbedding = () => {
    setDeleteModalOpen(false);
    setFileToDelete(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels.title}</h3>
          <p className="text-sm text-base-content/60 mt-1">
            {counts.embedded} {labels.description} ({counts.total} total)
          </p>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="btn btn-sm btn-ghost"
            disabled={isLoading}
          >
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {labels.refresh}
          </button>
        )}
      </div>

      {embeddedFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-base-content/40"
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
          </div>
          <p className="text-base-content/70 font-medium">
            {labels.noEmbeddedFiles}
          </p>
          <p className="text-sm text-base-content/50 mt-1">
            {labels.uploadAndEmbed}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {embeddedFiles.map((file) => (
            <div key={file.id} className="card card-border bg-base-100">
              <div className="card-body p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
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
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{file.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-base-content/60">
                        <span className="flex items-center gap-1">
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
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                          </svg>
                          {formatFileSize(file.size)}
                        </span>
                        {file.embeddedAt && (
                          <span className="flex items-center gap-1">
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {formatDate(file.embeddedAt)}
                          </span>
                        )}
                      </div>
                      {file.metadata && "chunks" in file.metadata && (
                        <div className="mt-2">
                          <span className="badge badge-sm badge-primary badge-outline">
                            {String(file.metadata["chunks"] as number | string)}{" "}
                            {labels.vectors}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="badge badge-success badge-sm">
                      {labels.embedded}
                    </span>
                    {onRemoveEmbedding && (
                      <button
                        onClick={() => handleRemoveEmbedding(file)}
                        disabled={isRemoving}
                        className="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/10"
                        title={labels.removeEmbedding}
                      >
                        {isRemoving ? (
                          <span className="loading loading-spinner loading-xs"></span>
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">{labels.removeEmbedding}</h3>
            <p className="py-4">{labels.confirmRemove}</p>
            <p className="text-sm text-base-content/70 mb-4">
              <strong>{fileToDelete?.name}</strong>
            </p>
            <div className="modal-action">
              <button
                onClick={cancelRemoveEmbedding}
                className="btn btn-ghost"
                disabled={isRemoving}
              >
                {labels.cancel}
              </button>
              <button
                onClick={confirmRemoveEmbedding}
                className="btn btn-error"
                disabled={isRemoving}
              >
                {isRemoving && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                {labels.delete}
              </button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={cancelRemoveEmbedding}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};
