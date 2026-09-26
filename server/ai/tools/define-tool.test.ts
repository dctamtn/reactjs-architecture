import { describe, expect, test } from "vitest";
import { z } from "zod";
import { defineTool } from "./index";

describe("defineTool", () => {
  const tool = defineTool({
    name: "example",
    description: "Example tool used to prove the boundary.",
    inputSchema: z.object({ styleNo: z.string() }),
    outputSchema: z.object({ length: z.number() }),
    execute(input) {
      return Promise.resolve({ length: input.styleNo.length });
    },
  });

  test("validates input and output", async () => {
    await expect(
      tool.execute({ styleNo: "abc" }, { userId: "user-1" }),
    ).resolves.toEqual({ length: 3 });
  });

  test("rejects input that does not match the schema", async () => {
    await expect(
      tool.execute({ styleNo: 12 }, { userId: "user-1" }),
    ).rejects.toThrow();
  });

  test("rejects output that does not match the schema", async () => {
    const invalidOutput = defineTool({
      name: "invalid-output",
      description: "Returns a shape the output schema rejects.",
      inputSchema: z.object({}),
      outputSchema: z.object({ length: z.number() }),
      async execute(): Promise<{ length: number }> {
        return JSON.parse('{"length":"3"}');
      },
    });

    await expect(
      invalidOutput.execute({}, { userId: "user-1" }),
    ).rejects.toThrow();
  });
});
