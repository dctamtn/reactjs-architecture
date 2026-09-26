import type { ZodType } from "zod";

export interface ToolContext {
  readonly userId: string;
}

export interface ToolDefinition<TInput, TOutput> {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: ZodType<TInput>;
  readonly outputSchema: ZodType<TOutput>;
  execute(input: TInput, context: ToolContext): Promise<TOutput>;
}

export interface RegisteredTool {
  readonly name: string;
  readonly description: string;
  execute(input: unknown, context: ToolContext): Promise<unknown>;
}

export function defineTool<TInput, TOutput>(
  definition: ToolDefinition<TInput, TOutput>,
): RegisteredTool {
  return {
    name: definition.name,
    description: definition.description,
    async execute(input, context) {
      const parsedInput = definition.inputSchema.parse(input);
      const output = await definition.execute(parsedInput, context);
      return definition.outputSchema.parse(output);
    },
  };
}

export const tools: readonly RegisteredTool[] = [];
