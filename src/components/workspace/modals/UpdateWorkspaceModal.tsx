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

export interface AgentType {
  value: string;
  label: string;
}

export interface UpdateWorkspaceRequest {
  id: string;
  name: string;
  description: string;
  agentType: string;
}

export interface UpdateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: UpdateWorkspaceRequest) => void;
  onDelete: (workspace: Workspace) => void;
  workspace: Workspace | null;
  agentTypes?: AgentType[];
  title: string;
  labels: {
    name: string;
    description: string;
    agentType: string;
    delete: string;
    cancel: string;
    update: string;
  };
}

export const UpdateWorkspaceModal = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  workspace,
  agentTypes = [],
  title,
  labels,
}: UpdateWorkspaceModalProps) => {
  // Initialize form data directly from workspace prop
  // Parent component should provide key={workspace.id} to reset state
  const [formData, setFormData] = useState<UpdateWorkspaceRequest>(() => ({
    id: workspace?.id || "",
    name: workspace?.name || "",
    description: workspace?.description || "",
    agentType: workspace?.agentType || "",
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name?.trim()) {
      onUpdate(formData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (workspace) {
      onClose();
      onDelete(workspace);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">{labels.name}</span>
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">{labels.description}</span>
          </label>
          <textarea
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="textarea textarea-bordered w-full h-20"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">{labels.agentType}</span>
          </label>
          <select
            value={formData.agentType || ""}
            onChange={(e) =>
              setFormData({ ...formData, agentType: e.target.value })
            }
            className="select select-bordered w-full"
          >
            {agentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action justify-end">
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-error mr-auto"
          >
            {labels.delete}
          </button>
          <button type="button" onClick={onClose} className="btn btn-ghost">
            {labels.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {labels.update}
          </button>
        </div>
      </form>
    </Modal>
  );
};
