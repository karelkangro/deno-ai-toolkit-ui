import { useState } from "react";
import { Modal } from "../../ui/Modal";

export interface AgentType {
  value: string;
  label: string;
}

export interface CreateWorkspaceRequest {
  name: string;
  description: string;
  agentType: string;
}

export interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateWorkspaceRequest) => void;
  agentTypes?: AgentType[];
  title?: string;
  labels?: {
    workspaceName?: string;
    enterWorkspaceName?: string;
    description?: string;
    enterDescription?: string;
    agentType?: string;
    cancel?: string;
    create?: string;
  };
}

export const CreateWorkspaceModal = ({
  isOpen,
  onClose,
  onCreate,
  agentTypes = [],
  title = "Create Workspace",
  labels = {},
}: CreateWorkspaceModalProps) => {
  const [formData, setFormData] = useState<CreateWorkspaceRequest>({
    name: "",
    description: "",
    agentType: agentTypes[0]?.value || "",
  });

  const defaultLabels = {
    workspaceName: "Workspace Name",
    enterWorkspaceName: "Enter workspace name",
    description: "Description",
    enterDescription: "Enter description",
    agentType: "Agent Type",
    cancel: "Cancel",
    create: "Create",
    ...labels,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onCreate(formData);
      setFormData({
        name: "",
        description: "",
        agentType: agentTypes[0]?.value || "",
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">{defaultLabels.workspaceName}</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input input-bordered w-full"
            placeholder={defaultLabels.enterWorkspaceName}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{defaultLabels.description}</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="textarea textarea-bordered w-full h-20"
            placeholder={defaultLabels.enterDescription}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{defaultLabels.agentType}</span>
          </label>
          <select
            value={formData.agentType}
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

        <div className="modal-action">
          <button type="button" onClick={onClose} className="btn btn-ghost">
            {defaultLabels.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {defaultLabels.create}
          </button>
        </div>
      </form>
    </Modal>
  );
};
