export interface WorkflowContext {
  readonly userId: string;
}

export interface Workflow<TInput, TOutput> {
  readonly id: string;
  run(input: TInput, context: WorkflowContext): Promise<TOutput>;
}

export const workflows: readonly Workflow<unknown, unknown>[] = [];
