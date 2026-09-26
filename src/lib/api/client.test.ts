import { describe, expect, test, vi } from "vitest";
import { z } from "zod";
import { ApiError, apiClient } from "./client";

const payloadSchema = z.object({
  ok: z.boolean(),
});

describe("apiClient", () => {
  test("returns JSON that matches the schema", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(apiClient("/api/chat", payloadSchema)).resolves.toEqual({
      ok: true,
    });
    vi.unstubAllGlobals();
  });

  test("throws ApiError when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 503 })),
    );

    await expect(apiClient("/api/chat", payloadSchema)).rejects.toBeInstanceOf(
      ApiError,
    );
    vi.unstubAllGlobals();
  });

  test("rejects a body that does not match the schema", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: "yes" }), { status: 200 }),
      ),
    );

    await expect(apiClient("/api/chat", payloadSchema)).rejects.toThrow();
    vi.unstubAllGlobals();
  });
});
