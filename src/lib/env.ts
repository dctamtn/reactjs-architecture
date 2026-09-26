import { z } from "zod";

const publicEnvSchema = z.object({
  VITE_API_BASE_URL: z.string().startsWith("http").optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;

function emptyToUndefined(value: string | undefined): string | undefined {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }
  return value;
}

export function readPublicEnv(
  source: { VITE_API_BASE_URL?: string } = import.meta.env,
): PublicEnv {
  return publicEnvSchema.parse({
    VITE_API_BASE_URL: emptyToUndefined(source.VITE_API_BASE_URL),
  });
}
