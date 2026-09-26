import { describe, expect, test } from "vitest";
import { readPublicEnv } from "./env";

describe("readPublicEnv", () => {
  test("treats a blank API base URL as unset", () => {
    expect(readPublicEnv({ VITE_API_BASE_URL: "  " })).toEqual({});
  });

  test("accepts an http(s) API base URL", () => {
    expect(readPublicEnv({ VITE_API_BASE_URL: "https://api.example.com" })).toEqual({
      VITE_API_BASE_URL: "https://api.example.com",
    });
  });

  test("rejects a base URL that is not http(s)", () => {
    expect(() =>
      readPublicEnv({ VITE_API_BASE_URL: "file:///tmp" }),
    ).toThrow();
  });
});
