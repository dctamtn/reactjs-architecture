export interface PromptDefinition {
  readonly id: string;
  readonly purpose: "system" | "task";
  readonly text: string;
}

export const prompts: readonly PromptDefinition[] = [];
