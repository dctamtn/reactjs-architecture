---
name: react-architecture
description: Use when changing folders, module boundaries, state, data flow, or the client/server split.
---

# React architecture

## Boundary

Browser code lives in `src/`. Server code lives in `server/`.

- Do not create `src/ai/`.
- Do not import `server/` from `src/`. The Vite plugin `config/reject-server-imports.ts` fails the build when that happens.
- Components, layout, app shell, and feature hooks do not import `@/lib/api` or call `fetch`.
- A feature service is the browser module that calls `apiClient`.
- `apiClient` requires a Zod schema. Do not add an untyped JSON helper beside it.

## Where code goes

| Concern | Location |
| --- | --- |
| App providers, root composition | `src/app/` |
| One product area | `src/features/<name>/{components,hooks,services,types.ts,index.ts}` |
| Widget used by two features | `src/components/` |
| shadcn/ui primitive | `src/components/ui/` |
| Hook used by two features | `src/hooks/` |
| HTTP, public env, query client, `cn` | `src/lib/` |
| Prompts, providers, tools, workflows, agents | `server/ai/` |
| HTTP route contract and future handlers | `server/http/` |
| Wiring registries together | `server/index.ts` |

Export only the feature's public surface from `src/features/<name>/index.ts`. Other features import that entry, not deep files.

## State

1. Local state
2. URL state
3. TanStack Query around a feature service
4. A global store only after the first three cannot represent the state

Create the query client with `createQueryClient`. Do not construct another `QueryClient` in a feature.

## Server registries

Add an agent, prompt, model, tool, or workflow by exporting it from its folder and registering it in that folder's list, which `server/index.ts` re-exports. Update `server/registries.test.ts` when a registry is no longer empty.

Do not call a provider from a React file to "just try a prompt."
