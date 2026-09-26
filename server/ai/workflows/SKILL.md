---
name: costing-workflow
description: Use when implementing the costing workflow that orders RFQ, CM/YY, and detail-price tool calls.
---

# Costing workflow

This folder decides step order. It does not store prompt prose or construct a model client.

Read `skills/costing-chat/SKILL.md` for which user intent selects which tool.

## costing workflow

Id: `costing`.

1. Resolve context from the chat request: selected row fields win over asking the user again.
2. Run at most the tools the intent needs.
3. RFQ filter flow is facets, then summary, then details. Details receive `prd_country` from the chosen summary row.
4. CM/YY and detail prices run only when their intent matches and `latest_teckpack_style_log_id` is present.
5. Return status events and the validated tables. Do not invent rows when a tool returns none.

Register the workflow in the `workflows` array and update `server/registries.test.ts`.

The workflow calls registered tools. It does not call the techpack API itself.
