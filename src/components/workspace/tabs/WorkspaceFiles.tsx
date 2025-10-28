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

export interface WorkspaceFilesProps {
  workspaceId: string;
  knowledgeBaseFiles: KnowledgeBaseFile[];
  onFilesUpdated?: () => void;
  onEmbedFile?: (documentId: string) => Promise<void>;
  onDeleteFile?: (documentId: string) => Promise<void>;
  onUploadFiles?: (files: File[]) => Promise<void>;
  onViewFile?: (documentId: string) => void;
  isUploading?: boolean;
  uploadProgress?: { [key: string]: number };
  FileUploadComponent?: React.ComponentType<{
    onFilesChange?: (files: File[]) => Promise<void>;
    disabled?: boolean;
  }>;
  labels: {
    title: string;
    description: string;
    name: string;
    type: string;
    status: string;
    date: string;
    actions: string;
    view: string;
    embed: string;
    delete: string;
    noFilesFound: string;
    uploadFirstFile: string;
    uploadingFiles: string;
    deleteConfirmTitle: string;
    confirmDeleteFile: string;
    cancel: string;
    uploadedStatus: string;
    embeddedStatus: string;
    availableStatus: string;
  };
}

export const WorkspaceFiles = ({
  knowledgeBaseFiles,
  onFilesUpdated,
  onEmbedFile,
  onDeleteFile,
  onUploadFiles,
  onViewFile,
  isUploading = false,
  uploadProgress = {},
  FileUploadComponent,
  labels,
}: WorkspaceFilesProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] =
    useState<KnowledgeBaseFile | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "embedded":
        return "bg-green-100 text-green-700";
      case "uploaded":
        return "bg-yellow-100 text-yellow-700";
      case "available":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "embedded":
        return labels.embeddedStatus;
      case "uploaded":
        return labels.uploadedStatus;
      case "available":
        return labels.availableStatus;
      default:
        return status;
    }
  };

  const handleEmbedFile = async (documentId: string) => {
    if (onEmbedFile) {
      await onEmbedFile(documentId);
      onFilesUpdated?.();
    }
  };

  const handleDeleteFile = (documentId: string) => {
    const document = knowledgeBaseFiles.find((f) => f.id === documentId);
    if (!document) return;

    setDocumentToDelete(document);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!documentToDelete || !onDeleteFile) return;

    try {
      await onDeleteFile(documentToDelete.id);
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
      onFilesUpdated?.();
    } catch (error) {
      console.error("Failed to delete file:", error);
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {labels.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{labels.description}</p>
        </div>
      </div>

      {knowledgeBaseFiles.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  {labels.name}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  {labels.type}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  {labels.status}
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  {labels.date}
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">
                  {labels.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {knowledgeBaseFiles.map((file, index) => {
                const fileType =
                  file.name.split(".").pop()?.toUpperCase() || "PDF";

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-blue-600"
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
                        <span className="text-sm font-medium text-gray-900">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {fileType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}
                      >
                        {getStatusLabel(file.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {file.createdAt
                        ? new Date(file.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {onViewFile && (
                          <button
                            onClick={() => onViewFile(file.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                            title={labels.view}
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        )}
                        {file.status !== "embedded" && onEmbedFile && (
                          <button
                            onClick={() => handleEmbedFile(file.id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={labels.embed}
                            disabled={isUploading}
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        )}
                        {onDeleteFile && (
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={labels.delete}
                            disabled={isUploading}
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
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
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">{labels.noFilesFound}</p>
          <p className="text-sm text-gray-500 mt-1">{labels.uploadFirstFile}</p>
        </div>
      )}

      {FileUploadComponent && (
        <div className="mt-6">
          <FileUploadComponent
            onFilesChange={onUploadFiles}
            disabled={isUploading}
          />
        </div>
      )}

      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="loading loading-spinner loading-sm text-blue-600"></div>
            <span className="text-sm font-medium text-blue-900">
              {labels.uploadingFiles}
            </span>
          </div>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="mt-2">
              <div className="flex justify-between text-xs text-blue-700 mb-1">
                <span className="truncate max-w-[200px]">{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {labels.deleteConfirmTitle}
            </h3>
            <p className="py-4">
              {labels.confirmDeleteFile} "{documentToDelete?.name}"?
            </p>
            <div className="modal-action">
              <button onClick={cancelDelete} className="btn btn-ghost">
                {labels.cancel}
              </button>
              <button onClick={confirmDelete} className="btn btn-error">
                {labels.delete}
              </button>
            </div>
          </div>
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={cancelDelete}
          >
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};
