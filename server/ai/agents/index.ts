export interface AgentDefinition {
  readonly id: string;
  readonly modelId: string;
  readonly promptIds: readonly string[];
  readonly toolNames: readonly string[];
}

export const agents: readonly AgentDefinition[] = [];
