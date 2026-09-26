---
name: code-review
description: Use before finishing a change, or when asked to review one.
---

# Code review

Check the diff against these points. Report each miss with the file it is in.

## Boundaries

- `src/` does not import `server/`, `ai`, or `@ai-sdk/*`.
- Components and hooks do not import `@/lib/api` or call `fetch`.
- A new network call goes through `apiClient` and a Zod schema.
- Tool arguments and model output go through `defineTool` or `parseUntrusted`.
- Provider secrets are read in `server/env.ts` and are not `VITE_` variables.

## Shape

- The change follows App -> feature -> hook -> service -> API, and on the server workflow -> tool -> provider.
- Business rules are not copied into a second feature.
- New UI has loading and error states.
- No new global store, and no `any`.
- Files outside the task are unchanged.

## Gate

`npm run typecheck`, `npm run lint`, and `npm test` pass for the behavior that changed.
