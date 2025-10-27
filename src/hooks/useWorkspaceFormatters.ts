import type { AgentType } from "../types";

export interface AgentTypeOption {
  value: AgentType;
  label: string;
}

export const useWorkspaceFormatters = (agentTypes?: AgentTypeOption[]) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getAgentTypeLabel = (agentType: AgentType) => {
    if (agentTypes) {
      return (
        agentTypes.find((type) => type.value === agentType)?.label || agentType
      );
    }
    // Fallback: return the value as-is if no types provided
    return agentType;
  };

  return {
    formatDate,
    getAgentTypeLabel,
    agentTypes,
  };
};
