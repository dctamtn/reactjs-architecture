---
name: costing-provider
description: Use when adding the model binding the costing agent calls.
---

# Costing provider

This is the only server folder that may import an LLM SDK. `src/` must not import that SDK.

## Binding

Add one model binding for the costing agent, for example id `chat-model`. The provider name and the upstream model id live in this folder. The agent stores only the binding id.

Read the provider API key from `readServerEnv` in `server/env.ts`. The variable has no `VITE_` prefix. Do not default a key in source.

TPM casts provider models with `as any`. Do not copy that. Type the SDK call or wrap it so the binding's public type stays `ModelBinding`.

Register the binding in `models` and update `server/registries.test.ts`.
