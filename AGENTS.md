# Agent rules

This repository is the browser shell and server boundary for a costing chatbot. It is not the feature yet. Do not port chat UI, prompts, tools, or costing screens until that work is explicitly requested.

Read the skill that matches the task before editing:

| Task | Skill |
| --- | --- |
| Folders, boundaries, state, data flow | `skills/react-architecture/SKILL.md` |
| A React component | `skills/react-component/SKILL.md` |
| Chat, costing, prompts, tools, workflows, providers | `skills/ai-feature/SKILL.md` |
| Which costing tool runs, and how results are shown | `skills/costing-chat/SKILL.md` |
| RFQ facets, summary, or line details | `skills/costing-rfq/SKILL.md` |
| CM/YY breakdown | `skills/costing-cm-yy/SKILL.md` |
| Detail prices or sell-through | `skills/costing-detail-prices/SKILL.md` |
| A file under `server/` | `server/SKILL.md` and that folder's `SKILL.md` |
| Review before finishing | `skills/code-review/SKILL.md` |

## Decision

AI runs on the server. The browser never imports `server/`, never calls a model provider, and never sees a provider secret.

`src/ai/` is intentionally absent. A Vite bundle would ship that folder to the browser. Model calls, prompts, tools, and workflows stay in `server/ai/`. The React app talks to `POST /api/chat` through `apiClient`.

```
App
  -> Feature component
    -> Feature hook
      -> Feature service
        -> apiClient
          -> POST /api/chat
            -> Workflow
              -> Tool / prompt / schema
                -> Provider
```

Components and hooks do not import `@/lib/api`. Services do. ESLint and the Vite plugin `rejectServerImports` enforce the browser side of this rule.

## Layout

```
src/                          browser, TypeScript strict
  app/                        composition root and providers
  features/chat/              conversation UI, when confirmed
  features/costing/           costing presentation, when confirmed
  components/ui/              shadcn/ui, added when a screen needs one
  components/layout/
  hooks/                      cross-feature hooks only
  lib/                        api client, public env, query client, cn()
  types/
  styles/
server/                       Node only, not bundled
  ai/agents/
  ai/prompts/
  ai/providers/
  ai/schemas/
  ai/tools/
  ai/workflows/
  http/                       chat endpoint contract
skills/                       task instructions
```

`server/index.ts` is the server composition root. Registries for agents, prompts, models, tools, and workflows start empty.

## State

Use the smallest mechanism that works:

- React local state for drafts and open panels
- The URL for the selected conversation
- TanStack Query for server state
- No global client store unless a feature cannot be expressed with the three above

## AI rules

Keep these apart: prompts, provider configuration, agents, tools, structured-output schemas, workflows.

- Validate tool arguments and model output with Zod via `defineTool` or `parseUntrusted`.
- Treat model output and tool arguments as untrusted.
- Add provider keys to `readServerEnv` in `server/env.ts` when a provider is implemented. Never prefix them with `VITE_`.
- `readPublicEnv` accepts only `VITE_API_BASE_URL`.
- Do not install an LLM SDK in browser code. Server providers may use one when the feature is confirmed.

## Planned feature

The first product slice, after confirmation, is the costing chatbot only:

- Chat UI in `features/chat`
- Costing results in `features/costing`
- One costing workflow
- Tools for RFQ summary, RFQ details, RFQ query params, CM/YY, and detail prices
- A costing prompt and Zod schemas for those tool inputs and outputs

Do not bring orders, techpack search, trend engine, email, weather, or the techpack costing screens unless a task asks for them.

## Coding

Before adding code, inspect the current feature, hook, service, and server registry. Extend those. Do not add a second path.

Prefer a small change. Do not add an abstraction, a global store, or a shared package until two callers need it. Do not use `any`. Do not rewrite unrelated files.

When a structural choice has more than one reasonable shape, state the choice and wait before implementing it.

## Quality gate

Before finishing:

- `npm run typecheck`
- `npm run lint`
- `npm test` when behavior changed
- Loading and error states exist for new UI
- Model output and tool arguments are validated
- Browser code still cannot reach `server/` or a provider SDK
