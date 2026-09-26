import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function readServerEnv(
  source: { NODE_ENV?: string } = process.env,
): ServerEnv {
  return serverEnvSchema.parse({
    NODE_ENV: source.NODE_ENV,
  });
}
