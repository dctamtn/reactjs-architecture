import type { ZodType } from "zod";

export function parseUntrusted<T>(schema: ZodType<T>, value: unknown): T {
  return schema.parse(value);
}
