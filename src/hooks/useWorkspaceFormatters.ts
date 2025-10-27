import type { AgentType } from "../types";

const AGENT_TYPES: { value: AgentType; label: string }[] = [
  { value: "architecture", label: "Architecture" },
  { value: "structural", label: "Structural Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "hvac", label: "HVAC Engineering" },
  { value: "plumbing", label: "Plumbing Engineering" },
  { value: "interior", label: "Interior Design" },
  { value: "projectManagement", label: "Project Management" },
  { value: "ecommerce", label: "E-commerce & Surveys" },
];

export const useWorkspaceFormatters = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getAgentTypeLabel = (agentType: AgentType) => {
    return (
      AGENT_TYPES.find((type) => type.value === agentType)?.label || agentType
    );
  };

  return {
    formatDate,
    getAgentTypeLabel,
  };
};
