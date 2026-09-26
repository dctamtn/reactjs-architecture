import { describe, expect, test } from "vitest";
import { readServerEnv } from "./env";

describe("readServerEnv", () => {
  test("defaults NODE_ENV when it is missing", () => {
    expect(readServerEnv({})).toEqual({ NODE_ENV: "development" });
  });

  test("accepts test", () => {
    expect(readServerEnv({ NODE_ENV: "test" })).toEqual({ NODE_ENV: "test" });
  });

  test("rejects an unknown NODE_ENV", () => {
    expect(() => readServerEnv({ NODE_ENV: "staging" })).toThrow();
  });
});
