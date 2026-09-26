---
name: ai-feature
description: Use when adding or changing chat, costing, prompts, tools, workflows, agents, or model providers.
---

# AI feature

Do not start this work unless the task explicitly asks for the feature. Registries in `server/ai/` are empty on purpose.

## Flow

```
features/chat or features/costing
  -> hook
    -> service
      -> apiClient(schema)
        -> server/http chat endpoint
          -> workflow
            -> defineTool / parseUntrusted
              -> provider
```

The chat feature owns the conversation. The costing feature owns costing presentation: RFQ tables, CM/YY breakdown, detail prices. A chat component does not fetch costing data itself. It renders costing components with data the workflow already returned.

## Server pieces

| Piece | Role |
| --- | --- |
| `server/ai/prompts` | Prompt text only. No tool calls. |
| `server/ai/providers` | Model ids and the SDK call. The only folder that may import an LLM SDK. |
| `server/ai/agents` | Which model, prompts, and tools an agent uses. |
| `server/ai/tools` | One tool per file. Register it with `defineTool` so input and output pass through Zod. |
| `server/ai/schemas` | Structured output and shared Zod schemas. Use `parseUntrusted` for values the model produced. |
| `server/ai/workflows` | Step order. Workflows call tools. They do not contain prompt prose or provider SDK setup. |
| `server/http` | The HTTP entry. `chatEndpoint` is `POST /api/chat`. |

`defineTool` parses input before `execute` and parses output before returning it. Do not trust `execute` to return a safe shape. Do not skip the schemas.

## Secrets

Read provider keys inside `server/env.ts`. Reject the change if a key is prefixed with `VITE_` or referenced from `src/`.

## First slice, when confirmed

Add only the costing chatbot:

- RFQ summary, RFQ details, RFQ query params, CM/YY, detail prices
- One costing system prompt
- Zod schemas for each tool's arguments and result
- Chat UI that streams through the app API
- Costing components for those results

Leave orders, techpack search, trend engine, email, weather, and techpack page screens out of this slice.

When a registry gains its first entry, update `server/registries.test.ts`.
