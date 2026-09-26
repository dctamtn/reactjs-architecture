import { describe, expect, test } from "vitest";
import { z } from "zod";
import { parseUntrusted } from "./parse-untrusted";

describe("parseUntrusted", () => {
  const schema = z.object({ total: z.number() });

  test("returns the parsed value", () => {
    expect(parseUntrusted(schema, { total: 4 })).toEqual({ total: 4 });
  });

  test("rejects a value that does not match", () => {
    expect(() => parseUntrusted(schema, { total: "4" })).toThrow();
  });
});
