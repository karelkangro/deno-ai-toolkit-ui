import { useState } from "react";
import { Modal } from "../../ui/Modal";

export interface Workspace {
  id: string;
  name: string;
  description: string;
  agentType: string;
  createdAt: string;
  updatedAt: string;
  documentCount?: number;
}

export interface DeleteWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  workspace: Workspace | null;
  title: string;
  labels: {
    confirmPrompt: string;
    actionWarning: string;
    descriptionWarning: string;
    typeToConfirm: string;
    nameMismatch: string;
    cancel: string;
    delete: string;
  };
}

export const DeleteWorkspaceModal = ({
  isOpen,
  onClose,
  onDelete,
  workspace,
  title,
  labels,
}: DeleteWorkspaceModalProps) => {
  // Use workspace id as key to reset state when workspace changes
  const [confirmationText, setConfirmationText] = useState("");

  // Compute confirmation state directly
  const isConfirmed = confirmationText === workspace?.name;

  const handleDelete = () => {
    if (isConfirmed) {
      onDelete();
    }
  };

  const handleClose = () => {
    setConfirmationText("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      showCloseButton={false}
    >
      <div>
        <p className="mb-4">
          {labels.confirmPrompt} "{workspace?.name}"? {labels.actionWarning}{" "}
          {labels.descriptionWarning}
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.typeToConfirm}
          </label>
          <input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder={workspace?.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          {confirmationText && !isConfirmed && (
            <p className="mt-1 text-sm text-red-600">{labels.nameMismatch}</p>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
          >
            {labels.cancel}
          </button>
          <button
            onClick={handleDelete}
            disabled={!isConfirmed}
            className={`px-4 py-2 rounded-md ${
              isConfirmed
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {labels.delete}
          </button>
        </div>
      </div>
    </Modal>
  );
};
