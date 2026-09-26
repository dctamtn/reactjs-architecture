import { expect, test } from "vitest";
import { agents, models, prompts, tools, workflows } from "./index";

test("AI registries stay empty until a feature is added", () => {
  expect(agents).toEqual([]);
  expect(prompts).toEqual([]);
  expect(models).toEqual([]);
  expect(tools).toEqual([]);
  expect(workflows).toEqual([]);
});
