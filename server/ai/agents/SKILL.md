---
name: costing-agent
description: Use when wiring the costing agent to its model, prompt, and tools.
---

# Costing agent

An agent record names a model, prompt ids, and tool names. It does not contain prompt text or tool implementations.

## costing agent

- id: `costing`
- model id: the tool-enabled chat model from `server/ai/providers`
- prompt id: the costing system prompt
- tool names, in this order: `rfqCostQueryParams`, `rfqCosts`, `rfqCostDetails`, `tpDetailCMYY`, `tpDetailPrices`

Do not attach orders, search, weather, email, or RFQ creation.

TPM disables tools for its reasoning model. This agent stays on the tool-enabled model so costing questions can call tools.

Register it in the `agents` array and update `server/registries.test.ts`.
